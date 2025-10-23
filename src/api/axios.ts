import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Simple token storage helpers (client-side only)
const isBrowser = typeof window !== 'undefined';
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const tokenStore = {
  getAccessToken(): string | null {
    if (!isBrowser) return null;
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  setAccessToken(token?: string) {
    if (!isBrowser) return;
    if (!token) localStorage.removeItem(ACCESS_TOKEN_KEY);
    else localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },
  getRefreshToken(): string | null {
    if (!isBrowser) return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  setRefreshToken(token?: string) {
    if (!isBrowser) return;
    if (!token) localStorage.removeItem(REFRESH_TOKEN_KEY);
    else localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },
  clear() {
    if (!isBrowser) return;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Keep track of refresh in-flight to de-duplicate concurrent 401s
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

const normalizeUrl = (url?: string): string | undefined => {
  if (!url) return url;
  // If the generated path already contains /api/v1 but baseURL also ends with /api/v1, strip the prefix from the path
  if (url.startsWith('/api/v1')) return url.replace(/^\/api\/v1/, '');
  return url;
};

const refreshAccessToken = async (): Promise<string | null> => {
  const currentAccess = tokenStore.getAccessToken();
  const refresh = tokenStore.getRefreshToken();
  if (!refresh) return null;

  try {
    // Backend defines GET /auth/refresh and expects Authorization (access token) + body { refreshToken }
    const resp = await api.request<{ access_token?: string; refresh_token?: string }>({
      method: 'GET',
      url: 'auth/refresh',
      headers: {
        Authorization: currentAccess ? `Bearer ${currentAccess}` : undefined
      },
      data: { refreshToken: refresh }
    });

    const newAccess = resp.data?.access_token || null;
    const newRefresh = resp.data?.refresh_token || refresh;

    if (newAccess) tokenStore.setAccessToken(newAccess);
    if (newRefresh) tokenStore.setRefreshToken(newRefresh);

    return newAccess;
  } catch (e) {
    // On failure, clear tokens so app can redirect to login
    tokenStore.clear();
    return null;
  }
};

api.interceptors.request.use(
  async (config: any) => {
    const isPublic = config.isPublic || false;

    // Normalize URL against baseURL that already includes /api/v1
    config.url = normalizeUrl(config.url);

    if (!isPublic) {
      const token = tokenStore.getAccessToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    if (config.data instanceof FormData) {
      config.headers = config.headers || {};
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers = config.headers || {};
      config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json';
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest: any = (error as any)?.config || {};

    // Avoid infinite loop on refresh endpoint
    const isRefreshCall = typeof originalRequest?.url === 'string' && originalRequest.url.includes('auth/refresh');

    const status = (error.response as AxiosResponse | undefined)?.status;
    if (status === 401 && !originalRequest._retry && !isRefreshCall) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshAccessToken().finally(() => {
          isRefreshing = false;
        });
      }

      const newAccess = await (refreshPromise as Promise<string | null>);
      if (newAccess) {
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers['Authorization'] = `Bearer ${newAccess}`;
        // Retry with updated access token
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export const axiosMutator = <T = any>(
  config: AxiosRequestConfig,
  options?: { baseURL?: string }
): Promise<AxiosResponse<T>> => {
  const newConfig: AxiosRequestConfig = { ...config };

  // Allow caller to override baseURL
  if (options?.baseURL) newConfig.baseURL = options.baseURL;

  // Normalize path if it accidentally contains /api/v1 while baseURL already has it
  newConfig.url = normalizeUrl(newConfig.url);

  return api(newConfig);
};

export default api;

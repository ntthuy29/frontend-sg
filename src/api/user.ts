import { axiosMutator, tokenStore } from './axios';

export interface User {
    id: string;
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface RegisterDto {
    email: string;
    password: string;
    username: string;
    firstName?: string;
    lastName?: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface UpdateUserDto {
    username?: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
}

export interface ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
}

export interface AuthResponse {
    user: User;
    access_token: string;
    refresh_token?: string;
}

// Authentication APIs
export const register = async (data: RegisterDto): Promise<AuthResponse> => {
    const response = await axiosMutator<AuthResponse>({
        method: 'POST',
        url: '/auth/register',
        data,
    } as any);
    
    // Store tokens after successful registration
    if (response.data.access_token) {
        tokenStore.setAccessToken(response.data.access_token);
    }
    if (response.data.refresh_token) {
        tokenStore.setRefreshToken(response.data.refresh_token);
    }
    
    return response.data;
};

export const login = async (data: LoginDto): Promise<AuthResponse> => {
    const response = await axiosMutator<AuthResponse>({
        method: 'POST',
        url: '/auth/login',
        data,
        isPublic: true, // Mark as public endpoint
    } as any);
    
    // Store tokens after successful login
    if (response.data.access_token) {
        tokenStore.setAccessToken(response.data.access_token);
    }
    if (response.data.refresh_token) {
        tokenStore.setRefreshToken(response.data.refresh_token);
    }
    
    return response.data;
};

export const logout = async (): Promise<void> => {
    const response = await axiosMutator({
        method: 'POST',
        url: '/auth/logout',
    } as any);
    
    // Clear tokens after logout
    tokenStore.clear();
    
    return response.data;
};

export const refreshToken = async (refreshToken: string): Promise<AuthResponse> => {
    const response = await axiosMutator<AuthResponse>({
        method: 'GET',
        url: '/auth/refresh',
        data: { refreshToken },
    } as any);
    return response.data;
};

// User Profile APIs
export const getCurrentUser = async (): Promise<User> => {
    const response = await axiosMutator<User>({
        method: 'GET',
        url: '/users/me',
    } as any);
    return response.data;
};

export const getUserById = async (id: string): Promise<User> => {
    const response = await axiosMutator<User>({
        method: 'GET',
        url: `/users/${id}`,
    } as any);
    return response.data;
};

export const updateUser = async (id: string, data: UpdateUserDto): Promise<User> => {
    const response = await axiosMutator<User>({
        method: 'PATCH',
        url: `/users/${id}`,
        data,
    } as any);
    return response.data;
};

export const updateCurrentUser = async (data: UpdateUserDto): Promise<User> => {
    const response = await axiosMutator<User>({
        method: 'PATCH',
        url: '/users/me',
        data,
    } as any);
    return response.data;
};

export const changePassword = async (data: ChangePasswordDto): Promise<void> => {
    const response = await axiosMutator({
        method: 'POST',
        url: '/users/me/change-password',
        data,
    } as any);
    return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
    const response = await axiosMutator({
        method: 'DELETE',
        url: `/users/${id}`,
    } as any);
    return response.data;
};

// Search users
export const searchUsers = async (query: string): Promise<User[]> => {
    const response = await axiosMutator<User[]>({
        method: 'GET',
        url: '/users/search',
        params: { q: query },
    } as any);
    return response.data;
};

// Upload avatar
export const uploadAvatar = async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await axiosMutator<{ url: string }>({
        method: 'POST',
        url: '/users/me/avatar',
        data: formData,
    } as any);
    return response.data;
};

import { axiosMutator } from './axios';

export interface Workspace {
    id: string;
    name: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
    ownerId?: string;
}

export interface CreateWorkspaceDto {
    name: string;
    description?: string;
}

export interface UpdateWorkspaceDto {
    name?: string;
    description?: string;
}

// Get all workspaces
export const getWorkspaces = async (): Promise<Workspace[]> => {
    const response = await axiosMutator<Workspace[]>({
        method: 'GET',
        url: '/workspaces',
    } as any);
    return response.data;
};

// Get a single workspace by ID
export const getWorkspaceById = async (id: string): Promise<Workspace> => {
    const response = await axiosMutator<Workspace>({
        method: 'GET',
        url: `/workspaces/${id}`,
    } as any);
    return response.data;
};

// Create a new workspace
export const createWorkspace = async (data: CreateWorkspaceDto): Promise<Workspace> => {
    const response = await axiosMutator<Workspace>({
        method: 'POST',
        url: '/workspaces',
        data,
    } as any);
    return response.data;
};

// Update a workspace
export const updateWorkspace = async (id: string, data: UpdateWorkspaceDto): Promise<Workspace> => {
    const response = await axiosMutator<Workspace>({
        method: 'PATCH',
        url: `/workspaces/${id}`,
        data,
    } as any);
    return response.data;
};

// Delete a workspace
export const deleteWorkspace = async (id: string): Promise<void> => {
    const response = await axiosMutator({
        method: 'DELETE',
        url: `/workspaces/${id}`,
    } as any);
    return response.data;
};

// Get workspace members
export const getWorkspaceMembers = async (id: string): Promise<any> => {
    const response = await axiosMutator({
        method: 'GET',
        url: `/workspaces/${id}/members`,
    } as any);
    return response.data;
};

// Add member to workspace
export const addWorkspaceMember = async (id: string, userId: string, role?: string): Promise<any> => {
    const response = await axiosMutator({
        method: 'POST',
        url: `/workspaces/${id}/members`,
        data: { userId, role },
    } as any);
    return response.data;
};

// Remove member from workspace
export const removeWorkspaceMember = async (id: string, userId: string): Promise<void> => {
    const response = await axiosMutator({
        method: 'DELETE',
        url: `/workspaces/${id}/members/${userId}`,
    } as any);
    return response.data;
};

import { axiosMutator } from './axios';

export interface Board {
    id: string;
    name: string;
    description?: string;
    workspaceId: string;
    createdAt?: string;
    updatedAt?: string;
    isFavorite?: boolean;
    backgroundColor?: string;
}

export interface CreateBoardDto {
    name: string;
    description?: string;
    workspaceId: string;
    backgroundColor?: string;
}

export interface UpdateBoardDto {
    name?: string;
    description?: string;
    isFavorite?: boolean;
    backgroundColor?: string;
}

// Get all boards
export const getBoards = async (): Promise<Board[]> => {
    const response = await axiosMutator<Board[]>({
        method: 'GET',
        url: '/boards',
    } as any);
    return response.data;
};

// Get boards by workspace
export const getBoardsByWorkspace = async (workspaceId: string): Promise<Board[]> => {
    const response = await axiosMutator<Board[]>({
        method: 'GET',
        url: `/workspaces/${workspaceId}/boards`,
    } as any);
    return response.data;
};

// Get a single board by ID
export const getBoardById = async (id: string): Promise<Board> => {
    const response = await axiosMutator<Board>({
        method: 'GET',
        url: `/boards/${id}`,
    } as any);
    return response.data;
};

// Create a new board
export const createBoard = async (data: CreateBoardDto): Promise<Board> => {
    const response = await axiosMutator<Board>({
        method: 'POST',
        url: '/boards',
        data,
    } as any);
    return response.data;
};

// Update a board
export const updateBoard = async (id: string, data: UpdateBoardDto): Promise<Board> => {
    const response = await axiosMutator<Board>({
        method: 'PATCH',
        url: `/boards/${id}`,
        data,
    } as any);
    return response.data;
};

// Delete a board
export const deleteBoard = async (id: string): Promise<void> => {
    const response = await axiosMutator({
        method: 'DELETE',
        url: `/boards/${id}`,
    } as any);
    return response.data;
};

// Toggle board favorite status
export const toggleBoardFavorite = async (id: string): Promise<Board> => {
    const response = await axiosMutator<Board>({
        method: 'PATCH',
        url: `/boards/${id}/favorite`,
    } as any);
    return response.data;
};

// Get board members
export const getBoardMembers = async (id: string): Promise<any> => {
    const response = await axiosMutator({
        method: 'GET',
        url: `/boards/${id}/members`,
    } as any);
    return response.data;
};

// Add member to board
export const addBoardMember = async (id: string, userId: string, role?: string): Promise<any> => {
    const response = await axiosMutator({
        method: 'POST',
        url: `/boards/${id}/members`,
        data: { userId, role },
    } as any);
    return response.data;
};

// Remove member from board
export const removeBoardMember = async (id: string, userId: string): Promise<void> => {
    const response = await axiosMutator({
        method: 'DELETE',
        url: `/boards/${id}/members/${userId}`,
    } as any);
    return response.data;
};

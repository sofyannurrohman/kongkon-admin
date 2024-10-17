import api from './api';
import { type User } from '../model/User'; // Adjust the import path as necessary

const resource = '/users';

// Get all users
export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>(resource);
  return response.data; // Returns the data (list of users)
};

// Create a new user
export const createUser = async (user: User): Promise<User> => {
  const response = await api.post<User>(resource, user);
  return response.data; // Returns the created user
};
// Get an existing user by id
export const getUserByID = async (id: string): Promise<User> => {
  const response = await api.get<User>(`${resource}/${id}`);
  return response.data; // Returns the updated user
};

// Update an existing user
export const updateUser = async (id: string, user: User): Promise<User> => {
  const response = await api.put<User>(`${resource}/${id}`, user);
  return response.data; // Returns the updated user
};
// Upload user avatar
export const uploadAvatar = async (id: string, formData: FormData): Promise<void> => {
  await api.post(`${resource}/${id}/upload-avatar`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Set the content type to multipart form data
    },
  });
};

// Remove a user
export const removeUser = async (id: string): Promise<any> => {
  const response = await api.delete(`${resource}/${id}`);
  return response;
};

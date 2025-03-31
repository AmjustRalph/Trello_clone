// authService.ts
import axios from "axios";
import { BASE_URL } from "./apiconfig";

export const registerUser = async (userData: any) => {
  return axios.post(`${BASE_URL}/auth/register`, userData);
};

export const loginUser = async (credentials: any) => {
  return axios.post(`${BASE_URL}/auth/login`, credentials);
};

export const setAuthToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

export const clearAuthToken = (): void => {
  localStorage.removeItem('token');
};

export const authHeader = () => {
  const token = getAuthToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
};
// authService.ts
import axios from "axios";
import { BASE_URL } from "./apiconfig";

interface UserData {
  username: string;
  email: string;
  password: string;
}

export const registerUser = async (userData: UserData) => {
  return axios.post(`${BASE_URL}/auth/register`, userData);
};

interface LoginCredentials {
  email: string;
  password: string;
}

export const loginUser = async (credentials: LoginCredentials) => {
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
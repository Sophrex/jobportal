import * as SecureStore from "expo-secure-store";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:8000";

const REFRESH_TOKEN_KEY = "refresh_token";
const ACCESS_TOKEN_KEY = "access_token";

let accessToken: string | null = null;

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  company_name: string;
}

interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export async function getAccessToken(): Promise<string | null> {
  if (accessToken) return accessToken;
  accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  return accessToken;
}

export async function setTokens(access: string, refresh: string): Promise<void> {
  accessToken = access;
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, access);
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refresh);
}

export async function clearTokens(): Promise<void> {
  accessToken = null;
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
}

async function refreshAccessToken(): Promise<string | null> {
  const refresh = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  if (!refresh) return null;

  const response = await fetch(`${API_URL}/api/v1/auth/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (!response.ok) {
    await clearTokens();
    return null;
  }

  const data = await response.json();
  accessToken = data.access;
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, data.access);
  if (data.refresh) {
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, data.refresh);
  }
  return accessToken;
}

export async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  let token = await getAccessToken();

  const makeRequest = (authToken: string | null) =>
    fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        ...(options.headers as Record<string, string>),
      },
    });

  let response = await makeRequest(token);

  if (response.status === 401 && (await SecureStore.getItemAsync(REFRESH_TOKEN_KEY))) {
    token = await refreshAccessToken();
    response = await makeRequest(token);
  }

  return response;
}

export async function login(username: string, password: string): Promise<User> {
  const response = await fetch(`${API_URL}/api/v1/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  const data: AuthResponse = await response.json();
  await setTokens(data.access, data.refresh);
  return data.user;
}

export async function register(payload: {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  role: string;
  company_name?: string;
}): Promise<User> {
  const response = await fetch(`${API_URL}/api/v1/auth/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Registration failed");
  }

  const data: AuthResponse = await response.json();
  await setTokens(data.access, data.refresh);
  return data.user;
}

export async function fetchMe(): Promise<User | null> {
  const token = await getAccessToken();
  if (!token) return null;

  const response = await apiFetch("/api/v1/auth/me/");
  if (!response.ok) return null;
  return response.json();
}

export async function logout(): Promise<void> {
  await clearTokens();
}

export interface Job {
  id: number;
  title: string;
  description: string;
  company_name: string;
  location: string;
  employment_type: string;
  salary_range: string;
}

export async function fetchJobs(): Promise<Job[]> {
  const response = await apiFetch("/api/v1/jobs/");
  if (!response.ok) throw new Error("Failed to fetch jobs");
  const data = await response.json();
  return data.results;
}

export async function fetchJob(id: string): Promise<Job | null> {
  const response = await apiFetch(`/api/v1/jobs/${id}/`);
  if (!response.ok) return null;
  return response.json();
}

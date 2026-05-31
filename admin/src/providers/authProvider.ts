import type { AuthProvider } from "@refinedev/core";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

interface AuthUser {
  id: number;
  username: string;
  email: string;
  role: string;
  is_staff: boolean;
}

interface LoginResponse {
  access: string;
  refresh: string;
  user: AuthUser;
}

const getStoredUser = (): AuthUser | null => {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
};

export const authProvider: AuthProvider = {
  login: async ({ username, email, password }) => {
    const payload: Record<string, string> = { password };
    if (email) {
      payload.email = email;
    } else if (username) {
      payload.username = username;
    }

    const response = await fetch(`${API_URL}/api/v1/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Invalid username or password",
        },
      };
    }

    const data: LoginResponse = await response.json();

    if (!data.user.is_staff) {
      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Staff access required",
        },
      };
    }

    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    localStorage.setItem("user", JSON.stringify(data.user));

    return { success: true, redirectTo: "/" };
  },

  logout: async () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    return { success: true, redirectTo: "/login" };
  },

  check: async () => {
    const token = localStorage.getItem("access_token");
    const user = getStoredUser();

    if (!token || !user?.is_staff) {
      return { authenticated: false, redirectTo: "/login" };
    }

    const response = await fetch(`${API_URL}/api/v1/auth/me/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      return { authenticated: false, redirectTo: "/login" };
    }

    const currentUser: AuthUser = await response.json();
    if (!currentUser.is_staff) {
      return { authenticated: false, redirectTo: "/login" };
    }

    localStorage.setItem("user", JSON.stringify(currentUser));
    return { authenticated: true };
  },

  getPermissions: async () => {
    const user = getStoredUser();
    return user?.role ?? null;
  },

  getIdentity: async () => {
    const user = getStoredUser();
    if (!user) return null;
    return {
      id: user.id,
      name: user.username,
      email: user.email,
    };
  },

  onError: async (error) => {
    if (error?.statusCode === 401) {
      return { logout: true, redirectTo: "/login" };
    }
    return { error };
  },
};

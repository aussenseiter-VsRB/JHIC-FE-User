import { request } from "../../../api/client";

const TOKEN_KEY = "jhic_token";
const USER_KEY = "jhic_user";

interface AuthUser {
  id: string;
  email: string;
  role: string;
}

interface AuthResponse {
  token: string;
  user: AuthUser;
}

async function login(email: string, password: string): Promise<void> {
  const res = await request("/auth/login", {
    method: "POST",
    body: { email, password },
  });

  if (!res.ok) {
    throw new Error(res.error || "Login gagal. Periksa email dan password.");
  }

  const data = res.data as AuthResponse;

  if (data.user.role !== "user") {
    throw new Error("Akun ini bukan role user. Hanya role user yang dapat masuk.");
  }

  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
}

function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

function getUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

function isAuthenticated(): boolean {
  return getToken() !== null;
}

function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export { login, getToken, getUser, isAuthenticated, logout };

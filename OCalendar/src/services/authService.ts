interface LoginResponse {
  token: string;
  message?: string;
}

const authService = {
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await fetch("http://localhost:5050/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data: LoginResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("token", data.token);
    return data;
  },

  logout(): void {
    localStorage.removeItem("token");
  },

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem("token"));
  }
};

export default authService;
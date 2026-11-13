export async function register(credentials) {
  const response = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

export async function login(credentials) {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

export async function logout() {
  const response = await fetch("/api/logout", { method: "POST" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
}

export async function getCurrentUser() {
  const response = await fetch("/api/me");
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

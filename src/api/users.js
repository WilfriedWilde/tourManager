export async function register(credentials) {
  const response = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const err = new Error(errorBody?.message || `HTTP ${response.status}`);
    err.code = errorBody?.code;
    throw err;
  }

  return response.json();
}

export async function login(credentials) {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const err = new Error(errorBody?.message || `HTTP ${response.status}`);
    err.code = errorBody?.code;
    console.log(errorBody);
    throw err;
  }

  return response.json();
}

export async function logout() {
  const response = await fetch("/api/logout", { method: "POST" });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const err = new Error(errorBody?.message || `HTTP ${response.status}`);
    err.code = errorBody?.code;
    throw err;
  }
}

export async function getCurrentUser() {
  const response = await fetch("/api/me");
  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const err = new Error(errorBody?.message || `HTTP ${response.status}`);
    err.code = errorBody?.code;
    throw err;
  }

  return response.json();
}

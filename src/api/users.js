export async function login(email, password) {
    const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
}
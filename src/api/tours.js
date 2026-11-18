export async function getTours() {
  const response = await fetch("/api/tours");
  if (!response.ok) {
    const errBody = await response.json().catch(() => null);
    const err = new Error(errBody?.message || `HTTP ${response.status}`);
    err.code = errBody?.code;
    throw err;
  }

  return response.json();
}

export async function createTour(data) {
  const response = await fetch("/api/tours", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errBody = await response.json().catch(() => null);
    const err = new Error(errBody?.code || `HTTP ${response.status}`);
    err.code = errBody?.code;
    err.errors = errBody?.errors;

    throw err;
  }

  return response.json();
}

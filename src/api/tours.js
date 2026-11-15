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

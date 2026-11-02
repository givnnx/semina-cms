import { cookies } from "next/headers";

const BASE_URL =
  process.env.API_INTERNAL_URL ||
  process.env.NEXT_PUBLIC_API_HOST_DEV ||
  "http://localhost:9000/api";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

// Helper to get token from cookies
async function getAuthHeader(): Promise<Record<string, string>> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchData(endpoint: string, options: FetchOptions = {}) {
  const authHeader = await getAuthHeader();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...authHeader,
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Parse JSON response safely
  let data;
  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }

  if (!response.ok) {
    // Throw an error with the response message or struct
    const errorMessage = data?.msg || data?.message || response.statusText;
    throw new Error(errorMessage);
  }

  return data;
}

export async function postData(
  endpoint: string,
  body: unknown,
  isFormData = false,
) {
  const authHeader = await getAuthHeader();
  const headers: Record<string, string> = { ...authHeader };

  // fetch automatically sets Content-Type to multipart/form-data when body is FormData
  // so we only explicitly set Content-Type: application/json when it's NOT FormData
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers,
    body: isFormData ? (body as BodyInit) : JSON.stringify(body),
  });

  let data;
  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }

  if (!response.ok) {
    const errorMessage = data?.msg || data?.message || response.statusText;
    throw new Error(errorMessage);
  }

  return data;
}

export async function putData(endpoint: string, body: unknown, isFormData = false) {
  const authHeader = await getAuthHeader();
  const headers: Record<string, string> = { ...authHeader };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "PUT",
    headers,
    body: isFormData ? (body as BodyInit) : JSON.stringify(body),
  });

  let data;
  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }

  if (!response.ok) {
    const errorMessage = data?.msg || data?.message || response.statusText;
    throw new Error(errorMessage);
  }

  return data;
}

export async function deleteData(endpoint: string) {
  const authHeader = await getAuthHeader();
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers: { ...authHeader },
  });

  let data;
  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }

  if (!response.ok) {
    const errorMessage = data?.msg || data?.message || response.statusText;
    throw new Error(errorMessage);
  }

  return data;
}

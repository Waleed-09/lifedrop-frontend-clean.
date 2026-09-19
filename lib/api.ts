const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api/v1';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  let token = typeof window !== 'undefined' ? localStorage.getItem('lifedrop_token') : null;

  // Ensure fallback token if user session exists
  if (!token && typeof window !== 'undefined') {
    const savedUser = localStorage.getItem('lifedrop_user');
    if (savedUser) {
      token = 'lifedrop_mock_jwt_bearer_token_123456';
    }
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  // Build target URL
  let fullUrl: string;
  if (endpoint.startsWith('http')) {
    fullUrl = endpoint;
  } else if (endpoint.startsWith('/api/v1')) {
    fullUrl = endpoint;
  } else {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    fullUrl = API_BASE_URL.endsWith('/api/v1') || API_BASE_URL === '/api/v1'
      ? `${API_BASE_URL}${cleanEndpoint}`
      : `${API_BASE_URL}/api/v1${cleanEndpoint}`;
  }

  try {
    const response = await fetch(fullUrl, {
      ...options,
      headers,
    });

    const contentType = response.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { message: text || response.statusText };
    }

    if (!response.ok) {
      throw new Error(data.message || data.error || `API error (${response.status})`);
    }

    return data;
  } catch (err: any) {
    // If external PHP server connection fails (e.g. localhost:8000 unreachable), try local Next.js route
    if (
      (err.name === 'TypeError' || err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) &&
      !fullUrl.startsWith('/api/v1')
    ) {
      console.warn(`[LifeDrop API] External PHP backend unreachable at ${fullUrl}. Using local Next.js API handler.`);
      try {
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        const localUrl = endpoint.startsWith('/api/v1') ? endpoint : `/api/v1${cleanEndpoint}`;
        const localResponse = await fetch(localUrl, {
          ...options,
          headers,
        });
        if (localResponse.ok) {
          return await localResponse.json();
        }
      } catch {
        // Ignore secondary fallback error
      }
    }
    
    throw err;
  }
}
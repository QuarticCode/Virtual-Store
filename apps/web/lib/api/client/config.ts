
export function getApiBaseUrl(): string {
  const baseUrl = process.env.API_BASE_URL;
  
  if (!baseUrl) {
    throw new Error(
      'API_BASE_URL not configured.\n\n'
    );
  }
  
  return baseUrl;
}

export function buildUrl(
  path: string,
  params?: Record<string, string | number | boolean | undefined | null>,
  arrayParams?: Record<string, (string | number)[]>
): string {
  const baseUrl = getApiBaseUrl(); 
  const url = new URL(path, baseUrl);

  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, String(value));
      }
    });
  }

  
  if (arrayParams) {
    Object.entries(arrayParams).forEach(([key, values]) => {
      if (values && values.length > 0) {
        values.forEach(value => {
          url.searchParams.append(key, String(value));
        });
      }
    });
  }

  return url.toString();
}

export function getAuthHeaders(): Record<string, string> {
  const user = process.env.API_USERNAME;
  const pass = process.env.API_PASSWORD;

  if (!user || !pass) {
    throw new Error('API credentials not configured');
  }

  const token = Buffer.from(`${user}:${pass}`).toString('base64');

  return {
    'Authorization': `Basic ${token}`,
    'Content-Type': 'application/json',
  };
}
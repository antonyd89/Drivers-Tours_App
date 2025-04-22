export async function getRequest<T>(
  url: string,
  accessToken: string,
): Promise<T> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-collection-access-token': accessToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const { data: result } = await response.json();

    if (!Array.isArray(result.data)) {
      throw new Error(`Expected 'result.data' return an array. result is:${JSON.stringify(result)}`);
    }

    return result.data;
  } catch (error) {
    console.error('Error occurred:', (error as Error).message);
    throw error;
  }
}

import { Case } from '../types';

export async function deleteCase(id: number): Promise<Case> {
  const options: RequestInit = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const url = `${import.meta.env.VITE_API_URL}/cases/${id}`;
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error(`Error deleting case: ${res.status}`);
  }

  return res.json() as Promise<Case>;
}

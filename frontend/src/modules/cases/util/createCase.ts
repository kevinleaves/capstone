import { CreateCaseDto } from '../types';

export async function createCase(body: CreateCaseDto) {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  const url = `${import.meta.env.VITE_API_URL}/cases/`;
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error(`Error creating case: ${res.status}`);
  }

  return res.json();
}

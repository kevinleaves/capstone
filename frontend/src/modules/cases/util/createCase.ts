import { CreateCaseDto } from '../types';

export async function createCase(body: CreateCaseDto) {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  const url = 'http://localhost:3001/cases/';
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error(`Error creating case: ${res.status}`);
  }

  return res.json();
}

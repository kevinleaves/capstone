import { UpdateCaseDto } from '../types';

export async function updateCase(id: number, body: UpdateCaseDto) {
  const options: RequestInit = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  const url = `http://localhost:3001/cases/${id}`;
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error(`Error updating case: ${res.status}`);
  }

  return res.json();
}

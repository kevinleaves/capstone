export const fetchCases = async (caseId?: number) => {
  if (!caseId) {
    const url = `${import.meta.env.VITE_API_URL}/cases/`;
    const res = await fetch(url);

    if (!res.ok) throw new Error('Failed to fetch all posts');
    return res.json();
  } else {
    const url = `${import.meta.env.VITE_API_URL}/cases/${caseId}`;
    const res = await fetch(url);
    console.log(res);
    if (!res.ok) throw new Error('Failed to fetch post');
    return res.json();
  }
};

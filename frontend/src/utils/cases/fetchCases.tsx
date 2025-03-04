export const fetchCases = async (caseId?: number) => {
  if (!caseId) {
    const res = await fetch(`http://localhost:3001/cases`);

    if (!res.ok) throw new Error('Failed to fetch all posts');
    return res.json();
  } else {
    const res = await fetch(`http://localhost:3001/cases/${caseId}`);
    console.log(res);
    if (!res.ok) throw new Error('Failed to fetch post');
    return res.json();
  }
};

const base = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:4000';
export async function health() {
  const r = await fetch(`${base}/health`);
  return r.json();
}
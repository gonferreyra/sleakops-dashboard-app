export async function fetchItems() {
  const url = process.env.NEXT_PUBLIC_API_URL;

  if (!url) {
    throw new Error('NEXT_PUBLIC_API_URL is not set');
  }

  const res = await fetch(url, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Error getting data from API');

  return res.json();
}

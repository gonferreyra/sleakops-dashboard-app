export const fetchItems = async () => {
  const response = await fetch('/api/proxy');

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  const data = await response.json();
  return data;
};

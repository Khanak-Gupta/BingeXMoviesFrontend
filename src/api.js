// src/api.js
export const getMovies = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/movies`);
  const data = await res.json();
  return data;
};

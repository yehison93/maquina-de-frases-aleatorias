const url = "https://api.quotable.io/random";
export const getQuotes = async () => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

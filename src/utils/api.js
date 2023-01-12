export async function get(path, query) {
  const response = await fetch(
    `${process.env.HOST}${path}?${new URLSearchParams(query).toString()}`,
    { headers: { Authorization: `token ${process.env.TOKEN}` } }
  );

  return await response.json();
}

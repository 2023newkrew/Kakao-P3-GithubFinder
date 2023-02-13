export async function get(path, query) {
  const response = await fetch(
    `${process.env.HOST}${path}?${new URLSearchParams(query).toString()}`,
    { headers: { Authorization: `token ${process.env.TOKEN}` } }
  );
  const json = await response.json();

  if (!response.ok) throw new Error(json.message);

  return json;
}

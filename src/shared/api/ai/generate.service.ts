export default async function generateBlocks(prompt: string) {
  const response = await fetch(
    `http://localhost:8080/api/ai/parse?prompt=${prompt}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  );

  const data = await response.json();

  return await data;
}

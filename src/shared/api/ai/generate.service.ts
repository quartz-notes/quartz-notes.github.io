export default async function generateBlocks(prompt: string) {
  const response = await fetch("https://localhost:3000/api/ai/parse", {
    method: "POST",
    body: JSON.stringify({
      prompt: prompt,
    }),
  });

  const data = await response.json();

  return data;
}

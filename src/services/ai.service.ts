

export default function getAIResponse(prompt: string) {
    console.log(prompt);
    return fetch('/api/ai', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
    })
    .then((res) => res.json())
};
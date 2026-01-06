export async function onRequestPost(context) {
  const { request, env } = context;
  const { prompt } = await request.json();

  // Chamada para o Hugging Face usando a variável de ambiente secreta
  const response = await fetch(
    "https://api-inference.huggingface.co/models/Tongyi-MAI/Z-Image-Turbo",
    {
      headers: {
        Authorization: `Bearer ${env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: prompt }),
    }
  );

  const blob = await response.blob();
  return new Response(blob, { headers: { "Content-Type": "image/png" } });
}

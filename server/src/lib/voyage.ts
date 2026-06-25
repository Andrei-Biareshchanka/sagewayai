const VOYAGE_API_URL = "https://api.voyageai.com/v1/embeddings";
const MODEL = "voyage-3";

async function requestEmbeddings(
  texts: string[],
  inputType: "query" | "document"
): Promise<{ data: { embedding: number[] }[] }> {
  const apiKey = process.env.VOYAGE_API_KEY;
  if (!apiKey) throw new Error("VOYAGE_API_KEY is not set");

  const response = await fetch(VOYAGE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ input: texts, model: MODEL, input_type: inputType }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Voyage AI error ${response.status}: ${error}`);
  }

  return (await response.json()) as { data: { embedding: number[] }[] };
}

export async function getEmbeddings(
  texts: string[],
  inputType: "query" | "document"
): Promise<number[][]> {
  const data = await requestEmbeddings(texts, inputType);
  return data.data.map((item) => item.embedding);
}

export async function getEmbedding(
  text: string,
  inputType: "query" | "document"
): Promise<number[]> {
  const [embedding] = await getEmbeddings([text], inputType);
  return embedding;
}

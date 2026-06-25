import { GoogleGenAI } from "@google/genai";

const DEFAULT_MODELS = ["gemini-3.5-flash", "gemini-3.1-flash-lite"];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getCandidateModels() {
  return [process.env.GEMINI_MODEL, ...DEFAULT_MODELS].filter(
    (model, index, models): model is string =>
      Boolean(model) && models.indexOf(model) === index,
  );
}

function isRetryableGeminiError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes("503") ||
    message.includes("UNAVAILABLE") ||
    message.includes("high demand")
  );
}

export async function generateGeminiContent(params: {
  apiKey: string;
  contents: {
    role: "user";
    parts: { text: string }[];
  }[];
  config?: Record<string, unknown>;
}) {
  const genAI = new GoogleGenAI({ apiKey: params.apiKey });
  const models = getCandidateModels();
  let lastError: unknown;

  for (const model of models) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const result = await genAI.models.generateContent({
          model,
          contents: params.contents,
          config: params.config,
        });

        return { result, model };
      } catch (error) {
        lastError = error;

        if (!isRetryableGeminiError(error) || attempt === 3) {
          break;
        }

        await sleep(1000 * attempt);
      }
    }
  }

  throw lastError;
}

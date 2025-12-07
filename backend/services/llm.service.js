import Groq from "groq-sdk";
import ApiError from "../utils/apiError.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// MODEL NAMES
const CHAT_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
const EMBED_MODEL =
  process.env.GROQ_EMBEDDING_MODEL || "llama-embed-english-v1";

// -------------------------- EMBEDDINGS --------------------------
export const getEmbedding = async (text) => {
  try {
    const result = await groq.embeddings.create({
      model: EMBED_MODEL,
      input: text,
    });

    return result.data[0].embedding;
  } catch (err) {
    console.error("🔥 Groq Embedding Error:", err);
    throw new ApiError(500, "Failed to generate embeddings");
  }
};

// ---------------------- CHAT COMPLETION ------------------------
export const generateAIAnswer = async (query) => {
  try {
    const chat = await groq.chat.completions.create({
      model: CHAT_MODEL,
      messages: [
        {
          role: "system",
          content: "You are a helpful customer support assistant.",
        },
        { role: "user", content: query },
      ],
      max_completion_tokens: 200,
      temperature: 0.5,
    });

    return { answer: chat.choices[0].message.content };
  } catch (err) {
    console.error("🔥 Groq Chat Error:", err);
    throw new ApiError(500, "Groq Chat Completion Failed");
  }
};

// ------------------------- SUMMARY -----------------------------
export const summarizeConversation = async (session) => {
  const messages = [];

  session.userMessages.forEach((m) => messages.push(`User: ${m.message}`));
  session.botMessages.forEach((m) => messages.push(`Bot: ${m.message}`));

  try {
    const result = await groq.chat.completions.create({
      model: CHAT_MODEL,
      messages: [
        {
          role: "system",
          content: "Summarize this conversation in bullet points.",
        },
        { role: "user", content: messages.join("\n") },
      ],
      max_completion_tokens: 150,
    });

    return result.choices[0].message.content;
  } catch (err) {
    console.error("🔥 Groq Summarization Error:", err);
    throw new ApiError(500, "Failed to summarize conversation");
  }
};

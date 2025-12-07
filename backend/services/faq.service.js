const FAQ = require("../models/FAQ.model");
const { getEmbedding } = require("./llm.service");

/**
 * Cosine similarity between two vectors.
 */
const cosineSimilarity = (vecA, vecB) => {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;

  let dot = 0;
  let magA = 0;
  let magB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    magA += vecA[i] * vecA[i];
    magB += vecB[i] * vecB[i];
  }

  if (!magA || !magB) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
};

/**
 * Simple word overlap similarity as fallback.
 */
const textOverlapSimilarity = (text1, text2) => {
  const wordsA = new Set(text1.toLowerCase().split(/\W+/).filter(Boolean));
  const wordsB = new Set(text2.toLowerCase().split(/\W+/).filter(Boolean));

  if (wordsA.size === 0 || wordsB.size === 0) return 0;

  let matches = 0;
  for (const word of wordsA) {
    if (wordsB.has(word)) matches++;
  }

  return matches / Math.max(wordsA.size, wordsB.size);
};

/**
 * Finds the best matching FAQ using embeddings if available.
 * Returns: { faq, score }
 */
const findBestFAQMatch = async (query) => {
  const faqs = await FAQ.find();

  if (!faqs || faqs.length === 0) {
    return { faq: null, score: 0 };
  }

  let useEmbedding = true;
  let queryEmbedding = null;

  try {
    queryEmbedding = await getEmbedding(query);
  } catch (err) {
    console.warn("⚠️ Falling back to word-overlap similarity for FAQ matching");
    useEmbedding = false;
  }

  let bestFAQ = null;
  let bestScore = 0;

  for (const faq of faqs) {
    let score = 0;

    if (useEmbedding) {
      // Embedding-based similarity using question text
      let faqEmbedding;
      try {
        faqEmbedding = await getEmbedding(faq.question);
        score = cosineSimilarity(queryEmbedding, faqEmbedding);
      } catch (err) {
        // If embedding fails for any particular FAQ, fallback for that one
        score = textOverlapSimilarity(query, faq.question);
      }
    } else {
      // Fallback for all
      score = textOverlapSimilarity(query, faq.question);
    }

    if (score > bestScore) {
      bestScore = score;
      bestFAQ = faq;
    }
  }

  return { faq: bestFAQ, score: bestScore };
};

module.exports = {
  findBestFAQMatch,
};

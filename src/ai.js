/**
 * ai.js — Optional AI roast via Gemini API
 *
 * Falls back gracefully to the local roast library if:
 * - No API key present
 * - Network unavailable
 * - API error
 * - Response malformed
 * - Request times out
 */

import { getRoast } from './roasts.js';

const TIMEOUT_MS = 8000;

/**
 * Generate a personalized AI roast
 * @param {{ bmi: number, categoryKey: string, categoryLabel: string, age: number }} params
 * @param {string|null} apiKey  Gemini API key (optional)
 * @returns {Promise<{ text: string, source: 'ai'|'local' }>}
 */
export async function getAIRoast({ bmi, categoryKey, categoryLabel, age }, apiKey) {
  if (!apiKey || !navigator.onLine) {
    return { text: getRoast(categoryKey), source: 'local' };
  }

  const prompt = buildPrompt({ bmi, categoryLabel, age });

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            maxOutputTokens: 60,
            temperature: 1.1,
          },
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          ],
        }),
      }
    );

    clearTimeout(timer);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!text || text.length < 5) throw new Error('Empty response');

    return { text, source: 'ai' };
  } catch {
    // Any failure → silently fall back to local roast
    return { text: getRoast(categoryKey), source: 'local' };
  }
}

function buildPrompt({ bmi, categoryLabel, age }) {
  return `You are the world's most dramatic and unnecessarily savage BMI calculator.
Generate ONE short, funny, playful roast (15-25 words max) for someone with:
- BMI: ${bmi.toFixed(1)}
- Category: ${categoryLabel}
- Age: ${age}

Rules:
- Be absurd and dramatic, NOT mean-spirited
- Target the situation, not the person's worth
- No medical advice, no diet tips
- No sexual content, no protected characteristics
- No dangerous suggestions
- Just pure comedic chaos

Reply with ONLY the roast text, no quotes, no extra words.`;
}

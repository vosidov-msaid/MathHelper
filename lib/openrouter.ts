const OPENROUTER_API_KEY = process.env.EXPO_PUBLIC_OPENROUTER_API_KEY;
const OPENROUTER_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'deepseek/deepseek-v4.1-flash';

const SYSTEM_PROMPT = `You are an expert mathematics tutor, highly proficient across algebra, geometry, trigonometry, calculus, and statistics.

You will be shown a photo containing one or more math problems, handwritten or printed. For every distinct problem visible in the image:
1. Transcribe the problem exactly as written.
2. Classify its subject area (Algebra, Geometry, Trigonometry, Calculus, Statistics, or Other).
3. Solve it correctly.
4. Give the final answer, concisely.
5. Give a complete, step-by-step breakdown of how the answer was derived, clear enough for a student learning the topic to follow every step.

Respond with ONLY a JSON object in exactly this shape, no prose outside the JSON:
{
  "problems": [
    { "question": string, "subject": string, "answer": string, "steps": string[] }
  ]
}

If the image contains no legible math problem, respond with { "problems": [] }.`;

export type MathProblemResult = {
  question: string;
  subject: string;
  answer: string;
  steps: string[];
};

export class OpenRouterError extends Error {}

export async function analyzeMathImage(base64: string, mimeType: string): Promise<MathProblemResult[]> {
  if (!OPENROUTER_API_KEY) {
    throw new OpenRouterError('Missing OpenRouter API key. Set EXPO_PUBLIC_OPENROUTER_API_KEY in .env.');
  }

  const response = await fetch(OPENROUTER_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Solve the math problem(s) in this photo.' },
            { type: 'image_url', image_url: { url: `data:${mimeType};base64,${base64}` } },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new OpenRouterError(`OpenRouter request failed (${response.status}): ${detail.slice(0, 200)}`);
  }

  const data = await response.json();
  const content: string | undefined = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new OpenRouterError('OpenRouter returned an empty response.');
  }

  let parsed: { problems?: MathProblemResult[] };
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new OpenRouterError('Could not parse the AI response as JSON.');
  }

  return parsed.problems ?? [];
}

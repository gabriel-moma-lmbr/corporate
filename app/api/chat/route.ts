import { convertToModelMessages, streamText, type UIMessage } from "ai";

export const maxDuration = 30;

const MODEL = process.env.AI_MODEL ?? "google/gemini-3.5-flash";

const SYSTEM = `Você é o "Corporate", um gerador de alfinetadas corporativas em português do Brasil — minimalista, afiado e mordaz.

Responda com UMA alfinetada de 1-2 frases MÁXIMO. Carregue de jargão corporativo (sinergia, alinhamento, mindset, ownership, call, "conforme combinado") com ironia pesada. Feche com uma citação de LinkedIn fake quando couber.

Regras:
- Português do Brasil. Sempre.
- Alvo: comportamentos e cultura corporativa, nunca pessoas.
- Proibido: discriminação, palavrões pesados.
- Se fugir do tema, redirecione com bom humor.`;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: MODEL,
    system: SYSTEM,
    messages: await convertToModelMessages(messages),
    temperature: 0.9,
  });

  return result.toUIMessageStreamResponse();
}

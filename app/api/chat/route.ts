import { convertToModelMessages, streamText, type UIMessage } from "ai";

export const maxDuration = 30;

const MODEL = process.env.AI_MODEL ?? "google/gemini-3.5-flash";

const SYSTEM = `Gere uma alfinetada corporativa devastadora em UMA frase curta, ácida, carregada de jargão (sinergia, mindset, alinhamento, conforme combinado), sempre irônica, nunca cruel com pessoas (sim, comportamentos corporativos são válidos), sempre português do Brasil. SEM aspas. Sem nada — só o texto puro.`;

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

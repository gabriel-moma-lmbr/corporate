"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";

const SURPRESAS = [
  "uma reunião que claramente poderia ter sido um e-mail",
  "o colega que responde tudo com 'conforme alinhado'",
  "o estagiário que fez deploy na sexta-feira às 17h58",
  "o gerente que marca call de 'alinhamento rápido' de uma hora",
  "quem responde e-mail de madrugada e cobra às 8h",
  "a pessoa que fala 'vamos tirar isso do papel' há três trimestres",
  "o chefe que pede 'só um ajuste finho' na apresentação inteira",
  "quem coloca a empresa inteira em cópia no e-mail",
  "o colega que vira a câmera desligada em toda reunião",
  "quem agenda reunião às 18h de sexta-feira",
  "a pessoa que diz 'não é sobre o salário, é sobre o propósito'",
  "o RH que anuncia corte de custos com festa temática",
  "quem usa 'per si', 'vide' e 'outrossim' no Slack",
  "o dono da startup que se chama de 'head visionário'",
  "quem marca 'daily' que dura mais que a sprint",
];

const SUGESTOES = [
  "Meu chefe marcou reunião às 18h de sexta",
  "O colega respondeu 'conforme alinhado' de novo",
  "Fizeram deploy na sexta e sumiram",
  "A daily de 15 minutos durou 1 hora",
];

export default function Home() {
  const { messages, sendMessage, status, error } = useChat();
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function enviar(texto: string) {
    const t = texto.trim();
    if (!t || busy) return;
    sendMessage({ text: t });
    setInput("");
  }

  function surpreender() {
    const tema = SURPRESAS[Math.floor(Math.random() * SURPRESAS.length)];
    enviar(`Surpreenda-me com uma alfinetada sobre: ${tema}.`);
  }

  return (
    <main className="shell">
      <header className="topo">
        <div className="marca">
          <span className="logo">👔</span>
          <div>
            <h1>Corporate</h1>
            <p>Alfinetadas corporativas sob medida. Com sinergia.</p>
          </div>
        </div>
        <button
          className="btn-surpresa"
          onClick={surpreender}
          disabled={busy}
          title="Sortear um tema e alfinetar"
        >
          🎲 Surpreenda-me
        </button>
      </header>

      <section className="conversa">
        {messages.length === 0 && (
          <div className="vazio">
            <p className="vazio-titulo">
              Descreva o contexto — a reunião, o colega, o e-mail
              passivo-agressivo — e receba a alfinetada perfeita.
            </p>
            <div className="chips">
              {SUGESTOES.map((s) => (
                <button key={s} className="chip" onClick={() => enviar(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`bolha ${m.role === "user" ? "usuario" : "bot"}`}
          >
            {m.role === "assistant" && <span className="avatar">👔</span>}
            <div className="texto">
              {m.parts.map((p, i) =>
                p.type === "text" ? <p key={i}>{p.text}</p> : null
              )}
            </div>
          </div>
        ))}

        {status === "submitted" && (
          <div className="bolha bot">
            <span className="avatar">👔</span>
            <div className="texto digitando">
              alinhando os ponteiros<span className="reticencias">…</span>
            </div>
          </div>
        )}

        {error && (
          <div className="erro">
            O RH bloqueou essa mensagem. Tente novamente em instantes.
          </div>
        )}

        <div ref={endRef} />
      </section>

      <form
        className="rodape"
        onSubmit={(e) => {
          e.preventDefault();
          enviar(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Descreva o contexto… ex.: meu chefe pediu 'só um ajuste finho'"
          aria-label="Contexto para a alfinetada"
        />
        <button type="submit" disabled={busy || !input.trim()}>
          {busy ? "Alinhando…" : "Alfinetar"}
        </button>
      </form>

      <footer className="aviso">
        Humor corporativo gerado por IA. Use com moderação e fora do horário
        comercial.
      </footer>
    </main>
  );
}

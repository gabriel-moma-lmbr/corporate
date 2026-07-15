import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Corporate — Gerador de Alfinetadas",
  description:
    "Diga-nos o que a pessoa fez e a IA fará o resto. Sem culpa. Sem provas.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

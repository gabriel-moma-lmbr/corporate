import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Corporate — Alfinetadas Corporativas",
  description:
    "Descreva o contexto e receba a alfinetada corporativa perfeita. Sinergia, mindset e deboche sob medida.",
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

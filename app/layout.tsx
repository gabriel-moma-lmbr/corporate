import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Corporate — Alfinetadas Corporativas",
  description:
    "Descreva o crime. Receba a sentença. A IA não se importa com seus sentimentos.",
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

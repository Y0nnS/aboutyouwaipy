import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hei kamu.",
  description: "Pesan kecil buat kamu yang lagi berjuang soal cinta.",
  openGraph: {
    title: "Hei kamu.",
    description: "Pesan kecil buat kamu yang lagi berjuang soal cinta.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Hei kamu.",
    description: "Pesan kecil buat kamu yang lagi berjuang soal cinta.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}

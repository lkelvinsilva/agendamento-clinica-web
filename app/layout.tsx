import type { Metadata } from "next";
import { BookingProvider } from "@/components/agendamento/BookingContext";

import "./globals.css";

export const metadata: Metadata = {
  title: "Clínica.",
  description: "Consultórios preparados para o seu atendimento.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <BookingProvider>
          {children}
        </BookingProvider>
      </body>
    </html>
  );
}
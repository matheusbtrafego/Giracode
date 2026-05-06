import "./globals.css";

export const metadata = {
  title: "Gira CODE - Formulário Inteligente",
  description: "Formulário de captura com rastreamento de QR Code",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

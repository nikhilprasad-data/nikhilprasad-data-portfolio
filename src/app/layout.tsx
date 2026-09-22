// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Portfolio — AI & Backend Engineer',
  description:
    'Personal portfolio of a Data Science & AI student at IIT Guwahati. Specializing in LLM orchestration, multi-agent architectures, and high-throughput backend systems.',
  keywords: [
    'AI Engineer',
    'Backend Engineer',
    'LLM',
    'LangChain',
    'LangGraph',
    'FastAPI',
    'Python',
    'IIT Guwahati',
    'Portfolio',
  ],
  authors: [{ name: 'Portfolio Placeholder' }],
  openGraph: {
    title: 'Portfolio — AI & Backend Engineer',
    description:
      'Specializing in LLM orchestration, multi-agent architectures, and high-throughput backend systems.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Global noise grain texture */}
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

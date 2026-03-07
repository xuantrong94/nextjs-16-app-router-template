import { ReactNode } from "react";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { ReactQueryProvider } from "@/providers/react-qurey-provider";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <html lang='en'>
        <head>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1'
          />
          <title>Hello Template</title>
        </head>
        <body className={cn("antialiased", montserrat.variable)}>
          {children}
          <SpeedInsights />
        </body>
      </html>
    </ReactQueryProvider>
  );
}

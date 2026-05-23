import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { applicationString } from "./variables/enum";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: applicationString.applicationTitle,
  description: applicationString.applicationOwnerDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${quicksand.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

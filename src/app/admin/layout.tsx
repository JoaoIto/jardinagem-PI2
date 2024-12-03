import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Sidebar from "../components/Sidebar";

/* const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
}); */
/* const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
}); */

const anekBangla = localFont({
  src: "../fonts/AnekBangla-VariableFont_wdth,wght.ttf",
  variable: "--font-anek-bangla",
  weight: "400 700",
})

export const metadata: Metadata = {
  title: "L&L Jardinagem",
  description: "Prestadora de serviços de jardinagem L&L",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${anekBangla.variable} antialiased`}
      >
        <div className="h-full w-full">
          <Sidebar />
        {children}
        </div>
      </body>
    </html>
  );
}

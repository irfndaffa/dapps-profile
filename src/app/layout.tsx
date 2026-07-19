import type { Metadata } from "next";
import Preloader from "@/components/preloader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Irfandio Daffa Agustantio — Backend Software Engineer",
  description:
    "Backend Software Engineer building scalable, reliable, and maintainable backend systems with Java Spring Boot, Node.js, and Go.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("theme");var t=s==="dark"||s==="light"?s:"light";document.documentElement.dataset.theme=t;}catch(e){}})();`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <Preloader />
        {children}
      </body>
    </html>
  );
}

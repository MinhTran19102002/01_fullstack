
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@/app/globals.css"
import NextAuthWrapper from "@/library/next.auth.wrapper";

// const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Vé Xe Pro",
  icons: {
    icon: '/logo.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <NextAuthWrapper>
          <AntdRegistry> {children}</AntdRegistry>
        </NextAuthWrapper>
      </body>
    </html>
  );
}

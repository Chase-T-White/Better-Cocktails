import "./globals.css";
import Navbar from "./auth/Nav";
import QueryWrapper from "./auth/QueryWrapper";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className}`}>
        <QueryWrapper>
          <Navbar />
          {children}
        </QueryWrapper>
      </body>
    </html>
  );
}

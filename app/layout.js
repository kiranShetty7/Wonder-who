import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wonder who?",
  description: "Curious to know more about yourself? Wonder who? is here to give you intriguing insights into your age, gender, and possible country of origin based on your name !",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

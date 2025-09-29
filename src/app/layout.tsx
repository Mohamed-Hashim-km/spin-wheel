import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maya Traders Spin Wheel | Mangalore Fireworks Delivery",
  description:
    "Play the Maya Traders Lucky Spin Wheel and win exciting eco-friendly fireworks prizes. Powered by Mangalore Fireworks Delivery – your trusted source for green fireworks in Mangalore.",
  keywords: [
    "Maya Traders",
    "Mangalore Fireworks Delivery",
    "Lucky Spin Wheel",
    "Eco-friendly fireworks",
    "Green fireworks",
    "KMK Group",
    "Mangalore fireworks",
    "Festival offers",
    "Spin to win",
  ],
  authors: [{ name: "Maya Traders" }],
  creator: "Maya Traders - KMK Group",
  publisher: "Maya Traders",
  openGraph: {
    title: "Maya Traders Spin Wheel | Mangalore Fireworks Delivery",
    description:
      "Win eco-friendly fireworks with the Maya Traders Lucky Spin Wheel. Free home delivery within Mangalore city!",
    url: "https://mangalorefireworksdelivery.com",
    siteName: "Mangalore Fireworks Delivery - Maya Traders",
    images: [
      {
        url: "https://mayatraders.in/wp-content/uploads/2024/09/LOGO.jpg", // replace with actual logo/OG image
        width: 1200,
        height: 630,
        alt: "Maya Traders Lucky Spin Wheel",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maya Traders Spin Wheel | Mangalore Fireworks Delivery",
    description:
      "Try your luck with the Maya Traders Lucky Spin Wheel and win eco-friendly fireworks today!",
    images: ["https://mayatraders.in/wp-content/uploads/2024/09/LOGO.jpg"], // replace with actual logo/OG image
  },
  metadataBase: new URL("https://mangalorefireworksdelivery.com"),
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}

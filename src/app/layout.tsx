import type { Metadata } from "next";
import { Onest, Playfair_Display } from "next/font/google";
import { PageTransition } from "@/components/PageTransition";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Скульпт Клиник | Стоматология в Рязани",
  description:
    "Скульпт Клиник, Рязань, Касимовское шоссе, 8, корп. 2. Клиника современной стоматологии. Ежедневно с 09:00 до 21:00.",
  openGraph: {
    title: "Sculpt Clinic",
    description: "Эстетическая стоматология премиум-класса",
    images: ["/img/hero.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${onest.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-clip">
        <SmoothScroll>
          {children}
          <PageTransition />
        </SmoothScroll>
      </body>
    </html>
  );
}

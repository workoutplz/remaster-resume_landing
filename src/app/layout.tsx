import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Remaster Resume - 이력서로 만들어가는 나만의 커리어 기회",
    template: "%s | Remaster Resume"
  },
  description: "나의 커리어 목표를 설정하고 이력서를 업로드하세요. Candid만의 AI가 분석한 이력서 기반 커리어 리포트와 커리어 목표 달성 액션 플랜을 제공합니다.",
  keywords: [
    "이력서 분석", 
    "커리어 성장", 
    "AI 커리어 코치", 
    "취업 준비", 
    "커리어 목표", 
    "이력서 피드백",
    "커리어 컨설팅",
    "취업 지원",
    "커리어 개발",
    "Candid",
    "AI 분석"
  ],
  authors: [{ name: "Candid", url: "https://teamcandid.kr" }],
  creator: "Candid",
  publisher: "Candid",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://remaster-resume.vercel.app",
    siteName: "Remaster Resume",
    title: "Remaster Resume - 이력서로 만들어가는 나만의 커리어 기회",
    description: "나의 커리어 목표를 설정하고 이력서를 업로드하세요. Candid만의 AI가 분석한 이력서 기반 커리어 리포트와 커리어 목표 달성 액션 플랜을 제공합니다.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Remaster Resume - AI 기반 커리어 성장 플랫폼",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Remaster Resume - 이력서로 만들어가는 나만의 커리어 기회",
    description: "Candid만의 AI가 분석한 이력서 기반 커리어 리포트와 액션 플랜을 받아보세요.",
    images: ["/og-image.png"],
    creator: "@candid_kr",
  },
  verification: {
    google: "google-site-verification-code", // Google Search Console에서 발급받은 코드로 교체
  },
  alternates: {
    canonical: "https://remaster-resume.vercel.app",
  },
  category: "career development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

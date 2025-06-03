import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import StructuredData from "./structured-data"

export const metadata: Metadata = {
  title: {
    default: "情侣飞行棋 | 情趣互动游戏增进感情神器 | 真心话大冒险挑战 - 爱情飞行棋",
    template: "%s | 爱情飞行棋",
  },
  description:
    "还在为情侣约会玩什么发愁？爱情飞行棋来啦！融合经典飞行棋+真心话大冒险+趣味挑战，超多互动环节让感情迅速升温。情趣DIY设计，专属情侣礼物，异地恋也能甜蜜互动！点击了解玩法，开启欢乐时光！",
  keywords:
    "情侣飞行棋,情侣桌游,情侣互动游戏,情趣情侣礼物,情人节礼物,恋爱游戏,增进感情的游戏,异地恋情侣游戏,情侣约会游戏,真心话大冒险,情侣破冰游戏,情侣升温游戏,couple flight chess,couple board game,couple interactive game,romantic couple gift,valentine gift,love game,relationship building game,long distance relationship game,couple date game,truth or dare,couple icebreaker game,couple bonding game,カップル飛行チェス,カップルボードゲーム,カップルインタラクティブゲーム,ロマンチックカップルギフト,バレンタインギフト,恋愛ゲーム,関係構築ゲーム,遠距離恋愛ゲーム,カップルデートゲーム,真実か挑戦か,カップルアイスブレーカーゲーム",
  authors: [{ name: "爱情飞行棋" }],
  creator: "爱情飞行棋",
  publisher: "爱情飞行棋",
  robots: "index, follow",
  openGraph: {
    title:
      "情侣飞行棋 - 情趣互动游戏增进感情神器 | Couple Flight Chess - Interactive Romance Game | カップル飛行チェス - インタラクティブロマンスゲーム",
    description:
      "融合经典飞行棋+真心话大冒险+趣味挑战，超多互动环节让感情迅速升温。情趣DIY设计，专属情侣礼物！ | Classic flight chess + truth or dare + fun challenges, multiple interactive elements to quickly heat up your relationship. Creative DIY design, exclusive couple gift! | クラシック飛行チェス+真実か挑戦か+楽しいチャレンジ、複数のインタラクティブ要素で関係を素早く温める。クリエイティブDIYデザイン、専用カップルギフト！",
    url: "https://cpfly.top",
    siteName: "爱情飞行棋 | Love Flight Chess | ラブフライトチェス",
    images: [
      {
        url: "https://cpfly.top/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "情侣飞行棋 - 情趣互动游戏 | Couple Flight Chess - Interactive Romance Game | カップル飛行チェス - インタラクティブロマンスゲーム",
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "情侣飞行棋 - 情趣互动游戏增进感情神器 | Couple Flight Chess | カップル飛行チェス",
    description:
      "融合经典飞行棋+真心话大冒险+趣味挑战，超多互动环节让感情迅速升温！ | Classic flight chess + truth or dare + fun challenges! | クラシック飛行チェス+真実か挑戦か+楽しいチャレンジ！",
    images: ["https://cpfly.top/images/twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://cpfly.top",
    languages: {
      "zh-CN": "https://cpfly.top",
      en: "https://cpfly.top/en",
      ja: "https://cpfly.top/ja",
    },
  },
  other: {
    "baidu-site-verification": "your-baidu-verification-code",
    "360-site-verification": "your-360-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <StructuredData />
        <link rel="canonical" href="https://cpfly.top" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ff6b9d" />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-J2KTSBL1MK"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-J2KTSBL1MK');
      `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

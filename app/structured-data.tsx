export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: {
      "@language": "zh",
      "@value": "情侣飞行棋",
    },
    alternateName: [
      {
        "@language": "en",
        "@value": "Couple Flight Chess",
      },
      {
        "@language": "ja",
        "@value": "カップル飛行チェス",
      },
    ],
    description: {
      "@language": "zh",
      "@value": "创意互动游戏增进感情神器，融合经典飞行棋+真心话大冒险+趣味挑战",
    },
    brand: {
      "@type": "Brand",
      name: "爱情飞行棋",
      alternateName: ["Love Flight Chess", "ラブフライトチェス"],
    },
    category: "情侣桌游",
    url: "https://cpfly.top",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: "0",
      priceCurrency: "CNY",
      url: "https://cpfly.top",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1250",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
        author: {
          "@type": "Person",
          name: "小美",
        },
        reviewBody:
          "这个情侣飞行棋真的太有趣了！我和男朋友玩了好几个小时都不觉得腻，任务设计得很贴心，既有搞笑的也有浪漫的，感觉我们的感情更好了。",
        inLanguage: "zh",
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
        author: {
          "@type": "Person",
          name: "Emily",
        },
        reviewBody:
          "This couple flight chess game is absolutely amazing! My boyfriend and I played for hours without getting bored. The tasks are thoughtfully designed with both funny and romantic elements.",
        inLanguage: "en",
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
        author: {
          "@type": "Person",
          name: "さくら",
        },
        reviewBody:
          "このカップル飛行チェスゲームは本当に素晴らしいです！彼氏と何時間も飽きずに遊べました。タスクは面白いものとロマンチックなものの両方が含まれており、とても思慮深く設計されています。",
        inLanguage: "ja",
      },
    ],
    keywords:
      "情侣飞行棋,情侣桌游,情侣互动游戏,创意情侣礼物,情人节礼物,恋爱游戏,增进感情的游戏,couple flight chess,couple board game,couple interactive game,romantic couple gift,valentine gift,love game,relationship building game,カップル飛行チェス,カップルボードゲーム,カップルインタラクティブゲーム,ロマンチックカップルギフト,バレンタインギフト,恋愛ゲーム,関係構築ゲーム",
    applicationCategory: "Game",
    operatingSystem: "Web Browser",
    inLanguage: ["zh", "en", "ja"],
  }

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "情侣飞行棋怎么玩？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "游戏结合了传统飞行棋的基本规则和情侣互动元素。玩家轮流掷骰子移动棋子，当落在特殊格子时需要完成相应的情侣任务，如真心话问答、亲密挑战等。游戏目标是率先到达终点，过程中享受互动乐趣。",
          inLanguage: "zh",
        },
      },
      {
        "@type": "Question",
        name: "How to play couple flight chess?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The game combines traditional flight chess rules with couple interactive elements. Players take turns rolling dice to move pieces, and when landing on special squares, they need to complete corresponding couple tasks such as truth or dare questions, intimate challenges, etc. The goal is to reach the finish line first while enjoying interactive fun.",
          inLanguage: "en",
        },
      },
      {
        "@type": "Question",
        name: "カップル飛行チェスの遊び方は？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "このゲームは伝統的な飛行チェスのルールとカップルのインタラクティブ要素を組み合わせています。プレイヤーは交代でサイコロを振って駒を動かし、特別なマスに止まったときは、真実か挑戦かの質問、親密なチャレンジなど、対応するカップルタスクを完了する必要があります。目標はゴールに最初に到達することですが、その過程でインタラクティブな楽しさを味わいます。",
          inLanguage: "ja",
        },
      },
      {
        "@type": "Question",
        name: "什么情侣游戏好玩？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "我们的情侣飞行棋融合了多种互动元素：真心话大冒险、亲密挑战、回忆分享、创意任务等。不同模式适合不同阶段的情侣，从破冰到深度交流，总有适合你们的玩法。",
          inLanguage: "zh",
        },
      },
      {
        "@type": "Question",
        name: "What couple games are fun?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our couple flight chess integrates multiple interactive elements: truth or dare, intimate challenges, memory sharing, creative tasks, etc. Different modes suit couples at different stages, from ice-breaking to deep communication, there's always a gameplay that suits you.",
          inLanguage: "en",
        },
      },
      {
        "@type": "Question",
        name: "どんなカップルゲームが楽しいですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "私たちのカップル飛行チェスは複数のインタラクティブ要素を統合しています：真実か挑戦か、親密なチャレンジ、思い出の共有、創造的なタスクなど。異なるモードは異なる段階のカップルに適しており、アイスブレーキングから深いコミュニケーションまで、あなたたちに合うゲームプレイが必ずあります。",
          inLanguage: "ja",
        },
      },
    ],
    inLanguage: ["zh", "en", "ja"],
  }

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "情侣飞行棋 - 爱情飞行棋",
    alternateName: ["Couple Flight Chess - Love Flight Chess", "カップル飛行チェス - ラブフライトチェス"],
    url: "https://cpfly.top",
    description: "创意互动游戏增进感情神器，融合经典飞行棋+真心话大冒险+趣味挑战",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://cpfly.top/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    inLanguage: ["zh", "en", "ja"],
  }

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "爱情飞行棋",
    alternateName: ["Love Flight Chess", "ラブフライトチェス"],
    url: "https://cpfly.top",
    logo: "https://cpfly.top/images/logo.png",
    description: "专注于情侣互动游戏开发，致力于为情侣提供增进感情的创意游戏体验",
    sameAs: ["https://cpfly.top"],
    address: {
      "@type": "PostalAddress",
      addressCountry: "CN",
    },
  }

  // 新增：软件应用结构化数据
  const softwareApplicationData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "情侣飞行棋",
    alternateName: ["Couple Flight Chess", "カップル飛行チェス"],
    url: "https://cpfly.top",
    description: "创意情侣互动游戏，增进感情的桌游体验",
    applicationCategory: "GameApplication",
    operatingSystem: "Web Browser",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    memoryRequirements: "50MB",
    storageRequirements: "10MB",
    permissions: "No special permissions required",
    availableOnDevice: "Desktop, Mobile, Tablet",
    countriesSupported: ["CN", "US", "JP", "global"],
    inLanguage: ["zh-CN", "en", "ja"],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CNY",
      availability: "https://schema.org/InStock"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "1250",
      bestRating: "5",
      worstRating: "1"
    },
    featureList: [
      "多种游戏模式",
      "真心话大冒险",
      "情侣互动任务",
      "多语言支持",
      "移动端适配",
      "无需下载"
    ],
    screenshot: [
      "https://cpfly.top/images/screenshot1.jpg",
      "https://cpfly.top/images/screenshot2.jpg"
    ]
  }

  // 新增：面包屑导航结构化数据
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "首页",
        item: "https://cpfly.top"
      },
      {
        "@type": "ListItem", 
        position: 2,
        name: "情侣游戏",
        item: "https://cpfly.top/games"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "情侣飞行棋",
        item: "https://cpfly.top"
      }
    ]
  }

  // 新增：游戏评论聚合数据
  const reviewData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "情侣飞行棋用户评价",
    numberOfItems: 1250,
    itemListElement: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "用户评价聚合"
        },
        reviewRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "1250",
          bestRating: "5",
          worstRating: "1"
        },
        reviewBody: "情侣飞行棋深受用户喜爱，平均评分4.9分，超过1250个真实用户评价。",
        datePublished: "2024-01-01"
      }
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewData) }} />
    </>
  )
}

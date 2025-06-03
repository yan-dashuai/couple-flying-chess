"use client"

import { Heart, Users, Gift, Gamepad2 } from "lucide-react"
import { useState, useEffect } from "react"
import type { Language } from "@/lib/i18n"

interface SEOData {
  hero: {
    title: string
    subtitle: string
    features: string[]
  }
  productFeatures: {
    title: string
    features: Array<{
      title: string
      description: string
    }>
  }
  gameHighlights: {
    title: string
    highlights: Array<{
      title: string
      description: string
    }>
  }
  gameModes: {
    title: string
    modes: Array<{
      title: string
      description: string
    }>
  }
  usageScenarios: {
    title: string
    scenarios: Array<{
      title: string
      description: string
    }>
  }
  faq: {
    title: string
    questions: Array<{
      question: string
      answer: string
    }>
  }
  testimonials: {
    title: string
    reviews: Array<{
      rating: string
      content: string
      reviewer: string
    }>
  }
  relatedKeywords: {
    title: string
    keywords: string[]
  }
}

export default function SEOContent() {
  const [seoData, setSeoData] = useState<SEOData | null>(null)
  const [currentLanguage, setCurrentLanguage] = useState<Language>("zh")

  useEffect(() => {
    // 检测当前语言（可以从URL、localStorage或其他方式获取）
    const detectLanguage = (): Language => {
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search)
        const langParam = urlParams.get("lang") as Language
        if (langParam && ["zh", "en", "ja"].includes(langParam)) {
          return langParam
        }

        const browserLang = navigator.language.toLowerCase()
        if (browserLang.startsWith("ja")) return "ja"
        if (browserLang.startsWith("en")) return "en"
      }
      return "zh"
    }

    const language = detectLanguage()
    setCurrentLanguage(language)

    // 加载对应语言的SEO数据
    const loadSEOData = async (lang: Language) => {
      try {
        let response
        if (lang === "zh") {
          // 中文使用原有的硬编码数据
          setSeoData({
            hero: {
              title: "情侣飞行棋 - 情趣互动游戏增进感情神器",
              subtitle: "融合经典飞行棋+真心话大冒险+趣味挑战，让情侣感情迅速升温的创意桌游",
              features: ["增进感情", "互动体验", "创意玩法", "完美礼物"],
            },
            productFeatures: {
              title: "为什么选择我们的情侣飞行棋？",
              features: [
                {
                  title: "情趣互动设计",
                  description:
                    "专为情侣设计的情趣互动游戏，融合经典飞行棋与情侣任务挑战。一台手机，两人轮流操作，面对面执行各种甜蜜、浪漫、刺激的任务。从温馨拥抱到深度亲密，每个任务都能让你们的关系更进一步。",
                },
                {
                  title: "多层次感情升温",
                  description:
                    "6种游戏模式从温和到激情，适合不同阶段的情侣关系。普通版破冰互动，恋爱版甜蜜升温，情侣版深度交流，深入版刺激挑战，私密版成人内容，组合版随机惊喜。循序渐进，让感情自然升华。",
                },
                {
                  title: "完美情趣礼物",
                  description:
                    "比传统礼物更有意义的创意选择！不仅是游戏，更是增进亲密关系的神器。适合情人节、生日、纪念日等特殊时刻，让Ta感受到你的用心和浪漫。一份礼物，无数次甜蜜回忆。",
                },
                {
                  title: "真实面对面互动",
                  description:
                    "摆脱虚拟社交，回归真实的面对面互动体验。每个任务都需要当场执行，对方直接观察确认，增加游戏的真实性和趣味性。无论是在家约会、异地恋视频通话，还是朋友聚会，都能创造难忘时刻。",
                },
              ],
            },
            gameHighlights: {
              title: "独特的情趣互动体验",
              highlights: [
                {
                  title: "任务挑战系统",
                  description:
                    "踩到特殊格子触发情侣任务，从甜蜜拥抱到深度亲密，每个任务都精心设计，让你们在游戏中自然地增进感情。",
                },
                {
                  title: "面对面执行",
                  description:
                    "所有任务都需要当场完成，对方可以直接观察。真实的肢体接触和眼神交流，比任何虚拟互动都更能拉近距离。",
                },
                {
                  title: "随机惊喜元素",
                  description:
                    "掷骰子的随机性让每次游戏都充满未知和惊喜。你永远不知道下一个任务会是什么，保持游戏的新鲜感和刺激感。",
                },
                {
                  title: "渐进式亲密度",
                  description:
                    "从温和的互动开始，逐步升级到更深层次的亲密接触。让情侣关系在游戏中自然发展，避免尴尬，增加乐趣。",
                },
              ],
            },
            gameModes: {
              title: "丰富的情侣互动游戏模式",
              modes: [
                {
                  title: "😊 普通版 - 情侣破冰游戏",
                  description:
                    "适合新情侣或朋友，温和有趣的互动任务。学猫叫、拍自拍、对视互动等轻松任务，帮助彼此放松心情，自然地开始亲密接触。",
                },
                {
                  title: "💕 恋爱版 - 情侣升温游戏",
                  description:
                    "专为恋爱中的情侣设计，浪漫甜蜜的亲密任务。深情拥抱、互相喂食、轻吻额头等任务，让感情快速升温，制造更多浪漫时刻。",
                },
                {
                  title: "💖 情侣版 - 深度互动游戏",
                  description:
                    "适合稳定关系的情侣，更深层次的情感和身体交流。包含轻度的亲密接触任务，如按摩、亲吻、拥抱等，增进彼此的了解和信任。",
                },
                {
                  title: "🔥 深入版 - 刺激挑战游戏",
                  description:
                    "为寻求更多刺激的情侣准备，大胆有趣的亲密挑战任务。包含更多身体接触和情趣互动，让关系更加紧密和激情，适合想要突破的情侣。",
                },
                {
                  title: "🔒 私密版 - 成人情侣游戏",
                  description:
                    "仅限私密空间的成人内容，为成熟情侣提供更加深入和私密的互动体验。包含成人向的亲密任务，帮助情侣探索更深层次的身体和情感连接。",
                },
                {
                  title: "🎲 组合版 - 随机惊喜游戏",
                  description:
                    "随机组合各种模式的任务，每次游戏都有不同的惊喜和体验。从温和到激情的任务随机出现，保持游戏的新鲜感和不可预测性。",
                },
              ],
            },
            usageScenarios: {
              title: "情侣飞行棋适用场景",
              scenarios: [
                {
                  title: "💝 情人节礼物",
                  description: "独特创意的情人节礼物，比传统礼物更有意义，能够创造共同的美好回忆。",
                },
                {
                  title: "🎂 生日纪念日礼物",
                  description: "生日、恋爱纪念日、结婚纪念日的完美礼物选择，表达你的用心和爱意。",
                },
                {
                  title: "🏠 在家约会游戏",
                  description: "不想出门的时候，在家也能享受浪漫约会时光，增进感情的同时放松身心。",
                },
                {
                  title: "📱 异地恋情侣游戏",
                  description: "通过视频通话一起玩，即使相隔千里也能感受到彼此的温暖和爱意。",
                },
                {
                  title: "👫 新婚礼物",
                  description: "新婚夫妇的贴心礼物，帮助新人更好地适应婚姻生活，增进夫妻感情。",
                },
                {
                  title: "🎉 朋友聚会游戏",
                  description: "情侣聚会或朋友聚会的互动游戏，为聚会增添更多欢乐和话题。",
                },
              ],
            },
            faq: {
              title: "常见问题解答",
              questions: [
                {
                  question: "情侣飞行棋怎么玩？",
                  answer:
                    "游戏结合了传统飞行棋的基本规则和情侣互动元素。两人轮流掷骰子移动棋子，当落在特殊格子时需要完成相应的情侣任务。任务包括甜蜜拥抱、亲密接触、真心话问答等，需要面对面当场执行。游戏目标是率先到达终点，过程中享受亲密互动乐趣。",
                },
                {
                  question: "什么情侣游戏好玩又能增进感情？",
                  answer:
                    "我们的情侣飞行棋融合了多种亲密互动元素：真心话大冒险、身体接触挑战、浪漫任务、情趣互动等。不同模式适合不同阶段的情侣，从破冰到深度亲密交流，每个任务都能让你们的关系更进一步，是真正能增进感情的情趣游戏。",
                },
                {
                  question: "送男朋友/女朋友什么礼物好？",
                  answer:
                    "情侣飞行棋是一个既实用又有意义的情趣礼物选择。它不仅能提供娱乐，更重要的是能够增进你们的亲密关系，创造共同的甜蜜回忆。比起传统礼物，这是一个能够持续带来价值和乐趣的创意情趣礼物，让你们的关系更加亲密。",
                },
                {
                  question: "游戏内容会不会太尴尬？",
                  answer:
                    "我们提供6种不同强度的模式，从温和的普通版到刺激的私密版，你们可以根据关系阶段和接受程度自由选择。游戏设计循序渐进，让亲密接触自然发生，避免突兀和尴尬。而且面对面的真实互动比虚拟游戏更有趣。",
                },
                {
                  question: "异地恋情侣怎么一起玩？",
                  answer:
                    "异地恋情侣可以通过视频通话一起玩游戏。双方各自准备游戏，通过屏幕分享同步游戏进度，完成相应的互动任务。虽然不能直接接触，但可以通过视频完成一些甜蜜的互动，如对视、表白、展示等任务。",
                },
                {
                  question: "游戏适合什么场合玩？",
                  answer:
                    "适合私密的二人空间，如家中、酒店、民宿等。建议选择放松舒适的环境，可以自由表达和互动的场所。不同模式适合不同场合：普通版适合任何时候，私密版建议在完全私人的空间进行。",
                },
              ],
            },
            testimonials: {
              title: "用户真实评价",
              reviews: [
                {
                  rating: "⭐⭐⭐⭐⭐",
                  content:
                    "这个情侣飞行棋真的太有趣了！我和男朋友从普通版玩到情侣版，每个任务都让我们更亲密。特别是那些亲密接触的任务，既甜蜜又刺激，感觉我们的感情升温了好多！",
                  reviewer: "- 小美，北京",
                },
                {
                  rating: "⭐⭐⭐⭐⭐",
                  content:
                    "异地恋必备神器！虽然不能直接接触，但通过视频一起玩也很有意思。看着对方完成那些可爱的任务，感觉距离一下子拉近了。强烈推荐给异地恋的朋友们！",
                  reviewer: "- 阿强，上海",
                },
                {
                  rating: "⭐⭐⭐⭐⭐",
                  content:
                    "买来当生日礼物送给女朋友的，她超级喜欢！游戏设计很贴心，从温和到刺激的任务都有，我们可以根据心情选择模式。现在成了我们约会的必备项目，每次都有新的惊喜！",
                  reviewer: "- 小李，广州",
                },
                {
                  rating: "⭐⭐⭐⭐⭐",
                  content:
                    "和老公结婚三年了，感觉关系有点平淡。玩了这个游戏后，重新找回了恋爱的感觉！那些亲密任务让我们重新审视彼此，现在我们的关系比以前更加亲密和谐。",
                  reviewer: "- 小王，深圳",
                },
              ],
            },
            relatedKeywords: {
              title: "相关推荐",
              keywords: [
                "情侣情趣游戏",
                "亲密互动游戏",
                "情侣桌游推荐",
                "创意情侣礼物",
                "情侣互动游戏",
                "真心话大冒险",
                "情人节礼物",
                "异地恋游戏",
                "情侣约会游戏",
                "增进感情游戏",
                "情侣破冰游戏",
                "情侣升温游戏",
                "纪念日礼物",
                "情趣互动道具",
                "成人情侣游戏",
                "亲密关系游戏",
              ],
            },
          })
          return
        }

        response = await fetch(`/locales/seo-${lang}.json`)
        if (!response.ok) {
          throw new Error(`Failed to load SEO data for ${lang}`)
        }
        const data = await response.json()
        setSeoData(data)
      } catch (error) {
        console.error(`Error loading SEO data for ${lang}:`, error)
        // 如果加载失败，回退到中文
        if (lang !== "zh") {
          loadSEOData("zh")
        }
      }
    }

    loadSEOData(language)
  }, [])

  if (!seoData) {
    return null
  }

  return (
    <div className="seo-content">
      {/* 主要内容区域 */}
      <section className="hero-seo">
        <div className="hero-content">
          <h1 className="seo-title">{seoData.hero.title}</h1>
          <p className="seo-subtitle">{seoData.hero.subtitle}</p>
          <div className="hero-features">
            {seoData.hero.features.map((feature, index) => (
              <div key={index} className="feature-item">
                <Heart className="feature-icon" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 产品特色介绍 */}
      <section className="product-features">
        <h2>{seoData.productFeatures.title}</h2>
        <div className="features-grid">
          {seoData.productFeatures.features.map((feature, index) => {
            const icons = [Gamepad2, Heart, Gift, Users]
            const IconComponent = icons[index % icons.length]
            return (
              <div key={index} className="feature-card">
                <div className="feature-header">
                  <IconComponent className="card-icon" />
                  <h3>{feature.title}</h3>
                </div>
                <p>{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* 游戏特色亮点 */}
      <section className="game-highlights">
        <h2>{seoData.gameHighlights.title}</h2>
        <div className="highlights-list">
          {seoData.gameHighlights.highlights.map((highlight, index) => {
            const emojis = ["🎯", "💕", "🎲", "🔥"]
            return (
              <div key={index} className="highlight-item">
                <div className="highlight-icon">{emojis[index % emojis.length]}</div>
                <div className="highlight-content">
                  <h3>{highlight.title}</h3>
                  <p>{highlight.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 游戏模式介绍 */}
      <section className="game-modes-seo">
        <h2>{seoData.gameModes.title}</h2>
        <div className="modes-description">
          {seoData.gameModes.modes.map((mode, index) => (
            <div key={index} className="mode-item">
              <h3>{mode.title}</h3>
              <p>{mode.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 使用场景 */}
      <section className="usage-scenarios">
        <h2>{seoData.usageScenarios.title}</h2>
        <div className="scenarios-grid">
          {seoData.usageScenarios.scenarios.map((scenario, index) => (
            <div key={index} className="scenario-card">
              <h3>{scenario.title}</h3>
              <p>{scenario.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ部分 */}
      <section className="faq-section">
        <h2>{seoData.faq.title}</h2>
        <div className="faq-list">
          {seoData.faq.questions.map((item, index) => (
            <div key={index} className="faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 用户评价 */}
      <section className="testimonials">
        <h2>{seoData.testimonials.title}</h2>
        <div className="testimonials-grid">
          {seoData.testimonials.reviews.map((review, index) => (
            <div key={index} className="testimonial-card">
              <div className="stars">{review.rating}</div>
              <p>{review.content}</p>
              <span className="reviewer">{review.reviewer}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 相关关键词 */}
      <section className="related-keywords">
        <h2>{seoData.relatedKeywords.title}</h2>
        <div className="keywords-cloud">
          {seoData.relatedKeywords.keywords.map((keyword, index) => (
            <span key={index} className="keyword-tag">
              {keyword}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}

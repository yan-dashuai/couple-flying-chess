import CoupleLudoGame from "@/components/couple-ludo-game"
import SEOContent from "@/components/seo-content"

export default function HomePage() {
  return (
    <main id="app">
      {/* 游戏主体 */}
      <CoupleLudoGame />

      {/* SEO优化内容 - 隐藏但对搜索引擎可见 */}
      <div className="seo-hidden-content">
        <SEOContent />
      </div>
    </main>
  )
}

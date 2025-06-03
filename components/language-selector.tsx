"use client"

import { type Language, languageNames, languageFlags } from "@/lib/i18n"

interface LanguageSelectorProps {
  currentLanguage: Language
  onLanguageChange: (language: Language) => void
}

export default function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const languages: Language[] = ["zh", "en", "ja"]

  return (
    <div className="language-selector-buttons">
      {languages.map((lang) => (
        <button
          key={lang}
          className={`language-btn ${lang === currentLanguage ? "active" : ""}`}
          onClick={() => onLanguageChange(lang)}
          title={languageNames[lang]}
        >
          <span className="language-flag">{languageFlags[lang]}</span>
        </button>
      ))}
    </div>
  )
}

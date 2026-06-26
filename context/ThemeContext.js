"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext({ isDark: false, toggleTheme: () => {} })

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("aicruiter-theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = saved ? saved === "dark" : prefersDark
    setIsDark(shouldBeDark)
    document.documentElement.classList.toggle("dark", shouldBeDark)
  }, [])

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev
      document.documentElement.classList.toggle("dark", next)
      localStorage.setItem("aicruiter-theme", next ? "dark" : "light")
      return next
    })
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

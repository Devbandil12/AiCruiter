"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/context/ThemeContext"
import { useRef, useState, useCallback } from "react"

/* Deterministic spark positions (8 directions) */
const SPARKS = Array.from({ length: 12 }, (_, i) => ({
  angle: i * 30,
  dist: 28 + (i % 4) * 10,
  size: 2 + (i % 3),
}))

/* Rotating sun rays as a separate animated ring */
function SunRays() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      animate={{ rotate: 360 }}
      transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-amber-400"
          style={{
            width: 2.5,
            height: 6,
            top: "50%",
            left: "50%",
            marginTop: -3,
            marginLeft: -1.25,
            transform: `rotate(${i * 45}deg) translateY(-18px)`,
            opacity: 0.85,
          }}
        />
      ))}
    </motion.div>
  )
}

/* Twinkling star */
function Star({ x, y, size, delay }) {
  return (
    <motion.div
      className="absolute rounded-full bg-violet-200"
      style={{ width: size, height: size, left: x, top: y }}
      animate={{ opacity: [0.15, 1, 0.15], scale: [0.6, 1.5, 0.6] }}
      transition={{ duration: 1.8, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  )
}

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()
  const [ripple, setRipple] = useState(null)
  const [sparks, setSparks] = useState(null)
  const locked = useRef(false)
  const buttonRef = useRef(null)

  const handleClick = useCallback(() => {
    if (locked.current) return
    locked.current = true

    const rect = buttonRef.current?.getBoundingClientRect()
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2

    setSparks({ x, y })
    setRipple({ x, y })

    /* switch theme at ~60% of wipe */
    setTimeout(() => toggleTheme(), 480)
    /* remove sparks quickly */
    setTimeout(() => setSparks(null), 550)
    /* remove ripple overlay after fade-out completes */
    setTimeout(() => {
      setRipple(null)
      locked.current = false
    }, 1200)
  }, [toggleTheme])

  const rippleBg = isDark
    ? "linear-gradient(135deg,#f8fafc 0%,#ede9fe 50%,#ddd6fe 100%)"
    : "linear-gradient(135deg,#0d0b1e 0%,#1a0f2e 50%,#0a0a18 100%)"

  const sparkColor = isDark ? "#a78bfa" : "#fbbf24"
  const sparkGlow = isDark
    ? "0 0 8px 2px rgba(167,139,250,0.9)"
    : "0 0 8px 2px rgba(251,191,36,0.9)"

  return (
    <>
      {/* ── Full-page clip-path wipe ── */}
      <AnimatePresence>
        {ripple && (
          <motion.div
            key="page-wipe"
            className="fixed inset-0 z-[9999] pointer-events-none"
            style={{ background: rippleBg }}
            initial={{ clipPath: `circle(0px at ${ripple.x}px ${ripple.y}px)` }}
            animate={{
              clipPath: `circle(250vmax at ${ripple.x}px ${ripple.y}px)`,
              opacity: [1, 1, 0],
            }}
            transition={{
              clipPath: { duration: 0.82, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.32, delay: 0.85, ease: "easeIn" },
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Spark burst ── */}
      <AnimatePresence>
        {sparks &&
          SPARKS.map((spark, i) => {
            const rad = (spark.angle * Math.PI) / 180
            return (
              <motion.div
                key={`spark-${i}`}
                className="fixed z-[10000] rounded-full pointer-events-none"
                style={{
                  width: spark.size,
                  height: spark.size,
                  background: sparkColor,
                  boxShadow: sparkGlow,
                  left: sparks.x,
                  top: sparks.y,
                  translateX: "-50%",
                  translateY: "-50%",
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos(rad) * spark.dist,
                  y: Math.sin(rad) * spark.dist,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.01 }}
              />
            )
          })}
      </AnimatePresence>

      {/* ── Toggle button ── */}
      <motion.button
        ref={buttonRef}
        onClick={handleClick}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.82 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={`relative w-10 h-10 rounded-full flex items-center justify-center cursor-pointer select-none focus:outline-none shrink-0 transition-colors duration-300
          ${isDark
            ? "bg-indigo-950 border border-violet-500/60 shadow-[0_0_22px_4px_rgba(139,92,246,0.45)]"
            : "bg-amber-50 border border-amber-300/80 shadow-[0_0_22px_4px_rgba(251,191,36,0.35)]"
          }`}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            /* ── Moon ── */
            <motion.div
              key="moon"
              initial={{ rotate: -120, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 120, scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="relative flex items-center justify-center w-6 h-6"
            >
              {/* Crescent via two overlapping circles */}
              <div className="relative w-[20px] h-[20px]">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-200 to-indigo-400 shadow-[0_0_14px_3px_rgba(139,92,246,0.75)]" />
                <div
                  className="absolute rounded-full bg-indigo-950"
                  style={{ width: 15, height: 15, top: -3, left: 7 }}
                />
              </div>
              {/* Stars */}
              <Star x={13} y={-12} size={2.5} delay={0} />
              <Star x={17} y={0} size={2} delay={0.35} />
              <Star x={9} y={-17} size={1.5} delay={0.7} />
            </motion.div>
          ) : (
            /* ── Sun ── */
            <motion.div
              key="sun"
              initial={{ rotate: 120, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -120, scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="relative flex items-center justify-center w-6 h-6"
            >
              <SunRays />
              {/* Core */}
              <div className="relative z-10 w-[17px] h-[17px] rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 shadow-[0_0_14px_3px_rgba(251,191,36,0.8)]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}

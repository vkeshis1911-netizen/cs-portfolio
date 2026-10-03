"use client"

import { useEffect, useState } from "react"

const FOCUS = ["Artificial Intelligence", "Machine Learning", "Computer Vision", "Quantitative Finance"]

export function FocusTicker() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % FOCUS.length), 2800)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="mb-6 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
      <span className="h-px w-10 bg-gradient-to-r from-brand to-brand/0" aria-hidden="true" />
      <p>
        Building in{" "}
        <span className="sr-only">{FOCUS.join(", ")}</span>
        <span className="inline-grid align-bottom overflow-hidden" aria-hidden="true">
          {FOCUS.map((word, i) => (
            <span
              key={word}
              className={`col-start-1 row-start-1 text-brand transition-all duration-700 ease-out ${
                i === index ? "translate-y-0 opacity-100 blur-none" : i === (index + FOCUS.length - 1) % FOCUS.length ? "-translate-y-full opacity-0 blur-[2px]" : "translate-y-full opacity-0 blur-[2px]"
              }`}
            >
              {word}
            </span>
          ))}
        </span>
      </p>
    </div>
  )
}

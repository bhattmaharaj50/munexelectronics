"use client"

import { useInView } from "@/lib/use-in-view"
import type { ReactNode, CSSProperties } from "react"

interface AnimateProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  style?: CSSProperties
  as?: keyof JSX.IntrinsicElements
  threshold?: number
}

export function FadeUp({
  children,
  delay = 0,
  duration = 600,
  className = "",
  style,
  as: Tag = "div",
  threshold = 0.12,
}: AnimateProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold, rootMargin: "0px 0px -60px 0px" })

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  )
}

export function FadeIn({
  children,
  delay = 0,
  duration = 600,
  className = "",
  style,
  as: Tag = "div",
  threshold = 0.08,
}: AnimateProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold, rootMargin: "0px 0px -40px 0px" })

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transition: `opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
        willChange: "opacity",
      }}
    >
      {children}
    </Tag>
  )
}

export function ScaleIn({
  children,
  delay = 0,
  duration = 500,
  className = "",
  style,
  as: Tag = "div",
  threshold = 0.1,
}: AnimateProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold, rootMargin: "0px 0px -50px 0px" })

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? "scale(1)" : "scale(0.92)",
        transition: `opacity ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  )
}

export function StaggerChildren({
  children,
  className = "",
  stagger = 80,
  baseDelay = 0,
}: {
  children: ReactNode[]
  className?: string
  stagger?: number
  baseDelay?: number
}) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.06, rootMargin: "0px 0px -40px 0px" })

  return (
    <div ref={ref} className={className}>
      {(children as ReactNode[]).map((child, i) => (
        <div
          key={i}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: `opacity 550ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${baseDelay + i * stagger}ms, transform 550ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${baseDelay + i * stagger}ms`,
            willChange: "opacity, transform",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

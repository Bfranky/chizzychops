'use client'

import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [scrollPercent, setScrollPercent] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      const percent = total > 0 ? (scrolled / total) * 100 : 0
      setScrollPercent(percent)
      setVisible(scrolled > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // SVG circle progress values
  const radius = 20
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        background: 'rgba(10,3,0,0.85)',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.85)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        pointerEvents: visible ? 'auto' : 'none',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)')}
      onMouseLeave={e => (e.currentTarget.style.transform = visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.85)')}
    >
      {/* Progress ring */}
      <svg
        width="52"
        height="52"
        viewBox="0 0 52 52"
        style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}
      >
        {/* Track */}
        <circle
          cx="26" cy="26" r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="2.5"
        />
        {/* Progress */}
        <circle
          cx="26" cy="26" r={radius}
          fill="none"
          stroke="url(#scrollGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.15s ease' }}
        />
        <defs>
          <linearGradient id="scrollGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#FBBF24" />
          </linearGradient>
        </defs>
      </svg>

      {/* Arrow icon */}
      <svg
        width="16" height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  )
}

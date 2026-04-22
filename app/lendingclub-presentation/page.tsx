'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  PRESENTATION_PROJECTS,
  type PresentationProject,
  type PresentationStop,
  type ProjectSlug,
  type VisualAsset,
} from './content'

function RichText({ text }: { text: string }) {
  const segments = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {segments.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="font-semibold text-[#0d281f]">
              {part.slice(2, -2)}
            </strong>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

const CHAPTERS = ['intro', 'nexus', 'neuranote', 'flowops', 'closing'] as const
type Chapter = (typeof CHAPTERS)[number]

const INITIAL_STOP_INDEX_BY_PROJECT: Record<ProjectSlug, number> = {
  nexus: 0,
  neuranote: 0,
  flowops: 0,
}
const createInitialStopIndexByProject = () => ({ ...INITIAL_STOP_INDEX_BY_PROJECT })

function introDelay(reduceMotion: boolean, ms: number): CSSProperties | undefined {
  if (reduceMotion) return undefined
  return { animationDelay: `${ms}ms` }
}

/** Full-viewport welcome above the deck; copy uses the same staggered intro animations as before. */
function DeckWelcomeIntro({ reduceMotion }: { reduceMotion: boolean }) {
  const motionFade = reduceMotion ? '' : 'lc-intro-fade-up'
  const motionPara = reduceMotion ? '' : 'lc-intro-para'

  return (
    <section
      id="welcome-intro"
      className="relative flex min-h-[100dvh] flex-col items-center justify-start overflow-x-hidden bg-[#f3f0e8] px-5 pb-16 pt-10 sm:justify-center sm:px-8 sm:pb-24 sm:pt-12"
      aria-labelledby="opening-splash-title"
    >
      <div
        className="pointer-events-none absolute -left-24 top-1/4 h-64 w-64 rounded-full bg-[#1e4d3d]/10 blur-3xl motion-reduce:animate-none sm:h-72 sm:w-72 animate-lc-soft-pulse"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-1/4 h-56 w-56 rounded-full bg-[#1e4d3d]/8 blur-3xl motion-reduce:animate-none sm:-right-20 sm:h-64 sm:w-64 animate-lc-soft-pulse [animation-delay:1.2s]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-[32rem] text-center sm:max-w-[38rem] md:max-w-[44rem]">
        <p
          className={`mb-2 text-[0.58rem] font-medium uppercase tracking-[0.2em] text-[#1e4d3d] sm:mb-2.5 sm:text-[0.62rem] sm:tracking-[0.22em] ${motionFade}`}
          style={introDelay(reduceMotion, 320)}
        >
          LendingClub · Product &amp; Experience
        </p>
        <h1
          id="opening-splash-title"
          className={`mb-5 text-[clamp(1.35rem,3.25vw,1.9rem)] font-medium leading-[1.2] tracking-tight text-[#0f241c] sm:mb-6 ${motionFade}`}
          style={{
            fontFamily: 'var(--font-lc-serif), Georgia, serif',
            ...introDelay(reduceMotion, 420),
          }}
        >
          Hi! I&apos;m Anusha.
        </h1>

        <div
          id="opening-splash-desc"
          className="space-y-3.5 text-left text-[0.875rem] leading-[1.62] text-[#14231f]/85 sm:space-y-4 sm:text-[0.9375rem] sm:leading-[1.65]"
        >
          <p className={motionPara} style={introDelay(reduceMotion, 640)}>
            I&apos;m a <strong className="font-semibold text-[#0f241c]">Cognitive Science</strong> student at{' '}
            <strong className="font-semibold text-[#0f241c]">UC Davis</strong> with a minor in{' '}
            <strong className="font-semibold text-[#0f241c]">Computer Science</strong>. I got into design through
            an interest in how people think, make decisions, and interact with technology.
          </p>
          <p className={motionPara} style={introDelay(reduceMotion, 920)}>
            That led me to <strong className="font-semibold text-[#0f241c]">product and UX</strong>, where I enjoy
            working across the full process from understanding user problems to designing and testing solutions.
            Most recently, I was a{' '}
            <strong className="font-semibold text-[#0f241c]">Product Design Intern at Narb</strong>, where I
            worked on onboarding and the core AI experience that we shipped.
          </p>
          <p className={motionPara} style={introDelay(reduceMotion, 1220)}>
            Across my work, I focus on{' '}
            <strong className="font-semibold text-[#0f241c]">
              making complex and confusing experiences feel clear and usable
            </strong>
            , especially in areas where trust and clarity really matter. That is a big reason why I&apos;m
            excited about <strong className="font-semibold text-[#0f241c]">LendingClub</strong> and the
            opportunity to design thoughtful digital financial experiences.
          </p>
        </div>
      </div>

      <div
        className={`relative z-10 mt-10 flex flex-col items-center gap-2 sm:mt-14 ${reduceMotion ? '' : 'lc-intro-scroll-pop'}`}
        aria-hidden
      >
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#1e4d3d]">
          Scroll for deck
        </span>
        <span
          className={`text-2xl leading-none text-[#1e4d3d] ${reduceMotion ? '' : 'lc-intro-scroll-nudge'}`}
          aria-hidden
        >
          ↓
        </span>
      </div>
    </section>
  )
}

export default function LendingClubPresentationPage() {
  const [reduceMotion, setReduceMotion] = useState(false)
  const deckSentinelRef = useRef<HTMLDivElement>(null)
  const [deckRevealed, setDeckRevealed] = useState(false)
  const [guidedMode, setGuidedMode] = useState(true)

  const [chapter, setChapter] = useState<Chapter>('intro')
  const [stopIndexByProject, setStopIndexByProject] = useState<Record<ProjectSlug, number>>(createInitialStopIndexByProject)
  const [visualIndexByKey, setVisualIndexByKey] = useState<Record<string, number>>({})
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null)

  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const onChange = () => setReduceMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Always land on the welcome intro (not mid-deck from hash or scroll restoration).
  useLayoutEffect(() => {
    const prev = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'

    setChapter('intro')
    setStopIndexByProject(createInitialStopIndexByProject())
    setVisualIndexByKey({})
    setLightbox(null)
    setDeckRevealed(reduceMotion)
    setGuidedMode(true)

    const scrollToIntro = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      document.getElementById('welcome-intro')?.scrollIntoView({ block: 'start' })
    }

    scrollToIntro()
    requestAnimationFrame(scrollToIntro)
    const timeoutId = window.setTimeout(scrollToIntro, 60)

    const onPageShow = () => {
      scrollToIntro()
    }

    window.addEventListener('pageshow', onPageShow)
    return () => {
      window.clearTimeout(timeoutId)
      window.removeEventListener('pageshow', onPageShow)
      window.history.scrollRestoration = prev
    }
  }, [reduceMotion])

  // In development, Fast Refresh preserves React state across edits.
  // Tie a reset effect to a module-level version so the deck always returns to intro.
  useLayoutEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    setChapter('intro')
    setStopIndexByProject(createInitialStopIndexByProject())
    setVisualIndexByKey({})
    setLightbox(null)
    setDeckRevealed(reduceMotion)
    setGuidedMode(true)
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    document.getElementById('welcome-intro')?.scrollIntoView({ block: 'start' })
  }, [reduceMotion])

  // Fade the deck in once the user reaches the end of the welcome.
  // A direct position check is more reliable here than observing a 1px sentinel.
  useEffect(() => {
    if (reduceMotion) {
      setDeckRevealed(true)
      return
    }

    const revealDeckIfNeeded = () => {
      const el = deckSentinelRef.current
      if (!el) return
      const top = el.getBoundingClientRect().top
      if (top <= window.innerHeight - 80) {
        setDeckRevealed(true)
      }
    }

    revealDeckIfNeeded()
    window.addEventListener('scroll', revealDeckIfNeeded, { passive: true })
    window.addEventListener('resize', revealDeckIfNeeded)

    return () => {
      window.removeEventListener('scroll', revealDeckIfNeeded)
      window.removeEventListener('resize', revealDeckIfNeeded)
    }
  }, [reduceMotion])

  const goChapter = useCallback((c: Chapter) => {
    setChapter(c)
    scrollToId(`chapter-${c}`)
  }, [])

  const visualKey = useCallback((slug: ProjectSlug, stopIdx: number) => `${slug}-${stopIdx}`, [])

  const setStopIndex = useCallback((slug: ProjectSlug, idx: number) => {
    setStopIndexByProject((prev) => ({ ...prev, [slug]: idx }))
    const key = `${slug}-${idx}`
    setVisualIndexByKey((prev) => ({ ...prev, [key]: prev[key] ?? 0 }))
  }, [])

  const setVisualIndex = useCallback((slug: ProjectSlug, stopIdx: number, vIdx: number) => {
    const key = `${slug}-${stopIdx}`
    setVisualIndexByKey((prev) => ({ ...prev, [key]: vIdx }))
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (lightbox) {
        if (e.key === 'Escape') setLightbox(null)
        return
      }

      const order = CHAPTERS
      const idx = order.indexOf(chapter)

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        if (idx < order.length - 1) goChapter(order[idx + 1])
        return
      }
      if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        if (idx > 0) goChapter(order[idx - 1])
        return
      }

      if (chapter === 'intro' || chapter === 'closing') return

      const slug = chapter as ProjectSlug
      const proj = PRESENTATION_PROJECTS.find((p) => p.slug === slug)!
      const sIdx = stopIndexByProject[slug]
      const st = proj.stops[sIdx]
      const vk = visualKey(slug, sIdx)
      const vi = visualIndexByKey[vk] ?? 0
      const vc = st.visuals.length

      if (e.key === 'ArrowRight') {
        e.preventDefault()
        if (vc > 1 && vi < vc - 1) {
          setVisualIndex(slug, sIdx, vi + 1)
        } else if (sIdx < proj.stops.length - 1) {
          setStopIndex(slug, sIdx + 1)
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        if (vc > 1 && vi > 0) {
          setVisualIndex(slug, sIdx, vi - 1)
        } else if (sIdx > 0) {
          setStopIndex(slug, sIdx - 1)
        }
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [
    chapter,
    goChapter,
    lightbox,
    setStopIndex,
    setVisualIndex,
    stopIndexByProject,
    visualIndexByKey,
    visualKey,
  ])

  // Clamp stop indices to current case study length (avoids undefined stops after content edits)
  useEffect(() => {
    setStopIndexByProject((prev) => {
      const next = { ...prev }
      let changed = false
      for (const p of PRESENTATION_PROJECTS) {
        const max = p.stops.length - 1
        const v = Math.max(0, Math.min(prev[p.slug] ?? 0, max))
        if (v !== prev[p.slug]) changed = true
        next[p.slug] = v
      }
      return changed ? next : prev
    })
  }, [])

  // Active nav chapter from scroll position (IntersectionObserver fought scrollIntoView when
  // multiple tall sections intersected the viewport—often leaving "FlowOps" stuck on.)
  useEffect(() => {
    const HEADER_THRESHOLD = 100
    let ticking = false
    const updateChapterFromScroll = () => {
      ticking = false
      let next: Chapter = CHAPTERS[0]
      for (const c of CHAPTERS) {
        const el = document.getElementById(`chapter-${c}`)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top <= HEADER_THRESHOLD) {
          next = c
        }
      }
      setChapter((prev) => (prev === next ? prev : next))
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(updateChapterFromScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    updateChapterFromScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const deckShellMotionClass = reduceMotion
    ? ''
    : 'transition-opacity duration-700 ease-out motion-reduce:transition-none'
  const deckShellOpacityClass = deckRevealed ? 'opacity-100' : 'opacity-0'

  return (
    <div className="min-h-screen [font-family:var(--font-lc-sans),system-ui,sans-serif]">
      <DeckWelcomeIntro reduceMotion={reduceMotion} />
      <div
        ref={deckSentinelRef}
        className="pointer-events-none h-px w-full shrink-0"
        aria-hidden
      />
      <div className={`${deckShellMotionClass} ${deckShellOpacityClass}`}>
      <header className="sticky top-0 z-40 border-b border-[#14231f]/10 bg-[#f3f0e8]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3 md:px-8">
          <div>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[#1e4d3d]">
              Interview deck · LendingClub
            </p>
            <p className="text-sm font-medium text-[#14231f]/80">Anusha Ramachandran · Product &amp; UX</p>
          </div>
          <nav className="flex flex-wrap items-center gap-1 text-xs md:gap-2 md:text-sm">
            {(
              [
                ['intro', 'Intro'],
                ['nexus', 'Nexus'],
                ['neuranote', 'NeuraNote'],
                ['flowops', 'FlowOps'],
                ['closing', 'Close'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => goChapter(id)}
                className={`rounded-full px-3 py-1.5 transition-colors ${
                  chapter === id
                    ? 'bg-[#1e4d3d] text-white shadow-sm'
                    : 'text-[#14231f]/70 hover:bg-[#14231f]/5'
                }`}
              >
                {label}
              </button>
            ))}
            <Link
              href="/"
              className="ml-1 rounded-full border border-[#14231f]/15 px-3 py-1.5 text-[#14231f]/70 hover:bg-[#14231f]/5"
            >
              Portfolio
            </Link>
            <div className="ml-1 inline-flex rounded-full border border-[#14231f]/15 bg-white/70 p-1 text-[0.7rem]">
              <button
                type="button"
                onClick={() => setGuidedMode(true)}
                className={`rounded-full px-3 py-1 transition ${
                  guidedMode ? 'bg-[#1e4d3d] text-white' : 'text-[#14231f]/65 hover:bg-[#14231f]/5'
                }`}
              >
                Guided
              </button>
              <button
                type="button"
                onClick={() => setGuidedMode(false)}
                className={`rounded-full px-3 py-1 transition ${
                  !guidedMode ? 'bg-[#1e4d3d] text-white' : 'text-[#14231f]/65 hover:bg-[#14231f]/5'
                }`}
              >
                Explore
              </button>
            </div>
          </nav>
        </div>
      </header>

      <section
        id="chapter-intro"
        className="scroll-mt-28 border-b border-[#14231f]/10 px-5 py-16 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.25em] text-[#1e4d3d]">
            Product &amp; Experience internship
          </p>
          <h1
            className="mb-6 text-4xl font-medium leading-[1.12] tracking-tight text-[#0f241c] md:text-5xl lg:text-[3.15rem]"
            style={{ fontFamily: 'var(--font-lc-serif), Georgia, serif' }}
          >
            I design for moments when{' '}
            <span className="text-[#1e4d3d]">complexity meets real people.</span>
          </h1>
          <p className="mb-6 text-base leading-relaxed text-[#14231f]/75 md:text-lg">
            I&apos;ll walk through three projects that show how I approach design from end to end, from
            understanding the problem to delivering clear, thoughtful solutions. I&apos;ll start with Nexus, my
            internship project at Narb where I designed the onboarding and core AI experience that was built and
            launched, then move to NeuraNote, where I designed a study tool grounded in cognitive science to help
            users better understand and retain information, and finish with FlowOps, which focuses on designing
            across multiple roles. Each project follows a similar structure, with key visuals included where they
            help tell the story.
          </p>
          <div className="mb-8 rounded-2xl border border-[#14231f]/10 bg-white/70 p-6 shadow-sm md:p-8">
            <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#1e4d3d]">
              Navigate this deck
            </p>
            <ul className="space-y-2 text-sm leading-relaxed text-[#14231f]/75">
              <li>
                Use the top tabs, or <strong className="text-[#0f241c]">scroll</strong>—the highlight
                tracks where you are.
              </li>
              <li>
                In each project: <strong className="text-[#0f241c]">click a section</strong> on the left, or
                press <strong className="text-[#0f241c]">← →</strong> to step through images and sections;{' '}
                <strong className="text-[#0f241c]">↑ ↓</strong> jumps between Intro / Nexus / NeuraNote /
                FlowOps / Close.
              </li>
              <li>
                <strong className="text-[#0f241c]">Click</strong> a main image to enlarge;{' '}
                <kbd className="rounded bg-[#14231f]/10 px-1.5 py-0.5 text-xs">Esc</kbd> closes.
              </li>
            </ul>
          </div>
          <button
            type="button"
            onClick={() => goChapter('nexus')}
            className="rounded-full bg-[#1e4d3d] px-8 py-3 text-sm font-medium text-white shadow-md transition hover:bg-[#163d30]"
          >
            Start with Nexus
          </button>
          <div className="mt-14 flex flex-col items-center gap-2 text-[#14231f]/45">
            <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
            <span className="h-12 w-px bg-gradient-to-b from-[#1e4d3d]/45 to-transparent" />
          </div>
        </div>
      </section>

      {PRESENTATION_PROJECTS.map((project) => (
        <ProjectWalkthrough
          key={project.slug}
          project={project}
          guidedMode={guidedMode}
          stopIndex={stopIndexByProject[project.slug]}
          onStopChange={(i) => setStopIndex(project.slug, i)}
          visualIndex={visualIndexByKey[visualKey(project.slug, stopIndexByProject[project.slug])] ?? 0}
          onVisualChange={(v) => setVisualIndex(project.slug, stopIndexByProject[project.slug], v)}
          onOpenLightbox={(src, caption) => setLightbox({ src, caption })}
        />
      ))}

      <section id="chapter-closing" className="scroll-mt-28 px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.25em] text-[#1e4d3d]">
            Before we wrap
          </p>
          <h2
            className="mb-5 text-3xl font-medium text-[#0f241c] md:text-4xl"
            style={{ fontFamily: 'var(--font-lc-serif), Georgia, serif' }}
          >
            I’d love to bring this same focus on clarity to your team.
          </h2>
          <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-[#14231f]/75">
            Whether on the <strong className="text-[#0f241c]">Product</strong> or{' '}
            <strong className="text-[#0f241c]">UX</strong> track, I enjoy taking messy problems and turning
            them into <RichText text="**clear flows, prototypes, and decisions that hold up in practice**" />.
            I like working closely with engineering, design, and product to refine things until they&apos;re
            actually usable for real customers. That&apos;s how I approached these projects, and it&apos;s how
            I&apos;d work here as well!
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => goChapter('intro')}
              className="rounded-full border border-[#14231f]/20 px-6 py-2.5 text-sm text-[#14231f]/80 hover:bg-white/80"
            >
              Back to intro
            </button>
            <Link
              href="/case-study/nexus"
              className="rounded-full bg-[#1e4d3d] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#163d30]"
            >
              View full Nexus case study
            </Link>
          </div>
        </div>
      </section>
      </div>

      {lightbox && (
        <button
          type="button"
          className="fixed inset-0 z-[100] flex cursor-zoom-out flex-col items-center justify-center bg-[#0a0f0d]/90 p-6 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          aria-label="Close enlarged image"
        >
          <div className="relative max-h-[85vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightbox.src}
              alt={lightbox.caption}
              width={1600}
              height={1000}
              className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
            />
            <p className="mt-4 text-center text-sm text-white/80">{lightbox.caption}</p>
            <p className="mt-2 text-center text-xs text-white/50">Click outside or press Esc to close</p>
          </div>
        </button>
      )}
    </div>
  )
}

function ProjectWalkthrough({
  project,
  guidedMode,
  stopIndex,
  onStopChange,
  visualIndex,
  onVisualChange,
  onOpenLightbox,
}: {
  project: PresentationProject
  guidedMode: boolean
  stopIndex: number
  onStopChange: (i: number) => void
  visualIndex: number
  onVisualChange: (i: number) => void
  onOpenLightbox: (src: string, caption: string) => void
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const visualPanelRef = useRef<HTMLDivElement>(null)
  const safeStopIndex = Math.max(0, Math.min(stopIndex, project.stops.length - 1))
  const stop: PresentationStop = project.stops[safeStopIndex]
  const visuals = stop.visuals
  const vSafe = Math.min(visualIndex, Math.max(0, visuals.length - 1))
  const activeVisual: VisualAsset | undefined = visuals[vSafe]
  const progress = ((safeStopIndex + 1) / project.stops.length) * 100
  const [showKeyPoints, setShowKeyPoints] = useState(stop.bullets.length > 0)
  const [showWhyItMatters, setShowWhyItMatters] = useState(false)

  useEffect(() => {
    setShowKeyPoints(stop.bullets.length > 0)
    setShowWhyItMatters(false)
  }, [project.slug, safeStopIndex, stop.bullets.length])

  const focusProjectTop = () => {
    if (!guidedMode) return
    requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const jumpToVisual = () => {
    if (!visuals.length) return
    requestAnimationFrame(() => {
      visualPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    })
  }

  return (
    <section
      ref={sectionRef}
      id={`chapter-${project.slug}`}
      className="scroll-mt-20 border-b border-[#14231f]/10 bg-gradient-to-b from-[#e8e4db]/40 to-transparent px-4 py-14 md:px-8 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className={`text-[0.65rem] font-semibold uppercase tracking-[0.25em] ${project.accentClass}`}>
              Project walkthrough
            </p>
            <h2
              className="mt-1 text-3xl font-medium text-[#0f241c] md:text-4xl"
              style={{ fontFamily: 'var(--font-lc-serif), Georgia, serif' }}
            >
              {project.title}
            </h2>
            <p className="mt-1 text-lg text-[#14231f]/65">{project.subtitle}</p>
            <p className="mt-1 text-sm text-[#14231f]/50">{project.meta}</p>
          </div>
          <Link
            href={project.caseStudyHref}
            className={`inline-flex w-fit items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition hover:bg-white/80 ${project.accentSoftClass} ${project.accentClass}`}
          >
            View full case study
            <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-[#14231f]/60">
          <span className="rounded-full border border-[#14231f]/10 bg-white/70 px-3 py-1">
            {guidedMode ? 'Guided mode keeps the current section in focus.' : 'Explore mode lets you move freely.'}
          </span>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="mb-1 flex justify-between text-[0.65rem] font-medium uppercase tracking-wider text-[#14231f]/45">
            <span>
              Section {safeStopIndex + 1} / {project.stops.length}
            </span>
            <span>{stop.caseStudySection}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#14231f]/10">
            <div
              className="h-full rounded-full bg-[#1e4d3d] transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Timeline */}
          <div className="lg:col-span-4">
            <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#14231f]/45">
              Sections — jump to any part
            </p>
            <div className="relative max-h-[min(70vh,520px)] space-y-0 overflow-y-auto pr-2 lg:max-h-[640px]">
              {project.stops.map((s, i) => (
                <button
                  key={`${project.slug}-stop-${i}`}
                  type="button"
                  onClick={() => {
                    onStopChange(i)
                    onVisualChange(0)
                    focusProjectTop()
                  }}
                  className={`relative flex w-full gap-3 rounded-xl border px-3 py-3 text-left transition ${
                    i === safeStopIndex
                      ? `${project.accentSoftClass} border-current shadow-sm ${project.accentClass}`
                      : 'border-transparent bg-white/50 hover:border-[#14231f]/10 hover:bg-white/80'
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      i === safeStopIndex ? 'bg-[#1e4d3d] text-white' : 'bg-[#14231f]/10 text-[#14231f]/60'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.6rem] font-medium uppercase tracking-wider text-[#14231f]/45">
                      {s.caseStudySection.split('·')[0]}
                    </span>
                    <span className="block font-medium leading-snug text-[#0f241c]">{s.title}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Main stage */}
          <div className="lg:col-span-8">
            <div key={`${project.slug}-${safeStopIndex}`} className="transition-opacity duration-300">
              <p className={`text-[0.65rem] font-semibold uppercase tracking-[0.2em] ${project.accentClass}`}>
                {stop.caseStudySection}
              </p>
              <h3 className="mt-1 text-2xl font-medium text-[#0f241c] md:text-3xl">{stop.title}</h3>
              {stop.summary.trim().length > 0 && (
                <p className="mt-3 text-base leading-relaxed text-[#14231f]/75">
                  <RichText text={stop.summary} />
                </p>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                {stop.bullets.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowKeyPoints((prev) => !prev)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                      showKeyPoints
                        ? `${project.accentSoftClass} ${project.accentClass} border-current`
                        : 'border-[#14231f]/15 text-[#14231f]/65 hover:bg-white/80'
                    }`}
                  >
                    {showKeyPoints ? 'Hide key points' : 'Show key points'}
                  </button>
                )}
                {stop.internshipBridge.trim().length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowWhyItMatters((prev) => !prev)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                      showWhyItMatters
                        ? `${project.accentSoftClass} ${project.accentClass} border-current`
                        : 'border-[#14231f]/15 text-[#14231f]/65 hover:bg-white/80'
                    }`}
                  >
                    {showWhyItMatters ? 'Hide why it matters' : 'Show why it matters'}
                  </button>
                )}
                {visuals.length > 0 && (
                  <button
                    type="button"
                    onClick={jumpToVisual}
                    className="rounded-full border border-[#14231f]/15 px-3 py-1.5 text-xs font-medium text-[#14231f]/65 transition hover:bg-white/80"
                  >
                    Jump to visual
                  </button>
                )}
              </div>

              {showKeyPoints && stop.bullets.length > 0 && (
              <ul className="mt-6 space-y-3">
                {stop.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3 text-[#14231f]/80">
                    <span
                      className={`mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                        project.slug === 'nexus'
                          ? 'bg-[#1d6b5a]'
                          : project.slug === 'neuranote'
                            ? 'bg-[#6b4fc9]'
                            : 'bg-[#c43c3c]'
                      }`}
                    />
                    <span className="leading-relaxed">
                      <RichText text={b} />
                    </span>
                  </li>
                ))}
              </ul>
              )}

              {showWhyItMatters && stop.internshipBridge.trim().length > 0 && (
                <div
                  className={`rounded-2xl border p-4 md:p-5 ${project.accentSoftClass} ${
                    stop.bullets.length > 0 ? 'mt-6' : 'mt-4'
                  }`}
                >
                  <p className="text-[0.6rem] font-semibold uppercase tracking-wider text-[#14231f]/50">
                    {stop.bridgeHeading ?? 'Why this approach matters'}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#14231f]/80">
                    <RichText text={stop.internshipBridge} />
                  </p>
                </div>
              )}
            </div>

            {/* Visual stage — hidden when a stop has no visuals (e.g. Nexus middle sections) */}
            {visuals.length > 0 && (
              <div
                ref={visualPanelRef}
                className="mt-8 rounded-2xl border border-[#14231f]/10 bg-[#faf7f1] p-3 shadow-[0_20px_50px_-24px_rgba(20,35,31,0.35)] md:p-4"
              >
                {activeVisual?.kind === 'video' ? (
                  <div className="overflow-hidden rounded-xl bg-black">
                    <video
                      key={activeVisual.src}
                      className="aspect-video w-full"
                      controls
                      playsInline
                      preload="metadata"
                    >
                      <source src={activeVisual.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : activeVisual ? (
                  <button
                    type="button"
                    className="group relative block w-full overflow-hidden rounded-xl bg-[#0c0c0c]/5 text-left outline-none ring-[#1e4d3d] focus-visible:ring-2"
                    onClick={() => onOpenLightbox(activeVisual.src, activeVisual.caption)}
                  >
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={activeVisual.src}
                        alt={activeVisual.caption}
                        fill
                        className="object-contain transition duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 720px"
                      />
                    </div>
                    <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-[#0a0f0d]/75 px-3 py-1 text-xs text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                      Click to enlarge
                    </span>
                  </button>
                ) : null}

                <p className="mt-3 text-center text-sm text-[#14231f]/60">{activeVisual?.caption}</p>

                {visuals.length > 1 && (
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                    <button
                      type="button"
                      className="rounded-full border border-[#14231f]/15 px-3 py-1.5 text-xs text-[#14231f]/70 hover:bg-white/90 disabled:opacity-35"
                      disabled={vSafe <= 0}
                      onClick={() => onVisualChange(vSafe - 1)}
                    >
                      Previous
                    </button>
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {visuals.map((v, i) => (
                        <button
                          key={`${project.slug}-dot-${safeStopIndex}-${i}`}
                          type="button"
                          aria-label={v.caption}
                          onClick={() => onVisualChange(i)}
                          className={`h-2 rounded-full transition-all ${
                            i === vSafe ? 'w-7 bg-[#1e4d3d]' : 'w-2 bg-[#14231f]/20 hover:bg-[#14231f]/35'
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      className="rounded-full border border-[#14231f]/15 px-3 py-1.5 text-xs text-[#14231f]/70 hover:bg-white/90 disabled:opacity-35"
                      disabled={vSafe >= visuals.length - 1}
                      onClick={() => onVisualChange(vSafe + 1)}
                    >
                      Next
                    </button>
                  </div>
                )}

                {visuals.length > 1 && (
                  <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {visuals.map((v, i) => (
                      <button
                        key={`${project.slug}-thumb-${i}-${v.kind}`}
                        type="button"
                        onClick={() => onVisualChange(i)}
                        className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
                          i === vSafe ? 'border-[#1e4d3d] shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        {v.kind === 'video' ? (
                          <span className="flex h-full w-full items-center justify-center bg-[#14231f]/90 text-[0.6rem] font-medium text-white">
                            ▶ Video
                          </span>
                        ) : (
                          <Image src={v.src} alt="" fill className="object-cover" sizes="96px" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-full border border-[#14231f]/20 px-4 py-2 text-sm text-[#14231f]/80 hover:bg-white/80 disabled:opacity-35"
                disabled={safeStopIndex <= 0}
                onClick={() => {
                  onStopChange(safeStopIndex - 1)
                  onVisualChange(0)
                  focusProjectTop()
                }}
              >
                ← Previous part
              </button>
              <button
                type="button"
                className="rounded-full bg-[#1e4d3d] px-4 py-2 text-sm font-medium text-white hover:bg-[#163d30] disabled:opacity-35"
                disabled={safeStopIndex >= project.stops.length - 1}
                onClick={() => {
                  onStopChange(safeStopIndex + 1)
                  onVisualChange(0)
                  focusProjectTop()
                }}
              >
                Next part →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

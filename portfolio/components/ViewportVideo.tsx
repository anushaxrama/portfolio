"use client"

import { PortfolioImage, optimizedImageSource } from './PortfolioImage'

import { useEffect, useRef, useState } from 'react'

type ViewportVideoProps = {
  sources: Array<{ src: string; type: string }>
  className?: string
  ariaLabel?: string
  controls?: boolean
  poster?: string
  startAt?: number
}

export default function ViewportVideo({
  sources,
  className,
  ariaLabel,
  controls = false,
  poster,
  startAt = 0,
}: ViewportVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [failedSources, setFailedSources] = useState<string[]>([])
  const [shouldLoad, setShouldLoad] = useState(false)
  const visible = useRef(false)
  const unavailable = sources.length > 0 && sources.every(source => failedSources.includes(source.src))
  const sourceFailed = (src: string) => setFailedSources(previous => previous.includes(src) ? previous : [...previous, src])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (typeof IntersectionObserver === 'undefined') { visible.current = true; setShouldLoad(true); return }
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry?.isIntersecting ?? false
      if (visible.current) { setShouldLoad(true); if (video.readyState >= 1 && !document.hidden) void video.play().catch(() => undefined) }
      else video.pause()
    }, { rootMargin: '100px', threshold: 0.01 })
    observer.observe(video)
    return () => observer.disconnect()
  }, [unavailable])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoad) return

    const seekPastIntro = () => {
      if (startAt > 0 && video.currentTime < startAt) video.currentTime = startAt
    }

    const resumePlayback = () => {
      if (document.hidden || !visible.current) { video.pause(); return }
      if (video.paused) {
        seekPastIntro()
        void video.play().catch(() => undefined)
      }
    }

    const restartPlayback = () => {
      video.currentTime = startAt
      void video.play().catch(() => undefined)
    }

    video.load()
    resumePlayback()
    video.addEventListener('loadedmetadata', seekPastIntro)
    video.addEventListener('canplay', resumePlayback)
    video.addEventListener('ended', restartPlayback)
    video.addEventListener('timeupdate', seekPastIntro)
    window.addEventListener('pageshow', resumePlayback)
    document.addEventListener('visibilitychange', resumePlayback)

    return () => {
      video.pause()
      video.removeEventListener('loadedmetadata', seekPastIntro)
      video.removeEventListener('canplay', resumePlayback)
      video.removeEventListener('ended', restartPlayback)
      video.removeEventListener('timeupdate', seekPastIntro)
      window.removeEventListener('pageshow', resumePlayback)
      document.removeEventListener('visibilitychange', resumePlayback)
    }
  }, [startAt, unavailable, shouldLoad])

  if (unavailable) return (
    <div className={`study-video-fallback ${className ?? ''}`} role="group" aria-label={ariaLabel}>
      {poster && <PortfolioImage src={poster} alt={`${ariaLabel ?? 'Product'} screenshot`} />}
      <p>{poster ? 'Video unavailable. Product screenshot shown instead.' : 'Video preview is currently unavailable.'}</p>
    </div>
  )

  return (
    <video
      ref={videoRef}
      className={className}
      aria-label={ariaLabel}
      controls={controls}
      poster={poster ? optimizedImageSource(poster) : undefined}
      autoPlay={shouldLoad}
      muted
      loop
      playsInline
      preload="none"
      onError={() => setFailedSources(sources.map(source => source.src))}
    >
      {shouldLoad && sources.map((source) => (
        <source key={source.src} src={source.src} type={source.type} onError={event => { event.stopPropagation(); sourceFailed(source.src) }} />
      ))}
      Your browser does not support the video tag.
    </video>
  )
}

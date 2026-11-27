import { existsSync, readFileSync, statSync } from 'node:fs'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { PortfolioImage } from '@/portfolio/components/PortfolioImage'
import media from '@/portfolio/components/responsive-media.json'

afterEach(cleanup)
describe('Portfolio image delivery', () => {
  it('preserves the evidence source while supplying a compact responsive delivery', () => {
    render(<PortfolioImage src="/landing/project-neuranote.png" alt="Learning preview" />)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', '/landing/project-neuranote.png')
    expect(image.getAttribute('srcset')).toMatch(/640w.*1280w/)
    expect(image).toHaveAttribute('loading', 'lazy')
    expect(image).toHaveAttribute('decoding', 'async')
    expect(image).toHaveAttribute('width', '2880')
    expect(image).toHaveAttribute('height', '1414')
  })
  it('loads critical art eagerly and leaves unknown or external images usable', () => {
    const { rerender } = render(<PortfolioImage src="/landing/editorial-flow.jpg" alt="Art" fetchPriority="high" />)
    expect(screen.getByRole('img')).toHaveAttribute('loading', 'eager')
    rerender(<PortfolioImage src="https://example.com/screenshot.png" alt="External" width={100} height={80} />)
    expect(screen.getByRole('img')).not.toHaveAttribute('srcset')
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/screenshot.png')
  })
  it('ships every generated candidate and keeps the critical artwork within a small byte budget', () => {
    for (const asset of Object.values(media)) {
      if (!('srcSet' in asset)) continue
      for (const candidate of asset.srcSet.split(', ')) expect(existsSync(`public${candidate.split(' ')[0]}`)).toBe(true)
    }
    const art = media['/landing/editorial-flow.jpg']
    expect(statSync(`public${art.preview}`).size).toBeLessThan(100_000)
    expect(readFileSync('app/layout.tsx', 'utf8')).not.toContain('fonts.googleapis.com')
    expect(readFileSync('app/layout.tsx', 'utf8')).not.toContain('next/font/google')
  })
})

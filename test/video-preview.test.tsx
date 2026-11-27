import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import ViewportVideo from '@/portfolio/components/ViewportVideo'

beforeEach(() => {
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue()
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined)
  vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => undefined)
})
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals() })

it('keeps below-fold media off the network until it approaches the viewport and pauses it on exit', () => {
  let intersect!: IntersectionObserverCallback
  vi.stubGlobal('IntersectionObserver', class { constructor(callback: IntersectionObserverCallback) { intersect = callback } observe() {} disconnect() {} })
  vi.spyOn(document, 'hidden', 'get').mockReturnValue(false)
  const { container } = render(<ViewportVideo sources={[{ src: '/preview.mp4', type: 'video/mp4' }]} />)
  const video = container.querySelector('video')!
  expect(video).toHaveAttribute('preload', 'none')
  expect(container.querySelector('source')).toBeNull()
  expect(video.load).not.toHaveBeenCalled()
  act(() => intersect([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver))
  expect(container.querySelector('source')).toHaveAttribute('src', '/preview.mp4')
  expect(video.load).toHaveBeenCalledOnce()
  act(() => intersect([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver))
  expect(video.pause).toHaveBeenCalled()
})

it('shows a useful screenshot and explanation when a hosted preview cannot load', () => {
  const { container } = render(<ViewportVideo sources={[{ src: '/hosted-preview.mp4', type: 'video/mp4' }]} ariaLabel="Product interaction" poster="/product.png" />)
  fireEvent.error(container.querySelector('source')!)
  expect(screen.getByRole('img', { name: 'Product interaction screenshot' })).toHaveAttribute('src', '/product.png')
  expect(screen.getByText('Video unavailable. Product screenshot shown instead.')).toBeInTheDocument()
})

it('tries the remaining source before falling back', () => {
  const { container } = render(<ViewportVideo sources={[{ src: '/preview.mp4', type: 'video/mp4' }, { src: '/preview.webm', type: 'video/webm' }]} />)
  fireEvent.error(container.querySelector('source')!)
  expect(container.querySelector('video')).toBeInTheDocument()
  expect(screen.queryByText(/unavailable/)).not.toBeInTheDocument()
})

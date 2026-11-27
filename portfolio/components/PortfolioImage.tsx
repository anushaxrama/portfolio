import type { ImgHTMLAttributes } from 'react'
import media from './responsive-media.json'

type Delivery = { width: number; height: number; srcSet?: string; preview?: string }
const delivery = media as Record<string, Delivery>
export function optimizedImageSource(src: string) { return delivery[src.split(/[?#]/)[0]]?.preview ?? src }

/** Serve a right-sized delivery copy while keeping original source links intact. */
export function PortfolioImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const asset = props.src ? delivery[props.src.split(/[?#]/)[0]] : undefined
  return <img {...props}
    width={props.width ?? asset?.width}
    height={props.height ?? asset?.height}
    srcSet={props.srcSet ?? asset?.srcSet}
    sizes={props.sizes ?? (asset?.srcSet ? '(max-width: 760px) calc(100vw - 40px), (max-width: 1600px) 90vw, 1152px' : undefined)}
    decoding={props.decoding ?? 'async'}
    loading={props.loading ?? (props.fetchPriority === 'high' ? 'eager' : 'lazy')}
  />
}

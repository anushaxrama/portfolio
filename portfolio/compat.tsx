"use client"

import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { PortfolioImage } from './components/PortfolioImage'
import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'

type LinkProps = {
  href: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  target?: string;
  rel?: string;
  title?: string;
  id?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  prefetch?: boolean;
  'aria-label'?: string;
  'aria-current'?: 'page';
}

export function Link({ href, prefetch, ...rest }: LinkProps) {
  const router = useRouter()
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return <a href={href} {...rest} />
  return <NextLink href={href} prefetch={prefetch} onPointerEnter={prefetch === false ? () => router.prefetch(href) : undefined} onFocus={prefetch === false ? () => router.prefetch(href) : undefined} {...rest} />
}

type ImageProps = {
  src: string;
  alt: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  className?: string;
  style?: CSSProperties;
  onLoad?: () => void;
}

// Match the reviewed preview's native image dimensions and fill behavior.
// Static hosting requires no image-optimization server.
export function Image({ src, alt, width, height, fill, sizes, priority, className, style, onLoad }: ImageProps) {
  if (fill) return <PortfolioImage src={src} alt={alt} sizes={sizes} className={className} onLoad={onLoad} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', ...style }} />
  return <PortfolioImage src={src} alt={alt} width={width} height={height} sizes={sizes} className={className} style={{ aspectRatio: width && height ? `auto ${width} / ${height}` : undefined, ...style }} onLoad={onLoad} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} />
}

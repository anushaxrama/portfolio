// Generate static, uncropped WebP delivery copies. Original evidence stays intact.
// Requires sharp locally; generated files are checked in, so builds need no codec.
import { createRequire } from 'node:module'
import { createHash } from 'node:crypto'
import { readFile, writeFile, readdir, mkdir, unlink } from 'node:fs/promises'
import { resolve, relative } from 'node:path'
const require = createRequire(import.meta.url)
const sharp = require(process.env.PORTFOLIO_SHARP_PATH || 'sharp')
const root = resolve(new URL('..', import.meta.url).pathname)
async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  return (await Promise.all(entries.map(e => e.isDirectory() ? files(resolve(dir, e.name)) : resolve(dir, e.name)))).flat()
}
const sources = (await files(resolve(root, 'portfolio'))).filter(p => /\.(tsx?|json)$/.test(p) && !p.endsWith('responsive-media.json'))
const code = (await Promise.all(sources.map(p => readFile(p, 'utf8')))).join('\n')
const inputs = (await files(resolve(root, 'public'))).filter(p => /\.(png|jpe?g)$/i.test(p) && !p.includes('/demos/') && !p.includes('/media/'))
await mkdir(resolve(root, 'public/media'), { recursive: true })
const manifest = {}
const cached = new Map()
let originalBytes = 0, deliveredBytes = 0, generated = 0
for (const file of inputs) {
  const src = '/' + relative(resolve(root, 'public'), file)
  const indirect = ['/images/crusoe/usage-to-cost/story-screen-only/', '/krokos/mobile/', '/krokos/original-sections/'].some(prefix => src.startsWith(prefix))
  if (!code.includes(src) && !indirect) continue
  const bytes = await readFile(file)
  const meta = await sharp(bytes).metadata()
  if (!meta.width || !meta.height) continue
  const entry = { width: meta.width, height: meta.height }
  // Tiny evidence already transfers cheaply; still reserve its natural space.
  if (bytes.length < 60000 && !src.includes('ar-logo')) { manifest[src] = entry; continue }
  const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 16)
  let variants = cached.get(hash)
  if (!variants) {
    const widths = src.includes('ar-logo') ? [160, 320] : [...new Set([Math.min(640, meta.width), Math.min(1280, meta.width), ...(meta.width > 1600 ? [Math.min(1920, meta.width)] : [])])]
    variants = []
    for (const width of widths) {
      const name = `${hash}-${width}.webp`
      const output = await sharp(bytes).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 88, alphaQuality: 100, effort: 5 }).toBuffer()
      await writeFile(resolve(root, 'public/media', name), output)
      variants.push({ src: `/media/${name}`, width, bytes: output.length })
      generated++
    }
    cached.set(hash, variants)
    originalBytes += bytes.length
    deliveredBytes += variants.find(v => v.width >= Math.min(meta.width, 1280))?.bytes ?? variants.at(-1).bytes
  }
  manifest[src] = { ...entry, srcSet: variants.map(v => `${v.src} ${v.width}w`).join(', '), preview: variants.find(v => v.width >= Math.min(meta.width, 1280))?.src ?? variants.at(-1).src }
}
await writeFile(resolve(root, 'portfolio/components/responsive-media.json'), JSON.stringify(manifest, null, 2) + '\n')
const retained = new Set([...cached.values()].flat().map(v => v.src.split('/').at(-1)))
for (const name of await readdir(resolve(root, 'public/media'))) {
  if (/^[a-f0-9]{16}-\d+\.webp$/.test(name) && !retained.has(name)) await unlink(resolve(root, 'public/media', name))
}
const report = { sources: Object.keys(manifest).length, optimized: cached.size, generated, originalBytes, deliveredBytes, reduction: Math.round((1-deliveredBytes/originalBytes)*100) }
await writeFile(resolve(root, 'public/media/manifest-report.json'), JSON.stringify(report, null, 2) + '\n')
console.log(JSON.stringify(report))

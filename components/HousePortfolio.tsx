'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import ViewportVideo from '@/components/ViewportVideo'

type Project = {
  number: string
  title: string
  category: string
  description: string
  href: string
  image: string
  alt: string
  secondaryImage: string
  secondaryAlt: string
  detail: string
  tone: 'cobalt' | 'coral' | 'violet' | 'blush' | 'lime'
}

type ReelItem = {
  title: string
  href?: string
  video?: string
  image?: string
  alt: string
  format: 'wide' | 'square' | 'portrait'
  tone: 'dark' | 'rose' | 'blue' | 'cream'
  startAt?: number
}

const projects: Project[] = [
  {
    number: '01',
    title: 'Crusoe',
    category: 'Cloud infrastructure · Product design',
    description: 'Three connected initiatives that made dense cloud workflows clearer, more actionable, and easier to trust.',
    href: '/case-study/crusoe',
    image: '/images/crusoe/final-instances-provisioning.png',
    alt: 'Crusoe Console instances experience',
    secondaryImage: '/images/crusoe/final-kubernetes-empty.png',
    secondaryAlt: 'Crusoe Kubernetes empty state',
    detail: 'Internship · End-to-end systems',
    tone: 'cobalt',
  },
  {
    number: '02',
    title: 'ToniPR',
    category: 'AI storytelling · Product experience',
    description: 'A guided platform that turns one founder interview into useful PR and marketing content.',
    href: '/case-study/tonipr',
    image: '/tonipr/site-hero.jpg',
    alt: 'ToniPR website hero',
    secondaryImage: '/tonipr/tonipr-product-still.jpg',
    secondaryAlt: 'ToniPR guided product experience',
    detail: 'Internship · Product and narrative',
    tone: 'coral',
  },
  {
    number: '03',
    title: 'Nexus',
    category: 'Multi-model AI · Research platform',
    description: 'Consensus-backed answers from multiple models for students who need clarity without the noise.',
    href: '/case-study/nexus',
    image: '/narbl/narbl-1.png',
    alt: 'Nexus AI research workspace',
    secondaryImage: '/narbl/narbl-7.png',
    secondaryAlt: 'Nexus multi-model comparison flow',
    detail: 'Concept · Research and interaction',
    tone: 'violet',
  },
  {
    number: '04',
    title: 'NeuraNote',
    category: 'AI notes · Memory support',
    description: 'A calmer note-taking system built around concept maps, memory cues, and thoughtful review rituals.',
    href: '/case-study/neuranote',
    image: '/neuranote/neuranote-1.png',
    alt: 'NeuraNote note-taking interface',
    secondaryImage: '/neuranote/neuranote-5.png',
    secondaryAlt: 'NeuraNote review experience',
    detail: 'Concept · Product and visual design',
    tone: 'blush',
  },
  {
    number: '05',
    title: 'FlowOps',
    category: 'Enterprise requests · Workflow design',
    description: 'Request management made more readable across complex roles, approvals, and time-sensitive SLAs.',
    href: '/case-study/flowops',
    image: '/flowops/flowops-requests.png',
    alt: 'FlowOps request-management dashboard',
    secondaryImage: '/flowops/flowops-role-switcher.png',
    secondaryAlt: 'FlowOps role switching interface',
    detail: 'Concept · Enterprise UX',
    tone: 'lime',
  },
]

const reelItems: ReelItem[] = [
  {
    title: 'ToniPR product story',
    href: '/case-study/tonipr',
    video: '/tonipr/tonipr-centered-walkthrough.mp4',
    alt: 'ToniPR product story walkthrough',
    format: 'wide',
    tone: 'rose',
  },
  {
    title: 'NeuraNote product reel',
    href: '/case-study/neuranote',
    video: '/neuranote/neuranote-showcase-borderless-wide.mp4',
    alt: 'NeuraNote product experience',
    format: 'wide',
    tone: 'blue',
  },
  {
    title: 'Crusoe Kubernetes',
    href: '/case-study/crusoe',
    video: '/crusoe/empty-state-kubernetes.mp4',
    alt: 'Crusoe Kubernetes empty state walkthrough',
    format: 'wide',
    tone: 'dark',
  },
  {
    title: 'Nexus workspace',
    href: '/case-study/nexus',
    image: '/narbl/narbl-4.png',
    alt: 'Nexus AI workspace',
    format: 'square',
    tone: 'cream',
  },
  {
    title: 'FlowOps request logic',
    href: '/case-study/flowops',
    image: '/flowops/flowops-role-switcher.png',
    alt: 'FlowOps role-based workflow',
    format: 'portrait',
    tone: 'rose',
  },
]

const capabilities = [
  'Product Design',
  'Websites / Apps',
  'Design systems',
  'Animation',
  'Midjourney',
  'Visual identity',
  'Framer',
  'Marketing',
  'Iconography',
]

function Flower({ className = '' }: { className?: string }) {
  return (
    <span className={`neo-flower ${className}`} aria-hidden="true">
      {Array.from({ length: 6 }, (_, index) => <i key={index} />)}
      <strong />
    </span>
  )
}

export default function HousePortfolio() {
  const router = useRouter()
  const transitionTimerRef = useRef<number | null>(null)
  const [transitionTarget, setTransitionTarget] = useState<string | null>(null)

  const beginCaseStudyTransition = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (
      event.defaultPrevented
      || event.button !== 0
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey
    ) return

    event.preventDefault()
    if (transitionTarget) return

    setTransitionTarget(href)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    transitionTimerRef.current = window.setTimeout(() => {
      router.push(href)
    }, reduceMotion ? 80 : 620)
  }

  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealNodes.forEach((node) => node.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.16 })

    revealNodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => () => {
    if (transitionTimerRef.current !== null) window.clearTimeout(transitionTimerRef.current)
  }, [])

  return (
    <main className="neo-portfolio">
      {transitionTarget && (
        <div className="neo-transition" role="status" aria-live="polite" aria-label="Opening case study">
          <Flower className="neo-transition-flower neo-transition-back" />
          <Flower className="neo-transition-flower neo-transition-front" />
          <span>Opening case study</span>
        </div>
      )}

      <header className="neo-nav">
        <a href="#top" className="neo-brand" aria-label="Anusha Ramachandran, home">
          <span className="neo-monogram" aria-hidden="true">AR</span>
          <span>
            <strong>Anusha Ramachandran</strong>
            <small>Product + visual designer</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#playground">Playground</a>
        </nav>
        <a
          className="neo-nav-social"
          href="https://www.linkedin.com/in/anusha-ramachandran-45882724a"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Anusha on LinkedIn"
        >
          in
        </a>
      </header>

      <section id="top" className="neo-hero" data-hero="aurora-v2">
        <div className="neo-hero-mesh" aria-hidden="true" />
        <div className="neo-hero-glow glow-coral" aria-hidden="true" />
        <div className="neo-hero-glow glow-cobalt" aria-hidden="true" />
        <div className="neo-hero-glow glow-blush" aria-hidden="true" />
        <div className="neo-hero-glow glow-gold" aria-hidden="true" />

        <div className="neo-hero-copy">
          <p className="neo-eyebrow">Hello, I’m Anusha</p>
          <h1>
            Product designer<br />
            <em>making complexity clear.</em>
          </h1>
          <p className="neo-hero-lede">
            I shape AI tools, enterprise systems, and digital stories into experiences people can understand, trust, and enjoy using.
          </p>
          <a className="neo-circle-link" href="#projects" aria-label="View selected projects">
            <span aria-hidden="true">↓</span>
            <strong>View projects</strong>
          </a>
        </div>

        <div className="neo-hero-note" aria-hidden="true">
          <span>Research</span>
          <span>Interaction</span>
          <span>Visual craft</span>
        </div>
      </section>

      <section id="projects" className="neo-projects">
        <div className="neo-section-intro" data-reveal>
          <p className="neo-section-index">01 / Selected work</p>
          <h2>Complex products,<br /><em>told clearly.</em></h2>
          <p>A selection of product systems, visual stories, and interaction decisions from concept through launch.</p>
        </div>

        <div className="neo-project-list">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className={`neo-project-row tone-${project.tone}${index % 2 ? ' is-reversed' : ''}`}
              data-reveal
            >
              <Link
                href={project.href}
                className="neo-project-visual"
                aria-label={`View ${project.title} case study`}
                onClick={(event) => beginCaseStudyTransition(event, project.href)}
              >
                <div className="neo-project-image neo-project-image-main">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(max-width: 800px) 92vw, 52vw"
                  />
                </div>
                <div className="neo-project-image neo-project-image-secondary">
                  <Image
                    src={project.secondaryImage}
                    alt={project.secondaryAlt}
                    fill
                    sizes="(max-width: 800px) 54vw, 22vw"
                  />
                </div>
                <span className="neo-project-number">{project.number}</span>
              </Link>

              <div className="neo-project-copy">
                <p className="neo-project-pill">{project.category}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <small>{project.detail}</small>
                <Link
                  href={project.href}
                  className="neo-text-link"
                  onClick={(event) => beginCaseStudyTransition(event, project.href)}
                >
                  View case study <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="playground" className="neo-playground">
        <div className="neo-section-intro neo-section-intro-compact" data-reveal>
          <p className="neo-section-index">02 / In motion</p>
          <h2>Details that make<br /><em>the work feel alive.</em></h2>
          <p>A continuously moving edit of prototypes, interface moments, and visual experiments.</p>
        </div>

        <div className="neo-reel-window" aria-label="Project motion reel">
          <div className="neo-reel-track">
            {[...reelItems, ...reelItems].map((item, index) => {
              const duplicate = index >= reelItems.length
              const media = (
                <>
                  <span className="neo-reel-media">
                    {item.video ? (
                      <ViewportVideo
                        sources={[{ src: item.video, type: 'video/mp4' }]}
                        ariaLabel={item.alt}
                        startAt={item.startAt}
                      />
                    ) : item.image ? (
                      <Image src={item.image} alt={item.alt} fill sizes="420px" />
                    ) : null}
                  </span>
                  <span className="neo-reel-label">{item.title}</span>
                </>
              )

              return item.href ? (
                <Link
                  key={`${item.title}-${index}`}
                  href={item.href}
                  className={`neo-reel-card reel-${item.format} reel-${item.tone}`}
                  tabIndex={duplicate ? -1 : undefined}
                  aria-hidden={duplicate}
                  onClick={(event) => beginCaseStudyTransition(event, item.href!)}
                >
                  {media}
                </Link>
              ) : (
                <div key={`${item.title}-${index}`} className={`neo-reel-card reel-${item.format} reel-${item.tone}`} aria-hidden="true">
                  {media}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="neo-capabilities" data-reveal>
        <div>
          <p className="neo-section-index">03 / Capabilities</p>
          <h2>From first question<br />to <em>final polish.</em></h2>
        </div>
        <div className="neo-capability-list">
          {capabilities.map((capability, index) => (
            <span key={capability}>
              <small>{String(index + 1).padStart(2, '0')}</small>
              {capability}
            </span>
          ))}
        </div>
      </section>

      <section id="about" className="neo-about">
        <div className="neo-about-media" data-reveal>
          <div className="neo-about-orbit" aria-hidden="true" />
          <figure className="neo-about-photo about-photo-main">
            <Image src="/anusha-photo.jpg" alt="Anusha Ramachandran" fill sizes="(max-width: 800px) 72vw, 34vw" className="object-cover" />
          </figure>
          <figure className="neo-about-photo about-photo-detail">
            <Image src="/about-grad.jpg" alt="Anusha celebrating her UC Davis graduation" fill sizes="220px" className="object-cover" />
          </figure>
          <Flower className="about-bloom" />
        </div>

        <div className="neo-about-copy" data-reveal>
          <p className="neo-section-index">04 / About</p>
          <h2>Curious by nature,<br /><em>precise by practice.</em></h2>
          <p>
            I’m a product designer drawn to clear systems, playful details, and ideas that make people feel more capable.
          </p>
          <p>
            I bring research, visual design, prototyping, and storytelling together to make complex things feel easy without making them boring.
          </p>
          <a href="/Anusha_Ramachandran_Resume.pdf" target="_blank" rel="noopener noreferrer" className="neo-text-link">
            View résumé <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <footer id="contact" className="neo-contact">
        <div className="neo-contact-glow" aria-hidden="true" />
        <Flower className="contact-bloom bloom-one" />
        <Flower className="contact-bloom bloom-two" />
        <p className="neo-section-index">05 / Say hello</p>
        <p className="neo-contact-note">Have a complex product that needs to feel simple?</p>
        <a href="mailto:anusharama100@gmail.com" className="neo-contact-link">
          Let’s make it<br /><em>resonate.</em>
        </a>
        <div className="neo-footer-row">
          <span>© {new Date().getFullYear()} Anusha Ramachandran</span>
          <div>
            <a href="mailto:anusharama100@gmail.com">Email</a>
            <a href="https://www.linkedin.com/in/anusha-ramachandran-45882724a" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </main>
  )
}

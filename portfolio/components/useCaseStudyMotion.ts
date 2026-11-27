import { useEffect, type RefObject } from 'react'

/** One-time, paint-only reveals. Content is never hidden while waiting for JavaScript. */
export function useCaseStudyMotion(root: RefObject<HTMLElement | null>, project: string) {
  useEffect(() => {
    if (!root.current || typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.setAttribute('data-case-revealed', 'true')
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.08 })

    const selectors = [
      '[data-study-reveal]',
      '.refined-heading', '.refined-figure', '.refined-facts', '.refined-note',
      '.study-summary', '.study-evidence-switcher', '.legacy-section-title',
      '.krokos-section-heading', '.krokos-screen-evidence', '.habitat-journeys',
      '.trace-case-model', '.data-pipeline-explorer',
      '.crusoe-project-panel > .crusoe-project-heading',
      '.crusoe-project-panel .crusoe-clean-heading',
      '.crusoe-story-before',
      '.crusoe-clean-audit-layout',
      '.crusoe-story-comparison',
      '.crusoe-story-future',
      '.crusoe-decision-explorer',
      '.crusoe-journey-dossier',
      '.crusoe-he-output-grid',
      '.crusoe-project-panel .crusoe-cost-figure',
    ].join(', ')
    const observed = new WeakSet<Element>()
    const observe = (element: Element) => {
      if (observed.has(element) || element.hasAttribute('data-case-revealed') || element.closest('[hidden], details:not([open])')) return
      // A nested caption or image travels with its container, not a second time.
      const parent = element.parentElement?.closest(selectors)
      if (parent && root.current?.contains(parent)) return
      observed.add(element)
      observer.observe(element)
    }
    const scan = (element: Element) => {
      if (element.matches(selectors)) observe(element)
      element.querySelectorAll(selectors).forEach(observe)
    }
    scan(root.current)
    // Register evidence inserted by project tabs and disclosures, without a scroll handler.
    const mutations = new MutationObserver(records => {
      for (const record of records) {
        if (record.type === 'attributes') scan(record.target as Element)
        else record.addedNodes.forEach(node => { if (node instanceof Element) scan(node) })
      }
    })
    mutations.observe(root.current, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden', 'open'] })
    return () => { observer.disconnect(); mutations.disconnect() }
  }, [root, project])
}

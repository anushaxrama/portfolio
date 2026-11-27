"use client"

import { Children, useId, useRef, useState, type ReactNode } from 'react'

/** Manual, keyboard-accessible evidence tabs. No autoplay or hidden waiting state. */
export default function StudyEvidenceSwitcher({ label, labels, children, className = '' }: {
  label: string; labels: readonly string[]; children: ReactNode; className?: string
}) {
  const [active, setActive] = useState(0)
  const id = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const panels = Children.toArray(children)
  function choose(index: number, focus = false) {
    setActive(index)
    if (focus) tabs.current[index]?.focus()
  }
  return <div className={`study-evidence-switcher ${className}`}>
    <div className="study-evidence-toolbar"><span>Choose a view</span><span aria-hidden="true">{String(active + 1).padStart(2, '0')} / {String(labels.length).padStart(2, '0')}</span></div>
    <div className="study-evidence-tabs" role="tablist" aria-label={label} onKeyDown={event => {
      const next = event.key === 'ArrowRight' ? (active + 1) % labels.length : event.key === 'ArrowLeft' ? (active - 1 + labels.length) % labels.length : event.key === 'Home' ? 0 : event.key === 'End' ? labels.length - 1 : null
      if (next !== null) { event.preventDefault(); choose(next, true) }
    }}>
      {labels.map((title, index) => <button key={title} ref={element => { tabs.current[index] = element }} type="button" role="tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => choose(index)}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{title}<span className="study-evidence-tab-arrow" aria-hidden="true">↗</span></button>)}
    </div>
    {panels.map((panel, index) => <div key={labels[index]} id={`${id}-panel-${index}`} role="tabpanel" aria-labelledby={`${id}-tab-${index}`} hidden={active !== index} tabIndex={0} className="study-evidence-panel">{panel}</div>)}
  </div>
}

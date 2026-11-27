import { PortfolioImage } from './PortfolioImage'
import StudyEvidenceSwitcher from './StudyEvidenceSwitcher'
import type { CaseStudySlug } from './caseStudyProjects'
import { studyVisualTours } from './studyVisualTours'

export default function StudyVisualTour({ slug, name }: { slug: CaseStudySlug; name: string }) {
  const screens = studyVisualTours[slug]
  if (!screens) return null
  return <div className="study-width study-visual-tour" data-study-reveal>
    <StudyEvidenceSwitcher label={`Explore ${name} screens`} labels={screens.map(screen => screen.label)}>
      {screens.map((screen, index) => <figure className="study-product-stage study-tour-figure" key={screen.src}>
        <a className="study-tour-frame" href={screen.src} target="_blank" rel="noreferrer" aria-label={`Open ${screen.label} image at full size`}><PortfolioImage src={screen.src} alt={screen.alt} fetchPriority={index === 0 ? 'high' : undefined} loading={index === 0 ? 'eager' : 'lazy'} sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1600px) 80vw, 1152px" /><span className="study-tour-expand" aria-hidden="true">↗</span></a>
        <figcaption><strong>{screen.title}</strong><p>{screen.note}</p></figcaption>
      </figure>)}
    </StudyEvidenceSwitcher>
  </div>
}

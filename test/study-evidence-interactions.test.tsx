import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import StudyEvidenceSwitcher from '@/portfolio/components/StudyEvidenceSwitcher'
import StudyVisualTour from '@/portfolio/components/StudyVisualTour'
import DataPipelineExplorer from '@/portfolio/components/DataPipelineExplorer'
import { dataProjectStories, dataProjects, dataProjectSlugs } from '@/portfolio/components/dataProjects'
import { studyVisualTours } from '@/portfolio/components/studyVisualTours'
import CrusoeUsageCostStory from '@/portfolio/components/CrusoeUsageCostStory'

afterEach(cleanup)
describe('Evidence exploration', () => {
  it('shows one panel, supports keyboard navigation and keeps focus on the selected tab', () => {
    render(<StudyEvidenceSwitcher label="Design iterations" labels={['Original', 'Refined', 'Detail']}><p>Original evidence</p><p>Refined evidence</p><p>Detail evidence</p></StudyEvidenceSwitcher>)
    const tabs = screen.getAllByRole('tab')
    expect(screen.getAllByRole('tabpanel')).toHaveLength(1)
    expect(screen.getByText('Original evidence')).toBeVisible()
    expect(screen.getByText('Refined evidence')).not.toBeVisible()
    tabs[0].focus()
    fireEvent.keyDown(tabs[0], { key: 'ArrowRight' })
    expect(tabs[1]).toHaveFocus()
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Refined evidence')).toBeVisible()
    fireEvent.keyDown(tabs[1], { key: 'End' })
    expect(tabs[2]).toHaveFocus()
    fireEvent.keyDown(tabs[2], { key: 'ArrowRight' })
    expect(tabs[0]).toHaveFocus()
    fireEvent.click(tabs[2])
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', tabs[2].id)
    expect(screen.getByText('Detail evidence')).toBeVisible()
  })

  it('changes the product image and explanation together while preserving full-size evidence links', () => {
    render(<StudyVisualTour slug="trace" name="Trace" />)
    fireEvent.click(screen.getByRole('tab', { name: 'Decide' }))
    const panel = screen.getByRole('tabpanel')
    expect(within(panel).getByRole('img')).toHaveAttribute('src', '/trace/trace-decision.jpg')
    expect(within(panel).getByRole('link')).toHaveAttribute('href', '/trace/trace-decision.jpg')
    expect(panel).toHaveTextContent('Changed source material flags it for review.')
    for (const tour of Object.values(studyVisualTours)) for (const item of tour) expect(existsSync(resolve('public', item.src.slice(1)))).toBe(true)
  })

  it.each(dataProjectSlugs)('provides an explanation for every %s pipeline stage', slug => {
    const story = dataProjectStories[slug]
    render(<DataPipelineExplorer slug={slug} name={dataProjects[slug].name} steps={story.pipeline} />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(story.pipeline.length)
    tabs.forEach((tab, index) => {
      fireEvent.click(tab)
      const panel = screen.getByRole('tabpanel')
      expect(within(panel).getByRole('heading')).toHaveTextContent(story.pipeline[index])
      expect(panel.querySelector('p')!.textContent!.length).toBeGreaterThan(40)
    })
  })

  it('lets a reader compare billing screens without losing their redesign labels', () => {
    render(<CrusoeUsageCostStory />)
    const pair = screen.getByRole('group', { name: 'After redesign: Billing overview, then product detail' })
    expect(within(pair).getAllByRole('img')).toHaveLength(1)
    fireEvent.click(within(pair).getByRole('tab', { name: 'Product pricing' }))
    const panel = within(pair).getByRole('tabpanel')
    expect(within(panel).getByRole('img')).toHaveAttribute('src', expect.stringContaining('product-detail.jpg'))
    expect(panel).toHaveTextContent('After · Proposed redesign')
    expect(panel).toHaveTextContent('Step 02 / 06')
  })
})

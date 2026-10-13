'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ViewportVideo from '@/components/ViewportVideo'

type VisualPlaceholderProps = {
  number: string
  title: string
  note: string
  format?: 'wide' | 'square' | 'portrait'
}

function VisualPlaceholder({ number, title, note, format = 'wide' }: VisualPlaceholderProps) {
  return (
    <div className={`crusoe-visual-placeholder ${format}`}>
      <span>{number}</span>
      <div>
        <strong>{title}</strong>
        <small>{note}</small>
      </div>
      <i aria-hidden="true" />
    </div>
  )
}

type CostMotionFigureProps = {
  src: string
  poster: string
  label: string
  title: string
  description: string
  startAt?: number
}

function CostMotionFigure({ src, poster, label, title, description, startAt }: CostMotionFigureProps) {
  return (
    <figure className="crusoe-cost-figure crusoe-cost-figure-wide crusoe-cost-motion-figure">
      <div className="crusoe-cost-media">
        <ViewportVideo
          sources={[{ src, type: 'video/mp4' }]}
          poster={poster}
          ariaLabel={`${title} interaction walkthrough`}
          startAt={startAt}
        />
      </div>
      <figcaption>
        <span>{label}</span>
        <strong>{title}</strong>
        <p>{description}</p>
      </figcaption>
    </figure>
  )
}

const currentEmptyStateScreens = [
  { label: 'Instance templates', src: '/images/crusoe/current-instances-empty.png', width: 809, height: 376 },
  { label: 'Slurm clusters', src: '/images/crusoe/current-orchestration-empty.png', width: 1117, height: 421 },
  { label: 'Buckets', src: '/images/crusoe/current-observability-empty.png', width: 1119, height: 466 },
  { label: 'Kubernetes clusters', src: '/images/crusoe/current-security-empty.png', width: 1258, height: 431 },
  { label: 'Disks', src: '/images/crusoe/current-cluster-empty.png', width: 1389, height: 348 },
  { label: 'Missing prerequisite', src: '/images/crusoe/current-modal-empty.png', width: 583, height: 369 },
] as const

function CrusoeAuditArtifact() {
  const figJamArtifacts = [
    {
      number: '01',
      title: 'Frame the first-time gap',
      description: 'Synthesized the missing guidance, assumed technical familiarity, and unclear next steps affecting brand-new users.',
      image: '/images/crusoe/figjam-research-synthesis.png',
      width: 1220,
      height: 820,
    },
    {
      number: '02',
      title: 'Walk the first-run journey',
      description: 'Followed a fresh account through Compute, Storage, Networking, Orchestration, and Observability to surface repeated dead ends.',
      image: '/images/crusoe/figjam-first-time-journey.png',
      width: 1450,
      height: 1300,
    },
    {
      number: '03',
      title: 'Connect patterns across products',
      description: 'Mapped recurring behaviors across resource types to show that the issue was systemic, not a collection of isolated empty screens.',
      image: '/images/crusoe/figjam-pattern-map.png',
      width: 1800,
      height: 1450,
    },
  ] as const

  return (
    <figure className="crusoe-artifact-card crusoe-audit-artifact">
      <div className="crusoe-artifact-heading">
        <span>02A · Research audit</span>
        <strong>Where first-time users got stuck</strong>
      </div>

      <div className="crusoe-audit-images">
        <Image
          className="crusoe-audit-overview"
          src="/images/crusoe/empty-state-first-time-flow.png"
          alt="Annotated Crusoe first-time experience audit with user needs, gaps, and empty-state screens"
          width={3168}
          height={3184}
          sizes="(max-width: 900px) 88vw, 42vw"
        />
        <Image
          className="crusoe-audit-detail"
          src="/images/crusoe/empty-state-problem-framing.png"
          alt="Problem-framing board summarizing the current empty-state experience"
          width={1040}
          height={1040}
          sizes="(max-width: 900px) 44vw, 20vw"
        />
      </div>

      <section className="crusoe-figjam-story" aria-labelledby="crusoe-figjam-title">
        <div className="crusoe-figjam-heading">
          <span>FigJam synthesis</span>
          <div>
            <h3 id="crusoe-figjam-title">Turning scattered evidence into a system-level problem.</h3>
            <p>Before designing UI, I used FigJam to connect first-time needs, repeated journey breakdowns, and patterns appearing across the Console.</p>
          </div>
        </div>

        <div className="crusoe-figjam-grid">
          {figJamArtifacts.map((artifact) => (
            <figure key={artifact.image}>
              <Image
                src={artifact.image}
                alt={`${artifact.title} FigJam artifact`}
                width={artifact.width}
                height={artifact.height}
                sizes="(max-width: 900px) 88vw, 58vw"
              />
              <figcaption>
                <span>{artifact.number}</span>
                <div>
                  <strong>{artifact.title}</strong>
                  <p>{artifact.description}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <div className="crusoe-evidence-heading">
        <span>Representative Console evidence</span>
        <p>Six examples from the broader 12-surface audit.</p>
      </div>

      <div className="crusoe-current-state-gallery" aria-label="Current Crusoe Console empty-state inventory">
        {currentEmptyStateScreens.map(({ label, src, width, height }) => (
          <figure key={src}>
            <Image src={src} alt={`${label} empty-state audit screen`} width={width} height={height} sizes="(max-width: 700px) 78vw, 36vw" />
            <figcaption>{label}</figcaption>
          </figure>
        ))}
      </div>

      <figcaption>12 audited surfaces · FigJam synthesis · six representative Console examples</figcaption>
    </figure>
  )
}

const futureEdgeCases = [
  {
    state: 'In progress',
    title: 'Provisioning without duplicate actions',
    description: 'An informational banner confirms that the request is working, sets a time expectation, and disables actions that would create a duplicate resource.',
    image: '/images/crusoe/final-instances-provisioning.png',
    width: 1440,
    height: 900,
  },
  {
    state: 'Failure',
    title: 'A specific error with a recovery path',
    description: 'The banner names what failed, explains the likely cause, and keeps retry or an alternate configuration close to the problem.',
    image: '/images/crusoe/final-kubernetes-error.png',
    width: 1440,
    height: 940,
  },
  {
    state: 'Retry',
    title: 'Recovery without losing context',
    description: 'A failed creation attempt stays attached to the empty state, so users can try again while the recommended setup cards remain available.',
    image: '/images/crusoe/final-buckets-error.png',
    width: 1440,
    height: 900,
  },
  {
    state: 'Ready',
    title: 'The next step after success',
    description: 'Once the resource is ready, the banner changes from status reporting to the next required action, in this case downloading the kubeconfig.',
    image: '/images/crusoe/final-kubernetes-kubeconfig.png',
    width: 1440,
    height: 940,
  },
] as const

const finalEmptyStateVideos = [
  ['Console overview', '/crusoe/empty-state-instances.mp4', 'The first-run system shown in context with the complete Console navigation.'],
  ['Kubernetes', '/crusoe/empty-state-kubernetes.mp4', 'Clear guidance and a primary action for creating a first cluster.'],
  ['Managed Logs', '/crusoe/empty-state-managed-logs.mp4', 'A focused starting point for configuring the first managed log source.'],
  ['Reservations', '/crusoe/empty-state-reservations.mp4', 'An approachable entry into creating and managing capacity reservations.'],
] as const

function CrusoeFinalSystemArtifact() {
  return (
    <figure className="crusoe-artifact-card crusoe-final-artifact">
      <div className="crusoe-artifact-heading">
        <span>05A · Release progression</span>
        <strong>One foundation, two release horizons</strong>
      </div>
      <div className="crusoe-release-visual-comparison">
        <section className="crusoe-release-block crusoe-v1-release">
          <div className="crusoe-release-heading">
            <span>V1 · Shippable foundation</span>
            <p>A focused empty state with concise guidance, one primary action, and a documentation path.</p>
          </div>
          <figure>
            <Image
              src="/images/crusoe/final-instances-empty.png"
              alt="Final V1 Crusoe Console empty state for instances"
              width={838}
              height={768}
              sizes="(max-width: 900px) 88vw, 42vw"
            />
            <figcaption>V1 · Consistent empty-state foundation</figcaption>
          </figure>
        </section>

        <section className="crusoe-release-block crusoe-v2-release">
          <div className="crusoe-release-heading">
            <span>V2 · Future release system</span>
            <p>Contextual cards recommend useful starting configurations; state-aware banners handle prerequisites, progress, failure, recovery, and the next step.</p>
          </div>
          <figure>
            <Image
              src="/images/crusoe/final-kubernetes-empty.png"
              alt="Future Crusoe Kubernetes empty state with recommendation cards and a provisioning banner"
              width={1440}
              height={940}
              sizes="(max-width: 900px) 88vw, 42vw"
            />
            <figcaption>V2 · Guidance cards + state-aware banner</figcaption>
          </figure>
        </section>
      </div>
      <figcaption>V1 final system and V2 future-release direction shown once, side by side</figcaption>
    </figure>
  )
}

function CrusoeEdgeCaseArtifact() {
  return (
    <section className="crusoe-edge-cases" aria-labelledby="crusoe-edge-cases-title">
      <div className="crusoe-edge-heading">
        <span>06 · Edge cases</span>
        <div>
          <h3 id="crusoe-edge-cases-title">The cards guide the first choice. The banners carry every state after it.</h3>
          <p>The future release was designed as a connected system: recommendation cards reduce first-run decision load, while persistent banners keep users oriented as the product moves through prerequisites, provisioning, failure, recovery, and success.</p>
        </div>
      </div>

      <div className="crusoe-edge-model" aria-label="Future release edge-case model">
        <article><span>01</span><strong>Missing prerequisite</strong><p>Explain what must exist first and provide the action or documentation needed to resolve it.</p></article>
        <article><span>02</span><strong>Provisioning</strong><p>Confirm the request, set a time expectation, and prevent accidental duplicate actions.</p></article>
        <article><span>03</span><strong>Failure + recovery</strong><p>Name the failure, preserve context, and offer retry, an alternate path, or support.</p></article>
        <article><span>04</span><strong>Ready + next step</strong><p>Replace passive success messaging with the next action required to use the resource.</p></article>
      </div>

      <div className="crusoe-edge-gallery">
        {futureEdgeCases.map((edgeCase) => (
          <figure key={edgeCase.image}>
            <Image
              src={edgeCase.image}
              alt={`${edgeCase.title} shown through a future-release Crusoe banner`}
              width={edgeCase.width}
              height={edgeCase.height}
              sizes="(max-width: 900px) 88vw, 42vw"
            />
            <figcaption>
              <span>{edgeCase.state}</span>
              <div>
                <strong>{edgeCase.title}</strong>
                <p>{edgeCase.description}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

const emptyStateOutputs = [
  'A cross-Console audit spanning pages, tables, charts, cards, dropdowns, and modals',
  'A shippable V1 pattern with clear titles, descriptions, actions, docs, and next steps',
  'A scalable illustration direction for Compute, Orchestration, Storage, Metrics, and Access',
  'Future-state onboarding concepts for prerequisites, CLI actions, and suggested configurations',
]

const projectTimeline = [
  ['01', 'Understand', 'Audit the Console, map first-time journeys, and study comparable cloud products.'],
  ['02', 'Frame', 'Connect recurring friction to user needs, technical constraints, and product priorities.'],
  ['03', 'Design', 'Explore interaction patterns, test near-term and future directions, and refine the system in critique.'],
  ['04', 'Align + hand off', 'Partner with engineering, product, brand, and writing to prepare implementation-ready work.'],
] as const

const emptyStateScope = [
  ['12', 'surfaces audited'],
  ['6', 'interface patterns'],
  ['2', 'versions planned'],
  ['5', 'partner teams'],
] as const

const emptyStateWork = [
  {
    number: '01',
    title: 'Inventory the system',
    body: 'Reviewed pages, tables, charts, cards, dropdowns, and modals across the Console, not just the most visible product screens.',
    output: 'Cross-Console audit',
  },
  {
    number: '02',
    title: 'Trace the first run',
    body: 'Walked a brand-new account through Compute, Storage, Networking, Orchestration, and Observability to find repeated dead ends.',
    output: 'First-time journey map',
  },
  {
    number: '03',
    title: 'Separate the states',
    body: 'Distinguished truly empty moments from missing prerequisites, provisioning, errors, and recovery so one message was not forced onto every condition.',
    output: 'State model + edge cases',
  },
  {
    number: '04',
    title: 'Build the pattern',
    body: 'Defined a repeatable hierarchy for illustration, title, supporting guidance, primary action, and documentation across product contexts.',
    output: 'Reusable component anatomy',
  },
  {
    number: '05',
    title: 'Design two horizons',
    body: 'Kept the near-term release intentionally focused, then explored a richer onboarding layer without making V1 dependent on future platform work.',
    output: 'V1 system + V2 direction',
  },
  {
    number: '06',
    title: 'Prepare the handoff',
    body: 'Documented behavior, content intent, variants, and product-specific examples so teams could apply the system beyond a single mockup.',
    output: 'Implementation-ready guidance',
  },
] as const

const emptyStateRules = [
  ['Say what is missing', 'Name the specific resource or data instead of using a generic “nothing here” message.'],
  ['Explain why it matters', 'Give users only the context they need to understand the screen and the next step.'],
  ['Lead with one action', 'Make the best next step obvious and keep documentation available as a secondary option.'],
  ['Cover what happens next', 'Design for requirements, progress, failure, and recovery instead of stopping at the first empty screen.'],
] as const

const versionComparison = [
  ['Goal', 'Make empty moments clear and actionable now.', 'Turn first-run moments into contextual onboarding.'],
  ['Experience', 'A concise message, one primary action, and a documentation path.', 'Guided cards, recommended configurations, templates, and progressive next steps.'],
  ['States covered', 'The core “no resources yet” state across priority products.', 'Prerequisites, provisioning, success feedback, errors, and recovery.'],
  ['Technical lift', 'Fits the existing Console architecture and available product data.', 'Depends on richer state awareness, product logic, and orchestration.'],
  ['Why it matters', 'A consistent foundation the team could implement without waiting.', 'A clear roadmap that preserves the ambition without blocking the release.'],
] as const

const aiWorkflow = [
  {
    number: '01',
    title: 'Synthesize',
    ai: 'Used AI to cluster repeated audit observations and surface language patterns across a large set of screens.',
    human: 'I checked every theme against the source artifacts and decided which patterns were meaningful.',
  },
  {
    number: '02',
    title: 'Explore',
    ai: 'Generated alternate content structures and edge-case prompts for empty, prerequisite, provisioning, and failure states.',
    human: 'I selected, rewrote, and designed the directions that matched the product and user context.',
  },
  {
    number: '03',
    title: 'Pressure-test',
    ai: 'Used AI as a critique partner to look for inconsistent terminology, missing scenarios, and unclear next steps.',
    human: 'The team validated technical accuracy, feasibility, tone, and the final product decisions.',
  },
] as const

const emptyStatePartners = [
  ['Design critique', 'Pressure-tested hierarchy, density, and how the pattern should flex across products.'],
  ['Product', 'Prioritized the surfaces that mattered most and kept the first release focused.'],
  ['Engineering', 'Validated available states, prerequisites, actions, and what the Console could support in V1.'],
  ['Brand', 'Aligned the illustration direction with Crusoe’s visual language without letting art overpower guidance.'],
  ['Technical writing', 'Refined titles, descriptions, terminology, and the relationship between in-product help and documentation.'],
] as const

const cleanAuditFindings = [
  ['Uneven guidance', 'Some empty pages explained the product. Others assumed users already understood the infrastructure.'],
  ['Create buttons without context', 'Users could start an action without knowing what they needed first or what would happen next.'],
  ['Different states looked the same', 'Empty, blocked, loading, error, and recovery moments often used the same message.'],
] as const

const competitiveAnalysis = [
  ['Explain the product', 'How other cloud tools introduce an unfamiliar resource.', 'Use a specific title and one short explanation instead of a generic “no data” message.'],
  ['Recommend a first step', 'Whether users see only a create button or receive a useful starting point.', 'Lead with one action now; add recommended setups in a later release.'],
  ['Show help in context', 'Where other products place documentation, command-line steps, and prerequisites.', 'Keep documentation visible and explain requirements before users reach a dead end.'],
  ['Explain what happens next', 'How the interface responds after a user starts an action.', 'Use banners to show progress, failure, retry, and readiness after creation begins.'],
] as const

const futureBannerCases = [
  ['Provisioning', 'Confirm the request, set a time expectation, and prevent duplicate actions.', '/images/crusoe/edge-banner-provisioning.png'],
  ['Failure', 'Name what failed, explain the cause, and offer a concrete recovery path.', '/images/crusoe/edge-banner-failure.png'],
  ['Retry', 'Preserve context after a failed attempt so users can recover without starting over.', '/images/crusoe/edge-banner-retry.png'],
  ['Ready', 'Replace passive success messaging with the next action required to use the resource.', '/images/crusoe/edge-banner-ready.png'],
] as const

const collaborationPhases = [
  ['Choose what to ship first', 'Design and product helped separate a focused first release from ideas that needed more time.'],
  ['Check what was buildable', 'Engineering confirmed which states, actions, and requirements the Console could support.'],
  ['Make it feel like Crusoe', 'Brand and technical writing refined the illustrations, terms, instructions, and help links.'],
] as const

const heuristicScope = [
  ['3', 'critical journeys'],
  ['10', 'usability principles'],
  ['9', 'major improvements shipped'],
  ['End-to-end', 'review through QA'],
] as const

const heuristicMethod = [
  ['01', 'Follow the complete task', 'Walked through each journey from the first click to completion, including requirements, errors, and help documentation.'],
  ['02', 'Explain each problem', 'Recorded what happened, why it broke a usability principle, how it affected users, and how serious it was.'],
  ['03', 'Turn findings into fixes', 'Wrote the highest-priority changes as Jira tickets, defined edge cases, and stayed through implementation and QA.'],
] as const

const heuristicJourneys = [
  {
    id: 'cost-monitoring',
    number: '01',
    title: 'Cost monitoring',
    focus: 'Attribution + control',
    goal: 'Understand a change in spend, trace it to the responsible usage, and decide what to do next.',
    path: ['See spend change', 'Trace the driver', 'Take action'],
    friction: 'Billing showed totals without explaining what caused them. Users lost their project and date filters as they moved between screens, then had to compare cost and infrastructure activity by hand.',
    heuristics: [
      ['H1', 'Visibility of system status'],
      ['H2', 'Match between system and the real world'],
      ['H6', 'Recognition rather than recall'],
      ['H8', 'Aesthetic and minimalist design'],
    ],
    shipped: [
      'Reorganized billing from overview to breakdown to resource-level detail.',
      'Kept the billing period and organizational scope visible throughout an investigation.',
      'Connected spend changes to the infrastructure activity behind them and surfaced the next useful action.',
    ],
    jira: 'Cost hierarchy · scope controls · usage attribution',
    result: 'Users can trace a bill increase to the project and activity behind it without rebuilding the search across separate tools.',
  },
  {
    id: 'api-keys',
    number: '02',
    title: 'API keys',
    focus: 'Access + setup',
    goal: 'Find, create, and use an API key in the correct account context.',
    path: ['Find API keys', 'Create securely', 'Continue setup'],
    friction: 'API keys were hard to find, the product used several names for the same thing, and the creation flow did not clearly explain what to do after making a key.',
    heuristics: [
      ['H2', 'Match between system and the real world'],
      ['H4', 'Consistency and standards'],
      ['H5', 'Error prevention'],
      ['H6', 'Recognition rather than recall'],
      ['H10', 'Help and documentation'],
    ],
    shipped: [
      'Moved “API Keys” into expected account navigation and added a repeat-user shortcut.',
      'Kept account context visible and standardized terminology across the Console and documentation.',
      'Added validation and creation feedback, then connected the new credential directly to CLI setup.',
    ],
    jira: 'Navigation · credential validation · setup handoff',
    result: 'A safer setup flow that is easier to find and guides users through the key’s first use.',
  },
  {
    id: 'monitoring-debugging',
    number: '03',
    title: 'Monitoring + debugging',
    focus: 'Diagnosis + recovery',
    goal: 'Move from a resource issue to the right metrics and logs, identify the cause, and recover.',
    path: ['Notice an issue', 'Inspect signals', 'Resolve the cause'],
    friction: 'Health, metrics, and logs lived on separate screens. Moving between them could reset the selected resource and time range, while blank states did not explain whether there was no data or something had failed.',
    heuristics: [
      ['H1', 'Visibility of system status'],
      ['H4', 'Consistency and standards'],
      ['H6', 'Recognition rather than recall'],
      ['H9', 'Recognize, diagnose, and recover from errors'],
    ],
    shipped: [
      'Created a direct route from an affected resource to its relevant metrics and logs.',
      'Preserved the resource, time range, and filters as users moved between signals.',
      'Separated loading, no-data, and error states and gave each state a specific recovery action.',
    ],
    jira: 'Observability routing · context persistence · state handling',
    result: 'Users can move from a resource problem to the right evidence and next action with less backtracking.',
  },
] as const

const apiKeyFigmaArtifacts = [
  {
    number: '01',
    title: 'Finding the API-key path',
    description: 'The evaluated path, violated heuristics, observed behavior, and recommendation in one decision-ready frame.',
    src: '/images/crusoe/figma/api-finding.png',
    width: 1440,
    height: 900,
    featured: true,
  },
  {
    number: '02',
    title: 'First-key onboarding',
    description: 'A proposed Console banner that makes the prerequisite visible at the moment users need it.',
    src: '/images/crusoe/figma/api-onboarding-banner.png',
    width: 1500,
    height: 1100,
    featured: false,
  },
  {
    number: '03',
    title: 'Secure credential export',
    description: 'A longer-term MFA-gated download state that handles the risk and recovery details around key creation.',
    src: '/images/crusoe/figma/api-secure-export.png',
    width: 1060,
    height: 800,
    featured: false,
  },
] as const

const apiSecureCreationSteps = [
  {
    label: 'Before · Current behavior',
    title: 'The easiest option was also the riskiest.',
    summary: 'The default settings encouraged permanent, unlabeled API keys that would be hard to manage later.',
    bullets: [
      'Names were optional even though a key could not be renamed later.',
      '“Never expires” was the default, with no explanation of the risk.',
      'The warning appeared only after creation, when changing the choice meant deleting the key and starting over.',
    ],
    src: '/images/crusoe/figma/api-create-before.png',
    width: 1440,
    height: 900,
  },
  {
    label: 'After · Secure-by-default direction',
    title: 'The safer option became the default.',
    summary: 'Security guidance now appears while users can still change the decision.',
    bullets: [
      'A clear name is required so teams can identify, replace, or revoke a key later.',
      'Keys expire after 90 days by default, with reminders before the date.',
      'Users can still create a permanent key, but they see the risk before confirming.',
    ],
    src: '/images/crusoe/figma/api-create-after.png',
    width: 1560,
    height: 840,
  },
  {
    label: 'Engineering refinement',
    title: 'Engineering helped simplify the change.',
    summary: 'We kept the Console’s existing date picker instead of adding a new control.',
    bullets: [
      'The existing calendar now opens with a recommended expiration date already selected.',
      'The build required a safer default, name validation, an opt-out warning, and reminder emails rather than a new flow.',
      'The security improvement stayed intact while the implementation became smaller and more consistent.',
    ],
    src: '/images/crusoe/figma/api-create-refined.png',
    width: 1000,
    height: 840,
  },
] as const

const monitoringEngineeringRecommendations = [
  ['01', 'Confirm scope, impact, and intent before the change.'],
  ['02', 'Make scale-down risk explicit at the decision point.'],
  ['03', 'Save the operational reason and keep it visible afterward.'],
  ['04', 'Show progress and completion while asynchronous work runs.'],
  ['05', 'Keep Console and CLI confirmation language aligned.'],
] as const

const monitoringFigmaArtifacts = [
  {
    number: '01',
    title: 'Journey-level diagnosis',
    description: 'The scale-out journey summarized by severity, user consequence, and the operational gaps that shaped the Jira scope.',
    src: '/images/crusoe/figma/monitoring-journey-overview.png',
    width: 1440,
    height: 900,
  },
  {
    number: '02',
    title: 'Unhealthy-state recovery',
    description: 'A proposed in-context explanation that shows what failed, how long it has been failing, and where to continue debugging.',
    src: '/images/crusoe/figma/monitoring-unhealthy-tooltip.png',
    width: 1240,
    height: 760,
  },
] as const

const billingEngineeringWorkstreams = [
  ['01', 'Find billing', 'Make the billing entry point discoverable from the places users already manage infrastructure.'],
  ['02', 'Filter spend', 'Compare cost by time range, project, account, and resource without losing scope.'],
  ['03', 'Export data', 'Let teams carry detailed cost data into their reporting and operational workflows.'],
  ['04', 'Billing dashboard', 'Bring totals, trends, scope, and important changes into one clear starting view.'],
  ['05', 'Cost breakdowns', 'Expose the services and resources driving a change instead of showing only a total.'],
  ['06', 'Budget alerts', 'Set thresholds and surface exceptions early enough for teams to act.'],
] as const

const billingFigmaArtifacts = [
  {
    number: '01',
    title: 'Complete billing dashboard',
    description: 'One reconciling view for totals, scope, trends, filters, product costs, and inference usage.',
    src: '/images/crusoe/figma/billing-dashboard.png',
    width: 1440,
    height: 2048,
    featured: true,
  },
  {
    number: '02',
    title: 'Cost breakdown interaction',
    description: 'A focused chart state for comparing cost, retaining filters, and understanding the price behind a data point.',
    src: '/images/crusoe/figma/billing-cost-breakdown.png',
    width: 1440,
    height: 720,
    featured: false,
  },
  {
    number: '03',
    title: 'Budget-alert setup',
    description: 'A guided threshold flow that turns cost monitoring into a preventive action, not a retrospective report.',
    src: '/images/crusoe/figma/billing-budget-alerts.png',
    width: 1440,
    height: 820,
    featured: false,
  },
] as const

const heuristicScience = [
  ['Working memory', 'Keep options and context visible so users do not have to remember information across screens.'],
  ['Mental models', 'Use familiar infrastructure language and place actions where users already expect to find them.'],
  ['Error recovery', 'Assume mistakes will happen; explain what failed, preserve context, and provide a clear way forward.'],
] as const

const heuristicDelivery = [
  ['Write a clear ticket', 'Each Jira ticket showed where the problem happened, how it affected users, the proposed fix, and the states engineering needed to cover.'],
  ['Set scope with engineering', 'We separated quick fixes from larger changes and agreed on clear acceptance criteria.'],
  ['Stay involved during the build', 'I answered design and content questions and adjusted the work when technical constraints changed the best approach.'],
  ['Review the finished experience', 'I tested normal, loading, empty, and error states and checked each shipped change against the original problem.'],
] as const

const usageToCostOverview = [
  ['Before', 'Usage showed how much AI was used, Billing showed the cost, and Analytics and logs showed what the system was doing. These views did not connect.'],
  ['Why it mattered', 'When cost increased, teams could not quickly tell whether the cause was more traffic, more text, a different model, or a system problem.'],
  ['My role', 'I designed how Usage, Billing, Analytics, logs, account activity, and budget alerts would work together as one investigation.'],
] as const

const usageToCostBeforeFlow = [
  'Notice a higher bill',
  'Select the same project and dates again',
  'Search analytics and logs',
  'Compare the evidence by hand',
] as const

const usageToCostQuestions = [
  ['01', 'What changed?', 'Compare this period with the last one, then see which day the change began.'],
  ['02', 'What caused it?', 'See which product created the cost, how much of the total it represents, and how that product is priced.'],
  ['03', 'What happened underneath?', 'Continue into traffic, speed, failed requests, and account changes without losing the selected project or dates.'],
] as const

const usageToCostProcess = [
  ['01', 'List the questions', 'Started with what a team asks after noticing unexpected usage or cost, then identified the evidence needed for each answer.'],
  ['02', 'Keep filters consistent', 'Carried the project, model, and date range across the flow so every screen referred to the same data.'],
  ['03', 'Reveal detail in steps', 'Moved from a high-level comparison to the daily trend, responsible product, and specific requests or account changes.'],
  ['04', 'Test the full path', 'Connected Billing, Analytics, logs, and account history, then tested them as one continuous investigation.'],
] as const

const usageDesignNotes = [
  ['Keep the right units', 'Text usage stays in tokens and video usage stays in seconds. The layout is consistent even though the measurements are different.'],
  ['Keep filters visible', 'Project, model, and dates stay on screen while users switch measures, preventing accidental comparisons.'],
  ['Show when the change happened', 'The summary shows whether usage rose or fell, while the daily chart reveals the exact time of the change.'],
] as const

const costDesignNotes = [
  ['Show the change first', 'Current and previous totals immediately show whether cost moved and by how much.'],
  ['Explain the total', 'Product cards show each product’s dollars, share of the bill, and pricing unit.'],
  ['Place actions where they matter', 'Budget alerts, details, and analytics appear beside the cost information that makes them useful.'],
] as const

const investigationDesignNotes = [
  ['Analytics', 'Traffic, processing volume, token mix, and response time show how the workload changed.'],
  ['Event logs', 'Search, status filters, request details, and CSV export help isolate an expensive or failed request.'],
  ['Activity history', 'Model updates, endpoint changes, and user actions show what changed near the same time as the cost increase.'],
] as const

const usageToCostDecisions = [
  ['Explain a cost increase', 'The flow moves from the total to the trend and then the responsible product.'],
  ['Keep the same context', 'Project, model, and date filters carry forward instead of making users select them again.'],
  ['Help teams respond', 'Alerts and system details turn Billing into a place to understand a problem and act on it.'],
] as const

const collaborationRhythm = [
  ['01', 'Audit', 'Design + product', 'Found repeated problems and agreed on the journeys that needed attention first.'],
  ['02', 'Working sessions', 'Product + engineering', 'Turned open questions into technical limits, priorities, and testable solutions.'],
  ['03', 'Critique', 'Design + brand + writing', 'Simplified the hierarchy, wording, visuals, and amount of guidance on each screen.'],
  ['04', 'Handoff', 'Engineering', 'Documented every state, interaction, and content decision so the build stayed clear.'],
] as const

const internshipOutcomes = [
  ['Reusable patterns', 'Created one empty-state system for the Console, with a focused first release and a clear next version.'],
  ['Clearer billing', 'Connected AI usage, cost, the responsible product, and the system activity behind it.'],
  ['Shippable priorities', 'Turned usability findings into Jira tickets ranked by user impact and engineering effort.'],
  ['Clear handoff', 'Delivered final designs, edge cases, behavior notes, and implementation guidance.'],
]

const crusoeProjects = [
  {
    id: 'empty-state-system',
    number: '01',
    tabLabel: 'Empty-state system',
    title: 'Console empty states',
    description: 'A reusable first-run system spanning Compute, Orchestration, Storage, Metrics, and Access.',
  },
  {
    id: 'heuristic-evaluation',
    number: '02',
    tabLabel: 'Heuristic evaluation',
    title: 'IaaS Console evaluation',
    description: 'An end-to-end audit of critical journeys, scored and translated into prioritized recommendations.',
  },
  {
    id: 'usage-to-cost',
    number: '03',
    tabLabel: 'Usage → cost',
    title: 'Intelligence Foundry billing',
    description: 'A clearer model connecting operational infrastructure usage to billing and cost investigation.',
  },
] as const

type CrusoeProjectId = (typeof crusoeProjects)[number]['id']

export default function CrusoeCaseStudy() {
  const [activeProject, setActiveProject] = useState<CrusoeProjectId>('empty-state-system')

  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as CrusoeProjectId
    if (crusoeProjects.some((project) => project.id === hash)) setActiveProject(hash)
  }, [])

  const selectProject = (projectId: CrusoeProjectId) => {
    setActiveProject(projectId)
    window.history.replaceState(null, '', `#${projectId}`)
  }

  return (
    <main className="crusoe-case crusoe-cloud-case">
      <nav className="crusoe-case-nav" aria-label="Case study navigation">
        <Link href="/#work">← Back to work</Link>
        <span>Crusoe · Product Design Internship</span>
        <a href="mailto:anusharama100@gmail.com">Let&apos;s talk</a>
      </nav>

      <header className="crusoe-case-hero">
        <div className="crusoe-orbit orbit-one" aria-hidden="true" />
        <div className="crusoe-orbit orbit-two" aria-hidden="true" />
        <div className="crusoe-hero-copy">
          <p className="crusoe-eyebrow">Most recent internship · Cloud infrastructure</p>
          <h1>Making complex cloud workflows feel clear.</h1>
          <p className="crusoe-lede">
            Crusoe provides the computing power that AI teams need to build and run products. I worked on the Console, the
            web app where customers create resources, monitor them, and understand what they cost. This case study covers
            three projects: first-time guidance, a usability review, and a clearer connection between usage and billing.
          </p>
        </div>

        <div className="crusoe-hero-meta">
          <div><span>Role</span><strong>Product Design Intern</strong></div>
          <div><span>Timeline</span><strong>2026 internship</strong></div>
          <div><span>Team</span><strong>Design, PM, Eng, Brand, Writing</strong></div>
          <div><span>Tools</span><strong>Figma, FigJam, Claude Code</strong></div>
        </div>

        <figure className="crusoe-hero-visual">
          <div className="crusoe-hero-visual-media">
            <Image
              src="/images/crusoe/crusoe-data-center-hero.jpg"
              alt="Aerial view of a Crusoe AI data center campus"
              width={1280}
              height={622}
              sizes="(max-width: 900px) 94vw, 1400px"
              priority
            />
            <div className="crusoe-hero-visual-copy">
              <span>00 · Context</span>
              <strong>Infrastructure at the scale behind the Console.</strong>
            </div>
          </div>
          <figcaption>
            <span>Crusoe AI data center</span>
            <a href="https://www.crusoe.ai/data-centers" target="_blank" rel="noreferrer">Official Crusoe imagery ↗</a>
          </figcaption>
        </figure>
        <p className="crusoe-disclosure">Selected internship work is presented at an appropriate level of detail.</p>
      </header>

      <section className="crusoe-case-section crusoe-process-section" aria-labelledby="crusoe-internship-process-title">
        <div className="crusoe-section-label"><span>Process</span><strong>Shared across all three projects</strong></div>
        <div className="crusoe-process-intro">
          <h2 id="crusoe-internship-process-title">A repeatable path from ambiguity to an implementation-ready direction.</h2>
          <p>Each initiative moved at a different pace, but the underlying process stayed consistent: understand the system, frame the right problem, design at multiple horizons, and align the final direction with the people building it.</p>
        </div>
        <div className="crusoe-timeline" aria-label="Crusoe internship design process">
          {projectTimeline.map(([number, title, body]) => (
            <article key={title}>
              <span>{number}</span>
              <i aria-hidden="true" />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <nav className="crusoe-impact-band crusoe-project-shortcuts" aria-label="Choose a Crusoe project">
        {crusoeProjects.map((project) => (
          <button
            key={project.id}
            type="button"
            aria-label={`Read project ${project.number}: ${project.tabLabel}`}
            aria-controls={`crusoe-panel-${project.id}`}
            aria-pressed={activeProject === project.id}
            onClick={() => selectProject(project.id)}
          >
            <strong>{project.number}</strong>
            <span>{project.tabLabel}</span>
            <i aria-hidden="true">↗</i>
          </button>
        ))}
      </nav>

      <section className="crusoe-project-workspace" aria-label="Crusoe internship project details">

        {activeProject === 'empty-state-system' && (
      <section
        id="crusoe-panel-empty-state-system"
        role="tabpanel"
        aria-label="Empty-state system project"
        className="crusoe-case-section project-section green-section crusoe-project-panel"
      >
        <div className="crusoe-section-label"><span>Project overview</span><strong>Console empty states</strong></div>
        <div className="crusoe-project-heading">
          <h2>Turn an empty screen into a useful starting point.</h2>
          <p>
            An empty state is what someone sees before they create a resource or receive data. These screens were inconsistent
            across the Console, so I audited the product and designed one reusable pattern. The first version was simple enough
            to ship quickly, with a second version showing how guidance could become more helpful over time.
          </p>
        </div>

        <div className="crusoe-scope-strip" aria-label="Empty-state project scope">
          {emptyStateScope.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <section className="crusoe-clean-section" aria-labelledby="crusoe-clean-audit-title">
          <div className="crusoe-clean-heading">
            <span>02 · Audit</span>
            <div>
              <h3 id="crusoe-clean-audit-title">I looked for the same problem across the whole Console.</h3>
              <p>I reviewed twelve screens and interface patterns, then followed a new account through five product areas. This showed where first-time users repeatedly lost context or reached a dead end.</p>
            </div>
          </div>
          <div className="crusoe-clean-audit-layout">
            <figure>
              <Image src="/images/crusoe/figjam-research-synthesis.png" alt="FigJam synthesis of first-time Crusoe Console gaps and user needs" width={1220} height={820} sizes="(max-width: 900px) 90vw, 58vw" />
              <figcaption>Audit synthesis · first-time gaps, user needs, and repeated dead ends</figcaption>
            </figure>
            <div className="crusoe-clean-findings">
              {cleanAuditFindings.map(([title, body], index) => (
                <article key={title}>
                  <span>0{index + 1}</span>
                  <h4>{title}</h4>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>

          <section className="crusoe-before-evidence" aria-labelledby="crusoe-before-evidence-title">
            <div className="crusoe-before-evidence-heading">
              <span>Before · existing Console</span>
              <div>
                <h4 id="crusoe-before-evidence-title">The same first-time moment looked different in every product area.</h4>
                <p>These are six real screens from the audit. Some offered only a create button, some relied on technical language, and others revealed missing requirements only after the user tried to continue.</p>
              </div>
            </div>

            <div className="crusoe-before-screen-grid" aria-label="Examples of Crusoe Console empty states before the redesign">
              {currentEmptyStateScreens.map(({ label, src, width, height }, index) => (
                <figure key={`before-${src}`}>
                  <div className="crusoe-before-screen-media">
                    <Image
                      src={src}
                      alt={`${label} empty state before the redesign`}
                      width={width}
                      height={height}
                      sizes="(max-width: 760px) 90vw, 42vw"
                    />
                  </div>
                  <figcaption><span>0{index + 1}</span><strong>{label}</strong></figcaption>
                </figure>
              ))}
            </div>

            <div className="crusoe-before-patterns" aria-label="Problems visible in the previous empty states">
              <article><span>01</span><strong>Uneven explanation</strong><p>Users received different amounts of context depending on where they entered the Console.</p></article>
              <article><span>02</span><strong>Actions without preparation</strong><p>Create buttons appeared before prerequisites, expected outcomes, or useful starting choices were clear.</p></article>
              <article><span>03</span><strong>Different states felt identical</strong><p>Truly empty, blocked, and missing-prerequisite moments were not clearly distinguished.</p></article>
            </div>
          </section>
        </section>

        <section className="crusoe-clean-section" aria-labelledby="crusoe-clean-problem-title">
          <div className="crusoe-clean-heading">
            <span>03 · Problem framing</span>
            <div>
              <h3 id="crusoe-clean-problem-title">The real problem was not an empty screen. It was not knowing what to do next.</h3>
              <p>The goal became clear: explain what the product does, recommend one next step, and keep users informed after they start an action.</p>
            </div>
          </div>
          <div className="crusoe-clean-problem-layout">
            <figure>
              <Image src="/images/crusoe/empty-state-problem-framing.png" alt="FigJam problem-framing board for Crusoe empty states" width={1040} height={1040} sizes="(max-width: 900px) 90vw, 44vw" />
              <figcaption>Problem-framing artifact from the working FigJam</figcaption>
            </figure>
            <div className="crusoe-clean-problem-steps">
              <article><span>What users saw</span><h4>An empty page with too little explanation.</h4><p>Users could tell that nothing existed, but not what the resource did, why they needed it, or what to create first.</p></article>
              <article><span>What users needed</span><h4>A short explanation and one clear next step.</h4><p>First-time users needed enough context to begin without reading a wall of technical instructions.</p></article>
              <article><span>What I designed</span><h4>One pattern that changes as the resource changes.</h4><p>The guidance covers setup requirements, creation in progress, failure, recovery, and the next step after success.</p></article>
            </div>
          </div>
        </section>

        <section className="crusoe-clean-section" aria-labelledby="crusoe-clean-competitive-title">
          <div className="crusoe-clean-heading">
            <span>04 · Competitive analysis</span>
            <div>
              <h3 id="crusoe-clean-competitive-title">I studied how other cloud products guide new users.</h3>
              <p>I compared how similar products explain resources, recommend a first setup, place documentation, and show progress or errors. I used the clearest patterns as principles, not as screens to copy.</p>
            </div>
          </div>
          <div className="crusoe-competitive-table" role="table" aria-label="Competitive analysis translated into Crusoe design decisions">
            {competitiveAnalysis.map(([dimension, compared, response], index) => (
              <article key={dimension} role="row">
                <span>0{index + 1}</span>
                <div><small>Compared</small><h4>{dimension}</h4><p>{compared}</p></div>
                <div><small>Crusoe response</small><p>{response}</p></div>
              </article>
            ))}
          </div>
          <div className="crusoe-competitive-takeaway">
            <span>Competitive takeaway</span>
            <p>The clearest products explained the resource in plain language, recommended one starting path, and showed visible feedback after the user acted.</p>
          </div>
        </section>

        <section className="crusoe-clean-section" aria-labelledby="crusoe-clean-v1-title">
          <div className="crusoe-clean-heading">
            <span>05 · V1</span>
            <div>
              <h3 id="crusoe-clean-v1-title">The first release focused on consistency.</h3>
              <p>Every empty state received the same basic structure: a relevant illustration, a clear title, a short explanation, one primary action, and a link to documentation.</p>
            </div>
          </div>
          <div className="crusoe-clean-v1-layout">
            <figure>
              <Image src="/images/crusoe/final-instances-empty.png" alt="Final V1 Crusoe instances empty state" width={838} height={768} sizes="(max-width: 900px) 90vw, 54vw" />
              <figcaption>V1 · implementation-ready empty-state foundation</figcaption>
            </figure>
            <div className="crusoe-clean-rules">
              {emptyStateRules.map(([title, body], index) => (
                <article key={title}><span>0{index + 1}</span><h4>{title}</h4><p>{body}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="crusoe-clean-section" aria-labelledby="crusoe-clean-v2-title">
          <div className="crusoe-clean-heading">
            <span>06 · V2</span>
            <div>
              <h3 id="crusoe-clean-v2-title">The next version adds guidance before and after creation.</h3>
              <p>Recommended setup cards help users make the first choice. Persistent banners then explain what is happening, what went wrong, or what to do next. Keeping this work separate allowed the simpler first release to move forward.</p>
            </div>
          </div>
          <figure className="crusoe-clean-v2-hero">
            <Image src="/images/crusoe/final-kubernetes-empty.png" alt="Future Crusoe Kubernetes empty state with configuration cards and a provisioning banner" width={1440} height={940} sizes="(max-width: 900px) 90vw, 80vw" />
            <figcaption>V2 · recommended configurations + state-aware guidance</figcaption>
          </figure>
          <div className="crusoe-clean-edge-intro">
            <span>Edge-case banner system</span>
            <p>The cards recommend where to start. The banners explain progress, failure, recovery, and readiness.</p>
          </div>
          <div className="crusoe-clean-banner-grid">
            {futureBannerCases.map(([title, body, image]) => (
              <figure key={image}>
                <Image src={image} alt={`${title} banner from the future Crusoe empty-state system`} width={1210} height={115} sizes="(max-width: 900px) 90vw, 42vw" />
                <figcaption><strong>{title}</strong><span>{body}</span></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="crusoe-clean-section" aria-labelledby="crusoe-clean-collaboration-title">
          <div className="crusoe-clean-heading">
            <span>07 · Collaboration</span>
            <div>
              <h3 id="crusoe-clean-collaboration-title">Team feedback shaped what we shipped first.</h3>
              <p>I reviewed the work early with design, product, engineering, brand, and technical writing. Together, we chose a focused first release and made each part easier to build and reuse.</p>
            </div>
          </div>
          <div className="crusoe-clean-collaboration-grid">
            {collaborationPhases.map(([title, body], index) => (
              <article key={title}><span>0{index + 1}</span><h4>{title}</h4><p>{body}</p></article>
            ))}
          </div>
          <div className="crusoe-clean-ai-callout">
            <div><span>AI-assisted workflow</span><h4>Claude Code helped me organize findings and test alternatives.</h4></div>
            <p>I used AI to group repeated observations, compare wording options, and look for missing states. I checked every result against the original research, and the team made the final decisions about accuracy, feasibility, and tone.</p>
          </div>
          <div className="crusoe-collaboration-outcome">
            <span>What the team decided</span>
            <p>We shipped a simple, consistent first version and saved the more advanced guidance as a clearly documented next step.</p>
          </div>
        </section>

        <section className="crusoe-clean-section crusoe-clean-outcome-section" aria-labelledby="crusoe-clean-outcome-title">
          <div className="crusoe-clean-heading">
            <span>08 · Outcome</span>
            <div>
              <h3 id="crusoe-clean-outcome-title">One pattern, applied across the Console.</h3>
              <p>The team received a first version ready to build and a clearly documented plan for a more guided second version.</p>
            </div>
          </div>
          <div className="crusoe-motion-grid crusoe-clean-motion-grid">
            {finalEmptyStateVideos.map(([title, src, description]) => (
              <figure key={src}>
                <ViewportVideo
                  sources={[{ src, type: 'video/mp4' }]}
                  ariaLabel={`${title} empty state walkthrough`}
                />
                <figcaption><strong>{title}</strong><span>{description}</span></figcaption>
              </figure>
            ))}
          </div>
          <div className="crusoe-clean-outcome-band">
            <span>Design principle</span>
            <blockquote>Give users enough context to act, without making an empty moment feel heavy.</blockquote>
          </div>
        </section>
      </section>
        )}

        {activeProject === 'heuristic-evaluation' && (
      <section
        id="crusoe-panel-heuristic-evaluation"
        role="tabpanel"
        aria-label="Heuristic evaluation project"
        className="crusoe-case-section project-section blue-section crusoe-project-panel"
      >
        <div className="crusoe-section-label"><span>Project overview</span><strong>Cloud Console usability evaluation</strong></div>
        <div className="crusoe-project-heading">
          <h2>A structured usability review became nine shipped improvements.</h2>
          <p>
            A heuristic evaluation is a structured way to find usability problems. I reviewed three important tasks: checking
            costs, setting up an API key, and debugging a resource. I then turned the most serious findings into Jira tickets
            and worked with engineering through implementation and QA.
          </p>
        </div>

        <div className="crusoe-he-scope" aria-label="Heuristic evaluation scope">
          {heuristicScope.map(([value, label]) => (
            <div key={label}><strong>{value}</strong><span>{label}</span></div>
          ))}
        </div>

        <section className="crusoe-clean-section crusoe-he-section" aria-labelledby="crusoe-he-method-title">
          <div className="crusoe-clean-heading">
            <span>02 · How I worked</span>
            <div>
              <h3 id="crusoe-he-method-title">Every finding needed to lead to a clear fix.</h3>
              <p>For each problem, I documented what happened, which usability principle it broke, how it affected users, how serious it was, and what the team could build.</p>
            </div>
          </div>

          <div className="crusoe-he-method-grid">
            {heuristicMethod.map(([number, title, body]) => (
              <article key={number}><span>{number}</span><h4>{title}</h4><p>{body}</p></article>
            ))}
          </div>

          <div className="crusoe-he-principle-band">
            <span>Evaluation logic</span>
            <p>I did not stop at naming a principle. Every finding followed the same path: <strong>what happened → why it was a problem → how it affected users → what should change.</strong></p>
          </div>

          <div className="crusoe-he-science-strip" aria-label="Cognitive-science lenses used in the evaluation">
            {heuristicScience.map(([title, body], index) => (
              <article key={title}><span>0{index + 1}</span><div><h4>{title}</h4><p>{body}</p></div></article>
            ))}
          </div>
        </section>

        <section className="crusoe-clean-section crusoe-he-section" aria-labelledby="crusoe-he-findings-title">
          <div className="crusoe-clean-heading">
            <span>03 · Journey → shipped change</span>
            <div>
              <h3 id="crusoe-he-findings-title">I reviewed complete tasks, not isolated screens.</h3>
              <p>Each journey shows the user’s goal, where the experience broke down, the usability principles involved, and the improvements that shipped.</p>
            </div>
          </div>

          <div className="crusoe-he-journey-map" aria-label="Three evaluated Console journeys">
            {heuristicJourneys.map((journey) => (
              <div key={journey.number}>
                <span>{journey.number}</span>
                <strong>{journey.title}</strong>
                <small>{journey.focus}</small>
              </div>
            ))}
          </div>

          <div className="crusoe-he-journeys">
            {heuristicJourneys.map((journey) => (
              <article key={journey.number} className="crusoe-he-journey-card">
                <header>
                  <div className="crusoe-he-journey-number">Journey {journey.number}</div>
                  <div>
                    <h4>{journey.title}</h4>
                    <p><strong>User goal:</strong> {journey.goal}</p>
                  </div>
                  <span>{journey.focus}</span>
                </header>

                <ol className="crusoe-he-journey-path" aria-label={`${journey.title} evaluated path`}>
                  {journey.path.map((step, index) => (
                    <li key={step}><span>0{index + 1}</span><strong>{step}</strong></li>
                  ))}
                </ol>

                <div className="crusoe-he-journey-body">
                  <section className="crusoe-he-journey-friction">
                    <span>Observed friction</span>
                    <p>{journey.friction}</p>
                  </section>

                  <section className="crusoe-he-journey-violations">
                    <span>Heuristic violations</span>
                    <ul>
                      {journey.heuristics.map(([code, name]) => (
                        <li key={code}><strong>{code}</strong><p>{name}</p></li>
                      ))}
                    </ul>
                  </section>

                  <section className="crusoe-he-journey-response">
                    <span>Shipped deliverables</span>
                    <ul className="crusoe-he-changes">
                      {journey.shipped.map((deliverable) => <li key={deliverable}>{deliverable}</li>)}
                    </ul>
                    <div className="crusoe-he-ticket-track"><span>Jira delivery track</span><strong>{journey.jira}</strong></div>
                    <footer><strong>Shipped outcome</strong><p>{journey.result}</p></footer>
                  </section>
                </div>

                {journey.id === 'api-keys' && (
                  <section className="crusoe-he-figma-evidence" aria-labelledby="crusoe-api-key-scenarios-title">
                    <div className="crusoe-he-figma-evidence-copy">
                      <span>Evaluation evidence</span>
                      <h5 id="crusoe-api-key-scenarios-title">From a hidden entry point to a safer first-key experience.</h5>
                      <p>The evaluation shows where the API-key task broke down. The proposed screens show how the fix made the path easier to find and safer to complete.</p>
                    </div>

                    <div className="crusoe-he-figma-evidence-grid">
                      {apiKeyFigmaArtifacts.map((artifact) => (
                        <figure key={artifact.title} className={artifact.featured ? 'is-featured' : undefined}>
                          <div className="crusoe-he-figma-evidence-media">
                            <a href={artifact.src} target="_blank" rel="noreferrer" aria-label={`Open ${artifact.title} full size`}>
                              <Image
                                src={artifact.src}
                                alt={`${artifact.title} frame from the Crusoe heuristic evaluation`}
                                width={artifact.width}
                                height={artifact.height}
                                sizes={artifact.featured ? '(max-width: 900px) 90vw, 78vw' : '(max-width: 760px) 90vw, 42vw'}
                              />
                            </a>
                          </div>
                          <figcaption><span>{artifact.number}</span><div><strong>{artifact.title}</strong><p>{artifact.description}</p><a href={artifact.src} target="_blank" rel="noreferrer">Open full frame ↗</a></div></figcaption>
                        </figure>
                      ))}
                    </div>

                    <section className="crusoe-he-secure-creation" aria-labelledby="crusoe-api-secure-creation-title">
                      <header>
                        <span>Secure creation · before → after</span>
                        <div>
                          <h6 id="crusoe-api-secure-creation-title">Security guidance needed to appear before the key was created.</h6>
                          <p>The old modal made unnamed, permanent keys easy to create and explained the risk only afterward. I changed the flow so users name the key, choose an expiration date, and understand the risk before confirming.</p>
                        </div>
                      </header>

                      <div className="crusoe-he-secure-creation-decision">
                        <span>Design decision</span>
                        <strong>Make the safer choice the default, while still allowing permanent access when someone knowingly needs it.</strong>
                      </div>

                      <div className="crusoe-he-secure-creation-steps">
                        {apiSecureCreationSteps.map((step, index) => (
                          <article key={step.label}>
                            <div className="crusoe-he-secure-creation-copy">
                              <span>{step.label}</span>
                              <h6>{step.title}</h6>
                              <p>{step.summary}</p>
                              <ul>
                                {step.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                              </ul>
                            </div>
                            <figure>
                              <div className="crusoe-he-figma-evidence-media">
                                <a href={step.src} target="_blank" rel="noreferrer" aria-label={`Open ${step.label} secure API-key creation frame full size`}>
                                  <Image
                                    src={step.src}
                                    alt={`${step.label} secure API-key creation design from the Crusoe heuristic evaluation`}
                                    width={step.width}
                                    height={step.height}
                                    sizes="(max-width: 900px) 90vw, 78vw"
                                  />
                                </a>
                              </div>
                              <figcaption><span>0{index + 1}</span><a href={step.src} target="_blank" rel="noreferrer">Open full frame ↗</a></figcaption>
                            </figure>
                          </article>
                        ))}
                      </div>

                      <footer>
                        <span>What changed</span>
                        <p><strong>Before:</strong> optional naming, indefinite access by default, and a warning after creation. <strong>After:</strong> required identity, expiry by default, advance alerts, and an explicit warning before opting out.</p>
                      </footer>
                    </section>
                  </section>
                )}

                {journey.id === 'monitoring-debugging' && (
                  <section className="crusoe-he-ops-artifact" aria-labelledby="crusoe-monitoring-recommendations-title">
                    <div className="crusoe-he-ops-artifact-copy">
                      <span>Five scoped recommendations</span>
                      <h5 id="crusoe-monitoring-recommendations-title">Users needed to understand the effect of a change before and after they made it.</h5>
                      <p>For each recommendation, I showed the expected behavior, the necessary screen states, and the details engineering needed to build it.</p>

                      <ol>
                        {monitoringEngineeringRecommendations.map(([number, recommendation]) => (
                          <li key={number}><span>{number}</span><p>{recommendation}</p></li>
                        ))}
                      </ol>
                    </div>

                    <div className="crusoe-he-ops-figma-stack">
                      {monitoringFigmaArtifacts.map((artifact) => (
                        <figure key={artifact.title}>
                          <div className="crusoe-he-figma-evidence-media">
                            <a href={artifact.src} target="_blank" rel="noreferrer" aria-label={`Open ${artifact.title} full size`}>
                              <Image
                                src={artifact.src}
                                alt={`${artifact.title} frame from the Crusoe monitoring evaluation`}
                                width={artifact.width}
                                height={artifact.height}
                                sizes="(max-width: 900px) 90vw, 78vw"
                              />
                            </a>
                          </div>
                          <figcaption><span>{artifact.number}</span><div><strong>{artifact.title}</strong><p>{artifact.description}</p><a href={artifact.src} target="_blank" rel="noreferrer">Open full frame ↗</a></div></figcaption>
                        </figure>
                      ))}
                    </div>
                  </section>
                )}

                {journey.id === 'cost-monitoring' && (
                  <section className="crusoe-he-billing-artifact" aria-labelledby="crusoe-billing-workstreams-title">
                    <div className="crusoe-he-billing-artifact-copy">
                      <span>Six billing workstreams</span>
                      <h5 id="crusoe-billing-workstreams-title">Six connected improvements made costs easier to find, explain, and control.</h5>
                      <p>The work connected billing entry points, filters, reports, cost breakdowns, and alerts around one goal: helping teams understand and manage spend.</p>

                      <div className="crusoe-he-billing-workstream-grid">
                        {billingEngineeringWorkstreams.map(([number, title, description]) => (
                          <article key={title}>
                            <span>{number}</span>
                            <div><h6>{title}</h6><p>{description}</p></div>
                          </article>
                        ))}
                      </div>
                    </div>

                    <div className="crusoe-he-figma-evidence-grid crusoe-he-billing-figma-grid">
                      {billingFigmaArtifacts.map((artifact) => (
                        <figure key={artifact.title} className={artifact.featured ? 'is-featured' : undefined}>
                          <div className="crusoe-he-figma-evidence-media">
                            <a href={artifact.src} target="_blank" rel="noreferrer" aria-label={`Open ${artifact.title} full size`}>
                              <Image
                                src={artifact.src}
                                alt={`${artifact.title} frame from the Crusoe cost-monitoring evaluation`}
                                width={artifact.width}
                                height={artifact.height}
                                sizes={artifact.featured ? '(max-width: 900px) 90vw, 78vw' : '(max-width: 760px) 90vw, 42vw'}
                              />
                            </a>
                          </div>
                          <figcaption><span>{artifact.number}</span><div><strong>{artifact.title}</strong><p>{artifact.description}</p><a href={artifact.src} target="_blank" rel="noreferrer">Open full frame ↗</a></div></figcaption>
                        </figure>
                      ))}
                    </div>
                  </section>
                )}

              </article>
            ))}
          </div>
        </section>

        <section className="crusoe-clean-section crusoe-he-section" aria-labelledby="crusoe-he-output-title">
          <div className="crusoe-clean-heading">
            <span>04 · Jira → shipped</span>
            <div>
              <h3 id="crusoe-he-output-title">I stayed involved until the improvements shipped.</h3>
              <p>I wrote the priority findings as Jira tickets, set scope with engineers, answered questions during the build, and reviewed normal, loading, empty, and error states in QA.</p>
            </div>
          </div>

          <div className="crusoe-he-output-grid">
            {heuristicDelivery.map(([title, body], index) => (
              <article key={title}><span>0{index + 1}</span><h4>{title}</h4><p>{body}</p></article>
            ))}
          </div>

          <div className="crusoe-he-final-note">
            <span>Delivery model</span>
            <p>Journey evidence → Jira scope → implementation support → QA → shipped change.</p>
          </div>
        </section>
      </section>
        )}

        {activeProject === 'usage-to-cost' && (
      <section
        id="crusoe-panel-usage-to-cost"
        role="tabpanel"
        aria-label="Usage-to-cost project"
        className="crusoe-case-section project-section coral-section crusoe-project-panel"
      >
        <div className="crusoe-section-label"><span>Project overview</span><strong>Usage, billing, and investigation</strong></div>
        <div className="crusoe-project-heading">
          <h2>Show what AI usage costs and what caused the change.</h2>
          <p>
            Intelligence Foundry lets developers use hosted AI models without managing the computers behind them. Text models
            are billed by tokens, or pieces of processed text, while video models are billed by generation time. Teams needed
            a simple way to connect those measurements to their bill.
          </p>
        </div>

        <aside className="crusoe-cost-context" aria-label="Project challenge">
          <span>The design challenge</span>
          <p>
            Usage, cost, and system activity appeared on separate screens. I connected them so a user could notice a change,
            see which product and dates caused it, and inspect the requests or account changes behind it without restarting
            the search on every screen.
          </p>
        </aside>

        <div className="crusoe-cost-brief" aria-label="Usage-to-cost project summary">
          {usageToCostOverview.map(([title, body]) => (
            <article key={title}>
              <span>{title}</span>
              <p>{body}</p>
            </article>
          ))}
        </div>

        <div className="crusoe-cost-journey" aria-label="Final usage-to-cost journey">
          <span>Final journey</span>
          <ol>
            <li>Compare usage</li>
            <li>Understand cost</li>
            <li>Find the responsible product</li>
            <li>Check what happened</li>
          </ol>
        </div>

        <section className="crusoe-clean-section crusoe-cost-section" aria-labelledby="crusoe-cost-problem-title">
          <div className="crusoe-clean-heading">
            <span>Before</span>
            <div>
              <h3 id="crusoe-cost-problem-title">The old flow showed that cost increased, but not why.</h3>
              <p>Finding the cause required moving between four tools, rebuilding the same filters, and comparing charts, requests, and account changes by hand.</p>
            </div>
          </div>

          <div className="crusoe-cost-flow crusoe-cost-before-flow" aria-label="Previous cost investigation workflow">
            <span>Previous workflow</span>
            <ol>
              {usageToCostBeforeFlow.map((step) => <li key={step}>{step}</li>)}
            </ol>
          </div>

          <div className="crusoe-cost-question-grid">
            {usageToCostQuestions.map(([number, title, body]) => (
              <article key={number}><span>{number}</span><h4>{title}</h4><p>{body}</p></article>
            ))}
          </div>

          <div className="crusoe-cost-flow" aria-label="Usage-to-cost investigation model">
            <span>Design response</span>
            <ol>
              <li>Notice a change</li>
              <li>Find the responsible product</li>
              <li>Check requests and account changes</li>
              <li>Decide what to do next</li>
            </ol>
          </div>
        </section>

        <section className="crusoe-clean-section crusoe-cost-section" aria-labelledby="crusoe-cost-process-title">
          <div className="crusoe-clean-heading">
            <span>Process</span>
            <div>
              <h3 id="crusoe-cost-process-title">I mapped the questions first, then designed the screens.</h3>
              <p>I started with the questions teams ask after noticing unexpected cost. Each screen answers one question, then carries the same project, model, and date range into the next step.</p>
            </div>
          </div>

          <div className="crusoe-cost-process-grid">
            {usageToCostProcess.map(([number, title, body]) => (
              <article key={number}><span>{number}</span><div><h4>{title}</h4><p>{body}</p></div></article>
            ))}
          </div>

          <aside className="crusoe-cost-constraint">
            <span>Core design constraint</span>
            <p>Tokens, video seconds, dollars, traffic, response time, and system events needed to connect without being presented as if they were the same measurement.</p>
          </aside>
        </section>

        <section className="crusoe-clean-section crusoe-cost-section" aria-labelledby="crusoe-cost-usage-title">
          <div className="crusoe-clean-heading">
            <span>Design 01 · Compare usage</span>
            <div>
              <h3 id="crusoe-cost-usage-title">Use one clear layout for different types of usage.</h3>
              <p>Text usage stays in tokens and video usage stays in seconds. Tabs let users switch between them while the dates, project, and chart behavior remain consistent.</p>
            </div>
          </div>

          <CostMotionFigure
            src="/crusoe/usage-compare-loop.mp4"
            poster="/images/crusoe/usage-to-cost/usage-overview.jpg"
            startAt={3}
            label="Prototype loop · usage"
            title="Compare four measures without losing scope"
            description="The loop shows the shared tab, period, chart, and hover behavior across each usage type."
          />

          <div className="crusoe-cost-rationale-grid">
            {usageDesignNotes.map(([title, body]) => (
              <article key={title}><h4>{title}</h4><p>{body}</p></article>
            ))}
          </div>
        </section>

        <section className="crusoe-clean-section crusoe-cost-section" aria-labelledby="crusoe-cost-billing-title">
          <div className="crusoe-clean-heading">
            <span>Design 02 · Explain spend</span>
            <div>
              <h3 id="crusoe-cost-billing-title">Show the change first, then explain the total.</h3>
              <p>The page answers four questions in order: Did cost change? When? Which product caused it? What should the user inspect or do next?</p>
            </div>
          </div>

          <CostMotionFigure
            src="/crusoe/cost-breakdown-loop.mp4"
            poster="/images/crusoe/usage-to-cost/billing-overview.jpg"
            label="Prototype loop · billing"
            title="Move from period change to product attribution"
            description="The loop follows the billing hierarchy from current-versus-previous spend through daily cost and the products responsible for the total."
          />

          <div className="crusoe-cost-rationale-grid">
            {costDesignNotes.map(([title, body]) => (
              <article key={title}><h4>{title}</h4><p>{body}</p></article>
            ))}
          </div>
        </section>

        <section className="crusoe-clean-section crusoe-cost-section" aria-labelledby="crusoe-cost-investigation-title">
          <div className="crusoe-clean-heading">
            <span>Design 03 · Investigate the cause</span>
            <div>
              <h3 id="crusoe-cost-investigation-title">A bill increase now leads directly to its cause.</h3>
              <p>“View analytics” shows how traffic and performance changed. Event logs and account history then reveal the requests, model updates, or user actions behind that pattern.</p>
            </div>
          </div>

          <CostMotionFigure
            src="/crusoe/cost-investigation-loop.mp4"
            poster="/images/crusoe/usage-to-cost/operational-analytics.jpg"
            label="Prototype loop · investigation"
            title="Carry the question into analytics and logs"
            description="The loop moves through workload metrics, request-level evidence, and activity history without breaking the investigation model."
          />

          <div className="crusoe-cost-rationale-grid">
            {investigationDesignNotes.map(([title, body]) => (
              <article key={title}><h4>{title}</h4><p>{body}</p></article>
            ))}
          </div>
        </section>

        <section className="crusoe-clean-section crusoe-cost-section" aria-labelledby="crusoe-cost-decisions-title">
          <div className="crusoe-clean-heading">
            <span>Outcome</span>
            <div>
              <h3 id="crusoe-cost-decisions-title">Each screen answers one question and leads to the next.</h3>
              <p>The final flow helps users understand what they used, what it cost, which product caused the change, and what happened in the system at the same time.</p>
            </div>
          </div>

          <div className="crusoe-cost-decision-grid">
            {usageToCostDecisions.map(([title, body], index) => (
              <article key={title}><span>0{index + 1}</span><h4>{title}</h4><p>{body}</p></article>
            ))}
          </div>

        </section>
      </section>
        )}
      </section>

      <section className="crusoe-case-section collaboration-section">
        <div className="crusoe-section-label"><span>04 · Collaboration</span><strong>Designing across the system</strong></div>
        <div className="crusoe-collaboration-grid">
          <div>
            <h2>Frequent reviews kept the work clear and buildable.</h2>
            <p>
              I worked with design, product, engineering, brand, and technical writing throughout the internship. We reviewed
              problems early, agreed on scope, refined the experience together, and documented decisions before handoff.
            </p>
          </div>
          <aside className="crusoe-collaboration-artifact" aria-label="Cross-functional collaboration process">
            <header>
              <span>04 · Working rhythm</span>
              <small>Cross-functional</small>
            </header>
            <ol>
              {collaborationRhythm.map(([number, title, partner, body]) => (
                <li key={number}>
                  <span>{number}</span>
                  <div>
                    <div className="crusoe-collaboration-step-heading">
                      <h3>{title}</h3>
                      <small>{partner}</small>
                    </div>
                    <p>{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <footer>Each review made the product decision and the final handoff clearer.</footer>
          </aside>
        </div>
      </section>

      <section className="crusoe-case-section crusoe-outcomes-section">
        <div className="crusoe-section-label"><span>05 · Outcomes</span></div>
        <div className="crusoe-outcomes-heading">
          <h2>Clearer experiences for customers and clearer plans for the team.</h2>
          <p>
            The internship produced improvements the team could ship now, reusable patterns for future work, and clear
            documentation for larger ideas that needed more time.
          </p>
        </div>
        <div className="crusoe-outcomes-grid">
          {internshipOutcomes.map(([title, body], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="crusoe-case-section reflection-section">
        <p className="crusoe-eyebrow">06 · Reflection</p>
        <h2>What I&apos;m taking with me.</h2>
        <div className="crusoe-reflection-grid">
          <article><span>01</span><p>Infrastructure products feel easier when users can always see what they selected, what the system is doing, and what will happen next.</p></article>
          <article><span>02</span><p>A strong first release can solve the immediate problem while still leaving a clear path for a more ambitious version.</p></article>
          <article><span>03</span><p>Design documentation should help the team understand the decision, not only show the final screen.</p></article>
        </div>
      </section>

      <footer className="crusoe-case-footer">
        <p>Crusoe · Product Design Internship</p>
        <h2>Thanks for taking a look.</h2>
        <div>
          <Link href="/#work">More work</Link>
          <a href="mailto:anusharama100@gmail.com">Get in touch</a>
        </div>
      </footer>
    </main>
  )
}

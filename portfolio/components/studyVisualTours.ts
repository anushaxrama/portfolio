import type { CaseStudySlug } from './caseStudyProjects'

type TourScreen = { label: string; src: string; alt: string; title: string; note: string }
export const studyVisualTours: Partial<Record<CaseStudySlug, readonly TourScreen[]>> = {
  trace: [
    { label: 'Observe', src: '/trace/trace-evidence.jpg', alt: 'Trace evidence library with observations and their sources', title: 'Keep the original observation within reach.', note: 'Source, topic, and connected insights stay with each record, so interpretation does not replace the evidence.' },
    { label: 'Connect', src: '/trace/trace-insight.jpg', alt: 'Trace insight editor with linked supporting observations', title: 'Make the connection explicit.', note: 'An insight links to selected observations. Draft and ready states distinguish work in progress from a supported finding.' },
    { label: 'Decide', src: '/trace/trace-decision.jpg', alt: 'Trace decision inspector with rationale and supporting insights', title: 'Inspect the reasoning behind the choice.', note: 'The decision keeps its alternative, rationale, and supporting insights together. Changed source material flags it for review.' },
  ],
  krokos: [
    { label: 'The invitation', src: '/krokos/redesign-home-screen.jpg', alt: 'Krokos Bio redesigned homepage opening', title: 'Start with the botanical story.', note: 'Warm colors, editorial typography, and a clear Explore action introduce the science through something familiar.' },
    { label: 'The science', src: '/krokos/redesign-approach.jpg', alt: 'Krokos approach section showing the plant cell culture sequence', title: 'Explain the mechanism visually.', note: 'A three-part sequence connects real plant cells, plant cell culture, and botanical ingredients.' },
    { label: 'The credibility', src: '/krokos/redesign-press-coverage.jpg', alt: 'Krokos Press page with publishers, dates, headlines, and article links', title: 'Give the story an inspectable source.', note: 'Publisher names, dates, and article links carry the same visual language into the Press page.' },
  ],
  neuranote: [
    { label: 'Enter the workspace', src: '/landing/project-neuranote.png', alt: 'NeuraNote learning workspace introduction', title: 'A quieter starting point for learning.', note: 'Capture, connections, and review belong to the same learning system, rather than three disconnected tasks.' },
    { label: 'Connect ideas', src: '/neuranote/neuranote-5.png', alt: 'NeuraNote concept map interface', title: 'Turn isolated notes into connected concepts.', note: 'The concept map makes relationships visible so the learner can inspect how ideas fit together.' },
    { label: 'Return to review', src: '/neuranote/neuranote-6.png', alt: 'NeuraNote active review interface', title: 'Make returning an active task.', note: 'Recall prompts provide a next step beyond rereading. The design proposes a review habit; learning gains are not measured.' },
  ],
  habitat: [
    { label: 'The experience', src: '/habitat/habitat-hero.png', alt: 'HABITat habit tracking mobile app concept', title: 'Connect small habits with a growing habitat.', note: 'A playful reward system gives routine tracking a personal, encouraging direction.' },
    { label: 'Today’s habits', src: '/habitat/home-screen.jpeg', alt: 'HABITat home screen with a calendar and habit streaks', title: 'Bring the next action and progress together.', note: 'The daily overview keeps the calendar, individual habits, and shared routines in one place.' },
    { label: 'Shared progress', src: '/habitat/shared-habits.jpeg', alt: 'HABITat shared routine with two people’s streaks and a reminder', title: 'Make the reminder feel connected to a person.', note: 'Each person’s progress sits beside the reminder, giving the social action a clear purpose.' },
  ],
  flowops: [
    { label: 'Scan requests', src: '/landing/project-flowops.png', alt: 'FlowOps request dashboard', title: 'See where work stands.', note: 'Status, priority, and SLA indicators support a quick scan before opening an individual request.' },
    { label: 'Inspect a request', src: '/flowops2.png', alt: 'FlowOps request detail view with timeline and actions', title: 'Keep the handoff beside the work.', note: 'The request detail brings the timeline and available actions into the same context.' },
    { label: 'Triage the queue', src: '/flowops3.png', alt: 'FlowOps agent triage queue', title: 'Give the agent a role-specific view.', note: 'A priority-sorted queue supports the next operational decision without repeating the requester’s view.' },
  ],
  spotify: [
    { label: 'Your threads', src: '/spotify/spotify-1.png', alt: 'Spotify Threads music memory interface', title: 'Begin with a memory, not another feed.', note: 'The concept organizes music around the personal context attached to listening.' },
    { label: 'Emotional clusters', src: '/spotify/spotify-3.png', alt: 'Spotify Threads emotional clusters interface', title: 'Offer another route into saved music.', note: 'Mood and emotional context provide a way to explore a listening history beyond a list of tracks.' },
    { label: 'Return to a moment', src: '/spotify/spotify-6.png', alt: 'Spotify Threads now playing memory interface', title: 'Keep the memory connected to playback.', note: 'The selected music retains its listening context. This is an independent design concept, not a Spotify release.' },
  ],
}

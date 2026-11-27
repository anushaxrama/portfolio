"use client"

import StudyEvidenceSwitcher from './StudyEvidenceSwitcher'
import type { DataProjectSlug } from './dataProjects'

// Explanations of the documented implementation, not simulated live processing.
const notes: Record<DataProjectSlug, readonly string[]> = {
  marketpulse: [
    'The replay starts with dated Binance Vision archives, not a live market feed.',
    'Versioned events give each historical bar a consistent structure before delivery.',
    'Kafka delivers events; Spark handles event-time windows and late arrivals.',
    'Accepted market facts and delivery audit decisions remain separate, so repeats are inspectable.',
    'The API and dashboard expose the recorded replay and its processing context.',
  ],
  atlasiq: [
    'TLC trip records, zone lookups, and NOAA weather provide the bounded analytical sources.',
    'Checksums identify source files. Validation separates accepted rows from explained rejections.',
    'Monthly partitions support replacement and replay without accumulating duplicate trips.',
    'Warehouse transformations and quality checks finish before the data is published for analysis.',
    'Typed API responses connect the analytical views to demand, zones, and data-quality information.',
  ],
  signalflow: [
    'NESO supplies half-hour carbon intensity and generation intervals for Great Britain.',
    'Validation preserves the source payload and distinguishes exact repeats from changed records.',
    'The storage model retains revisions and prevents a delayed forecast from replacing a known actual.',
    'Queries preserve missing actuals and reject incomplete comparison windows.',
    'The dashboard presents historical comparisons with their freshness and uncertainty visible.',
  ],
  'patient-journey': [
    'Demonstration records are synthetic. This path does not connect to a hospital EHR.',
    'Bronze Parquet retains an inspectable output from extraction.',
    'The silver layer separates cleaning and derived fields from the source records.',
    'SQL and warehouse-loading modules form a separate path that still needs integration work.',
    'The file-based Streamlit dashboard can be reviewed independently of the warehouse path.',
  ],
  'diabetes-readmission': [
    'The project examines historical encounters involving diabetes for educational analysis.',
    'Preparation brings encounter attributes into a form that can be explored and compared.',
    'Grouping the validation split by patient keeps the same patient from appearing on both sides.',
    'Logistic regression and XGBoost provide two inspectable modeling approaches.',
    'The interface presents exploratory comparisons, not a clinically validated prediction service.',
  ],
}

export default function DataPipelineExplorer({ slug, name, steps }: { slug: DataProjectSlug; name: string; steps: readonly string[] }) {
  return <div className="data-pipeline-explorer" data-study-reveal>
    <StudyEvidenceSwitcher label={`Explore the ${name} data pipeline`} labels={steps}>
      {steps.map((step, index) => <section className="data-pipeline-stage" key={step}>
        <div className="data-pipeline-map" aria-hidden="true">{steps.map((_, position) => <span key={position} className={position === index ? 'is-current' : position < index ? 'is-upstream' : ''}>{String(position + 1).padStart(2, '0')}</span>)}</div>
        <div className="data-pipeline-stage-copy"><span className="study-eyebrow">Data path / step {String(index + 1).padStart(2, '0')}</span><h4>{step}</h4><p>{notes[slug][index]}</p></div>
        <div className="data-pipeline-handoff"><span><small>From</small>{steps[index - 1] ?? 'Source records'}</span><span aria-hidden="true">→</span><span><small>To</small>{steps[index + 1] ?? 'Analytical interface'}</span></div>
      </section>)}
    </StudyEvidenceSwitcher>
  </div>
}

import Reveal from './Reveal.jsx';
import Waveform from './Waveform.jsx';
import { hero } from '../content.jsx';

const GRAPH_HEIGHTS = [28, 34, 32, 44, 42, 56, 52, 68, 64, 80];
const CHART_W = 200;
const CHART_H = 60;
const CHART_PAD = 8;

const chartPoints = GRAPH_HEIGHTS.map((h, i) => {
  const x = (i / (GRAPH_HEIGHTS.length - 1)) * CHART_W;
  const y = CHART_H - CHART_PAD - (h / 100) * (CHART_H - CHART_PAD * 2);
  return `${x.toFixed(1)},${y.toFixed(1)}`;
}).join(' ');

const areaPoints = `0,${CHART_H} ${chartPoints} ${CHART_W},${CHART_H}`;
const [lastX, lastY] = chartPoints.split(' ').at(-1).split(',');

const PROGRESS_DOTS = 8;
const PROGRESS_FILLED = 5;

function PlayIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M7 5.2v9.6l7.5-4.8L7 5.2z" fill="currentColor" />
    </svg>
  );
}

export default function Hero() {
  const scrollToForm = (e) => {
    e.preventDefault();
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="top" className="max-w-content mx-auto px-5 sm:px-8 pt-14 sm:pt-24 pb-14 sm:pb-20">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <Reveal>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.1] font-semibold text-ink tracking-tight text-balance">
            {hero.headline}
          </h1>
          <p className="mt-5 text-lg text-ink-muted max-w-md leading-relaxed">{hero.subhead}</p>
          <div className="mt-8">
            <a
              href="#waitlist"
              onClick={scrollToForm}
              className="inline-flex items-center justify-center rounded-md bg-accent text-white text-base font-medium px-6 py-3.5 min-h-[48px] hover:bg-accent-dark transition-colors"
            >
              {hero.ctaLabel}
            </a>
          </div>
        </Reveal>

        <Reveal delay={100} className="hidden lg:block">
          <div
            className="rounded-[28px] bg-white p-6 sm:p-7 space-y-4 shadow-[0_12px_32px_-8px_rgba(49,87,255,0.22)]"
            aria-hidden="true"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-lg">
                  {hero.card.lessonEmoji}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{hero.card.lessonTitle}</p>
                  <p className="text-xs text-ink-muted">{hero.card.lessonDuration}</p>
                </div>
              </div>
              <span className="text-[10px] font-medium uppercase tracking-wide text-ink-muted/70 bg-bg-secondary rounded-full px-2.5 py-1">
                {hero.card.previewLabel}
              </span>
            </div>

            <div className="rounded-2xl bg-accent/[0.06] p-4">
              <div className="flex items-center gap-1.5">
                {Array.from({ length: PROGRESS_DOTS }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-3 w-3 rounded-full ${i < PROGRESS_FILLED ? 'bg-accent' : 'bg-accent/15'}`}
                  />
                ))}
              </div>
              <p className="mt-2.5 text-sm font-semibold text-accent">{hero.card.progressEncouragement}</p>
            </div>

            <div className="rounded-2xl bg-accent/[0.06] p-4">
              <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} className="w-full h-14" preserveAspectRatio="none">
                <polygon points={areaPoints} className="fill-accent/10" />
                <polyline
                  points={chartPoints}
                  fill="none"
                  className="stroke-accent"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx={lastX} cy={lastY} r="5" className="fill-accent" />
              </svg>
              <p className="mt-1 text-sm font-semibold text-accent">{hero.card.graphEncouragement}</p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-accent/[0.06] p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                <PlayIcon className="h-4 w-4" />
              </span>
              <Waveform className="h-6 flex-1" />
              <span className="text-xs font-medium text-ink-muted whitespace-nowrap">
                {hero.card.vocalLabel} · {hero.card.vocalDuration}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

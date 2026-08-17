import { Fragment } from 'react';
import Reveal from './Reveal.jsx';
import { features } from '../content.jsx';

function Panel({ className = '', delay = 0, children }) {
  return (
    <Reveal
      delay={delay}
      className={`rounded-[24px] bg-white p-6 shadow-[0_10px_28px_-10px_rgba(49,87,255,0.25)] ${className}`}
    >
      {children}
    </Reveal>
  );
}

function Header({ emoji, children }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-base shrink-0">
        {emoji}
      </span>
      <h3 className="text-sm font-semibold text-ink">{children}</h3>
    </div>
  );
}

function Body({ children }) {
  return <p className="mt-3 text-sm text-ink-muted leading-relaxed">{children}</p>;
}

export default function Features() {
  return (
    <section className="border-t border-line">
      <div className="max-w-content mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium text-ink-muted">{features.eyebrow}</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
            {features.headline}
          </h2>
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-2 gap-6">
          <Panel>
            <Header emoji={features.body.emoji}>{features.body.label}</Header>
            <div className="mt-4 mx-auto w-40 sm:w-44 aspect-[267/430] rounded-2xl overflow-hidden bg-accent/5">
              <img
                src="/images/body-language.png"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <Body>{features.body.body}</Body>
          </Panel>

          <Panel delay={60}>
            <Header emoji={features.voice.emoji}>{features.voice.label}</Header>
            <div className="mt-4 space-y-3">
              {features.voice.meters.map((meter) => (
                <div key={meter.label}>
                  <p className="text-xs text-ink-muted mb-1">{meter.label}</p>
                  <div className="h-2.5 rounded-full bg-accent/10 overflow-hidden">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${meter.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm font-semibold text-accent">{features.voice.encouragement}</p>
            <Body>{features.voice.body}</Body>
          </Panel>

          <Panel delay={120} className="sm:col-span-2">
            <Header emoji={features.transcript.emoji}>{features.transcript.label}</Header>
            <p className="mt-4 text-sm leading-loose">
              {features.transcript.segments.map((seg, i) =>
                seg.flagged ? (
                  <span key={i} className="text-ink-muted/50 line-through decoration-1">
                    {seg.text}
                  </span>
                ) : (
                  <span key={i} className="bg-accent/15 text-ink rounded-md px-1.5 py-0.5">
                    {seg.text}
                  </span>
                )
              )}
            </p>
            <Body>{features.transcript.body}</Body>
          </Panel>

          <Panel delay={60}>
            <Header emoji={features.frameworks.emoji}>{features.frameworks.label}</Header>
            <div className="mt-4 flex items-center flex-wrap gap-2">
              {features.frameworks.steps.map((step, i) => (
                <Fragment key={step}>
                  <span className="rounded-2xl bg-accent text-white text-sm font-semibold px-4 py-2 shadow-[0_3px_0_0_rgb(39,70,204)]">
                    {step}
                  </span>
                  {i < features.frameworks.steps.length - 1 && (
                    <span className="text-ink-muted text-sm" aria-hidden="true">
                      →
                    </span>
                  )}
                </Fragment>
              ))}
            </div>
            <Body>{features.frameworks.body}</Body>
          </Panel>

          <Panel delay={120}>
            <Header emoji={features.starters.emoji}>{features.starters.label}</Header>
            <div className="mt-4 space-y-2">
              {features.starters.examples.map((example) => (
                <p
                  key={example}
                  className="rounded-2xl bg-accent/5 px-4 py-2.5 text-sm text-ink"
                >
                  {example}
                </p>
              ))}
            </div>
            <Body>{features.starters.body}</Body>
          </Panel>
        </div>
      </div>
    </section>
  );
}

import Reveal from './Reveal.jsx';
import { whyItMatters } from '../content.jsx';

export default function WhyItMatters() {
  return (
    <section className="max-w-content mx-auto px-5 sm:px-8 py-16 sm:py-20">
      <Reveal className="max-w-2xl">
        <p className="text-sm font-medium text-ink-muted">{whyItMatters.eyebrow}</p>
        <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
          {whyItMatters.headline}
        </h2>
        <p className="mt-3 text-lg text-ink-muted leading-relaxed">{whyItMatters.intro}</p>
      </Reveal>

      <Reveal delay={80}>
        <p className="mt-8 text-lg text-ink-muted leading-relaxed max-w-2xl">
          {whyItMatters.paragraph}
        </p>
      </Reveal>

      <Reveal delay={160}>
        <p className="mt-6 text-lg font-medium text-ink max-w-2xl">{whyItMatters.closing}</p>
      </Reveal>
    </section>
  );
}

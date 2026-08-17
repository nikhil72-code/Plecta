import Reveal from './Reveal.jsx';
import { valueProp } from '../content.jsx';

export default function HowItWorks() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="max-w-content mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <Reveal>
          <p className="text-sm font-medium text-ink-muted">{valueProp.eyebrow}</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
            {valueProp.headline}
          </h2>
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-3 gap-8 sm:gap-6">
          {valueProp.items.map((item, i) => (
            <Reveal key={item.label} delay={i * 80}>
              <div className="sm:border-l sm:border-line sm:pl-6 sm:first:border-l-0 sm:first:pl-0">
                <h3 className="text-base font-semibold text-ink">{item.label}</h3>
                <p className="mt-1.5 text-ink-muted leading-relaxed">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

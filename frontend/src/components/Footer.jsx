import { footer } from '../content.jsx';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="max-w-content mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="text-sm font-semibold tracking-tight text-ink uppercase">{footer.brand}</span>
        <p className="text-sm text-ink-muted">{footer.tagline}</p>
      </div>
    </footer>
  );
}

import { navbar } from '../content.jsx';

export default function Navbar() {
  const scrollToForm = (e) => {
    e.preventDefault();
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-bg/90 backdrop-blur-sm border-b border-line">
      <nav className="max-w-content mx-auto flex items-center justify-between px-5 sm:px-8 h-20 sm:h-24">
        <a href="#top" className="text-2xl sm:text-3xl font-bold tracking-tight text-ink uppercase">
          {navbar.brand}
        </a>
        <a
          href="#waitlist"
          onClick={scrollToForm}
          className="inline-flex items-center justify-center rounded-md bg-accent text-white text-sm font-medium px-4 py-2 min-h-[40px] hover:bg-accent-dark transition-colors"
        >
          {navbar.cta}
        </a>
      </nav>
    </header>
  );
}

import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Features from './components/Features.jsx';
import WhyItMatters from './components/WhyItMatters.jsx';
import WaitlistForm from './components/WaitlistForm.jsx';
import Footer from './components/Footer.jsx';
import Reveal from './components/Reveal.jsx';
import { waitlistSection } from './content.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-ink font-sans">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <WhyItMatters />
        <section id="waitlist" className="max-w-content mx-auto px-5 sm:px-8 py-16 sm:py-24">
          <Reveal className="max-w-xl mx-auto text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
              {waitlistSection.headline}
            </h2>
            <p className="mt-2 text-ink-muted">{waitlistSection.subhead}</p>
          </Reveal>
          <div className="max-w-xl mx-auto">
            <WaitlistForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

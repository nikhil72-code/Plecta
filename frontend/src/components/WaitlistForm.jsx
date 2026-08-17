import { useMemo, useState } from 'react';
import { waitlistForm as copy } from '../content.jsx';

const MOTIVATION_OPTIONS = copy.motivationOptions;
const CHALLENGE_OPTIONS = copy.challengeOptions;
const FREQUENCY_OPTIONS = copy.frequencyOptions;
const LENGTH_OPTIONS = copy.lengthOptions;

const TOTAL_STEPS = 6;

const API_URL = import.meta.env.VITE_API_URL || '';

function getSignupSource() {
  if (typeof window === 'undefined') return 'direct';
  const param = new URLSearchParams(window.location.search).get('source');
  if (param && /^[a-z0-9_-]{1,40}$/i.test(param)) return param;
  return 'direct';
}

function StepBadge({ required }) {
  return (
    <span
      className={`inline-block text-[11px] font-medium uppercase tracking-wide px-2 py-0.5 rounded ${
        required ? 'bg-accent/10 text-accent' : 'bg-bg-secondary text-ink-muted'
      }`}
    >
      {required ? copy.requiredLabel : copy.optionalLabel}
    </span>
  );
}

function Checkbox({ checked, label, onChange }) {
  return (
    <label
      className={`flex items-center gap-3 rounded-md border px-4 py-3 min-h-[48px] cursor-pointer transition-colors ${
        checked ? 'border-accent bg-accent/5' : 'border-line hover:border-ink-muted'
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-accent shrink-0"
      />
      <span className="text-sm text-ink">{label}</span>
    </label>
  );
}

function Radio({ checked, label, name, onChange }) {
  return (
    <label
      className={`flex items-center gap-3 rounded-md border px-4 py-3 min-h-[48px] cursor-pointer transition-colors ${
        checked ? 'border-accent bg-accent/5' : 'border-line hover:border-ink-muted'
      }`}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-accent shrink-0"
      />
      <span className="text-sm text-ink">{label}</span>
    </label>
  );
}

export default function WaitlistForm() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [result, setResult] = useState(null); // { status, first_name }
  const [fieldErrors, setFieldErrors] = useState({});

  const [form, setForm] = useState({
    first_name: '',
    email: '',
    motivations: [],
    communication_challenges: [],
    recent_communication_problem: '',
    practice_frequency: '',
    preferred_session_length: '',
    desired_improvement: '',
    ideas: '',
  });

  const signupSource = useMemo(getSignupSource, []);

  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setFieldErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleInList = (key, option) => {
    setForm((f) => {
      const has = f[key].includes(option);
      return { ...f, [key]: has ? f[key].filter((v) => v !== option) : [...f[key], option] };
    });
  };

  const step1Valid = form.first_name.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  const goNext = () => {
    if (step === 1 && !step1Valid) {
      setFieldErrors({
        first_name: form.first_name.trim() ? undefined : copy.step1.firstNameError,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? undefined : copy.step1.emailError,
      });
      return;
    }
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch(`${API_URL}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, signup_source: signupSource }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data?.errors) setFieldErrors(data.errors);
        setSubmitError(copy.genericError);
        setSubmitting(false);
        return;
      }

      setResult(data);
    } catch (err) {
      setSubmitError(copy.networkError);
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <div className="rounded-lg border border-line bg-surface p-8 sm:p-10 text-center reveal reveal-visible">
        <h3 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
          {result.status === 'already_registered' ? copy.success.headlineExisting : copy.success.headlineNew}
        </h3>
        <p className="mt-3 text-ink-muted leading-relaxed max-w-md mx-auto">
          {copy.success.thanks(result.first_name)}
        </p>
        <p className="mt-4 text-sm text-ink-muted">{copy.success.referral}</p>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(window.location.origin);
          }}
          className="mt-4 inline-flex items-center justify-center rounded-md border border-line text-ink text-sm font-medium px-6 py-3 min-h-[44px] hover:border-ink transition-colors"
        >
          {copy.success.copyLinkLabel}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-line bg-surface p-6 sm:p-10"
      noValidate
    >
      <div className="flex items-center gap-1.5 mb-8" aria-hidden="true">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${i < step ? 'bg-accent' : 'bg-bg-secondary'}`}
          />
        ))}
      </div>

      {step === 1 && (
        <div key="step-1" className="fade-up">
          <div className="flex items-center gap-2 mb-1">
            <StepBadge required />
          </div>
          <h3 className="text-2xl font-semibold text-ink tracking-tight">{copy.step1.heading}</h3>
          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-ink mb-1.5">
                {copy.step1.firstNameLabel}
              </label>
              <input
                id="first_name"
                type="text"
                autoComplete="given-name"
                maxLength={100}
                value={form.first_name}
                onChange={(e) => update('first_name', e.target.value)}
                aria-invalid={Boolean(fieldErrors.first_name)}
                aria-describedby={fieldErrors.first_name ? 'first_name-error' : undefined}
                className="w-full min-h-[48px] rounded-md border border-line px-4 text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              />
              {fieldErrors.first_name && (
                <p id="first_name-error" className="mt-1.5 text-sm text-accent">
                  {fieldErrors.first_name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
                {copy.step1.emailLabel}
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                className="w-full min-h-[48px] rounded-md border border-line px-4 text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              />
              {fieldErrors.email && (
                <p id="email-error" className="mt-1.5 text-sm text-accent">
                  {fieldErrors.email}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div key="step-2" className="fade-up">
          <StepBadge />
          <h3 className="mt-1 text-2xl font-semibold text-ink tracking-tight">{copy.step2.heading}</h3>
          <p className="mt-1.5 text-sm text-ink-muted">{copy.step2.subheading}</p>
          <div className="mt-6 grid sm:grid-cols-2 gap-2.5">
            {MOTIVATION_OPTIONS.map((option) => (
              <Checkbox
                key={option}
                label={option}
                checked={form.motivations.includes(option)}
                onChange={() => toggleInList('motivations', option)}
              />
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div key="step-3" className="fade-up">
          <StepBadge />
          <h3 className="mt-1 text-2xl font-semibold text-ink tracking-tight">{copy.step3.heading}</h3>
          <p className="mt-1.5 text-sm text-ink-muted">{copy.step3.subheading}</p>
          <div className="mt-6 grid sm:grid-cols-2 gap-2.5">
            {CHALLENGE_OPTIONS.map((option) => (
              <Checkbox
                key={option}
                label={option}
                checked={form.communication_challenges.includes(option)}
                onChange={() => toggleInList('communication_challenges', option)}
              />
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div key="step-4" className="fade-up">
          <StepBadge />
          <h3 className="mt-1 text-2xl font-semibold text-ink tracking-tight text-balance">
            {copy.step4.heading}
          </h3>
          <textarea
            rows={3}
            maxLength={500}
            value={form.recent_communication_problem}
            onChange={(e) => update('recent_communication_problem', e.target.value)}
            placeholder={copy.step4.placeholder}
            className="mt-6 w-full rounded-md border border-line px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent resize-none"
          />
        </div>
      )}

      {step === 5 && (
        <div key="step-5" className="fade-up">
          <StepBadge />
          <h3 className="mt-1 text-2xl font-semibold text-ink tracking-tight">{copy.step5.heading}</h3>

          <p className="mt-6 text-sm font-medium text-ink mb-2.5">{copy.step5.frequencyLabel}</p>
          <div className="space-y-2.5">
            {FREQUENCY_OPTIONS.map((option) => (
              <Radio
                key={option}
                name="practice_frequency"
                label={option}
                checked={form.practice_frequency === option}
                onChange={() => update('practice_frequency', option)}
              />
            ))}
          </div>

          <p className="mt-6 text-sm font-medium text-ink mb-2.5">{copy.step5.lengthLabel}</p>
          <div className="space-y-2.5">
            {LENGTH_OPTIONS.map((option) => (
              <Radio
                key={option}
                name="preferred_session_length"
                label={option}
                checked={form.preferred_session_length === option}
                onChange={() => update('preferred_session_length', option)}
              />
            ))}
          </div>
        </div>
      )}

      {step === 6 && (
        <div key="step-6" className="fade-up">
          <StepBadge />
          <h3 className="mt-1 text-2xl font-semibold text-ink tracking-tight">{copy.step6.heading}</h3>
          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="desired_improvement" className="block text-sm font-medium text-ink mb-1.5">
                {copy.step6.improvementLabel}
              </label>
              <textarea
                id="desired_improvement"
                rows={2}
                maxLength={500}
                value={form.desired_improvement}
                onChange={(e) => update('desired_improvement', e.target.value)}
                className="w-full rounded-md border border-line px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent resize-none"
              />
            </div>
            <div>
              <label htmlFor="ideas" className="block text-sm font-medium text-ink mb-1.5">
                {copy.step6.ideasLabel}
              </label>
              <textarea
                id="ideas"
                rows={2}
                maxLength={500}
                value={form.ideas}
                onChange={(e) => update('ideas', e.target.value)}
                placeholder={copy.step6.ideasPlaceholder}
                className="w-full rounded-md border border-line px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent resize-none"
              />
            </div>
          </div>
        </div>
      )}

      {submitError && <p className="mt-6 text-sm text-accent">{submitError}</p>}

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 1 ? (
          <button
            type="button"
            onClick={goBack}
            className="text-sm font-medium text-ink-muted hover:text-ink px-2 py-2 min-h-[44px]"
          >
            {copy.backLabel}
          </button>
        ) : (
          <span />
        )}

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center justify-center rounded-md bg-ink text-white text-sm font-medium px-7 py-3 min-h-[48px] hover:bg-accent transition-colors"
          >
            {copy.continueLabel}
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-md bg-accent text-white text-sm font-medium px-7 py-3 min-h-[48px] hover:bg-accent-dark transition-colors disabled:opacity-60"
          >
            {submitting ? copy.submittingLabel : copy.submitLabel}
          </button>
        )}
      </div>
    </form>
  );
}

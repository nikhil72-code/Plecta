const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MOTIVATION_OPTIONS = new Set([
  'Career growth',
  'Job interviews',
  'Presentations & pitching',
  'Entrepreneurship',
  'Public speaking',
  'Personal confidence',
  'Academic / school',
  'Just for fun',
  'Other',
]);

const CHALLENGE_OPTIONS = new Set([
  'Public speaking',
  'Presentations / pitching',
  'Job interviews',
  'Speaking confidently',
  'Getting my point across clearly',
  'Rambling / going off track',
  'Filler words (um, uh, like)',
  'Voice / delivery / pace',
  'Thinking on my feet',
  'Other',
]);

const FREQUENCY_OPTIONS = new Set([
  'Every day',
  '3-5 times a week',
  '1-2 times a week',
  'Less often',
]);

const LENGTH_OPTIONS = new Set([
  '2-5 minutes',
  '5-10 minutes',
  '10-20 minutes',
  '20+ minutes',
]);

const SOURCE_RE = /^[a-z0-9_-]{1,40}$/i;

function clampText(value, maxLen) {
  if (value == null) return null;
  const str = String(value).trim();
  if (!str) return null;
  return str.slice(0, maxLen);
}

export function validateSignup(body) {
  const errors = {};

  const firstName = clampText(body.first_name, 100);
  if (!firstName) errors.first_name = 'First name is required.';

  const email = clampText(body.email, 254);
  if (!email || !EMAIL_RE.test(email)) errors.email = 'A valid email is required.';

  let motivations = [];
  if (body.motivations != null) {
    if (!Array.isArray(body.motivations)) {
      errors.motivations = 'Must be a list.';
    } else {
      motivations = body.motivations
        .map((v) => String(v).trim())
        .filter((v) => MOTIVATION_OPTIONS.has(v))
        .slice(0, MOTIVATION_OPTIONS.size);
    }
  }

  let communicationChallenges = [];
  if (body.communication_challenges != null) {
    if (!Array.isArray(body.communication_challenges)) {
      errors.communication_challenges = 'Must be a list.';
    } else {
      communicationChallenges = body.communication_challenges
        .map((v) => String(v).trim())
        .filter((v) => CHALLENGE_OPTIONS.has(v))
        .slice(0, CHALLENGE_OPTIONS.size);
    }
  }

  const practiceFrequency = clampText(body.practice_frequency, 40);
  if (practiceFrequency && !FREQUENCY_OPTIONS.has(practiceFrequency)) {
    errors.practice_frequency = 'Invalid option.';
  }

  const preferredSessionLength = clampText(body.preferred_session_length, 40);
  if (preferredSessionLength && !LENGTH_OPTIONS.has(preferredSessionLength)) {
    errors.preferred_session_length = 'Invalid option.';
  }

  let signupSource = clampText(body.signup_source, 40) || 'direct';
  if (!SOURCE_RE.test(signupSource)) signupSource = 'direct';

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      first_name: firstName,
      email: email.toLowerCase(),
      motivations,
      communication_challenges: communicationChallenges,
      recent_communication_problem: clampText(body.recent_communication_problem, 500),
      practice_frequency: practiceFrequency || null,
      preferred_session_length: preferredSessionLength || null,
      desired_improvement: clampText(body.desired_improvement, 500),
      ideas: clampText(body.ideas, 500),
      signup_source: signupSource,
    },
  };
}

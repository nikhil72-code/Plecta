// All page copy lives here. Edit text freely — nothing here affects layout or styling.

export const meta = {
  title: 'Plecta — Communication is a skill. Train it.',
  description: 'Practise speaking. Get feedback. Improve. Join the waitlist.',
};

export const navbar = {
  brand: 'Plecta',
  cta: 'Join the waitlist',
};

export const hero = {
  headline: (
    <>
      Communication is a skill.
      <br />
      Train it.
    </>
  ),
  subhead: 'Practise speaking. Get feedback. Improve.',
  ctaLabel: 'Join the waitlist',
  card: {
    previewLabel: 'Concept',
    lessonEmoji: '🎤',
    lessonTitle: 'Framework: cut the rambling',
    lessonDuration: '4 min',
    progressEncouragement: 'Nice progress! 🎉',
    graphEncouragement: 'Keep going 🚀',
    vocalLabel: 'Vocal exercises',
    vocalDuration: '0:42',
  },
};

export const valueProp = {
  headline: 'Practise with purpose.',
  eyebrow: 'What we’re building',
  items: [
    { label: 'Practice', body: 'Short speaking challenges based on real situations.' },
    { label: 'Feedback', body: 'A clear picture of how you actually come across to others.' },
    { label: 'Progress', body: 'Watch yourself improve, one session at a time.' },
  ],
};

export const features = {
  eyebrow: 'See it in action',
  headline: 'Feedback that actually helps 🎯',
  intro: 'Record yourself answering a prompt — like “Tell me about yourself” — and get feedback on:',
  body: {
    emoji: '🧍',
    label: 'Body language',
    body: 'Nail your posture and gestures with Plecta’s AI analysis.',
  },
  voice: {
    emoji: '🎙️',
    label: 'Voice',
    body: 'Volume, pacing and tone — all tracked.',
    meters: [
      { label: 'Volume', value: 70 },
      { label: 'Pacing', value: 52 },
      { label: 'Tone', value: 82 },
    ],
    encouragement: 'Sounding confident! 🔥',
  },
  transcript: {
    emoji: '📝',
    label: 'Transcripts',
    body: 'We catch the ums so you don’t have to.',
    legend: [
      { color: 'yellow', label: 'Filler words' },
      { color: 'red', label: 'Rambling' },
    ],
    segments: [
      { text: 'So, um, I guess ', type: 'filler' },
      { text: 'growing up I was always kind of curious about how things worked', type: 'plain' },
      {
        text: ' — actually, that reminds me, my brother was the same way, he used to take apart the toaster all the time — ',
        type: 'rambling',
      },
      { text: 'anyway, that curiosity is why I got into engineering.', type: 'plain' },
    ],
  },
  frameworks: {
    emoji: '🧩',
    label: 'Frameworks',
    body: 'Simple structure beats rambling, every time.',
    steps: ['Point', 'Reason', 'Example'],
  },
  starters: {
    emoji: '💬',
    label: 'Conversation starters',
    body: 'Never run out of things to say, especially in awkward moments.',
    examples: ['What’s been the highlight of your week?', 'What are you looking forward to?'],
  },
};

export const whyItMatters = {
  eyebrow: 'Why it matters',
  headline: 'Talent isn’t enough.',
  intro: 'However smart or talented you are, how you communicate is how you’re remembered.',
  paragraph: (
    <>
      <span className="text-ink font-semibold">Martin Luther King Jr.&rsquo;s</span> speeches, not
      his title, turned a protest into a movement that changed history.{' '}
      <span className="text-ink font-semibold">Steve Jobs&rsquo;</span> keynote presentations
      turned product launches into cultural moments. In 1815,{' '}
      <span className="text-ink font-semibold">Napoleon</span> won back an army of thousands,
      sent to arrest him, using nothing but words.
    </>
  ),
  closing: 'If communication could move nations, armies and the whole world, imagine what it could do for you, your career and your relationships.',
};

export const waitlistSection = {
  headline: 'Join the waitlist.',
  subhead: 'Be first to try Plecta when it launches.',
};

export const footer = {
  brand: 'Plecta',
  tagline: 'Communication is a skill. Train it.',
};

export const waitlistForm = {
  motivationOptions: [
    'Career growth',
    'Job interviews',
    'Presentations & pitching',
    'Entrepreneurship',
    'Public speaking',
    'Personal confidence',
    'Academic / school',
    'Just for fun',
    'Other',
  ],
  challengeOptions: [
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
  ],
  frequencyOptions: ['Every day', '3-5 times a week', '1-2 times a week', 'Less often'],
  lengthOptions: ['2-5 minutes', '5-10 minutes', '10-20 minutes', '20+ minutes'],

  requiredLabel: 'Required',
  optionalLabel: 'Optional',

  step1: {
    heading: 'Join the waitlist',
    firstNameLabel: 'First name',
    emailLabel: 'Email',
    firstNameError: 'Enter your first name.',
    emailError: 'Enter a valid email.',
  },
  step2: {
    heading: 'Why do you want to improve?',
    subheading: 'Pick as many as apply.',
  },
  step3: {
    heading: 'What’s your biggest challenge?',
    subheading: 'Pick as many as apply.',
  },
  step4: {
    heading: 'When did you last wish you communicated better?',
    placeholder: 'A sentence or two is plenty.',
  },
  step5: {
    heading: 'Your practice habits',
    frequencyLabel: 'How often?',
    lengthLabel: 'How long per session?',
  },
  step6: {
    heading: 'Anything else?',
    improvementLabel: 'What would you most want to improve?',
    ideasLabel: 'Ideas or features you’d want to see?',
    ideasPlaceholder: 'Optional.',
  },

  backLabel: 'Back',
  continueLabel: 'Continue',
  submitLabel: 'Join the waitlist',
  submittingLabel: 'Joining…',
  genericError: 'Please check the form and try again.',
  networkError: 'Something went wrong. Please check your connection and try again.',

  success: {
    headlineNew: "You're on the list.",
    headlineExisting: "You're already on the list.",
    thanks: (firstName) => <>Thanks, {firstName}. We&rsquo;ll be in touch when Plecta is ready.</>,
    referral: 'Know someone who’d want this too?',
    copyLinkLabel: 'Copy link to share',
  },
};

const CONTACT_EMAIL = 'sahvo.app@gmail.com';

export const COPY = {
  nav: {
    wordmark: 'sahvo',
    wordmarkAria: 'Sahvo — back to top',
    links: [
      { label: 'The gap', href: '#trust-gap' },
      { label: "What we're building", href: '#features' },
      { label: "Who it's for", href: '#segments' },
      { label: 'Roadmap', href: '#roadmap' },
      { label: 'FAQ', href: '#faq' },
    ],
    cta: 'Get early access',
    mobileMenuOpen: 'Open menu',
    mobileMenuClose: 'Close menu',
  },
  hero: {
    h1Line1: 'Know the fare.',
    h1Line2Prefix: 'Know ',
    h1Line2Accent: 'the guide.',
    proofLine: 'IN DEVELOPMENT · JAIPUR PILOT · HINDI + ENGLISH',
    inputPlaceholder: 'you@example.com',
    ctaLabel: 'Get early access',
    bodyCopy:
      'A mobile safety and price-transparency app for travellers in India. For foreign visitors, solo women travellers and families. Building now, starting in Jaipur.',
    microcopy: 'Two emails, ever.',
    successState:
      "You're on the list. We'll write when there's something real to show you.",
    errorState: "That doesn't look like an email address. Mind checking it?",
    social: { linkedin: 'https://www.linkedin.com/company/sahvo/', instagram: 'https://www.instagram.com/sahvo.app' },
  },
  trustGap: {
    overline: 'The problem',
    h1Lead: "India's constraint isn't its attractions. It's ",
    h1Accent: 'trust.',
    bodyParagraph:
      'India received 20.6 million international tourist arrivals in 2024 — a figure that includes visiting non-resident Indians; foreign nationals alone accounted for 9.95 million. The monuments, the food and the transport network are not what hold the experience back. What holds it back is not knowing: whether the fare is fair, whether the guide is licensed, whether anyone will come if something goes wrong.',
    evidenceCards: [
      {
        id: 'crime',
        title: 'Cheating ranks second among crimes reported against tourists.',
        body: 'Tour operators surveyed for a Ministry of Tourism–commissioned study reported theft (25%), cheating (16%) and sexual harassment (16%) as the most common.',
        source: 'IITTM study for the Ministry of Tourism',
        year: '2022',
        isPlaceholder: false,
      },
      {
        id: 'jaipur',
        title: 'Jaipur alone hosted 6.23 lakh foreign visitors in 2024.',
        body: 'Rajasthan received 20.7 lakh foreign tourists, up 21.9% year on year.',
        source: 'Rajasthan Department of Tourism',
        year: '2025',
        isPlaceholder: false,
      },
      {
        id: 'overcharge',
        title: 'Metered fares exist. Almost nobody uses them.',
        body: 'Jaipur autorickshaws are required to use meters. In practice, tourists are quoted a negotiated price with no reference point to check it against.',
        source: null,
        year: null,
        isPlaceholder: false,
      },
      {
        id: 'guides',
        title: 'Rajasthan hosts 20.7 lakh foreign visitors annually; only 1.2k guides licensed.',
        body: 'Rajasthan Department of Tourism data shows gap between registered tourist guides and those operating without official certification.',
        source: 'Rajasthan Department of Tourism',
        year: '2025',
        isPlaceholder: false,
      },
    ],
    closer:
      "None of this is an infrastructure problem. It's an information problem — and information problems are the kind software can actually fix.",
  },
  vision: {
    overline: "Why we're building it",
    h2: "Travel in India shouldn't require knowing a local.",
    body: 'Everyone who travels well here has one — someone who knows the fare, knows which guide is real, knows who to call. Sahvo is an attempt to give that to everyone else.',
    pullQuote:
      'To build a trust layer over Indian travel: people you can verify, prices you can see before you commit, and a way to call for help that doesn\'t fall over when the network does.',
    principles: [
      {
        number: '01',
        title: 'Verified, not rated.',
        body: 'Ratings can be bought. Licences can be checked. Where a public register exists, we check against it — and where one doesn\'t, we say so rather than implying we did.',
      },
      {
        number: '02',
        title: 'Priced before, not disputed after.',
        body: 'A number you saw before you got in the vehicle is worth more than a complaint form afterwards.',
      },
      {
        number: '03',
        title: 'Built for the worst connection, not the best.',
        body: "SOS falls back to SMS when data drops. It's the one feature that can never assume a good signal.",
      },
    ],
  },
  features: {
    overline: 'MVP scope',
    h2: 'Five things, built properly, before anything else.',
    intro:
      "None of this has shipped. This is what we're building first, and what the Jaipur pilot will contain.",
    items: [
      {
        id: 'sos',
        tabLabel: 'SOS',
        headline: 'One press, even without data',
        body: "Hold the SOS button and Sahvo sends your GPS location to the emergency contacts you've chosen — over data if it's there, over SMS if it isn't — and puts local emergency numbers one tap away.",
        caveat:
          'Sahvo is not connected to any police or government emergency system. It sends your location to people you choose and helps you dial.',
        badge: 'Offline-capable via SMS',
      },
      {
        id: 'guides',
        tabLabel: 'Verified guides',
        headline: 'Guides you can check. Prices you can see.',
        body: "Every listed guide will carry a licence number we've verified against the issuing register, with their rate published before you book — not negotiated at the gate.",
        caveat:
          'Verification process is in design. The first cohort will be Jaipur-based.',
        badge: 'Binary verification',
      },
      {
        id: 'alerts',
        tabLabel: 'Safety alerts',
        headline: 'A quiet word before you walk in',
        body: 'Sahvo will flag areas where travellers most often report trouble as you approach them — on your lock screen, without announcing anything to anyone around you.',
        caveat:
          'Alert zones will be built from published advisories and user reports. Coverage begins in Jaipur only.',
        badge: 'Geofenced',
      },
      {
        id: 'pricing',
        tabLabel: 'Price transparency',
        headline: 'Know the number before the argument',
        body: 'An auto fare calculator using published state rates, an MRP scanner for packaged goods, and hotel benchmarking so you know what a room in that area actually goes for.',
        caveat:
          'Fare calculations follow published tariffs; they are a reference, not a regulated quote.',
        badge: 'Published rates',
      },
      {
        id: 'languages',
        tabLabel: 'Languages',
        headline: 'आपकी भाषा में · In your language',
        body: 'The pilot ships in Hindi and English. Eight Indian languages follow in the second phase.',
        caveat:
          'Pilot ships in Hindi and English. Eight Indian languages follow in phase two.',
        badge: 'Hindi + English pilot',
      },
    ],
  },
  segments: {
    overline: 'Three travellers',
    h1Lead: 'Three people. Three ',
    h1Accent: 'different',
    h1Trail: ' fears.',
    cards: [
      {
        segment: 'Foreign tourists',
        headline: 'Stop negotiating. Start travelling.',
        jobToBeDone:
          '"When I don\'t know what anything costs here, help me pay the real price and spot the scam before it happens — so I can stop treating every transaction as a fight."',
        points: ['Price transparency before taxi/tour entry', 'Verified guide register', 'Offline SMS emergency trigger'],
      },
      {
        segment: 'Solo Indian women travellers',
        headline: 'Discreet, not dramatic.',
        jobToBeDone:
          '"When I\'m travelling alone, help me share where I am and reach help quietly — without announcing to everyone around me that I feel unsafe."',
        points: ['Silent lock screen safety alerts', 'Discreet location share with chosen contacts', 'Local emergency hotline shortcuts'],
      },
      {
        segment: 'Indian families',
        headline: 'One trip. No arguments about money.',
        jobToBeDone:
          '"When I\'m responsible for other people\'s day, help me plan in my own language at prices I can trust — so a good trip doesn\'t end in a row over a bill."',
        points: ['Hindi & English localized interface', 'Official state auto-fare reference', 'Packaged MRP price verifier'],
      },
    ],
  },
  market: {
    overline: 'The opportunity',
    h1Lead: 'The market is large. The gap is ',
    h1Accent: 'specific.',
    intro:
      'Every figure below is third-party and dated. Sahvo has no users and no operating history — nothing on this page is a Sahvo metric.',
    toggles: [
      { key: 'inbound', label: 'Inbound' },
      { key: 'domestic', label: 'Domestic' },
      { key: 'pilot', label: 'Pilot city' },
    ],
    footnote:
      '"International tourist arrivals" includes non-resident Indians; "foreign tourist arrivals" does not. We show both because the difference is roughly 2× and the distinction matters to who we serve.',
  },
  roadmap: {
    overline: 'How we get there',
    h2: 'One city, done properly, then the next.',
    startedAt: '2026-08',
    stages: [
      {
        stage: 'Q4 2026',
        title: 'Jaipur pilot',
        status: 'next',
      },
      {
        stage: 'Q1 2027',
        title: 'iOS + 8 languages',
        status: 'planned',
      },
      {
        stage: '2027',
        title: '10 cities',
        status: 'planned',
      },
      {
        stage: '2029',
        title: 'Southeast Asia',
        status: 'planned',
      },
    ],
    currentStage: 0,
    targetsBlock: {
      heading: 'Year 1 goals — not results.',
      body: "These are what we're aiming at. None of them have been achieved, because the product doesn't exist yet.",
      goals: [
        { stat: '50,000', label: 'Monthly active users target', goal: true },
        { stat: '2,000+', label: 'Verified guides onboarded target', goal: true },
        { stat: '< 4 min', label: 'Median SOS acknowledgement time target', goal: true },
        { stat: '60+', label: 'Net Promoter Score target', goal: true },
      ],
    },
  },
  cta: {
    left: {
      title: 'Be there for the Jaipur pilot.',
      body: "We'll open a limited Android pilot in Jaipur first. Early users shape what ships next.",
      inputLabel: 'Email address',
      inputPlaceholder: 'you@example.com',
      button: 'Join the early access list',
      microcopy: "Android and Jaipur to begin with. We'll be honest about the wait.",
    },
    right: {
      title: "We're looking for a technical co-founder.",
      body: "Sahvo needs someone who wants to own the engineering: offline-first mobile, a verification pipeline that can't be gamed, and a safety feature that has to work on a bad network at the worst possible moment. Equity, not salary, at this stage.",
      button: 'Email the founder',
      mailto: `mailto:${CONTACT_EMAIL}?subject=Technical%20co-founder%20—%20Sahvo`,
    },
  },
  footer: {
    descriptor: 'Sahvo — a trust layer for travel in India. In development, Jaipur.',
    contact: {
      general: CONTACT_EMAIL,
      founder: CONTACT_EMAIL,
    },
    cta: {
      right: {
      mailto: `mailto:${CONTACT_EMAIL}?subject=Technical%20co-founder%20—%20Sahvo`,
      },
    },
    columns: [
      {
        title: 'Contact',
        links: [
          { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Terms of Use', href: '/terms' },
        ],
      },
    ],
    requiredDisclosure:
      'Sahvo is a pre-launch product. It is not available for download, and it is not affiliated with or integrated into any police force or government emergency service.',
    copyright: '© 2026 Sahvo. All rights reserved.',
  },
};

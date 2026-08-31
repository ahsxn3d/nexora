import { Portal, College, TimelineStep, ExpenseItem } from '../types';

export const PORTALS_DATA: Portal[] = [
  {
    id: 'common-app',
    stepOrder: 1,
    sequencePhase: 'Step 1: Universal App Hub',
    name: 'CommonApp.org',
    url: 'https://www.commonapp.org',
    category: 'application',
    tagline: 'Universal College Application Portal',
    description: 'Create one centralized account to fill personal info, intermediate marks, extracurricular web dev projects, and personal statement. Search & add up to 20 universities to submit simultaneously in the fall.',
    actionLabel: 'Launch Common App',
    highlight: 'Central hub for up to 20 top US universities with unified essays & activities',
    stepsRequired: [
      'Create First-Year Student Account',
      'Fill Profile, Family & High School Academic History',
      'Document 10 Extracurricular Activities (Lead Web Dev, Freelance, Coding)',
      'Upload 650-word Personal Statement Essay',
      'Search and add target 100% need-met colleges'
    ],
    costNote: 'Free application fee waivers requested directly within portal',
    badge: 'Universal Hub',
    iconName: 'LayoutGrid'
  },
  {
    id: 'berea-portal',
    stepOrder: 2,
    sequencePhase: 'Step 2: Direct Full-Ride Portal',
    name: 'Berea Admissions Portal',
    url: 'https://www.berea.edu/admissions/international',
    category: 'application',
    tagline: 'Direct Institutional Portal (Non-Common App)',
    description: 'The only direct university submission. Berea processes all international applications through its own dedicated portal, guaranteeing 100% tuition, room, board, and campus work for 4 years.',
    actionLabel: 'Open Berea Portal',
    highlight: 'Direct online submission with 100% full-ride funding guarantee',
    stepsRequired: [
      'Create Berea International Applicant account',
      'Submit International Financial Questionnaire',
      'Provide academic transcripts and official test scores',
      'Submit institutional recommendation letters'
    ],
    costNote: '$0 Application Fee (No fee waiver needed)',
    badge: 'Direct Submission',
    iconName: 'GraduationCap'
  },
  {
    id: 'college-board',
    stepOrder: 3,
    sequencePhase: 'Step 3: Official SAT Booking',
    name: 'CollegeBoard.org',
    url: 'https://www.collegeboard.org',
    category: 'testing',
    tagline: 'Official SAT Registration & Bluebook App',
    description: 'Book your Digital SAT testing slot at authorized testing centers in your country (Beaconhouse, Roots, etc.). Download and set up the official Bluebook testing application on your laptop.',
    actionLabel: 'Book SAT Date',
    highlight: 'Register for local test centers and download Bluebook testing engine',
    stepsRequired: [
      'Create student College Board account',
      'Select Digital SAT test date & authorized test center',
      'Download Bluebook app and take full-length practice tests 1-6',
      'Print test admission ticket & verify valid passport ID'
    ],
    costNote: '~$111 International SAT Registration Fee',
    badge: 'Standardized Exam',
    iconName: 'BookOpen'
  },
  {
    id: 'khan-academy',
    stepOrder: 4,
    sequencePhase: 'Step 4: Free SAT Math & Desmos Drill',
    name: 'KhanAcademy.org Digital SAT',
    url: 'https://www.khanacademy.org/digital-sat',
    category: 'prep',
    tagline: 'Free Official Digital SAT Prep & Desmos Mastery',
    description: 'Interactive math modules, Reading & Writing question banks, and specialized Desmos graphing calculator shortcut training. 100% free official partnership with College Board.',
    actionLabel: 'Start SAT Drills',
    highlight: 'Master Desmos calculator speed tricks & 800-level math questions',
    stepsRequired: [
      'Link Khan Academy to College Board account for tailored skill paths',
      'Daily 45-min drill of Advanced Math & Data Analysis modules',
      'Master Desmos regression equations (y1 ~ mx1 + b) and system solving',
      'Complete all Reading & Writing craft and structure question sets'
    ],
    costNote: '100% Free Forever',
    badge: 'Official Prep',
    iconName: 'Calculator'
  },
  {
    id: 'duolingo-test',
    stepOrder: 5,
    sequencePhase: 'Step 5: English Proficiency Test',
    name: 'Duolingo English Test',
    url: 'https://englishtest.duolingo.com',
    category: 'testing',
    tagline: 'Fast 1-Hour Online English Certification',
    description: 'Take the certified English proficiency exam securely from your home desk. Get verified scores within 48 hours and send them free to unlimited US universities.',
    actionLabel: 'Practice DET Exam',
    highlight: 'Convenient home exam with free instant score sends to all colleges',
    stepsRequired: [
      'Ensure isolated quiet room, valid passport, and HD webcam',
      'Complete free official practice test sessions',
      'Score target: 125–135+ for competitive liberal arts colleges',
      'Submit official subscores (Literacy, Comprehension, Conversation, Production)'
    ],
    costNote: '$59 (or 2-test bundle for $98) — vs $220+ TOEFL/IELTS',
    badge: 'English Test',
    iconName: 'Sparkles'
  },
  {
    id: 'css-profile',
    stepOrder: 6,
    sequencePhase: 'Step 6: Financial Aid Verification',
    name: 'CSSProfile.org',
    url: 'https://cssprofile.collegeboard.org',
    category: 'aid',
    tagline: 'Institutional Financial Aid Application System',
    description: 'Submit detailed family income and asset verification to unlock institutional full-ride grants. Establish a $0 Expected Family Contribution (EFC) based on ~$4,500/yr household income.',
    actionLabel: 'File CSS Profile',
    highlight: 'Unlock institutional full-rides and $0 EFC verification',
    stepsRequired: [
      'Sign in with College Board credentials',
      'Document parent income, business profits, tax records & bank accounts',
      'Report household income (~$4,500/yr) accurately in local currency and USD',
      'Upload supporting tax receipts / employer salary certificates to IDOC'
    ],
    costNote: '$25 initial submission + $16 per school (waivers available upon request)',
    badge: 'Full-Ride Key',
    iconName: 'Receipt'
  },
  {
    id: 'fmj-fee',
    stepOrder: 7,
    sequencePhase: 'Step 7: SEVIS I-901 Govt Fee',
    name: 'FMJfee.com',
    url: 'https://www.fmjfee.com',
    category: 'visa',
    tagline: 'Official SEVIS I-901 Government Payment Portal',
    description: 'Pay the mandatory $350 US Department of Homeland Security Student and Exchange Visitor Information System (SEVIS) fee after receiving your Form I-20.',
    actionLabel: 'Pay SEVIS Fee',
    highlight: 'Mandatory $350 I-901 fee required before embassy interview',
    stepsRequired: [
      'Receive official Form I-20 from admitted college with $0 balance',
      'Enter SEVIS ID (N00...) and school code listed on Form I-20',
      'Pay $350 via international credit card or wire',
      'Download & print official Form I-901 payment confirmation receipt'
    ],
    costNote: '$350 US Govt Mandatory Fee',
    badge: 'Visa Filing',
    iconName: 'FileCheck'
  },
  {
    id: 'ceac-portal',
    stepOrder: 8,
    sequencePhase: 'Step 8: DS-160 Embassy Visa Application',
    name: 'CEAC State Portal',
    url: 'https://ceac.state.gov/genniv',
    category: 'visa',
    tagline: 'DS-160 Online Nonimmigrant Visa Application',
    description: 'File the DS-160 online visa application form and schedule your biometric and consular interview at the US Embassy or Consulate in your country.',
    actionLabel: 'File DS-160 Form',
    highlight: 'Consular electronic filing for your F-1 Visa stamping interview',
    stepsRequired: [
      'Start new DS-160 for your home country US Embassy or Consulate',
      'Enter I-20 details, SEVIS number, academic sponsor info',
      'Upload US visa-compliant 2x2 inch digital photograph',
      'Sign electronically and print the DS-160 confirmation barcode page',
      'Pay $185 MRV visa fee and schedule embassy interview slot'
    ],
    costNote: '$185 MRV Visa Processing Fee',
    badge: 'Embassy Portal',
    iconName: 'Globe'
  }
];

export const COLLEGES_DATA: College[] = [
  {
    id: 'berea',
    name: 'Berea College',
    location: 'Berea',
    state: 'Kentucky',
    type: 'Liberal Arts Work College',
    needPolicy: '100% Full Need Met',
    admissionsPolicy: 'Full Tuition Work College',
    applicationMethod: 'Berea Admissions Portal (Direct)',
    rankingNote: 'Ranked #1 for Best Value & Social Mobility in the USA',
    aidHighlights: [
      'Guarantees 100% Tuition Promise Scholarship (valued at ~$44,000/yr)',
      '100% coverage for on-campus dorm housing and dining meal plans for all 4 years',
      'Built-in Student Labor Program providing 10–15 hrs/week guaranteed on-campus work',
      'Dedicated international student arrival fund and winter clothing allowance'
    ],
    keyDeadlines: {
      early: 'October 15 (Early Action)',
      regular: 'January 15 (Final International Deadline)',
      financialAid: 'January 15 (International Financial Questionnaire)'
    },
    specialRequirements: [
      'Apply strictly via Berea Admissions Portal (NOT on Common App)',
      'Demonstrated high financial need is a mandatory prerequisite for admission',
      'Official secondary school transcripts and international financial affidavit'
    ],
    directPortalUrl: 'https://www.berea.edu/admissions/international',
    averageAward: '$52,000 / year (Full cost of attendance covered)',
    campusJobDetail: 'Guaranteed 10-15 hrs/week labor assignment across campus departments ($300-$500/mo cash allowance)'
  },
  {
    id: 'amherst',
    name: 'Amherst College',
    location: 'Amherst',
    state: 'Massachusetts',
    type: 'Top-tier Liberal Arts College',
    needPolicy: '100% Full Need Met',
    admissionsPolicy: 'Need-Blind',
    applicationMethod: 'Common App',
    rankingNote: 'Top 2 National Liberal Arts College in the USA',
    aidHighlights: [
      'Strictly Need-Blind for all international applicants worldwide',
      '100% calculated financial need met with grants and work-study — 0 student loans',
      'Includes health insurance coverage, book stipends, and travel grants',
      'Open curriculum allowing maximum flexibility in Computer Science and Math'
    ],
    keyDeadlines: {
      early: 'November 1 (Early Decision)',
      regular: 'January 6 (Regular Decision)',
      financialAid: 'January 10 (CSS Profile + Tax verification)'
    },
    specialRequirements: [
      'Common Application + Amherst Writing Supplement',
      'CSS Profile with parent income certificates (~$4,500/yr household)',
      'SAT or ACT optional, but 1500+ strongly recommended for STEM'
    ],
    averageAward: '$78,500 / year (No loans)',
    campusJobDetail: 'Campus research & tech support jobs paying $15-$16.50/hr'
  },
  {
    id: 'dartmouth',
    name: 'Dartmouth College',
    location: 'Hanover',
    state: 'New Hampshire',
    type: 'Ivy League Research University',
    needPolicy: '100% Full Need Met',
    admissionsPolicy: 'Need-Blind',
    applicationMethod: 'Common App',
    rankingNote: 'Ivy League Institution with world-class faculty & alumni network',
    aidHighlights: [
      'Need-blind international admissions policy with full-ride funding packages',
      'Covers 100% demonstrated need: tuition, room, board, Dartmouth student health plan',
      'Provides international travel allowances (annual round-trip home flights for aid recipients)',
      'Extensive funding for undergraduate tech research and D-Plan study terms'
    ],
    keyDeadlines: {
      early: 'November 1 (Early Decision)',
      regular: 'January 2 (Regular Decision)',
      financialAid: 'February 1 (CSS Profile + IDOC)'
    },
    specialRequirements: [
      'Common App + Dartmouth Peer Recommendation letter',
      'CSS Profile documentation of household income',
      'Digital SAT score submission (Required test policy)'
    ],
    averageAward: '$82,000 / year (Full grant package)',
    campusJobDetail: 'Library, athletic center, and CS departmental teaching assistants'
  },
  {
    id: 'williams',
    name: 'Williams College',
    location: 'Williamstown',
    state: 'Massachusetts',
    type: 'Top-tier Liberal Arts College',
    needPolicy: '100% Full Need Met',
    admissionsPolicy: 'Need-Aware',
    applicationMethod: 'Common App',
    rankingNote: '#1 National Liberal Arts College in US News for 20+ consecutive years',
    aidHighlights: [
      'Pioneering "All-Grant" financial aid program eliminating all student loans and campus job expectations from financial aid packages',
      'Free textbooks, lab course materials, and art supplies for all aid recipients',
      'Free comprehensive student health insurance and winter clothing emergency grant',
      'Oxford-style tutorial system (2 students with 1 professor)'
    ],
    keyDeadlines: {
      early: 'November 15 (Early Decision)',
      regular: 'January 8 (Regular Decision)',
      financialAid: 'January 15 (CSS Profile / ISFAA)'
    },
    specialRequirements: [
      'Common App + Williams supplemental essay or graded paper',
      'CSS Profile / International Student Financial Aid Application (ISFAA)',
      'Documented household finances'
    ],
    averageAward: '$81,000 / year (All-grant zero loan)',
    campusJobDetail: 'Optional campus roles ($16.00/hr) generating pure discretionary cash'
  },
  {
    id: 'bowdoin',
    name: 'Bowdoin College',
    location: 'Brunswick',
    state: 'Maine',
    type: 'Top-tier Liberal Arts College',
    needPolicy: '100% Full Need Met',
    admissionsPolicy: 'Need-Blind',
    applicationMethod: 'Common App',
    rankingNote: 'Need-Blind International Powerhouse on the Maine Coast',
    aidHighlights: [
      'Need-blind for all applicants regardless of nationality or citizenship',
      '100% demonstrated financial need met without student loans',
      'Digital Access Program: provides every student a free 13-inch MacBook Pro, iPad Mini, and Apple Pencil',
      'Comprehensive summer internship & research fellowships ($5,000+ stipends)'
    ],
    keyDeadlines: {
      early: 'November 15 (Early Decision 1) / Jan 5 (ED 2)',
      regular: 'January 5 (Regular Decision)',
      financialAid: 'January 15 (CSS Profile or Student Aid Form)'
    },
    specialRequirements: [
      'Common App + Bowdoin Video Response or Supplemental question',
      'CSS Profile detailing low household income verification',
      'Official secondary school transcripts'
    ],
    averageAward: '$76,000 / year (No loans)',
    campusJobDetail: 'Campus tech hubs, dining services, and makerspaces ($15.50/hr)'
  },
  {
    id: 'colby',
    name: 'Colby College',
    location: 'Waterville',
    state: 'Maine',
    type: 'Top-tier Liberal Arts College',
    needPolicy: '100% Full Need Met',
    admissionsPolicy: 'Need-Aware',
    applicationMethod: 'Common App',
    rankingNote: 'Zero-Loan Financial Aid Pioneer & Davis AI Institute',
    aidHighlights: [
      'The Colby Commitment: 100% of demonstrated financial need met with zero loans',
      'Davis Institute for Artificial Intelligence — premier undergrad AI research center',
      'Guaranteed access to funding for research, global study, and tech internships',
      '$0 application fee for all students (no fee waiver code required)'
    ],
    keyDeadlines: {
      early: 'November 15 (Early Decision 1) / Jan 2 (ED 2)',
      regular: 'January 2 (Regular Decision)',
      financialAid: 'January 15 (CSS Profile + Colby Aid Supplement)'
    },
    specialRequirements: [
      'Common App (Completely free submission)',
      'CSS Profile and parent income tax receipts',
      'Standardized test optional (SAT score of 1450+ boosts chances significantly)'
    ],
    averageAward: '$75,500 / year (No loan packaging)',
    campusJobDetail: 'Athletic facilities, AI lab assistants, and residential life'
  }
];

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    stepNumber: 1,
    title: 'SAT Training & Freelance Runway',
    subtitle: 'Build your test mastery & $2,300 upfront funding reserves',
    durationOrTiming: 'Months 1 – 4 (Spring & Summer)',
    focusMetric: 'Fund Goal: ~$2,300 | SAT Target: 1450+',
    summary: 'Drill Khan Academy SAT math modules daily and master Desmos calculator shortcuts. Work on freelance web development projects to build your ~$2,300 upfront testing, visa, and flight fund.',
    detailedGuide: [
      {
        heading: '1. SAT Math & Desmos Calculator Mastery',
        points: [
          'Drill daily on Khan Academy Digital SAT Math: Heart of Algebra, Advanced Math, Problem Solving, and Geometry.',
          'Master Desmos shortcuts: Graphing linear and quadratic systems, finding intersection roots instantly, using table sliders, and linear regression (y1 ~ mx1 + b).',
          'Aim to solve 80% of Module 2 math questions directly via Desmos speed hacks in under 45 seconds each.'
        ]
      },
      {
        heading: '2. Freelance Web Development Runway Strategy',
        points: [
          'Take on freelance frontend projects (React, Tailwind, landing pages, client dashboards) on Upwork, Fiverr, or direct outreach.',
          'Save your revenue systematically to accumulate the required ~$2,300 upfront budget for tests, passport, SEVIS, DS-160, and one-way US airfare.',
          'Keep clean records and project repositories on GitHub — this also forms your top extracurricular achievements for Common App!'
        ]
      }
    ],
    keyChecklist: [
      'Complete Khan Academy Digital SAT Math diagnostic',
      'Memorize top 10 Desmos calculator speed formulas',
      'Take 3 full-length Bluebook practice exams (Aim 1400+ on practice)',
      'Launch freelance web development portfolio & client work',
      'Deposit initial savings into upfront test & visa fund (~$2,300 target)'
    ],
    proTips: [
      'Do not pay for expensive test prep academies — official Khan Academy + Bluebook suite is the gold standard.',
      'Treat client coding projects as dual-purpose: income generator today, Common App stellar activity tomorrow.'
    ],
    tags: ['Khan Academy', 'Desmos Mastery', 'Freelance Web Dev', '$2,300 Fund']
  },
  {
    stepNumber: 2,
    title: 'Official Testing & Common App Setup',
    subtitle: 'Lock in 1450+ SAT score, Duolingo cert & build central profile',
    durationOrTiming: 'Months 4 – 7 (Summer & Early Fall)',
    focusMetric: 'SAT: 1450+ | DET: 125+ | 20 Colleges Added',
    summary: 'Take the Digital SAT at an authorized center in Lahore (aiming for 1450+) and complete the online Duolingo English Test. Create your account on CommonApp.org, add your target colleges, and document your web development work in the Activities section.',
    detailedGuide: [
      {
        heading: '1. Official Exam Stamping in Lahore',
        points: [
          'Register early on CollegeBoard.org for test centers in Lahore (e.g., Beaconhouse Defence/Johar Town, Roots IVY, Scarsdale).',
          'Bring fully charged laptop with Bluebook installed, power cable, approved calculator, and original valid Passport.',
          'Take the Duolingo English Test (DET) from home: ensure high-speed internet, crisp camera lighting, and no background noise.'
        ]
      },
      {
        heading: '2. Common App Central Architecture',
        points: [
          'Create one central account on CommonApp.org — enter biographical info, schooling, and intermediate marks.',
          'Add your target 6-10 full-need colleges (Amherst, Dartmouth, Williams, Bowdoin, Colby, etc.).',
          'Document web development work in the 10 Activities slots: emphasize leadership, users served, technologies used (React, TypeScript), and revenue earned.',
          'Draft and polish the central 650-word Personal Essay detailing your passion, grit, and intellectual curiosity.'
        ]
      }
    ],
    keyChecklist: [
      'Register for SAT at Lahore authorized center',
      'Take official Digital SAT exam (Target 1450+ score)',
      'Complete Duolingo English Test from home (Target 125+)',
      'Create CommonApp.org account & fill Profile / Academic records',
      'Draft 10 Activities descriptions (max 150 chars each highlighting web projects)',
      'Write & polish 650-word Common App personal statement',
      'Request teacher recommendations from 2 core subject teachers & school counselor'
    ],
    proTips: [
      'In the Activities section, use active verbs and quantified metrics (e.g. "Engineered full-stack SaaS apps for 15+ international clients, earning $2,300+").',
      'Common App essays should be deeply personal and reflective, not a recitation of your CV.'
    ],
    tags: ['Lahore SAT Center', 'Duolingo Test', 'CommonApp.org', 'Activities Section']
  },
  {
    stepNumber: 3,
    title: 'Financial Aid Filing & Submissions',
    subtitle: 'File CSS Profile / ISFAA for $0 EFC and submit applications',
    durationOrTiming: 'Months 7 – 9 (October – January)',
    focusMetric: 'Household Income: ~$4,500/yr | EFC: $0 | Submit Early/RD',
    summary: 'Submit the CSS Profile (or institutional ISFAA forms) with proof of your household\'s annual income (~$4,500/year) to establish a $0 expected family contribution. Submit applications by November 1 (Early Action) or January 1–15 (Regular Decision).',
    detailedGuide: [
      {
        heading: '1. Financial Aid Verification & $0 EFC',
        points: [
          'Submit the CSS Profile on CSSProfile.org and institutional ISFAA (International Student Financial Aid Application) forms.',
          'Accurately declare your household annual income (~$4,500/year or approx. PKR 1.2M - 1.3M/year).',
          'Prepare verified supporting documents: parent salary certificates, bank statements, tax returns, and utility bills.',
          'Submit financial verification via College Board IDOC portal or college-specific applicant upload portals.'
        ]
      },
      {
        heading: '2. Application Submission Deadlines',
        points: [
          'Early Action (EA) / Early Decision (ED): Submit by November 1 (or Oct 15 for Berea EA).',
          'Regular Decision (RD): Submit remaining colleges by January 1 – 15.',
          'Submit Berea College directly through the Berea Admissions Portal with all international affidavits.',
          'Track applicant portals for each university to ensure all transcripts, letters, and aid forms show "Received".'
        ]
      }
    ],
    keyChecklist: [
      'Complete CSS Profile with accurate household financial data (~$4,500/yr)',
      'Gather parent salary slips, bank statements, and translated tax affidavits',
      'Upload tax & income verification documents to IDOC system',
      'Submit Early Decision/Early Action applications by November 1',
      'Submit Berea College direct portal application & financial questionnaire',
      'Submit Regular Decision college applications by January 1–15',
      'Confirm all green checkmarks on applicant status portals'
    ],
    proTips: [
      'Never inflate or distort income figures. US financial aid offices cross-verify currency exchange rates precisely.',
      'Request CSS Profile fee waiver codes from admissions offices if family funds are tight.'
    ],
    tags: ['CSS Profile', '$0 EFC', 'IDOC Verification', 'Berea Direct Submission', 'Nov 1 / Jan 15']
  },
  {
    stepNumber: 4,
    title: 'Visa & Departure',
    subtitle: 'Receive I-20, pay SEVIS I-901, file DS-160 & ace US Embassy interview',
    durationOrTiming: 'Months 10 – 11 (March – June)',
    focusMetric: 'Form I-20 with $0 Balance | $350 SEVIS | F-1 Visa Stamp',
    summary: 'Upon acceptance, receive your official Form I-20 reflecting your $0 tuition balance. Pay the $350 SEVIS fee at FMJfee.com, submit your DS-160 at CEAC, attend your interview at the US Embassy in Islamabad, and receive your F-1 visa.',
    detailedGuide: [
      {
        heading: '1. Form I-20 Issuance & Government Filings',
        points: [
          'Accept college offer and receive official Form I-20 with institutional scholarship listed covering 100% of attendance cost.',
          'Visit FMJfee.com, enter your SEVIS ID (starts with N) and school code, pay the mandatory $350 SEVIS I-901 fee, and print receipt.',
          'File DS-160 online at CEAC State Portal (select US Embassy Islamabad or Karachi Consulate). Pay the $185 MRV visa fee.'
        ]
      },
      {
        heading: '2. Embassy Interview in Islamabad',
        points: [
          'Schedule your F-1 visa appointment at the US Embassy in Islamabad.',
          'Bring folder with: Passport, DS-160 confirmation barcode, SEVIS I-901 receipt, Form I-20, official acceptance letter, full scholarship award breakdown, academic transcripts, and SAT/DET score reports.',
          'Interview key: Clearly explain your chosen major, state why this college is ideal, emphasize your 100% full-ride funding, and state your intent to return home after graduation.'
        ]
      }
    ],
    keyChecklist: [
      'Receive official Form I-20 with $0 student liability / full scholarship',
      'Pay $350 SEVIS I-901 fee at FMJfee.com & print receipt',
      'Fill DS-160 form on CEAC portal and print confirmation page',
      'Pay $185 MRV visa fee at designated bank / online system',
      'Book visa interview slot at US Embassy Islamabad',
      'Organize visa document folder (I-20, Award letter, transcripts, test scores, passport)',
      'Ace F-1 visa consular interview and collect passport with stamped visa',
      'Book one-way flight ticket to US destination airport'
    ],
    proTips: [
      'When consular officers ask "Who is paying for your studies?", state confidently: "I received a 100% full-ride scholarship from the college covering all tuition, room, and board."',
      'Keep your answers concise, direct, and under 30 seconds per question.'
    ],
    tags: ['Form I-20', 'SEVIS $350', 'DS-160 CEAC', 'US Embassy Islamabad', 'F-1 Visa Stamp']
  },
  {
    stepNumber: 5,
    title: 'Campus Arrival & Routine',
    subtitle: 'Settle in dorm, bank account, on-campus job & healthy training lifestyle',
    durationOrTiming: 'Month 12 & Onward (August / Fall Semester)',
    focusMetric: '15–20 hr/wk Job ($750–$900/mo) | Bank Account | Wrestling/Gym',
    summary: 'Pack your core PC parts (GPU, SSD, RAM) in your carry-on luggage and fly to campus. Move into your dorm, open a student bank account with Chase or Bank of America, start your 15–20 hr/week campus job ($750–$900/month pocket cash), and train at the campus wrestling and martial arts facilities.',
    detailedGuide: [
      {
        heading: '1. Packing & Arrival Protocol',
        points: [
          'Pack core desktop PC components (GPU, SSD, RAM, CPU) securely in anti-static bags in your carry-on luggage; buy case and monitor on campus/Amazon.',
          'Land in the US, pass CBP immigration with Passport, Form I-20, and College Acceptance Letter.',
          'Move into your assigned residence hall / dorm room and check in with the International Student Office (DSO).'
        ]
      },
      {
        heading: '2. Banking, Work-Study & Campus Life',
        points: [
          'Visit local branch of Chase or Bank of America with Passport and I-20 to open a student checking account and obtain debit card.',
          'Apply for campus jobs (IT helpdesk, web developer, peer tutor, dining, athletic center) for 15–20 hours/week.',
          'Earn $750–$900/month in tax-free pocket cash to cover personal expenses, savings, and gadgets.',
          'Integrate physical fitness into your routine: join the college wrestling team, martial arts club, or recreation gym to stay disciplined and energetic.'
        ]
      }
    ],
    keyChecklist: [
      'Pack PC components (GPU, NVMe SSD, RAM) safely in carry-on bag',
      'Check in at International Student Orientation & validate SEVIS with DSO',
      'Move into dorm room and inspect living amenities',
      'Open student bank account (Chase or Bank of America) with debit card',
      'Obtain Social Security Number (SSN) support letter for on-campus employment',
      'Start 15–20 hr/week on-campus job ($750–$900 monthly cash flow)',
      'Register for classes and sign up for campus wrestling/martial arts club'
    ],
    proTips: [
      'Do not pack desktop monitors or bulky power supplies — electronics like screens are very cheap to buy locally or second-hand from seniors.',
      'Your campus job not only provides pocket cash but qualifies you for a US Social Security Number (SSN) to build US credit history.'
    ],
    tags: ['Carry-on PC Parts', 'Chase / BofA', '15-20 hr/wk Job', '$750-900/mo', 'Campus Athletics']
  }
];

export const UPFRONT_EXPENSES: ExpenseItem[] = [
  {
    id: 'sat-fee',
    title: 'Digital SAT Exam Registration',
    category: 'Testing',
    estimatedCost: 111,
    description: 'Official College Board international exam seat in Lahore center',
    isCompleted: false
  },
  {
    id: 'det-fee',
    title: 'Duolingo English Test (DET)',
    category: 'Testing',
    estimatedCost: 59,
    description: '1-hour online certified English proficiency test with free score sends',
    isCompleted: false
  },
  {
    id: 'css-fee',
    title: 'CSS Profile Submissions & IDOC',
    category: 'Testing',
    estimatedCost: 65,
    description: 'Initial submission fee plus school reports (fee waivers requested when possible)',
    isCompleted: false
  },
  {
    id: 'passport-docs',
    title: 'Passport & Certified Document Transcripts',
    category: 'Logistics',
    estimatedCost: 80,
    description: 'Urgent passport issuance, notarized affidavits, and school transcripts',
    isCompleted: false
  },
  {
    id: 'sevis-fee',
    title: 'SEVIS I-901 Mandatory US Govt Fee',
    category: 'Govt Fees',
    estimatedCost: 350,
    description: 'Mandatory Department of Homeland Security student tracking registration fee',
    isCompleted: false
  },
  {
    id: 'visa-mrv-fee',
    title: 'DS-160 MRV Visa Processing Fee',
    category: 'Govt Fees',
    estimatedCost: 185,
    description: 'US Embassy Islamabad consular visa appointment booking fee',
    isCompleted: false
  },
  {
    id: 'flight-ticket',
    title: 'One-Way Transatlantic Flight Ticket',
    category: 'Logistics',
    estimatedCost: 1350,
    description: 'Lahore/Islamabad to US campus airport (Qatar/Emirates/Turkish Airlines)',
    isCompleted: false
  },
  {
    id: 'emergency-buffer',
    title: 'Initial Transit & Emergency Cash Buffer',
    category: 'Logistics',
    estimatedCost: 100,
    description: 'Initial USD cash for airport transit, SIM card, and first-day incidentals',
    isCompleted: false
  }
];

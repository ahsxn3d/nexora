export interface Portal {
  id: string;
  stepOrder: number;
  sequencePhase: string;
  name: string;
  url: string;
  category: 'application' | 'testing' | 'prep' | 'aid' | 'visa';
  tagline: string;
  description: string;
  actionLabel: string;
  highlight: string;
  stepsRequired?: string[];
  costNote?: string;
  badge?: string;
  iconName: string;
}

export interface College {
  id: string;
  name: string;
  location: string;
  state: string;
  type: string;
  needPolicy: string; // "100% Full Need Met"
  admissionsPolicy: 'Need-Blind' | 'Need-Aware' | 'Full Tuition Work College';
  applicationMethod: 'Common App' | 'Berea Admissions Portal (Direct)';
  rankingNote?: string;
  aidHighlights: string[];
  keyDeadlines: {
    early?: string;
    regular: string;
    financialAid: string;
  };
  specialRequirements: string[];
  directPortalUrl?: string;
  averageAward?: string;
  campusJobDetail?: string;
}

export interface TimelineStepItem {
  id: string;
  title: string;
  category: string;
  completed: boolean;
}

export interface TimelineStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  durationOrTiming: string;
  focusMetric: string;
  summary: string;
  detailedGuide: {
    heading: string;
    points: string[];
  }[];
  keyChecklist: string[];
  proTips: string[];
  tags: string[];
}

export interface ExpenseItem {
  id: string;
  title: string;
  category: 'Testing' | 'Govt Fees' | 'Logistics';
  estimatedCost: number;
  description: string;
  isCompleted: boolean;
}

export interface CountryPlanData {
  id: string;
  countryName: string;
  flagEmoji: string;
  currencyCode: string;
  currencySymbol: string;
  usdExchangeRate: number;
  curriculumType: string;
  curriculumAdvice: string;
  embassyLocations: string[];
  advisingCenter: string;
  bankRegulations: string;
  feeWaiverStrategies: string[];
  visaInterviewTips: string[];
  testCostEquivalents: {
    satCostFormatted: string;
    detCostFormatted: string;
    sevisCostFormatted: string;
    mrvCostFormatted: string;
  };
  customSummary: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  countryUpdate?: CountryPlanData;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  targetCountry?: string;
  isPersonalUser?: boolean;
}



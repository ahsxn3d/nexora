import { CountryPlanData } from '../types';

export const DEFAULT_COUNTRIES: CountryPlanData[] = [
  {
    id: 'pakistan',
    countryName: 'Pakistan',
    flagEmoji: '🇵🇰',
    currencyCode: 'PKR',
    currencySymbol: 'Rs',
    usdExchangeRate: 278.5,
    curriculumType: 'Matric / F.Sc / A-Levels',
    curriculumAdvice: 'Get IBCC Equivalence for O/A-Levels or attested Matric/F.Sc marksheets. Convert grades with official school profile explaining Pakistan grading scale (80%+ is A1).',
    embassyLocations: ['US Embassy Islamabad', 'US Consulate General Karachi'],
    advisingCenter: 'USEFP (Islamabad, Lahore, Karachi)',
    bankRegulations: 'State Bank of Pakistan Form A foreign exchange clearance with 0.6% FBR non-filer withholding tax exemption for verified student admission letters.',
    feeWaiverStrategies: [
      'Email admissions officers requesting CSS Profile code citing SBP foreign currency restrictions',
      'Request Common App fee waiver via high school counselor stating household income < $6,000/yr',
      'Use Duolingo English Test waiver codes from EducationUSA / USEFP cohort programs'
    ],
    visaInterviewTips: [
      'Stress non-immigrant intent: highlight returning to Pakistan to join tech startups or family businesses in Lahore/Karachi',
      'Present Berea / full-ride I-20 clearly showing $0 family sponsorship requirement',
      'Have parents tax returns (FBR active tax filer certificate) and property valuation in PKR and USD'
    ],
    testCostEquivalents: {
      satCostFormatted: 'Rs 30,900 (~$111)',
      detCostFormatted: 'Rs 16,400 (~$59)',
      sevisCostFormatted: 'Rs 97,500 (~$350)',
      mrvCostFormatted: 'Rs 51,500 (~$185)'
    },
    customSummary: 'Roadmap tailored for Pakistani students in Lahore, Karachi, Islamabad & nationwide navigating IBCC equivalence, USEFP centers, and SBP remittance pathways.'
  },
  {
    id: 'india',
    countryName: 'India',
    flagEmoji: '🇮🇳',
    currencyCode: 'INR',
    currencySymbol: '₹',
    usdExchangeRate: 86.5,
    curriculumType: 'CBSE / ISC / State Boards / IB',
    curriculumAdvice: 'Submit 9th, 10th, 11th marksheets and 12th predicted grades. Top US liberal arts colleges value CBSE/ISC rigorous math and physics syllabus over standard US high school courses.',
    embassyLocations: ['US Embassy New Delhi', 'US Consulate Mumbai', 'US Consulate Hyderabad', 'US Consulate Chennai', 'US Consulate Kolkata'],
    advisingCenter: 'USIEF (New Delhi, Mumbai, Chennai, Kolkata, Hyderabad)',
    bankRegulations: 'RBI Liberalised Remittance Scheme (LRS) with 5% TCS (Tax Collected at Source) on educational remittances, refundable during annual ITR filing.',
    feeWaiverStrategies: [
      'Apply for College Board India Scholars Program (100% or 90% SAT fee discount if family income < ₹8 Lakhs)',
      'Request ISFAA (International Student Financial Aid Application) PDF form instead of paid CSS Profile',
      'Leverage USIEF EducationUSA Opportunity Funds for high-achieving low-income Indian scholars'
    ],
    visaInterviewTips: [
      'Book visa slots across New Delhi, Hyderabad, or Mumbai centers early due to high summer demand',
      'Explain how your CS/STEM degree ties into Indian tech corridors (Bengaluru, Hyderabad, Pune, Gurugram)',
      'Bring CA-certified Net Worth statement and Form 16 / ITR V acknowledgement'
    ],
    testCostEquivalents: {
      satCostFormatted: '₹9,600 (~$111)',
      detCostFormatted: '₹5,100 (~$59)',
      sevisCostFormatted: '₹30,270 (~$350)',
      mrvCostFormatted: '₹16,000 (~$185)'
    },
    customSummary: 'Roadmap customized for Indian applicants navigating CBSE/State Boards, USIEF advisors, College Board India discounts, and consular interviews across Indian metros.'
  },
  {
    id: 'bangladesh',
    countryName: 'Bangladesh',
    flagEmoji: '🇧🇩',
    currencyCode: 'BDT',
    currencySymbol: '৳',
    usdExchangeRate: 120.0,
    curriculumType: 'HSC / SSC / Cambridge English Medium',
    curriculumAdvice: 'Attest SSC and HSC transcripts from the Board of Intermediate and Secondary Education. English Medium students should request British Council verified GCE certificates.',
    embassyLocations: ['US Embassy Dhaka (Madani Avenue, Baridhara)'],
    advisingCenter: 'EMK Center & EducationUSA Bangladesh (Dhaka & Chittagong)',
    bankRegulations: 'Bangladesh Bank Student File opening at authorized commercial banks (e.g., Sonali Bank, BRAC Bank, City Bank) with University Offer Letter & I-20.',
    feeWaiverStrategies: [
      'Reach out to admissions counselors highlighting Bangladesh foreign transaction limits for international cards',
      'Join EducationUSA Dhaka Academy for free SAT prep resources and exam fee assistance',
      'Request institutional CSS Profile fee waiver codes in early September'
    ],
    visaInterviewTips: [
      'Prepare concise 30-second responses at US Embassy Dhaka on why your specific major is crucial for Bangladesh development',
      'Bring original HSC certificate, I-20, and Student File confirmation from your bank',
      'Demonstrate strong family and property ties in Dhaka/Chittagong/Sylhet'
    ],
    testCostEquivalents: {
      satCostFormatted: '৳13,320 (~$111)',
      detCostFormatted: '৳7,080 (~$59)',
      sevisCostFormatted: '৳42,000 (~$350)',
      mrvCostFormatted: '৳22,200 (~$185)'
    },
    customSummary: 'Roadmap tailored for Bangladeshi students navigating HSC/SSC boards, EducationUSA EMK Center in Dhaka, and Bangladesh Bank foreign student files.'
  },
  {
    id: 'nepal',
    countryName: 'Nepal',
    flagEmoji: '🇳🇵',
    currencyCode: 'NPR',
    currencySymbol: 'रू',
    usdExchangeRate: 138.5,
    curriculumType: '+2 NEB (National Examination Board) / A-Levels',
    curriculumAdvice: 'Provide official NEB Class 11 and Class 12 transcripts with grading breakdown. Grade XII GPA > 3.6 is highly competitive for US institutional need-met awards.',
    embassyLocations: ['US Embassy Kathmandu (Maharajgunj)'],
    advisingCenter: 'USEF Nepal (Gyaneshwor, Kathmandu)',
    bankRegulations: 'Ministry of Education No Objection Certificate (NOC) required to exchange USD and open education forex file through Nepal Rastra Bank guidelines.',
    feeWaiverStrategies: [
      'Engage with USEF Nepal Opportunity Funds for low-income top scholars',
      'Email liberal arts colleges directly for CSS Profile Fee Waivers citing Nepal banking constraints',
      'Utilize Duolingo English Test which is widely accepted and cost-effective'
    ],
    visaInterviewTips: [
      'Clearly present your NOC and full tuition scholarship from US university',
      'Highlight career goals in Nepal hydroelectric, tourism, tech, or public health sectors',
      'Practice confident eye contact and concise English delivery at Maharajgunj Embassy'
    ],
    testCostEquivalents: {
      satCostFormatted: 'रू 15,370 (~$111)',
      detCostFormatted: 'रू 8,170 (~$59)',
      sevisCostFormatted: 'रू 48,470 (~$350)',
      mrvCostFormatted: 'रू 25,620 (~$185)'
    },
    customSummary: 'Roadmap customized for Nepali students in Kathmandu, Pokhara, and across Nepal with +2 NEB curriculum, NOC certification, and USEF Nepal guidance.'
  },
  {
    id: 'vietnam',
    countryName: 'Vietnam',
    flagEmoji: '🇻🇳',
    currencyCode: 'VND',
    currencySymbol: '₫',
    usdExchangeRate: 25400,
    curriculumType: 'Bằng Tốt Nghiệp THPT (High School Diploma) / Specialized High Schools',
    curriculumAdvice: 'High School GPA from Vietnam (Học bạ) is calculated on a 10.0 scale. An 8.5–9.0+ average in specialized schools (Chuyên) demonstrates world-class STEM rigor.',
    embassyLocations: ['US Embassy Hanoi', 'US Consulate General Ho Chi Minh City'],
    advisingCenter: 'EducationUSA Vietnam (Hanoi & HCMC)',
    bankRegulations: 'Commercial bank foreign transfer via State Bank of Vietnam regulations with university admission letter and Form I-20.',
    feeWaiverStrategies: [
      'Connect with Vietnamese Student Associations (VSA) in top US colleges for fee waiver coupon referral guides',
      'Request ISFAA financial aid forms in lieu of CSS Profile',
      'Apply to need-blind and top liberal arts colleges with generous international endowments'
    ],
    visaInterviewTips: [
      'Highlight Vietnam rapidly growing tech & green energy economy as your post-graduation return plan',
      'Present red book property deeds (Sổ đỏ) and certified family financial records',
      'Practice interview at American Center in Hanoi or HCMC'
    ],
    testCostEquivalents: {
      satCostFormatted: '₫2,820,000 (~$111)',
      detCostFormatted: '₫1,500,000 (~$59)',
      sevisCostFormatted: '₫8,890,000 (~$350)',
      mrvCostFormatted: '₫4,700,000 (~$185)'
    },
    customSummary: 'Roadmap tailored for Vietnamese students applying with THPT transcripts, EducationUSA Vietnam hubs in Hanoi & HCMC, and specialized STEM portfolios.'
  },
  {
    id: 'nigeria',
    countryName: 'Nigeria',
    flagEmoji: '🇳🇬',
    currencyCode: 'NGN',
    currencySymbol: '₦',
    usdExchangeRate: 1540,
    curriculumType: 'WAEC / WASSCE / NECO Senior School Certificate',
    curriculumAdvice: 'Provide official WAEC scratch card pin or electronic verification portal details so US admissions officers can instantly verify your A1/B2 grades.',
    embassyLocations: ['US Embassy Abuja', 'US Consulate General Lagos (Victoria Island)'],
    advisingCenter: 'EducationUSA Nigeria (Lagos & Abuja)',
    bankRegulations: 'Central Bank of Nigeria (CBN) Form A for foreign exchange education allocation, or approved diaspora banking channels.',
    feeWaiverStrategies: [
      'Join EducationUSA Opportunity Funds Program (OFP) for full financing of SAT, DET, and application fees',
      'Request CSS waiver codes early citing parallel market FX fluctuations and card limits',
      'Target liberal arts colleges (Berea, Williams, Amherst, Skidmore) with dedicated African scholarship funds'
    ],
    visaInterviewTips: [
      'Prepare for rapid 60-second interview at Lagos Consulate: deliver sharp, confident answers without hesitating',
      'Stress strong economic and family ties in Lagos, Abuja, or Port Harcourt',
      'Have your full scholarship letter visibly highlighted on top of your folder'
    ],
    testCostEquivalents: {
      satCostFormatted: '₦170,900 (~$111)',
      detCostFormatted: '₦90,800 (~$59)',
      sevisCostFormatted: '₦539,000 (~$350)',
      mrvCostFormatted: '₦284,900 (~$185)'
    },
    customSummary: 'Roadmap customized for Nigerian scholars with WAEC/NECO credentials, EducationUSA Opportunity Funds in Lagos/Abuja, and full-ride institutional targets.'
  },
  {
    id: 'kenya',
    countryName: 'Kenya',
    flagEmoji: '🇰🇪',
    currencyCode: 'KES',
    currencySymbol: 'KSh',
    usdExchangeRate: 129.5,
    curriculumType: 'KCSE (Kenya Certificate of Primary & Secondary Education) / IGCSE',
    curriculumAdvice: 'KNEC KCSE results with Mean Grade A or A- are highly competitive. Attach KNEC official result slip and school recommendation letters.',
    embassyLocations: ['US Embassy Nairobi (Gigiri)'],
    advisingCenter: 'EducationUSA Kenya (Nairobi & Eldoret)',
    bankRegulations: 'Central Bank of Kenya foreign exchange student transfers via MPESA Global, Equity Bank, or KCB Bank with student invoice.',
    feeWaiverStrategies: [
      'Participate in EducationUSA Scholars Program (ESP) Kenya for subsidized test fees',
      'Request CSS Profile fee waivers through direct outreach to international financial aid deans',
      'Target colleges with Zawadi Africa or Mastercard Foundation partnerships'
    ],
    visaInterviewTips: [
      'Emphasize Kenya Vision 2030 and how your US education will contribute to East African regional development',
      'Be articulate about your specific research goals and return commitment',
      'Bring original KCSE certificate and official I-20 with full scholarship balance'
    ],
    testCostEquivalents: {
      satCostFormatted: 'KSh 14,370 (~$111)',
      detCostFormatted: 'KSh 7,640 (~$59)',
      sevisCostFormatted: 'KSh 45,320 (~$350)',
      mrvCostFormatted: 'KSh 23,950 (~$185)'
    },
    customSummary: 'Roadmap tailored for Kenyan scholars applying with KCSE credentials, EducationUSA Kenya in Nairobi, and East African institutional aid programs.'
  },
  {
    id: 'brazil',
    countryName: 'Brazil',
    flagEmoji: '🇧🇷',
    currencyCode: 'BRL',
    currencySymbol: 'R$',
    usdExchangeRate: 5.80,
    curriculumType: 'Ensino Médio / ENEM (Exame Nacional do Ensino Médio)',
    curriculumAdvice: 'Submit certified sworn translations (Tradução Juramentada) of your Histórico Escolar do Ensino Médio. Strong grades (9.0–10.0) highlight academic distinction.',
    embassyLocations: ['US Embassy Brasília', 'US Consulate São Paulo', 'US Consulate Rio de Janeiro', 'US Consulate Recife', 'US Consulate Porto Alegre'],
    advisingCenter: 'EducationUSA Brasil (Over 40 centers nationwide)',
    bankRegulations: 'Banco Central do Brasil foreign exchange education remittances via authorized banks or digital FX platforms with IOF tax exemptions.',
    feeWaiverStrategies: [
      'Apply for Oportunidades Acadêmicas program via EducationUSA Brasil',
      'Request ISFAA financial forms from US liberal arts universities',
      'Connect with Fundação Estudar or Brazilian student mentoring networks for fee waiver codes'
    ],
    visaInterviewTips: [
      'Demonstrate deep family and career roots in Brazil tech and environmental sectors',
      'Present full tuition award and official I-20',
      'Highlight plans to bring US computational/engineering expertise back to Brazilian industries'
    ],
    testCostEquivalents: {
      satCostFormatted: 'R$ 643 (~$111)',
      detCostFormatted: 'R$ 342 (~$59)',
      sevisCostFormatted: 'R$ 2,030 (~$350)',
      mrvCostFormatted: 'R$ 1,073 (~$185)'
    },
    customSummary: 'Roadmap tailored for Brazilian students navigating Histórico Escolar translations, EducationUSA Brasil network, and full need-met US liberal arts applications.'
  }
];

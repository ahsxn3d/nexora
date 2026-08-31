import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: NextRequest) {
  try {
    const { countryName, userEmail, userApiKey } = await req.json();
    if (!countryName) {
      return NextResponse.json({ error: 'Country name is required' }, { status: 400 });
    }

    const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim() || process.env.OWNER_EMAIL?.toLowerCase().trim();
    const currentUserEmail = userEmail?.toLowerCase().trim();
    const isOwner = !adminEmail || (currentUserEmail && currentUserEmail === adminEmail);

    let activeApiKey = '';
    if (isOwner) {
      activeApiKey = process.env.GEMINI_API_KEY || '';
    } else {
      activeApiKey = userApiKey?.trim() || '';
    }

    if (!activeApiKey) {
      // Return structured default schema if no API key is provided
      return NextResponse.json({
        success: true,
        requiresApiKey: true,
        planData: {
          countryName: countryName,
          flagEmoji: '🌐',
          currencyCode: 'USD',
          currencySymbol: '$',
          usdExchangeRate: 1.0,
          curriculumType: 'National / International Secondary Certificate',
          curriculumAdvice: `Request certified English translation transcripts and counselor school profile for ${countryName}.`,
          embassyLocations: [`US Embassy in ${countryName}`],
          advisingCenter: `EducationUSA Advising Center in ${countryName}`,
          bankRegulations: 'Standard international wire remittance & bank solvency certificate',
          feeWaiverStrategies: [
            'Request Common App fee waiver through your school counselor',
            'Request CSS Profile international institutional code waiver',
            'Inquire with Berea College regarding application and deposit exemptions',
          ],
          visaInterviewTips: [
            'Clearly demonstrate non-immigrant intent with permanent ties to home country',
            'Explain $0 parental EFC with your official university full-ride award letter',
            'Present original passport, SEVIS I-901 payment confirmation, and Form I-20',
          ],
          testCostEquivalents: {
            satCostFormatted: '$111 USD',
            detCostFormatted: '$65 USD',
            sevisCostFormatted: '$350 USD',
            mrvCostFormatted: '$185 USD',
          },
          customSummary: `Personalized 100% full-need US roadmap adapted for applicants residing in ${countryName}. (Provide your Gemini API key in settings for deep real-time AI adaptations)`,
        },
      });
    }

    const ai = new GoogleGenAI({
      apiKey: activeApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'nexora-admissions',
        },
      },
    });

    const prompt = `Adapt the US College 100% Need-Met Admissions & F-1 Visa Roadmap specifically for a student residing in: "${countryName}".
Return a valid JSON object matching this exact schema:
{
  "countryName": string,
  "flagEmoji": string,
  "currencyCode": string,
  "currencySymbol": string,
  "usdExchangeRate": number (e.g. 278.5 for PKR, 86.5 for INR, 120.0 for BDT, 1500 for NGN, 25000 for VND),
  "curriculumType": string (e.g. "Matric / F.Sc / A-Levels", "CBSE / ISC / State Boards", "HSC / National Curriculum", "WAEC / WASSCE"),
  "curriculumAdvice": string,
  "embassyLocations": string[] (e.g. ["US Embassy Islamabad", "US Consulate General Karachi"]),
  "advisingCenter": string (e.g. "USEFP Islamabad / Lahore / Karachi", "USIEF New Delhi / Mumbai", "EMK Center / EducationUSA Dhaka", "EducationUSA Center"),
  "bankRegulations": string (e.g. "State Bank Form A foreign exchange authorization & 0.6% withholding tax", "Liberalised Remittance Scheme (LRS) & 5% TCS"),
  "feeWaiverStrategies": string[],
  "visaInterviewTips": string[],
  "testCostEquivalents": {
    "satCostFormatted": string,
    "detCostFormatted": string,
    "sevisCostFormatted": string,
    "mrvCostFormatted": string
  },
  "customSummary": string
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.4,
        systemInstruction:
          'You are an expert system that outputs precise JSON schemas for international student admissions adaptations.',
      },
    });

    const responseText = response.text?.trim() || '{}';
    const planData = JSON.parse(responseText);

    return NextResponse.json({ success: true, planData });
  } catch (error: any) {
    console.error('AI Plan Adaptation Error:', error);
    return NextResponse.json(
      {
        error: error?.message || 'Failed to customize plan',
        success: false,
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: NextRequest) {
  try {
    const { message, country, conversationHistory, context, userEmail, userApiKey } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim() || process.env.OWNER_EMAIL?.toLowerCase().trim();
    const currentUserEmail = userEmail?.toLowerCase().trim();
    const isOwner = !adminEmail || (currentUserEmail && currentUserEmail === adminEmail);

    let activeApiKey = '';

    if (isOwner) {
      // Owner/Admin uses system server key directly from .env / .env.local
      activeApiKey = process.env.GEMINI_API_KEY || '';
    } else {
      // Other users must provide their own Gemini API key or use system key if provided
      activeApiKey = userApiKey?.trim() || '';
    }

    if (!activeApiKey) {
      return NextResponse.json({
        requiresApiKey: true,
        reply: `🔑 **Personal Gemini API Key Required**\n\nTo use the AI Admissions Counselor, please enter your free Gemini API key in the field above.\n\n👉 **How to get your free key:**\n1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)\n2. Click **Create API Key**\n3. Copy & paste your key here to get unlimited personalized counseling!`,
        detectedCountry: country,
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

    const systemInstruction = `You are the world's premier US Undergraduate Admissions & F-1 Visa Counselor for international students seeking 100% need-met full-ride financial aid.
Your specialty is guiding ambitious students from developing/international countries (e.g., Pakistan, India, Bangladesh, Nepal, Vietnam, Nigeria, Ghana, Kenya, Brazil, etc.) to get into top US colleges (like Berea, Amherst, Williams, Dartmouth, Harvard, MIT, Bowdoin, Princeton) with $0 parental contribution.

Current Student Context:
- Target Country: ${country || 'Pakistan'}
- Current Roadmap Stage: ${context?.currentStage || 'Exploring Portals & 100% Need-Met Colleges'}
- User Profile: International applicant needing 100% full-ride financial aid, zero debt, and F-1 student visa clearance.

Guidelines:
1. Provide highly specific, actionable, encouraging, and legally accurate advice.
2. If the user mentions their country or city, personalize currency, local high school exams (e.g. CBSE/ISC for India, Matric/FSc & A-Levels for Pakistan, HSC for Bangladesh, WAEC for Nigeria), local US embassies/consulates, bank remittance rules, and EducationUSA advising centers.
3. Keep formatting clean with concise bullet points, bold key terms, and actionable takeaways.
4. If the user asks you to adapt their plan to a specific country, clearly summarize the country-specific adaptations.`;

    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(conversationHistory)) {
      for (const msg of conversationHistory.slice(-6)) {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        });
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText =
      response.text ||
      "I'm here to help you navigate your US college and F-1 visa journey. Could you please specify your question?";

    return NextResponse.json({
      reply: replyText,
      detectedCountry: country,
      isOwner,
    });
  } catch (error: any) {
    console.error('AI Chat Error:', error);
    return NextResponse.json(
      {
        error: error?.message || 'Failed to generate AI admissions counsel',
        fallback:
          'We are currently connecting to your personalized admissions profile. Feel free to explore our country selector and timeline steps.',
      },
      { status: 500 }
    );
  }
}

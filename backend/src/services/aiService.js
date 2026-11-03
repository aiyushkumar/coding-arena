import axios from 'axios';
import { config } from '../config/env.js';

/**
 * Intelligent Fallback Generator when API keys are not configured.
 * Generates tailored, non-spoiler hints based on topic, error type, and code pattern.
 */
const generateIntelligentLocalHint = ({ problem, userCode, language, submissionStatus, errorLog, skillProfile }) => {
  const title = problem?.title || 'Algorithmic Problem';
  const topics = problem?.topicTags || [];
  const primaryTopic = topics[0] || 'General';

  let diagnosis = '';
  let tier1 = '';
  let tier2 = '';
  let tier3 = '';

  if (submissionStatus === 'Time Limit Exceeded' || submissionStatus === 'TLE') {
    diagnosis = `Your current solution is hitting Time Limit Exceeded. In problems tagged with [${topics.join(', ')}], quadratic $O(N^2)$ or exponential $O(2^N)$ time limits are usually too slow for maximum constraints ($N \\ge 10^5$).`;
    tier1 = `Step back from checking every combination. Can you trade a little bit of auxiliary space ($O(N)$ space) to achieve linear $O(N)$ or $O(N \\log N)$ time?`;
    tier2 = `Check your loops: if you have nested iterations searching for an element, replace the search with an $O(1)$ lookup data structure (such as a Hash Map / Set) or pre-sort with two pointers.`;
    tier3 = `If using recursion, identify if identical subproblems are being computed repeatedly. Apply memoization (Top-Down DP) or an iterative bottom-up table.`;
  } else if (submissionStatus === 'Runtime Error' || submissionStatus === 'RE') {
    diagnosis = `Your code encountered a runtime crash. Notice: ${errorLog || 'Index out of bounds or null pointer exception'}.`;
    tier1 = `Ensure all base cases and boundary constraints are checked before accessing elements (e.g., empty arrays, single element arrays, or negative values).`;
    tier2 = `Examine array indexing. Are you accessing index \`i + 1\` or \`i - 1\` when \`i\` is at boundary \`0\` or \`length - 1\`?`;
    tier3 = `Check variable initialization and types. Make sure variables are not undefined before dereferencing properties.`;
  } else if (submissionStatus === 'Wrong Answer' || submissionStatus === 'WA') {
    diagnosis = `Your logic produced a different output than expected on test cases. ${errorLog ? 'Observation: ' + errorLog : ''}`;
    tier1 = `Carefully review the problem constraints and definitions. Are duplicates allowed? Can inputs be negative or zero?`;
    tier2 = `Trace an example by hand where your solution might make a greedy choice that isn't globally optimal, or where an off-by-one condition occurs.`;
    tier3 = `Verify your return format matches the specification exactly (e.g., 0-indexed vs 1-indexed, integer vs floating point, order of elements).`;
  } else {
    // General assistance
    diagnosis = `Analyzing your solution for "${title}" targeting topic: ${primaryTopic}.`;
    tier1 = `Consider the relationship between input state transitions and the optimal substructure. What is the minimal information needed to represent each step?`;
    tier2 = `Think about edge cases: empty input, array with all identical elements, sorted vs reverse sorted input.`;
    tier3 = `What time and space complexity targets are optimal for this problem? Look at the constraints: $N \\le 10^5$ suggests $O(N)$ or $O(N \\log N)$.`;
  }

  // Personalization based on student's skill profile
  let personalization = '';
  if (skillProfile && skillProfile.topicScores) {
    const currentScore = skillProfile.topicScores[primaryTopic] || 50;
    if (currentScore < 50) {
      personalization = `Tip for your learning path: Your current proficiency in ${primaryTopic} is ${currentScore}/100. Tackling this problem will directly boost your mastery in this area!`;
    } else {
      personalization = `You already have good foundation in ${primaryTopic} (${currentScore}/100). Focus on clean invariants and optimizing auxiliary space.`;
    }
  }

  return {
    problemTitle: title,
    topics,
    submissionStatus,
    diagnosis,
    tieredHints: [
      {
        tier: 1,
        title: 'Conceptual Intuition',
        content: tier1
      },
      {
        tier: 2,
        title: 'Edge Cases & Invariant Checks',
        content: tier2
      },
      {
        tier: 3,
        title: 'Algorithmic Structure Guidance',
        content: tier3
      }
    ],
    personalization,
    complexityTip: 'Aim for optimal time complexity under 1 second execution threshold.',
    provider: 'Coding Arena AI Engine (Adaptive Heuristic)'
  };
};

/**
 * Call Gemini API with strict non-spoiler guidelines
 */
const callGemini = async (prompt) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${config.geminiApiKey}`;
  const response = await axios.post(
    url,
    {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 1000
      }
    },
    { headers: { 'Content-Type': 'application/json' }, timeout: 10000 }
  );

  const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return text;
};

/**
 * Call OpenAI API
 */
const callOpenAI = async (prompt) => {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert Competitive Programming Coach. Your goal is to guide students to solve algorithmic problems on their own. NEVER give the complete solution code. Provide diagnostic feedback, 3 tiered progressive hints, edge case reminders, and encouragement.'
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 1000
    },
    {
      headers: {
        Authorization: `Bearer ${config.openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000
    }
  );

  return response.data?.choices?.[0]?.message?.content;
};

/**
 * Generate contextual, non-spoiler hints for a problem and student's code
 */
export const getAIHintGuide = async ({
  problem,
  userCode,
  language,
  submissionStatus = 'Pending',
  errorLog = '',
  userQuestion = '',
  skillProfile = null
}) => {
  // If an external key is configured, construct prompt
  if (config.geminiApiKey || config.openaiApiKey) {
    const prompt = `
You are the AI Algorithmic Tutor on Coding Arena.
Problem Title: "${problem.title}"
Topics: ${problem.topicTags?.join(', ')}
Difficulty: ${problem.difficulty}
Description:
${problem.description}

Student's Programming Language: ${language}
Student's Code:
\`\`\`${language}
${userCode}
\`\`\`

Execution Status: ${submissionStatus}
Error / Judge Log: ${errorLog || 'None'}
Student's Specific Question (if any): "${userQuestion || 'Where is my logic failing?'}"

STRICT GUIDELINES:
1. DO NOT write or reveal the full working solution code.
2. Provide a short Diagnosis explaining what went wrong (e.g. edge case, time complexity, off-by-one).
3. Provide 3 Tiered Progressive Hints:
   - Tier 1: Conceptual intuition.
   - Tier 2: Edge-case guidance and data structure suggestion.
   - Tier 3: Algorithmic invariant / pseudocode step (still without giving full code).
4. Return your response formatted in clean JSON with keys:
   {
     "diagnosis": "string",
     "tieredHints": [
       {"tier": 1, "title": "Conceptual Intuition", "content": "string"},
       {"tier": 2, "title": "Edge Cases & Data Structures", "content": "string"},
       {"tier": 3, "title": "Algorithmic Invariant", "content": "string"}
     ],
     "personalization": "string",
     "complexityTip": "string"
   }
`;

    try {
      let rawText = '';
      let providerName = '';

      if (config.geminiApiKey) {
        rawText = await callGemini(prompt);
        providerName = 'Google Gemini AI';
      } else if (config.openaiApiKey) {
        rawText = await callOpenAI(prompt);
        providerName = 'OpenAI';
      }

      // Parse JSON from LLM response
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          problemTitle: problem.title,
          topics: problem.topicTags,
          submissionStatus,
          diagnosis: parsed.diagnosis,
          tieredHints: parsed.tieredHints,
          personalization: parsed.personalization || 'Keep going! Problem solving is an iterative craft.',
          complexityTip: parsed.complexityTip || 'Optimal constraints target.',
          provider: providerName
        };
      }
    } catch (apiErr) {
      console.warn(`[AI Service] LLM API call failed (${apiErr.message}). Falling back to adaptive local engine.`);
    }
  }

  // Fallback to intelligent local engine
  return generateIntelligentLocalHint({
    problem,
    userCode,
    language,
    submissionStatus,
    errorLog,
    skillProfile
  });
};

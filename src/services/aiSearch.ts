import { aiTools } from '@/data/tools';
import { AISearchResponse } from '@/types/tool';

const OPENROUTER_API_KEY = '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';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function searchWithAI(userQuery: string): Promise<AISearchResponse> {
  try {
    const systemPrompt = `You are an expert AI search engine. You have access to the following AI tools:

${aiTools.map(tool => `
ID: ${tool.id}
Name: ${tool.name}
Purpose: ${tool.purpose}
Description: ${tool.description}
Category: ${tool.category}
Tags: ${tool.tags.join(', ')}
`).join('\n')}

Based on the user's prompt, analyze what kind of tool they want. If it's a greeting or general message, respond with just a message. Otherwise, provide the ID of the most relevant tool from the given array.

You must respond in this exact JSON format:
{
  "message": "Your response message here",
  "id": "tool_id_if_relevant_or_empty_string"
}

Be helpful and conversational in your message. If you find a relevant tool, explain why it matches their needs.`;

    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'AIM One - AI Tools Search'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.2-3b-instruct:free',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userQuery
          }
        ],
        temperature: 0.3,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    // Parse JSON response
    try {
      const parsedResponse: AISearchResponse = JSON.parse(aiResponse);
      return parsedResponse;
    } catch (parseError) {
      // Fallback if JSON parsing fails
      return {
        message: "I'm here to help you find the perfect AI tool! Could you tell me more about what you're looking for?",
        id: ""
      };
    }

  } catch (error) {
    console.error('AI Search Error:', error);
    return {
      message: "I'm experiencing some technical difficulties. Please try your search again or browse our tools manually.",
      id: ""
    };
  }
}

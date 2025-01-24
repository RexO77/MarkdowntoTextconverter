import { supabase } from "@/integrations/supabase/client";

export const formatMarkdownWithAI = async (content: string): Promise<string> => {
  try {
    // Get the GROQ API key from Supabase
    const { data: { secret: GROQ_API_KEY }, error } = await supabase.functions.invoke('get-secret', {
      body: { name: 'GROQ_API_KEY' }
    });

    if (error || !GROQ_API_KEY) {
      throw new Error('Failed to get GROQ API key');
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [
          {
            role: 'system',
            content: 'You are a Markdown formatting expert. Format the given Markdown text to improve its hierarchy, readability, and structure while preserving all content. Add appropriate headers, lists, and emphasis where needed.'
          },
          {
            role: 'user',
            content: content
          }
        ],
        temperature: 0.2,
        max_tokens: 32000,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to format markdown');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error formatting markdown:', error);
    throw error;
  }
};
'use server';

import { generateNostalgicPhrase } from '@/ai/flows/dynamic-nostalgic-phrases';

/**
 * Generates a nostalgic phrase based on a given topic.
 * @param topic The topic for the nostalgic phrase.
 * @returns A nostalgic phrase or a fallback phrase if an error occurs.
 */
export async function getDynamicPhrase(topic: string): Promise<string> {
  try {
    const result = await generateNostalgicPhrase({ topic });
    return result.phrase;
  } catch (error) {
    console.error('Error generating nostalgic phrase:', error);
    // Return a default phrase on error to ensure the UI doesn't break.
    return 'Remember blowing into cartridges to make them work?';
  }
}

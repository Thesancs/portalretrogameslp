'use server';
/**
 * @fileOverview A dynamic nostalgic phrase generator for the gamified waiting room.
 *
 * - generateNostalgicPhrase - A function that generates a nostalgic phrase.
 * - NostalgicPhraseInput - The input type for the generateNostalgicPhrase function.
 * - NostalgicPhraseOutput - The return type for the generateNostalgicPhrase function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NostalgicPhraseInputSchema = z.object({
  topic: z
    .string()
    .describe("A topic related to retro gaming to inspire the nostalgic phrase, such as 'SNES', 'PS1', or 'arcades'."),
});
export type NostalgicPhraseInput = z.infer<typeof NostalgicPhraseInputSchema>;

const NostalgicPhraseOutputSchema = z.object({
  phrase: z.string().describe('A nostalgic phrase related to retro gaming.'),
});
export type NostalgicPhraseOutput = z.infer<typeof NostalgicPhraseOutputSchema>;

export async function generateNostalgicPhrase(input: NostalgicPhraseInput): Promise<NostalgicPhraseOutput> {
  return nostalgicPhraseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'nostalgicPhrasePrompt',
  input: {schema: NostalgicPhraseInputSchema},
  output: {schema: NostalgicPhraseOutputSchema},
  prompt: `You are a creative copywriter specializing in nostalgic content related to retro gaming.

  Generate a short, engaging, and nostalgic phrase related to the following topic:
  {{{topic}}}

  The phrase should evoke memories of classic gaming experiences and appeal to users who grew up with retro games.
  The phrase should be no more than 20 words.
  `,
});

const nostalgicPhraseFlow = ai.defineFlow(
  {
    name: 'nostalgicPhraseFlow',
    inputSchema: NostalgicPhraseInputSchema,
    outputSchema: NostalgicPhraseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

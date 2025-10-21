import { NextRequest, NextResponse } from 'next/server';
import { appRoute } from '@genkit-ai/next';
import { ai } from '@/ai/genkit';
import '@/ai/flows/dynamic-nostalgic-phrases';

type GenkitHandler = (request: NextRequest) => Promise<NextResponse>;

const handlerCache = new Map<string, GenkitHandler>();

function buildCandidates(slug: string[]): string[] {
  if (!slug.length) {
    return [];
  }

  const joined = slug.join('/');

  return Array.from(
    new Set([
      `/${joined}`,
      `/flow/${joined}`,
      `/action/${joined}`,
    ]),
  );
}

async function resolveHandler(slug: string[] = []): Promise<GenkitHandler | null> {
  const candidates = buildCandidates(slug);

  for (const key of candidates) {
    const cached = handlerCache.get(key);
    if (cached) {
      return cached;
    }

    const action = await ai.registry.lookupAction(key);
    if (action) {
      const handler = appRoute(action);
      handlerCache.set(key, handler);
      return handler;
    }
  }

  return null;
}

async function runGenkitAction(request: NextRequest, slug: string[] = []): Promise<NextResponse> {
  const handler = await resolveHandler(slug.filter(Boolean));

  if (!handler) {
    return NextResponse.json(
      { error: `Genkit action '${slug.join('/')}' not found.` },
      { status: 404 },
    );
  }

  return handler(request);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug?: string[] } },
): Promise<NextResponse> {
  return runGenkitAction(request, params.slug ?? []);
}

export function GET(): NextResponse {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}

export function OPTIONS(): NextResponse {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: 'POST, OPTIONS',
    },
  });
}

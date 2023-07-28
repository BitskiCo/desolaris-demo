import { getSession, updateSession } from '@auth0/nextjs-auth0/edge';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      {
        error: 'No session found',
      },
      { status: 401 }
    );
  }

  const res = NextResponse.json({});

  await updateSession(req, res, {
    ...session,
    user: {
      ...session.user,
      didClaimDeck: true,
    },
  });

  return res;
};

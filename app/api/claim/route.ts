import { expect } from '@/app/util';
import { generateDeck } from '@/lib/collectibles';
import { getBalances } from '@/lib/data';
import {
  getSession,
  updateSession,
  withApiAuthRequired,
} from '@auth0/nextjs-auth0/edge';
import { NextRequest, NextResponse } from 'next/server';

export const POST = withApiAuthRequired(async (req: NextRequest) => {
  const session = expect(await getSession());

  const balances = await getBalances(session.user.account);

  const didClaimDeck =
    (balances && balances.length !== 0) || session.user.didClaimDeck;

  let res: NextResponse;

  if (didClaimDeck) {
    res = NextResponse.json(
      {
        error: 'Deck already claimed',
      },
      { status: 401 }
    );
  } else {
    try {
      const claimedDeckBalances = await generateDeck(session.user.account);

      res = NextResponse.json({ balances: claimedDeckBalances });
    } catch (e) {
      return NextResponse.json(
        {
          error: (e as Error).message,
        },
        { status: 401 }
      );
    }
  }

  await updateSession(req, res, {
    ...session,
    user: {
      ...session.user,
      didClaimDeck: true,
    },
  });

  return res;
});

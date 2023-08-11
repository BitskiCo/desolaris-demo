import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0/edge';
import { redirect } from 'next/navigation';
import { getBalances } from '@/lib/data';
import { expect } from '../util';

export default withPageAuthRequired(
  async () => {
    const session = expect(await getSession());

    if (session.user.didClaimDeck) {
      return redirect(`/app/${session.user.account}`);
    } else {
      return redirect('/claim');
    }
  },
  { returnTo: '/app' }
);

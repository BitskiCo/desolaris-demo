import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0/edge';
import ClaimFlow from './ClaimFlow';
import { expect } from '../util';
import { redirect } from 'next/navigation';

export default withPageAuthRequired(
  async () => {
    const session = expect(await getSession());

    if (session.user.didClaimDeck) {
      return redirect('/app');
    }

    return <ClaimFlow />;
  },
  { returnTo: '/claim' }
);

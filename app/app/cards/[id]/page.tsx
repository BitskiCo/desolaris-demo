import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0/edge';
import { redirect } from 'next/navigation';
import CardView from './CardView';
import { expect } from '../../../util';

export default withPageAuthRequired(
  async () => {
    const session = expect(await getSession());

    if (!session.user.didClaimDeck) {
      return redirect('/claim');
    }

    return <CardView user={session.user} />;
  },
  { returnTo: '/app' }
);

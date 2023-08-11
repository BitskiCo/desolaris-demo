import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0/edge';
import { redirect } from 'next/navigation';
import DeckView from './DeckView';
import { getBalances } from '@/lib/data';

export default async function Page({
  params,
}: {
  params: { account: string };
}) {
  const { account } = params;
  const session = await getSession();

  if (
    session &&
    session.user.account === account &&
    !session.user.didClaimDeck
  ) {
    return redirect('/claim');
  }

  const balances = (await getBalances(params.account)).filter(
    (balance) => balance.metadata.image && balance.metadata.name
  );

  return (
    <DeckView account={account} balances={balances} user={session?.user} />
  );
}

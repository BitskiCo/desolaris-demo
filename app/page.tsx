import { getSession } from '@auth0/nextjs-auth0/edge';
import { getBalances } from '@/lib/data';
import Intro from './Intro';

export default async function Home() {
  const session = await getSession();
  const balances = await getBalances(session?.user.account);

  return <Intro isLoggedIn={!!session} balances={balances} />;
}

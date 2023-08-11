import CardView from './CardView';
import { getToken } from '@/lib/data';

export default async function Page({
  params,
}: {
  params: { account: string; id: string };
}) {
  const { account, id } = params;

  const token = await getToken(account, id);

  if (!token) {
    return {
      notFound: true,
    };
  }

  return <CardView account={account} token={token} />;
}

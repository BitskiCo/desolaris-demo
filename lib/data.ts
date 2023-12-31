import { v4 as uuid } from 'uuid';

export interface DesolarisTokenProps {
  rarity?: string;
  category?: string;
  type?: string;
  equipLocation?: string[];
  bonuses?: Record<string, number>;
  [key: string]: unknown;
}
export interface Balance {
  id: string;
  contractAddress: string;
  metadata: {
    name: string;
    attributes?: Record<string, unknown>[];
    description?: string;
    externalUrl?: string;
    hasRarityData?: boolean;
    image?: string;
    marketplaceUrl?: string;
    properties?: DesolarisTokenProps;
  };
}

const BITSKI_APP_ID = '6ee158ab-0210-4aa9-90e1-fba42b4d0d71';
const DESOLARIS_CHAIN_ID = 8453;
const DESOLARIS_CONTRACT_ADDRESS = '0xd285d77255c37b5e43cabb2bcdde5e1d762e30db';
const DESOLARIS_CONTRACT_ID = '4d316d4a-ec87-4523-919b-1dae572dab09';

export const getBalances = async (account?: string): Promise<Balance[]> => {
  if (!account) {
    return [];
  }

  const response = await fetch(
    `https://api.bitski.com/v2/balances?address=${account}&chainIds=${DESOLARIS_CHAIN_ID}&contractAddresses=${DESOLARIS_CONTRACT_ADDRESS}&nfts=true`
  );
  const { balances } = await response.json();

  return balances;
};

export const getToken = async (
  account: string,
  tokenId: string
): Promise<Balance | undefined> => {
  const tokens = await getBalances(account);

  return tokens.find((t) => t.id === tokenId);
};

export const createToken = async (
  account: string,
  token: {
    name: string;
    image: string;
    description?: string;
    properties: DesolarisTokenProps;
  }
): Promise<Balance> => {
  const res = await fetch(
    `https://api.bitski.com/v1/apps/${BITSKI_APP_ID}/tokens`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(
          `${process.env.BITSKI_CLIENT_ID}:${process.env.BITSKI_CLIENT_SECRET}`
        )}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        initialOwner: account,
        token: {
          contractId: DESOLARIS_CONTRACT_ID,
          state: 'AVAILABLE',
          metadata: token,
        },
      }),
    }
  );

  if (!res.ok) {
    console.log(await res.text());
    throw new Error('Failed to create token');
  }

  return {
    id: uuid(),
    contractAddress: DESOLARIS_CONTRACT_ADDRESS,
    metadata: token,
  };
};

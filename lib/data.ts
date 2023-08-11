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

const MUMBAI_CHAIN_ID = 80001;
const BITSKI_APP_ID = '6ee158ab-0210-4aa9-90e1-fba42b4d0d71';
const DESOLARIS_CONTRACT_ADDRESS = '0x867d562070b710a5410c49f332e036a0d5a215ba';
const DESOLARIS_CONTRACT_ID = '19918707-c760-4e45-8cfe-947ec5ae6bea';

export const getBalances = async (account?: string): Promise<Balance[]> => {
  if (!account) {
    return [];
  }

  const response = await fetch(
    `https://api.bitski.com/v2/balances?address=${account}&chainIds=${MUMBAI_CHAIN_ID}&contractAddresses=${DESOLARIS_CONTRACT_ADDRESS}&nfts=true`
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

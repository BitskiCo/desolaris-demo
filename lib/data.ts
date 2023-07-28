export interface Balance {
  id: string;
  contractAddress: string;
  metadata: {
    name: string;
    attributes?: Record<string, string>[],
    description?: string;
    externalUrl?: string;
    hasRarityData?: boolean;
    image?: string;
    marketplaceUrl?: string;
    properties?: Record<string, string>;
  }
}

const POLYGON_CHAIN_ID = 137;

export const getBalances = async (account?: string): Promise<Balance[]> => {
  if (!account) {
    return [];
  }

  const response = await fetch(`https://api.bitski.com/v2/balances?address=${account}&chainIds=${POLYGON_CHAIN_ID}&nfts=true`);
  const { balances } = await response.json();

  return balances;
}

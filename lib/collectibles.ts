import _collectibles from './collectibles.json';
import { Balance, createToken } from './data';

let collectibles: Collectible[] = _collectibles as unknown as Collectible[];

export interface Collectible {
  image: string;
  type: CollectibleType;
  category: CollectibleCategory;
  name: string;
  rarity: CollectibleRarity;
  description?: string;
  equipLocation?: string[];
  bonuses?: Record<string, number>;
}

export enum CollectibleType {
  Gear = 'GEAR',
}

export enum CollectibleCategory {
  Armor = 'ARMOR',
  Weapon = 'WEAPON',
  Accessory = 'ACCESSORY',
  Artifact = 'ARTIFACT',
  Ship = 'SHIP',
  Creature = 'CREATURE',
  Plant = 'PLANT',
  Environment = 'ENVIRONMENT',
  Culture = 'CULTURE',
  Tech = 'TECH',
  Military = 'MILITARY',
  Fossil = 'FOSSIL',
}

export enum CollectibleRarity {
  Common = 'COMMON',
  Uncommon = 'UNCOMMON',
  Rare = 'RARE',
  Epic = 'EPIC',
  Legendary = 'LEGENDARY',
}

export const commonCollectibles: Collectible[] = collectibles.filter(
  (c) => c.rarity === CollectibleRarity.Common
);

export const uncommonCollectibles: Collectible[] = collectibles.filter(
  (c) => c.rarity === CollectibleRarity.Uncommon
);

export const rareCollectibles: Collectible[] = collectibles.filter(
  (c) => c.rarity === CollectibleRarity.Rare
);

export const epicCollectibles: Collectible[] = collectibles.filter(
  (c) => c.rarity === CollectibleRarity.Epic
);

export const legendaryCollectibles: Collectible[] = collectibles.filter(
  (c) => c.rarity === CollectibleRarity.Legendary
);

const getNumCollectiblesForRarity = (rarity: CollectibleRarity): number => {
  switch (rarity) {
    case CollectibleRarity.Uncommon:
      return Math.random() > 0.5 ? 3 : 2;
    case CollectibleRarity.Rare:
      return Math.random() > 0.5 ? 2 : 1;
    case CollectibleRarity.Epic:
      // No epics yet, update this when we add some
      return 0;
    case CollectibleRarity.Legendary:
      return Math.random() > 0.95 ? 1 : 0;
  }

  return -1;
};

/**
 * A function given an array of collectibles and a number of collectibles to return
 * that randomly selects collectibles from the array and returns them.
 */
const getRandomCollectibles = (
  collectibles: Collectible[],
  num: number
): Collectible[] => {
  const randomCollectibles: Collectible[] = [];
  for (let i = 0; i < num; i++) {
    const randomIndex = Math.floor(Math.random() * collectibles.length);
    randomCollectibles.push(collectibles[randomIndex]);
  }
  return randomCollectibles;
};

const DECK_SIZE = 10;

export const generateDeck = async (account: string): Promise<Balance[]> => {
  const numLegendary = getNumCollectiblesForRarity(CollectibleRarity.Legendary);
  const numEpic = getNumCollectiblesForRarity(CollectibleRarity.Epic);
  const numRare = getNumCollectiblesForRarity(CollectibleRarity.Rare);
  const numUncommon = getNumCollectiblesForRarity(CollectibleRarity.Uncommon);

  const numCommon = DECK_SIZE - numLegendary - numEpic - numRare - numUncommon;

  const deck: Collectible[] = [
    ...getRandomCollectibles(commonCollectibles, numCommon),
    ...getRandomCollectibles(uncommonCollectibles, numUncommon),
    ...getRandomCollectibles(rareCollectibles, numRare),
    ...getRandomCollectibles(epicCollectibles, numEpic),
    ...getRandomCollectibles(legendaryCollectibles, numLegendary),
  ];

  return Promise.all(
    deck.map((c) =>
      createToken(account, {
        name: c.name,
        image: `https://cdn.bitskistatic.com/desolaris/collectibles/${c.image}`,
        properties: {
          type: c.type,
          rarity: c.rarity,
          category: c.category,
          equipLocation: c.equipLocation,
          bonuses: c.bonuses,
        },
      })
    )
  );
};

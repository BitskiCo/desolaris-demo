'use client';
import Image from 'next/image';
import logo from '../../logo.svg';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Settings from './Settings';
import CopyButton from './CopyButton';
import Link from 'next/link';
import { Balance } from '@/lib/data';
import { shortenAddress } from '@/lib/string';

export default function DeckView({
  account,
  balances,
  user,
}: {
  account: string;
  balances: Balance[];
  user?: Record<string, string>;
}) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-[4.5rem] pt-10 flex flex-col h-screen app-bg"
    >
      <nav className="flex items-center gap-2">
        <Image src={logo} alt="Desolaris Logo" className="logo w-48" />
        <button className="chip">
          Demo App <i className="icon icon-info-square ml-1" />
        </button>
        <div className="flex-grow flex justify-end gap-[1px]">
          {user && (
            <button className="btn" onClick={() => setShowSettings(true)}>
              Settings
              <i className="icon icon-gear ml-1" />
            </button>
          )}
          <CopyButton copyText={account} className="btn">
            {shortenAddress(account)}
            <i className="icon icon-plus-square ml-1" />
          </CopyButton>
          <button className="btn btn-primary-top">
            Launch Game (Coming Soon)
          </button>
        </div>
      </nav>
      {user && (
        <Settings
          user={user}
          isShowing={showSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      <main className="pt-12 flex flex-col min-h-0">
        <h1 className="text-lg mb-5">Collection</h1>
        <hr className="bar mb-6" />
        <div className="overflow-y-scroll min-h-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {balances.map((balance) => {
              const rarity = balance.metadata.properties?.rarity?.toLowerCase();
              const category =
                balance.metadata.properties?.category?.toLowerCase();

              return (
                <Link
                  key={balance.id}
                  href={`/app/${account}/cards/${balance.id}`}
                  className="card"
                >
                  <div className="card-image">
                    <img src={balance.metadata.image} className="w-full" />
                    <div className={`rarity-type-marker text-${rarity}`} />
                  </div>
                  <div className="card-desc">
                    <h3 className={`text-${rarity}`}>{category}</h3>
                    <h2>{balance.metadata.name}</h2>
                    <h4>{balance.metadata.properties?.type}</h4>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </motion.div>
  );
}

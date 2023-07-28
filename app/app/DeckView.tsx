'use client';
import Image from 'next/image';
import logo from '../logo.svg';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Settings from './Settings';
import CopyButton from './CopyButton';
import Link from 'next/link';

export default function DeckView({ user }: { user: Record<string, string> }) {
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
          <button className="btn" onClick={() => setShowSettings(true)}>
            Settings
            <i className="icon icon-gear ml-1" />
          </button>
          <CopyButton copyText="0x14a...384Ak" className="btn">
            0x14a...384Ak
            <i className="icon icon-plus-square ml-1" />
          </CopyButton>
          <button className="btn btn-primary-top">
            Launch Game (Coming Soon)
          </button>
        </div>
      </nav>
      <Settings
        user={user}
        isShowing={showSettings}
        onClose={() => setShowSettings(false)}
      />
      <main className="pt-12 flex flex-col min-h-0">
        <h1 className="text-lg mb-5">Collection</h1>
        <hr className="bar mb-6" />
        <div className="overflow-y-scroll min-h-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <Link href={`/app/cards/test-card`} className="card">
              <div className="relative">
                <img src="/assets/desolarium-complex.png" className="w-full" />
                <div className="card-type-marker" />
              </div>
              <div className="p-4">
                <h2>Desolarium Complex</h2>
                <h3>Gear</h3>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </motion.div>
  );
}

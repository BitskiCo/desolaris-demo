'use client';
import Image from 'next/image';
import logo from '../../../../logo.svg';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Balance } from '@/lib/data';
import { shortenAddress } from '@/lib/string';
import CopyButton from '../../CopyButton';

export default function CardView({
  account,
  token,
}: {
  account: string;
  token: Balance;
}) {
  console.log(token);
  const rarity = token.metadata.properties?.rarity?.toLowerCase();
  const category = token.metadata.properties?.category?.toLowerCase();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-[4.5rem] pt-10 flex flex-col h-screen app-bg"
    >
      <div>
        <nav className="flex items-center gap-2">
          <Image src={logo} alt="Desolaris Logo" className="logo w-48" />
          <button className="chip">
            Demo App <i className="icon icon-info-square ml-1" />
          </button>
          <div className="flex-grow flex flex-row-reverse">
            <Link href={`/app/${account}`} className="hyperion text-gray-400">
              <i className="icon icon-close-square" /> Close
            </Link>
          </div>
        </nav>
        <hr className="bar mt-8" />
      </div>
      <main className="py-[4.5rem] flex-grow min-h-0 flex flex-col overflow-y-scroll overflow-x-visible md:flex-row md:gap-12 md:overflow-visible">
        <div className="card aspect-[14/17]">
          <img
            src={token.metadata.image}
            className="w-full h-full object-cover"
          />
          <div className="card-type-marker" />
        </div>
        <div className="flex-grow">
          <div className="bg-white bg-opacity-5 px-8 py-6 relative">
            <div className="bar absolute top-0 left-0 right-0"></div>
            <h1 className="text-xl text-center">{token.metadata.name}</h1>
          </div>
          <div className="p-6 card-desc-bg">
            <div>
              <h2 className="mb-4">Card</h2>
              <div className="border border-white border-opacity-10 grid grid-cols-2 hyperion p-4">
                <span className="text-gray-400">Type</span>
                <span className="text-right">
                  {token.metadata.properties?.type}
                </span>
                <span className="text-gray-400">Rarity</span>
                <span className={`text-right text-${rarity}`}>
                  <div className="rarity-type-marker"></div>
                  {rarity}
                </span>
                <span className="text-gray-400">Category</span>
                <span className="text-right">{category}</span>
              </div>
            </div>
            <div className="mt-10">
              <h2 className="mb-4">Metadata</h2>
              <div className="border border-white border-opacity-10 grid grid-cols-2 hyperion p-4">
                <span className="text-gray-400">Owner</span>
                <span className="text-right">
                  <CopyButton copyText={account}>
                    {shortenAddress(account)}
                  </CopyButton>
                </span>
                <span className="text-gray-400">Chain</span>
                <span className="text-right">Mumbai</span>
                <span className="text-gray-400">Contract</span>
                <span className="text-right">
                  <CopyButton copyText={account}>
                    {shortenAddress(token.contractAddress)}
                  </CopyButton>
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-[1px] gap-[1px]">
            <button className="btn">
              Transfer <i className="icon icon-send ml-0.5" />
            </button>
            <a className="btn">
              OpenSea <i className="icon icon-opensea ml-0.5" />
            </a>
          </div>
        </div>
      </main>
    </motion.div>
  );
}

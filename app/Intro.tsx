'use client';
import { MouseEvent } from 'react';
import Image from 'next/image';
import logo from './logo.svg';
import { cubicBezier, motion, useAnimate } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { Balance } from '@/lib/data';
import { useRouter } from 'next/navigation';

export default function Intro({
  isLoggedIn,
  balances,
}: {
  isLoggedIn: boolean;
  balances: Balance[];
}) {
  const [scope, animate] = useAnimate();
  const router = useRouter();

  const animateOut = (url: string) => async (e: MouseEvent) => {
    e.preventDefault();

    await animate([
      ['#planet-overlay', { opacity: 0 }, { ease: 'easeInOut', duration: 0.8 }],
      [
        '#planet',
        { scale: 6 },
        {
          ease: cubicBezier(0.6, 0, 0, 1),
          duration: 3,
          at: 1,
        },
      ],
      ['#planet', { opacity: 0 }, { ease: 'easeInOut', duration: 2, at: 0.5 }],
    ]);

    router.push(url);
  };

  return (
    <div ref={scope} className="relative h-screen pt-[3vh]">
      <motion.div
        id="planet"
        transition={{ duration: 3, delay: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full w-full"
      >
        <Spline scene="https://prod.spline.design/h97zWDoob7iJHxy4/scene.splinecode" />
      </motion.div>

      <div
        id="planet-overlay"
        className="planet-overlay flex flex-col items-center justify-center"
      >
        <motion.div
          transition={{ duration: 3 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative text-center"
        >
          <Image src={logo} alt="Desolaris Logo" className="logo w-48" />
          <a className="hyperion cursor-pointer text-white">
            By <i className="bitski-logo ml-1"></i>
          </a>
        </motion.div>
        <div className="h-[70vh]"></div>
        <motion.div
          transition={{ duration: 3, delay: 2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-[1px]"
        >
          {!isLoggedIn ? (
            <>
              <a
                href="/claim"
                onClick={animateOut('/claim')}
                className="btn btn-primary btn-nobs relative"
              >
                Claim Free Deck
              </a>
              <a onClick={animateOut('/claim')} href="/claim" className="btn">
                Login
              </a>
            </>
          ) : (
            <a
              onClick={animateOut('/app')}
              href="/app"
              className="btn btn-primary-top btn-nobs relative"
            >
              {balances.length > 0 ? 'View Deck' : 'Claim Free Deck'}
            </a>
          )}

          <button className="btn">About</button>
          <button className="btn btn-sm text-2xl">
            <i className="icon icon-twitter -m-1" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}

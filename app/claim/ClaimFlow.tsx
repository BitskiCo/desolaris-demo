'use client';
import { useTypewriter } from 'react-simple-typewriter';
import { motion, AnimatePresence } from 'framer-motion';
import { MouseEvent, useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function ClaimFlow() {
  const [showIntro, setShowIntro] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [text, { isDelay, isDone }] = useTypewriter({
    words: [
      'Welcome to Desolaris',
      'A game built by Bitski',
      'Claim your free deck to get started',
    ],

    delaySpeed: 3000,
    onLoopDone() {
      setTimeout(() => setShowIntro(false), 1500);
    },
  });

  const claimDeck = async (e: MouseEvent) => {
    setIsLoading(true);

    await fetch('/api/claim', {
      method: 'POST',
    });

    setTimeout(() => {
      window.location.href = window.origin + '/app';
    }, 2000);
  };

  return (
    <div className="claim-bg flex justify-center items-center">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.span
            key="text"
            transition={{ duration: 1.5 }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="hyperion text-4xl relative orange"
          >
            {text}{' '}
            {(isDelay || isDone) && (
              <span className="text-5xl blinker absolute block -top-1 -right-4">
                |
              </span>
            )}
          </motion.span>
        ) : (
          <motion.div
            key="deck"
            transition={{ duration: 1.5, delay: 0.5 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <div className="w-screen h-[70vh]">
              <Spline scene="https://prod.spline.design/hxDAh5DA2tt1i9lJ/scene.splinecode" />
            </div>
            <div className="pb-[6vh]">
              <button
                disabled={isLoading}
                onClick={claimDeck}
                className="btn btn-primary w-[300px] relative -top-[6vh]"
              >
                {isLoading ? (
                  <i className="icon icon-spinner" />
                ) : (
                  <>Claim your deck</>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export default function Settings({
  user,
  isShowing,
  onClose = () => {},
}: {
  user: Record<string, string>;
  isShowing: boolean;
  onClose?: () => void;
}) {
  const [isResetting, setIsResetting] = useState(false);
  const [didReset, setDidReset] = useState(false);
  const [didError, setDidError] = useState(false);

  const changePassword = async () => {
    if (isResetting) return;

    setIsResetting(true);

    try {
      const response = await fetch(
        'https://dev-gwnw10q0.us.auth0.com/dbconnections/change_password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            clientId: process.env.AUTH0_CLIENT_ID,
            email: user.email,
            connection: 'Username-Password-Authentication',
          }),
        }
      );

      if (response.ok) {
        setDidReset(true);
      } else {
        setDidError(true);

        setTimeout(() => setDidError(false), 3000);
      }
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <AnimatePresence>
      {isShowing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 backdrop-blur-xl bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="border border-white min-w-[500px]">
            <div className="border-b border-white px-8 py-7 relative">
              <h1>Settings</h1>
              <button
                onClick={onClose}
                className="text-2xl absolute top-5 right-8"
              >
                <i className="icon icon-close-square" />
              </button>
            </div>
            <div className="px-8 py-7 grid grid-cols-2 hyperion">
              <div>Email</div>
              <div className="text-gray-400 text-right">{user.email}</div>
              <div>Password</div>
              <div className="text-right">
                {isResetting ? (
                  <i className="icon-spinner"></i>
                ) : didError ? (
                  <>Something went wrong</>
                ) : didReset ? (
                  <>Reset email sent</>
                ) : (
                  <button onClick={changePassword} className="orange">
                    Change
                  </button>
                )}
              </div>
              <div>Wallet</div>
              <a
                href="https://user.bitski.com/claim?provider=fa_NmVlMTU4YWItMDIxMC00YWE5LTkwZTEtZmJhNDJiNGQwZDcx"
                className="text-right"
              >
                Claim
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

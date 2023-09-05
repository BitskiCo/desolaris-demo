import {
  AfterCallbackAppRoute,
  handleAuth,
  handleCallback,
} from '@auth0/nextjs-auth0/edge';

const afterCallback: AfterCallbackAppRoute = async (_req, session) => {
  const userId = session.user.sub;

  const accountResp = await fetch(
    `https://account.bitski.com/v2/federated-accounts`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(
          `${process.env.BITSKI_CLIENT_ID}:${process.env.BITSKI_CLIENT_SECRET}`
        )}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        userId,
      }),
    }
  );

  const { accounts } = await accountResp.json();

  if (accounts?.length !== 0) {
    session.user.account = accounts[0];

    return session;
  } else {
    throw new Error('Error creating wallet for this account. Try again.')
  }
};

export const GET = handleAuth({
  callback: handleCallback({ afterCallback }),
});

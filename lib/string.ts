export const shortenAddress = (address: string): string => {
  return (
    address.substring(0, 5) + '...' + address.substring(address.length - 5)
  );
};

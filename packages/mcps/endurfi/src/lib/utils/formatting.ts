// Format BigInt to human-readable string with decimals
export const formatUnits = (value: bigint, decimals: number): string => {
  const divisor = BigInt(10 ** decimals);
  const wholePart = value / divisor;
  const fractionalPart = value % divisor;

  if (fractionalPart === 0n) {
    return wholePart.toString();
  }

  const fractionalStr = fractionalPart.toString().padStart(decimals, '0');
  const trimmedFractional = fractionalStr.replace(/0+$/, '');

  return `${wholePart}.${trimmedFractional}`;
};

// Parse human-readable string to BigInt with decimals
export const parseUnits = (value: string, decimals: number): bigint => {
  const [wholePart, fractionalPart = '0'] = value.split('.');
  const paddedFractional = fractionalPart
    .padEnd(decimals, '0')
    .slice(0, decimals);
  return BigInt(wholePart) * BigInt(10 ** decimals) + BigInt(paddedFractional);
};

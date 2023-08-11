'use client';
import { useState } from 'react';

export default function CopyButton({
  copyText,
  className = '',
  children,
}: {
  copyText: string;
  className?: string;
  children?: string | JSX.Element | (string | JSX.Element)[];
}) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(copyText);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <button onClick={onCopy} className={`${className} relative`}>
      <span
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
          copied ? '' : 'invisible'
        }`}
      >
        Copied
      </span>
      <span className={copied ? 'invisible' : ''}>{children || copyText}</span>
    </button>
  );
}

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

type LoaderProps = {
  className?: string;
  color?: string;
  strokeWeight?: number;
};

export const Loader = ({
  className,
  color = 'hsl(var(--primary))',
  strokeWeight = 5,
}: LoaderProps) => {
  const [loadingText, setLoadingText] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoadingText('This is taking longer than expected... :/');
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, []);

  const spinnerStyle = {
    strokeDasharray: '187',
    strokeDashoffset: '0',
    transformOrigin: 'center',
    stroke: color,
    animation: 'dash 1.4s ease-out infinite',
  };

  const keyframes = `
    @keyframes dash {
      0% {
        stroke-dashoffset: 187;
      }
      50% {
        stroke-dashoffset: 46.75;
        transform: rotate(135deg);
      }
      100% {
        stroke-dashoffset: 187;
        transform: rotate(450deg);
      }
    }
    @keyframes rotator {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(270deg);
      }
    }
  `;

  return (
    <div className={`h-main flex w-full flex-col items-center justify-center gap-4`}>
      <style>{keyframes}</style>
      <svg
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
        style={{ animation: 'rotator 1.4s linear infinite' }}
        className={cn('size-14', className)}
      >
        <circle
          className="path"
          fill="none"
          strokeWidth={strokeWeight}
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="30"
          style={spinnerStyle}
        ></circle>
      </svg>
      <p className="text-sm text-muted-foreground/50">{loadingText}</p>
    </div>
  );
};

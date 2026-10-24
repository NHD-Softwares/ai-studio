'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type TooltipProps = {
  text?: string;
  isVisible: boolean;
  side?: 'top' | 'bottom' | 'left' | 'right';
  children: ReactNode;
  content?: ReactNode;
  className?: string;
};

const positionClasses = {
  top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
  bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
  left: 'right-full top-1/2 mr-2 -translate-y-1/2',
  right: 'left-full top-1/2 ml-2 -translate-y-1/2',
};

const arrowClasses = {
  top: 'top-full left-1/2 -translate-x-1/2 -translate-y-1/2',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 translate-y-1/2',
  left: 'left-full top-1/2 -translate-y-1/2 -translate-x-1/2',
  right: 'right-full top-1/2 -translate-y-1/2 translate-x-1/2',
};

const animations = {
  top: {
    origin: 'bottom',
    initial: { opacity: 0, scaleX: 0.95, scaleY: 0.5, y: 8 },
    animate: { opacity: 1, scaleX: 1, scaleY: 1, y: 0 },
    exit: { opacity: 0, scaleX: 0.95, scaleY: 0.5, y: 8 },
  },
  bottom: {
    origin: 'top',
    initial: { opacity: 0, scaleX: 0.95, scaleY: 0.5, y: -8 },
    animate: { opacity: 1, scaleX: 1, scaleY: 1, y: 0 },
    exit: { opacity: 0, scaleX: 0.95, scaleY: 0.5, y: -8 },
  },
  left: {
    origin: 'right',
    initial: { opacity: 0, scaleX: 0.5, scaleY: 0.95, x: 8 },
    animate: { opacity: 1, scaleX: 1, scaleY: 1, x: 0 },
    exit: { opacity: 0, scaleX: 0.5, scaleY: 0.95, x: 8 },
  },
  right: {
    origin: 'left',
    initial: { opacity: 0, scaleX: 0.5, scaleY: 0.95, x: -8 },
    animate: { opacity: 1, scaleX: 1, scaleY: 1, x: 0 },
    exit: { opacity: 0, scaleX: 0.5, scaleY: 0.95, x: -8 },
  },
};

export function Tooltip({
  text,
  isVisible,
  side = 'top',
  children,
  className,
  content,
}: TooltipProps) {
  const animation = animations[side];

  return (
    <div className="relative inline-flex">
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            key={side}
            role="tooltip"
            initial={animation.initial}
            animate={animation.animate}
            exit={animation.exit}
            transition={{
              duration: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformOrigin: animation.origin }}
            className={cn(
              'absolute z-50 w-max max-w-xs rounded-md bg-accent px-3 py-1.5 text-sm whitespace-nowrap text-accent-foreground shadow-md',
              positionClasses[side],
              className
            )}
          >
            {content ? content : text}

            <span
              aria-hidden="true"
              className={cn('absolute size-2 rotate-45 bg-accent', arrowClasses[side])}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

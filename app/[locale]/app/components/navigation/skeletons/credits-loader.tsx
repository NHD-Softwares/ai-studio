import { Skeleton } from '@/components/ui/skeleton';

type CreditsSkeletonProps = {
  collapsed: boolean;
};

export function CreditsSkeleton({ collapsed }: CreditsSkeletonProps) {
  if (collapsed) {
    return <Skeleton className="size-10 rounded-full" />;
  }

  return (
    <div
      aria-busy="true"
      className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-2xl border border-sidebar-border bg-sidebar-accent/40 p-3"
    >
      <div className="flex w-28 flex-col items-center">
        <svg viewBox="0 0 100 56" aria-hidden="true" className="w-full">
          <path
            d="M10 50 A40 40 0 0 1 90 50"
            fill="none"
            strokeWidth={8}
            strokeLinecap="round"
            className="animate-pulse stroke-sidebar-border"
          />
        </svg>
        <Skeleton className="mt-1 h-3 w-14" />
      </div>

      <Skeleton className="h-3 w-16 justify-self-start" />
    </div>
  );
}

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type ProfileSkeletonProps = {
  collapsed?: boolean;
};

export const ProfileSkeleton = ({ collapsed = false }: ProfileSkeletonProps) => {
  return (
    <div
      className={cn(
        'flex w-full items-center gap-2 rounded-2xl border border-sidebar-border bg-sidebar-accent/40 p-2',
        collapsed && 'justify-center border-0 bg-transparent p-0'
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Skeleton className="size-8 shrink-0 rounded-full" />

        {!collapsed && (
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        )}
      </div>

      {!collapsed && <Skeleton className="h-4 w-12 shrink-0" />}
    </div>
  );
};

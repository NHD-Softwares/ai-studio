import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export const Logo = ({ collapsed, href }: { collapsed: boolean; href: string }) => {
  return (
    <Link href={href} className="flex items-center gap-2">
      <h1
        className={cn(
          'mx-auto text-[20px] font-semibold tracking-tight text-foreground',
          collapsed && 'text-primary'
        )}
      >
        Ai{!collapsed && <span className="text-primary"> studio</span>}
      </h1>
    </Link>
  );
};

import { useTranslations } from 'next-intl';

import { LogoutButton } from '@/components/auth/logout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type ProfileProps = {
  name: string;
  imageUrl?: string | null;
  collapsed: boolean;
};

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export const Profile = ({ name, imageUrl, collapsed }: ProfileProps) => {
  const t = useTranslations('Nav');

  return (
    <div
      className={cn(
        'align-center flex w-full justify-between gap-2 rounded-2xl border border-sidebar-border bg-sidebar-accent/40 p-2',
        collapsed && 'justify-center border-0 bg-transparent p-0'
      )}
    >
      <div>
        <Link
          href="/profile"
          title={collapsed ? name : undefined}
          className="flex min-w-0 flex-1 items-center gap-3 rounded-xl"
        >
          <Avatar className="mx-auto size-8 shrink-0">
            {imageUrl && <AvatarImage src={imageUrl} alt="" />}
            <AvatarFallback className="bg-primary/20 text-xs font-medium">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>

          {!collapsed && (
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-sm font-medium">{name}</span>
              <span className="block truncate text-xs text-muted-foreground">
                {t('viewProfile')}
              </span>
            </span>
          )}
        </Link>
      </div>

      {!collapsed && <LogoutButton minimal />}
    </div>
  );
};

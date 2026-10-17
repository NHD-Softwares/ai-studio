import { ChevronDown, Folder } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

import { NavItem } from './nav-item';

const MOCK_PROJECTS = [
  { id: 'summer-campaign', name: 'Summer campaign' },
  { id: 'product-shots', name: 'Product shots' },
  { id: 'brand-refresh', name: 'Brand refresh' },
];

export const Projects = ({ collapsed }: { collapsed: boolean }) => {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  return (
    <div>
      <div className="flex items-center gap-1">
        <div className="min-w-0 flex-1">
          <NavItem href="/projects" icon={Folder} label={t('projects')} collapsed={collapsed} />
        </div>

        {!collapsed && (
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="nav-projects-list"
            aria-label={t('toggleProjects')}
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-sidebar-accent"
          >
            <ChevronDown
              className={cn('size-4 transition-transform', !open && '-rotate-90 rtl:rotate-90')}
            />
          </button>
        )}
      </div>

      {/* In the collapsed sidebar the list is hidden: icons only. */}
      {!collapsed && open && (
        <ul
          id="nav-projects-list"
          className="ms-5 mt-1 flex flex-col gap-0.5 border-s border-sidebar-border ps-3"
        >
          {MOCK_PROJECTS.map((project) => {
            const href = `/projects/${project.id}`;
            const isActive = pathname === href;

            return (
              <li key={project.id}>
                <Link
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'block truncate rounded-lg px-2 py-1.5 text-[13px] text-muted-foreground transition-colors',
                    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    isActive && 'text-sidebar-foreground'
                  )}
                >
                  {project.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useUIStore } from '@/lib/stores/ui.store';

const GridIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0"
  >
    <rect x="2" y="2" width="6" height="6" rx="1" />
    <rect x="12" y="2" width="6" height="6" rx="1" />
    <rect x="2" y="12" width="6" height="6" rx="1" />
    <rect x="12" y="12" width="6" height="6" rx="1" />
  </svg>
);

const ListIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0"
  >
    <rect x="2" y="2" width="6" height="6" rx="1" />
    <rect x="2" y="12" width="6" height="6" rx="1" />   
    <line x1="12" y1="5" x2="18" y2="5" />
    <line x1="12" y1="15" x2="18" y2="15" />
  </svg>
);

export function ViewToggle({ className }: Readonly<{ className?: string }>) {
  const { viewMode, setViewMode } = useUIStore();

  const t = useTranslations('ViewToggle');

  return (
    <div className={cn(
      'inline-flex items-center justify-center rounded-md border border-transparent bg-background p-0.5',
      'w-auto',
      className
    )}>
      <div className="flex items-center justify-center gap-0.5">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setViewMode('list')}
          className={cn(
            'h-7 w-7 p-0 transition-all hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-sm',
            viewMode === 'list'
              ? 'bg-view-toggle-active text-accent-foreground'
              : 'text-muted-foreground'
          )}
          aria-label={t('list')}
          title={t('list')}
          aria-pressed={viewMode === 'list'}
        >
          <ListIcon />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setViewMode('grid')}
          className={cn(
            'h-7 w-7 p-0 transition-all hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-sm',
            viewMode === 'grid'
              ? 'bg-view-toggle-active text-accent-foreground'
              : 'text-muted-foreground'
          )}
          aria-label={t('grid')}
          title={t('grid')}
          aria-pressed={viewMode === 'grid'}
        >
          <GridIcon />
        </Button>
      </div>
    </div>
  );
}
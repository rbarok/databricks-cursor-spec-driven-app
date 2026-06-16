import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, Skeleton } from '@databricks/appkit-ui/react';
import { cn } from '../lib/utils';

type KpiStatCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  accent?: 'blue' | 'emerald' | 'violet' | 'amber';
  loading?: boolean;
  error?: string | null;
  className?: string;
};

const accentStyles = {
  blue: 'from-primary/15 to-primary/5 text-primary',
  emerald: 'from-emerald-500/15 to-emerald-500/5 text-emerald-600 dark:text-emerald-400',
  violet: 'from-violet-500/15 to-violet-500/5 text-violet-600 dark:text-violet-400',
  amber: 'from-amber-500/15 to-amber-500/5 text-amber-600 dark:text-amber-400',
};

export function KpiStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  accent = 'blue',
  loading,
  error,
  className,
}: KpiStatCardProps) {
  return (
    <Card className={cn('glass-panel overflow-hidden border-0', className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2 min-w-0 flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            {loading && <Skeleton className="h-9 w-28" />}
            {error && !loading && (
              <p className="text-sm text-destructive">Unable to load</p>
            )}
            {!loading && !error && (
              <>
                <p className="text-3xl font-semibold tracking-tight text-foreground truncate">
                  {value}
                </p>
                {subtitle && (
                  <p className="text-xs text-muted-foreground">{subtitle}</p>
                )}
              </>
            )}
          </div>
          <div
            className={cn(
              'flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br',
              accentStyles[accent],
            )}
          >
            <Icon className="size-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

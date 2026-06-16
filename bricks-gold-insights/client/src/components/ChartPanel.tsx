import { Card, CardContent, CardHeader, CardTitle } from '@databricks/appkit-ui/react';
import { cn } from '../lib/utils';

type ChartPanelProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function ChartPanel({ title, description, children, className }: ChartPanelProps) {
  return (
    <Card className={cn('glass-panel min-w-0 border-0', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground font-normal">{description}</p>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

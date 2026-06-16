import type { ReactNode } from 'react';
import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@databricks/appkit-ui/react';

type PageHeaderProps = {
  title: string;
  description?: string;
  badge?: string;
  breadcrumb?: string;
  actions?: ReactNode;
};

export function PageHeader({ title, description, badge, breadcrumb, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="space-y-3">
        {breadcrumb && (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <span className="text-muted-foreground text-sm">{breadcrumb}</span>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
            {badge && (
              <Badge variant="secondary" className="rounded-full px-3 py-0.5 font-normal">
                {badge}
              </Badge>
            )}
          </div>
          {description && (
            <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}

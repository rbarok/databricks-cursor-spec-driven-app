import { NavLink } from 'react-router';
import {
  useAnalyticsQuery,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
} from '@databricks/appkit-ui/react';
import {
  ArrowRight,
  Building2,
  CreditCard,
  Globe2,
  MapPin,
  TrendingUp,
  Users,
} from 'lucide-react';
import { KpiStatCard } from '../components/KpiStatCard';
import { PageHeader } from '../components/PageHeader';
import { formatCurrency, formatInteger } from '../lib/formatters';

const dataSources = [
  {
    name: 'country_metrics',
    description: 'User, property, and revenue metrics aggregated by country.',
    icon: Globe2,
  },
  {
    name: 'host_property_summary',
    description: 'Host portfolios, listing values, and property counts.',
    icon: Building2,
  },
  {
    name: 'user_payment_summary',
    description: 'Completed payments and spend patterns by user.',
    icon: CreditCard,
  },
] as const;

export function HomePage() {
  const { data, loading, error } = useAnalyticsQuery('global_kpis', {});
  const kpis = data?.[0];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <PageHeader
        breadcrumb="Dashboard"
        title="Bricks Gold Insights"
        badge="Gold Layer"
        description="A governed analytics experience over Bricks medallion materialized views — explore markets, hosts, and payment activity from Unity Catalog."
        actions={
          <Button asChild>
            <NavLink to="/analytics">
              Open Analytics
              <ArrowRight className="size-4" />
            </NavLink>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiStatCard
          title="Countries"
          value={formatInteger(kpis?.country_count)}
          subtitle="Active markets"
          icon={MapPin}
          accent="blue"
          loading={loading}
          error={error}
        />
        <KpiStatCard
          title="Users"
          value={formatInteger(kpis?.total_users)}
          subtitle="Across all regions"
          icon={Users}
          accent="violet"
          loading={loading}
          error={error}
        />
        <KpiStatCard
          title="Properties"
          value={formatInteger(kpis?.total_properties)}
          subtitle="Listed inventory"
          icon={Building2}
          accent="emerald"
          loading={loading}
          error={error}
        />
        <KpiStatCard
          title="Revenue"
          value={formatCurrency(kpis?.total_revenue)}
          subtitle="Total platform revenue"
          icon={TrendingUp}
          accent="amber"
          loading={loading}
          error={error}
        />
      </div>

      <Card className="glass-panel border-0">
        <CardHeader>
          <CardTitle className="text-lg">Data Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-5 text-sm text-muted-foreground">
            This app reads from Unity Catalog materialized views in{' '}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
              bricks_medallion.gold-bricks
            </code>
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {dataSources.map(({ name, description, icon: Icon }) => (
              <div
                key={name}
                className="group rounded-xl border border-border/60 bg-background/50 p-4 transition-colors hover:border-primary/30 hover:bg-accent/30"
              >
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </div>
                  <Badge variant="outline" className="font-mono text-[11px]">
                    {name}
                  </Badge>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

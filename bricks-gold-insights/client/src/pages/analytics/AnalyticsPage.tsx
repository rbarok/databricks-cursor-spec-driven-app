import {
  useAnalyticsQuery,
  BarChart,
  DataTable,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@databricks/appkit-ui/react';
import {
  Building2,
  CreditCard,
  Globe2,
  MapPin,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';
import { ChartPanel } from '../../components/ChartPanel';
import { KpiStatCard } from '../../components/KpiStatCard';
import { PageHeader } from '../../components/PageHeader';
import { formatCurrency, formatInteger, toNumber } from '../../lib/formatters';

export function AnalyticsPage() {
  const { data: kpiData, loading: kpiLoading, error: kpiError } = useAnalyticsQuery(
    'global_kpis',
    {},
  );

  const kpis = kpiData?.[0];

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <PageHeader
        breadcrumb="Analytics"
        title="Gold Layer Analytics"
        badge="Live"
        description="Interactive charts and searchable tables sourced from bricks_medallion.gold-bricks materialized views."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiStatCard
          title="Countries"
          value={formatInteger(kpis?.country_count)}
          icon={MapPin}
          loading={kpiLoading}
          error={kpiError}
        />
        <KpiStatCard
          title="Total Users"
          value={formatInteger(kpis?.total_users)}
          icon={Users}
          accent="violet"
          loading={kpiLoading}
          error={kpiError}
        />
        <KpiStatCard
          title="Properties"
          value={formatInteger(kpis?.total_properties)}
          icon={Building2}
          accent="emerald"
          loading={kpiLoading}
          error={kpiError}
        />
        <KpiStatCard
          title="Total Revenue"
          value={formatCurrency(kpis?.total_revenue)}
          icon={TrendingUp}
          accent="amber"
          loading={kpiLoading}
          error={kpiError}
        />
      </div>

      <Tabs defaultValue="markets" className="space-y-6">
        <TabsList className="glass-panel h-auto w-full justify-start gap-1 rounded-xl border-0 p-1 sm:w-auto">
          <TabsTrigger value="markets" className="rounded-lg px-4">
            <Globe2 className="mr-2 size-4" />
            Markets
          </TabsTrigger>
          <TabsTrigger value="hosts" className="rounded-lg px-4">
            <Building2 className="mr-2 size-4" />
            Hosts
          </TabsTrigger>
          <TabsTrigger value="payments" className="rounded-lg px-4">
            <Wallet className="mr-2 size-4" />
            Payments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="markets" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <ChartPanel
              title="Users by Country (Top 15)"
              description="Markets ranked by registered user volume."
            >
              <BarChart
                queryKey="country_users_chart"
                parameters={{}}
                xKey="country"
                yKey="user_count"
                orientation="horizontal"
                height={380}
                colorPalette="sequential"
              />
            </ChartPanel>

            <ChartPanel
              title="Revenue by Country"
              description="Countries with recorded payment revenue."
            >
              <BarChart
                queryKey="country_revenue_chart"
                parameters={{}}
                xKey="country"
                yKey="total_revenue"
                orientation="horizontal"
                height={380}
                colorPalette="sequential"
              />
            </ChartPanel>
          </div>

          <Card className="glass-panel border-0">
            <CardHeader>
              <CardTitle className="text-base">Platform Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {kpiLoading && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full rounded-xl" />
                  ))}
                </div>
              )}
              {kpiError && (
                <div className="rounded-xl bg-destructive/10 p-4 text-sm text-destructive">
                  Error loading summary: {kpiError}
                </div>
              )}
              {kpis && (
                <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { label: 'Hosts', value: formatInteger(kpis.host_count) },
                    { label: 'Paying Users', value: formatInteger(kpis.paying_user_count) },
                    { label: 'Payments', value: formatInteger(kpis.total_payments) },
                    {
                      label: 'Avg Revenue / Country',
                      value: formatCurrency(
                        toNumber(kpis.total_revenue) / Math.max(toNumber(kpis.country_count), 1),
                      ),
                    },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="rounded-xl border border-border/60 bg-background/40 px-4 py-3"
                    >
                      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {label}
                      </dt>
                      <dd className="mt-1 text-xl font-semibold text-foreground">{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hosts" className="space-y-6">
          <ChartPanel
            title="Hosts by Country"
            description="Distribution of hosts across top markets."
          >
            <BarChart
              queryKey="host_countries_chart"
              parameters={{}}
              xKey="country"
              yKey="host_count"
              height={320}
              colorPalette="categorical"
            />
          </ChartPanel>

          <Card className="glass-panel border-0">
            <CardHeader>
              <CardTitle className="text-base">Host Property Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                queryKey="host_property_summary"
                parameters={{}}
                filterColumn="host_name"
                filterPlaceholder="Search hosts..."
                pageSize={10}
                pageSizeOptions={[10, 25, 50]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card className="glass-panel border-0">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="size-4 text-primary" />
                <CardTitle className="text-base">User Payment Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                queryKey="user_payment_summary"
                parameters={{}}
                filterColumn="name"
                filterPlaceholder="Search users..."
                pageSize={10}
                pageSizeOptions={[10, 25, 50]}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

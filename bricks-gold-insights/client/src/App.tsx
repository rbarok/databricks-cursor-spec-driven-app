import { createBrowserRouter, RouterProvider, NavLink, Outlet, useLocation } from 'react-router';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  TooltipProvider,
  Badge,
  Separator,
} from '@databricks/appkit-ui/react';
import { BarChart3, Database, Home, Layers } from 'lucide-react';
import { AnalyticsPage } from './pages/analytics/AnalyticsPage';
import { HomePage } from './pages/HomePage';
import { ThemeToggle } from './components/ThemeToggle';

const navItems = [
  { to: '/', label: 'Overview', icon: Home, end: true },
  { to: '/analytics', label: 'Analytics', icon: BarChart3, end: false },
] as const;

function SidebarNavItem({
  to,
  label,
  icon: Icon,
  end,
}: {
  to: string;
  label: string;
  icon: typeof Home;
  end?: boolean;
}) {
  const location = useLocation();
  const isActive = end ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive} tooltip={label}>
        <NavLink to={to} end={end}>
          <Icon className="size-4" />
          <span>{label}</span>
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function AppShell() {
  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader className="gap-3 p-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-sm">
              <Layers className="size-4" />
            </div>
            <div className="min-w-0 group-data-[collapsible=icon]:hidden">
              <p className="truncate text-sm font-semibold">Bricks Gold</p>
              <p className="truncate text-xs text-muted-foreground">Insights</p>
            </div>
          </div>
          <Badge variant="outline" className="w-fit rounded-full text-[10px] uppercase tracking-wider group-data-[collapsible=icon]:hidden">
            Unity Catalog
          </Badge>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarNavItem key={item.to} {...item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Data Layer</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-2 px-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2 rounded-lg bg-sidebar-accent/60 px-3 py-2">
                  <Database className="size-3.5 shrink-0 text-primary" />
                  <span className="truncate font-mono">gold-bricks</span>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4 group-data-[collapsible=icon]:hidden">
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            Governed read-only analytics from the Bricks medallion gold layer.
          </p>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b border-border/60 bg-background/70 px-4 backdrop-blur-md md:px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-5" />
          <h1 className="text-sm font-medium text-muted-foreground md:text-base">
            <span className="text-foreground font-semibold">bricks-gold-insights</span>
          </h1>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/analytics', element: <AnalyticsPage /> },
    ],
  },
]);

export default function App() {
  return (
    <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>
  );
}

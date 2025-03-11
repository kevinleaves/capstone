import { Toaster } from '@/components/ui/sonner';
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Button } from '@/components/ui/button';
import { QueryClient } from '@tanstack/react-query';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="">
      <nav className="flex gap-2 border-b-2 border-blue-300 p-4">
        <Button asChild>
          <Link
            to={'/'}
            className="text-3xl [&.active]:font-bold [&.active]:underline text-blue-400"
          >
            Home
          </Link>
        </Button>

        <Button asChild>
          <Link
            to="/cases"
            className="[&.active]:font-bold [&.active]:underline text-blue-400 text-3xl"
          >
            Cases
          </Link>
        </Button>
      </nav>
      <div className="p-8">
        <Outlet />
        <Toaster />
      </div>
      <TanStackRouterDevtools />
    </div>
  );
}

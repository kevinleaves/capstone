import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Link
        to={'/'}
        className="text-3xl [&.active]:font-bold [&.active]:underline text-amber-200"
      >
        Home
      </Link>
      <Link
        to="/cases"
        className="[&.active]:font-bold [&.active]:underline text-amber-200 text-3xl"
      >
        Cases
      </Link>
      <div>Hello "__root"!</div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}

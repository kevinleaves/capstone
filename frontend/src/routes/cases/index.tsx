import { createFileRoute } from '@tanstack/react-router';
import { fetchCases } from '../../utils/cases/fetchCases';

export const Route = createFileRoute('/cases/')({
  loader: () => fetchCases(),
  onError(err) {
    console.error(err);
  },
  errorComponent: ({ error }) => {
    // Render an error message
    return <div>{error.message}</div>;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const cases = Route.useLoaderData();
  return (
    <div>
      Hello "/cases"!
      <pre>{JSON.stringify(cases, null, 2)}</pre>
    </div>
  );
}

import { createFileRoute } from '@tanstack/react-router';
import { fetchCases } from '../../utils/cases/fetchCases';
import CaseList from '@/modules/cases/components/CaseList';

export const Route = createFileRoute('/cases/')({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.fetchQuery({
      queryKey: ['cases'],
      queryFn: () => fetchCases(),
    });
  },
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
  return <div>{<CaseList cases={cases} />}</div>;
}

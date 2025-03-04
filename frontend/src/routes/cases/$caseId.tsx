import { createFileRoute } from '@tanstack/react-router';
import { fetchCases } from '../../utils/cases/fetchCases';

export const Route = createFileRoute('/cases/$caseId')({
  loader: ({ params }) => fetchCases(parseInt(params.caseId)),
  onError(err) {
    console.error(err);
  },
  errorComponent: ({ error }) => {
    // Render an error message
    return <div>{error.message}</div>;
  },

  component: CaseIdComponent,
});

function CaseIdComponent() {
  const { caseId } = Route.useParams();
  const caseData = Route.useLoaderData();

  return (
    <div className="">
      Case ID: {caseId} Hello "/cases/$caseId"!
      <pre>{JSON.stringify(caseData, null, 2)}</pre>
    </div>
  );
}

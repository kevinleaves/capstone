import { useState } from 'react';
import type { Case } from '@/modules/cases/types';
import { createFileRoute } from '@tanstack/react-router';
import { fetchCases } from '../../utils/cases/fetchCases';

import { formatTimestring } from '@/modules/cases/util';
import CaseFormModal from '@/modules/cases/components/CaseFormModal';
import DeleteCaseDialog from '@/modules/cases/components/DeleteCaseDialog';

export const Route = createFileRoute('/cases/$caseId')({
  loader: async ({ context: { queryClient }, params }) => {
    const id = parseInt(params.caseId);

    return queryClient.fetchQuery({
      queryKey: ['case', id],
      queryFn: () => fetchCases(id),
    });
  },
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
  const [caseData, setCaseData] = useState<Case>(Route.useLoaderData());

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between p-4">
        <h1 className="">
          Case <p className="font-bold">{caseData.subject}</p>
        </h1>
        <div className="flex gap-4">
          <CaseFormModal
            buttonText="Edit"
            formMode="edit"
            caseData={caseData}
            setCaseData={setCaseData}
          />

          <DeleteCaseDialog caseData={caseData} />
        </div>
      </div>
      <div className="flex gap-8 p-4">
        <div>
          <p>Priority</p>
          <p>{caseData.priority}</p>
        </div>
        <div>
          <p>Status</p>
          <p>{caseData.status}</p>
        </div>
        <div>
          <p>Case Number</p>
          <p>{caseData.id}</p>
        </div>
      </div>
      <div className="p-4 ">
        <h1 className="font-bold text-3xl mb-4">details</h1>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm">Case Number</p>
            <p>{caseData.id}</p>
          </div>
          <div>
            <p className="text-sm">Date/Time Opened</p>
            <p>{formatTimestring(caseData.dateTimeOpened)}</p>
          </div>
          <div>
            <p className="text-sm">Status</p>
            <p>{caseData.status}</p>
          </div>
          <div>
            <p className="text-sm">Priority</p>
            <p>{caseData.priority}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

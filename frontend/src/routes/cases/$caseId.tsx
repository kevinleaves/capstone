import { useState } from 'react';
import type { Case } from '@/modules/cases/types';
import { createFileRoute } from '@tanstack/react-router';
import { fetchCases } from '../../utils/cases/fetchCases';
import { Button } from '@/components/ui/button';
import { formatTimestring } from '@/modules/cases/util';
import CaseFormModal from '@/modules/cases/components/CaseFormModal';

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
  const [caseData] = useState<Case>(Route.useLoaderData());

  return (
    <div className="flex flex-col gap-4">
      {/* <pre>{JSON.stringify(caseData, null, 2)}</pre> */}
      <div className="flex justify-between p-4">
        <h1 className="">
          Case <p className="font-bold">{caseData.subject}</p>
        </h1>
        <div className="flex gap-4">
          <CaseFormModal
            buttonText="Edit"
            formMode="edit"
            caseData={caseData}
          />
          <Button variant={'outline'}>Edit</Button>
          <Button variant={'destructive'}>Delete</Button>
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

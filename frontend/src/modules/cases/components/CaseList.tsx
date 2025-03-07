import { Case } from '../types';
import CaseListItem from './CaseListItem';
import CaseFormModal from './CaseFormModal';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

interface Props {
  cases: Case[];
}

export default function CaseList({ cases }: Props) {
  return (
    <>
      <h1 className="text-2xl font-bold">CASE LIST</h1>
      <CaseFormModal buttonText="New" formMode="new" />
      <Separator className="my-4" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Case ID</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Date/Time Opened</TableHead>
            <TableHead>Date/Time Closed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cases.map((caseItem) => {
            return <CaseListItem caseItem={caseItem} />;
          })}
        </TableBody>
      </Table>
    </>
  );
}

import { Case } from '../types';
import CaseListItem from './CaseListItem';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Props {
  cases: Case[];
}

export default function CaseList({ cases }: Props) {
  return (
    <>
      <h1 className="text-2xl font-bold">CASE LIST</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Case ID</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Date/Time Opened</TableHead>
            <TableHead>Date/Time Closed</TableHead>
            <TableHead>Actions</TableHead>
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

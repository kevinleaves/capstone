import { Case } from '../types';
import CaseListItem from './CaseListItem';
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
      <Separator className="my-4" />
      <Table className="border-4 border-secondary ">
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead>Case ID</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Date/Time Opened</TableHead>
            <TableHead>Date/Time Closed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border border-gray-100">
          {cases.map((caseItem) => {
            return <CaseListItem caseItem={caseItem} />;
          })}
        </TableBody>
      </Table>
    </>
  );
}

import type { Case } from '../types';
import { TableCell, TableRow } from '@/components/ui/table';
import { Link } from '@tanstack/react-router';
import { Badge } from '@/components/ui/badge';
import {
  formatTimestring,
  getBadgeVariantForPriority,
  getBadgeVariantForStatus,
} from '../util';

interface Props {
  caseItem: Case;
}

export default function CaseListItem({ caseItem }: Props) {
  return (
    <TableRow>
      <TableCell>
        <Link
          to="/cases/$caseId"
          params={{ caseId: String(caseItem.id) }}
          className="hover:underline text-primary"
        >
          {caseItem.id}
        </Link>
      </TableCell>
      <TableCell>
        <Link
          to="/cases/$caseId"
          params={{ caseId: String(caseItem.id) }}
          className="hover:underline text-primary"
        >
          {caseItem.subject}
        </Link>
      </TableCell>
      <TableCell>
        <Badge variant={getBadgeVariantForStatus(caseItem.status)}>
          {caseItem.status}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant={getBadgeVariantForPriority(caseItem.priority)}>
          {caseItem.priority}
        </Badge>
      </TableCell>
      <TableCell>{formatTimestring(caseItem.dateTimeOpened)}</TableCell>
      {caseItem.dateTimeClosed ? (
        <TableCell>{formatTimestring(caseItem.dateTimeClosed)}</TableCell>
      ) : null}
    </TableRow>
  );
}

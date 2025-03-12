import { createFileRoute } from '@tanstack/react-router';
import { fetchCases } from '../../utils/cases/fetchCases';
import CaseList from '@/modules/cases/components/CaseList';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Case } from '@/modules/cases/types';
import { Search } from 'lucide-react';
import CaseFormModal from '@/modules/cases/components/CaseFormModal';

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
  const cases: Case[] = Route.useLoaderData();
  const [filteredCases, setFilteredCases] = useState<Case[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  function onChange(e: Event) {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    const q = newQuery.toLowerCase();

    // use query to filter cases on original state
    const filtered = cases.filter((aCase) => {
      const bool =
        aCase.subject.toLowerCase().includes(q) ||
        aCase.priority.toLowerCase().includes(q) ||
        aCase.status.toLowerCase().includes(q) ||
        aCase.id.toString().includes(q);

      return bool;
    });
    setFilteredCases(filtered);
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">CASE LIST</h1>
        <div className="flex gap-4">
          <CaseFormModal buttonText="New" formMode="new" />
          <div className="flex items-center">
            <Search color="grey" className="m-2" />
            <Input
              type="text"
              placeholder="Search cases..."
              value={searchQuery}
              onChange={onChange}
              className=""
            />
          </div>
        </div>
      </div>

      <CaseList cases={searchQuery === '' ? cases : filteredCases} />
    </div>
  );
}

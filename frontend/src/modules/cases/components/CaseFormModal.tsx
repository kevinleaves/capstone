import { useState } from 'react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import CaseForm from './CaseForm';
import { Button } from '@/components/ui/button';
import { Case } from '../types';

interface Props {
  buttonText: string;
  formMode: 'edit' | 'new';
  caseData?: Case;
  setCaseData: React.Dispatch<React.SetStateAction<Case>>;
}

export default function CaseFormModal({
  caseData,
  buttonText,
  formMode,
  setCaseData,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button variant={'outline'}>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent>
        <CaseForm
          mode={formMode}
          initialData={caseData}
          setIsOpen={setIsOpen}
          setCaseData={setCaseData}
        />
      </DialogContent>
    </Dialog>
  );
}

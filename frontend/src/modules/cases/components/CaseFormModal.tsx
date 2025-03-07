import { useState } from 'react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import CaseForm from './CaseForm';
import { Button } from '@/components/ui/button';
import { Case } from '../types';

interface Props {
  buttonText: string;
  formMode: 'edit' | 'new';
  caseData?: Case;
}

export default function CaseFormModal({
  caseData,
  buttonText,
  formMode,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent>
        <CaseForm
          mode={formMode}
          initialData={caseData}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
}

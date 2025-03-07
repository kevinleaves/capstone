import { useNavigate } from '@tanstack/react-router';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Case } from '../types';
import { deleteCase } from '../util/deleteCase';

interface Props {
  caseData: Case;
}

export default function DeleteCaseDialog({ caseData }: Props) {
  const navigate = useNavigate({ from: '/cases/$caseId' });
  const { id } = caseData;
  // on click, open dialog
  // on confirmation success, trigger toast on

  async function handleDelete() {
    try {
      await deleteCase(id);
      onDeleteSuccess(id);
    } catch (error) {
      console.error('Error deleting case:', error);
      toast('Failed to delete case', {
        description: `Error: ${error}`,
      });
    }
  }

  function onDeleteSuccess(caseId: number) {
    toast(`Case ${caseId} successfully deleted.`);
    navigate({ to: '/cases' });
  }
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant={'destructive'}>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this case?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              case.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

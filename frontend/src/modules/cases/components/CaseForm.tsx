import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Case, CasePriority, CaseStatus } from '../types';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createCase } from '../util/createCase';
import { updateCase } from '../util/updateCase';
import { Separator } from '@/components/ui/separator';

interface Props {
  initialData?: Case;
  mode: 'edit' | 'new';
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCaseData?: React.Dispatch<React.SetStateAction<Case>>;
}

const formSchema = z.object({
  status: z.nativeEnum(CaseStatus),
  priority: z.nativeEnum(CasePriority),
  subject: z
    .string()
    .max(150, {
      message: 'subject must be under 150 characters',
    })
    .nonempty(),
});

export default function CaseForm({
  initialData,
  mode,
  setIsOpen,
  setCaseData,
}: Props) {
  const from = mode == 'new' ? '/cases' : '/cases/$caseId';
  const navigate = useNavigate({ from });

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Case> }) =>
      updateCase(id, data),
    onSuccess: (updatedCaseData, variables) => {
      // trigger rerender
      setCaseData(updatedCaseData);
      queryClient.invalidateQueries({
        queryKey: ['case', variables.id],
      });

      toast(`Case ${variables.id} has been successfully updated!`);
      // Close the modal
      setIsOpen(false);
      // Show success message
    },
    onError: (error) => {
      console.error('Error updating case:', error);
      toast('Failed to update case. Please try again.');
    },
  });

  // define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: initialData?.subject || '',
      priority: initialData?.priority,
      status: initialData?.status,
    },
  });

  // const { formState } = form;
  type FormValues = z.infer<typeof formSchema>;

  // define a submit handler
  async function onSubmit(values: FormValues) {
    // do something with the form values. this process is type-safe and validated
    const formData: Partial<Case> = {
      ...values,
      dateTimeOpened: new Date().toISOString(),
      dateTimeClosed: null,
    };

    // add a timestamp when case is closed
    if (formData.status === 'closed') {
      formData.dateTimeClosed = new Date().toISOString();
    }

    // submit fn changes function depending on modal mode
    if (mode == 'new') {
      await createCase(formData);
      toast('Case has been successfully created!');
      setIsOpen(false);
      navigate({ to: '/cases' });
    } else {
      const newFormData = {
        ...values,
        dateTimeClosed: formData['dateTimeClosed'],
      };
      if (initialData?.id) {
        updateMutation.mutate({
          id: initialData.id,
          data: newFormData,
        });
      }
    }
  }

  return (
    <>
      <h1 className="text-2xl">
        {mode == 'new' ? 'New Case' : `Update Case #${initialData?.id}`}
      </h1>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
          id="caseForm"
        >
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>status</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="case status" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(CaseStatus).map((key) => (
                        <SelectItem
                          value={CaseStatus[key as keyof typeof CaseStatus]}
                        >
                          {CaseStatus[key as keyof typeof CaseStatus]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>case status</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>status</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="case priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(CasePriority).map((key) => (
                        <SelectItem
                          value={CasePriority[key as keyof typeof CasePriority]}
                        >
                          {CasePriority[key as keyof typeof CasePriority]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>case priority</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>status</FormLabel>
                <FormControl>
                  <Input placeholder="case subject" {...field} />
                </FormControl>
                <FormDescription>case subject</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
        <Button type="submit" form="caseForm">
          save
        </Button>
      </Form>
    </>
  );
}

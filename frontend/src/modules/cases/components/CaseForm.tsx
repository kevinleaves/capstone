import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Case, CasePriority, CaseStatus } from '../types';
import { Button } from '@/components/ui/button';
import { useNavigate, useRouter } from '@tanstack/react-router';
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

export default function CaseForm({ initialData, mode, setIsOpen }: Props) {
  const from = mode == 'new' ? '/cases' : '/cases/$caseId';
  const navigate = useNavigate({ from });

  // define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: initialData?.subject || '',
      priority: initialData?.priority,
      status: initialData?.status,
    },
  });

  const { formState } = form;
  type FormValues = z.infer<typeof formSchema>;

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      onSuccess();
    }
  }, [formState]);

  // define a submit handler
  async function onSubmit(values: FormValues) {
    // do something with the form values. this process is type-safe and validated
    const formData = {
      ...values,
      dateTimeOpened: new Date().toISOString(),
      dateTimeClosed: null,
    };

    // submit fn changes function depending on modal mode
    if (mode == 'new') {
      await createCase(formData);
      toast('Case has been successfully created!');
      navigate({ to: '/cases' });
    } else {
      const newFormData = { ...values };
      await updateCase(initialData?.id, newFormData);
    }
  }

  // this fn runs on successful submit
  function onSuccess() {
    setIsOpen(false);
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

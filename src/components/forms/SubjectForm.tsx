import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Subject, Teacher } from '@/types/school';

const subjectSchema = z.object({
  name: z.string().min(2, 'Subject name must be at least 2 characters').max(100),
  code: z.string().min(3, 'Code must be at least 3 characters').max(20),
  coefficient: z.coerce.number().min(1, 'Coefficient must be at least 1').max(10),
  teacher_id: z.string().min(1, 'Please select a teacher'),
});

type SubjectFormData = z.infer<typeof subjectSchema>;

interface SubjectFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: SubjectFormData) => void;
  teachers: Teacher[];
  initialData?: Subject;
  mode?: 'create' | 'edit';
}

export function SubjectForm({
  open,
  onOpenChange,
  onSubmit,
  teachers,
  initialData,
  mode = 'create',
}: SubjectFormProps) {
  const form = useForm<SubjectFormData>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: initialData?.name || '',
      code: initialData?.code || '',
      coefficient: initialData?.coefficient || 1,
      teacher_id: initialData?.teacher_id || '',
    },
  });

  const handleSubmit = (data: SubjectFormData) => {
    onSubmit(data);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Add New Subject' : 'Edit Subject'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Calculus I" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject Code</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., MATH101" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="coefficient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coefficient</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} max={10} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="teacher_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned Teacher</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a teacher" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {teachers.map((teacher) => (
                        <SelectItem key={teacher.id} value={teacher.id}>
                          {teacher.first_name} {teacher.last_name} - {teacher.specialization}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {mode === 'create' ? 'Add Subject' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

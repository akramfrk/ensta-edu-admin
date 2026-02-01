import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/DataTable';
import { StudentForm } from '@/components/forms/StudentForm';
import { DeleteConfirmModal } from '@/components/modals/DeleteConfirmModal';
import { useStudents } from '@/hooks/useSchoolData';
import { Student } from '@/types/school';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export default function Students() {
  const { students, addStudent, updateStudent, deleteStudent } = useStudents();
  const { toast } = useToast();
  
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  const columns = [
    {
      key: 'student_number',
      label: 'Student #',
      sortable: true,
      render: (student: Student) => (
        <span className="font-mono text-sm">{student.student_number}</span>
      ),
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (student: Student) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {student.first_name[0]}{student.last_name[0]}
          </div>
          <span className="font-medium">{student.first_name} {student.last_name}</span>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      render: (student: Student) => (
        <span className="text-muted-foreground">{student.email}</span>
      ),
    },
    {
      key: 'level',
      label: 'Level',
      sortable: true,
      render: (student: Student) => (
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
          {student.level}
        </span>
      ),
    },
    {
      key: 'created_at',
      label: 'Enrolled',
      sortable: true,
      render: (student: Student) => (
        <span className="text-sm text-muted-foreground">
          {format(new Date(student.created_at), 'MMM d, yyyy')}
        </span>
      ),
    },
  ];

  const handleCreate = () => {
    setSelectedStudent(null);
    setFormMode('create');
    setFormOpen(true);
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setFormMode('edit');
    setFormOpen(true);
  };

  const handleDelete = (student: Student) => {
    setSelectedStudent(student);
    setDeleteOpen(true);
  };

  const handleFormSubmit = async (data: Omit<Student, 'id' | 'created_at'>) => {
    try {
      if (formMode === 'create') {
        await addStudent(data);
        toast({
          title: 'Student Added',
          description: `${data.first_name} ${data.last_name} has been added successfully.`,
        });
      } else if (selectedStudent) {
        await updateStudent(selectedStudent.id, data);
        toast({
          title: 'Student Updated',
          description: `${data.first_name} ${data.last_name} has been updated successfully.`,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedStudent) {
      try {
        await deleteStudent(selectedStudent.id);
        toast({
          title: 'Student Deleted',
          description: 'The student has been removed from the system.',
        });
        setDeleteOpen(false);
        setSelectedStudent(null);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete student. Please try again.',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="page-header">
          <h1 className="page-title">Students</h1>
          <p className="page-description">
            Manage student records and enrollments
          </p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Student
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        data={students}
        columns={columns}
        searchKeys={['first_name', 'last_name', 'email', 'student_number']}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Forms & Modals */}
      <StudentForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleFormSubmit}
        initialData={selectedStudent || undefined}
        mode={formMode}
      />

      <DeleteConfirmModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Student"
        description="Are you sure you want to delete this student? This action cannot be undone."
        itemName={selectedStudent ? `${selectedStudent.first_name} ${selectedStudent.last_name}` : undefined}
      />
    </div>
  );
}

import { useState, useEffect } from 'react';
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
      key: 'studentNumber',
      label: 'Student #',
      sortable: true,
      render: (student: Student) => (
        <span className="font-mono text-sm">{student.studentNumber}</span>
      ),
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (student: Student) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {student.firstName[0]}{student.lastName[0]}
          </div>
          <span className="font-medium">{student.firstName} {student.lastName}</span>
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
      key: 'createdAt',
      label: 'Enrolled',
      sortable: true,
      render: (student: Student) => (
        <span className="text-sm text-muted-foreground">
          {format(new Date(student.createdAt), 'MMM d, yyyy')}
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

  const handleFormSubmit = (data: Omit<Student, 'id' | 'createdAt'>) => {
    if (formMode === 'create') {
      addStudent(data);
      toast({
        title: 'Student Added',
        description: `${data.firstName} ${data.lastName} has been added successfully.`,
      });
    } else if (selectedStudent) {
      updateStudent(selectedStudent.id, data);
      toast({
        title: 'Student Updated',
        description: `${data.firstName} ${data.lastName} has been updated successfully.`,
      });
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedStudent) {
      deleteStudent(selectedStudent.id);
      toast({
        title: 'Student Deleted',
        description: 'The student has been removed from the system.',
      });
      setDeleteOpen(false);
      setSelectedStudent(null);
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
        searchKeys={['firstName', 'lastName', 'email', 'studentNumber']}
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
        itemName={selectedStudent ? `${selectedStudent.firstName} ${selectedStudent.lastName}` : undefined}
      />
    </div>
  );
}

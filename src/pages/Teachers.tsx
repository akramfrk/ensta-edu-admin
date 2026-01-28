import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/DataTable';
import { TeacherForm } from '@/components/forms/TeacherForm';
import { DeleteConfirmModal } from '@/components/modals/DeleteConfirmModal';
import { useTeachers } from '@/hooks/useSchoolData';
import { Teacher } from '@/types/school';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export default function Teachers() {
  const { teachers, addTeacher, updateTeacher, deleteTeacher } = useTeachers();
  const { toast } = useToast();
  
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  const columns = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (teacher: Teacher) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10 text-xs font-semibold text-success">
            {teacher.firstName[0]}{teacher.lastName[0]}
          </div>
          <span className="font-medium">{teacher.firstName} {teacher.lastName}</span>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      render: (teacher: Teacher) => (
        <span className="text-muted-foreground">{teacher.email}</span>
      ),
    },
    {
      key: 'specialization',
      label: 'Specialization',
      sortable: true,
      render: (teacher: Teacher) => (
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
          {teacher.specialization}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Joined',
      sortable: true,
      render: (teacher: Teacher) => (
        <span className="text-sm text-muted-foreground">
          {format(new Date(teacher.createdAt), 'MMM d, yyyy')}
        </span>
      ),
    },
  ];

  const handleCreate = () => {
    setSelectedTeacher(null);
    setFormMode('create');
    setFormOpen(true);
  };

  const handleEdit = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setFormMode('edit');
    setFormOpen(true);
  };

  const handleDelete = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setDeleteOpen(true);
  };

  const handleFormSubmit = (data: Omit<Teacher, 'id' | 'createdAt'>) => {
    if (formMode === 'create') {
      addTeacher(data);
      toast({
        title: 'Teacher Added',
        description: `${data.firstName} ${data.lastName} has been added successfully.`,
      });
    } else if (selectedTeacher) {
      updateTeacher(selectedTeacher.id, data);
      toast({
        title: 'Teacher Updated',
        description: `${data.firstName} ${data.lastName} has been updated successfully.`,
      });
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedTeacher) {
      deleteTeacher(selectedTeacher.id);
      toast({
        title: 'Teacher Deleted',
        description: 'The teacher has been removed from the system.',
      });
      setDeleteOpen(false);
      setSelectedTeacher(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="page-header">
          <h1 className="page-title">Teachers</h1>
          <p className="page-description">
            Manage teacher profiles and assignments
          </p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Teacher
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        data={teachers}
        columns={columns}
        searchKeys={['firstName', 'lastName', 'email', 'specialization']}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Forms & Modals */}
      <TeacherForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleFormSubmit}
        initialData={selectedTeacher || undefined}
        mode={formMode}
      />

      <DeleteConfirmModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Teacher"
        description="Are you sure you want to delete this teacher? This action cannot be undone."
        itemName={selectedTeacher ? `${selectedTeacher.firstName} ${selectedTeacher.lastName}` : undefined}
      />
    </div>
  );
}

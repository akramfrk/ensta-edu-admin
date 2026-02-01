import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/DataTable';
import { SubjectForm } from '@/components/forms/SubjectForm';
import { DeleteConfirmModal } from '@/components/modals/DeleteConfirmModal';
import { useSubjects, useTeachers } from '@/hooks/useSchoolData';
import { Subject } from '@/types/school';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export default function Subjects() {
  const { subjects, addSubject, updateSubject, deleteSubject } = useSubjects();
  const { teachers } = useTeachers();
  const { toast } = useToast();
  
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  const getTeacherName = (teacherId: string | null) => {
    if (!teacherId) return 'Unassigned';
    const teacher = teachers.find((t) => t.id === teacherId);
    return teacher ? `${teacher.first_name} ${teacher.last_name}` : 'Unassigned';
  };

  const columns = [
    {
      key: 'code',
      label: 'Code',
      sortable: true,
      render: (subject: Subject) => (
        <span className="font-mono text-sm font-medium">{subject.code}</span>
      ),
    },
    {
      key: 'name',
      label: 'Subject Name',
      sortable: true,
      render: (subject: Subject) => (
        <span className="font-medium">{subject.name}</span>
      ),
    },
    {
      key: 'coefficient',
      label: 'Coefficient',
      sortable: true,
      render: (subject: Subject) => (
        <span className="rounded-full bg-warning/10 px-3 py-1 text-xs font-semibold text-warning">
          {subject.coefficient}
        </span>
      ),
    },
    {
      key: 'teacher_id',
      label: 'Assigned Teacher',
      sortable: true,
      render: (subject: Subject) => (
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success/10 text-xs font-semibold text-success">
            {getTeacherName(subject.teacher_id).split(' ').map(n => n[0]).join('')}
          </div>
          <span className="text-muted-foreground">{getTeacherName(subject.teacher_id)}</span>
        </div>
      ),
    },
    {
      key: 'created_at',
      label: 'Created',
      sortable: true,
      render: (subject: Subject) => (
        <span className="text-sm text-muted-foreground">
          {format(new Date(subject.created_at), 'MMM d, yyyy')}
        </span>
      ),
    },
  ];

  const handleCreate = () => {
    setSelectedSubject(null);
    setFormMode('create');
    setFormOpen(true);
  };

  const handleEdit = (subject: Subject) => {
    setSelectedSubject(subject);
    setFormMode('edit');
    setFormOpen(true);
  };

  const handleDelete = (subject: Subject) => {
    setSelectedSubject(subject);
    setDeleteOpen(true);
  };

  const handleFormSubmit = async (data: Omit<Subject, 'id' | 'created_at'>) => {
    try {
      if (formMode === 'create') {
        await addSubject(data);
        toast({
          title: 'Subject Added',
          description: `${data.name} has been added successfully.`,
        });
      } else if (selectedSubject) {
        await updateSubject(selectedSubject.id, data);
        toast({
          title: 'Subject Updated',
          description: `${data.name} has been updated successfully.`,
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
    if (selectedSubject) {
      try {
        await deleteSubject(selectedSubject.id);
        toast({
          title: 'Subject Deleted',
          description: 'The subject has been removed from the system.',
        });
        setDeleteOpen(false);
        setSelectedSubject(null);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete subject. Please try again.',
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
          <h1 className="page-title">Subjects</h1>
          <p className="page-description">
            Manage courses and subject assignments
          </p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Subject
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        data={subjects}
        columns={columns}
        searchKeys={['name', 'code']}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Forms & Modals */}
      <SubjectForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleFormSubmit}
        teachers={teachers}
        initialData={selectedSubject || undefined}
        mode={formMode}
      />

      <DeleteConfirmModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Subject"
        description="Are you sure you want to delete this subject? This action cannot be undone."
        itemName={selectedSubject?.name}
      />
    </div>
  );
}

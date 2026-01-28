import { Users, GraduationCap, BookOpen, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { useStudents, useTeachers, useSubjects } from '@/hooks/useSchoolData';
import { format } from 'date-fns';

export default function Dashboard() {
  const { students } = useStudents();
  const { teachers } = useTeachers();
  const { subjects } = useSubjects();

  const recentStudents = [...students]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-description">
          Welcome back! Here's an overview of your school.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value={students.length}
          icon={Users}
          variant="primary"
          trend={{ value: 12, label: 'from last month' }}
        />
        <StatCard
          title="Total Teachers"
          value={teachers.length}
          icon={GraduationCap}
          variant="success"
          trend={{ value: 5, label: 'from last month' }}
        />
        <StatCard
          title="Total Subjects"
          value={subjects.length}
          icon={BookOpen}
          variant="warning"
          subtitle="Across all departments"
        />
        <StatCard
          title="Enrollment Rate"
          value="94%"
          icon={TrendingUp}
          variant="primary"
          trend={{ value: 3, label: 'increase' }}
        />
      </div>

      {/* Recent Students */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Students</h2>
          <a
            href="/students"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all
          </a>
        </div>
        <div className="space-y-4">
          {recentStudents.map((student, index) => (
            <div
              key={student.id}
              className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-secondary/30 animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                  {student.firstName[0]}{student.lastName[0]}
                </div>
                <div>
                  <p className="font-medium">
                    {student.firstName} {student.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{student.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{student.level}</p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(student.createdAt), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Students by Level */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="mb-6 text-xl font-semibold">Students by Level</h2>
          <div className="space-y-4">
            {['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'].map((level) => {
              const count = students.filter((s) => s.level === level).length;
              const percentage = students.length > 0 ? (count / students.length) * 100 : 0;
              return (
                <div key={level} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{level}</span>
                    <span className="text-muted-foreground">{count} students</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Teachers by Specialization */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="mb-6 text-xl font-semibold">Teachers by Specialization</h2>
          <div className="space-y-3">
            {teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10 text-sm font-semibold text-success">
                    {teacher.firstName[0]}
                  </div>
                  <span className="font-medium">
                    {teacher.firstName} {teacher.lastName}
                  </span>
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                  {teacher.specialization}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

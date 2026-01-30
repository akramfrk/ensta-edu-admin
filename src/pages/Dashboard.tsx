import { Users, GraduationCap, BookOpen, BarChart3, AlertCircle } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { useStudents, useTeachers, useSubjects } from '@/hooks/useSchoolData';
import { format } from 'date-fns';

export default function Dashboard() {
  const { students } = useStudents();
  const { teachers } = useTeachers();
  const { subjects } = useSubjects();

  // Calculate real statistics
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalSubjects = subjects.length;
  
  // Calculate average coefficient
  const avgCoefficient = subjects.length > 0 
    ? (subjects.reduce((sum, s) => sum + s.coefficient, 0) / subjects.length).toFixed(1)
    : '0';

  // Get students by level with real counts
  const studentsByLevel = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'].map(level => ({
    level,
    count: students.filter(s => s.level === level).length,
    percentage: totalStudents > 0 
      ? ((students.filter(s => s.level === level).length / totalStudents) * 100).toFixed(1)
      : '0'
  }));

  // Get teachers with their subject counts
  const teachersWithSubjects = teachers.map(teacher => ({
    ...teacher,
    subjectCount: subjects.filter(s => s.teacherId === teacher.id).length
  }));

  // Recent students (last 5 added)
  const recentStudents = [...students]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Calculate subject distribution by teacher specialization
  const specializationStats = teachers.reduce((acc, teacher) => {
    const count = subjects.filter(s => s.teacherId === teacher.id).length;
    acc[teacher.specialization] = (acc[teacher.specialization] || 0) + count;
    return acc;
  }, {} as Record<string, number>);

  const hasData = totalStudents > 0 || totalTeachers > 0 || totalSubjects > 0;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-description">
          {hasData 
            ? "Real-time overview of your school data."
            : "Get started by adding students, teachers, and subjects."}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value={totalStudents}
          icon={Users}
          variant="primary"
          subtitle={totalStudents === 0 ? "No students yet" : `Across ${studentsByLevel.filter(l => l.count > 0).length} year levels`}
        />
        <StatCard
          title="Total Teachers"
          value={totalTeachers}
          icon={GraduationCap}
          variant="success"
          subtitle={totalTeachers === 0 ? "No teachers yet" : `${Object.keys(specializationStats).length} specializations`}
        />
        <StatCard
          title="Total Subjects"
          value={totalSubjects}
          icon={BookOpen}
          variant="warning"
          subtitle={totalSubjects === 0 ? "No subjects yet" : `Avg. coefficient: ${avgCoefficient}`}
        />
        <StatCard
          title="Student-Teacher Ratio"
          value={totalTeachers > 0 ? `${(totalStudents / totalTeachers).toFixed(1)}:1` : 'N/A'}
          icon={BarChart3}
          variant="primary"
          subtitle={totalTeachers === 0 ? "Add teachers first" : "Students per teacher"}
        />
      </div>

      {/* Empty State */}
      {!hasData && (
        <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No Data Yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Start by adding teachers, then subjects, and finally students to see your dashboard come to life.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <a href="/teachers" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Add Teachers
            </a>
            <a href="/subjects" className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80">
              Add Subjects
            </a>
            <a href="/students" className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80">
              Add Students
            </a>
          </div>
        </div>
      )}

      {/* Recent Students */}
      {recentStudents.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Students</h2>
            <a
              href="/students"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all ({totalStudents})
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
      )}

      {/* Quick Stats Grid */}
      {hasData && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Students by Level */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h2 className="mb-6 text-xl font-semibold">Students by Level</h2>
            {totalStudents === 0 ? (
              <p className="text-sm text-muted-foreground">No students enrolled yet.</p>
            ) : (
              <div className="space-y-4">
                {studentsByLevel.map(({ level, count, percentage }) => (
                  <div key={level} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{level}</span>
                      <span className="text-muted-foreground">{count} students ({percentage}%)</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Teachers & Their Subjects */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h2 className="mb-6 text-xl font-semibold">Teachers & Subjects</h2>
            {totalTeachers === 0 ? (
              <p className="text-sm text-muted-foreground">No teachers added yet.</p>
            ) : (
              <div className="space-y-3">
                {teachersWithSubjects.map((teacher) => (
                  <div
                    key={teacher.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10 text-sm font-semibold text-success">
                        {teacher.firstName[0]}
                      </div>
                      <div>
                        <span className="font-medium">
                          {teacher.firstName} {teacher.lastName}
                        </span>
                        <p className="text-xs text-muted-foreground">{teacher.specialization}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                      {teacher.subjectCount} subject{teacher.subjectCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Summary Statistics */}
      {hasData && (
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="mb-6 text-xl font-semibold">Summary Statistics</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-secondary/50 p-4">
              <p className="text-sm text-muted-foreground">Total Coefficient Points</p>
              <p className="text-2xl font-bold">{subjects.reduce((sum, s) => sum + s.coefficient, 0)}</p>
            </div>
            <div className="rounded-lg bg-secondary/50 p-4">
              <p className="text-sm text-muted-foreground">Subjects per Teacher</p>
              <p className="text-2xl font-bold">
                {totalTeachers > 0 ? (totalSubjects / totalTeachers).toFixed(1) : '0'}
              </p>
            </div>
            <div className="rounded-lg bg-secondary/50 p-4">
              <p className="text-sm text-muted-foreground">Most Common Level</p>
              <p className="text-2xl font-bold">
                {studentsByLevel.sort((a, b) => b.count - a.count)[0]?.count > 0 
                  ? studentsByLevel.sort((a, b) => b.count - a.count)[0].level 
                  : 'N/A'}
              </p>
            </div>
            <div className="rounded-lg bg-secondary/50 p-4">
              <p className="text-sm text-muted-foreground">Teachers with Subjects</p>
              <p className="text-2xl font-bold">
                {teachersWithSubjects.filter(t => t.subjectCount > 0).length} / {totalTeachers}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

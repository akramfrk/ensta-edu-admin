export interface Student {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  student_number: string;
  level: string;
  created_at: string;
}

export interface Teacher {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  specialization: string;
  created_at: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  coefficient: number;
  teacher_id: string | null;
  teacher?: Teacher;
  created_at: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalSubjects: number;
  recentStudents: Student[];
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  studentNumber: string;
  level: string;
  createdAt: Date;
}

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  specialization: string;
  createdAt: Date;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  coefficient: number;
  teacherId: string;
  teacher?: Teacher;
  createdAt: Date;
}

export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalSubjects: number;
  recentStudents: Student[];
}

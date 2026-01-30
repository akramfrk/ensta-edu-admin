import { useState, useCallback, useEffect } from 'react';
import { Student, Teacher, Subject } from '@/types/school';

const STORAGE_KEYS = {
  students: 'school_students',
  teachers: 'school_teachers',
  subjects: 'school_subjects',
};

function loadFromStorage<T>(key: string): T[] {
  try {
    const data = localStorage.getItem(key);
    if (data) {
      const parsed = JSON.parse(data);
      return parsed.map((item: T & { createdAt: string }) => ({
        ...item,
        createdAt: new Date(item.createdAt),
      }));
    }
  } catch (e) {
    console.error(`Error loading ${key} from storage:`, e);
  }
  return [];
}

function saveToStorage<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

function generateUniqueId(): string {
  return `${Date.now()}-${crypto.randomUUID()}`;
}

export function useStudents() {
  const [students, setStudents] = useState<Student[]>(() => 
    loadFromStorage<Student>(STORAGE_KEYS.students)
  );

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.students, students);
  }, [students]);

  const addStudent = useCallback((student: Omit<Student, 'id' | 'createdAt'>) => {
    const newStudent: Student = {
      ...student,
      id: generateUniqueId(),
      createdAt: new Date(),
    };
    setStudents(prev => [...prev, newStudent]);
    return newStudent;
  }, []);

  const updateStudent = useCallback((id: string, data: Partial<Student>) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id ? { ...student, ...data } : student
      )
    );
  }, []);

  const deleteStudent = useCallback((id: string) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  }, []);

  return { students, addStudent, updateStudent, deleteStudent };
}

export function useTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>(() => 
    loadFromStorage<Teacher>(STORAGE_KEYS.teachers)
  );

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.teachers, teachers);
  }, [teachers]);

  const addTeacher = useCallback((teacher: Omit<Teacher, 'id' | 'createdAt'>) => {
    const newTeacher: Teacher = {
      ...teacher,
      id: generateUniqueId(),
      createdAt: new Date(),
    };
    setTeachers(prev => [...prev, newTeacher]);
    return newTeacher;
  }, []);

  const updateTeacher = useCallback((id: string, data: Partial<Teacher>) => {
    setTeachers(prev =>
      prev.map(teacher =>
        teacher.id === id ? { ...teacher, ...data } : teacher
      )
    );
  }, []);

  const deleteTeacher = useCallback((id: string) => {
    setTeachers(prev => prev.filter(teacher => teacher.id !== id));
  }, []);

  return { teachers, addTeacher, updateTeacher, deleteTeacher };
}

export function useSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>(() => 
    loadFromStorage<Subject>(STORAGE_KEYS.subjects)
  );

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.subjects, subjects);
  }, [subjects]);

  const addSubject = useCallback((subject: Omit<Subject, 'id' | 'createdAt'>) => {
    const newSubject: Subject = {
      ...subject,
      id: generateUniqueId(),
      createdAt: new Date(),
    };
    setSubjects(prev => [...prev, newSubject]);
    return newSubject;
  }, []);

  const updateSubject = useCallback((id: string, data: Partial<Subject>) => {
    setSubjects(prev =>
      prev.map(subject =>
        subject.id === id ? { ...subject, ...data } : subject
      )
    );
  }, []);

  const deleteSubject = useCallback((id: string) => {
    setSubjects(prev => prev.filter(subject => subject.id !== id));
  }, []);

  return { subjects, addSubject, updateSubject, deleteSubject };
}

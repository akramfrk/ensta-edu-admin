import { useState, useCallback } from 'react';
import { Student, Teacher, Subject } from '@/types/school';
import { mockStudents, mockTeachers, mockSubjects } from '@/data/mockData';

export function useStudents() {
  const [students, setStudents] = useState<Student[]>(mockStudents);

  const addStudent = useCallback((student: Omit<Student, 'id' | 'createdAt'>) => {
    const newStudent: Student = {
      ...student,
      id: crypto.randomUUID(),
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
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);

  const addTeacher = useCallback((teacher: Omit<Teacher, 'id' | 'createdAt'>) => {
    const newTeacher: Teacher = {
      ...teacher,
      id: crypto.randomUUID(),
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
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);

  const addSubject = useCallback((subject: Omit<Subject, 'id' | 'createdAt'>) => {
    const newSubject: Subject = {
      ...subject,
      id: crypto.randomUUID(),
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

import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Student, Teacher, Subject } from '@/types/school';

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching students:', error);
    } else {
      setStudents(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const addStudent = useCallback(async (student: Omit<Student, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('students')
      .insert(student)
      .select()
      .single();
    
    if (error) {
      console.error('Error adding student:', error);
      throw error;
    }
    
    setStudents(prev => [data, ...prev]);
    return data;
  }, []);

  const updateStudent = useCallback(async (id: string, updates: Partial<Student>) => {
    const { error } = await supabase
      .from('students')
      .update(updates)
      .eq('id', id);
    
    if (error) {
      console.error('Error updating student:', error);
      throw error;
    }
    
    setStudents(prev =>
      prev.map(student =>
        student.id === id ? { ...student, ...updates } : student
      )
    );
  }, []);

  const deleteStudent = useCallback(async (id: string) => {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
    
    setStudents(prev => prev.filter(student => student.id !== id));
  }, []);

  return { students, loading, addStudent, updateStudent, deleteStudent, refetch: fetchStudents };
}

export function useTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTeachers = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching teachers:', error);
    } else {
      setTeachers(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const addTeacher = useCallback(async (teacher: Omit<Teacher, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('teachers')
      .insert(teacher)
      .select()
      .single();
    
    if (error) {
      console.error('Error adding teacher:', error);
      throw error;
    }
    
    setTeachers(prev => [data, ...prev]);
    return data;
  }, []);

  const updateTeacher = useCallback(async (id: string, updates: Partial<Teacher>) => {
    const { error } = await supabase
      .from('teachers')
      .update(updates)
      .eq('id', id);
    
    if (error) {
      console.error('Error updating teacher:', error);
      throw error;
    }
    
    setTeachers(prev =>
      prev.map(teacher =>
        teacher.id === id ? { ...teacher, ...updates } : teacher
      )
    );
  }, []);

  const deleteTeacher = useCallback(async (id: string) => {
    const { error } = await supabase
      .from('teachers')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting teacher:', error);
      throw error;
    }
    
    setTeachers(prev => prev.filter(teacher => teacher.id !== id));
  }, []);

  return { teachers, loading, addTeacher, updateTeacher, deleteTeacher, refetch: fetchTeachers };
}

export function useSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubjects = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching subjects:', error);
    } else {
      setSubjects(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  const addSubject = useCallback(async (subject: Omit<Subject, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('subjects')
      .insert(subject)
      .select()
      .single();
    
    if (error) {
      console.error('Error adding subject:', error);
      throw error;
    }
    
    setSubjects(prev => [data, ...prev]);
    return data;
  }, []);

  const updateSubject = useCallback(async (id: string, updates: Partial<Subject>) => {
    const { error } = await supabase
      .from('subjects')
      .update(updates)
      .eq('id', id);
    
    if (error) {
      console.error('Error updating subject:', error);
      throw error;
    }
    
    setSubjects(prev =>
      prev.map(subject =>
        subject.id === id ? { ...subject, ...updates } : subject
      )
    );
  }, []);

  const deleteSubject = useCallback(async (id: string) => {
    const { error } = await supabase
      .from('subjects')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting subject:', error);
      throw error;
    }
    
    setSubjects(prev => prev.filter(subject => subject.id !== id));
  }, []);

  return { subjects, loading, addSubject, updateSubject, deleteSubject, refetch: fetchSubjects };
}

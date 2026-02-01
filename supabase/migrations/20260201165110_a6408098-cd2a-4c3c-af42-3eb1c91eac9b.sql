-- Create teachers table
CREATE TABLE public.teachers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  specialization TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create students table
CREATE TABLE public.students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  student_number TEXT NOT NULL UNIQUE,
  level TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create subjects table with foreign key to teachers
CREATE TABLE public.subjects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  coefficient INTEGER NOT NULL DEFAULT 1,
  teacher_id UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS but with public access policies
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;

-- Public read/write policies for teachers
CREATE POLICY "Allow public read on teachers" ON public.teachers FOR SELECT USING (true);
CREATE POLICY "Allow public insert on teachers" ON public.teachers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on teachers" ON public.teachers FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on teachers" ON public.teachers FOR DELETE USING (true);

-- Public read/write policies for students
CREATE POLICY "Allow public read on students" ON public.students FOR SELECT USING (true);
CREATE POLICY "Allow public insert on students" ON public.students FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on students" ON public.students FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on students" ON public.students FOR DELETE USING (true);

-- Public read/write policies for subjects
CREATE POLICY "Allow public read on subjects" ON public.subjects FOR SELECT USING (true);
CREATE POLICY "Allow public insert on subjects" ON public.subjects FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on subjects" ON public.subjects FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on subjects" ON public.subjects FOR DELETE USING (true);
# Higher School Management System

**Technical & Database-Oriented Project**

## Project Overview

The **Higher School Management System (HSMS)** is a web-based application developed to support **academic and administrative data management** within a higher education institution.

The system provides an **admin dashboard** that allows administrators to manage:

- Students
    
- Teachers
    
- Subjects
    
- Student–Subject enrollments
    

This project is primarily focused on **database design, normalization, relationships, and CRUD operations**, following software engineering and database administration principles.

---

## Key Features

- Full **CRUD operations** for all entities
    
- Student enrollment management
    
- Teacher specialization tracking
    
- Subject management with coefficients
    
- Many-to-many relationship between students and subjects
    
- Real-time dashboard statistics
    
- Search, sorting, and pagination
    
- Form validation with error handling
    
- Responsive admin interface
    
- Auto-generated unique identifiers (UUID)
    

---

## Technology Stack

### Frontend

- **React 18**
    
- **TypeScript**
    
- **Vite** (build tool)
    
- **Tailwind CSS** (styling)
    
- **shadcn/ui** (UI components)
    
- **React Router DOM** (client-side routing)
    
- **React Hook Form + Zod** (form handling and validation)
    

### State Management

- React Hooks (`useState`, `useCallback`)
    
- Local in-memory state (current implementation)
    

---

## Recommended Production Stack (Database-Oriented)

For a production-ready and persistent system, the following stack is recommended:

|Layer|Technology|
|---|---|
|Database|PostgreSQL|
|ORM|Prisma|
|Backend|Supabase Edge Functions|
|Hosting|Supabase / Lovable Cloud|

---

## Database Design

### Core Entities

- **Student**
    
- **Teacher**
    
- **Subject**
    
- **Student_Subject** (junction table)
    

The database is designed using a **relational model** and normalized to **Third Normal Form (3NF)** to ensure data integrity and avoid redundancy.

---

### Relationships & Cardinality

- **Teacher → Subject** : One-to-Many (1:N)  
    One teacher can teach multiple subjects.
    
- **Student ↔ Subject** : Many-to-Many (M:N)  
    Implemented using a junction table (`student_subjects`).
    

---

## Database Constraints & Integrity

- UUID primary keys
    
- Unique constraints on:
    
    - Emails
        
    - Student numbers
        
    - Subject codes
        
- Foreign key constraints with cascading rules
    
- Check constraints for:
    
    - Academic level
        
    - Subject coefficient range
        
- Indexed columns for query optimization
    

---

## Database Normalization

The schema follows **3NF**:

### First Normal Form (1NF)

- Atomic values
    
- No repeating groups
    
- Unique primary keys
    

### Second Normal Form (2NF)

- No partial dependencies
    
- All non-key attributes depend on the full primary key
    

### Third Normal Form (3NF)

- No transitive dependencies
    
- Teacher information stored only in `teachers`
    
- Subjects reference teachers via foreign keys
    

---

## Application Architecture

The system follows a **layered architecture**:

1. **Presentation Layer**
    
    - React UI components
        
    - Admin dashboard
        
2. **Application Layer**
    
    - CRUD logic
        
    - Validation
        
    - Business rules
        
3. **Data Layer**
    
    - Relational database schema
        
    - ORM-based access (recommended)
        

---


## CRUD Operations

- **Create**: Add students, teachers, subjects, enrollments
    
- **Read**: Display lists with pagination and search
    
- **Update**: Edit existing records
    
- **Delete**: Remove records with cascade handling
    

Current implementation uses **local state** for data storage (non-persistent), intended for academic demonstration.

---

## Limitations (Current Version)

- No persistent database connection
    
- Data lost on page refresh
    
- Single-user environment
    
- No authentication
    

---

## Future Improvements

- PostgreSQL integration
    
- Persistent data storage
    
- Authentication & role-based access
    
- Attendance and grade management
    
- Reporting and data export
    
- Performance optimization (indexes, caching)
    

---

## Academic Context

This project was developed as part of a **Database Administration / Software Engineering assignment**, with emphasis on:

- Database modeling
    
- UML and ER diagrams
    
- Normalization
    
- CRUD-based administrative systems
    

---

## Author

**Akram**  
Artificial Intelligence & Applications  
Higher School of Advanced Technologies (ENSTA)

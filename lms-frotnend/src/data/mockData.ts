export type UserRole = 'admin' | 'instructor' | 'student';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  instructorId: number;
  instructorName: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  enrolledCount: number;
  rating: number;
  modules: Module[];
}

export interface Module {
  id: number;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  type: 'video' | 'document' | 'quiz';
  content: string;
  duration: string;
  order: number;
  completed?: boolean;
  quiz?: Quiz;
}

export interface Quiz {
  id: number;
  title: string;
  questions: Question[];
  passingScore: number;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctOption: number;
}

export interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  enrolledDate: string;
  progress: number;
  completed: boolean;
  certificateIssued: boolean;
}

// Mock Users
export const users: User[] = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@cadd-center.com',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AU'
  },
  {
    id: 2,
    name: 'John Instructor',
    email: 'john@cadd-center.com',
    role: 'instructor',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=JI'
  },
  {
    id: 3,
    name: 'Sarah Student',
    email: 'sarah@example.com',
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=SS'
  }
];

// Mock Courses
export const courses: Course[] = [
  {
    id: 1,
    title: 'AutoCAD Essentials',
    description: 'Learn the fundamentals of AutoCAD, from basic drawing tools to advanced techniques.',
    thumbnail: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    instructorId: 2,
    instructorName: 'John Instructor',
    duration: '20 hours',
    level: 'Beginner',
    category: 'CAD',
    enrolledCount: 120,
    rating: 4.7,
    modules: [
      {
        id: 101,
        title: 'Getting Started with AutoCAD',
        description: 'Introduction to AutoCAD interface and basic tools',
        order: 1,
        lessons: [
          {
            id: 1001,
            title: 'AutoCAD Interface Overview',
            type: 'video',
            content: 'https://example.com/video1.mp4',
            duration: '15:30',
            order: 1,
            completed: true
          },
          {
            id: 1002,
            title: 'Basic Drawing Tools',
            type: 'video',
            content: 'https://example.com/video2.mp4',
            duration: '20:45',
            order: 2
          },
          {
            id: 1003,
            title: 'Module 1 Quiz',
            type: 'quiz',
            content: '',
            duration: '10:00',
            order: 3,
            quiz: {
              id: 201,
              title: 'AutoCAD Basics Quiz',
              questions: [
                {
                  id: 301,
                  text: 'Which tool is used to create a straight line in AutoCAD?',
                  options: ['Circle', 'Line', 'Rectangle', 'Arc'],
                  correctOption: 1
                },
                {
                  id: 302,
                  text: 'What is the keyboard shortcut to open the Layer Properties Manager?',
                  options: ['LM', 'LA', 'LY', 'LP'],
                  correctOption: 1
                }
              ],
              passingScore: 70
            }
          }
        ]
      },
      {
        id: 102,
        title: '2D Drawing and Editing',
        description: 'Master 2D drawing and editing tools in AutoCAD',
        order: 2,
        lessons: [
          {
            id: 1004,
            title: 'Advanced Line Work',
            type: 'video',
            content: 'https://example.com/video3.mp4',
            duration: '25:10',
            order: 1
          },
          {
            id: 1005,
            title: 'Editing Objects',
            type: 'video',
            content: 'https://example.com/video4.mp4',
            duration: '18:30',
            order: 2
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Revit for BIM Professionals',
    description: 'Comprehensive guide to using Autodesk Revit for Building Information Modeling.',
    thumbnail: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    instructorId: 2,
    instructorName: 'John Instructor',
    duration: '30 hours',
    level: 'Intermediate',
    category: 'BIM',
    enrolledCount: 85,
    rating: 4.8,
    modules: [
      {
        id: 103,
        title: 'Revit Fundamentals',
        description: 'Learn the basics of Revit interface and tools',
        order: 1,
        lessons: [
          {
            id: 1006,
            title: 'Revit Interface Overview',
            type: 'video',
            content: 'https://example.com/video5.mp4',
            duration: '22:15',
            order: 1
          },
          {
            id: 1007,
            title: 'Creating a Building Model',
            type: 'video',
            content: 'https://example.com/video6.mp4',
            duration: '28:40',
            order: 2
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: '3D Modeling with SolidWorks',
    description: 'Learn to create complex 3D models using SolidWorks CAD software.',
    thumbnail: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    instructorId: 2,
    instructorName: 'John Instructor',
    duration: '25 hours',
    level: 'Advanced',
    category: 'CAD',
    enrolledCount: 62,
    rating: 4.6,
    modules: []
  },
  {
    id: 4,
    title: 'Fusion 360 for Beginners',
    description: 'Master parametric modeling and design with Autodesk Fusion 360. Learn to create complex 3D designs for manufacturing.',
    thumbnail: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    instructorId: 2,
    instructorName: 'John Instructor',
    duration: '25 hours',
    level: 'Beginner',
    category: 'CAD',
    enrolledCount: 75,
    rating: 4.8,
    modules: []
  },
  {
    id: 5,
    title: '3D Printing Fundamentals',
    description: 'Learn the basics of 3D printing technology, from printer setup to material selection and optimizing print quality.',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    instructorId: 2,
    instructorName: 'John Instructor',
    duration: '15 hours',
    level: 'Beginner',
    category: 'Manufacturing',
    enrolledCount: 92,
    rating: 4.6,
    modules: []
  },
  {
    id: 6,
    title: 'Laser Cutting and CNC Fabrication',
    description: 'Comprehensive guide to laser cutting technology, CNC operations, and digital fabrication techniques.',
    thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    instructorId: 2,
    instructorName: 'John Instructor',
    duration: '20 hours',
    level: 'Intermediate',
    category: 'Manufacturing',
    enrolledCount: 45,
    rating: 4.7,
    modules: []
  },
  {
    id: 7,
    title: 'Advanced Fusion 360: Simulation and Analysis',
    description: 'Take your Fusion 360 skills to the next level with FEA simulation, stress analysis, and advanced modeling techniques.',
    thumbnail: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    instructorId: 2,
    instructorName: 'John Instructor',
    duration: '30 hours',
    level: 'Advanced',
    category: 'CAD',
    enrolledCount: 38,
    rating: 4.9,
    modules: []
  }
];

// Mock Enrollments
export const enrollments: Enrollment[] = [
  {
    id: 1,
    userId: 3,
    courseId: 1,
    enrolledDate: '2023-05-15',
    progress: 35,
    completed: false,
    certificateIssued: false
  },
  {
    id: 2,
    userId: 3,
    courseId: 2,
    enrolledDate: '2023-06-10',
    progress: 20,
    completed: false,
    certificateIssued: false
  }
];

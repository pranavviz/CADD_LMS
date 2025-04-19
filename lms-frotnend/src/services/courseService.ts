
import api from '@/lib/axios';
import { Course } from '@/data/mockData';

export const courseService = {
  getAllCourses: async () => {
    const response = await api.get<Course[]>('/courses');
    return response.data;
  },

  getCourseById: async (id: number) => {
    const response = await api.get<Course>(`/courses/${id}`);
    return response.data;
  },

  createCourse: async (courseData: Partial<Course>) => {
    const response = await api.post('/courses', courseData);
    return response.data;
  },

  updateCourse: async (id: number, courseData: Partial<Course>) => {
    const response = await api.put(`/courses/${id}`, courseData);
    return response.data;
  },

  deleteCourse: async (id: number) => {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  },

  // Course modules
  getCourseModules: async (courseId: number) => {
    const response = await api.get(`/courses/${courseId}/modules`);
    return response.data;
  },

  // Module lessons
  getModuleLessons: async (moduleId: number) => {
    const response = await api.get(`/modules/${moduleId}/lessons`);
    return response.data;
  },

  // Enrollments
  enrollInCourse: async (courseId: number, userId: number) => {
    const response = await api.post('/enrollments', { courseId, userId });
    return response.data;
  },

  getUserEnrollments: async (userId: number) => {
    const response = await api.get(`/enrollments/${userId}`);
    return response.data;
  },

  updateEnrollmentStatus: async (userId: number, courseId: number, status: any) => {
    const response = await api.put(`/enrollments/${userId}/${courseId}`, { status });
    return response.data;
  },

  unenrollFromCourse: async (userId: number, courseId: number) => {
    const response = await api.delete(`/enrollments/${userId}/${courseId}`);
    return response.data;
  }
};


import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CourseCard from '@/components/courses/CourseCard';
import { courses } from '@/data/mockData';
import { BookOpen, GraduationCap, Users, Award, ArrowRight } from 'lucide-react';

const Index = () => {
  const featuredCourses = courses.slice(0, 3);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-sky-100">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-sm font-medium text-primary mb-2">Welcome to CADD Center</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Transform Your Career with CAD & BIM Skills</h1>
              <p className="text-lg text-gray-600 mb-8">
                Learn industry-standard design software from certified instructors. 
                Get hands-on experience with AutoCAD, Revit, SolidWorks, and more.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/courses">
                  <Button size="lg" className="rounded-md">
                    Explore Courses
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outline" size="lg" className="rounded-md">
                    Join for Free
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="CAD Design" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="text-2xl sm:text-3xl font-bold">20+</h3>
              <p className="text-gray-600">Courses</p>
            </div>
            <div className="text-center p-4">
              <GraduationCap className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="text-2xl sm:text-3xl font-bold">5,000+</h3>
              <p className="text-gray-600">Graduates</p>
            </div>
            <div className="text-center p-4">
              <Users className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="text-2xl sm:text-3xl font-bold">15+</h3>
              <p className="text-gray-600">Expert Instructors</p>
            </div>
            <div className="text-center p-4">
              <Award className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="text-2xl sm:text-3xl font-bold">98%</h3>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Courses */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Courses</h2>
            <Link to="/courses" className="text-primary flex items-center hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="course-card-grid">
            {featuredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose CADD Center</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide industry-focused training that helps you build real-world skills and get hired faster.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-sm border">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Industry Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from certified professionals with extensive experience in CAD and BIM projects.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-sm border">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Hands-On Learning</h3>
              <p className="text-gray-600">
                Practice with real-world projects and build a portfolio while you learn.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-sm border">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Recognized Certificates</h3>
              <p className="text-gray-600">
                Earn industry-recognized certificates to boost your career prospects.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 px-4 bg-primary text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of students who have advanced their careers with our training programs.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/courses">
              <Button variant="secondary" size="lg">Explore All Courses</Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="lg" className="bg-transparent">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

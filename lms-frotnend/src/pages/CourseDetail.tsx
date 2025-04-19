
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { courses, enrollments } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import LessonCard from '@/components/courses/LessonCard';
import { useToast } from '@/hooks/use-toast';
import { Play, Clock, BookOpen, Users, Award, CheckCircle2 } from 'lucide-react';

const CourseDetail = () => {
  const { courseId } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [enrolling, setEnrolling] = useState(false);
  
  const course = courses.find(c => c.id === Number(courseId));
  
  if (!course) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
        <p className="mb-8">The course you're looking for doesn't exist or has been removed.</p>
        <Link to="/courses">
          <Button>Browse All Courses</Button>
        </Link>
      </div>
    );
  }
  
  // Check if user is enrolled
  const isEnrolled = user && enrollments.some(
    e => e.userId === user.id && e.courseId === course.id
  );
  
  // Calculate total lessons and duration
  const totalLessons = course.modules.reduce(
    (sum, module) => sum + module.lessons.length, 0
  );
  
  const handleEnroll = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to enroll in this course.",
        variant: "destructive"
      });
      return;
    }
    
    setEnrolling(true);
    
    // Simulate enrollment process
    setTimeout(() => {
      toast({
        title: "Successfully Enrolled",
        description: `You have been enrolled in ${course.title}.`
      });
      setEnrolling(false);
      // In a real app, we would update the enrollments state or make an API call
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Course Header */}
      <div className="bg-muted/30 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>{course.category}</Badge>
              <Badge variant="outline">{course.level}</Badge>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg mb-4">{course.description}</p>
            
            <div className="flex items-center mb-6">
              <p className="text-sm">Created by <span className="font-medium">{course.instructorName}</span></p>
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{totalLessons} lessons</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{course.enrolledCount} students</span>
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-1 text-yellow-500" />
                <span>{course.rating} rating</span>
              </div>
            </div>
          </div>
          
          {/* Action Card */}
          <div>
            <Card className="p-6">
              <div className="aspect-video mb-4 rounded-md overflow-hidden bg-muted relative">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="h-14 w-14 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                    <Play className="h-6 w-6 text-primary ml-1" />
                  </div>
                </div>
              </div>
              
              {isEnrolled ? (
                <div className="space-y-4">
                  <div className="flex items-center text-green-600 bg-green-50 p-3 rounded-md">
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    <span className="font-medium">You're enrolled in this course</span>
                  </div>
                  <Link to={`/courses/${course.id}/modules/${course.modules[0]?.id}/lessons/${course.modules[0]?.lessons[0]?.id}`}>
                    <Button className="w-full">Continue Learning</Button>
                  </Link>
                </div>
              ) : (
                <Button 
                  onClick={handleEnroll} 
                  disabled={enrolling} 
                  className="w-full"
                >
                  {enrolling ? "Enrolling..." : "Enroll Now"}
                </Button>
              )}
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Full lifetime access
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Course Content Tabs */}
      <Tabs defaultValue="curriculum">
        <TabsList className="mb-6 w-full sm:w-auto">
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="instructor">Instructor</TabsTrigger>
        </TabsList>
        
        <TabsContent value="curriculum">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Course Content</h2>
            <p className="text-muted-foreground">
              {course.modules.length} modules • {totalLessons} lessons • {course.duration} total length
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {course.modules.map((module) => (
              <AccordionItem key={module.id} value={`module-${module.id}`}>
                <AccordionTrigger className="hover:no-underline">
                  <div>
                    <p className="font-medium text-left">{module.title}</p>
                    <p className="text-sm text-muted-foreground text-left">
                      {module.lessons.length} lessons
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 mt-2">
                    {module.lessons.map((lesson) => (
                      <LessonCard
                        key={lesson.id}
                        lesson={lesson}
                        courseId={course.id}
                        moduleId={module.id}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
        
        <TabsContent value="overview">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">About This Course</h2>
            <p className="mb-6">
              This comprehensive course is designed to give you the skills and knowledge needed to excel in the field of {course.category}. 
              Through a series of practical lessons and hands-on exercises, you'll master the fundamentals and move on to advanced techniques.
            </p>
            
            <h3 className="text-lg font-bold mb-3">What You'll Learn</h3>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>Understand the core principles of {course.category} design</li>
              <li>Master industry-standard software tools and techniques</li>
              <li>Create professional-quality models and documentation</li>
              <li>Implement best practices for efficient workflow</li>
              <li>Collaborate effectively with team members on complex projects</li>
              <li>Prepare for professional certification exams</li>
            </ul>
            
            <h3 className="text-lg font-bold mb-3">Requirements</h3>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>Basic computer skills</li>
              <li>Software required: {course.category === 'CAD' ? 'AutoCAD or equivalent software' : 'Revit or equivalent BIM software'}</li>
              <li>No prior experience in {course.category} is required for beginner courses</li>
              {course.level !== 'Beginner' && (
                <li>Previous experience with basic {course.category} concepts is recommended</li>
              )}
            </ul>
            
            <h3 className="text-lg font-bold mb-3">Target Audience</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Students pursuing careers in architecture, engineering, or construction</li>
              <li>Professionals looking to update their technical skills</li>
              <li>Anyone interested in learning {course.category} for personal or professional projects</li>
              <li>Career changers entering the AEC industry</li>
            </ul>
          </Card>
        </TabsContent>
        
        <TabsContent value="instructor">
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img 
                  src="https://api.dicebear.com/7.x/initials/svg?seed=JI" 
                  alt={course.instructorName} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">{course.instructorName}</h2>
                <p className="text-muted-foreground mb-4">{course.category} Specialist & Senior Instructor</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm mb-6">
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-2 text-yellow-500" />
                    <span>4.8 Instructor Rating</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>500+ Students</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>5 Courses</span>
                  </div>
                </div>
                
                <p className="mb-4">
                  John is a certified {course.category} professional with over 10 years of industry experience. 
                  He has worked on numerous projects for leading architecture and engineering firms, 
                  specializing in complex modeling and documentation.
                </p>
                <p>
                  As an instructor, John is known for his clear explanations and practical approach to teaching 
                  technical concepts, helping students build real-world skills that are immediately applicable in 
                  professional settings.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseDetail;

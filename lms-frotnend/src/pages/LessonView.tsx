
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courses } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight, BookOpen, FileText, Video } from 'lucide-react';
import ProgressBar from '@/components/common/ProgressBar';
import QuizComponent from '@/components/courses/QuizComponent';
import Certificate from '@/components/common/Certificate';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

const LessonView = () => {
  const { courseId, moduleId, lessonId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // Convert params to numbers
  const cId = Number(courseId);
  const mId = Number(moduleId);
  const lId = Number(lessonId);
  
  // Find the course, module and lesson
  const course = courses.find(c => c.id === cId);
  const module = course?.modules.find(m => m.id === mId);
  const lesson = module?.lessons.find(l => l.id === lId);
  
  // If any not found, show error
  if (!course || !module || !lesson) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
        <p className="mb-8">The lesson you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }
  
  // Find previous and next lesson
  const allLessons: {moduleId: number, lessonId: number, index: number}[] = [];
  
  course.modules.forEach(m => {
    m.lessons.forEach(l => {
      allLessons.push({
        moduleId: m.id,
        lessonId: l.id,
        index: allLessons.length
      });
    });
  });
  
  const currentIndex = allLessons.findIndex(l => l.moduleId === mId && l.lessonId === lId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  
  // Navigation handlers
  const goToPrevious = () => {
    if (prevLesson) {
      navigate(`/courses/${cId}/modules/${prevLesson.moduleId}/lessons/${prevLesson.lessonId}`);
    }
  };
  
  const goToNext = () => {
    if (nextLesson) {
      navigate(`/courses/${cId}/modules/${nextLesson.moduleId}/lessons/${nextLesson.lessonId}`);
    } else {
      // If no next lesson, course is complete
      navigate(`/courses/${cId}`);
      toast({
        title: "Course Completed",
        description: "Congratulations! You have completed all lessons in this course."
      });
    }
  };
  
  const markComplete = () => {
    toast({
      title: "Lesson Completed",
      description: "Your progress has been saved."
    });
    
    // In a real app, update the user's progress
    // For now, just navigate to the next lesson
    if (nextLesson) {
      goToNext();
    }
  };
  
  const handleQuizComplete = (score: number, passed: boolean) => {
    setQuizCompleted(true);
    
    if (passed) {
      toast({
        title: "Quiz Passed",
        description: `You scored ${score}%. Great job!`
      });
    } else {
      toast({
        variant: "destructive",
        title: "Quiz Not Passed",
        description: `You scored ${score}%. Review the material and try again.`
      });
    }
  };
  
  // Get lesson icon based on type
  const getLessonIcon = () => {
    switch (lesson.type) {
      case 'video':
        return <Video className="h-6 w-6" />;
      case 'document':
        return <FileText className="h-6 w-6" />;
      case 'quiz':
        return <FileText className="h-6 w-6" />;
      default:
        return <BookOpen className="h-6 w-6" />;
    }
  };

  // Render content based on lesson type
  const renderLessonContent = () => {
    switch (lesson.type) {
      case 'video':
        return (
          <div className="aspect-video bg-black rounded-md overflow-hidden mb-6">
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <div className="text-center p-8">
                <Video className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Video content would be displayed here.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  In a production environment, this would be a real video player.
                </p>
              </div>
            </div>
          </div>
        );
      case 'quiz':
        return lesson.quiz ? (
          <QuizComponent quiz={lesson.quiz} onComplete={handleQuizComplete} />
        ) : (
          <div className="text-center py-8">
            <p>Quiz data not available</p>
          </div>
        );
      default:
        return (
          <div className="prose max-w-none">
            <h2>Sample Lesson Content</h2>
            <p>
              This is placeholder content for the lesson. In a real application, this would contain 
              detailed instructional text, images, and other materials related to the course topic.
            </p>
            <p>
              The content would be structured to provide clear explanations of concepts, step-by-step 
              instructions, examples, and practice exercises to reinforce learning.
            </p>
            <h3>Key Points</h3>
            <ul>
              <li>Understanding the fundamental principles</li>
              <li>Learning the proper techniques and workflows</li>
              <li>Applying concepts to real-world scenarios</li>
              <li>Troubleshooting common issues</li>
            </ul>
            <p>
              By the end of this lesson, you should be able to demonstrate understanding of the 
              covered material and apply it in practical situations.
            </p>
          </div>
        );
    }
  };
  
  // Determine if this is the final lesson of the course
  const isFinalLesson = currentIndex === allLessons.length - 1;
  
  // Calculate overall course progress
  const progress = Math.round(((currentIndex + 1) / allLessons.length) * 100);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{lesson.title}</h1>
          <p className="text-muted-foreground">{course.title} • Module {module.order}</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            onClick={goToPrevious} 
            disabled={!prevLesson}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <Button 
            onClick={goToNext} 
            disabled={!nextLesson && !quizCompleted}
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border">
            {lesson.type === 'quiz' && quizCompleted && isFinalLesson ? (
              <div className="p-6">
                <Certificate 
                  studentName={user?.name || "Student Name"} 
                  courseName={course.title}
                  issueDate={new Date().toISOString()}
                  instructorName={course.instructorName}
                />
              </div>
            ) : (
              <Tabs defaultValue="content">
                <div className="border-b px-6 py-3">
                  <TabsList className="w-full sm:w-auto">
                    <TabsTrigger value="content" className="flex items-center">
                      {getLessonIcon()} 
                      <span className="ml-2">Lesson Content</span>
                    </TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="content" className="p-6">
                  {renderLessonContent()}
                  
                  {lesson.type !== 'quiz' && (
                    <div className="mt-8 flex justify-end">
                      <Button onClick={markComplete}>
                        Mark as Complete
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="notes" className="p-6">
                  <div className="bg-muted/30 rounded-md p-6 text-center">
                    <p className="text-muted-foreground">
                      In a full implementation, this tab would allow students to take and save notes for this lesson.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      The notes would be saved to the database and accessible from any device.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
        
        {/* Sidebar */}
        <div>
          <Card className="p-4">
            <div className="mb-4">
              <p className="text-sm font-medium mb-1">Course Progress</p>
              <ProgressBar value={progress} />
              <p className="text-xs text-right mt-1 text-muted-foreground">
                {currentIndex + 1} of {allLessons.length} lessons completed
              </p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Module: {module.title}</h3>
              <p className="text-sm text-muted-foreground">{module.description}</p>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium text-sm mb-3">Lessons in this module</h4>
              <div className="space-y-1">
                {module.lessons.map((l) => (
                  <div 
                    key={l.id}
                    onClick={() => navigate(`/courses/${cId}/modules/${mId}/lessons/${l.id}`)}
                    className={`
                      p-2 rounded-md text-sm cursor-pointer flex items-center
                      ${l.id === lId ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'}
                    `}
                  >
                    {l.type === 'video' && <Video className="h-4 w-4 mr-2" />}
                    {l.type === 'document' && <FileText className="h-4 w-4 mr-2" />}
                    {l.type === 'quiz' && <FileText className="h-4 w-4 mr-2" />}
                    <span className="line-clamp-1">{l.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LessonView;

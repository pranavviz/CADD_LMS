
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, FileText, Video, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Lesson } from '@/data/mockData';

interface LessonCardProps {
  lesson: Lesson;
  courseId: number;
  moduleId: number;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, courseId, moduleId }) => {
  const navigate = useNavigate();

  const getIconForLessonType = () => {
    switch (lesson.type) {
      case 'video':
        return <Video className="h-10 w-10 text-primary" />;
      case 'document':
        return <FileText className="h-10 w-10 text-blue-500" />;
      case 'quiz':
        return <FileText className="h-10 w-10 text-orange-500" />;
      default:
        return <FileText className="h-10 w-10 text-gray-500" />;
    }
  };

  const handleClick = () => {
    navigate(`/courses/${courseId}/modules/${moduleId}/lessons/${lesson.id}`);
  };

  return (
    <Card 
      onClick={handleClick}
      className={`cursor-pointer transition-all duration-200 hover:shadow-md border-l-4 ${
        lesson.completed ? 'border-l-green-500' : 'border-l-gray-200'
      }`}
    >
      <CardContent className="pt-6 pb-2 flex items-start">
        <div className="mr-4">
          {getIconForLessonType()}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h4 className="font-medium">{lesson.title}</h4>
            {lesson.completed && (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            )}
          </div>
          <div className="mt-1 flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>{lesson.duration}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="py-2">
        <Badge variant={lesson.type === 'quiz' ? 'default' : 'outline'}>
          {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default LessonCard;


import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Users } from 'lucide-react';
import { Course } from '@/data/mockData';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Link to={`/courses/${course.id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md h-full flex flex-col">
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <Badge 
            className="absolute top-3 right-3" 
            variant={
              course.level === 'Beginner' ? 'outline' : 
              course.level === 'Intermediate' ? 'secondary' : 'default'
            }
          >
            {course.level}
          </Badge>
          <Badge 
            className="absolute top-3 left-3"
            variant="outline"
          >
            {course.category}
          </Badge>
        </div>
        <CardHeader className="py-3">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
        </CardHeader>
        <CardContent className="py-0 flex-grow">
          <div className="text-sm">By {course.instructorName}</div>
        </CardContent>
        <CardFooter className="pt-2 pb-4 flex justify-between border-t mt-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            <span>{course.enrolledCount}</span>
          </div>
          <div className="flex items-center text-sm">
            <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
            <span className="font-medium">{course.rating}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;

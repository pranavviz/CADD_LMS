
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProgressBar from '@/components/common/ProgressBar';
import CourseCard from '@/components/courses/CourseCard';
import { Badge } from '@/components/ui/badge';
import { courses, enrollments } from '@/data/mockData';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null; // Or a loading spinner
  }

  // Get user's enrolled courses
  const userEnrollments = enrollments.filter(enrollment => enrollment.userId === user.id);
  const enrolledCourses = courses.filter(course => userEnrollments.some(e => e.courseId === course.id));

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-6">Welcome back, {user.name}</p>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="my-courses">My Courses</TabsTrigger>
          {user.role === 'instructor' && (
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
          )}
          {user.role === 'admin' && (
            <TabsTrigger value="admin">Admin</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* User Info Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-primary mb-4">
                    <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                  </div>
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <Badge className="mt-2">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</Badge>
                </div>
              </CardContent>
            </Card>
            
            {/* Progress Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Learning Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userEnrollments.length > 0 ? (
                    userEnrollments.map(enrollment => {
                      const course = courses.find(c => c.id === enrollment.courseId);
                      return course ? (
                        <div key={enrollment.id} className="space-y-1">
                          <div className="flex justify-between">
                            <p className="text-sm font-medium">{course.title}</p>
                            <p className="text-sm text-muted-foreground">{enrollment.progress}%</p>
                          </div>
                          <ProgressBar value={enrollment.progress} showPercentage={false} size="sm" />
                        </div>
                      ) : null;
                    })
                  ) : (
                    <p className="text-muted-foreground text-sm text-center py-6">
                      You haven't enrolled in any courses yet.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Stats Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Your Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted rounded-md p-4 text-center">
                    <p className="text-2xl font-bold">{userEnrollments.length}</p>
                    <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                  </div>
                  <div className="bg-muted rounded-md p-4 text-center">
                    <p className="text-2xl font-bold">
                      {userEnrollments.filter(e => e.completed).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                  <div className="bg-muted rounded-md p-4 text-center">
                    <p className="text-2xl font-bold">
                      {userEnrollments.filter(e => e.certificateIssued).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Certificates</p>
                  </div>
                  <div className="bg-muted rounded-md p-4 text-center">
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Hours Spent</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-1">
                  <p className="font-medium">Course Enrolled</p>
                  <p className="text-muted-foreground text-sm">
                    You enrolled in <span className="font-medium">{courses[0]?.title}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4 py-1">
                  <p className="font-medium">Lesson Completed</p>
                  <p className="text-muted-foreground text-sm">
                    You completed <span className="font-medium">AutoCAD Interface Overview</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                </div>
                <div className="border-l-4 border-amber-500 pl-4 py-1">
                  <p className="font-medium">Quiz Attempt</p>
                  <p className="text-muted-foreground text-sm">
                    You scored 80% on <span className="font-medium">AutoCAD Basics Quiz</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="my-courses">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">My Courses</h2>
            {enrolledCourses.length > 0 ? (
              <div className="course-card-grid">
                {enrolledCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground mb-4">You haven't enrolled in any courses yet.</p>
                <a href="/courses" className="text-primary hover:underline">Browse our courses</a>
              </Card>
            )}
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Recommended For You</h2>
            <div className="course-card-grid">
              {courses.slice(0, 3).map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </TabsContent>
        
        {user.role === 'instructor' && (
          <TabsContent value="instructor">
            <Card>
              <CardHeader>
                <CardTitle>Instructor Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Manage your courses, track student progress, and create new content.</p>
                <p className="text-muted-foreground mt-4">More instructor features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        )}
        
        {user.role === 'admin' && (
          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle>Admin Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Manage users, courses, and platform settings.</p>
                <p className="text-muted-foreground mt-4">More admin features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Dashboard;

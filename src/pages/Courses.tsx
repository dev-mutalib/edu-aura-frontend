
import { useState } from 'react';
import { Clock, Users, Award, BookOpen, Computer, Briefcase, Palette, Flask } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Courses = () => {
  const [activeTab, setActiveTab] = useState('all');

  const departments = [
    { id: 'all', name: 'All Courses', icon: BookOpen },
    { id: 'computer-science', name: 'Computer Science', icon: Computer },
    { id: 'business', name: 'Business', icon: Briefcase },
    { id: 'arts', name: 'Arts & Design', icon: Palette },
    { id: 'science', name: 'Sciences', icon: Flask }
  ];

  const courses = [
    {
      id: 1,
      title: 'Computer Science Engineering',
      department: 'computer-science',
      duration: '4 Years',
      level: 'Bachelor',
      students: 120,
      description: 'Comprehensive program covering programming, algorithms, data structures, and modern computing technologies.',
      subjects: ['Programming', 'Data Structures', 'Algorithms', 'Database Systems', 'Web Development'],
      image: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'Business Administration',
      department: 'business',
      duration: '3 Years',
      level: 'Bachelor',
      students: 150,
      description: 'Learn management principles, marketing strategies, finance, and entrepreneurship skills.',
      subjects: ['Management', 'Marketing', 'Finance', 'Operations', 'Strategy'],
      image: '/placeholder.svg'
    },
    {
      id: 3,
      title: 'Graphic Design',
      department: 'arts',
      duration: '3 Years',
      level: 'Bachelor',
      students: 80,
      description: 'Creative program focusing on visual communication, digital design, and brand development.',
      subjects: ['Design Theory', 'Digital Arts', 'Typography', 'Branding', 'UI/UX Design'],
      image: '/placeholder.svg'
    },
    {
      id: 4,
      title: 'Data Science',
      department: 'computer-science',
      duration: '2 Years',
      level: 'Master',
      students: 60,
      description: 'Advanced program in statistical analysis, machine learning, and big data technologies.',
      subjects: ['Statistics', 'Machine Learning', 'Python', 'Big Data', 'Analytics'],
      image: '/placeholder.svg'
    },
    {
      id: 5,
      title: 'Environmental Science',
      department: 'science',
      duration: '4 Years',
      level: 'Bachelor',
      students: 70,
      description: 'Study environmental systems, sustainability, and conservation methods.',
      subjects: ['Ecology', 'Chemistry', 'Environmental Policy', 'Research Methods', 'Conservation'],
      image: '/placeholder.svg'
    },
    {
      id: 6,
      title: 'Digital Marketing',
      department: 'business',
      duration: '1 Year',
      level: 'Diploma',
      students: 100,
      description: 'Intensive program covering online marketing strategies and digital tools.',
      subjects: ['SEO/SEM', 'Social Media', 'Content Marketing', 'Analytics', 'E-commerce'],
      image: '/placeholder.svg'
    }
  ];

  const filteredCourses = activeTab === 'all' ? courses : courses.filter(course => course.department === activeTab);

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6 animate-fade-in">
            Our Courses
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto animate-slide-in-left">
            Explore our comprehensive range of programs designed to prepare you for success 
            in your chosen field and beyond.
          </p>
        </div>
      </section>

      {/* Department Tabs */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {departments.map((dept) => (
              <Button
                key={dept.id}
                variant={activeTab === dept.id ? "default" : "outline"}
                onClick={() => setActiveTab(dept.id)}
                className={`flex items-center space-x-2 ${
                  activeTab === dept.id ? 'bg-blue-600 text-white' : ''
                }`}
              >
                <dept.icon className="h-4 w-4" />
                <span>{dept.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <Card 
                key={course.id} 
                className="card-hover animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-blue-600" />
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{course.level}</Badge>
                    <Badge variant="outline">{course.duration}</Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                  <p className="text-gray-600 text-sm">{course.description}</p>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{course.students} students</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2">Key Subjects:</h4>
                      <div className="flex flex-wrap gap-1">
                        {course.subjects.slice(0, 3).map((subject, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                        {course.subjects.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{course.subjects.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-4">
                      <Button className="flex-1" size="sm">
                        Apply Now
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Courses */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Courses?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our programs are designed with industry needs in mind, ensuring you graduate with 
              relevant skills and knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-slide-in-left">
              <Award className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Industry-Relevant</h3>
              <p className="text-gray-600">
                Curriculum designed in collaboration with industry experts to ensure 
                graduates are job-ready.
              </p>
            </div>
            
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Users className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Faculty</h3>
              <p className="text-gray-600">
                Learn from experienced professors and industry professionals with 
                years of practical experience.
              </p>
            </div>
            
            <div className="text-center animate-slide-in-right">
              <BookOpen className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Hands-on Learning</h3>
              <p className="text-gray-600">
                Practical projects, internships, and lab work to give you real-world 
                experience and skills.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;

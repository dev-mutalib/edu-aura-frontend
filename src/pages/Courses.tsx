import { useState } from 'react';
import {
  Clock, Users, BookOpen, Computer, Briefcase, Palette, Microscope,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Modal from '@/components/Modal';

const Courses = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showApplyForm, setShowApplyForm] = useState(false);

  const departments = [
    { id: 'all', name: 'All Courses', icon: BookOpen },
    { id: 'engineering', name: 'Engineering', icon: Computer },
    { id: 'management', name: 'Management', icon: Briefcase },
    { id: 'science', name: 'Science', icon: Microscope },
    { id: 'arts', name: 'Arts & Hospitality', icon: Palette },
  ];

  const courses = [
    { id: 1, title: 'B.Tech Computer Science', department: 'engineering', duration: '4 Years', level: 'UG', students: 200, description: 'Core concepts in programming, algorithms, hardware.', subjects: ['Programming', 'Algorithms', 'DBMS'], image: '/placeholder.svg' },
    { id: 2, title: 'B.Tech Mechanical Engineering', department: 'engineering', duration: '4 Years', level: 'UG', students: 120, description: 'Design, thermodynamics, manufacturing systems.', subjects: ['Thermodynamics', 'CAD', 'Manufacturing'], image: '/placeholder.svg' },
    { id: 3, title: 'BCA (Computer Applications)', department: 'engineering', duration: '3 Years', level: 'UG', students: 150, description: 'IT fundamentals, software development, databases.', subjects: ['Programming', 'DBMS', 'Web Tech'], image: '/placeholder.svg' },
    { id: 4, title: 'BBA (Business Administration)', department: 'management', duration: '3 Years', level: 'UG', students: 180, description: 'Management, marketing, finance, HR essentials.', subjects: ['Management', 'Marketing', 'Finance'], image: '/placeholder.svg' },
    { id: 5, title: 'B.Sc in Hospitality Studies', department: 'arts', duration: '3 Years', level: 'UG', students: 80, description: 'Hotel management, catering, tourism services.', subjects: ['Hospitality', 'Tourism', 'Catering'], image: '/placeholder.svg' },
    { id: 6, title: 'MBA – General Management', department: 'management', duration: '2 Years', level: 'PG', students: 120, description: 'Advanced business administration & strategy.', subjects: ['Marketing', 'Finance', 'HR'], image: '/placeholder.svg' },
    { id: 7, title: 'MCA (Computer Applications)', department: 'engineering', duration: '2 Years', level: 'PG', students: 60, description: 'Advanced software development & systems.', subjects: ['Advanced Programming', 'Networks', 'DBMS'], image: '/placeholder.svg' },
    { id: 8, title: 'M.Tech in Computer Science', department: 'engineering', duration: '2 Years', level: 'PG', students: 40, description: 'Research & specialization in CSE.', subjects: ['Machine Learning', 'AI', 'Research'], image: '/placeholder.svg' },
  ];

  const filteredCourses = activeTab === 'all'
    ? courses
    : courses.filter(c => c.department === activeTab);

  const renderApplyForm = (course) => {
    const isUG = course.level === 'UG';
    const isPG = course.level === 'PG';

    return (
      <form className="space-y-4">
        <input type="text" placeholder="Full Name" className="w-full border px-3 py-2 rounded" />
        <input type="email" placeholder="Email" className="w-full border px-3 py-2 rounded" />
        {isUG && (
          <>
            <input type="text" placeholder="12th Percentage / Grade" className="w-full border px-3 py-2 rounded" />
            <input type="text" placeholder="Preferred Branch / Elective" className="w-full border px-3 py-2 rounded" />
          </>
        )}
        {isPG && (
          <>
            <input type="text" placeholder="Graduation Degree & University" className="w-full border px-3 py-2 rounded" />
            <input type="text" placeholder="Specialization / Domain" className="w-full border px-3 py-2 rounded" />
            <textarea placeholder="Any Work Experience (Optional)" className="w-full border px-3 py-2 rounded" />
          </>
        )}
        <textarea placeholder="Why are you applying for this course?" className="w-full border px-3 py-2 rounded" />
        <Button type="submit" className="w-full">Submit Application</Button>
      </form>
    );
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Header & Tabs */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">Our ITM Courses</h1>
      </section>

      <section className="py-8 bg-white border-b">
        <div className="flex flex-wrap justify-center gap-4">
          {departments.map(dept => (
            <Button key={dept.id}
              variant={activeTab === dept.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(dept.id)}
              className={`${activeTab === dept.id ? 'bg-blue-600 text-white' : ''}`}>
              <dept.icon className="h-4 w-4" /><span>{dept.name}</span>
            </Button>
          ))}
        </div>
      </section>

      {/* Courses Display */}
      <section className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredCourses.map((course, i) => (
            <Card key={course.id} className="card-hover" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-blue-600" />
              </div>
              <CardHeader>
                <div className="flex justify-between mb-2">
                  <Badge variant="secondary">{course.level}</Badge>
                  <Badge variant="outline">{course.duration}</Badge>
                </div>
                <CardTitle>{course.title}</CardTitle>
                <p className="text-sm text-gray-600">{course.description}</p>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <div className="flex items-center space-x-1"><Clock className="h-4 w-4"/><span>{course.duration}</span></div>
                  <div className="flex items-center space-x-1"><Users className="h-4 w-4"/><span>{course.students} students</span></div>
                </div>
                <h4 className="font-semibold text-sm mb-1">Subjects:</h4>
                <div className="flex gap-1 flex-wrap">
                  {course.subjects.slice(0,3).map((s, idx) => (<Badge key={idx} variant="outline" className="text-xs">{s}</Badge>))}
                  {course.subjects.length > 3 && <Badge variant="outline" className="text-xs">+{course.subjects.length - 3} more</Badge>}
                </div>
                <div className="flex mt-4 gap-2">
                  <Button className="flex-1" onClick={() => { setSelectedCourse(course); setShowApplyForm(false); }}>Learn More</Button>
                  <Button variant="outline" className="flex-1" onClick={() => { setSelectedCourse(course); setShowApplyForm(true); }}>Apply Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Modal for Details / Application */}
      {selectedCourse && (
        <Modal open={true} onClose={() => setSelectedCourse(null)}>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">{selectedCourse.title}</h2>
            <p className="mb-4">{selectedCourse.description}</p>

            {showApplyForm ? renderApplyForm(selectedCourse) : (
              <>
                <h3 className="text-lg font-semibold mb-2">Subjects Covered</h3>
                <ul className="list-disc ml-5 text-sm text-gray-700">
                  {selectedCourse.subjects.map((subj, i) => <li key={i}>{subj}</li>)}
                </ul>
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Courses;

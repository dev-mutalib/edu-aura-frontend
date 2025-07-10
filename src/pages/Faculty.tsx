import { useState } from 'react';
import {
  User, Mail, Phone, BookOpen, Award,
  Users, Computer, Briefcase, Palette, Microscope
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import img1 from '../assets/images/director.jpg';
import img2 from '../assets/images/management.jpg';

const Faculty = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const departments = [
    { id: 'all', name: 'All Faculty', icon: Users },
    { id: 'computer-science', name: 'Computer Science', icon: Computer },
    { id: 'management', name: 'Management', icon: Briefcase },
    { id: 'arts', name: 'Arts & Design', icon: Palette },
    { id: 'science', name: 'Sciences', icon: Microscope }
  ];

  const facultyMembers = [
    {
      id: 1,
      name: 'Dr. MADHAV M. BOKARE',
      title: 'Associate Prof. and Head, Computer Science',
      department: 'computer-science',
      email: 'madhavm_tbokare@ssbesitm.org',
      phone: '+91 9421870580',
      experience: '36+ years',
      specialization: ['AI & ML', 'Computer Networks', 'Research'],
      bio: 'Dr. Bokare is a veteran academician and researcher with over 36 years of experience, leading the department at SSBES’ ITM, Nanded.',
      achievements: ['Editor IJACT', 'ICT Researcher of the Year 2016', 'Ph.D Supervisor'],
      image: img1
    },
    {
      id: 2,
      name: 'Dr. M. S. Altamash',
      title: 'Assistant Prof. and Head',
      department: 'management',
      email: 'ms_altamash@ssbesitm.org',
      phone: '+91 7972779491',
      experience: '20+ years',
      specialization: ['Marketing', 'Business Strategy', 'HR'],
      bio: 'Dr. Altamash leads the Management department with strong academic and industry experience.',
      achievements: ['Published 30+ papers', 'Led MBA curriculum redesign'],
      image: img2
    },
    {
      id: 3,
      name: 'Dr. N. D. Shinde',
      title: 'Assistant Professor, Management',
      department: 'management',
      email: 'nd_shinde@ssbesitm.org',
      phone: '+91 8999050686',
      experience: '12+ years',
      specialization: ['Finance', 'Accounting', 'Business Analytics'],
      bio: 'Dr. Shinde brings deep industry insights to classroom teaching and research.',
      achievements: ['Certificate Courses in SAP', 'Member – Management Council'],
      image: 'https://via.placeholder.com/150?text=Shinde'
    },
    {
      id: 4,
      name: 'Dr. Nasreen',
      title: 'Assistant Professor, Management',
      department: 'management',
      email: 'nasreen@ssbesitm.org',
      phone: '+91 XXXXXXXXXX',
      experience: '10+ years',
      specialization: ['Organizational Behavior', 'Leadership'],
      bio: 'Dr. Nasreen specializes in leadership and organizational development.',
      achievements: ['Presented at ICMIT Auckland', 'Won Institutional Teaching Award'],
      image: 'https://via.placeholder.com/150?text=Nasreen'
    }
  ];

  const filteredFaculty = selectedDepartment === 'all'
    ? facultyMembers
    : facultyMembers.filter(member => member.department === selectedDepartment);

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="text-center px-4">
          <h1 className="text-5xl font-bold text-white">Our Faculty</h1>
          <p className="text-xl text-blue-100 mt-4">
            Meet our distinguished educators committed to academic excellence.
          </p>
        </div>
      </section>

      {/* Department Filter */}
      <section className="py-8 bg-white border-b">
        <div className="flex justify-center flex-wrap gap-4">
          {departments.map(dept => (
            <Button
              key={dept.id}
              variant={selectedDepartment === dept.id ? 'default' : 'outline'}
              onClick={() => setSelectedDepartment(dept.id)}
              className={selectedDepartment === dept.id ? 'bg-blue-600 text-white' : ''}
            >
              <dept.icon className="h-4 w-4 mr-1" />
              <span>{dept.name}</span>
            </Button>
          ))}
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {filteredFaculty.map((fac, idx) => (
            <Card
              key={fac.id}
              className="card-hover animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-36 h-36 rounded-full overflow-hidden ring-4 ring-blue-300 shadow-lg mx-auto mb-4">
                  <img src={fac.image} alt={fac.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{fac.name}</h3>
                <p className="text-blue-600">{fac.title}</p>
                <Badge variant="outline" className="mt-2">
                  {fac.experience} Experience
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">{fac.bio}</p>

                <div>
                  <h4 className="font-semibold mb-1 flex items-center text-gray-900">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Specialization
                  </h4>
                  <div className="flex gap-1 flex-wrap">
                    {fac.specialization.slice(0, 2).map((s, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {s}
                      </Badge>
                    ))}
                    {fac.specialization.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{fac.specialization.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-1 flex items-center text-gray-900">
                    <Award className="h-4 w-4 mr-2" />
                    Achievements
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {fac.achievements.slice(0, 2).map((ach, i) => (
                      <li key={i} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2"></span>
                        {ach}
                      </li>
                    ))}
                    {fac.achievements.length > 2 && (
                      <li className="text-blue-600 text-xs">
                        +{fac.achievements.length - 2} more...
                      </li>
                    )}
                  </ul>
                </div>

                <div className="border-t pt-3 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 text-blue-600 mr-2" />
                    <a href={`mailto:${fac.email}`} className="hover:text-blue-600">
                      {fac.email}
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 text-blue-600 mr-2" />
                    <span>{fac.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Faculty Stats */}
      <section className="py-16 bg-white">
        <div className="text-center mb-12 px-4">
          <h2 className="text-3xl font-bold text-gray-900">Faculty Excellence</h2>
          <p className="text-xl text-gray-600 mt-2">
            Exemplary qualifications and leadership through research.
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
          <div className="text-center animate-fade-in">
            <div className="text-4xl font-bold text-blue-600">200+</div>
            <div className="text-gray-600">Faculty Members</div>
          </div>
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="text-4xl font-bold text-purple-600">85%</div>
            <div className="text-gray-600">With Ph.D.</div>
          </div>
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-4xl font-bold text-green-600">500+</div>
            <div className="text-gray-600">Publications</div>
          </div>
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="text-4xl font-bold text-orange-600">15:1</div>
            <div className="text-gray-600">Student‑Faculty Ratio</div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-center px-4">
        <h2 className="text-3xl font-bold text-white mb-6">Learn from the Best</h2>
        <p className="text-xl text-blue-100 mb-8">
          Join ITM and be mentored by distinguished faculty and researchers.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-white text-blue-600 hover:bg-gray-100">
            Apply Now
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Faculty;

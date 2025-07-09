
import { useState } from 'react';
import { User, Mail, Phone, Award, BookOpen, Users, Computer, Briefcase, Palette, Flask } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Faculty = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const departments = [
    { id: 'all', name: 'All Faculty', icon: Users },
    { id: 'computer-science', name: 'Computer Science', icon: Computer },
    { id: 'business', name: 'Business', icon: Briefcase },
    { id: 'arts', name: 'Arts & Design', icon: Palette },
    { id: 'science', name: 'Sciences', icon: Flask }
  ];

  const facultyMembers = [
    {
      id: 1,
      name: 'Dr. John Smith',
      title: 'Professor of Computer Science',
      department: 'computer-science',
      email: 'john.smith@educollege.edu',
      phone: '+1 (555) 123-4567',
      education: ['Ph.D. Computer Science - MIT', 'M.S. Software Engineering - Stanford'],
      experience: '15+ years',
      specialization: ['Machine Learning', 'Artificial Intelligence', 'Data Structures'],
      bio: 'Dr. Smith is a renowned expert in artificial intelligence and machine learning with over 15 years of teaching and research experience.',
      achievements: ['Best Teacher Award 2023', 'Published 50+ research papers', 'IEEE Fellow']
    },
    {
      id: 2,
      name: 'Prof. Sarah Johnson',
      title: 'Associate Professor of Business',
      department: 'business',
      email: 'sarah.johnson@educollege.edu',
      phone: '+1 (555) 123-4568',
      education: ['MBA - Harvard Business School', 'B.Com - University of California'],
      experience: '12+ years',
      specialization: ['Marketing Strategy', 'Consumer Behavior', 'Digital Marketing'],
      bio: 'Prof. Johnson brings extensive industry experience from Fortune 500 companies to her teaching.',
      achievements: ['Outstanding Faculty Award 2022', 'Marketing Excellence Award', 'Industry Leader Recognition']
    },
    {
      id: 3,
      name: 'Dr. Emily Chen',
      title: 'Professor of Environmental Science',
      department: 'science',
      email: 'emily.chen@educollege.edu',
      phone: '+1 (555) 123-4569',
      education: ['Ph.D. Environmental Science - Berkeley', 'M.S. Biology - UCLA'],
      experience: '18+ years',
      specialization: ['Climate Change', 'Sustainability', 'Ecosystem Management'],
      bio: 'Dr. Chen is a leading researcher in environmental sustainability and climate change mitigation strategies.',
      achievements: ['Environmental Excellence Award', 'UN Climate Panel Member', '100+ Publications']
    },
    {
      id: 4,
      name: 'Prof. Michael Brown',
      title: 'Associate Professor of Graphic Design',
      department: 'arts',
      email: 'michael.brown@educollege.edu',
      phone: '+1 (555) 123-4570',
      education: ['MFA Graphic Design - RISD', 'BFA Visual Arts - Parsons'],
      experience: '10+ years',
      specialization: ['Brand Design', 'Digital Arts', 'Typography'],
      bio: 'Prof. Brown combines creative expertise with technical skills to inspire the next generation of designers.',
      achievements: ['Design Excellence Award', 'International Design Recognition', 'Creative Industry Leader']
    },
    {
      id: 5,
      name: 'Dr. Lisa Wang',
      title: 'Professor of Data Science',
      department: 'computer-science',
      email: 'lisa.wang@educollege.edu',
      phone: '+1 (555) 123-4571',
      education: ['Ph.D. Statistics - Harvard', 'M.S. Mathematics - Princeton'],
      experience: '14+ years',
      specialization: ['Big Data Analytics', 'Statistical Modeling', 'Machine Learning'],
      bio: 'Dr. Wang specializes in big data analytics and has worked with major tech companies on data-driven solutions.',
      achievements: ['Data Science Innovation Award', 'Tech Industry Collaborator', 'Research Excellence']
    },
    {
      id: 6,
      name: 'Prof. David Wilson',
      title: 'Professor of Finance',
      department: 'business',
      email: 'david.wilson@educollege.edu',
      phone: '+1 (555) 123-4572',
      education: ['Ph.D. Finance - Wharton', 'CFA Charter Holder'],
      experience: '20+ years',
      specialization: ['Corporate Finance', 'Investment Analysis', 'Risk Management'],
      bio: 'Prof. Wilson brings Wall Street expertise to academia with extensive experience in corporate finance.',
      achievements: ['Finance Excellence Award', 'Wall Street Recognition', 'Industry Consultant']
    }
  ];

  const filteredFaculty = selectedDepartment === 'all' 
    ? facultyMembers 
    : facultyMembers.filter(member => member.department === selectedDepartment);

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6 animate-fade-in">
            Our Faculty
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto animate-slide-in-left">
            Meet our distinguished educators and researchers who are committed to 
            academic excellence and student success.
          </p>
        </div>
      </section>

      {/* Department Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {departments.map((dept) => (
              <Button
                key={dept.id}
                variant={selectedDepartment === dept.id ? "default" : "outline"}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`flex items-center space-x-2 ${
                  selectedDepartment === dept.id ? 'bg-blue-600 text-white' : ''
                }`}
              >
                <dept.icon className="h-4 w-4" />
                <span>{dept.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFaculty.map((faculty, index) => (
              <Card 
                key={faculty.id} 
                className="card-hover animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="h-12 w-12 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{faculty.name}</h3>
                  <p className="text-blue-600 font-medium">{faculty.title}</p>
                  <Badge variant="outline" className="mx-auto">
                    {faculty.experience} Experience
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed">{faculty.bio}</p>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Specialization
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {faculty.specialization.slice(0, 2).map((spec, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                      {faculty.specialization.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{faculty.specialization.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Award className="h-4 w-4 mr-2" />
                      Key Achievements
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {faculty.achievements.slice(0, 2).map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-gray-100 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2 text-blue-600" />
                      <a href={`mailto:${faculty.email}`} className="hover:text-blue-600 transition-colors">
                        {faculty.email}
                      </a>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2 text-blue-600" />
                      <span>{faculty.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Faculty Excellence
            </h2>
            <p className="text-xl text-gray-600">
              Our commitment to academic and research excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center animate-fade-in">
              <div className="text-4xl font-bold text-blue-600 mb-2">200+</div>
              <div className="text-gray-600">Faculty Members</div>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold text-purple-600 mb-2">85%</div>
              <div className="text-gray-600">With Ph.D. Degrees</div>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Research Publications</div>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl font-bold text-orange-600 mb-2">15:1</div>
              <div className="text-gray-600">Student-Faculty Ratio</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Learn from the Best
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our community and be mentored by industry experts and renowned academics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Apply Now
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Contact Faculty
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faculty;

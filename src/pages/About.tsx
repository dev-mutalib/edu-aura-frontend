
import { Users, Target, Heart, Award, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for academic and personal excellence in everything we do.'
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'We maintain the highest standards of honesty and ethical conduct.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We foster a supportive and inclusive learning environment.'
    },
    {
      icon: Award,
      title: 'Innovation',
      description: 'We embrace new ideas and encourage creative thinking.'
    }
  ];

  const timeline = [
    { year: '1985', event: 'EduCollege was founded with a vision to provide quality education' },
    { year: '1992', event: 'Expanded to include engineering and business programs' },
    { year: '2001', event: 'Introduced state-of-the-art computer labs and digital learning' },
    { year: '2010', event: 'Achieved accreditation from national education board' },
    { year: '2018', event: 'Launched online learning platform and distance education' },
    { year: '2024', event: 'Celebrating 39 years of educational excellence' }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6 animate-fade-in">
            About EduCollege
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto animate-slide-in-left">
            For nearly four decades, we've been committed to providing exceptional education 
            and nurturing the next generation of leaders, innovators, and changemakers.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-slide-in-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To provide transformative educational experiences that empower students to 
                achieve their full potential, contribute meaningfully to society, and lead 
                with purpose in an ever-changing world.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We are committed to fostering critical thinking, creativity, and character 
                development through innovative teaching methods, research opportunities, 
                and community engagement.
              </p>
            </div>
            <div className="animate-slide-in-right">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To be a globally recognized institution of higher learning that shapes 
                future leaders and drives positive change in communities worldwide.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We envision a future where our graduates are equipped with the knowledge, 
                skills, and values necessary to address complex global challenges and 
                create sustainable solutions for the betterment of humanity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These fundamental principles guide everything we do and shape our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="card-hover animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <value.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">
              Milestones that shaped our institution over the years.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-blue-200"></div>
            
            {timeline.map((item, index) => (
              <div 
                key={index} 
                className={`relative flex items-center mb-8 animate-fade-in ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`flex-1 ${
                  index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
                } ml-12 md:ml-0`}>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">{item.year}</div>
                    <p className="text-gray-700">{item.event}</p>
                  </div>
                </div>
                
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-16 w-16" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Dr. Sarah Johnson</h3>
                  <p className="text-blue-100">Principal</p>
                </div>
              </div>
              
              <div className="md:w-2/3 p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Principal's Message</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  "Welcome to EduCollege, where excellence meets opportunity. For nearly four decades, 
                  we have been committed to providing our students with an educational experience 
                  that goes beyond textbooks and classrooms."
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  "Our dedicated faculty, state-of-the-art facilities, and comprehensive programs 
                  are designed to nurture not just academic success, but also personal growth, 
                  critical thinking, and leadership skills that will serve our graduates throughout 
                  their careers."
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  "I invite you to explore all that EduCollege has to offer and join our vibrant 
                  community of learners, innovators, and future leaders."
                </p>
                
                <div className="mt-8 flex items-center text-gray-500">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>Ph.D. in Education, Harvard University</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

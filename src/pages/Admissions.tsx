
import { useState } from 'react';
import { CheckCircle, FileText, CreditCard, UserCheck, Calendar, Phone, Mail, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const Admissions = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });

  const admissionSteps = [
    {
      icon: FileText,
      title: 'Submit Application',
      description: 'Complete and submit your application form with required documents.',
      status: 'active'
    },
    {
      icon: UserCheck,
      title: 'Document Verification',
      description: 'Our team will verify your submitted documents and academic credentials.',
      status: 'pending'
    },
    {
      icon: CreditCard,
      title: 'Pay Application Fee',
      description: 'Pay the application processing fee through our secure payment gateway.',
      status: 'pending'
    },
    {
      icon: CheckCircle,
      title: 'Admission Confirmation',
      description: 'Receive admission confirmation and join orientation program.',
      status: 'pending'
    }
  ];

  const requirements = [
    'High school diploma or equivalent',
    'Official transcripts from previous institutions',
    'Letters of recommendation (2-3)',
    'Personal statement or essay',
    'English proficiency test scores (if applicable)',
    'Passport-sized photographs',
    'Application fee payment'
  ];

  const importantDates = [
    { event: 'Application Opens', date: 'January 15, 2024' },
    { event: 'Early Decision Deadline', date: 'March 1, 2024' },
    { event: 'Regular Decision Deadline', date: 'May 15, 2024' },
    { event: 'Admission Results', date: 'June 30, 2024' },
    { event: 'Enrollment Deadline', date: 'July 31, 2024' },
    { event: 'Orientation Program', date: 'August 15, 2024' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, course: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "Thank you for your interest. We'll contact you soon.",
    });
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      course: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6 animate-fade-in">
            Admissions
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto animate-slide-in-left">
            Begin your journey with us. Follow our simple admission process and 
            take the first step towards your bright future.
          </p>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Admission Process
            </h2>
            <p className="text-xl text-gray-600">
              Our streamlined process makes it easy to apply and join our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {admissionSteps.map((step, index) => (
              <Card 
                key={index} 
                className={`relative animate-fade-in ${
                  step.status === 'active' ? 'border-blue-500 shadow-lg' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    step.status === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <step.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                  
                  {index < admissionSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gray-300"></div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Apply Now
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below to start your application process.
            </p>
          </div>

          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Application Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="course">Preferred Course</Label>
                  <Select onValueChange={handleSelectChange} required>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="computer-science">Computer Science Engineering</SelectItem>
                      <SelectItem value="business-admin">Business Administration</SelectItem>
                      <SelectItem value="graphic-design">Graphic Design</SelectItem>
                      <SelectItem value="data-science">Data Science</SelectItem>
                      <SelectItem value="environmental-science">Environmental Science</SelectItem>
                      <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Personal Statement (Optional)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself and why you want to join EduCollege..."
                    className="mt-1"
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Requirements and Dates */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Requirements */}
            <div className="animate-slide-in-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Admission Requirements
              </h2>
              <div className="space-y-4">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Dates */}
            <div className="animate-slide-in-right">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Important Dates
              </h2>
              <div className="space-y-4">
                {importantDates.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-gray-900">{item.event}</span>
                    </div>
                    <span className="text-gray-600">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Need Help with Your Application?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Our admissions team is here to assist you throughout the process.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center space-x-3 text-white">
              <Phone className="h-6 w-6" />
              <span className="text-lg">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white">
              <Mail className="h-6 w-6" />
              <span className="text-lg">admissions@educollege.edu</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;

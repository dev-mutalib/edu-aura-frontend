import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Briefcase, CheckCircle, Send, User, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';
import api from '../api/axios';

const careerData: Record<string, {
  title: string;
  type: string;
  location: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}> = {
  'mern-full-stack': {
    title: 'MERN Full Stack Developer',
    type: 'Full-time',
    location: 'Remote / Hybrid',
    experience: '2-4 years',
    description: 'We are looking for an experienced MERN Full Stack Developer to join our team. You will be responsible for building and maintaining scalable web applications using MongoDB, Express.js, React, and Node.js.',
    responsibilities: [
      'Develop and maintain full-stack web applications',
      'Write clean, maintainable, and efficient code',
      'Collaborate with cross-functional teams',
      'Participate in code reviews and technical discussions',
      'Troubleshoot and debug applications',
      'Stay updated with emerging technologies',
    ],
    requirements: [
      '2-4 years of experience with MERN stack',
      'Strong proficiency in JavaScript/TypeScript',
      'Experience with RESTful APIs and GraphQL',
      'Knowledge of database design and optimization',
      'Familiarity with Git and CI/CD pipelines',
      'Excellent problem-solving skills',
    ],
    benefits: [
      'Competitive salary package',
      'Flexible working hours',
      'Remote work options',
      'Health insurance',
      'Learning and development budget',
      'Annual performance bonus',
    ],
  },
  'frontend-developer': {
    title: 'Frontend Developer',
    type: 'Full-time',
    location: 'On-site',
    experience: '1-3 years',
    description: 'Join our frontend team to create beautiful, responsive user interfaces with modern frontend technologies.',
    responsibilities: [
      'Build responsive and accessible web interfaces',
      'Implement pixel-perfect designs from Figma',
      'Optimize applications for performance',
      'Write unit and integration tests',
      'Collaborate with designers and backend developers',
    ],
    requirements: [
      '1-3 years of frontend development experience',
      'Expert knowledge of React and TypeScript',
      'Experience with Tailwind CSS or similar',
      'Understanding of web accessibility standards',
      'Familiarity with state management solutions',
    ],
    benefits: [
      'Competitive salary',
      'Modern office environment',
      'Team lunches and events',
      'Health and wellness programs',
      'Career growth opportunities',
    ],
  },
  'backend-developer': {
    title: 'Backend Developer',
    type: 'Full-time',
    location: 'Remote',
    experience: '2-5 years',
    description: 'Design and implement robust server-side applications and APIs that power our educational platform.',
    responsibilities: [
      'Design and implement scalable APIs',
      'Manage database architecture and optimization',
      'Implement security best practices',
      'Write comprehensive documentation',
      'Monitor and improve application performance',
    ],
    requirements: [
      '2-5 years of backend development experience',
      'Proficiency in Node.js or Python',
      'Experience with SQL and NoSQL databases',
      'Knowledge of cloud services (AWS/GCP)',
      'Understanding of microservices architecture',
    ],
    benefits: [
      'Fully remote position',
      'Flexible hours',
      'Equipment allowance',
      'Conference attendance budget',
      'Stock options',
    ],
  },
  'ui-ux-designer': {
    title: 'UI/UX Designer',
    type: 'Full-time',
    location: 'Hybrid',
    experience: '2-4 years',
    description: 'Design intuitive user experiences and beautiful interfaces for our educational products.',
    responsibilities: [
      'Create wireframes, prototypes, and high-fidelity designs',
      'Conduct user research and usability testing',
      'Develop and maintain design systems',
      'Collaborate with product and engineering teams',
      'Present designs to stakeholders',
    ],
    requirements: [
      '2-4 years of UI/UX design experience',
      'Expert proficiency in Figma',
      'Strong portfolio demonstrating design process',
      'Understanding of user-centered design principles',
      'Experience with design systems',
    ],
    benefits: [
      'Creative work environment',
      'Latest design tools and software',
      'Design conference attendance',
      'Flexible work arrangements',
      'Health benefits',
    ],
  },
  'devops-engineer': {
    title: 'DevOps Engineer',
    type: 'Full-time',
    location: 'Remote',
    experience: '3-5 years',
    description: 'Manage cloud infrastructure and implement CI/CD pipelines to support our growing platform.',
    responsibilities: [
      'Design and maintain cloud infrastructure',
      'Implement and manage CI/CD pipelines',
      'Monitor system performance and security',
      'Automate deployment processes',
      'Ensure high availability and disaster recovery',
    ],
    requirements: [
      '3-5 years of DevOps experience',
      'Strong AWS or GCP experience',
      'Proficiency with Docker and Kubernetes',
      'Experience with Infrastructure as Code',
      'Knowledge of security best practices',
    ],
    benefits: [
      'Fully remote',
      'On-call compensation',
      'Training and certification budget',
      'Competitive salary',
      'Equity participation',
    ],
  },
  'data-analyst': {
    title: 'Data Analyst',
    type: 'Full-time',
    location: 'On-site',
    experience: '1-3 years',
    description: 'Analyze data to provide insights and support business decisions for our educational platform.',
    responsibilities: [
      'Analyze large datasets to identify trends',
      'Create dashboards and reports',
      'Present findings to stakeholders',
      'Collaborate with product teams',
      'Develop predictive models',
    ],
    requirements: [
      '1-3 years of data analysis experience',
      'Proficiency in Python and SQL',
      'Experience with visualization tools',
      'Strong statistical knowledge',
      'Excellent communication skills',
    ],
    benefits: [
      'Data-driven culture',
      'Modern analytics tools',
      'Professional development',
      'Health insurance',
      'Flexible hours',
    ],
  },
};

const CareerDetails = () => {
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    coverLetter: '',
  });
  
  const career = id ? careerData[id] : null;

  if (!career) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Position Not Found</h1>
          <Link to="/careers">
            <Button>View All Positions</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post('/admissions/apply', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        course: career.title,
      });
      toast.success('Application submitted successfully! We will contact you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        course: '',
        coverLetter: '',
      });
    } catch (error: any) {
      console.error('Application API Error:', error);
      toast.error(error?.response?.data?.message || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          to="/careers"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Careers
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{career.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {career.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {career.experience}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              {career.type}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">About the Role</h2>
              <p className="text-muted-foreground">{career.description}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Responsibilities</h2>
              <ul className="space-y-3">
                {career.responsibilities.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Requirements</h2>
              <ul className="space-y-3">
                {career.requirements.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Benefits</h2>
              <ul className="space-y-3">
                {career.benefits.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 bg-card rounded-2xl border border-border/50">
              <h3 className="text-lg font-semibold mb-4">Apply for this Position</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Full Name" 
                    required 
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="email" 
                    placeholder="Email Address" 
                    required 
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="tel" 
                    placeholder="Phone Number" 
                    required 
                    className="pl-10"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <Textarea 
                  placeholder="Cover Letter (Optional)" 
                  rows={4} 
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-secondary"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Submit Application
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CareerDetails;

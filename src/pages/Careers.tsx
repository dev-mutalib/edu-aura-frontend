import { Link } from 'react-router-dom';
import { Briefcase, ArrowRight, MapPin, Clock, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const careers = [
  {
    id: 'mern-full-stack',
    title: 'MERN Full Stack Developer',
    type: 'Full-time',
    location: 'Remote / Hybrid',
    experience: '2-4 years',
    description: 'Build scalable web applications using MongoDB, Express.js, React, and Node.js.',
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'REST APIs'],
  },
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    type: 'Full-time',
    location: 'On-site',
    experience: '1-3 years',
    description: 'Create beautiful, responsive user interfaces with modern frontend technologies.',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    type: 'Full-time',
    location: 'Remote',
    experience: '2-5 years',
    description: 'Design and implement robust server-side applications and APIs.',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS'],
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    type: 'Full-time',
    location: 'Hybrid',
    experience: '2-4 years',
    description: 'Design intuitive user experiences and beautiful interfaces for our products.',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    type: 'Full-time',
    location: 'Remote',
    experience: '3-5 years',
    description: 'Manage cloud infrastructure and implement CI/CD pipelines.',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    type: 'Full-time',
    location: 'On-site',
    experience: '1-3 years',
    description: 'Analyze data to provide insights and support business decisions.',
    skills: ['Python', 'SQL', 'Tableau', 'Excel', 'Statistics'],
  },
];

const Careers = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Briefcase className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Join Our Team</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
            Build Your Career With Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join a team of passionate educators and innovators. We're looking for talented individuals to help shape the future of education.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border/50">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm">50+ Team Members</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border/50">
              <Zap className="h-4 w-4 text-secondary" />
              <span className="text-sm">Fast-Growing</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border/50">
              <MapPin className="h-4 w-4 text-accent" />
              <span className="text-sm">Remote Friendly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
          <div className="grid gap-6">
            {careers.map((job) => (
              <Link
                key={job.id}
                to={`/careers/${job.id}`}
                className="group block p-6 bg-card rounded-2xl border border-border/50 hover:border-primary/50 hover:shadow-glow-sm transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end gap-2">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {job.experience}
                      </span>
                    </div>
                    <span className="px-3 py-1 text-xs font-medium bg-secondary/10 text-secondary rounded-full">
                      {job.type}
                    </span>
                    <Button variant="ghost" className="group-hover:text-primary mt-2">
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl border border-border/50">
          <h2 className="text-2xl font-bold mb-4">Don't See a Perfect Fit?</h2>
          <p className="text-muted-foreground mb-6">
            We're always looking for talented individuals. Send us your resume and we'll reach out when a suitable position opens up.
          </p>
          <Button className="bg-gradient-to-r from-primary to-secondary hover:shadow-glow-md">
            Submit Your Resume
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Careers;

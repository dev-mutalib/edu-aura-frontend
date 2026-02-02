import { useState } from 'react';
import { Search, Filter, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const jobListings = [
  {
    id: 1,
    title: 'FlexJobs',
    url: 'https://flexjobs.com',
    description: 'Discover 50+ remote job categories with 100,000+ listings.',
    category: 'Remote',
  },
  {
    id: 2,
    title: 'We Work Remotely',
    url: 'https://weworkremotely.com',
    description: 'Find 130,000+ remote jobs in tech, design, and more!',
    category: 'Remote',
  },
  {
    id: 3,
    title: 'Arc',
    url: 'https://arc.dev',
    description: 'AI-matched remote developer jobs & internships worldwide.',
    category: 'Remote',
  },
  {
    id: 4,
    title: 'Jobspresso',
    url: 'https://jobspresso.co',
    description: 'Freelance and full-time jobs across 5+ industries.',
    category: 'Remote',
  },
  {
    id: 5,
    title: 'RemoteCo',
    url: 'https://remote.co',
    description: 'Remote work resources and job listings across industries.',
    category: 'Remote',
  },
  {
    id: 6,
    title: 'JustRemote',
    url: 'https://justremote.co',
    description: 'Access hidden remote jobs with PowerSearch for $6/month.',
    category: 'Remote',
  },
  {
    id: 7,
    title: 'Virtual Vocations',
    url: 'https://virtualvocations.com',
    description: 'Thousands of telecommuting jobs & exclusive resources.',
    category: 'Remote',
  },
  {
    id: 8,
    title: 'Remotive',
    url: 'https://remotive.io',
    description: 'Bi-monthly updates of remote jobs in 8+ categories.',
    category: 'Remote',
  },
  {
    id: 9,
    title: 'PeoplePerHour',
    url: 'https://peopleperhour.com',
    description: 'Hire freelancers or find freelance jobs for digital projects.',
    category: 'Freelance',
  },
  {
    id: 10,
    title: 'FreelancerMap',
    url: 'https://freelancermap.com',
    description: 'Global IT freelance jobs with 11,000+ live listings.',
    category: 'Freelance',
  },
  {
    id: 11,
    title: 'Gun.io',
    url: 'https://gun.io',
    description: 'Freelance for developers—keep 100% of what you earn.',
    category: 'Freelance',
  },
  {
    id: 12,
    title: 'Toptal',
    url: 'https://toptal.com',
    description: 'High-paying freelance gigs with 0% commission cuts.',
    category: 'Freelance',
  },
  {
    id: 13,
    title: 'Upwork',
    url: 'https://upwork.com',
    description: 'Millions of freelance gigs for virtual assistants, writers, & more.',
    category: 'Freelance',
  },
  {
    id: 14,
    title: 'Fiverr',
    url: 'https://fiverr.com',
    description: 'Start small with $5+ gigs and build your portfolio.',
    category: 'Freelance',
  },
  {
    id: 15,
    title: 'Guru',
    url: 'https://guru.com',
    description: 'Connect with over 3 million freelancers globally.',
    category: 'Freelance',
  },
  {
    id: 16,
    title: 'Outsourcely',
    url: 'https://outsourcely.com',
    description: 'Work remotely with startups in 180+ countries.',
    category: 'Remote',
  },
  {
    id: 17,
    title: 'TCS (India)',
    url: 'https://www.tcs.com/careers',
    description: 'Hiring for Software Engineers | WFO & Hybrid | Pan India.',
    category: 'Full-Time',
  },
  {
    id: 18,
    title: 'Infosys',
    url: 'https://www.infosys.com/careers',
    description: 'Tech roles with hybrid setup | India-wide hiring.',
    category: 'Full-Time',
  },
  {
    id: 19,
    title: 'Google',
    url: 'https://careers.google.com',
    description: 'Tech, Product, and Operations roles | WFO & Hybrid.',
    category: 'Full-Time',
  },
  {
    id: 20,
    title: 'Cognizant',
    url: 'https://careers.cognizant.com',
    description: 'Hiring freshers & experienced | WFO.',
    category: 'Full-Time',
  },
  {
    id: 21,
    title: 'Capgemini',
    url: 'https://www.capgemini.com/in-en/careers',
    description: 'Hybrid and onsite IT roles across India.',
    category: 'Full-Time',
  },
  {
    id: 22,
    title: 'Wipro',
    url: 'https://careers.wipro.com',
    description: 'Fresher programs & experienced IT roles | WFO & Hybrid.',
    category: 'Full-Time',
  },
  {
    id: 23,
    title: 'HCLTech',
    url: 'https://www.hcltech.com/careers',
    description: 'Jobs for fresh graduates and laterals | WFO & Hybrid.',
    category: 'Full-Time',
  },
  {
    id: 24,
    title: 'IBM',
    url: 'https://www.ibm.com/employment',
    description: 'Global tech roles for experienced candidates | WFO & Hybrid.',
    category: 'Full-Time',
  },
  {
    id: 25,
    title: 'Accenture',
    url: 'https://www.accenture.com/in-en/careers',
    description: 'Global hiring with WFH and hybrid opportunities.',
    category: 'Full-Time',
  },
  {
    id: 26,
    title: 'Deloitte',
    url: 'https://www2.deloitte.com/global/en/careers.html',
    description: 'Consulting and tech roles | WFO & Hybrid.',
    category: 'Full-Time',
  },
  {
    id: 27,
    title: 'Flipkart',
    url: 'https://www.flipkartcareers.com',
    description: 'Tech and operations roles across India.',
    category: 'Full-Time',
  },
  {
    id: 28,
    title: 'Internshala',
    url: 'https://internshala.com',
    description: 'Part-time & internship jobs for students and freshers.',
    category: 'Fresher',
  },
  {
    id: 29,
    title: 'Naukri',
    url: 'https://naukri.com',
    description: 'Full-time & part-time jobs across all industries.',
    category: 'Full-Time',
  },
  {
    id: 30,
    title: 'Indeed India',
    url: 'https://in.indeed.com',
    description: 'Explore both part-time and full-time job opportunities.',
    category: 'Full-Time',
  },
  {
    id: 31,
    title: 'Monster India',
    url: 'https://www.monsterindia.com',
    description: 'Jobs based on job type, role, and work schedule.',
    category: 'Full-Time',
  },
  {
    id: 32,
    title: 'LinkedIn Jobs',
    url: 'https://linkedin.com/jobs',
    description: 'Leverage your professional network to find jobs.',
    category: 'Full-Time',
  },
  {
    id: 33,
    title: 'Glassdoor',
    url: 'https://glassdoor.co.in',
    description: 'Job search with company reviews and salary insights.',
    category: 'Full-Time',
  },
  {
    id: 34,
    title: 'Freshersworld',
    url: 'https://freshersworld.com',
    description: 'Job portal for freshers and experienced professionals.',
    category: 'Fresher',
  },
  {
    id: 35,
    title: 'Shine.com',
    url: 'https://shine.com',
    description: 'Job search and career guidance for professionals.',
    category: 'Full-Time',
  },
  {
    id: 36,
    title: 'SimplyHired',
    url: 'https://simplyhired.com',
    description: 'Job search engine with listings from various job boards.',
    category: 'Full-Time',
  },
  {
    id: 37,
    title: 'CareerBuilder',
    url: 'https://careerbuilder.com',
    description: 'Job search and career advice for job seekers.',
    category: 'Full-Time',
  },
  {
    id: 38,
    title: 'Microsoft',
    url: 'https://careers.microsoft.com',
    description: 'Tech & Management jobs globally.',
    category: 'Full-Time',
  },
  {
    id: 39,
    title: 'Amazon',
    url: 'https://www.amazon.jobs',
    description: 'Global opportunities in tech, logistics, and more.',
    category: 'Full-Time',
  },
  {
    id: 40,
    title: 'Adobe',
    url: 'https://www.adobe.com/careers.html',
    description: 'Creative and tech roles globally.',
    category: 'Full-Time',
  },
  {
    id: 41,
    title: 'SAP',
    url: 'https://www.sap.com/careers.html',
    description: 'Global opportunities in enterprise software.',
    category: 'Full-Time',
  },
  {
    id: 42,
    title: 'Oracle',
    url: 'https://www.oracle.com/corporate/careers',
    description: 'Global tech and consulting roles.',
    category: 'Full-Time',
  },
  {
    id: 43,
    title: 'Apple',
    url: 'https://www.apple.com/jobs/us/',
    description: 'Tech and creative roles globally.',
    category: 'Full-Time',
  },
  {
    id: 44,
    title: 'Meta (Facebook)',
    url: 'https://www.metacareers.com',
    description: 'Global opportunities in tech, product, and design.',
    category: 'Full-Time',
  },
  {
    id: 45,
    title: 'Netflix',
    url: 'https://jobs.netflix.com',
    description: 'Global roles in entertainment, tech, and creative fields.',
    category: 'Full-Time',
  },
  {
    id: 46,
    title: 'Spotify',
    url: 'https://www.spotifyjobs.com',
    description: 'Global opportunities in tech, music, and content.',
    category: 'Full-Time',
  },
  {
    id: 47,
    title: 'Airbnb',
    url: 'https://careers.airbnb.com',
    description: 'Global roles in tech, hospitality, and design.',
    category: 'Full-Time',
  },
  {
    id: 48,
    title: 'Scaler',
    url: 'https://scaler.com/careers',
    description: 'Openings for junior & mid-level devs.',
    category: 'Fresher',
  },
  {
    id: 49,
    title: 'TCS NextStep',
    url: 'https://nextstep.tcs.com',
    description: 'Campus hiring and fresher programs.',
    category: 'Fresher',
  },
  {
    id: 50,
    title: 'Infosys Campus Connect',
    url: 'https://www.infosys.com/careers/',
    description: 'Fresher hiring and training programs.',
    category: 'Fresher',
  },
];

const categories = ['All', 'Fresher', 'Full-Time', 'Remote', 'Freelance'];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || job.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Job Explorer
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore job opportunities from top platforms and companies worldwide.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search platforms or companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-card border-border/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 justify-center mb-8">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'border-border/50 hover:border-primary/50'
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-gradient">Explore Job Opportunities</h2>
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            Showing <span className="font-semibold text-foreground">{filteredJobs.length}</span> platforms
          </p>

          {/* Job Cards Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredJobs.map((job) => (
              <a
                key={job.id}
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/50 hover:shadow-glow-sm transition-all duration-300"
              >
                <div className="flex flex-col h-full">
                  <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-secondary transition-colors">
                    {job.title}
                  </h3>
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-cyan-400 hover:text-cyan-300 mb-3 flex items-center gap-1 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {job.url.replace('https://', '').replace('www.', '').split('/')[0]}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <p className="text-sm text-muted-foreground flex-1">
                    {job.description}
                  </p>
                  <div className="mt-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                      {job.category}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* No Results */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No platforms found matching your criteria.</p>
              <Button
                variant="ghost"
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Jobs;
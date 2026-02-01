import { useState } from 'react';
import { Search, MapPin, Briefcase, Clock, Building, Filter, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const jobListings = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'TechCorp Solutions',
    location: 'Bangalore',
    type: 'Full-time',
    experience: '0-2 years',
    salary: '₹4-6 LPA',
    posted: '2 days ago',
    skills: ['Java', 'Spring Boot', 'MySQL'],
    logo: '🏢',
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'WebStack Inc.',
    location: 'Mumbai',
    type: 'Full-time',
    experience: '1-3 years',
    salary: '₹5-8 LPA',
    posted: '1 day ago',
    skills: ['React', 'TypeScript', 'CSS'],
    logo: '💼',
  },
  {
    id: 3,
    title: 'Business Analyst',
    company: 'Analytics Pro',
    location: 'Delhi',
    type: 'Full-time',
    experience: '2-4 years',
    salary: '₹6-10 LPA',
    posted: '3 days ago',
    skills: ['Excel', 'SQL', 'Power BI'],
    logo: '📊',
  },
  {
    id: 4,
    title: 'Data Scientist',
    company: 'AI Labs',
    location: 'Hyderabad',
    type: 'Full-time',
    experience: '1-3 years',
    salary: '₹8-12 LPA',
    posted: '5 days ago',
    skills: ['Python', 'ML', 'TensorFlow'],
    logo: '🤖',
  },
  {
    id: 5,
    title: 'Marketing Executive',
    company: 'BrandBoost',
    location: 'Pune',
    type: 'Full-time',
    experience: '0-2 years',
    salary: '₹3-5 LPA',
    posted: '1 week ago',
    skills: ['Digital Marketing', 'SEO', 'Content'],
    logo: '📈',
  },
  {
    id: 6,
    title: 'Full Stack Developer',
    company: 'StartupX',
    location: 'Remote',
    type: 'Full-time',
    experience: '2-5 years',
    salary: '₹10-15 LPA',
    posted: '4 days ago',
    skills: ['React', 'Node.js', 'MongoDB'],
    logo: '🚀',
  },
  {
    id: 7,
    title: 'HR Manager',
    company: 'PeopleFirst Corp',
    location: 'Chennai',
    type: 'Full-time',
    experience: '3-5 years',
    salary: '₹7-10 LPA',
    posted: '2 days ago',
    skills: ['Recruitment', 'HR Policies', 'Training'],
    logo: '👥',
  },
  {
    id: 8,
    title: 'UI/UX Designer',
    company: 'DesignHub',
    location: 'Bangalore',
    type: 'Full-time',
    experience: '1-3 years',
    salary: '₹5-8 LPA',
    posted: '6 days ago',
    skills: ['Figma', 'Adobe XD', 'Prototyping'],
    logo: '🎨',
  },
];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState('all');

  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = locationFilter === 'all' || job.location === locationFilter;
    const matchesExperience = experienceFilter === 'all' || job.experience === experienceFilter;
    return matchesSearch && matchesLocation && matchesExperience;
  });

  const locations = [...new Set(jobListings.map((job) => job.location))];
  const experiences = [...new Set(jobListings.map((job) => job.experience))];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Find Your Dream Job
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore job opportunities from our placement partners and kickstart your career.
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search jobs, companies, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-card border-border/50"
              />
            </div>
            <Button className="h-12 px-8 bg-gradient-to-r from-primary to-secondary">
              Search Jobs
            </Button>
          </div>
        </div>
      </section>

      {/* Filters & Jobs */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-[180px] bg-card border-border/50">
                <MapPin className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={experienceFilter} onValueChange={setExperienceFilter}>
              <SelectTrigger className="w-[180px] bg-card border-border/50">
                <Clock className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Experience</SelectItem>
                {experiences.map((exp) => (
                  <SelectItem key={exp} value={exp}>
                    {exp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            Showing <span className="font-semibold text-foreground">{filteredJobs.length}</span> jobs
          </p>

          {/* Job Cards */}
          <div className="grid gap-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="p-6 bg-card rounded-2xl border border-border/50 hover:border-primary/50 hover:shadow-glow-sm transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Company Logo */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-3xl flex-shrink-0">
                    {job.logo}
                  </div>

                  {/* Job Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1 hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Building className="h-4 w-4" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3 w-3" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {job.experience}
                      </span>
                    </div>
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

                  {/* Salary & Apply */}
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-lg font-semibold text-primary">{job.salary}</span>
                    <span className="text-xs text-muted-foreground">{job.posted}</span>
                    <Button size="sm" className="bg-gradient-to-r from-primary to-secondary mt-2">
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {filteredJobs.length > 0 && (
            <div className="text-center mt-8">
              <Button variant="outline" className="gap-2">
                Load More Jobs <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* No Results */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No jobs found matching your criteria.</p>
              <Button
                variant="ghost"
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setLocationFilter('all');
                  setExperienceFilter('all');
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

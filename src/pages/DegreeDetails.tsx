import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, Users, Award, CheckCircle, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const degreeData: Record<string, {
  name: string;
  fullName: string;
  duration: string;
  type: string;
  description: string;
  overview: string;
  eligibility: string[];
  curriculum: { semester: string; subjects: string[] }[];
  careers: string[];
  fees: { component: string; amount: string }[];
}> = {
  bca: {
    name: 'BCA',
    fullName: 'Bachelor of Computer Applications',
    duration: '3 Years (6 Semesters)',
    type: 'Undergraduate',
    description: 'A comprehensive undergraduate program designed to provide students with a strong foundation in computer science and applications.',
    overview: 'The Bachelor of Computer Applications (BCA) program is designed to prepare students for careers in the IT industry. The curriculum covers programming languages, database management, software engineering, and emerging technologies. Students gain hands-on experience through projects, internships, and industry collaborations.',
    eligibility: [
      '10+2 with Mathematics as a subject',
      'Minimum 50% aggregate marks',
      'Valid entrance exam score (if applicable)',
      'Age limit: No upper age limit',
    ],
    curriculum: [
      { semester: 'Semester 1', subjects: ['Programming Fundamentals', 'Mathematics I', 'Digital Electronics', 'Communication Skills'] },
      { semester: 'Semester 2', subjects: ['Data Structures', 'Mathematics II', 'Computer Organization', 'Web Technologies'] },
      { semester: 'Semester 3', subjects: ['Object-Oriented Programming', 'Database Management', 'Operating Systems', 'Software Engineering'] },
      { semester: 'Semester 4', subjects: ['Java Programming', 'Computer Networks', 'Data Mining', 'Project Management'] },
      { semester: 'Semester 5', subjects: ['Python Programming', 'Cloud Computing', 'Mobile App Development', 'Minor Project'] },
      { semester: 'Semester 6', subjects: ['Machine Learning', 'Cyber Security', 'Major Project', 'Internship'] },
    ],
    careers: ['Software Developer', 'Web Developer', 'Database Administrator', 'System Analyst', 'IT Consultant', 'Technical Support Engineer'],
    fees: [
      { component: 'Tuition Fee (per year)', amount: '₹45,000' },
      { component: 'Lab & Library Fee', amount: '₹10,000' },
      { component: 'Examination Fee', amount: '₹5,000' },
      { component: 'Development Fee', amount: '₹5,000' },
    ],
  },
  bba: {
    name: 'BBA',
    fullName: 'Bachelor of Business Administration',
    duration: '3 Years (6 Semesters)',
    type: 'Undergraduate',
    description: 'A professional undergraduate program that develops essential business and management skills for future business leaders.',
    overview: 'The Bachelor of Business Administration (BBA) program provides a comprehensive understanding of business fundamentals including management, marketing, finance, and human resources. The program emphasizes practical learning through case studies, internships, and industry projects.',
    eligibility: [
      '10+2 from any stream',
      'Minimum 50% aggregate marks',
      'Valid entrance exam score (if applicable)',
      'Age limit: No upper age limit',
    ],
    curriculum: [
      { semester: 'Semester 1', subjects: ['Principles of Management', 'Business Economics', 'Business Communication', 'Financial Accounting'] },
      { semester: 'Semester 2', subjects: ['Marketing Management', 'Business Statistics', 'Organizational Behavior', 'Business Law'] },
      { semester: 'Semester 3', subjects: ['Human Resource Management', 'Cost Accounting', 'Operations Management', 'Business Ethics'] },
      { semester: 'Semester 4', subjects: ['Financial Management', 'Consumer Behavior', 'Supply Chain Management', 'Entrepreneurship'] },
      { semester: 'Semester 5', subjects: ['Strategic Management', 'International Business', 'Digital Marketing', 'Minor Project'] },
      { semester: 'Semester 6', subjects: ['Business Analytics', 'Leadership Skills', 'Major Project', 'Internship'] },
    ],
    careers: ['Business Analyst', 'Marketing Manager', 'HR Manager', 'Operations Manager', 'Entrepreneur', 'Management Consultant'],
    fees: [
      { component: 'Tuition Fee (per year)', amount: '₹40,000' },
      { component: 'Lab & Library Fee', amount: '₹8,000' },
      { component: 'Examination Fee', amount: '₹5,000' },
      { component: 'Development Fee', amount: '₹5,000' },
    ],
  },
  'bsc-hospitality': {
    name: 'B.Sc. (HS)',
    fullName: 'Bachelor of Science in Hospitality Studies',
    duration: '3 Years (6 Semesters)',
    type: 'Undergraduate',
    description: 'A specialized undergraduate program designed to prepare students for dynamic careers in the hospitality and tourism industry.',
    overview: 'The Bachelor of Science in Hospitality Studies program combines theoretical knowledge with practical training in hotel operations, food & beverage management, tourism, and event management. Students gain hands-on experience through industry internships and live projects in leading hotels and hospitality organizations.',
    eligibility: [
      '10+2 from any stream',
      'Minimum 50% aggregate marks',
      'Good communication skills',
      'Age limit: No upper age limit',
    ],
    curriculum: [
      { semester: 'Semester 1', subjects: ['Introduction to Hospitality', 'Food Production Basics', 'Communication Skills', 'Computer Applications'] },
      { semester: 'Semester 2', subjects: ['Food & Beverage Service', 'Front Office Operations', 'Tourism Management', 'Housekeeping Operations'] },
      { semester: 'Semester 3', subjects: ['Advanced Food Production', 'Hotel Accounting', 'Nutrition & Menu Planning', 'Event Management'] },
      { semester: 'Semester 4', subjects: ['Hospitality Marketing', 'Human Resource Management', 'Facility Management', 'Travel & Tourism'] },
      { semester: 'Semester 5', subjects: ['Revenue Management', 'Restaurant Management', 'Hospitality Law', 'Industrial Training'] },
      { semester: 'Semester 6', subjects: ['Strategic Hotel Management', 'Entrepreneurship', 'Major Project', 'Industry Internship'] },
    ],
    careers: ['Hotel Manager', 'Restaurant Manager', 'Event Coordinator', 'Tourism Manager', 'Cruise Director', 'Resort Manager'],
    fees: [
      { component: 'Tuition Fee (per year)', amount: '₹50,000' },
      { component: 'Lab & Practical Fee', amount: '₹12,000' },
      { component: 'Examination Fee', amount: '₹5,000' },
      { component: 'Development Fee', amount: '₹6,000' },
    ],
  },
  mca: {
    name: 'MCA',
    fullName: 'Master of Computer Applications',
    duration: '2 Years (4 Semesters)',
    type: 'Postgraduate',
    description: 'An advanced postgraduate program for students aspiring to become software engineers and IT professionals.',
    overview: 'The Master of Computer Applications (MCA) program is designed for graduates who wish to pursue advanced studies in computer science. The curriculum covers advanced programming, software development, artificial intelligence, and research methodologies. Students work on real-world projects and have opportunities for industry placements.',
    eligibility: [
      'Bachelor degree with Mathematics at 10+2 or graduation level',
      'BCA/B.Sc. (CS/IT) or equivalent',
      'Minimum 55% aggregate marks',
      'Valid entrance exam score',
    ],
    curriculum: [
      { semester: 'Semester 1', subjects: ['Advanced Data Structures', 'Computer Networks', 'Database Systems', 'Mathematical Foundations'] },
      { semester: 'Semester 2', subjects: ['Operating Systems', 'Software Engineering', 'Web Technologies', 'Object-Oriented Design'] },
      { semester: 'Semester 3', subjects: ['Artificial Intelligence', 'Cloud Computing', 'Mobile Computing', 'Research Methodology'] },
      { semester: 'Semester 4', subjects: ['Machine Learning', 'Big Data Analytics', 'Major Project', 'Industry Internship'] },
    ],
    careers: ['Software Architect', 'Data Scientist', 'AI Engineer', 'Full Stack Developer', 'Technical Lead', 'Research Scientist'],
    fees: [
      { component: 'Tuition Fee (per year)', amount: '₹65,000' },
      { component: 'Lab & Library Fee', amount: '₹15,000' },
      { component: 'Examination Fee', amount: '₹7,000' },
      { component: 'Development Fee', amount: '₹8,000' },
    ],
  },
  mba: {
    name: 'MBA',
    fullName: 'Master of Business Administration',
    duration: '2 Years (4 Semesters)',
    type: 'Postgraduate',
    description: 'A prestigious postgraduate program that prepares students for leadership roles in business and management.',
    overview: 'The Master of Business Administration (MBA) program is designed for aspiring business leaders who wish to develop strategic thinking and management expertise. The program offers multiple specializations and emphasizes experiential learning through case studies, live projects, and industry interactions.',
    eligibility: [
      'Bachelor degree in any discipline',
      'Minimum 50% aggregate marks',
      'Valid CAT/MAT/GMAT score',
      'Work experience preferred but not mandatory',
    ],
    curriculum: [
      { semester: 'Semester 1', subjects: ['Managerial Economics', 'Financial Accounting', 'Marketing Management', 'Organizational Behavior'] },
      { semester: 'Semester 2', subjects: ['Financial Management', 'Human Resource Management', 'Operations Research', 'Business Analytics'] },
      { semester: 'Semester 3', subjects: ['Strategic Management', 'Specialization Electives', 'Summer Internship Project', 'Industry Seminar'] },
      { semester: 'Semester 4', subjects: ['Entrepreneurship', 'Capstone Project', 'Specialization Electives', 'Industry Placement'] },
    ],
    careers: ['CEO', 'CFO', 'Marketing Director', 'Operations Director', 'Strategy Consultant', 'Investment Banker'],
    fees: [
      { component: 'Tuition Fee (per year)', amount: '₹85,000' },
      { component: 'Lab & Library Fee', amount: '₹15,000' },
      { component: 'Examination Fee', amount: '₹8,000' },
      { component: 'Development Fee', amount: '₹10,000' },
    ],
  },
  'msc-cs': {
    name: 'M.Sc. C.S.',
    fullName: 'Master of Science in Computer Science',
    duration: '2 Years (4 Semesters)',
    type: 'Postgraduate',
    description: 'An advanced research-oriented postgraduate program focused on theoretical and applied computer science.',
    overview: 'The Master of Science in Computer Science (M.Sc. C.S.) program provides in-depth knowledge of advanced computing concepts, algorithms, and research methodologies. The program emphasizes theoretical foundations alongside practical applications in areas like AI, machine learning, data science, and computational theory. Ideal for students pursuing research or academic careers.',
    eligibility: [
      'B.Sc. (CS/IT/Math) or BCA with Mathematics',
      'Minimum 55% aggregate marks',
      'Valid entrance exam score',
      'Strong analytical and mathematical aptitude',
    ],
    curriculum: [
      { semester: 'Semester 1', subjects: ['Advanced Algorithms', 'Theory of Computation', 'Advanced Database Systems', 'Research Methodology'] },
      { semester: 'Semester 2', subjects: ['Machine Learning', 'Distributed Systems', 'Computer Vision', 'Statistical Computing'] },
      { semester: 'Semester 3', subjects: ['Deep Learning', 'Natural Language Processing', 'Advanced Networks', 'Dissertation Phase-I'] },
      { semester: 'Semester 4', subjects: ['Quantum Computing', 'Blockchain Technology', 'Dissertation Phase-II', 'Research Publication'] },
    ],
    careers: ['Research Scientist', 'Data Scientist', 'ML Engineer', 'AI Researcher', 'University Professor', 'R&D Specialist'],
    fees: [
      { component: 'Tuition Fee (per year)', amount: '₹60,000' },
      { component: 'Lab & Research Fee', amount: '₹15,000' },
      { component: 'Examination Fee', amount: '₹6,000' },
      { component: 'Development Fee', amount: '₹7,000' },
    ],
  },
};

const DegreeDetails = () => {
  const { id } = useParams();
  const degree = id ? degreeData[id] : null;

  if (!degree) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Degree Not Found</h1>
          <Link to="/degrees">
            <Button>View All Degrees</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          to="/degrees"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Degrees
        </Link>

        {/* Header */}
        <div className="mb-12 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl">
          <div className="flex items-center gap-4 mb-4">
            <GraduationCap className="h-12 w-12 text-primary" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{degree.name}</h1>
              <p className="text-muted-foreground">{degree.fullName}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-1 px-3 py-1 bg-card rounded-full">
              <Clock className="h-4 w-4 text-primary" />
              {degree.duration}
            </span>
            <span className="flex items-center gap-1 px-3 py-1 bg-card rounded-full">
              <BookOpen className="h-4 w-4 text-secondary" />
              {degree.type}
            </span>
            <span className="flex items-center gap-1 px-3 py-1 bg-card rounded-full">
              <Award className="h-4 w-4 text-accent" />
              NAAC Accredited
            </span>
          </div>
        </div>

        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Program Overview</h2>
          <p className="text-muted-foreground">{degree.overview}</p>
        </section>

        {/* Eligibility */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Eligibility Criteria</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {degree.eligibility.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border/50">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Curriculum */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Curriculum</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {degree.curriculum.map((sem, i) => (
              <div key={i} className="p-4 bg-card rounded-xl border border-border/50">
                <h3 className="font-semibold text-primary mb-3">{sem.semester}</h3>
                <ul className="space-y-2">
                  {sem.subjects.map((subject, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {subject}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Career Opportunities */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Career Opportunities</h2>
          <div className="flex flex-wrap gap-3">
            {degree.careers.map((career, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium"
              >
                {career}
              </span>
            ))}
          </div>
        </section>

        {/* Fee Structure */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Fee Structure</h2>
          <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-semibold">Component</th>
                  <th className="text-right p-4 font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {degree.fees.map((fee, i) => (
                  <tr key={i} className="border-t border-border/50">
                    <td className="p-4 text-muted-foreground">{fee.component}</td>
                    <td className="p-4 text-right font-medium">{fee.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl">
          <h2 className="text-2xl font-bold mb-4">Ready to Apply?</h2>
          <p className="text-muted-foreground mb-6">
            Start your application today and join thousands of successful alumni.
          </p>
          <Link to="/admissions">
            <Button className="bg-gradient-to-r from-primary to-secondary hover:shadow-glow-md">
              Apply Now
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default DegreeDetails;

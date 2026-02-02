import { useNavigate } from 'react-router-dom';
import { 
  Server, 
  Code, 
  Cloud, 
  Brain, 
  Shield, 
  Database, 
  Blocks, 
  Container, 
  FileCode, 
  Layers, 
  Terminal,
  Cpu,
  Gamepad2,
  Radio,
  Globe,
  Smartphone,
  Cog,
  Lock,
  Activity
} from 'lucide-react';

const careers = [
  { id: 'devops-engineer', name: 'DevOps Engineer', category: 'Infrastructure', icon: Server, color: 'from-blue-500 to-cyan-400' },
  { id: 'frontend-developer', name: 'Full Stack Developer', category: 'Development', icon: Code, color: 'from-green-500 to-emerald-400' },
  { id: 'backend-developer', name: 'Cloud Architect', category: 'Cloud', icon: Cloud, color: 'from-purple-500 to-pink-400' },
  { id: 'mern-full-stack', name: 'AI Engineer', category: 'AI/ML', icon: Brain, color: 'from-orange-500 to-amber-400' },
  { id: 'devops-engineer', name: 'Cybersecurity Specialist', category: 'Security', icon: Shield, color: 'from-red-500 to-rose-400' },
  { id: 'data-analyst', name: 'Data Engineer', category: 'Data', icon: Database, color: 'from-indigo-500 to-violet-400' },
  { id: 'mern-full-stack', name: 'MLOps Engineer', category: 'AI/ML', icon: Cog, color: 'from-teal-500 to-cyan-400' },
  { id: 'backend-developer', name: 'Blockchain Developer', category: 'Web3', icon: Blocks, color: 'from-yellow-500 to-orange-400' },
  { id: 'devops-engineer', name: 'Kubernetes Admin', category: 'Cloud', icon: Container, color: 'from-blue-600 to-indigo-400' },
  { id: 'backend-developer', name: 'Python Developer', category: 'Development', icon: FileCode, color: 'from-green-600 to-teal-400' },
  { id: 'frontend-developer', name: 'React Specialist', category: 'Frontend', icon: Layers, color: 'from-cyan-500 to-blue-400' },
  { id: 'backend-developer', name: 'Node.js Developer', category: 'Backend', icon: Terminal, color: 'from-lime-500 to-green-400' },
  { id: 'devops-engineer', name: 'AWS Architect', category: 'Cloud', icon: Cloud, color: 'from-orange-600 to-yellow-400' },
  { id: 'data-analyst', name: 'TensorFlow Expert', category: 'AI/ML', icon: Brain, color: 'from-purple-600 to-pink-400' },
  { id: 'data-analyst', name: 'Data Scientist', category: 'Data', icon: Database, color: 'from-blue-500 to-purple-400' },
  { id: 'frontend-developer', name: 'Game Developer', category: 'Gaming', icon: Gamepad2, color: 'from-pink-500 to-rose-400' },
  { id: 'mern-full-stack', name: 'IoT Developer', category: 'Hardware', icon: Radio, color: 'from-emerald-500 to-teal-400' },
  { id: 'frontend-developer', name: 'WordPress Dev', category: 'CMS', icon: Globe, color: 'from-blue-400 to-indigo-400' },
  { id: 'backend-developer', name: 'Salesforce Dev', category: 'CRM', icon: Cpu, color: 'from-cyan-600 to-blue-400' },
  { id: 'devops-engineer', name: 'QA Automation', category: 'Testing', icon: Activity, color: 'from-violet-500 to-purple-400' },
  { id: 'frontend-developer', name: 'React Native Dev', category: 'Mobile', icon: Smartphone, color: 'from-blue-500 to-cyan-400' },
  { id: 'backend-developer', name: 'Rust Developer', category: 'Systems', icon: Cog, color: 'from-orange-500 to-red-400' },
  { id: 'backend-developer', name: 'Go Developer', category: 'Backend', icon: Terminal, color: 'from-cyan-500 to-teal-400' },
  { id: 'devops-engineer', name: 'DevSecOps Engineer', category: 'Security', icon: Lock, color: 'from-red-600 to-orange-400' },
  { id: 'devops-engineer', name: 'SRE Engineer', category: 'Infrastructure', icon: Server, color: 'from-indigo-500 to-blue-400' },
];

const CourseMarquee: React.FC = () => {
  const navigate = useNavigate();
  
  // Split careers into 5 rows
  const row1 = careers.slice(0, 5);
  const row2 = careers.slice(5, 10);
  const row3 = careers.slice(10, 15);
  const row4 = careers.slice(15, 20);
  const row5 = careers.slice(20, 25);

  const handleCareerClick = (careerId: string) => {
    navigate(`/careers/${careerId}`);
  };

  return (
    <div className="relative w-full py-4 overflow-hidden">
      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

      {/* Row 1 - Scrolling Left */}
      <div className="flex mb-4 animate-marquee-row-1 will-change-transform">
        {[...row1, ...row1, ...row1, ...row1, ...row1, ...row1].map((career, index) => (
          <CareerCard key={`row1-${index}`} career={career} onClick={() => handleCareerClick(career.id)} />
        ))}
      </div>

      {/* Row 2 - Scrolling Right */}
      <div className="flex mb-4 animate-marquee-row-2 will-change-transform">
        {[...row2, ...row2, ...row2, ...row2, ...row2, ...row2].map((career, index) => (
          <CareerCard key={`row2-${index}`} career={career} onClick={() => handleCareerClick(career.id)} />
        ))}
      </div>

      {/* Row 3 - Scrolling Left (faster) */}
      <div className="flex mb-4 animate-marquee-row-3 will-change-transform">
        {[...row3, ...row3, ...row3, ...row3, ...row3, ...row3].map((career, index) => (
          <CareerCard key={`row3-${index}`} career={career} onClick={() => handleCareerClick(career.id)} />
        ))}
      </div>

      {/* Row 4 - Scrolling Right (faster) */}
      <div className="flex mb-4 animate-marquee-row-4 will-change-transform">
        {[...row4, ...row4, ...row4, ...row4, ...row4, ...row4].map((career, index) => (
          <CareerCard key={`row4-${index}`} career={career} onClick={() => handleCareerClick(career.id)} />
        ))}
      </div>

      {/* Row 5 - Scrolling Left */}
      <div className="flex animate-marquee-row-5 will-change-transform">
        {[...row5, ...row5, ...row5, ...row5, ...row5, ...row5].map((career, index) => (
          <CareerCard key={`row5-${index}`} career={career} onClick={() => handleCareerClick(career.id)} />
        ))}
      </div>
    </div>
  );
};

interface CareerCardProps {
  career: {
    id: string;
    name: string;
    category: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  };
  onClick: () => void;
}

const CareerCard: React.FC<CareerCardProps> = ({ career, onClick }) => {
  const IconComponent = career.icon;
  
  return (
    <div className="flex-shrink-0 mx-2" onClick={onClick}>
      <div className="group relative px-4 py-3 rounded-xl bg-card/70 backdrop-blur-sm border border-border/40 hover:border-primary/60 transition-all duration-300 hover:scale-105 cursor-pointer min-w-[160px] md:min-w-[190px] hover:shadow-glow-sm">
        {/* Glow Effect on Hover */}
        <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${career.color} opacity-0 group-hover:opacity-15 transition-opacity blur-sm`} />
        
        <div className="relative flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${career.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
            <IconComponent className="h-4 w-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground whitespace-nowrap group-hover:text-primary transition-colors">{career.name}</span>
            <span className="text-[11px] text-muted-foreground">{career.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseMarquee;

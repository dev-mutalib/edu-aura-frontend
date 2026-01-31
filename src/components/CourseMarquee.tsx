import { GraduationCap } from 'lucide-react';

const courses = [
  { name: 'BCA', fullName: 'Bachelor of Computer Applications' },
  { name: 'BBA', fullName: 'Bachelor of Business Administration' },
  { name: 'MBA', fullName: 'Master of Business Administration' },
  { name: 'MCA', fullName: 'Master of Computer Applications' },
  { name: 'B.Com', fullName: 'Bachelor of Commerce' },
  { name: 'M.Com', fullName: 'Master of Commerce' },
];

const CourseMarquee: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden py-6">
      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

      {/* Marquee Container - Faster Speed */}
      <div className="flex animate-marquee-fast">
        {/* First Set */}
        {courses.map((course, index) => (
          <div
            key={`first-${index}`}
            className="flex-shrink-0 mx-4 group"
          >
            <div className="relative px-8 py-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gradient">{course.name}</h3>
                  <p className="text-xs text-muted-foreground">{course.fullName}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Duplicate Set for Seamless Loop */}
        {courses.map((course, index) => (
          <div
            key={`second-${index}`}
            className="flex-shrink-0 mx-4 group"
          >
            <div className="relative px-8 py-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gradient">{course.name}</h3>
                  <p className="text-xs text-muted-foreground">{course.fullName}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseMarquee;

import { GraduationCap } from 'lucide-react';

const courses = [
  { name: 'BCA', fullName: 'Bachelor of Computer Applications', color: 'from-blue-500 to-cyan-400' },
  { name: 'MCA', fullName: 'Master of Computer Applications', color: 'from-green-500 to-emerald-400' },
  { name: 'BBA', fullName: 'Bachelor of Business Administration', color: 'from-purple-500 to-pink-400' },
  { name: 'MBA', fullName: 'Master of Business Administration', color: 'from-orange-500 to-amber-400' },
];

const CourseMarquee: React.FC = () => {
  return (
    <div className="relative w-full flex items-center justify-center py-16 md:py-24">
      {/* Circular Orbit Container */}
      <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]">
        {/* Orbit Path */}
        <div className="absolute inset-0 rounded-full border border-dashed border-primary/20" />
        <div className="absolute inset-8 rounded-full border border-dashed border-secondary/10" />

        {/* Rotating Container */}
        <div className="absolute inset-0 animate-orbit">
          {courses.map((course, index) => {
            const angle = (index / courses.length) * 360;
            const radius = 50; // percentage from center
            
            return (
              <div
                key={course.name}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `rotate(${angle}deg) translateX(${radius}%)`,
                  transformOrigin: '0 0',
                }}
              >
                <div 
                  className="group cursor-pointer animate-counter-orbit"
                  style={{ 
                    transform: `rotate(-${angle}deg)`,
                    animationDelay: `${index * 0.1}s` 
                  }}
                >
                  <div className={`relative px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-110 shadow-lg`}>
                    {/* Glow Effect on Hover */}
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${course.color} opacity-0 group-hover:opacity-20 transition-opacity blur-sm`} />
                    
                    <div className="relative flex items-center gap-2 sm:gap-3">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${course.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-md`}>
                        <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-foreground">{course.name}</h3>
                        <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block max-w-[100px] truncate">{course.fullName}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseMarquee;

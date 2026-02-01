import { CheckCircle, XCircle, Star, FileText, Briefcase, Key, Trophy, GraduationCap, Code, Smartphone, Rocket, ExternalLink, AlertTriangle, Layers, Zap, Target, TrendingUp, Award, Lightbulb, Users, PenTool } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ResumeBuilder = () => {
  const goldenRules = [
    { icon: Target, text: "Target keywords from job listings (Become an ATS whisperer)" },
    { icon: FileText, text: "One page rule - recruiters spend 6 seconds scanning (Make them count!)" },
    { icon: TrendingUp, text: "Quantify achievements with numbers (Boosted sales by 150%)" },
    { icon: Lightbulb, text: "Action verbs first - Led, Built, Designed, Launched" }
  ];

  const commonMistakes = [
    { icon: XCircle, text: "Fancy fonts & graphics = ATS nightmare (Keep it readable)" },
    { icon: AlertTriangle, text: "Objective statements are dead (Use powerful summaries instead)" },
    { icon: XCircle, text: "Generic skills like 'Team Player' (Show, don't tell)" },
    { icon: AlertTriangle, text: "Typos & grammatical errors (Instant rejection!)" },
    { icon: XCircle, text: "Including salary expectations (Negotiate later, not on paper)" }
  ];

  const resumeTypes = [
    {
      icon: Layers,
      title: "Reverse Chronological",
      description: "Most popular format. Recent experience first, perfect for steady career paths",
      bestFor: "Corporate & traditional roles",
      colorClass: "text-primary"
    },
    {
      icon: Key,
      title: "Skills-Based",
      description: "Highlight abilities over timeline. Ideal for career pivots & gaps",
      bestFor: "Freshers & career changers",
      colorClass: "text-secondary"
    },
    {
      icon: Zap,
      title: "Hybrid Format",
      description: "Best of both worlds - skills upfront with solid experience backup",
      bestFor: "Tech & creative industries",
      colorClass: "text-accent"
    }
  ];

  const topBuilders = [
    { name: "Canva", description: "Design freedom", url: "https://www.canva.com/", gradientClass: "from-primary to-secondary" },
    { name: "Novoresume", description: "ATS optimized", url: "https://novoresume.com/", gradientClass: "from-secondary to-accent" },
    { name: "Google Docs", description: "Clean & free", url: "https://docs.google.com/", gradientClass: "from-accent to-primary" },
    { name: "Zety", description: "Step-by-step", url: "https://zety.com/", gradientClass: "from-purple-500 to-pink-500" }
  ];

  const essentialSections = [
    { icon: Smartphone, title: "Contact Details", description: "Professional email only!", colorClass: "text-primary" },
    { icon: GraduationCap, title: "Education", description: "Relevant coursework wins", colorClass: "text-secondary" },
    { icon: Code, title: "Technical Skills", description: "Tools & technologies", colorClass: "text-accent" },
    { icon: Rocket, title: "Projects", description: "Your proof of work", colorClass: "text-pink-400" },
    { icon: Trophy, title: "Certifications", description: "Industry recognition", colorClass: "text-amber-400" }
  ];

  const sampleResumes = [
    {
      title: "Frontend Developer Resume",
      description: "Modern resume showcasing React, TypeScript and UI/UX skills with measurable project outcomes.",
      url: "https://www.naukri.com/career-advice/information-technology-it-resume-sample-ffid"
    },
    {
      title: "Data Analyst Resume Template",
      description: "Analytics-focused resume with Python, SQL expertise and business impact metrics highlighted.",
      url: "https://www.naukri.com/career-advice/it-fresher-resume-sample-ffid"
    },
    {
      title: "Full Stack Engineer Resume",
      description: "End-to-end development skills showcased with architecture decisions and team contributions.",
      url: "https://www.naukri.com/career-advice/software-engineer-resume-sample-ffid"
    },
    {
      title: "Product Manager Resume",
      description: "Leadership-focused resume highlighting product launches, user growth and stakeholder management.",
      url: "https://www.reddit.com/r/cscareerquestions/"
    }
  ];

  const weakExample = `OBJECTIVE:
Looking for a challenging position

EDUCATION:
Some College, 2020-2024
- Attended classes regularly

SKILLS:
- Microsoft Word
- Internet browsing
- Hardworking
- Quick learner

EXPERIENCE:
Did internship somewhere
- Helped with tasks

INTERESTS:
Netflix, Gaming, Sleeping`;

  const strongExample = `SUMMARY:
Full-stack developer with 2+ projects deployed

EDUCATION:
B.Tech Computer Science | XYZ University
- CGPA: 8.5/10 | Dean's List 2023
- Relevant: DSA, System Design, DBMS

TECHNICAL SKILLS:
- Languages: JavaScript, Python, Java
- Frameworks: React, Node.js, Express
- Tools: Git, Docker, AWS EC2

PROJECTS:
TaskFlow - Project Management App
- Built REST API handling 1000+ requests/day
- Implemented JWT auth reducing breaches by 100%
- Deployed on AWS with 99.9% uptime

ACHIEVEMENTS:
- Winner: TechHacks 2023 (500+ participants)
- Open Source: 50+ GitHub contributions`;

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-float" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent/15 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] animate-float-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10">
        {/* Hero Section with Animation */}
        <section className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm mb-6 animate-fade-in">
              <PenTool className="w-4 h-4 animate-bounce-slow" />
              <span>Your Career Launchpad</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
                Build Your Dream Resume
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Transform from applicant to candidate in minutes ✨
            </p>
          </div>
        </section>

        {/* Golden Rules & Common Mistakes */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
            {/* Golden Rules */}
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-glow-sm group animate-slide-in-left">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-primary/20 group-hover:animate-wiggle">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Golden Rules</h2>
                </div>
                <ul className="space-y-4">
                  {goldenRules.map((item, index) => (
                    <li 
                      key={index} 
                      className="flex items-start gap-3 animate-fade-in hover:translate-x-2 transition-transform duration-300"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <item.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Common Mistakes */}
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-destructive/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] group animate-slide-in-right">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-destructive/20 group-hover:animate-wiggle">
                    <AlertTriangle className="w-6 h-6 text-destructive" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Common Mistakes</h2>
                </div>
                <ul className="space-y-4">
                  {commonMistakes.map((item, index) => (
                    <li 
                      key={index} 
                      className="flex items-start gap-3 animate-fade-in hover:translate-x-2 transition-transform duration-300"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <item.icon className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Resume Formats */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground animate-fade-in">
              Choose Your Format
            </h2>
            <p className="text-center text-muted-foreground mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Pick the style that tells your story best
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {resumeTypes.map((format, index) => (
                <Card 
                  key={index} 
                  className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-glow-md group animate-scale-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:animate-pulse-glow`}>
                        <format.icon className={`w-6 h-6 ${format.colorClass}`} />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{format.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{format.description}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Trophy className="w-4 h-4 text-amber-400" />
                      <span className="text-amber-400">{format.bestFor}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Top Resume Builders */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground animate-fade-in">
              Top Resume Tools
            </h2>
            <p className="text-center text-muted-foreground mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Free platforms to create stunning resumes
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {topBuilders.map((builder, index) => (
                <a
                  key={index}
                  href={builder.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-glow-sm h-full">
                    <CardContent className="p-5 text-center">
                      <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${builder.gradientClass} flex items-center justify-center group-hover:animate-bounce-slow shadow-lg`}>
                        <FileText className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{builder.name}</h3>
                      <p className="text-xs text-muted-foreground">{builder.description}</p>
                      <ExternalLink className="w-4 h-4 mx-auto mt-3 text-primary opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-y-0 translate-y-2" />
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Fresher's Toolkit */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground animate-fade-in">
              🚀 Fresher's Toolkit
            </h2>
            <p className="text-center text-muted-foreground mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Everything you need to land your first job
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Pro Tips */}
              <div className="animate-slide-in-left">
                <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 animate-pulse-glow" />
                  Pro Tips That Work
                </h3>
                <div className="space-y-4">
                  <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-5 hover:border-primary/50 transition-all duration-300 hover:translate-x-2">
                    <h4 className="font-semibold text-foreground mb-2">📊 Numbers Win:</h4>
                    <p className="text-muted-foreground text-sm mb-3">
                      "Improved performance" → "Reduced load time by 40%"
                    </p>
                    <div className="bg-muted/50 rounded-lg p-3 font-mono text-xs">
                      <div className="text-destructive">{"// Weak: Worked on website"}</div>
                      <div className="text-primary">{"// Strong: Built e-commerce site with 10K+ users"}</div>
                    </div>
                  </div>
                  <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-5 hover:border-primary/50 transition-all duration-300 hover:translate-x-2">
                    <h4 className="font-semibold text-foreground mb-2">🎯 Skill Showcase:</h4>
                    <p className="text-muted-foreground text-sm mb-3">
                      Technologies that actually matter in 2024
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs animate-pulse">React/Next.js</span>
                      <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-xs animate-pulse" style={{ animationDelay: '0.2s' }}>TypeScript</span>
                      <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs animate-pulse" style={{ animationDelay: '0.4s' }}>Cloud (AWS/GCP)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Things to Skip */}
              <div className="animate-slide-in-right">
                <h3 className="text-xl font-bold text-destructive mb-6 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Skip These Completely
                </h3>
                <div className="space-y-4">
                  <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-5 hover:border-destructive/50 transition-all duration-300 hover:translate-x-2">
                    <h4 className="font-semibold text-foreground mb-2">📷 Profile Photos:</h4>
                    <p className="text-muted-foreground text-sm">
                      Unless applying in modeling, keep photos on LinkedIn only
                    </p>
                  </div>
                  <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-5 hover:border-destructive/50 transition-all duration-300 hover:translate-x-2">
                    <h4 className="font-semibold text-foreground mb-2">🎮 Random Hobbies:</h4>
                    <p className="text-muted-foreground text-sm">
                      Gaming & Netflix don't impress recruiters (sad but true)
                    </p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 animate-pulse-glow">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5 animate-bounce-slow" />
                      <p className="text-amber-200 text-sm">
                        <strong>Reality Check:</strong> 75% of resumes are rejected by ATS before humans see them!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Essential Sections */}
            <h3 className="text-2xl font-bold text-center mb-8 text-foreground animate-fade-in">
              📋 Must-Have Sections
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {essentialSections.map((item, index) => (
                <Card 
                  key={index} 
                  className="bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-110 hover:shadow-glow-sm group animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4 text-center">
                    <div className="group-hover:animate-bounce-slow">
                      <item.icon className={`w-8 h-8 mx-auto mb-3 ${item.colorClass}`} />
                    </div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground animate-fade-in">
              🎯 Weak vs Strong Resume
            </h2>
            <p className="text-center text-muted-foreground mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              See what makes the difference
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Weak Example */}
              <Card className="bg-card/80 backdrop-blur-sm border-destructive/30 hover:border-destructive/50 transition-all duration-500 group animate-slide-in-left">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-full bg-destructive/20 group-hover:animate-wiggle">
                      <XCircle className="w-5 h-5 text-destructive" />
                    </div>
                    <h3 className="text-lg font-bold text-destructive">❌ Weak Resume</h3>
                  </div>
                  <pre className="bg-muted/50 rounded-lg p-4 text-xs text-muted-foreground overflow-x-auto whitespace-pre-wrap font-mono border border-destructive/20">
                    {weakExample}
                  </pre>
                  <p className="mt-4 text-sm text-destructive flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Vague, no metrics, irrelevant content</span>
                  </p>
                </CardContent>
              </Card>

              {/* Strong Example */}
              <Card className="bg-card/80 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all duration-500 group animate-slide-in-right">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-full bg-primary/20 group-hover:animate-pulse-glow">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-primary">✅ Strong Resume</h3>
                  </div>
                  <pre className="bg-muted/50 rounded-lg p-4 text-xs text-muted-foreground overflow-x-auto whitespace-pre-wrap font-mono border border-primary/20">
                    {strongExample}
                  </pre>
                  <p className="mt-4 text-sm text-primary flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>Specific metrics, relevant projects, achievements</span>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Sample Resumes */}
        <section className="py-12 px-4 pb-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground animate-fade-in">
              📄 Resume Templates & Examples
            </h2>
            <p className="text-center text-muted-foreground mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Get inspired by industry-approved formats
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {sampleResumes.map((example, index) => (
                <a
                  key={index}
                  href={example.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-glow-sm h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {example.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            {example.description}
                          </p>
                        </div>
                        <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-primary text-sm group-hover:translate-x-2 transition-transform">
                        <ExternalLink className="w-4 h-4" />
                        <span>View Template</span>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResumeBuilder;

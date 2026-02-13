import { useState, useEffect } from 'react';
import { X, GraduationCap, User, Phone, Mail, BookOpen, Sparkles, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import api from '@/api/axios';
import { toast } from 'sonner';
import { validateName, validateEmail, validatePhone, validateCourse, sanitizeName, sanitizePhone } from '@/lib/validation';

const AdmissionModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('admissionModalSeen');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('admissionModalSeen', 'true');
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const nameErr = validateName(formData.name);
    const emailErr = validateEmail(formData.email);
    const phoneErr = validatePhone(formData.phone);
    const courseErr = validateCourse(formData.course);
    if (nameErr) newErrors.name = nameErr;
    if (emailErr) newErrors.email = emailErr;
    if (phoneErr) newErrors.phone = phoneErr;
    if (courseErr) newErrors.course = courseErr;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: string) => {
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true);

    try {
      await api.post('/admissions/apply', {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        course: formData.course,
      });

      setIsSubmitted(true);
      toast.success('Application submitted successfully!');
      setFormData({ name: '', email: '', phone: '', course: '' });
      setErrors({});
      
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error: any) {
      console.error('Submission error:', error);
      toast.error(error?.response?.data?.message || 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const courses = [
    { value: 'bca', label: 'BCA - Bachelor of Computer Applications' },
    { value: 'bba', label: 'BBA - Bachelor of Business Administration' },
    { value: 'bsc-hospitality', label: 'B.Sc. (HS) - Hospitality Studies' },
    { value: 'mca', label: 'MCA - Master of Computer Applications' },
    { value: 'mba', label: 'MBA - Master of Business Administration' },
    { value: 'msc-cs', label: 'M.Sc. C.S. - Computer Science' },
  ];

  if (!isOpen) return null;

  const inputClass = (field: string) =>
    `pl-12 h-12 w-full rounded-xl bg-muted/30 border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${errors[field] ? 'border-destructive' : 'border-border/50'}`;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" onClick={handleClose}>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-accent/15 rounded-full blur-[80px] animate-float" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="relative w-full max-w-md animate-scale-in">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur-md opacity-50 animate-gradient-shift bg-[length:200%_200%]" />
        
        <div className="relative bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-accent" />
          
          <button type="button" onClick={handleClose} className="absolute top-4 right-4 p-2.5 rounded-full bg-muted/80 hover:bg-destructive/20 hover:text-destructive transition-all duration-300 z-20 group cursor-pointer" aria-label="Close modal">
            <X className="h-5 w-5 text-muted-foreground group-hover:text-destructive group-hover:rotate-90 transition-all duration-300 pointer-events-none" />
          </button>

          <div className="p-8 pt-10">
            {!isSubmitted ? (
              <>
                <div className="text-center mb-8">
                  <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent mb-5 animate-pulse-glow shadow-glow-md">
                    <GraduationCap className="h-10 w-10 text-white" />
                    <div className="absolute -top-1 -right-1">
                      <Rocket className="w-6 h-6 text-accent animate-bounce-slow" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold mb-3">
                    <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Begin Your Journey!</span>
                  </h2>
                  <p className="text-muted-foreground">Fill in your details & unlock your future 🚀</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input
                        type="text"
                        placeholder="Your Full Name"
                        value={formData.name}
                        onChange={(e) => { setFormData({ ...formData, name: sanitizeName(e.target.value) }); clearError('name'); }}
                        className={inputClass('name')}
                      />
                    </div>
                    {errors.name && <p className="text-xs text-destructive mt-1 ml-1">{errors.name}</p>}
                  </div>

                  <div>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => { setFormData({ ...formData, email: e.target.value }); clearError('email'); }}
                        className={inputClass('email')}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-destructive mt-1 ml-1">{errors.email}</p>}
                  </div>

                  <div>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => { setFormData({ ...formData, phone: sanitizePhone(e.target.value) }); clearError('phone'); }}
                        className={inputClass('phone')}
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-destructive mt-1 ml-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <div className="relative group">
                      <BookOpen className="absolute left-4 top-4 h-5 w-5 text-muted-foreground z-10" />
                      <Select value={formData.course} onValueChange={(value) => { setFormData({ ...formData, course: value }); clearError('course'); }}>
                        <SelectTrigger className={`pl-12 h-12 rounded-xl bg-muted/30 border focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.course ? 'border-destructive' : 'border-border/50'}`}>
                          <SelectValue placeholder="Select Your Course" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border z-[10001]">
                          {courses.map((course) => (
                            <SelectItem key={course.value} value={course.value} className="hover:bg-primary/10 focus:bg-primary/10 cursor-pointer">
                              {course.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {errors.course && <p className="text-xs text-destructive mt-1 ml-1">{errors.course}</p>}
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-glow-lg transition-all duration-300 rounded-xl relative overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        Apply Now
                      </span>
                    )}
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground text-center mt-5">
                  By submitting, you agree to be contacted by our admissions team
                </p>
              </>
            ) : (
              <div className="text-center py-10">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 mb-6 animate-scale-in shadow-glow-md">
                  <svg className="h-12 w-12 text-white animate-bounce-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Application Received! 🎉</h3>
                <p className="text-muted-foreground">Our team will contact you within 24 hours</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionModal;

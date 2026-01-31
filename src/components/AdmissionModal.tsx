import { useState, useEffect } from 'react';
import { X, GraduationCap, User, Phone, Mail, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const AdmissionModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Check if user has seen the modal before
    const hasSeenModal = sessionStorage.getItem('admissionModalSeen');
    if (!hasSeenModal) {
      // Show modal after 2 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('admissionModalSeen', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((res) => setTimeout(res, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Close modal after success
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const courses = [
    { value: 'bca', label: 'BCA - Bachelor of Computer Applications' },
    { value: 'bba', label: 'BBA - Bachelor of Business Administration' },
    { value: 'bcom', label: 'B.Com - Bachelor of Commerce' },
    { value: 'mca', label: 'MCA - Master of Computer Applications' },
    { value: 'mba', label: 'MBA - Master of Business Administration' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-card border border-border/50 rounded-2xl shadow-2xl animate-scale-in overflow-hidden">
        {/* Gradient Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors z-10"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>

        {/* Content */}
        <div className="p-6 pt-8">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-4 animate-pulse-glow">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gradient mb-2">
                  Start Your Journey!
                </h2>
                <p className="text-muted-foreground text-sm">
                  Fill in your details & our team will contact you soon
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10 bg-muted/30 border-border/50 focus:border-primary"
                    required
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 bg-muted/30 border-border/50 focus:border-primary"
                    required
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-10 bg-muted/30 border-border/50 focus:border-primary"
                    required
                  />
                </div>

                <div className="relative">
                  <BookOpen className="absolute left-3 top-3 h-5 w-5 text-muted-foreground z-10" />
                  <Select
                    value={formData.course}
                    onValueChange={(value) => setFormData({ ...formData, course: value })}
                  >
                    <SelectTrigger className="pl-10 bg-muted/30 border-border/50 focus:border-primary">
                      <SelectValue placeholder="Select Course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.value} value={course.value}>
                          {course.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-glow-md transition-all shimmer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Apply Now
                    </span>
                  )}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By submitting, you agree to be contacted by our admissions team
              </p>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mb-4">
                <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Application Received!
              </h3>
              <p className="text-muted-foreground text-sm">
                Our team will contact you within 24 hours
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdmissionModal;

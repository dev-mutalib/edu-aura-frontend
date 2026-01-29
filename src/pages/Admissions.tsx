import { useState } from 'react';
import api from '../api/axios';
import Container from '../components/Container';
import toast, { Toaster } from 'react-hot-toast';
import { FileText, CheckCircle, ClipboardList, Sparkles, Send, User, Mail, Phone, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Admissions = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
  });

  const [loading, setLoading] = useState(false);

  const steps = [
    { icon: ClipboardList, title: 'Fill Application', desc: 'Complete the online application form with your details' },
    { icon: FileText, title: 'Submit Documents', desc: 'Upload required academic documents and certificates' },
    { icon: CheckCircle, title: 'Get Confirmation', desc: 'Receive admission confirmation and enrollment details' },
  ];

  const submitHandler = async () => {
    if (!form.name || !form.email || !form.phone || !form.course) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      await api.post('/admissions/apply', form);
      toast.success('Admission applied successfully');

      setForm({
        name: '',
        email: '',
        phone: '',
        course: '',
      });
    } catch (error: any) {
      console.error('Admission API Error:', error);
      toast.error(
        error?.response?.data?.message || 'Failed to apply admission',
      );
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    { key: 'name', placeholder: 'Full Name', icon: User, type: 'text' },
    { key: 'email', placeholder: 'Email Address', icon: Mail, type: 'email' },
    { key: 'phone', placeholder: 'Phone Number', icon: Phone, type: 'tel' },
    { key: 'course', placeholder: 'Preferred Course', icon: BookOpen, type: 'text' },
  ];

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* TOASTER */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { 
            fontSize: '14px',
            background: 'hsl(var(--card))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">Join Us Today</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            <span className="text-gradient">Admission Form</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in delay-200">
            Take the first step towards your future. Apply now and join our community of learners.
          </p>
        </div>
      </section>

      {/* Admission Steps */}
      <section className="relative py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {steps.map((step, index) => (
              <Card key={index} className="card-hover bg-card/50 border-border/50 backdrop-blur-sm animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6 text-center">
                  <div className="relative mx-auto mb-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary p-4">
                      <step.icon className="h-full w-full text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Form */}
          <Card className="max-w-xl mx-auto bg-card/50 border-border/50 backdrop-blur-sm animate-fade-in delay-300">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gradient mb-2">Apply Now</h2>
                <p className="text-muted-foreground">Fill in your details to get started</p>
              </div>

              <div className="space-y-4">
                {inputFields.map((field) => (
                  <div key={field.key} className="relative group">
                    <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      type={field.type}
                      value={(form as any)[field.key]}
                      className="w-full pl-12 pr-4 py-3 rounded-lg bg-muted/30 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-muted/50 transition-all duration-300"
                      placeholder={field.placeholder}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                ))}

                <button
                  onClick={submitHandler}
                  disabled={loading}
                  className={`w-full mt-6 py-3.5 rounded-lg font-medium text-white flex items-center justify-center gap-2 transition-all duration-300 ${
                    loading
                      ? 'cursor-not-allowed bg-muted'
                      : 'bg-gradient-to-r from-primary to-secondary hover:shadow-glow-md hover:scale-[1.02] shimmer'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Apply Now
                    </>
                  )}
                </button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 mt-12">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-gradient">Need Help?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our admissions team is here to guide you through the process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+918830772432"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium hover:shadow-glow-md transition-all duration-300"
            >
              <Phone className="h-5 w-5" />
              Call Us
            </a>
            <a
              href="mailto:principal@ssbesitm.org"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-primary/50 text-primary font-medium hover:bg-primary/10 transition-all duration-300"
            >
              <Mail className="h-5 w-5" />
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;
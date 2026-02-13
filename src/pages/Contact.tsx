import { useState } from 'react';
import api from '../api/axios';
import Container from '../components/Container';
import toast, { Toaster } from 'react-hot-toast';
import { Mail, Phone, MapPin, Send, User, MessageSquare, FileText, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { validateName, validateEmail, validatePhone, validateMessage, validateSubject, sanitizeName, sanitizePhone } from '@/lib/validation';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const phoneErr = validatePhone(phone);
    const subjectErr = validateSubject(subject);
    const messageErr = validateMessage(message);
    if (nameErr) newErrors.name = nameErr;
    if (emailErr) newErrors.email = emailErr;
    if (phoneErr) newErrors.phone = phoneErr;
    if (subjectErr) newErrors.subject = subjectErr;
    if (messageErr) newErrors.message = messageErr;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: string) => {
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const submitHandler = async () => {
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      setLoading(true);
      await api.post('/admissions/apply', {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        course: subject.trim() || 'Contact Inquiry',
      });
      toast.success('Message sent successfully');
      resetForm();
    } catch (error: any) {
      console.error('Contact API error:', error);
      toast.error(error?.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: MapPin, title: 'Address', value: 'Maharashtra, India', color: 'primary' },
    { icon: Phone, title: 'Phone', value: '+91 88307 72432', href: 'tel:+918830772432', color: 'secondary' },
    { icon: Mail, title: 'Email', value: 'principal@ssbesitm.org', href: 'mailto:principal@ssbesitm.org', color: 'accent' },
  ];

  const inputClass = (field: string) =>
    `w-full pl-12 pr-4 py-3 rounded-lg bg-muted/30 border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-muted/50 transition-all duration-300 ${errors[field] ? 'border-destructive' : 'border-border/50'}`;

  return (
    <div className="relative min-h-screen pt-16 overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

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

      {/* FLOATING CONTACT ICONS */}
      <div className="fixed top-[35%] right-3 z-50 flex flex-col gap-3">
        <a href="https://wa.me/918830772432" target="_blank" rel="noopener noreferrer" className="group rounded-full bg-card/80 backdrop-blur-sm p-2.5 shadow-lg border border-border/50 transition-all duration-300 hover:scale-110 hover:shadow-glow-md">
          <img src="https://img.icons8.com/color/36/whatsapp--v1.png" alt="WhatsApp" className="h-8 w-8" />
        </a>
        <a href="mailto:principal@ssbesitm.org" className="group rounded-full bg-card/80 backdrop-blur-sm p-2.5 shadow-lg border border-border/50 transition-all duration-300 hover:scale-110 hover:shadow-glow-md">
          <img src="https://img.icons8.com/color/36/gmail-new.png" alt="Gmail" className="h-8 w-8" />
        </a>
        <a href="tel:+918830772432" className="group rounded-full bg-card/80 backdrop-blur-sm p-2.5 shadow-lg border border-border/50 transition-all duration-300 hover:scale-110 hover:shadow-glow-md">
          <img src="https://img.icons8.com/color/36/phone.png" alt="Phone" className="h-8 w-8" />
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">Get In Touch</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            <span className="text-gradient">Contact Us</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in delay-200">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <Container>
        <div className="relative z-10 pb-20">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <Card key={index} className="card-hover bg-card/50 border-border/50 backdrop-blur-sm animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6 text-center">
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-${info.color} to-secondary p-3`}>
                    <info.icon className="h-full w-full text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{info.title}</h3>
                  {info.href ? (
                    <a href={info.href} className="text-muted-foreground hover:text-primary transition-colors">{info.value}</a>
                  ) : (
                    <p className="text-muted-foreground">{info.value}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Google Map */}
          <Card className="mb-12 bg-card/50 border-border/50 backdrop-blur-sm animate-fade-in overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <div className="absolute top-4 left-4 z-10 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-border/50">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Our Location
                  </h3>
                  <p className="text-sm text-muted-foreground">Institute of Management and Technology</p>
                </div>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15074.93714553633!2d77.32923!3d19.163105!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd1d6608f835e5d%3A0x77334c6ef2a354f7!2sInstitute%20of%20Management%20and%20Technology!5e0!3m2!1sen!2sin!4v1770244470075!5m2!1sen!2sin" 
                  width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full" title="Institute of Management and Technology Location"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="max-w-xl mx-auto bg-card/50 border-border/50 backdrop-blur-sm animate-fade-in delay-300">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gradient mb-2">Send Us a Message</h2>
                <p className="text-muted-foreground">Fill out the form below and we'll get back to you</p>
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input type="text" placeholder="Your Name" value={name} onChange={(e) => { setName(sanitizeName(e.target.value)); clearError('name'); }} disabled={loading} className={inputClass('name')} />
                  </div>
                  {errors.name && <p className="text-xs text-destructive mt-1 ml-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input type="email" placeholder="Your Email" value={email} onChange={(e) => { setEmail(e.target.value); clearError('email'); }} disabled={loading} className={inputClass('email')} />
                  </div>
                  {errors.email && <p className="text-xs text-destructive mt-1 ml-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input type="tel" placeholder="Your Phone Number" value={phone} onChange={(e) => { setPhone(sanitizePhone(e.target.value)); clearError('phone'); }} disabled={loading} className={inputClass('phone')} />
                  </div>
                  {errors.phone && <p className="text-xs text-destructive mt-1 ml-1">{errors.phone}</p>}
                </div>

                {/* Subject */}
                <div>
                  <div className="relative group">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input type="text" placeholder="Subject" value={subject} onChange={(e) => { setSubject(e.target.value); clearError('subject'); }} disabled={loading} className={inputClass('subject')} />
                  </div>
                  {errors.subject && <p className="text-xs text-destructive mt-1 ml-1">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <div className="relative group">
                    <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <textarea rows={5} placeholder="Your Message" value={message} onChange={(e) => { setMessage(e.target.value); clearError('message'); }} disabled={loading} className={`${inputClass('message')} resize-none`} />
                  </div>
                  {errors.message && <p className="text-xs text-destructive mt-1 ml-1">{errors.message}</p>}
                </div>

                <button
                  onClick={submitHandler}
                  disabled={loading}
                  className={`w-full mt-4 py-3.5 rounded-lg font-medium text-white flex items-center justify-center gap-2 transition-all duration-300 ${
                    loading ? 'cursor-not-allowed bg-muted' : 'bg-gradient-to-r from-primary to-secondary hover:shadow-glow-md hover:scale-[1.02] shimmer'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default Contact;

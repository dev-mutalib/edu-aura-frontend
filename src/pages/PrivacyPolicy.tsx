import { Shield, Eye, Database, Lock, Share2, UserCheck, Bell, Trash2, Globe, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Eye,
      title: "1. Information We Collect",
      content: `We collect information to provide and improve our educational services. The types of information we collect include:

Personal Information:
• Full name, email address, and phone number
• Date of birth and gender
• Educational qualifications and work experience
• Resume and career-related documents
• Profile photos and identification documents

Usage Information:
• Device information (browser type, operating system, device ID)
• IP address and location data
• Course progress and learning analytics
• Time spent on platform and interaction patterns
• Search queries and preferences

Payment Information:
• Billing address and payment method details
• Transaction history and receipts
• Note: We use secure third-party payment processors`
    },
    {
      icon: Database,
      title: "2. How We Use Your Information",
      content: `Your information is used to deliver and enhance our educational services:

Primary Uses:
• Creating and managing your EduAura account
• Providing personalized course recommendations
• Processing payments and maintaining transaction records
• Generating certificates and academic records
• Sending important updates about your courses

Communication:
• Course reminders and deadline notifications
• Newsletter and educational content (with consent)
• Customer support and query resolution
• Marketing communications (opt-out available)

Analytics & Improvement:
• Understanding user behavior to improve our platform
• Developing new features and courses
• Conducting research on learning effectiveness
• Ensuring platform security and preventing fraud`
    },
    {
      icon: Share2,
      title: "3. Information Sharing & Disclosure",
      content: `We respect your privacy and limit sharing of your information:

We May Share With:
• Service providers who assist our operations (hosting, payment processing, analytics)
• Educational partners for certification and verification
• Employers (only with your explicit consent for job placements)
• Legal authorities when required by law

We Never:
• Sell your personal information to third parties
• Share your data for advertising without consent
• Disclose sensitive information without legal obligation

Third-Party Services:
• Our platform may integrate with third-party services
• Each third party has its own privacy policy
• We recommend reviewing their policies before use`
    },
    {
      icon: Lock,
      title: "4. Data Security",
      content: `We implement robust security measures to protect your data:

Technical Safeguards:
• SSL/TLS encryption for all data transmission
• AES-256 encryption for stored sensitive data
• Regular security audits and penetration testing
• Firewall protection and intrusion detection systems
• Secure data centers with physical access controls

Organizational Measures:
• Staff training on data protection
• Access controls and authentication protocols
• Regular backup and disaster recovery procedures
• Incident response and breach notification processes

Despite our efforts, no method of transmission or storage is 100% secure. We cannot guarantee absolute security but commit to promptly addressing any breaches.`
    },
    {
      icon: UserCheck,
      title: "5. Your Rights & Choices",
      content: `You have significant control over your personal information:

Access & Portability:
• Request a copy of all data we hold about you
• Receive your data in a structured, machine-readable format
• Transfer your data to another service provider

Correction & Deletion:
• Update or correct inaccurate information
• Request deletion of your personal data
• Note: Some data may be retained for legal requirements

Control & Preferences:
• Opt-out of marketing communications
• Manage cookie preferences
• Control visibility of your profile
• Withdraw consent for data processing

To exercise these rights, contact us at privacy@eduaura.com. We will respond within 30 days.`
    },
    {
      icon: Bell,
      title: "6. Cookies & Tracking Technologies",
      content: `We use cookies and similar technologies to enhance your experience:

Types of Cookies:
• Essential Cookies: Required for basic site functionality
• Analytics Cookies: Help us understand how you use our platform
• Preference Cookies: Remember your settings and choices
• Marketing Cookies: Used for personalized advertising (with consent)

Managing Cookies:
• You can control cookies through browser settings
• Blocking all cookies may affect site functionality
• We provide a cookie preference center for granular control

Other Technologies:
• Web beacons and pixel tags for email tracking
• Local storage for offline functionality
• Session storage for temporary data`
    },
    {
      icon: Globe,
      title: "7. International Data Transfers",
      content: `Your data may be transferred and processed in different locations:

Data Storage:
• Primary servers located in India
• Backup servers may be in other regions
• Cloud services may process data globally

Safeguards:
• We ensure adequate protection for international transfers
• Standard contractual clauses with service providers
• Compliance with applicable data protection laws

Regional Compliance:
• We comply with GDPR for European users
• CCPA compliance for California residents
• IT Act 2000 and SPDI Rules for Indian users

Your rights remain protected regardless of where data is processed.`
    },
    {
      icon: Trash2,
      title: "8. Data Retention & Deletion",
      content: `We retain your data only as long as necessary:

Retention Periods:
• Active account data: Duration of account plus 3 years
• Course completion records: 7 years for certification purposes
• Payment records: As required by tax and financial regulations
• Marketing preferences: Until you opt-out

Deletion Process:
• Account deletion requests processed within 30 days
• Some data retained for legal compliance
• Backup deletion may take up to 90 days
• Anonymized data may be retained for analytics

Inactive Accounts:
• Accounts inactive for 3+ years may be deleted
• You'll receive notification before deletion
• Option to reactivate within grace period`
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-background to-primary/5" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float-slow" />
        
        <div className="container relative mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <Shield className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Your Privacy Matters</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-4">
              We are committed to protecting your privacy and ensuring the security of your personal information.
            </p>
            
            <p className="text-sm text-muted-foreground">
              Last updated: February 1, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Key Points Summary */}
          <div className="mb-12 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
            <h2 className="text-xl font-bold text-foreground mb-4">Key Points Summary</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <Lock className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <span>Your data is encrypted and securely stored</span>
              </div>
              <div className="flex items-start gap-2">
                <Share2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <span>We never sell your personal information</span>
              </div>
              <div className="flex items-start gap-2">
                <UserCheck className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <span>You control your data and preferences</span>
              </div>
              <div className="flex items-start gap-2">
                <Trash2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <span>Request deletion of your data anytime</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <div 
                key={index}
                className="group p-6 md:p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-secondary/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/20 group-hover:from-secondary/30 group-hover:to-primary/30 transition-all">
                    <section.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 group-hover:text-secondary transition-colors">
                      {section.title}
                    </h2>
                    <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-secondary/10 to-primary/10 border border-secondary/20">
            <div className="flex items-center gap-4 mb-4">
              <Mail className="h-6 w-6 text-secondary" />
              <h3 className="text-xl font-bold text-foreground">Privacy Concerns?</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              If you have any questions about our Privacy Policy or want to exercise your data rights, please contact our Data Protection Officer.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="mailto:privacy@eduaura.com" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
              >
                <Mail className="h-4 w-4" />
                privacy@eduaura.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;

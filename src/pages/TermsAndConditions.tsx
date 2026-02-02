import { FileText, Shield, AlertTriangle, Scale, Users, Globe, Mail } from 'lucide-react';

const TermsAndConditions = () => {
  const sections = [
    {
      icon: Shield,
      title: "1. Acceptance of Terms",
      content: `By accessing and using the EduAura website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.

These terms apply to all visitors, users, students, and others who access or use our educational platform. We reserve the right to update or modify these terms at any time without prior notice. Your continued use of the website after any changes constitutes acceptance of the new terms.`
    },
    {
      icon: Users,
      title: "2. User Eligibility & Registration",
      content: `To use certain features of EduAura, you may be required to register for an account. You must provide accurate, current, and complete information during registration. You are responsible for maintaining the confidentiality of your account credentials.

Eligibility requirements:
• You must be at least 16 years of age to use our services independently
• Users under 16 must have parental or guardian consent
• You must provide valid identification documents when required
• False or misleading information may result in account termination`
    },
    {
      icon: FileText,
      title: "3. Educational Services",
      content: `EduAura provides educational content, courses, career guidance, and related services. We strive to deliver high-quality education but make no guarantees regarding specific outcomes, employment, or career advancement.

Our services include:
• Online and offline course materials
• Career counseling and guidance
• Resume building tools
• Job placement assistance
• Library and resource access
• Faculty support and mentorship

Course content, schedules, and fees are subject to change. Enrolled students will be notified of significant changes affecting their studies.`
    },
    {
      icon: Scale,
      title: "4. Intellectual Property Rights",
      content: `All content on EduAura, including but not limited to text, graphics, logos, images, audio, video, software, and course materials, is the property of EduAura or its content suppliers and is protected by intellectual property laws.

Prohibited actions:
• Reproducing, distributing, or modifying our content without permission
• Using our materials for commercial purposes
• Removing copyright or proprietary notices
• Reverse engineering any software or technology
• Creating derivative works without authorization

Limited license is granted for personal, non-commercial educational use only.`
    },
    {
      icon: AlertTriangle,
      title: "5. User Conduct & Responsibilities",
      content: `Users agree to use EduAura services responsibly and in compliance with all applicable laws. The following conduct is strictly prohibited:

• Harassment, bullying, or discrimination of any kind
• Sharing account credentials with unauthorized persons
• Uploading malicious software or harmful content
• Attempting to breach security or access restricted areas
• Cheating, plagiarism, or academic dishonesty
• Misrepresenting your identity or qualifications
• Commercial use without written authorization
• Any activity that disrupts our services or other users`
    },
    {
      icon: Globe,
      title: "6. Payment & Refund Policy",
      content: `Payment terms for courses and services are specified at the time of enrollment. All fees must be paid according to the agreed schedule.

Refund Policy:
• Full refund available within 7 days of enrollment if no content accessed
• 50% refund available within 14 days with less than 20% content accessed
• No refunds after 14 days or once 20% of course content is accessed
• Administrative fees may apply to all refunds
• Refunds processed within 15-30 business days

Payment methods accepted include credit/debit cards, UPI, net banking, and EMI options where available.`
    },
    {
      icon: Shield,
      title: "7. Limitation of Liability",
      content: `EduAura and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.

We do not guarantee:
• Uninterrupted or error-free service
• Specific educational outcomes or job placement
• Accuracy of all content at all times
• Compatibility with all devices or browsers

Our total liability shall not exceed the amount paid by you for the specific service in question. This limitation applies to the fullest extent permitted by applicable law.`
    },
    {
      icon: Scale,
      title: "8. Governing Law & Disputes",
      content: `These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising from these terms or your use of our services shall be subject to the exclusive jurisdiction of the courts in [City, State].

Before initiating legal proceedings, parties agree to attempt resolution through:
1. Direct negotiation between the parties
2. Mediation by a mutually agreed mediator
3. Arbitration under the Arbitration and Conciliation Act
4. Court proceedings as a last resort

The prevailing party in any dispute may be entitled to recover reasonable legal fees.`
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-slow" />
        
        <div className="container relative mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Legal Document</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Terms & Conditions
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-4">
              Please read these terms carefully before using EduAura services. By using our platform, you agree to be bound by these terms.
            </p>
            
            <p className="text-sm text-muted-foreground">
              Last updated: February 1, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div 
                key={index}
                className="group p-6 md:p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all">
                    <section.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
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
          <div className="mt-12 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
            <div className="flex items-center gap-4 mb-4">
              <Mail className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold text-foreground">Questions About These Terms?</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these Terms and Conditions, please contact our legal team.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="mailto:legal@eduaura.com" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Mail className="h-4 w-4" />
                legal@eduaura.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;

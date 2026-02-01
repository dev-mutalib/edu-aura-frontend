import { useState } from 'react';
import { FileText, Download, Star, Users, Briefcase, GraduationCap, Code, Palette, ChevronRight, Check, Sparkles, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ResumeTemplate {
  id: string;
  name: string;
  category: 'fresher' | 'intermediate' | 'advanced' | 'creative';
  description: string;
  bestFor: string[];
  features: string[];
  previewColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

const templates: ResumeTemplate[] = [
  {
    id: 'clean-starter',
    name: 'Clean Starter',
    category: 'fresher',
    description: 'Perfect for freshers with minimal experience. Clean layout that highlights education and skills.',
    bestFor: ['Fresh Graduates', 'Internship Seekers', 'Entry-Level Jobs'],
    features: ['Education-focused', 'Skills section', 'Projects highlight', 'Clean typography'],
    previewColor: 'from-blue-500 to-cyan-500',
    icon: GraduationCap
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    category: 'fresher',
    description: 'Minimalist design that lets your content shine. Great for tech freshers.',
    bestFor: ['Tech Freshers', 'IT Graduates', 'Data Science Beginners'],
    features: ['Minimalist design', 'Tech-friendly', 'GitHub/Portfolio links', 'ATS-friendly'],
    previewColor: 'from-slate-600 to-slate-800',
    icon: Code
  },
  {
    id: 'professional-classic',
    name: 'Professional Classic',
    category: 'intermediate',
    description: 'Traditional professional layout perfect for 1-3 years of experience.',
    bestFor: ['Mid-level Professionals', 'Corporate Jobs', 'Business Roles'],
    features: ['Experience-focused', 'Achievement highlights', 'Professional summary', 'References section'],
    previewColor: 'from-emerald-500 to-teal-600',
    icon: Briefcase
  },
  {
    id: 'tech-pro',
    name: 'Tech Pro',
    category: 'intermediate',
    description: 'Designed for developers and IT professionals with 2-4 years experience.',
    bestFor: ['Software Developers', 'DevOps Engineers', 'Full Stack Developers'],
    features: ['Technical skills grid', 'Project portfolio', 'Certifications', 'GitHub integration'],
    previewColor: 'from-purple-500 to-pink-500',
    icon: Code
  },
  {
    id: 'executive-elite',
    name: 'Executive Elite',
    category: 'advanced',
    description: 'Premium template for senior professionals and executives with 5+ years experience.',
    bestFor: ['Senior Managers', 'Directors', 'C-Level Executives'],
    features: ['Leadership highlights', 'KPI achievements', 'Board positions', 'Publications'],
    previewColor: 'from-amber-500 to-orange-600',
    icon: Star
  },
  {
    id: 'senior-tech-lead',
    name: 'Senior Tech Lead',
    category: 'advanced',
    description: 'For tech leaders, architects, and senior engineers with extensive experience.',
    bestFor: ['Tech Leads', 'Solution Architects', 'Engineering Managers'],
    features: ['Architecture experience', 'Team leadership', 'Tech stack mastery', 'Open source contributions'],
    previewColor: 'from-indigo-500 to-violet-600',
    icon: Users
  },
  {
    id: 'creative-designer',
    name: 'Creative Portfolio',
    category: 'creative',
    description: 'Eye-catching design for creative professionals and designers.',
    bestFor: ['UI/UX Designers', 'Graphic Designers', 'Creative Directors'],
    features: ['Visual portfolio', 'Color customization', 'Creative layout', 'Brand identity'],
    previewColor: 'from-pink-500 to-rose-500',
    icon: Palette
  },
  {
    id: 'academic-scholar',
    name: 'Academic Scholar',
    category: 'advanced',
    description: 'Perfect for academics, researchers, and PhD candidates.',
    bestFor: ['Researchers', 'Professors', 'PhD Candidates'],
    features: ['Publications list', 'Research experience', 'Grants & funding', 'Conference papers'],
    previewColor: 'from-teal-500 to-cyan-600',
    icon: GraduationCap
  }
];

const initialFormData = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  portfolio: '',
  summary: '',
  experience: '',
  education: '',
  skills: '',
  projects: '',
  certifications: ''
};

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  summary: string;
  experience: string;
  education: string;
  skills: string;
  projects: string;
  certifications: string;
}

// Template 1: Clean Starter - Centered, Simple Blue Theme
const getCleanStarterHTML = (data: FormData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${data.fullName || 'Resume'}</title>
  <style>
    @page { margin: 0; size: A4; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Georgia', serif; line-height: 1.7; color: #1e293b; padding: 50px; background: white; }
    .header { text-align: center; margin-bottom: 35px; padding-bottom: 25px; border-bottom: 3px solid #3b82f6; }
    .name { font-size: 38px; font-weight: bold; color: #1e40af; margin-bottom: 12px; letter-spacing: 2px; }
    .contact { font-size: 13px; color: #64748b; }
    .contact span { margin: 0 8px; }
    .section { margin-bottom: 28px; }
    .section-title { font-size: 16px; font-weight: bold; color: #1e40af; border-bottom: 2px solid #93c5fd; padding-bottom: 6px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px; }
    .content { font-size: 13px; white-space: pre-line; color: #475569; }
    @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="name">${data.fullName || 'Your Name'}</div>
    <div class="contact">
      <span>✉ ${data.email || 'email@example.com'}</span>
      <span>📞 ${data.phone || '+91 XXXXX'}</span>
      <span>📍 ${data.location || 'City'}</span>
    </div>
    ${data.linkedin || data.portfolio ? `<div class="contact" style="margin-top:8px;">${data.linkedin ? `<span>🔗 ${data.linkedin}</span>` : ''}${data.portfolio ? `<span>🌐 ${data.portfolio}</span>` : ''}</div>` : ''}
  </div>
  ${data.summary ? `<div class="section"><div class="section-title">Professional Summary</div><div class="content">${data.summary}</div></div>` : ''}
  ${data.education ? `<div class="section"><div class="section-title">Education</div><div class="content">${data.education}</div></div>` : ''}
  ${data.skills ? `<div class="section"><div class="section-title">Skills</div><div class="content">${data.skills}</div></div>` : ''}
  ${data.projects ? `<div class="section"><div class="section-title">Projects</div><div class="content">${data.projects}</div></div>` : ''}
  ${data.experience ? `<div class="section"><div class="section-title">Experience</div><div class="content">${data.experience}</div></div>` : ''}
  ${data.certifications ? `<div class="section"><div class="section-title">Certifications</div><div class="content">${data.certifications}</div></div>` : ''}
</body>
</html>`;

// Template 2: Modern Minimal - Ultra Clean, Sans-serif
const getModernMinimalHTML = (data: FormData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${data.fullName || 'Resume'}</title>
  <style>
    @page { margin: 0; size: A4; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #111; padding: 60px; background: white; }
    .header { margin-bottom: 40px; }
    .name { font-size: 32px; font-weight: 300; color: #000; text-transform: uppercase; letter-spacing: 6px; margin-bottom: 15px; }
    .divider { width: 60px; height: 2px; background: #000; margin-bottom: 15px; }
    .contact { font-size: 11px; color: #555; letter-spacing: 1px; }
    .contact-item { display: inline-block; margin-right: 25px; }
    .section { margin-bottom: 30px; }
    .section-title { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 4px; color: #000; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 1px solid #ddd; }
    .content { font-size: 12px; white-space: pre-line; color: #333; line-height: 1.8; }
    @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="name">${data.fullName || 'Your Name'}</div>
    <div class="divider"></div>
    <div class="contact">
      <span class="contact-item">${data.email || 'email@example.com'}</span>
      <span class="contact-item">${data.phone || '+91 XXXXX'}</span>
      <span class="contact-item">${data.location || 'City'}</span>
      ${data.linkedin ? `<span class="contact-item">${data.linkedin}</span>` : ''}
      ${data.portfolio ? `<span class="contact-item">${data.portfolio}</span>` : ''}
    </div>
  </div>
  ${data.summary ? `<div class="section"><div class="section-title">About</div><div class="content">${data.summary}</div></div>` : ''}
  ${data.experience ? `<div class="section"><div class="section-title">Experience</div><div class="content">${data.experience}</div></div>` : ''}
  ${data.education ? `<div class="section"><div class="section-title">Education</div><div class="content">${data.education}</div></div>` : ''}
  ${data.skills ? `<div class="section"><div class="section-title">Skills</div><div class="content">${data.skills}</div></div>` : ''}
  ${data.projects ? `<div class="section"><div class="section-title">Projects</div><div class="content">${data.projects}</div></div>` : ''}
  ${data.certifications ? `<div class="section"><div class="section-title">Certifications</div><div class="content">${data.certifications}</div></div>` : ''}
</body>
</html>`;

// Template 3: Professional Classic - Two Column with Green Header
const getProfessionalClassicHTML = (data: FormData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${data.fullName || 'Resume'}</title>
  <style>
    @page { margin: 0; size: A4; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Cambria', Georgia, serif; line-height: 1.6; color: #2c3e50; background: white; }
    .header { background: linear-gradient(135deg, #059669, #0d9488); padding: 40px; color: white; }
    .name { font-size: 36px; font-weight: bold; margin-bottom: 8px; }
    .title { font-size: 16px; opacity: 0.9; margin-bottom: 15px; font-style: italic; }
    .contact-row { display: flex; flex-wrap: wrap; gap: 20px; font-size: 12px; }
    .contact-row span { opacity: 0.95; }
    .main { display: flex; padding: 30px; gap: 30px; }
    .left { flex: 1; }
    .right { width: 200px; }
    .section { margin-bottom: 25px; }
    .section-title { font-size: 14px; font-weight: bold; color: #059669; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; padding-bottom: 5px; border-bottom: 2px solid #059669; }
    .content { font-size: 12px; white-space: pre-line; }
    .sidebar-section { background: #f0fdf4; padding: 15px; border-radius: 8px; margin-bottom: 15px; }
    .sidebar-title { font-size: 12px; font-weight: bold; color: #059669; margin-bottom: 8px; text-transform: uppercase; }
    .sidebar-content { font-size: 11px; white-space: pre-line; color: #475569; }
    @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="name">${data.fullName || 'Your Name'}</div>
    <div class="title">${data.summary ? data.summary.split('.')[0] : 'Professional'}</div>
    <div class="contact-row">
      <span>✉ ${data.email || 'email@example.com'}</span>
      <span>📞 ${data.phone || '+91 XXXXX'}</span>
      <span>📍 ${data.location || 'City'}</span>
      ${data.linkedin ? `<span>🔗 ${data.linkedin}</span>` : ''}
    </div>
  </div>
  <div class="main">
    <div class="left">
      ${data.summary ? `<div class="section"><div class="section-title">Profile</div><div class="content">${data.summary}</div></div>` : ''}
      ${data.experience ? `<div class="section"><div class="section-title">Work Experience</div><div class="content">${data.experience}</div></div>` : ''}
      ${data.projects ? `<div class="section"><div class="section-title">Key Projects</div><div class="content">${data.projects}</div></div>` : ''}
    </div>
    <div class="right">
      ${data.education ? `<div class="sidebar-section"><div class="sidebar-title">Education</div><div class="sidebar-content">${data.education}</div></div>` : ''}
      ${data.skills ? `<div class="sidebar-section"><div class="sidebar-title">Skills</div><div class="sidebar-content">${data.skills}</div></div>` : ''}
      ${data.certifications ? `<div class="sidebar-section"><div class="sidebar-title">Certifications</div><div class="sidebar-content">${data.certifications}</div></div>` : ''}
    </div>
  </div>
</body>
</html>`;

// Template 4: Tech Pro - Dark Theme Developer Style
const getTechProHTML = (data: FormData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${data.fullName || 'Resume'}</title>
  <style>
    @page { margin: 0; size: A4; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Fira Code', 'Consolas', monospace; line-height: 1.6; color: #e2e8f0; background: #0f172a; }
    .header { background: linear-gradient(135deg, #7c3aed, #db2777); padding: 40px; }
    .name { font-size: 32px; font-weight: bold; color: white; margin-bottom: 5px; }
    .tagline { color: rgba(255,255,255,0.8); font-size: 14px; margin-bottom: 15px; }
    .contact { display: flex; flex-wrap: wrap; gap: 15px; font-size: 11px; color: rgba(255,255,255,0.9); }
    .main { padding: 30px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .section { background: #1e293b; padding: 20px; border-radius: 10px; border-left: 4px solid #8b5cf6; margin-bottom: 20px; }
    .section-title { font-size: 12px; color: #a78bfa; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
    .section-title::before { content: '//'; color: #6366f1; }
    .content { font-size: 11px; white-space: pre-line; color: #cbd5e1; }
    .full-width { grid-column: 1 / -1; }
    .code-tag { display: inline-block; background: #3730a3; color: #c4b5fd; padding: 2px 8px; border-radius: 4px; font-size: 10px; margin: 2px; }
    @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="name">&lt;${data.fullName || 'Developer'} /&gt;</div>
    <div class="tagline">${data.summary ? data.summary.split('.')[0] : 'Full Stack Developer'}</div>
    <div class="contact">
      <span>📧 ${data.email || 'email@example.com'}</span>
      <span>📱 ${data.phone || '+91 XXXXX'}</span>
      <span>📍 ${data.location || 'City'}</span>
      ${data.linkedin ? `<span>💼 ${data.linkedin}</span>` : ''}
      ${data.portfolio ? `<span>🌐 ${data.portfolio}</span>` : ''}
    </div>
  </div>
  <div class="main">
    ${data.summary ? `<div class="section full-width"><div class="section-title">README.md</div><div class="content">${data.summary}</div></div>` : ''}
    <div class="grid">
      ${data.experience ? `<div class="section"><div class="section-title">Experience</div><div class="content">${data.experience}</div></div>` : ''}
      ${data.education ? `<div class="section"><div class="section-title">Education</div><div class="content">${data.education}</div></div>` : ''}
      ${data.skills ? `<div class="section"><div class="section-title">Tech Stack</div><div class="content">${data.skills}</div></div>` : ''}
      ${data.projects ? `<div class="section"><div class="section-title">Projects</div><div class="content">${data.projects}</div></div>` : ''}
    </div>
    ${data.certifications ? `<div class="section full-width"><div class="section-title">Certifications</div><div class="content">${data.certifications}</div></div>` : ''}
  </div>
</body>
</html>`;

// Template 5: Executive Elite - Premium Gold Accent
const getExecutiveEliteHTML = (data: FormData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${data.fullName || 'Resume'}</title>
  <style>
    @page { margin: 0; size: A4; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Palatino Linotype', 'Book Antiqua', serif; line-height: 1.7; color: #1c1917; background: white; }
    .sidebar { position: fixed; left: 0; top: 0; bottom: 0; width: 10px; background: linear-gradient(180deg, #f59e0b, #ea580c); }
    .container { margin-left: 40px; padding: 50px 50px 50px 20px; }
    .header { border-bottom: 2px solid #f59e0b; padding-bottom: 25px; margin-bottom: 30px; }
    .name { font-size: 42px; font-weight: bold; color: #78350f; margin-bottom: 8px; letter-spacing: 1px; }
    .title { font-size: 18px; color: #92400e; font-style: italic; margin-bottom: 15px; }
    .contact { font-size: 12px; color: #78716c; display: flex; flex-wrap: wrap; gap: 20px; }
    .section { margin-bottom: 28px; }
    .section-title { font-size: 14px; font-weight: bold; color: #b45309; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #fcd34d; display: flex; align-items: center; gap: 10px; }
    .section-title::before { content: '◆'; color: #f59e0b; font-size: 10px; }
    .content { font-size: 12px; white-space: pre-line; color: #44403c; }
    .highlight { background: linear-gradient(120deg, #fef3c7 0%, #fef3c7 100%); padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #f59e0b; }
    @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } .sidebar { position: absolute; } }
  </style>
</head>
<body>
  <div class="sidebar"></div>
  <div class="container">
    <div class="header">
      <div class="name">${data.fullName || 'Your Name'}</div>
      <div class="title">${data.summary ? data.summary.split('.')[0] : 'Executive Professional'}</div>
      <div class="contact">
        <span>✉ ${data.email || 'email@example.com'}</span>
        <span>📞 ${data.phone || '+91 XXXXX'}</span>
        <span>📍 ${data.location || 'City'}</span>
        ${data.linkedin ? `<span>🔗 ${data.linkedin}</span>` : ''}
      </div>
    </div>
    ${data.summary ? `<div class="highlight"><div class="content" style="font-style:italic;">"${data.summary}"</div></div>` : ''}
    ${data.experience ? `<div class="section"><div class="section-title">Executive Experience</div><div class="content">${data.experience}</div></div>` : ''}
    ${data.education ? `<div class="section"><div class="section-title">Academic Background</div><div class="content">${data.education}</div></div>` : ''}
    ${data.skills ? `<div class="section"><div class="section-title">Core Competencies</div><div class="content">${data.skills}</div></div>` : ''}
    ${data.projects ? `<div class="section"><div class="section-title">Key Achievements</div><div class="content">${data.projects}</div></div>` : ''}
    ${data.certifications ? `<div class="section"><div class="section-title">Credentials</div><div class="content">${data.certifications}</div></div>` : ''}
  </div>
</body>
</html>`;

// Template 6: Senior Tech Lead - Modern Purple Gradient
const getSeniorTechLeadHTML = (data: FormData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${data.fullName || 'Resume'}</title>
  <style>
    @page { margin: 0; size: A4; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, sans-serif; line-height: 1.6; color: #1e1b4b; background: white; }
    .header { background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 45px; position: relative; overflow: hidden; }
    .header::after { content: ''; position: absolute; right: -50px; top: -50px; width: 200px; height: 200px; background: rgba(255,255,255,0.1); border-radius: 50%; }
    .name { font-size: 36px; font-weight: 600; color: white; margin-bottom: 5px; position: relative; z-index: 1; }
    .role { color: rgba(255,255,255,0.9); font-size: 16px; margin-bottom: 20px; }
    .contact { display: flex; flex-wrap: wrap; gap: 20px; font-size: 12px; color: rgba(255,255,255,0.9); }
    .main { padding: 40px; }
    .two-col { display: flex; gap: 40px; }
    .col-main { flex: 2; }
    .col-side { flex: 1; }
    .section { margin-bottom: 25px; }
    .section-title { font-size: 12px; font-weight: 700; color: #4f46e5; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 15px; display: flex; align-items: center; gap: 10px; }
    .section-title::before { content: ''; width: 25px; height: 3px; background: linear-gradient(90deg, #4f46e5, #7c3aed); }
    .content { font-size: 12px; white-space: pre-line; color: #3730a3; }
    .skill-box { background: #eef2ff; padding: 15px; border-radius: 10px; margin-bottom: 15px; }
    .skill-title { font-size: 11px; color: #4f46e5; font-weight: 600; margin-bottom: 8px; }
    .skill-content { font-size: 11px; color: #6366f1; white-space: pre-line; }
    @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="name">${data.fullName || 'Your Name'}</div>
    <div class="role">${data.summary ? data.summary.split('.')[0] : 'Senior Tech Lead'}</div>
    <div class="contact">
      <span>📧 ${data.email || 'email@example.com'}</span>
      <span>📱 ${data.phone || '+91 XXXXX'}</span>
      <span>📍 ${data.location || 'City'}</span>
      ${data.linkedin ? `<span>💼 ${data.linkedin}</span>` : ''}
      ${data.portfolio ? `<span>🔗 ${data.portfolio}</span>` : ''}
    </div>
  </div>
  <div class="main">
    <div class="two-col">
      <div class="col-main">
        ${data.summary ? `<div class="section"><div class="section-title">Summary</div><div class="content">${data.summary}</div></div>` : ''}
        ${data.experience ? `<div class="section"><div class="section-title">Experience</div><div class="content">${data.experience}</div></div>` : ''}
        ${data.projects ? `<div class="section"><div class="section-title">Key Projects</div><div class="content">${data.projects}</div></div>` : ''}
      </div>
      <div class="col-side">
        ${data.skills ? `<div class="skill-box"><div class="skill-title">TECHNICAL SKILLS</div><div class="skill-content">${data.skills}</div></div>` : ''}
        ${data.education ? `<div class="skill-box"><div class="skill-title">EDUCATION</div><div class="skill-content">${data.education}</div></div>` : ''}
        ${data.certifications ? `<div class="skill-box"><div class="skill-title">CERTIFICATIONS</div><div class="skill-content">${data.certifications}</div></div>` : ''}
      </div>
    </div>
  </div>
</body>
</html>`;

// Template 7: Creative Designer - Colorful Portfolio Style
const getCreativeDesignerHTML = (data: FormData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${data.fullName || 'Resume'}</title>
  <style>
    @page { margin: 0; size: A4; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Poppins', 'Segoe UI', sans-serif; line-height: 1.7; color: #1f2937; background: linear-gradient(180deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%); min-height: 100vh; }
    .header { background: linear-gradient(135deg, #ec4899, #f43f5e); padding: 50px; clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%); text-align: center; }
    .avatar { width: 80px; height: 80px; background: white; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: bold; color: #ec4899; }
    .name { font-size: 38px; font-weight: 700; color: white; margin-bottom: 5px; }
    .tagline { color: rgba(255,255,255,0.9); font-size: 16px; margin-bottom: 20px; }
    .contact { display: flex; justify-content: center; flex-wrap: wrap; gap: 20px; font-size: 12px; color: white; }
    .main { padding: 20px 50px 50px; margin-top: -30px; }
    .card-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
    .card { background: white; padding: 25px; border-radius: 20px; box-shadow: 0 10px 40px rgba(236,72,153,0.15); }
    .card.full { grid-column: 1 / -1; }
    .card-title { font-size: 13px; font-weight: 700; color: #db2777; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px; display: flex; align-items: center; gap: 10px; }
    .card-title::before { content: '✦'; }
    .card-content { font-size: 12px; white-space: pre-line; color: #6b7280; }
    @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="avatar">${(data.fullName || 'U')[0]}</div>
    <div class="name">${data.fullName || 'Creative Designer'}</div>
    <div class="tagline">${data.summary ? data.summary.split('.')[0] : 'Creative Professional'}</div>
    <div class="contact">
      <span>✉ ${data.email || 'email@example.com'}</span>
      <span>📞 ${data.phone || '+91 XXXXX'}</span>
      <span>📍 ${data.location || 'City'}</span>
      ${data.portfolio ? `<span>🎨 ${data.portfolio}</span>` : ''}
    </div>
  </div>
  <div class="main">
    <div class="card-grid">
      ${data.summary ? `<div class="card full"><div class="card-title">About Me</div><div class="card-content">${data.summary}</div></div>` : ''}
      ${data.experience ? `<div class="card"><div class="card-title">Experience</div><div class="card-content">${data.experience}</div></div>` : ''}
      ${data.projects ? `<div class="card"><div class="card-title">Portfolio</div><div class="card-content">${data.projects}</div></div>` : ''}
      ${data.skills ? `<div class="card"><div class="card-title">Skills</div><div class="card-content">${data.skills}</div></div>` : ''}
      ${data.education ? `<div class="card"><div class="card-title">Education</div><div class="card-content">${data.education}</div></div>` : ''}
      ${data.certifications ? `<div class="card full"><div class="card-title">Certifications & Awards</div><div class="card-content">${data.certifications}</div></div>` : ''}
    </div>
  </div>
</body>
</html>`;

// Template 8: Academic Scholar - Traditional CV Format
const getAcademicScholarHTML = (data: FormData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${data.fullName || 'Resume'}</title>
  <style>
    @page { margin: 0; size: A4; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Times New Roman', Times, serif; line-height: 1.8; color: #1e3a5f; padding: 60px; background: white; }
    .header { text-align: center; margin-bottom: 40px; padding-bottom: 25px; border-bottom: 3px double #0d9488; }
    .name { font-size: 32px; font-weight: bold; color: #134e4a; margin-bottom: 5px; font-variant: small-caps; letter-spacing: 3px; }
    .degree { font-size: 16px; color: #0d9488; font-style: italic; margin-bottom: 15px; }
    .contact { font-size: 12px; color: #5f7782; }
    .contact span { margin: 0 10px; }
    .section { margin-bottom: 30px; }
    .section-title { font-size: 14px; font-weight: bold; color: #115e59; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #99f6e4; }
    .content { font-size: 12px; white-space: pre-line; color: #334155; text-align: justify; }
    .publications { border-left: 3px solid #0d9488; padding-left: 15px; margin-left: 10px; }
    .note { font-size: 11px; color: #64748b; font-style: italic; margin-top: 30px; text-align: center; padding-top: 20px; border-top: 1px solid #e2e8f0; }
    @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="name">${data.fullName || 'Your Name'}</div>
    <div class="degree">${data.summary ? data.summary.split('.')[0] : 'Academic Professional'}</div>
    <div class="contact">
      <span>✉ ${data.email || 'email@example.com'}</span>
      <span>|</span>
      <span>📞 ${data.phone || '+91 XXXXX'}</span>
      <span>|</span>
      <span>📍 ${data.location || 'City'}</span>
      ${data.linkedin ? `<span>|</span><span>🔗 ${data.linkedin}</span>` : ''}
    </div>
  </div>
  ${data.summary ? `<div class="section"><div class="section-title">Research Interests</div><div class="content">${data.summary}</div></div>` : ''}
  ${data.education ? `<div class="section"><div class="section-title">Academic Qualifications</div><div class="content publications">${data.education}</div></div>` : ''}
  ${data.experience ? `<div class="section"><div class="section-title">Academic & Research Experience</div><div class="content">${data.experience}</div></div>` : ''}
  ${data.projects ? `<div class="section"><div class="section-title">Publications & Research</div><div class="content publications">${data.projects}</div></div>` : ''}
  ${data.skills ? `<div class="section"><div class="section-title">Technical Expertise</div><div class="content">${data.skills}</div></div>` : ''}
  ${data.certifications ? `<div class="section"><div class="section-title">Grants, Awards & Honors</div><div class="content">${data.certifications}</div></div>` : ''}
  <div class="note">Curriculum Vitae • ${data.fullName || 'Candidate'}</div>
</body>
</html>`;

const ResumeBuilder = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [step, setStep] = useState<'browse' | 'fill' | 'preview'>('browse');
  const [formData, setFormData] = useState(initialFormData);

  const categories = [
    { id: 'all', name: 'All Templates', icon: FileText },
    { id: 'fresher', name: 'Fresher', icon: GraduationCap },
    { id: 'intermediate', name: 'Intermediate', icon: Briefcase },
    { id: 'advanced', name: 'Advanced', icon: Star },
    { id: 'creative', name: 'Creative', icon: Palette }
  ];

  const filteredTemplates = activeCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  const handleSelectTemplate = (template: ResumeTemplate) => {
    setSelectedTemplate(template);
    setStep('fill');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setSelectedTemplate(null);
    setStep('browse');
  };

  const getTemplateHTML = (templateId: string, data: FormData): string => {
    const templateMap: Record<string, (data: FormData) => string> = {
      'clean-starter': getCleanStarterHTML,
      'modern-minimal': getModernMinimalHTML,
      'professional-classic': getProfessionalClassicHTML,
      'tech-pro': getTechProHTML,
      'executive-elite': getExecutiveEliteHTML,
      'senior-tech-lead': getSeniorTechLeadHTML,
      'creative-designer': getCreativeDesignerHTML,
      'academic-scholar': getAcademicScholarHTML
    };
    return (templateMap[templateId] || getCleanStarterHTML)(data);
  };

  const generatePDF = () => {
    if (!selectedTemplate) return;

    const resumeHTML = getTemplateHTML(selectedTemplate.id, formData);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(resumeHTML);
      printWindow.document.close();
      
      setTimeout(() => {
        printWindow.print();
        setTimeout(() => {
          resetForm();
        }, 500);
      }, 300);
    }
  };

  const stepsList = [
    { key: 'browse' as const, label: 'Choose Template', num: 1 },
    { key: 'fill' as const, label: 'Fill Details', num: 2 },
    { key: 'preview' as const, label: 'Download', num: 3 }
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] relative">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        
        <div className="container relative mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Smart Resume Builder</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Create Your Smart Resume
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Choose from 8 unique professional templates - each with a completely different design.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4">
            {stepsList.map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step === s.key 
                    ? 'bg-primary text-primary-foreground' 
                    : stepsList.findIndex(st => st.key === s.key) < stepsList.findIndex(st => st.key === step)
                      ? 'bg-primary/20 text-primary'
                      : 'bg-muted text-muted-foreground'
                }`}>
                  {stepsList.findIndex(st => st.key === s.key) < stepsList.findIndex(st => st.key === step) ? <Check className="h-4 w-4" /> : s.num}
                </div>
                <span className={`text-sm font-medium hidden md:block ${step === s.key ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {s.label}
                </span>
                {i < 2 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {step === 'browse' && (
            <>
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === cat.id
                        ? 'bg-primary text-primary-foreground shadow-glow-sm'
                        : 'bg-card border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <cat.icon className="h-4 w-4" />
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Templates Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTemplates.map((template) => (
                  <Card 
                    key={template.id}
                    className="group cursor-pointer border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow-sm overflow-hidden"
                    onClick={() => handleSelectTemplate(template)}
                  >
                    <div className={`h-32 bg-gradient-to-br ${template.previewColor} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute inset-4 bg-white/90 rounded-lg p-3">
                        <div className="h-2 w-20 bg-gray-300 rounded mb-2" />
                        <div className="h-1.5 w-32 bg-gray-200 rounded mb-1" />
                        <div className="h-1.5 w-24 bg-gray-200 rounded" />
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white capitalize">
                          {template.category}
                        </span>
                      </div>
                    </div>

                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <template.icon className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">{template.name}</CardTitle>
                      </div>
                      <CardDescription className="text-sm">{template.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="mb-3">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Best for:</p>
                        <div className="flex flex-wrap gap-1">
                          {template.bestFor.map((item, i) => (
                            <span key={i} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground" variant="outline">
                        Use Template
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {step === 'fill' && selectedTemplate && (
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Fill Your Details</h2>
                  <p className="text-muted-foreground">Using: {selectedTemplate.name}</p>
                </div>
                <Button variant="outline" onClick={() => setStep('browse')}>
                  Change Template
                </Button>
              </div>

              <div className="space-y-8">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input id="fullName" placeholder="John Doe" value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input id="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="Mumbai, India" value={formData.location} onChange={(e) => handleInputChange('location', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn URL</Label>
                      <Input id="linkedin" placeholder="linkedin.com/in/johndoe" value={formData.linkedin} onChange={(e) => handleInputChange('linkedin', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="portfolio">Portfolio/Website</Label>
                      <Input id="portfolio" placeholder="johndoe.com" value={formData.portfolio} onChange={(e) => handleInputChange('portfolio', e.target.value)} />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Professional Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea placeholder="Results-driven software developer with 2+ years of experience..." className="min-h-[100px]" value={formData.summary} onChange={(e) => handleInputChange('summary', e.target.value)} />
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Work Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea placeholder="Software Developer | ABC Company | 2023 - Present&#10;• Developed web applications using React" className="min-h-[200px]" value={formData.experience} onChange={(e) => handleInputChange('experience', e.target.value)} />
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Education</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea placeholder="Bachelor of Technology in Computer Science&#10;XYZ University | 2017 - 2021" className="min-h-[120px]" value={formData.education} onChange={(e) => handleInputChange('education', e.target.value)} />
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea placeholder="JavaScript, React, Node.js, Python, SQL, Git, AWS" className="min-h-[100px]" value={formData.skills} onChange={(e) => handleInputChange('skills', e.target.value)} />
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea placeholder="E-Commerce Platform | React, Node.js&#10;• Built a full-stack platform" className="min-h-[150px]" value={formData.projects} onChange={(e) => handleInputChange('projects', e.target.value)} />
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea placeholder="AWS Certified Solutions Architect | 2023" className="min-h-[100px]" value={formData.certifications} onChange={(e) => handleInputChange('certifications', e.target.value)} />
                  </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                  <Button variant="outline" onClick={() => setStep('browse')}>Back</Button>
                  <Button onClick={() => setStep('preview')} className="bg-primary">
                    Preview & Download
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 'preview' && selectedTemplate && (
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Preview & Download</h2>
                  <p className="text-muted-foreground">Template: {selectedTemplate.name}</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep('fill')}>Edit</Button>
                  <Button variant="outline" onClick={resetForm}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    New
                  </Button>
                  <Button onClick={generatePDF} className="bg-primary">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>

              <Card className="border-border/50 overflow-hidden bg-card">
                <div 
                  className="resume-preview bg-white rounded-lg m-4"
                  dangerouslySetInnerHTML={{ __html: getTemplateHTML(selectedTemplate.id, formData) }}
                  style={{ transform: 'scale(0.85)', transformOrigin: 'top center' }}
                />
              </Card>

              <div className="mt-6 p-4 bg-card/50 rounded-lg border border-border/50">
                <p className="text-sm text-muted-foreground text-center">
                  💡 Click "Download PDF" and select "Save as PDF" for HD quality output.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ResumeBuilder;

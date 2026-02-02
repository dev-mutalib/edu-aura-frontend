import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../components/Container';
import api from '../api/axios';
import { 
  BookOpen, 
  Search, 
  Download, 
  Eye, 
  Star, 
  FileText, 
  GraduationCap,
  Calendar,
  User,
  TrendingUp,
  Filter,
  X,
  Upload,
  CheckCircle,
  AlertCircle,
  Trash2,
  LogIn,
  LogOut,
  UserPlus,
  Sparkles,
  Lock,
  Mail,
  KeyRound
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

// Mock data for notes
const mockNotes = [
  { id: 1, title: 'Data Structures Complete Notes', teacher: 'Dr. Sharma', course: 'BCA', semester: '3', subject: 'Data Structures', downloads: 1250, popular: true, pdfUrl: '#' },
  { id: 2, title: 'Database Management Systems', teacher: 'Prof. Verma', course: 'BCA', semester: '4', subject: 'DBMS', downloads: 980, popular: true, pdfUrl: '#' },
  { id: 3, title: 'Operating Systems Concepts', teacher: 'Dr. Gupta', course: 'MCA', semester: '2', subject: 'Operating Systems', downloads: 856, popular: true, pdfUrl: '#' },
  { id: 4, title: 'Financial Management', teacher: 'Prof. Singh', course: 'MBA', semester: '1', subject: 'Finance', downloads: 720, popular: false, pdfUrl: '#' },
  { id: 5, title: 'Marketing Fundamentals', teacher: 'Dr. Kapoor', course: 'BBA', semester: '2', subject: 'Marketing', downloads: 650, popular: false, pdfUrl: '#' },
  { id: 6, title: 'Web Development with React', teacher: 'Prof. Kumar', course: 'BCA', semester: '5', subject: 'Web Development', downloads: 1100, popular: true, pdfUrl: '#' },
  { id: 7, title: 'Machine Learning Basics', teacher: 'Dr. Patel', course: 'MCA', semester: '3', subject: 'Machine Learning', downloads: 890, popular: true, pdfUrl: '#' },
  { id: 8, title: 'Business Statistics', teacher: 'Prof. Joshi', course: 'BBA', semester: '3', subject: 'Statistics', downloads: 540, popular: false, pdfUrl: '#' },
  { id: 9, title: 'Advanced Java Programming', teacher: 'Dr. Reddy', course: 'MCA', semester: '1', subject: 'Java', downloads: 780, popular: false, pdfUrl: '#' },
  { id: 10, title: 'Human Resource Management', teacher: 'Prof. Mehta', course: 'MBA', semester: '2', subject: 'HRM', downloads: 620, popular: false, pdfUrl: '#' },
  { id: 11, title: 'Computer Networks', teacher: 'Dr. Sharma', course: 'BCA', semester: '4', subject: 'Networks', downloads: 920, popular: true, pdfUrl: '#' },
  { id: 12, title: 'Strategic Management', teacher: 'Prof. Agarwal', course: 'MBA', semester: '3', subject: 'Strategy', downloads: 580, popular: false, pdfUrl: '#' },
];

const courses = ['BCA', 'MCA', 'BBA', 'MBA'];
const semesters = ['1', '2', '3', '4', '5', '6'];

const subjectsByCourse: Record<string, string[]> = {
  BCA: ['Data Structures', 'DBMS', 'Web Development', 'Networks', 'Programming', 'Mathematics'],
  MCA: ['Operating Systems', 'Machine Learning', 'Java', 'Cloud Computing', 'AI', 'Big Data'],
  BBA: ['Marketing', 'Statistics', 'Economics', 'Management', 'Accounting', 'Business Law'],
  MBA: ['Finance', 'HRM', 'Strategy', 'Operations', 'Analytics', 'Entrepreneurship'],
};

interface User {
  name: string;
  email: string;
  role: 'admin' | 'student';
}

const NotesProvider = () => {
  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [authLoading, setAuthLoading] = useState(false);
  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Notes browsing state
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopular, setShowPopular] = useState(false);
  const [previewNote, setPreviewNote] = useState<typeof mockNotes[0] | null>(null);

  // Admin upload state
  const [uploadFormData, setUploadFormData] = useState({
    course: '',
    semester: '',
    subject: '',
    title: '',
    teacherName: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadedNotes, setUploadedNotes] = useState(mockNotes.slice(0, 3).map(n => ({...n, uploadDate: '2024-01-15'})));
  const [dragActive, setDragActive] = useState(false);

  const availableSubjects = selectedCourse ? subjectsByCourse[selectedCourse] : [];
  const adminAvailableSubjects = uploadFormData.course ? subjectsByCourse[uploadFormData.course] : [];

  // Check if user is admin based on role from backend
  const isAdmin = user?.role === 'admin';

  // Filter notes
  const filteredNotes = useMemo(() => {
    return mockNotes.filter(note => {
      const matchesCourse = !selectedCourse || note.course === selectedCourse;
      const matchesSemester = !selectedSemester || note.semester === selectedSemester;
      const matchesSubject = !selectedSubject || note.subject === selectedSubject;
      const matchesSearch = !searchQuery || 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.teacher.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPopular = !showPopular || note.popular;
      
      return matchesCourse && matchesSemester && matchesSubject && matchesSearch && matchesPopular;
    });
  }, [selectedCourse, selectedSemester, selectedSubject, searchQuery, showPopular]);

  const popularNotes = mockNotes.filter(note => note.popular).slice(0, 4);

  // Auth handlers
  const handleLogin = async () => {
    if (!authForm.email || !authForm.password) {
      toast.error('Please fill all fields');
      return;
    }

    setAuthLoading(true);
    try {
      const res = await api.post('/auth/login', { 
        email: authForm.email, 
        password: authForm.password 
      });
      
      // Role comes from backend API response
      const userData: User = {
        name: res.data?.name || authForm.email.split('@')[0],
        email: authForm.email,
        role: res.data?.role || 'student', // Default to student if no role provided
      };
      
      setUser(userData);
      setShowAuthModal(false);
      setAuthForm({ name: '', email: '', password: '' });
      
      if (userData.role === 'admin') {
        toast.success(`Welcome Admin ${userData.name}! You can now upload and manage notes.`);
      } else {
        toast.success(`Welcome ${userData.name}! You can now browse and download notes.`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!authForm.name || !authForm.email || !authForm.password) {
      toast.error('Please fill all fields');
      return;
    }

    setAuthLoading(true);
    try {
      const res = await api.post('/auth/register', { 
        name: authForm.name,
        email: authForm.email, 
        password: authForm.password 
      });
      
      toast.success('Registration successful! Please login.');
      setAuthTab('login');
      setAuthForm({ ...authForm, name: '' });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    toast.success('Logged out successfully');
  };

  const handleDownload = (note: typeof mockNotes[0]) => {
    console.log('Downloading:', note.title);
    toast.success(`Downloading ${note.title}`);
  };

  const clearFilters = () => {
    setSelectedCourse('');
    setSelectedSemester('');
    setSelectedSubject('');
    setSearchQuery('');
    setShowPopular(false);
  };

  // Admin handlers
  const handleUploadInputChange = (field: string, value: string) => {
    setUploadFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'course' ? { subject: '' } : {}),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!uploadFormData.course || !uploadFormData.semester || !uploadFormData.subject || !uploadFormData.title || !uploadFormData.teacherName || !selectedFile) {
      return;
    }

    setIsUploading(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newNote = {
      id: Date.now(),
      title: uploadFormData.title,
      teacher: uploadFormData.teacherName,
      course: uploadFormData.course,
      semester: uploadFormData.semester,
      subject: uploadFormData.subject,
      uploadDate: new Date().toISOString().split('T')[0],
      downloads: 0,
      popular: false,
      pdfUrl: '#',
    };

    setUploadedNotes(prev => [newNote, ...prev]);
    setIsUploading(false);
    setUploadSuccess(true);
    toast.success('Notes uploaded successfully!');

    setTimeout(() => {
      setUploadFormData({
        course: '',
        semester: '',
        subject: '',
        title: '',
        teacherName: '',
      });
      setSelectedFile(null);
      setUploadSuccess(false);
    }, 2000);
  };

  const handleDeleteNote = (id: number) => {
    setUploadedNotes(prev => prev.filter(note => note.id !== id));
    toast.success('Note deleted successfully');
  };

  const isUploadFormValid = uploadFormData.course && uploadFormData.semester && uploadFormData.subject && uploadFormData.title && uploadFormData.teacherName && selectedFile;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <Container>
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-4"
          >
            <BookOpen className="h-16 w-16 text-primary mx-auto" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Notes <span className="text-primary">Provider</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            {isAdmin 
              ? 'Welcome Admin! Upload and manage study materials for students.'
              : user 
                ? 'Browse and download comprehensive study materials from top educators!'
                : 'Access comprehensive study materials from top educators. Login to download PDFs and ace your exams!'
            }
          </p>

          {/* Auth Button */}
          <div className="flex justify-center gap-3">
            {user ? (
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full"
                >
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-foreground font-medium">{user.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    user.role === 'admin' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground'
                  }`}>
                    {user.role === 'admin' ? 'Admin' : 'Student'}
                  </span>
                </motion.div>
                <Button variant="outline" onClick={handleLogout} className="rounded-xl">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={() => setShowAuthModal(true)} className="rounded-xl">
                <LogIn className="h-4 w-4 mr-2" />
                Login / Register
              </Button>
            )}
          </div>
        </motion.div>

        {/* Admin Dashboard */}
        {isAdmin && user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upload Form */}
              <Card className="border-border bg-card shadow-xl">
                <CardHeader className="border-b border-border">
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-primary" />
                    Upload New Notes
                  </CardTitle>
                  <CardDescription>
                    Add new study materials for students to download
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {/* Course Selection */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      Course
                    </Label>
                    <Select value={uploadFormData.course} onValueChange={(value) => handleUploadInputChange('course', value)}>
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Select Course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map(course => (
                          <SelectItem key={course} value={course}>{course}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Semester Selection */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      Semester
                    </Label>
                    <Select value={uploadFormData.semester} onValueChange={(value) => handleUploadInputChange('semester', value)}>
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Select Semester" />
                      </SelectTrigger>
                      <SelectContent>
                        {semesters.map(sem => (
                          <SelectItem key={sem} value={sem}>Semester {sem}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Subject Selection */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      Subject
                    </Label>
                    <Select 
                      value={uploadFormData.subject} 
                      onValueChange={(value) => handleUploadInputChange('subject', value)}
                      disabled={!uploadFormData.course}
                    >
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder={uploadFormData.course ? "Select Subject" : "Select Course First"} />
                      </SelectTrigger>
                      <SelectContent>
                        {adminAvailableSubjects.map(subject => (
                          <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Title Input */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Notes Title
                    </Label>
                    <Input
                      placeholder="e.g., Complete Data Structures Notes"
                      value={uploadFormData.title}
                      onChange={(e) => handleUploadInputChange('title', e.target.value)}
                      className="h-12 rounded-xl"
                    />
                  </div>

                  {/* Teacher Name Input */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      Teacher Name
                    </Label>
                    <Input
                      placeholder="e.g., Dr. Sharma"
                      value={uploadFormData.teacherName}
                      onChange={(e) => handleUploadInputChange('teacherName', e.target.value)}
                      className="h-12 rounded-xl"
                    />
                  </div>

                  {/* File Upload */}
                  <div className="space-y-2">
                    <Label>PDF File</Label>
                    <motion.div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      animate={{ 
                        borderColor: dragActive ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                        backgroundColor: dragActive ? 'hsl(var(--primary) / 0.1)' : 'transparent'
                      }}
                      className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors"
                    >
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        id="pdf-upload"
                      />
                      <label htmlFor="pdf-upload" className="cursor-pointer">
                        {selectedFile ? (
                          <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="flex flex-col items-center"
                          >
                            <FileText className="h-10 w-10 text-primary mb-2" />
                            <p className="font-medium text-foreground">{selectedFile.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </motion.div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <motion.div
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                            </motion.div>
                            <p className="font-medium text-foreground">
                              Drag & drop your PDF here
                            </p>
                            <p className="text-sm text-muted-foreground">
                              or click to browse
                            </p>
                          </div>
                        )}
                      </label>
                    </motion.div>
                  </div>

                  {/* Upload Button */}
                  <AnimatePresence mode="wait">
                    {uploadSuccess ? (
                      <motion.div
                        key="success"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="flex items-center justify-center gap-2 py-4 bg-green-500/10 text-green-500 rounded-xl"
                      >
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-semibold">Upload Successful!</span>
                      </motion.div>
                    ) : (
                      <Button
                        onClick={handleUpload}
                        disabled={!isUploadFormValid || isUploading}
                        className="w-full h-12 rounded-xl text-lg font-semibold"
                      >
                        {isUploading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="flex items-center gap-2"
                          >
                            <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
                            Uploading...
                          </motion.div>
                        ) : (
                          <>
                            <Upload className="h-5 w-5 mr-2" />
                            Upload Notes
                          </>
                        )}
                      </Button>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>

              {/* Recent Uploads */}
              <Card className="border-border bg-card shadow-xl">
                <CardHeader className="border-b border-border">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Recent Uploads
                  </CardTitle>
                  <CardDescription>
                    Manage your uploaded study materials
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    <AnimatePresence>
                      {uploadedNotes.map((note, index) => (
                        <motion.div
                          key={note.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.02 }}
                          className="bg-muted/50 border border-border rounded-xl p-4 group"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <FileText className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground text-sm line-clamp-1">
                                  {note.title}
                                </h4>
                                <p className="text-xs text-muted-foreground">{note.teacher}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                                    {note.course}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    Sem {note.semester}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteNote(note.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Notes Browser (for all users) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by subject, title, or teacher name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg bg-card border-border rounded-2xl shadow-lg focus:shadow-xl transition-shadow"
            />
            {searchQuery && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </motion.button>
            )}
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Select value={selectedCourse} onValueChange={(value) => {
              setSelectedCourse(value);
              setSelectedSubject('');
            }}>
              <SelectTrigger className="bg-card border-border h-12 rounded-xl">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <SelectValue placeholder="Select Course" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {courses.map(course => (
                  <SelectItem key={course} value={course}>{course}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger className="bg-card border-border h-12 rounded-xl">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <SelectValue placeholder="Select Semester" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {semesters.map(sem => (
                  <SelectItem key={sem} value={sem}>Semester {sem}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSubject} onValueChange={setSelectedSubject} disabled={!selectedCourse}>
              <SelectTrigger className="bg-card border-border h-12 rounded-xl">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <SelectValue placeholder={selectedCourse ? "Select Subject" : "Select Course First"} />
                </div>
              </SelectTrigger>
              <SelectContent>
                {availableSubjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                variant={showPopular ? "default" : "outline"}
                onClick={() => setShowPopular(!showPopular)}
                className="flex-1 h-12 rounded-xl"
              >
                <Star className={`h-4 w-4 mr-2 ${showPopular ? 'fill-current' : ''}`} />
                Popular
              </Button>
              {(selectedCourse || selectedSemester || selectedSubject || searchQuery || showPopular) && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Button
                    variant="ghost"
                    onClick={clearFilters}
                    className="h-12 px-4 rounded-xl"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Popular Notes Section */}
          {!selectedCourse && !selectedSemester && !selectedSubject && !searchQuery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <TrendingUp className="h-6 w-6 text-primary" />
                </motion.div>
                <h2 className="text-2xl font-bold text-foreground">Trending Notes</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {popularNotes.map((note, index) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-5 cursor-pointer group"
                    onClick={() => setPreviewNote(note)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      >
                        <FileText className="h-10 w-10 text-primary" />
                      </motion.div>
                      <span className="flex items-center gap-1 text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                        <Star className="h-3 w-3 fill-current" />
                        Popular
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {note.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">{note.teacher}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="bg-muted px-2 py-1 rounded">{note.course}</span>
                      <span className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {note.downloads}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Notes Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {filteredNotes.length} Notes Found
              </h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                {selectedCourse && <span className="bg-muted px-2 py-1 rounded">{selectedCourse}</span>}
                {selectedSemester && <span className="bg-muted px-2 py-1 rounded">Sem {selectedSemester}</span>}
                {selectedSubject && <span className="bg-muted px-2 py-1 rounded">{selectedSubject}</span>}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {filteredNotes.length > 0 ? (
                <motion.div
                  key="notes-grid"
                  variants={containerVariants}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredNotes.map((note) => (
                    <motion.div
                      key={note.id}
                      variants={itemVariants}
                      layout
                      whileHover={{ y: -8, transition: { duration: 0.2 } }}
                      className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
                    >
                      {/* Card Header */}
                      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 border-b border-border">
                        <div className="flex items-center justify-between">
                          <motion.div
                            whileHover={{ rotate: 15 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <FileText className="h-12 w-12 text-primary" />
                          </motion.div>
                          <div className="text-right">
                            <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                              {note.course}
                            </span>
                            <p className="text-xs text-muted-foreground mt-1">Semester {note.semester}</p>
                          </div>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5">
                        <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {note.title}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <User className="h-4 w-4" />
                          <span>{note.teacher}</span>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">{note.subject}</span>
                          {note.popular && (
                            <span className="flex items-center gap-1 text-xs text-primary">
                              <Star className="h-3 w-3 fill-current" />
                              Popular
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <span className="flex items-center gap-1">
                            <Download className="h-4 w-4" />
                            {note.downloads.toLocaleString()} downloads
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1 rounded-xl group/btn"
                            onClick={() => setPreviewNote(note)}
                          >
                            <Eye className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                            Preview
                          </Button>
                          <Button
                            className="flex-1 rounded-xl group/btn"
                            onClick={() => handleDownload(note)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No notes found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your filters or search query</p>
                  <Button onClick={clearFilters} variant="outline" className="rounded-xl">
                    Clear all filters
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Preview Modal */}
        <Dialog open={!!previewNote} onOpenChange={() => setPreviewNote(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                {previewNote?.title}
              </DialogTitle>
              <DialogDescription>
                by {previewNote?.teacher} • {previewNote?.course} - Semester {previewNote?.semester}
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-4">
              {/* PDF Preview Placeholder */}
              <div className="bg-muted rounded-xl h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-20 w-20 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">PDF Preview</p>
                  <p className="text-sm text-muted-foreground">(Connect to backend to view actual PDF)</p>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button
                  className="flex-1 rounded-xl"
                  onClick={() => previewNote && handleDownload(previewNote)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => setPreviewNote(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Auth Modal */}
        <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Sparkles className="h-6 w-6 text-primary" />
                Notes Provider Login
              </DialogTitle>
              <DialogDescription>
                Login to access all features. Admin users can upload notes.
              </DialogDescription>
            </DialogHeader>
            
            <Tabs value={authTab} onValueChange={(v) => setAuthTab(v as 'login' | 'register')} className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </TabsTrigger>
                <TabsTrigger value="register" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Register
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    Email
                  </Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={authForm.email}
                    onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <KeyRound className="h-4 w-4 text-primary" />
                    Password
                  </Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={authForm.password}
                    onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                    className="h-12 rounded-xl"
                  />
                </div>
                <Button 
                  onClick={handleLogin} 
                  disabled={authLoading}
                  className="w-full h-12 rounded-xl"
                >
                  {authLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-5 w-5 border-2 border-current border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </>
                  )}
                </Button>
              </TabsContent>
              
              <TabsContent value="register" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Full Name
                  </Label>
                  <Input
                    placeholder="John Doe"
                    value={authForm.name}
                    onChange={(e) => setAuthForm({...authForm, name: e.target.value})}
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    Email
                  </Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={authForm.email}
                    onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <KeyRound className="h-4 w-4 text-primary" />
                    Password
                  </Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={authForm.password}
                    onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                    className="h-12 rounded-xl"
                  />
                </div>
                <Button 
                  onClick={handleRegister} 
                  disabled={authLoading}
                  className="w-full h-12 rounded-xl"
                >
                  {authLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-5 w-5 border-2 border-current border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Register
                    </>
                  )}
                </Button>
              </TabsContent>
            </Tabs>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Admin users: Use admin@eduaura.com to access upload features
            </p>
          </DialogContent>
        </Dialog>
      </Container>
    </div>
  );
};

export default NotesProvider;

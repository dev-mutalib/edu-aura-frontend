import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../components/Container';
import { 
  Upload, 
  FileText, 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  User, 
  CheckCircle,
  AlertCircle,
  Trash2,
  Edit,
  Plus,
  Sparkles
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const courses = ['BCA', 'MCA', 'BBA', 'MBA'];
const semesters = ['1', '2', '3', '4', '5', '6'];

const subjectsByCourse: Record<string, string[]> = {
  BCA: ['Data Structures', 'DBMS', 'Web Development', 'Networks', 'Programming', 'Mathematics'],
  MCA: ['Operating Systems', 'Machine Learning', 'Java', 'Cloud Computing', 'AI', 'Big Data'],
  BBA: ['Marketing', 'Statistics', 'Economics', 'Management', 'Accounting', 'Business Law'],
  MBA: ['Finance', 'HRM', 'Strategy', 'Operations', 'Analytics', 'Entrepreneurship'],
};

// Mock uploaded notes for display
const mockUploadedNotes = [
  { id: 1, title: 'Data Structures Complete Notes', teacher: 'Dr. Sharma', course: 'BCA', semester: '3', subject: 'Data Structures', uploadDate: '2024-01-15' },
  { id: 2, title: 'Database Management Systems', teacher: 'Prof. Verma', course: 'BCA', semester: '4', subject: 'DBMS', uploadDate: '2024-01-14' },
  { id: 3, title: 'Operating Systems Concepts', teacher: 'Dr. Gupta', course: 'MCA', semester: '2', subject: 'Operating Systems', uploadDate: '2024-01-13' },
];

const AdminNotes = () => {
  const [formData, setFormData] = useState({
    course: '',
    semester: '',
    subject: '',
    title: '',
    teacherName: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadedNotes, setUploadedNotes] = useState(mockUploadedNotes);
  const [dragActive, setDragActive] = useState(false);

  const availableSubjects = formData.course ? subjectsByCourse[formData.course] : [];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
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
    if (!formData.course || !formData.semester || !formData.subject || !formData.title || !formData.teacherName || !selectedFile) {
      return;
    }

    setIsUploading(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Add to uploaded notes (mock)
    const newNote = {
      id: Date.now(),
      title: formData.title,
      teacher: formData.teacherName,
      course: formData.course,
      semester: formData.semester,
      subject: formData.subject,
      uploadDate: new Date().toISOString().split('T')[0],
    };

    setUploadedNotes(prev => [newNote, ...prev]);
    setIsUploading(false);
    setUploadSuccess(true);

    // Reset form
    setTimeout(() => {
      setFormData({
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
  };

  const isFormValid = formData.course && formData.semester && formData.subject && formData.title && formData.teacherName && selectedFile;

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
              rotate: [0, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-4"
          >
            <div className="relative">
              <Sparkles className="h-16 w-16 text-primary" />
              <motion.div
                className="absolute inset-0 bg-primary/20 blur-xl rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Admin <span className="text-primary">Dashboard</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Upload and manage study materials for students. Keep the knowledge flowing!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
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
              <CardContent className="p-6 space-y-6">
                {/* Course Selection */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    Course
                  </Label>
                  <Select value={formData.course} onValueChange={(value) => handleInputChange('course', value)}>
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
                  <Select value={formData.semester} onValueChange={(value) => handleInputChange('semester', value)}>
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
                    value={formData.subject} 
                    onValueChange={(value) => handleInputChange('subject', value)}
                    disabled={!formData.course}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder={formData.course ? "Select Subject" : "Select Course First"} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSubjects.map(subject => (
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
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
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
                    value={formData.teacherName}
                    onChange={(e) => handleInputChange('teacherName', e.target.value)}
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
                    className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors"
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
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            <FileText className="h-12 w-12 text-primary mb-2" />
                          </motion.div>
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
                            <Upload className="h-12 w-12 text-muted-foreground mb-2" />
                          </motion.div>
                          <p className="font-medium text-foreground">
                            Drag & drop your PDF here
                          </p>
                          <p className="text-sm text-muted-foreground">
                            or click to browse files
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
                    <motion.div key="button">
                      <Button
                        onClick={handleUpload}
                        disabled={!isFormValid || isUploading}
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
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isFormValid && !isUploading && !uploadSuccess && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-muted-foreground text-center flex items-center justify-center gap-1"
                  >
                    <AlertCircle className="h-4 w-4" />
                    Please fill all fields and select a PDF file
                  </motion.p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Uploaded Notes List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
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
                <div className="space-y-4">
                  <AnimatePresence>
                    {uploadedNotes.map((note, index) => (
                      <motion.div
                        key={note.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-muted/50 border border-border rounded-xl p-4 group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <motion.div
                              whileHover={{ rotate: 15 }}
                              className="p-2 bg-primary/10 rounded-lg"
                            >
                              <FileText className="h-6 w-6 text-primary" />
                            </motion.div>
                            <div>
                              <h4 className="font-semibold text-foreground line-clamp-1">
                                {note.title}
                              </h4>
                              <p className="text-sm text-muted-foreground">{note.teacher}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
                                  {note.course}
                                </span>
                                <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
                                  Sem {note.semester}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {note.uploadDate}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 rounded-lg text-destructive hover:text-destructive"
                              onClick={() => handleDeleteNote(note.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {uploadedNotes.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No notes uploaded yet</p>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <Card className="border-border bg-gradient-to-br from-primary/10 to-secondary/10">
                <CardContent className="p-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="p-4"
                    >
                      <motion.p
                        key={uploadedNotes.length}
                        initial={{ scale: 1.5 }}
                        animate={{ scale: 1 }}
                        className="text-3xl font-bold text-primary"
                      >
                        {uploadedNotes.length}
                      </motion.p>
                      <p className="text-sm text-muted-foreground">Total Notes</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="p-4"
                    >
                      <p className="text-3xl font-bold text-primary">4</p>
                      <p className="text-sm text-muted-foreground">Courses</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="p-4"
                    >
                      <p className="text-3xl font-bold text-primary">12.5K</p>
                      <p className="text-sm text-muted-foreground">Downloads</p>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default AdminNotes;

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../components/Container';
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
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
} from '@/components/ui/dialog';

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

const Notes = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopular, setShowPopular] = useState(false);
  const [previewNote, setPreviewNote] = useState<typeof mockNotes[0] | null>(null);

  const availableSubjects = selectedCourse ? subjectsByCourse[selectedCourse] : [];

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

  const handleDownload = (note: typeof mockNotes[0]) => {
    // Simulate download
    console.log('Downloading:', note.title);
    // In real implementation, this would trigger file download
  };

  const clearFilters = () => {
    setSelectedCourse('');
    setSelectedSemester('');
    setSelectedSubject('');
    setSearchQuery('');
    setShowPopular(false);
  };

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
            Notes <span className="text-primary">Library</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Access comprehensive study materials from top educators. Download PDFs, preview content, and ace your exams!
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative max-w-2xl mx-auto mb-8"
        >
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
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
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
        </motion.div>

        {/* Popular Notes Section */}
        {!selectedCourse && !selectedSemester && !selectedSubject && !searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
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
                {filteredNotes.map((note, index) => (
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
                          <motion.div
                            whileHover={{ y: 2 }}
                            transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.3 }}
                          >
                            <Download className="h-4 w-4 mr-2" />
                          </motion.div>
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
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-16"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FileText className="h-20 w-20 text-muted-foreground mx-auto mb-4" />
                </motion.div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No Notes Found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters or search query</p>
                <Button onClick={clearFilters} variant="outline" className="rounded-xl">
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Preview Dialog */}
        <Dialog open={!!previewNote} onOpenChange={() => setPreviewNote(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                PDF Preview
              </DialogTitle>
            </DialogHeader>
            {previewNote && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="bg-muted rounded-xl p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{previewNote.title}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Teacher:</span>
                      <p className="font-medium text-foreground">{previewNote.teacher}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Course:</span>
                      <p className="font-medium text-foreground">{previewNote.course} - Semester {previewNote.semester}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Subject:</span>
                      <p className="font-medium text-foreground">{previewNote.subject}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Downloads:</span>
                      <p className="font-medium text-foreground">{previewNote.downloads.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* PDF Preview Placeholder */}
                <div className="aspect-[4/3] bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                    </motion.div>
                    <p className="text-muted-foreground">PDF Preview will appear here</p>
                    <p className="text-xs text-muted-foreground mt-1">Connect backend to enable preview</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setPreviewNote(null)}>
                    Close
                  </Button>
                  <Button className="flex-1 rounded-xl" onClick={() => handleDownload(previewNote)}>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </motion.div>
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </div>
  );
};

export default Notes;

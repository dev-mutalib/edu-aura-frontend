import { motion } from 'framer-motion';
import { 
  BookOpen, 
  ScanLine, 
  ExternalLink, 
  Sparkles,
  Library as LibraryIcon,
  QrCode,
  Database,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Container from '@/components/Container';

const Library = () => {
  // Dummy link - replace with actual library database link
  const libraryDatabaseLink = 'https://library.example.com';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2 } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <Container>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="p-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl">
                <LibraryIcon className="h-16 w-16 text-primary" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="h-6 w-6 text-accent animate-pulse" />
              </div>
            </div>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Digital <span className="text-gradient">Library</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Access our extensive collection of books and resources. Scan book codes or explore our digital catalog.
          </p>
        </motion.div>

        {/* Options Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {/* Scanner Option */}
          <motion.div variants={itemVariants}>
            <Card className="group relative h-full bg-card border border-border hover:border-primary/50 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-glow-md cursor-pointer">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-3xl animate-gradient-shift bg-gradient-to-r from-primary via-secondary to-accent bg-[length:200%_200%] p-[2px]">
                  <div className="h-full w-full bg-card rounded-[calc(1.5rem-2px)]" />
                </div>
              </div>
              
              <CardContent className="relative p-8 md:p-10 flex flex-col items-center text-center h-full">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="mb-6"
                >
                  <div className="relative p-6 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl">
                    <ScanLine className="h-16 w-16 text-primary" />
                    <div className="absolute -bottom-2 -right-2 p-2 bg-card rounded-xl border border-border shadow-lg">
                      <QrCode className="h-6 w-6 text-secondary" />
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  Book Scanner
                </h2>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Scan book barcodes or QR codes to quickly find book details, availability, and location in our library.
                </p>

                {/* Button */}
                <Button
                  size="lg"
                  className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-glow-md transition-all group/btn"
                  onClick={() => {
                    // Open device camera for scanning
                    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
                        .then(() => {
                          // This will prompt user for camera permission
                          // In a real app, you'd integrate a QR/barcode scanner library
                          alert('Camera access granted! Scanner feature coming soon.');
                        })
                        .catch(() => {
                          alert('Camera access denied. Please enable camera permissions.');
                        });
                    } else {
                      alert('Camera not supported on this device.');
                    }
                  }}
                >
                  <ScanLine className="h-5 w-5 mr-2 group-hover/btn:animate-pulse" />
                  Open Scanner
                  <ArrowRight className="h-5 w-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Library Database Link Option */}
          <motion.div variants={itemVariants}>
            <Card className="group relative h-full bg-card border border-border hover:border-secondary/50 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-glow-md cursor-pointer">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-3xl animate-gradient-shift bg-gradient-to-r from-secondary via-accent to-primary bg-[length:200%_200%] p-[2px]">
                  <div className="h-full w-full bg-card rounded-[calc(1.5rem-2px)]" />
                </div>
              </div>
              
              <CardContent className="relative p-8 md:p-10 flex flex-col items-center text-center h-full">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="mb-6"
                >
                  <div className="relative p-6 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl">
                    <Database className="h-16 w-16 text-secondary" />
                    <div className="absolute -bottom-2 -right-2 p-2 bg-card rounded-xl border border-border shadow-lg">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors">
                  Library Database
                </h2>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Browse our complete digital catalog. Search for books, journals, e-resources, and check real-time availability.
                </p>

                {/* Button */}
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full rounded-xl border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground hover:shadow-glow-md transition-all group/btn"
                  onClick={() => window.open(libraryDatabaseLink, '_blank')}
                >
                  <ExternalLink className="h-5 w-5 mr-2 group-hover/btn:animate-pulse" />
                  Open Database
                  <ArrowRight className="h-5 w-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[
            { value: '50,000+', label: 'Books', icon: BookOpen },
            { value: '1,000+', label: 'E-Journals', icon: Database },
            { value: '24/7', label: 'Digital Access', icon: ExternalLink },
            { value: '100%', label: 'Free for Students', icon: Sparkles },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/30 transition-all"
            >
              <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Info Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Need help? Visit the library help desk or contact us at{' '}
            <a href="mailto:library@eduaura.com" className="text-primary hover:underline">
              library@eduaura.com
            </a>
          </p>
        </motion.div>
      </Container>
    </div>
  );
};

export default Library;

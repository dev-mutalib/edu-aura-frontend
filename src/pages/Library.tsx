import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  ScanLine,
  ExternalLink,
  Sparkles,
  Library as LibraryIcon,
  QrCode,
  Database,
  ArrowRight,
  X,
} from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Container from '@/components/Container';

const Library = () => {
  const libraryDatabaseLink = 'https://library.example.com';

  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scanner, setScanner] = useState(null);

  /* ================= SCANNER LOGIC ================= */

  useEffect(() => {
    if (!isScannerOpen) return;

    const html5QrCode = new Html5Qrcode('qr-reader');
    setScanner(html5QrCode);

    html5QrCode
      .start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 280, height: 280 },
        },
        (decodedText) => {
          // Stop camera after successful scan
          html5QrCode.stop().then(() => {
            html5QrCode.clear();
            setIsScannerOpen(false);

            // Redirect to scanned result
            if (
              decodedText.startsWith('http://') ||
              decodedText.startsWith('https://')
            ) {
              window.location.href = decodedText;
            } else {
              // If QR is not a URL
              alert(`Scanned result: ${decodedText}`);
            }
          });
        },
        () => {},
      )
      .catch((err) => {
        console.error('Scanner error', err);
        alert('Camera permission denied or not available');
        setIsScannerOpen(false);
      });

    return () => {
      if (html5QrCode?.isScanning) {
        html5QrCode.stop().then(() => html5QrCode.clear());
      }
    };
  }, [isScannerOpen]);

  /* ================= ANIMATIONS ================= */

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className='min-h-screen bg-background py-12'>
      <Container>
        {/* ================= HERO ================= */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            className='inline-block mb-6'
          >
            <div className='p-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl'>
              <LibraryIcon className='h-16 w-16 text-primary' />
            </div>
          </motion.div>

          <h1 className='text-5xl font-bold mb-4'>
            Digital <span className='text-gradient'>Library</span>
          </h1>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            Scan QR codes or explore the complete digital catalog.
          </p>
        </motion.div>

        {/* ================= OPTIONS ================= */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'
        >
          {/* ===== SCANNER CARD ===== */}
          <motion.div variants={itemVariants}>
            <Card className='h-full rounded-3xl'>
              <CardContent className='p-8 text-center flex flex-col h-full'>
                <div className='mb-6 p-6 bg-primary/10 rounded-2xl inline-block mx-auto'>
                  <ScanLine className='h-16 w-16 text-primary' />
                </div>

                <h2 className='text-3xl font-bold mb-3'>Book Scanner</h2>
                <p className='text-muted-foreground mb-6 flex-grow'>
                  Scan any QR code or barcode to instantly open its linked
                  resource.
                </p>

                <Button
                  size='lg'
                  className='rounded-xl bg-gradient-to-r from-primary to-secondary'
                  onClick={() => setIsScannerOpen(true)}
                >
                  <QrCode className='mr-2' />
                  Open Scanner
                  <ArrowRight className='ml-2' />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* ===== DATABASE CARD ===== */}
          <motion.div variants={itemVariants}>
            <Card className='h-full rounded-3xl'>
              <CardContent className='p-8 text-center flex flex-col h-full'>
                <div className='mb-6 p-6 bg-secondary/10 rounded-2xl inline-block mx-auto'>
                  <Database className='h-16 w-16 text-secondary' />
                </div>

                <h2 className='text-3xl font-bold mb-3'>Library Database</h2>
                <p className='text-muted-foreground mb-6 flex-grow'>
                  Browse books, journals and digital resources.
                </p>

                <Button
                  size='lg'
                  variant='outline'
                  className='rounded-xl'
                  onClick={() => window.open(libraryDatabaseLink, '_blank')}
                >
                  <ExternalLink className='mr-2' />
                  Open Database
                  <ArrowRight className='ml-2' />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </Container>

      {/* ================= SCANNER MODAL ================= */}
      {isScannerOpen && (
        <div className='fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4'>
          <div className='bg-card rounded-2xl w-full max-w-md p-4 relative'>
            <button
              className='absolute top-3 right-3 text-muted-foreground hover:text-foreground'
              onClick={() => setIsScannerOpen(false)}
            >
              <X />
            </button>

            <h3 className='text-lg font-semibold mb-3 text-center'>
              Scan QR / Barcode
            </h3>

            <div
              id='qr-reader'
              className='w-full rounded-xl overflow-hidden'
            />
          </div>
        </div>
      )}
    </div>
  );            
};

export default Library;

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, Users, BookOpen, Award, Sparkles, Image } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Photos', icon: Camera },
    { id: 'campus', name: 'Campus Life', icon: Users },
    { id: 'academics', name: 'Academics', icon: BookOpen },
    { id: 'events', name: 'Events', icon: Award }
  ];

  const galleryImages = [
    { id: 1, src: '/placeholder.svg', alt: 'Students in computer lab', category: 'academics', title: 'Computer Science Lab', description: 'Students working on their programming projects in our state-of-the-art computer laboratory.' },
    { id: 2, src: '/placeholder.svg', alt: 'College campus building', category: 'campus', title: 'Main Campus Building', description: 'Our beautiful main campus building where most academic activities take place.' },
    { id: 3, src: '/placeholder.svg', alt: 'Graduation ceremony', category: 'events', title: 'Graduation Day 2024', description: 'Celebrating the achievements of our graduating class of 2024.' },
    { id: 4, src: '/placeholder.svg', alt: 'Library study area', category: 'academics', title: 'Central Library', description: 'Quiet study spaces and extensive resources in our modern library facility.' },
    { id: 5, src: '/placeholder.svg', alt: 'Students playing sports', category: 'campus', title: 'Sports Complex', description: 'Students enjoying recreational activities at our comprehensive sports complex.' },
    { id: 6, src: '/placeholder.svg', alt: 'Science laboratory', category: 'academics', title: 'Science Laboratory', description: 'Advanced laboratory equipment for chemistry and physics experiments.' },
    { id: 7, src: '/placeholder.svg', alt: 'Cultural festival', category: 'events', title: 'Annual Cultural Festival', description: 'Students showcasing their talents during our vibrant annual cultural celebration.' },
    { id: 8, src: '/placeholder.svg', alt: 'Student cafeteria', category: 'campus', title: 'Student Cafeteria', description: 'Modern dining facilities serving healthy and delicious meals to our community.' },
    { id: 9, src: '/placeholder.svg', alt: 'Art studio', category: 'academics', title: 'Art & Design Studio', description: 'Creative spaces equipped with professional tools for our art and design students.' },
    { id: 10, src: '/placeholder.svg', alt: 'Tech conference', category: 'events', title: 'Tech Innovation Summit', description: 'Industry experts sharing insights at our annual technology conference.' },
    { id: 11, src: '/placeholder.svg', alt: 'Student dormitory', category: 'campus', title: 'Student Residences', description: 'Comfortable and modern accommodation facilities for our residential students.' },
    { id: 12, src: '/placeholder.svg', alt: 'Business presentation', category: 'academics', title: 'Business School', description: 'Students presenting their business plans in our modern presentation facilities.' }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openModal = (imageId: number) => setSelectedImage(imageId);
  const closeModal = () => setSelectedImage(null);

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    let newIndex = direction === 'prev' 
      ? (currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1)
      : (currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0);
    setSelectedImage(filteredImages[newIndex].id);
  };

  const selectedImageData = selectedImage ? filteredImages.find(img => img.id === selectedImage) : null;

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-slow" />
      </div>

      {/* Header */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">Campus Gallery</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            <span className="text-gradient">Gallery</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in delay-200">
            Explore campus life, academic excellence, and memorable moments through our photo collection.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="relative py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 transition-all duration-300 ${
                  selectedCategory === category.id 
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow-sm' 
                    : 'border-border/50 hover:border-primary/50 hover:bg-primary/10'
                }`}
              >
                <category.icon className="h-4 w-4" />
                <span>{category.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <Card 
                key={image.id} 
                className="group cursor-pointer overflow-hidden card-hover bg-card/50 border-border/50 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => openModal(image.id)}
              >
                <div className="aspect-square relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
                    <Image className="h-16 w-16 text-primary/50 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-semibold text-sm mb-1">{image.title}</h3>
                    <p className="text-white/80 text-xs line-clamp-2">{image.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedImage && selectedImageData && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-lg z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-4xl w-full">
            <Button
              variant="ghost"
              size="sm"
              onClick={closeModal}
              className="absolute -top-12 right-0 text-muted-foreground hover:text-foreground z-10"
            >
              <X className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground z-10 hover:bg-primary/10"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground z-10 hover:bg-primary/10"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            <Card className="bg-card/50 border-border/50 backdrop-blur-sm overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
                <Camera className="h-24 w-24 text-primary/50" />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gradient mb-2">{selectedImageData.title}</h2>
                <p className="text-muted-foreground">{selectedImageData.description}</p>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-gradient">Campus Highlights</span>
            </h2>
            <p className="text-xl text-muted-foreground">Discover what makes our campus special</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: '50+ Clubs', desc: 'Active student organizations covering academics, arts, sports, and community service.', gradient: 'from-primary to-secondary' },
              { icon: BookOpen, title: 'Modern Facilities', desc: 'State-of-the-art labs, libraries, sports complex, and student accommodation.', gradient: 'from-secondary to-accent' },
              { icon: Award, title: '100+ Events', desc: 'Annual festivals, conferences, workshops, and cultural celebrations.', gradient: 'from-accent to-primary' },
            ].map((item, index) => (
              <Card key={index} className="card-hover bg-card/50 border-border/50 backdrop-blur-sm text-center animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="p-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${item.gradient} p-4`}>
                    <item.icon className="h-full w-full text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
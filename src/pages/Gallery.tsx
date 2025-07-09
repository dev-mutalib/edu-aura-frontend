
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, Users, BookOpen, Award } from 'lucide-react';
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
    {
      id: 1,
      src: '/placeholder.svg',
      alt: 'Students in computer lab',
      category: 'academics',
      title: 'Computer Science Lab',
      description: 'Students working on their programming projects in our state-of-the-art computer laboratory.'
    },
    {
      id: 2,
      src: '/placeholder.svg',
      alt: 'College campus building',
      category: 'campus',
      title: 'Main Campus Building',
      description: 'Our beautiful main campus building where most academic activities take place.'
    },
    {
      id: 3,
      src: '/placeholder.svg',
      alt: 'Graduation ceremony',
      category: 'events',
      title: 'Graduation Day 2024',
      description: 'Celebrating the achievements of our graduating class of 2024.'
    },
    {
      id: 4,
      src: '/placeholder.svg',
      alt: 'Library study area',
      category: 'academics',
      title: 'Central Library',
      description: 'Quiet study spaces and extensive resources in our modern library facility.'
    },
    {
      id: 5,
      src: '/placeholder.svg',
      alt: 'Students playing sports',
      category: 'campus',
      title: 'Sports Complex',
      description: 'Students enjoying recreational activities at our comprehensive sports complex.'
    },
    {
      id: 6,
      src: '/placeholder.svg',
      alt: 'Science laboratory',
      category: 'academics',
      title: 'Science Laboratory',
      description: 'Advanced laboratory equipment for chemistry and physics experiments.'
    },
    {
      id: 7,
      src: '/placeholder.svg',
      alt: 'Cultural festival',
      category: 'events',
      title: 'Annual Cultural Festival',
      description: 'Students showcasing their talents during our vibrant annual cultural celebration.'
    },
    {
      id: 8,
      src: '/placeholder.svg',
      alt: 'Student cafeteria',
      category: 'campus',
      title: 'Student Cafeteria',
      description: 'Modern dining facilities serving healthy and delicious meals to our community.'
    },
    {
      id: 9,
      src: '/placeholder.svg',
      alt: 'Art studio',
      category: 'academics',
      title: 'Art & Design Studio',
      description: 'Creative spaces equipped with professional tools for our art and design students.'
    },
    {
      id: 10,
      src: '/placeholder.svg',
      alt: 'Tech conference',
      category: 'events',
      title: 'Tech Innovation Summit',
      description: 'Industry experts sharing insights at our annual technology conference.'
    },
    {
      id: 11,
      src: '/placeholder.svg',
      alt: 'Student dormitory',
      category: 'campus',
      title: 'Student Residences',
      description: 'Comfortable and modern accommodation facilities for our residential students.'
    },
    {
      id: 12,
      src: '/placeholder.svg',
      alt: 'Business presentation',
      category: 'academics',
      title: 'Business School',
      description: 'Students presenting their business plans in our modern presentation facilities.'
    }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openModal = (imageId: number) => {
    setSelectedImage(imageId);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredImages[newIndex].id);
  };

  const selectedImageData = selectedImage 
    ? filteredImages.find(img => img.id === selectedImage)
    : null;

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6 animate-fade-in">
            Gallery
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto animate-slide-in-left">
            Explore campus life, academic excellence, and memorable moments through 
            our photo collection.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 ${
                  selectedCategory === category.id ? 'bg-blue-600 text-white' : ''
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
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <Card 
                key={image.id} 
                className="group cursor-pointer overflow-hidden card-hover animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openModal(image.id)}
              >
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="h-16 w-16 text-blue-300" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            {/* Image */}
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <Camera className="h-24 w-24 text-blue-300" />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedImageData.title}
                </h2>
                <p className="text-gray-600">{selectedImageData.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Campus Highlights
            </h2>
            <p className="text-xl text-gray-600">
              Discover what makes our campus special
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-slide-in-left">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">50+ Clubs</h3>
              <p className="text-gray-600">
                Active student organizations covering academics, arts, sports, and community service.
              </p>
            </div>

            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Modern Facilities</h3>
              <p className="text-gray-600">
                State-of-the-art labs, libraries, sports complex, and student accommodation.
              </p>
            </div>

            <div className="text-center animate-slide-in-right">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">100+ Events</h3>
              <p className="text-gray-600">
                Annual festivals, conferences, workshops, and cultural celebrations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;

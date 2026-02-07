import { useEffect, useState } from "react";
import api from "../api/axios";
import Container from "../components/Container";
import { Card, CardContent } from "../components/ui/card";
import { Sparkles, Image } from "lucide-react";

/* ================= TYPES ================= */
interface GalleryImage {
  _id: string;
  title: string;
  description: string;
  category: string;
  image?: {
    url?: string;
  };
}

/* ================= COMPONENT ================= */
const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const res = await api.get("/gallery");
        setImages(res.data?.data || []);
      } catch (err) {
        console.error("Gallery API Error:", err);
        setImages([]);
        setError("Failed to load gallery images");
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-16 relative">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-slow" />
        </div>
        <Container>
          <div className="flex flex-col items-center justify-center mt-20">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-glow mb-4">
              <Image className="h-8 w-8 text-white animate-bounce-slow" />
            </div>
            <p className="text-muted-foreground animate-pulse">
              Loading gallery...
            </p>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      {/* HERO SECTION */}
      <section className="py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm text-primary font-medium">
            Our Gallery
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="text-gradient">Gallery</span>
        </h1>

        <p className="text-muted-foreground max-w-3xl mx-auto">
          Explore our memorable moments, events, and highlights through our gallery.
        </p>
      </section>

      <Container>
        {/* GALLERY GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-20">
          {images.map((img, index) => (
            <Card
              key={img._id}
              className="group relative bg-card/60 border-border/50 backdrop-blur-sm overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-secondary/0 to-accent/0 group-hover:from-primary/20 group-hover:via-secondary/20 group-hover:to-accent/20 transition-all duration-500 pointer-events-none" />

              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent z-10" />

                <img
                  src={img.image?.url || "/placeholder.svg"}
                  alt={img.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== window.location.origin + "/placeholder.svg") {
                      target.src = "/placeholder.svg";
                    }
                  }}
                />

                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm border border-border/50 shadow-lg">
                    <span className="text-xs font-semibold text-foreground">
                      {img.category}
                    </span>
                  </div>
                </div>
              </div>

              <CardContent className="relative p-5">
                {/* Title */}
                <h3 className="text-lg font-bold text-foreground group-hover:text-gradient transition-all duration-300 line-clamp-2">
                  {img.title}
                </h3>

                {/* Description */}
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
                  {img.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Gallery;

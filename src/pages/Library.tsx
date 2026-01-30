import { useEffect, useState } from 'react';
import { BookOpen, Search, Lock, LogOut, User, Library as LibraryIcon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import api from '../api/axios.js';

interface Book {
  id: number;
  title: string;
  author: string;
  quantity: number;
}

const Library = () => {
  /* ---------- AUTH STATE ---------- */
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ---------- LOGIN STATE ---------- */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /* ---------- LIBRARY DATA ---------- */
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  /* ================= EFFECT ================= */

  useEffect(() => {
    const token = localStorage.getItem('library_token');
    if (token) {
      setIsAuthenticated(true);
      fetchBooks();
    }
  }, []);

  /* ================= API CALLS ================= */

  const loginHandler = async () => {
    if (!email || !password) {
      alert('Email & Password required');
      return;
    }

    try {
      setLoading(true);

      const res = await api.post('/auth/login', {
        email,
        password,
      });

      localStorage.setItem('library_token', res.data.token);
      setIsAuthenticated(true);
      fetchBooks();
    } catch (error) {
      alert('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('library_token');

      const res = await api.get('/library', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBooks(res.data);
    } catch (error) {
      alert('Failed to load books');
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem('library_token');
    setIsAuthenticated(false);
    setBooks([]);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ================= LOGIN UI ================= */

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen pt-20 overflow-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float" />
        </div>

        <div className="relative flex items-center justify-center min-h-[80vh] px-4">
          <Card className="w-full max-w-md bg-card/50 backdrop-blur-xl border-border/50 animate-scale-in">
            <CardContent className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-4">
                  <LibraryIcon className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gradient mb-2">
                  Smart Library
                </h1>
                <p className="text-muted-foreground">
                  Login to access your library dashboard
                </p>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full bg-muted/50 border border-border/50 rounded-xl pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full bg-muted/50 border border-border/50 rounded-xl pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Button
                  onClick={loginHandler}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-glow-md py-6 text-lg font-semibold transition-all shimmer"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </span>
                  ) : (
                    'Login'
                  )}
                </Button>
              </div>

              {/* Footer */}
              <p className="text-center text-sm text-muted-foreground mt-6">
                Contact admin for library access credentials
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  /* ================= DASHBOARD ================= */

  return (
    <div className="relative min-h-screen pt-20 pb-12 overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 animate-fade-in">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-gradient">
                Library Dashboard
              </h1>
            </div>
            <p className="text-muted-foreground">
              Explore and manage your book collection
            </p>
          </div>

          <Button
            onClick={logoutHandler}
            variant="outline"
            className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </header>

        {/* Search Bar */}
        <div className="relative mb-8 animate-fade-in delay-100">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search books by title or author..."
            className="w-full max-w-md bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl pl-12 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book, index) => (
            <Card
              key={book.id}
              className="group card-hover bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-6">
                {/* Book Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="h-7 w-7 text-primary" />
                </div>

                {/* Title & Author */}
                <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                  {book.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  by {book.author}
                </p>

                {/* Footer */}
                <div className="flex justify-between items-center pt-4 border-t border-border/30">
                  <span className="text-sm text-muted-foreground">
                    Qty: <span className="font-semibold text-foreground">{book.quantity}</span>
                  </span>
                  <Badge
                    variant={book.quantity > 0 ? 'default' : 'destructive'}
                    className={
                      book.quantity > 0
                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                        : 'bg-red-500/20 text-red-400 border-red-500/30'
                    }
                  >
                    {book.quantity > 0 ? 'Available' : 'Out of Stock'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <BookOpen className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No books found
            </h3>
            <p className="text-muted-foreground">
              {searchTerm
                ? 'Try a different search term'
                : 'Your library is empty'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;

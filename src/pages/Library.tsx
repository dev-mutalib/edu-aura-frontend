import { useEffect, useState } from 'react';
import {
  LogOut,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Search,
  BookOpen,
  Users,
  Clock,
  Sparkles,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import toast, { Toaster } from 'react-hot-toast';
import api from '../api/axios.js';

/* ================= TYPES ================= */

interface BookImage {
  url: string;
  public_id: string;
}

interface Book {
  _id: string;
  title: string;
  author: string;
  quantity: number;
  image: BookImage | null;
}

/* ================= HELPERS ================= */

const resolveImageUrl = (image: BookImage | null) => {
  if (!image?.url) return '/placeholder-user.jpg';
  return image.url;
};

/* ================= SKELETON ================= */

const BookSkeleton = () => (
  <Card className='relative bg-[#0b1027]/80 border border-white/10 rounded-2xl backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] animate-pulse overflow-hidden'>
    <CardContent className='p-6 space-y-4'>
      <div className='h-52 w-full rounded-xl bg-gradient-to-br from-white/10 to-white/5' />
      <div className='h-5 w-3/4 bg-white/10 rounded' />
      <div className='h-4 w-1/2 bg-white/10 rounded' />
      <div className='flex justify-between'>
        <div className='h-4 w-20 bg-white/10 rounded' />
        <div className='h-4 w-24 bg-white/10 rounded' />
      </div>
      <div className='flex gap-3'>
        <div className='h-10 flex-1 bg-white/10 rounded-xl' />
        <div className='h-10 flex-1 bg-white/10 rounded-xl' />
      </div>
    </CardContent>
  </Card>
);

/* ================= COMPONENT ================= */

const Library = () => {
  /* ---------- AUTH ---------- */
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ---------- LOGIN / REGISTER ---------- */
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  /* ---------- DATA ---------- */
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('library_token');
    if (token) {
      setIsAuthenticated(true);
      fetchBooks(token);
    }
  }, []);

  /* ================= API ================= */

  const fetchBooks = async (token: string) => {
    try {
      setIsFetching(true);
      const res = await api.get('/library', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(res.data.data ?? res.data);
    } catch {
      toast.error('Failed to load books');
    } finally {
      setIsFetching(false);
    }
  };

  const registerHandler = async () => {
    if (!name || !email || !password) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      const res = await api.post('/auth/register', {
        name,
        email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem('library_token', token);

      toast.success('Registered successfully');
      setIsAuthenticated(true);
      fetchBooks(token);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Register failed');
    } finally {
      setLoading(false);
    }
  };

  const loginHandler = async () => {
    if (!email || !password) {
      toast.error('Email and password required');
      return;
    }

    try {
      setLoading(true);
      const res = await api.post('/auth/login', { email, password });

      const token = res.data.token;
      localStorage.setItem('library_token', token);

      toast.success('Login successful');
      setIsAuthenticated(true);
      fetchBooks(token);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem('library_token');
    setIsAuthenticated(false);
    setBooks([]);
  };

  /* ================= BORROW / RETURN ================= */

  const getBorrowKey = (token: string, bookId: string) =>
    `library_user_borrowed_${token}_${bookId}`;

  const normalizeBook = (res: any): Book => (res?.data?._id ? res.data : res);

  const borrowBook = async (id: string) => {
    try {
      const token = localStorage.getItem('library_token');
      if (!token) return;

      const key = getBorrowKey(token, id);
      const currentBorrowed = Number(localStorage.getItem(key) || 0);

      const res = await api.put(
        `/library/borrow/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const updatedBook = normalizeBook(res.data);

      localStorage.setItem(key, String(currentBorrowed + 1));
      setBooks((prev) => prev.map((b) => (b._id === id ? updatedBook : b)));

      toast.success('Book borrowed successfully');
    } catch {
      toast.error('Borrow failed');
    }
  };

  const returnBook = async (id: string) => {
    try {
      const token = localStorage.getItem('library_token');
      if (!token) return;

      const key = getBorrowKey(token, id);
      const currentBorrowed = Number(localStorage.getItem(key) || 0);
      if (currentBorrowed <= 0) return;

      const res = await api.put(
        `/library/return/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const updatedBook = normalizeBook(res.data);

      localStorage.setItem(key, String(currentBorrowed - 1));
      setBooks((prev) => prev.map((b) => (b._id === id ? updatedBook : b)));

      toast.success('Book returned successfully');
    } catch {
      toast.error('Return failed');
    }
  };

  /* ================= LOGIN / REGISTER UI ================= */

  if (!isAuthenticated) {
    return (
      <>
        <Toaster
          position='top-right'
          toastOptions={{
            duration: 3000,
            style: {
              fontSize: '14px',
              background: 'hsl(var(--card))',
              color: 'hsl(var(--foreground))',
              border: '1px solid hsl(var(--border))',
            },
          }}
        />

        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#060b1f] via-[#0b122e] to-[#150c2c] px-4'>
          <Card className='w-full max-w-md rounded-2xl border border-white/10 bg-[#0b1027]/80 backdrop-blur-2xl shadow-2xl'>
            <CardContent className='p-10 space-y-6'>
              <div className='flex flex-col items-center space-y-3'>
                <div className='h-14 w-14 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center'>
                  <BookOpen className='text-white' />
                </div>
                <h2 className='text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500'>
                  Smart Library
                </h2>
              </div>

              {isRegister && (
                <div className='relative'>
                  <User className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <Input
                    placeholder='Full name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='pl-12 h-12 bg-[#131a3a] border-white/10 text-white rounded-xl'
                  />
                </div>
              )}

              <div className='relative'>
                <Mail className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                <Input
                  placeholder='Email address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='pl-12 h-12 bg-[#131a3a] border-white/10 text-white rounded-xl'
                />
              </div>

              <div className='relative'>
                <Lock className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='pl-12 pr-12 h-12 bg-[#131a3a] border-white/10 text-white rounded-xl'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400'
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              <Button
                onClick={isRegister ? registerHandler : loginHandler}
                disabled={loading}
                className='w-full h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl'
              >
                {isRegister ? 'Register' : 'Login'}
              </Button>

              <p className='text-center text-sm text-gray-400'>
                {isRegister
                  ? 'Already have an account?'
                  : "Don't have an account?"}
                <button
                  onClick={() => setIsRegister(!isRegister)}
                  className='ml-2 text-cyan-400 hover:underline'
                >
                  {isRegister ? 'Login' : 'Register'}
                </button>
              </p>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  /* ================= LOADING / ERROR (COURSES STYLE) ================= */

  if (isFetching) {
    return (
      <div className='min-h-screen pt-16 flex items-center justify-center'>
        <p className='text-muted-foreground animate-pulse'>Loading books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen pt-16 flex items-center justify-center'>
        <p className='text-destructive'>{error}</p>
      </div>
    );
  }

  /* ================= DASHBOARD ================= */

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const token = localStorage.getItem('library_token');

  return (
    <>
      <Toaster
        position='top-right'
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: '14px',
            background: 'hsl(var(--card))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />

      <div className='min-h-screen bg-gradient-to-br from-[#060b1f] via-[#0b122e] to-[#150c2c] pt-24 px-6'>
        {/* 🔹 STATS (same style as Courses page) */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-16'>
          {[
            { icon: BookOpen, label: 'Books', value: `${books.length}+` },
            { icon: Users, label: 'Readers', value: '3000+' },
            { icon: Clock, label: '24/7', value: 'Access' },
            { icon: Sparkles, label: 'Quality', value: 'Premium' },
          ].map((stat, i) => (
            <Card
              key={i}
              className='bg-[#0b1027]/70 border border-white/10 backdrop-blur-xl rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:scale-[1.05] transition'
            >
              <stat.icon className='text-cyan-400 mb-3' />
              <h3 className='text-2xl font-bold text-white'>{stat.value}</h3>
              <p className='text-sm text-gray-400'>{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* HEADER */}
        <header className='flex justify-between items-center mb-10'>
          <h1 className='text-4xl font-bold text-white'>Library</h1>
          <Button
            variant='destructive'
            onClick={logoutHandler}
          >
            <LogOut className='w-4 h-4 mr-2' />
            Logout
          </Button>
        </header>

        {/* SEARCH */}
        <div className='relative max-w-md mb-10'>
          <Input
            placeholder='Search books...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pr-12 bg-[#131a3a] border-white/10 text-white'
          />
          <Search className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400' />
        </div>

        {/* BOOK CARDS */}
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {isFetching
            ? Array.from({ length: 6 }).map((_, i) => <BookSkeleton key={i} />)
            : filteredBooks.map((book) => {
                const borrowed = token
                  ? Number(
                      localStorage.getItem(getBorrowKey(token, book._id)) || 0,
                    )
                  : 0;

                return (
                  <Card
                    key={book._id}
                    className='group relative bg-[#0b1027]/80 border border-white/10 rounded-2xl backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.6)] hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all duration-500'
                  >
                    <CardContent className='p-6 space-y-4'>
                      <div className='relative overflow-hidden rounded-xl'>
                        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10' />
                        <img
                          src={resolveImageUrl(book.image)}
                          alt={book.title}
                          className='h-52 w-full object-cover group-hover:scale-110 transition-transform duration-700'
                        />
                      </div>

                      <h3 className='text-xl font-semibold text-white'>
                        {book.title}
                      </h3>

                      <p className='text-sm text-gray-400'>by {book.author}</p>

                      <div className='flex justify-between items-center'>
                        <span className='text-gray-300'>
                          Available: {book.quantity}
                        </span>
                        <Badge className='bg-cyan-600'>
                          Borrowed: {borrowed}
                        </Badge>
                      </div>

                      <div className='flex gap-3 pt-2'>
                        <Button
                          className='flex-1'
                          disabled={book.quantity <= 0}
                          onClick={() => borrowBook(book._id)}
                        >
                          Borrow
                        </Button>

                        <Button
                          variant='secondary'
                          className='flex-1'
                          disabled={borrowed <= 0}
                          onClick={() => returnBook(book._id)}
                        >
                          Return
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
        </div>
      </div>
    </>
  );
};;

export default Library;

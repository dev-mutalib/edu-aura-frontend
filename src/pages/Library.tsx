import { useEffect, useState } from 'react';
import api from '../api/axios.js';

/* ================= TYPES ================= */

interface Book {
     id: number;
     title: string;
     author: string;
     quantity: number;
}

/* ================= COMPONENT ================= */

const Library = () => {
     /* ---------- AUTH STATE ---------- */
     const [isAuthenticated, setIsAuthenticated] = useState(false);
     const [loading, setLoading] = useState(false);

     /* ---------- LOGIN STATE ---------- */
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');

     /* ---------- LIBRARY DATA ---------- */
     const [books, setBooks] = useState<Book[]>([]);

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

               // ✅ SIMPLE PATH
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

               // ✅ SIMPLE PATH
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

     /* ================= LOGIN UI ================= */

     if (!isAuthenticated) {
          return (
               <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-600">
                    <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
                         <h1 className="text-3xl font-bold text-center text-indigo-600">
                              Smart Library
                         </h1>

                         <p className="text-sm text-gray-500 text-center mb-6">
                              Login to continue
                         </p>

                         <input
                              type="email"
                              placeholder="Email"
                              className="w-full border rounded-lg px-4 py-2 mb-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                         />

                         <input
                              type="password"
                              placeholder="Password"
                              className="w-full border rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                         />

                         <button
                              onClick={loginHandler}
                              disabled={loading}
                              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
                         >
                              {loading ? 'Signing in...' : 'Login'}
                         </button>
                    </div>
               </div>
          );
     }

     /* ================= DASHBOARD ================= */

     return (
          <div className="min-h-screen bg-gray-100 p-6">
               <header className="flex justify-between items-center mb-8">
                    <div>
                         <h1 className="text-2xl font-bold text-indigo-700">
                              Library Dashboard
                         </h1>
                         <p className="text-sm text-gray-500">
                              Manage your books smartly
                         </p>
                    </div>

                    <button
                         onClick={logoutHandler}
                         className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                         Logout
                    </button>
               </header>

               <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {books.map((book) => (
                         <div
                              key={book.id}
                              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
                         >
                              <h3 className="text-lg font-bold text-gray-800">
                                   {book.title}
                              </h3>

                              <p className="text-sm text-gray-500 mb-4">
                                   by {book.author}
                              </p>

                              <div className="flex justify-between items-center">
                                   <span className="text-sm font-medium">
                                        Qty: {book.quantity}
                                   </span>

                                   <span
                                        className={`text-xs px-3 py-1 rounded-full ${book.quantity > 0
                                                  ? 'bg-green-100 text-green-700'
                                                  : 'bg-red-100 text-red-700'
                                             }`}
                                   >
                                        {book.quantity > 0 ? 'Available' : 'Out of Stock'}
                                   </span>
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     );
};

export default Library;

// Form field validation utilities

export const validateName = (name: string): string | null => {
  const trimmed = name.trim();
  if (!trimmed) return 'Name is required';
  if (trimmed.length < 2) return 'Name must be at least 2 characters';
  if (trimmed.length > 100) return 'Name must be less than 100 characters';
  // Only letters, spaces, dots, and hyphens allowed
  if (!/^[a-zA-Z\s.\-']+$/.test(trimmed)) return 'Name can only contain letters, spaces, dots, and hyphens';
  return null;
};

export const validateEmail = (email: string): string | null => {
  const trimmed = email.trim();
  if (!trimmed) return 'Email is required';
  if (trimmed.length > 255) return 'Email must be less than 255 characters';
  // Standard email regex
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed)) return 'Please enter a valid email address';
  return null;
};

export const validatePhone = (phone: string): string | null => {
  const trimmed = phone.trim();
  if (!trimmed) return 'Phone number is required';
  // Remove spaces, dashes, parentheses for validation
  const digits = trimmed.replace(/[\s\-()]/g, '');
  // Allow optional + prefix, then 10-15 digits
  if (!/^\+?\d{10,15}$/.test(digits)) return 'Please enter a valid phone number (10-15 digits)';
  return null;
};

export const validateMessage = (message: string): string | null => {
  const trimmed = message.trim();
  if (!trimmed) return 'Message is required';
  if (trimmed.length < 10) return 'Message must be at least 10 characters';
  if (trimmed.length > 1000) return 'Message must be less than 1000 characters';
  return null;
};

export const validateSubject = (subject: string): string | null => {
  const trimmed = subject.trim();
  if (!trimmed) return null; // optional field
  if (trimmed.length > 200) return 'Subject must be less than 200 characters';
  if (!/^[a-zA-Z0-9\s.,!?'\-()]+$/.test(trimmed)) return 'Subject contains invalid characters';
  return null;
};

export const validateCourse = (course: string): string | null => {
  if (!course) return 'Please select a course';
  return null;
};

// Sanitize input - restrict characters for name fields
export const sanitizeName = (value: string): string => {
  return value.replace(/[^a-zA-Z\s.\-']/g, '');
};

// Restrict phone to digits, +, spaces, dashes, parens
export const sanitizePhone = (value: string): string => {
  return value.replace(/[^0-9+\s\-()]/g, '');
};

import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Target,
  Calendar,
  Bell,
  ClipboardList,
  LucideIcon,
} from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useRef } from 'react';

import poster from '../Assets/images/poster.jpg';
import staf from '../Assets/images/staf.jpg';
import campus from '../Assets/images/yoga.jpg';

/* ---------- TYPES ---------- */

interface StatItem {
  number: string;
  label: string;
  icon: LucideIcon;
}

interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface CarouselItem {
  title: string;
  image: string;
}

interface NoticeItem {
  id: number;
  title: string;
  date: string;
  program: string;
  icon: LucideIcon;
}

const Home: React.FC = () => {
  /* ---------- DATA ---------- */

  const stats: StatItem[] = [
    { number: '5000+', label: 'Students', icon: Users },
    { number: '200+', label: 'Faculty', icon: BookOpen },
    { number: '50+', label: 'Programs', icon: Target },
    { number: '98%', label: 'Success Rate', icon: Award },
  ];

  const features: FeatureItem[] = [
    {
      title: 'Quality Education',
      description: 'World-class curriculum.',
      icon: BookOpen,
    },
    {
      title: 'Expert Faculty',
      description: 'Industry professionals.',
      icon: Users,
    },
    {
      title: 'Modern Facilities',
      description: 'Smart campus & labs.',
      icon: Target,
    },
    {
      title: 'Career Support',
      description: 'Placement guidance.',
      icon: Award,
    },
  ];

  const carouselItems: CarouselItem[] = [
    { title: 'Empowering Education', image: poster },
    { title: 'International Yoga Bay', image: staf },
    { title: 'Explore Campus', image: campus },
  ];

  const notices: NoticeItem[] = [
    {
      id: 1,
      title: 'BCA Mid-Term Exams',
      date: 'May 25, 2025',
      program: 'BCA',
      icon: ClipboardList,
    },
    {
      id: 2,
      title: 'BBA Industry Visit',
      date: 'June 5, 2025',
      program: 'BBA',
      icon: Calendar,
    },
    {
      id: 3,
      title: 'MCA Project Deadline',
      date: 'June 15, 2025',
      program: 'MCA',
      icon: Bell,
    },
  ];

  /* ---------- AUTO SCROLL NOTICE BOARD ---------- */

  const AutoScrollNoticeBoard: React.FC = () => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;

      let pos = 0;
      const interval = window.setInterval(() => {
        pos += 1;
        if (pos >= el.scrollHeight - el.clientHeight) {
          pos = 0;
        }
        el.scrollTop = pos;
      }, 80);

      return () => window.clearInterval(interval);
    }, []);

    return (
      <div className='h-72 sm:h-80 md:h-96 overflow-hidden rounded-xl border bg-white'>
        <div ref={ref}>
          {notices.map((n) => (
            <div
              key={n.id}
              className='border-b p-4 last:border-none'
            >
              <div className='flex gap-3'>
                <n.icon
                  className='mt-1 text-blue-600'
                  size={18}
                />
                <div>
                  <p className='text-sm sm:text-base font-medium'>{n.title}</p>
                  <p className='text-xs sm:text-sm text-gray-500'>
                    {n.date} • {n.program}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ---------- CAROUSEL SETTINGS ---------- */

  const carouselSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    fade: true,
  };

  return (
    <div className='relative overflow-x-hidden'>
      {/* Floating Icons (Desktop only) */}
      <div className='fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex'>
        <a
          href='https://wa.me/918830772432'
          target='_blank'
          rel='noreferrer'
          className='rounded-full bg-white p-2 shadow'
        >
          <img
            src='https://img.icons8.com/color/36/whatsapp--v1.png'
            alt='WhatsApp'
          />
        </a>

        <a
          href='mailto:principal@ssbesitm.org'
          className='rounded-full bg-white p-2 shadow'
        >
          <img
            src='https://img.icons8.com/color/36/gmail-new.png'
            alt='Gmail'
          />
        </a>
      </div>

      {/* HERO */}
      <section className='pt-16 md:pt-20'>
        <Slider {...carouselSettings}>
          {carouselItems.map((item, i) => (
            <div
              key={i}
              className='relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[85vh]'
            >
              <img
                src={item.image}
                alt={item.title}
                className='absolute inset-0 h-full w-full object-cover'
              />
              <div className='absolute inset-0 bg-black/40' />

              <div className='relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white'>
                <h1 className='mb-6 text-2xl sm:text-3xl md:text-5xl font-bold'>
                  {item.title}
                </h1>

                <div className='flex w-full max-w-sm flex-col gap-4 sm:max-w-none sm:flex-row sm:justify-center'>
                  <Button
                    asChild
                    className='w-full sm:w-auto'
                  >
                    <Link
                      to='/admissions'
                      className='flex items-center gap-2'
                    >
                      Apply Now <ArrowRight size={16} />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant='outline'
                    className='w-full sm:w-auto'
                  >
                    <Link to='/courses'>Explore Courses</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* STATS */}
      <section className='bg-white py-12 md:py-16'>
        <div className='mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 md:grid-cols-4'>
          {stats.map((s, i) => (
            <div
              key={i}
              className='text-center'
            >
              <s.icon className='mx-auto mb-2 text-blue-600' />
              <p className='text-2xl sm:text-3xl font-bold'>{s.number}</p>
              <p className='text-sm text-gray-600'>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NOTICE BOARD */}
      <section className='bg-gray-50 py-12 md:py-16'>
        <div className='mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <h2 className='mb-4 text-xl md:text-2xl font-bold'>
              Student Notice Board
            </h2>
            <AutoScrollNoticeBoard />
          </div>

          <div className='rounded-xl bg-white p-6 shadow'>
            <h3 className='mb-4 flex items-center gap-2 font-bold'>
              <Calendar size={18} /> Key Dates
            </h3>
            <ul className='space-y-2 text-sm text-gray-700'>
              <li>Admission Deadline – June 30</li>
              <li>Semester Start – July 15</li>
              <li>Final Exams – Dec 1</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className='bg-white py-16 md:py-20'>
        <div className='mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4'>
          {features.map((f, i) => (
            <Card key={i}>
              <CardContent className='p-6 text-center'>
                <f.icon className='mx-auto mb-4 text-blue-600' />
                <h3 className='font-semibold'>{f.title}</h3>
                <p className='mt-2 text-sm text-gray-600'>{f.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

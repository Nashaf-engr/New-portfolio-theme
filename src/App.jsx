import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Components
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import BackgroundEffects from './components/BackgroundEffects';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Welcome from './components/Welcome';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Education from './components/Education';
import TechStack from './components/TechStack';
import Service from './components/Service';
import Projects from './components/Projects';
import ProjectModal from './components/ProjectModal';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Icons for floaters
import { FaWhatsapp } from 'react-icons/fa';
import { LuArrowUp } from 'react-icons/lu';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState(null);
  const [toasts, setToasts] = useState([]);
  
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return preferredDark ? 'dark' : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);
  
  const defaultTestimonials = [
    {
      name: "Peradeniya AgriTech",
      role: "Co-Founder",
      message: "Outstanding engineering and eye for detail. The smart plant monitoring system was integrated flawlessly!",
      avatar: "/assets/icon.png"
    },
    {
      name: "Bistro Cafe",
      role: "Owner",
      message: "Naseef brought our restaurant layout to life with smooth animations. Highly recommend his creative stack.",
      avatar: "/assets/icon.png"
    },
    {
      name: "UOP Engineering Faculty",
      role: "Coordinator",
      message: "A brilliant student and designer. His care for code logic is matched by his graphic layouts.",
      avatar: "/assets/icon.png"
    },
    {
      name: "Destino Travel",
      role: "Manager",
      message: "Very easy to work with, responsive, and produced a beautiful travel agency website theme.",
      avatar: "/assets/icon.png"
    }
  ];

  // Testimonials State (Default values + dynamic updates)
  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem('portfolio-testimonials');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing testimonials from localStorage:", e);
      }
    }
    return defaultTestimonials;
  });

  // Load reviews dynamically from public/reviews.json
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/reviews.json');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setTestimonials(data);
          }
        }
      } catch (error) {
        console.error("Error fetching reviews from reviews.json:", error);
      }
    };
    fetchReviews();
  }, []);

  // Save testimonials to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('portfolio-testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  // Initialise Lenis smooth scroll, GSAP and AOS
  useEffect(() => {
    if (loading) return;

    // AOS Init
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });

    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 2
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  // Toast handler
  const handleShowToast = (type, title, message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, title, message }]);

    // Auto delete after 3.2 seconds
    setTimeout(() => {
      setToasts((prev) => prev.map((t) => t.id === id ? { ...t, leaving: true } : t));
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 220);
    }, 3200);
  };

  const handleAddTestimonial = async (newReview) => {
    // 1. Instantly update local state so the user sees their review immediately
    setTestimonials((prev) => [newReview, ...prev]);
    handleShowToast('success', 'Submitting Review', 'Sending your review to GitHub...');

    try {
      const response = await fetch('/api/add-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newReview.name,
          role: newReview.role,
          message: newReview.message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        handleShowToast('success', 'Review Saved', 'Your review was saved to GitHub! It will display for everyone in a few minutes once Vercel finishes deploying.');
      } else {
        console.warn('API error saving review to GitHub:', result);
        
        if (response.status === 404) {
          // This typically happens in local development environment
          handleShowToast('success', 'Review Added (Local)', 'Review added locally! (GitHub updates are only active on the deployed Vercel site).');
        } else {
          const errorMsg = result.error || 'Server error';
          handleShowToast('error', 'Sync Failed', `Your review was added locally, but could not be saved to GitHub: ${errorMsg}`);
        }
      }
    } catch (error) {
      console.error('Error submitting review to API:', error);
      handleShowToast('success', 'Review Added (Local)', 'Review added locally! (Note: Could not connect to API server).');
    }
  };

  return (
    <>
      {loading ? (
        <Loader onComplete={() => setLoading(false)} />
      ) : (
        <div className="relative min-h-screen text-zinc-950 dark:text-white select-none selection:bg-luxury-yellow selection:text-zinc-950">
          
          {/* Custom Cursor follower */}
          <CustomCursor />

          {/* Premium Background layers */}
          <BackgroundEffects />

          {/* Top Navbar header */}
          <Navbar theme={theme} setTheme={setTheme} onAddTestimonial={handleAddTestimonial} />

          {/* Page content scroll overlap wrapper */}
          <main className="relative w-full overflow-hidden">
            {/* Sections */}
            <Hero />
            <Welcome testimonials={testimonials} />
            <Portfolio />
            <About />
            <Education />
            <TechStack />
            <Service />
            <Projects onSelectProject={setActiveProject} />
            <Achievements />
            <Certifications />
            <Contact onShowToast={handleShowToast} />
          </main>

          {/* Footer */}
          <Footer />

          {/* Case Study Modal Overlay */}
          {activeProject && (
            <ProjectModal
              project={activeProject}
              onClose={() => setActiveProject(null)}
            />
          )}

          {/* Toast Notification Stack */}
          <div className="fixed bottom-6 left-6 z-[110] flex flex-col gap-3 pointer-events-none">
            {toasts.map((toast) => (
              <div
                key={toast.id}
                className={`flex gap-3 bg-zinc-900/90 border border-white/10 p-5 rounded-2xl shadow-2xl backdrop-blur-md pointer-events-auto transition-all duration-300 max-w-sm ${
                  toast.leaving ? 'opacity-0 -translate-x-10 scale-95' : 'opacity-100 translate-x-0 scale-100'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white ${
                  toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
                }`}>
                  <span className="font-bold">{toast.type === 'success' ? '✓' : '!'}</span>
                </div>
                <div>
                  <strong className="block text-sm text-white">{toast.title}</strong>
                  <p className="text-xs text-zinc-400 mt-1">{toast.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Floating Actions (WhatsApp & Back to Top) */}
          <div className="fixed right-6 bottom-6 z-40 flex flex-col gap-3">
            <a
              href="https://wa.me/94720243581?text=Hello%20Naseef%2C%20I%20visited%20your%20portfolio."
              target="_blank"
              rel="noreferrer"
              aria-label="Contact on WhatsApp"
              className="w-12 h-12 rounded-full bg-zinc-900 hover:bg-[#25D366] text-zinc-400 hover:text-white border border-white/10 hover:border-transparent flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110"
            >
              <FaWhatsapp className="text-xl" />
            </a>
            
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="w-12 h-12 rounded-full bg-zinc-900 hover:bg-luxury-yellow text-zinc-400 hover:text-zinc-950 border border-white/10 hover:border-transparent flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110"
            >
              <LuArrowUp className="text-xl" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}

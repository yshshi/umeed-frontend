import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  const impactRef = useRef(null);

  useEffect(() => {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    const onBtnClick = (e) => {
      e.stopPropagation();
      menu.classList.toggle('hidden');
    };
    const onDocClick = () => menu.classList.add('hidden');
    const onMenuClick = (e) => e.stopPropagation();
    btn.addEventListener('click', onBtnClick);
    document.addEventListener('click', onDocClick);
    menu.addEventListener('click', onMenuClick);
    document.querySelectorAll('#mobile-menu a, #mobile-menu button').forEach((item) => {
      item.addEventListener('click', () => menu.classList.add('hidden'));
    });
    return () => {
      btn.removeEventListener('click', onBtnClick);
      document.removeEventListener('click', onDocClick);
      menu.removeEventListener('click', onMenuClick);
    };
  }, []);

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, observerOptions);
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const langEn = document.getElementById('lang-en');
    const langHi = document.getElementById('lang-hi');
    if (!langEn || !langHi) return;
    const onEn = () => {
      langEn.classList.add('bg-emerald-600', 'text-white');
      langEn.classList.remove('bg-gray-200', 'text-gray-600');
      langHi.classList.remove('bg-emerald-600', 'text-white');
      langHi.classList.add('bg-gray-200', 'text-gray-600');
    };
    const onHi = () => {
      langHi.classList.add('bg-emerald-600', 'text-white');
      langHi.classList.remove('bg-gray-200', 'text-gray-600');
      langEn.classList.remove('bg-emerald-600', 'text-white');
      langEn.classList.add('bg-gray-200', 'text-gray-600');
    };
    langEn.addEventListener('click', onEn);
    langHi.addEventListener('click', onHi);
    return () => {
      langEn.removeEventListener('click', onEn);
      langHi.removeEventListener('click', onHi);
    };
  }, []);

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }, []);

  useEffect(() => {
    const impactSection = document.getElementById('impact');
    if (!impactSection) return;
    const animateCounters = () => {
      document.querySelectorAll('[data-counter]').forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-counter'), 10);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = target + '+';
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current) + '+';
          }
        }, 40);
      });
    };
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counterObserver.observe(impactSection);
    return () => counterObserver.disconnect();
  }, []);

  return (
    <div className="w-full h-full">
      <style>{`
        .heading-font { font-family: 'Playfair Display', serif; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.4); }
          50% { box-shadow: 0 0 40px rgba(249, 115, 22, 0.6); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float 6s ease-in-out infinite; animation-delay: 2s; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-on-scroll { opacity: 0; }
        .animate-on-scroll.visible { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-slide-left.visible { animation: slide-in-left 0.8s ease-out forwards; }
        .animate-slide-right.visible { animation: slide-in-right 0.8s ease-out forwards; }
        .animate-scale.visible { animation: scale-in 0.6s ease-out forwards; }
        .gradient-bg {
          background: linear-gradient(-45deg, #059669, #10b981, #f97316, #fb923c);
          background-size: 400% 400%;
          animation: gradient-shift 15s ease infinite;
        }
        .card-hover { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .card-hover:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .btn-primary {
          background: linear-gradient(135deg, #f97316, #fb923c);
          transition: all 0.3s ease;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(249, 115, 22, 0.4);
        }
        .btn-secondary {
          background: transparent;
          border: 2px solid white;
          transition: all 0.3s ease;
        }
        .btn-secondary:hover { background: white; color: #059669; }
        .counter-value {
          background: linear-gradient(135deg, #059669, #f97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .section-divider {
          background: linear-gradient(90deg, transparent, #10b981, #f97316, transparent);
          height: 3px;
        }
        .decorative-circle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
        }
        .project-icon {
          background: linear-gradient(135deg, #ecfdf5, #fff7ed);
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Playfair+Display:wght@600;700&family=Bebas+Neue&family=Abril+Fatface&display=swap"
        rel="stylesheet"
      />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <img
                src="./logo.jpeg"
                alt="UMEED NGO Logo"
                className="h-12 sm:h-12 md:h-14 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  document.getElementById('logo-fallback')?.classList.remove('hidden');
                }}
              />
              <span id="logo-fallback" className="hidden text-xl font-bold text-emerald-700">UMEED</span>
            </div>
            <div className="relative flex items-center justify-between">
              <div className="hidden md:flex items-center space-x-8">
                <a href="#about" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">About</a>
                <a href="#impact" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">Impact</a>
                <a href="#mission" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">Mission</a>
                <a href="#projects" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">Projects</a>
                <Link to="/login">
                  <button className="btn-primary text-white px-6 py-2 rounded-full font-semibold">Login/Registration</button>
                </Link>
              </div>
              <button id="mobile-menu-btn" type="button" className="md:hidden text-gray-600" aria-label="Menu">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 9h16M4 15h16M4 21h16" />
                </svg>
              </button>
              <div
                id="mobile-menu"
                className="hidden md:hidden absolute top-12 right-0 w-56 bg-white shadow-lg rounded-lg p-4 space-y-3 z-50"
              >
                <a href="#about" className="block text-gray-600 hover:text-emerald-600 font-medium">About</a>
                <a href="#impact" className="block text-gray-600 hover:text-emerald-600 font-medium">Impact</a>
                <a href="#mission" className="block text-gray-600 hover:text-emerald-600 font-medium">Mission</a>
                <a href="#projects" className="block text-gray-600 hover:text-emerald-600 font-medium">Projects</a>
                <Link to="/login">
                  <button type="button" className="w-full btn-primary text-white px-6 py-2 rounded-full font-semibold">
                    Login/Registration
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 via-slate-900 to-orange-950/20" />
          <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="darkGlow1" cx="30%" cy="30%">
                <stop offset="0%" stopColor="rgba(16,185,129,0.6)" />
                <stop offset="50%" stopColor="rgba(16,185,129,0.2)" />
                <stop offset="100%" stopColor="rgba(16,185,129,0)" />
              </radialGradient>
              <radialGradient id="darkGlow2" cx="70%" cy="70%">
                <stop offset="0%" stopColor="rgba(249,115,22,0.5)" />
                <stop offset="50%" stopColor="rgba(249,115,22,0.15)" />
                <stop offset="100%" stopColor="rgba(249,115,22,0)" />
              </radialGradient>
              <radialGradient id="blueglow" cx="50%" cy="50%">
                <stop offset="0%" stopColor="rgba(59,130,246,0.4)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0)" />
              </radialGradient>
              <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
              </filter>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.8" />
                </feComponentTransfer>
              </filter>
            </defs>
            <circle cx="1000" cy="-100" r="700" fill="url(#darkGlow2)" opacity="0.8" filter="url(#blur)" />
            <circle cx="150" cy="850" r="600" fill="url(#darkGlow1)" opacity="0.7" filter="url(#blur)" />
            <circle cx="600" cy="-50" r="500" fill="url(#blueglow)" opacity="0.4" filter="url(#blur)" />
            <g opacity="0.25" transform="translate(200, 150)">
              <circle cx="0" cy="0" r="150" fill="none" stroke="url(#darkGlow1)" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="100" fill="none" stroke="url(#darkGlow1)" strokeWidth="1" />
              <circle cx="0" cy="0" r="50" fill="none" stroke="url(#darkGlow1)" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="20" fill="url(#darkGlow1)" opacity="0.5" />
            </g>
            <g opacity="0.2" transform="translate(1000, 600)">
              <circle cx="0" cy="0" r="180" fill="none" stroke="url(#darkGlow2)" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="120" fill="none" stroke="url(#darkGlow2)" strokeWidth="1" />
              <circle cx="0" cy="0" r="60" fill="none" stroke="url(#darkGlow2)" strokeWidth="0.8" />
            </g>
            <g opacity="0.15" stroke="rgba(16,185,129,0.4)" strokeWidth="0.5" fill="none">
              <path d="M 150 200 L 350 250 L 500 150 L 700 280 L 900 180" />
              <path d="M 250 500 L 450 450 L 650 520 L 850 480" />
              <path d="M 100 700 L 300 650 L 550 720 L 800 680" />
            </g>
            <g opacity="0.12" fill="url(#darkGlow1)">
              <path d="M 0 400 Q 150 350 300 400 T 600 400 T 900 400 T 1200 400 L 1200 500 Q 1050 450 900 500 T 600 500 T 300 500 T 0 500 Z" filter="url(#glow)" />
            </g>
            <g opacity="0.4" fill="url(#darkGlow1)">
              <circle cx="150" cy="120" r="3" filter="url(#glow)" />
              <circle cx="450" cy="100" r="2.5" filter="url(#glow)" />
              <circle cx="750" cy="140" r="3" filter="url(#glow)" />
              <circle cx="1050" cy="110" r="2.5" filter="url(#glow)" />
              <circle cx="300" cy="250" r="2" filter="url(#glow)" />
              <circle cx="900" cy="220" r="2.5" filter="url(#glow)" />
              <circle cx="600" cy="80" r="2" filter="url(#glow)" />
              <circle cx="1100" cy="300" r="2.5" filter="url(#glow)" />
            </g>
            <g opacity="0.3" fill="url(#darkGlow2)">
              <circle cx="200" cy="650" r="2.5" filter="url(#glow)" />
              <circle cx="850" cy="680" r="2" filter="url(#glow)" />
              <circle cx="1150" cy="150" r="2.5" filter="url(#glow)" />
            </g>
            <g opacity="0.15" stroke="rgba(249,115,22,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round">
              <path d="M 350 550 Q 360 450 350 350" />
              <path d="M 850 570 Q 860 450 850 330" />
              <path d="M 600 600 Q 610 450 600 300" />
            </g>
            <rect width="1200" height="800" fill="url(#darkGlow1)" opacity="0.05" />
          </svg>
        </div>
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 animate-float blur-2xl" />
        <div className="absolute bottom-32 right-20 w-40 h-40 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/10 animate-float-delayed blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/15 to-blue-600/5 animate-float blur-3xl" style={{ animationDelay: '1s' }} />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-20">
          <div className="mb-8 animate-on-scroll visible" style={{ animationDelay: '0.2s' }}>
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              Serving Communities Since 2016
            </div>
          </div>
          <h1 className="heading-font text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 animate-on-scroll visible" style={{ animationDelay: '0.4s', fontFamily: "'Abril Fatface', serif" }}>
            <span className="block">UMEED</span>
            <span className="block text-3xl sm:text-4xl lg:text-5xl font-normal mt-2 text-orange-200">उम्मीद</span>
          </h1>
          <p id="hero-tagline" className="text-xl sm:text-2xl lg:text-3xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed animate-on-scroll visible" style={{ animationDelay: '0.6s' }}>
            Empowering Hope Through Skills & Self-Employment
          </p>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto animate-on-scroll visible" style={{ animationDelay: '0.8s' }}>
            Building dignity, confidence, and economic independence for every individual across India
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll visible" style={{ animationDelay: '1s' }}>
            <Link to="/login">
              <button type="button" className="btn-primary text-white px-8 py-4 rounded-full font-semibold text-lg animate-pulse-glow">
                🤝 Login/Registration
              </button>
            </Link>
            <button
              type="button"
              className="btn-secondary text-white px-8 py-4 rounded-full font-semibold text-lg"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Our Work →
            </button>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 lg:py-32 bg-gradient-to-b from-white to-emerald-50 relative overflow-hidden">
        <div className="decorative-circle w-96 h-96 bg-emerald-500 -top-48 -right-48" />
        <div className="decorative-circle w-64 h-64 bg-orange-500 -bottom-32 -left-32" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4 animate-on-scroll">Our Story</span>
            <h2 id="about-title" className="heading-font text-4xl sm:text-5xl font-bold text-gray-800 mb-6 animate-on-scroll">About UMEED</h2>
            <div className="section-divider w-24 mx-auto mb-8 animate-on-scroll" />
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll animate-slide-left">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Founded by <strong className="text-emerald-600">K.N. Murti</strong> (Tamil Nadu) and <strong className="text-orange-500">Gurmit Singh</strong> (Punjab), UMEED NGO has been successfully serving communities for the past <strong>7–8 years</strong> across Punjab, Uttar Pradesh, Madhya Pradesh, Kerala, Haryana, Bihar, and Tamil Nadu.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Our work focuses on human care, skill development, self-employment, and social empowerment. We believe in creating lasting change through education, opportunity, and community support.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-full">
                  <span className="text-2xl">🌱</span>
                  <span className="text-emerald-700 font-medium">Sustainable Growth</span>
                </div>
                <div className="flex items-center space-x-2 bg-orange-50 px-4 py-2 rounded-full">
                  <span className="text-2xl">💪</span>
                  <span className="text-orange-700 font-medium">Skill Development</span>
                </div>
                <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
                  <span className="text-2xl">🤝</span>
                  <span className="text-blue-700 font-medium">Community Care</span>
                </div>
              </div>
            </div>
            <div className="animate-on-scroll animate-slide-right">
              <div className="relative">
                <div className="absolute inset-0 gradient-bg rounded-3xl transform rotate-3 opacity-20" />
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mb-4 shadow-lg">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-gray-800">K.N. Murti</h4>
                      <p className="text-sm text-gray-500">Co-Founder</p>
                      <p className="text-xs text-emerald-600 mt-1">Tamil Nadu</p>
                    </div>
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-4 shadow-lg">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-gray-800">Gurmit Singh</h4>
                      <p className="text-sm text-gray-500">Co-Founder</p>
                      <p className="text-xs text-orange-600 mt-1">Punjab</p>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-center text-gray-500 text-sm italic">&quot;Together, we envision a India where every individual has the opportunity to thrive.&quot;</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="impact" ref={impactRef} className="py-20 lg:py-28 bg-gradient-to-br from-emerald-600 via-emerald-500 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="dots" width="5" height="5" patternUnits="userSpaceOnUse">
                <circle cx="2.5" cy="2.5" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#dots)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-white/20 text-white rounded-full text-sm font-semibold mb-4 animate-on-scroll">Our Impact</span>
            <h2 className="heading-font text-4xl sm:text-5xl font-bold text-white mb-4 animate-on-scroll">Creating Real Change</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto animate-on-scroll">Numbers that represent hope, transformation, and countless lives touched</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center card-hover animate-on-scroll animate-scale" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-5xl font-bold text-white mb-2" data-counter="7">7+</div>
              <p className="text-white/80 font-medium">Years of Service</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center card-hover animate-on-scroll animate-scale" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="text-5xl font-bold text-white mb-2" data-counter="7">7+</div>
              <p className="text-white/80 font-medium">States Impacted</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center card-hover animate-on-scroll animate-scale" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-5xl font-bold text-white mb-2">1000s</div>
              <p className="text-white/80 font-medium">Lives Touched</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center card-hover animate-on-scroll animate-scale" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="text-5xl font-bold text-white mb-2">10+</div>
              <p className="text-white/80 font-medium">Active Projects</p>
            </div>
          </div>
          <div className="mt-16 text-center animate-on-scroll">
            <p className="text-white/70 mb-4">Serving communities across</p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-6 py-2 bg-white/20 rounded-full text-white font-medium">🏛️ Punjab</span>
              <span className="px-6 py-2 bg-white/20 rounded-full text-white font-medium">🏛️ Uttar Pradesh</span>
              <span className="px-6 py-2 bg-white/20 rounded-full text-white font-medium">🏛️ Bihar</span>
              <span className="px-6 py-2 bg-white/20 rounded-full text-white font-medium">🏛️ Tamil Nadu</span>
              <span className="px-6 py-2 bg-white/20 rounded-full text-white font-medium">🏛️ Madhya Pradesh</span>
              <span className="px-6 py-2 bg-white/20 rounded-full text-white font-medium">🏛️ Kerala</span>
              <span className="px-6 py-2 bg-white/20 rounded-full text-white font-medium">🏛️ Haryana</span>
            </div>
          </div>
        </div>
      </section>

      <section id="mission" className="py-20 lg:py-32 bg-white relative overflow-hidden">
        <div className="decorative-circle w-80 h-80 bg-orange-500 top-0 right-0 transform translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 animate-on-scroll animate-slide-left">
              <div className="relative">
                <div className="relative bg-gradient-to-br from-emerald-50 to-orange-50 rounded-3xl p-8">
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg animate-float">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <div className="space-y-6 mt-8">
                    <div className="flex items-center space-x-4 bg-white rounded-xl p-4 shadow-md card-hover">
                      <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">📚</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Skill Development</h4>
                        <p className="text-sm text-gray-500">Professional training programs</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 bg-white rounded-xl p-4 shadow-md card-hover">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">💼</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Self-Employment</h4>
                        <p className="text-sm text-gray-500">Business opportunities & support</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 bg-white rounded-xl p-4 shadow-md card-hover">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">💰</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Sustainable Income</h4>
                        <p className="text-sm text-gray-500">Long-term financial growth</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 animate-on-scroll animate-slide-right">
              <span className="inline-block px-4 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-4">Our Mission</span>
              <h2 id="mission-title" className="heading-font text-4xl sm:text-5xl font-bold text-gray-800 mb-6">Empower 1 Crore People</h2>
              <div className="section-divider w-24 mb-8" />
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Our mission is to empower <strong className="text-emerald-600">1 crore people</strong> through skill development, self-employment, and sustainable income opportunities.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                We aim to build <strong className="text-orange-500">dignity, confidence, and long-term economic independence</strong> for every individual we serve. Each person we help creates a ripple effect of positive change in their families and communities.
              </p>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-4xl font-bold counter-value">1Cr</div>
                  <p className="text-sm text-gray-500">Target Lives</p>
                </div>
                <div className="w-px h-12 bg-gray-200" />
                <div className="text-center">
                  <div className="text-4xl font-bold counter-value">∞</div>
                  <p className="text-sm text-gray-500">Hope Created</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 lg:py-32 bg-gradient-to-b from-emerald-50 to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4 animate-on-scroll">What We Do</span>
            <h2 className="heading-font text-4xl sm:text-5xl font-bold text-gray-800 mb-6 animate-on-scroll">Our Key Projects</h2>
            <div className="section-divider w-24 mx-auto mb-8 animate-on-scroll" />
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-on-scroll">Comprehensive programs designed to create sustainable change</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[
              { icon: '💇‍♀️', title: 'Beautician Training', desc: 'Professional beauty & wellness certification programs' },
              { icon: '🏭', title: 'Kutir Udhyog', desc: 'Cottage industry setup and entrepreneurship support' },
              { icon: '💳', title: 'Loan Assistance', desc: 'Financial guidance and loan facilitation services' },
              { icon: '🛡️', title: 'Insurance Awareness', desc: 'Financial protection education and enrollment' },
              { icon: '📈', title: 'Marketing Support', desc: 'Business promotion and market access assistance' },
              { icon: '☘️', title: 'Ayurved Focus', desc: 'Traditional medicine and wellness initiatives' },
              { icon: '🏠', title: 'Real Estate Guidance', desc: 'Property advice and housing support services' },
              { icon: '🏥', title: 'Hospital Support', desc: 'Healthcare access and medical assistance' },
              { icon: '✈️', title: 'Tour & Travel', desc: 'Travel assistance and pilgrimage support' },
              { icon: '📋', title: 'Government Schemes', desc: 'Scheme awareness and application support' },
            ].map((p, i) => (
              <div key={p.title} className="bg-white rounded-2xl p-6 shadow-lg card-hover animate-on-scroll animate-scale" style={{ animationDelay: `${0.05 + i * 0.05}s` }}>
                <div className="project-icon w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-3xl">{p.icon}</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="join" className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-10 left-10 w-24 h-24 animate-float opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-white">
            <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute bottom-20 right-10 w-32 h-32 animate-float-delayed opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-white">
            <circle cx="50" cy="50" r="45" fill="currentColor" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-white/20 text-white rounded-full text-sm font-semibold mb-4 animate-on-scroll">Get Involved</span>
            <h2 id="cta-title" className="heading-font text-4xl sm:text-5xl font-bold text-white mb-6 animate-on-scroll">Be a Part of the Change</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto animate-on-scroll">Join our mission to transform lives across India. There&apos;s a place for everyone.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center card-hover border border-white/20 animate-on-scroll animate-scale" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center"><span className="text-3xl">👤</span></div>
              <h3 className="text-xl font-bold text-white mb-2">Self Work</h3>
              <p className="text-white/70 text-sm">Start your journey of personal growth and skill development</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center card-hover border border-white/20 animate-on-scroll animate-scale" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center"><span className="text-3xl">👥</span></div>
              <h3 className="text-xl font-bold text-white mb-2">Team Work</h3>
              <p className="text-white/70 text-sm">Collaborate with like-minded individuals for greater impact</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center card-hover border border-white/20 animate-on-scroll animate-scale" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center"><span className="text-3xl">💰</span></div>
              <h3 className="text-xl font-bold text-white mb-2">Income Opportunities</h3>
              <p className="text-white/70 text-sm">Build sustainable income through our programs</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center card-hover border border-white/20 animate-on-scroll animate-scale" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center"><span className="text-3xl">❤️</span></div>
              <h3 className="text-xl font-bold text-white mb-2">Social Activities</h3>
              <p className="text-white/70 text-sm">Participate in community service and outreach</p>
            </div>
          </div>
          <div className="text-center animate-on-scroll">
            <Link to="/login">
              <button type="button" className="bg-white text-emerald-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                🚀 Register & Join UMEED
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <button id="lang-en" type="button" className="px-6 py-2 rounded-full font-medium bg-emerald-600 text-white transition-all duration-300">English</button>
            <button id="lang-hi" type="button" className="px-6 py-2 rounded-full font-medium bg-gray-200 text-gray-600 hover:bg-gray-300 transition-all duration-300">हिन्दी</button>
          </div>
          <p className="text-gray-600 italic">&quot;UMEED believes in reaching every heart, in every language.&quot;</p>
          <p className="text-gray-500 text-sm mt-2">उम्मीद का मतलब है - हर दिल तक, हर भाषा में पहुँचना</p>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <img src="./logo.jpeg" alt="UMEED NGO Logo" className="h-13 sm:h-12 md:h-14 w-auto object-contain" />
              </div>
              <p className="text-gray-400 mb-4">Empowering hope through skills, self-employment, and sustainable development across India.</p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-emerald-600 flex items-center justify-center transition-colors" aria-label="Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-emerald-600 flex items-center justify-center transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-emerald-600 flex items-center justify-center transition-colors" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" /></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-emerald-600 flex items-center justify-center transition-colors" aria-label="YouTube">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#about" className="text-gray-400 hover:text-emerald-400 transition-colors">About Us</a></li>
                <li><a href="#impact" className="text-gray-400 hover:text-emerald-400 transition-colors">Our Impact</a></li>
                <li><a href="#mission" className="text-gray-400 hover:text-emerald-400 transition-colors">Mission</a></li>
                <li><a href="#projects" className="text-gray-400 hover:text-emerald-400 transition-colors">Projects</a></li>
                <li><Link to="/login" className="text-gray-400 hover:text-emerald-400 transition-colors">Login/Registration</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Regions Served</h4>
              <ul className="space-y-3">
                {['Punjab', 'Uttar Pradesh', 'Bihar', 'Tamil Nadu', 'Madhya Pradesh', 'Kerala', 'Haryana'].map((r) => (
                  <li key={r} className="text-gray-400 flex items-center"><span className="text-emerald-400 mr-2">📍</span>{r}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Contact Us</h4>
              <ul className="space-y-3">
                <li className="text-gray-400 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  info@umeed-ngo.com
                </li>
                <li className="text-gray-400 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  +91 XXX-XXX-XXXX
                </li>
              </ul>
              <div className="mt-6">
                <h5 className="font-semibold mb-3">Founders</h5>
                <p className="text-gray-400 text-sm">K.N. Murti (Tamil Nadu)</p>
                <p className="text-gray-400 text-sm">Gurmit Singh (Punjab)</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">© 2024 UMEED NGO. All rights reserved. Made with ❤️ for India</p>
              <div className="flex space-x-6 text-sm text-gray-500">
                <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

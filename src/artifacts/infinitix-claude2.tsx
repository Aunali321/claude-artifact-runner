import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, Sparkles, Circle, Plus, ArrowUpRight, MoveRight } from 'lucide-react';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeProject, setActiveProject] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef(null);
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const projects = [
    { title: "Ethereal Spaces", category: "Architecture", year: "2024" },
    { title: "Digital Dreams", category: "Web Experience", year: "2024" },
    { title: "Motion Poetry", category: "Brand Film", year: "2023" },
    { title: "Future Forward", category: "Product Design", year: "2023" }
  ];

  const services = [
    { number: "01", title: "Digital Experiences", description: "Immersive web experiences that blur the line between art and technology" },
    { number: "02", title: "Brand Identity", description: "Distinctive visual languages that resonate and endure" },
    { number: "03", title: "Motion & Film", description: "Cinematic storytelling that moves hearts and minds" },
    { number: "04", title: "Strategic Design", description: "Thoughtful solutions grounded in research and human insight" }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden cursor-none">
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className={`fixed w-6 h-6 border border-white/50 rounded-full pointer-events-none z-[100] transition-all duration-300 ${isHovering ? 'scale-150 bg-white/10' : ''}`}
        style={{ 
          transform: `translate(${mousePosition.x - 12}px, ${mousePosition.y - 12}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[1px] bg-white/10 z-50">
        <div 
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Grain Texture Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-50">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 mix-blend-difference">
        <div className="px-8 md:px-16 py-8">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-light tracking-wider">INFINITIX</div>
            
            <div className="hidden md:flex items-center space-x-12">
              <a href="#work" className="text-sm tracking-wider hover:opacity-60 transition-opacity" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>WORK</a>
              <a href="#about" className="text-sm tracking-wider hover:opacity-60 transition-opacity" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>ABOUT</a>
              <a href="#services" className="text-sm tracking-wider hover:opacity-60 transition-opacity" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>SERVICES</a>
              <a href="#contact" className="text-sm tracking-wider hover:opacity-60 transition-opacity" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>CONTACT</a>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              <div className="w-8 h-8 flex items-center justify-center">
                <div className={`relative w-6 h-4 ${isMenuOpen ? 'rotate-180' : ''} transition-transform duration-500`}>
                  <span className={`absolute w-full h-[1px] bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-1/2' : 'top-0'}`}></span>
                  <span className={`absolute w-full h-[1px] bg-white top-1/2 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`absolute w-full h-[1px] bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-1/2' : 'bottom-0'}`}></span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center px-8 md:px-16">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-[600px] h-[600px] rounded-full border border-white/5 animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-[400px] h-[400px] rounded-full border border-white/5 animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-8">
              <div className="overflow-hidden">
                <h1 
                  className="text-[clamp(3rem,10vw,8rem)] font-thin leading-[0.9] tracking-tight"
                  style={{ 
                    transform: `translateY(${scrollProgress * 0.3}px)`,
                    opacity: 1 - scrollProgress * 0.01
                  }}
                >
                  CREATIVE
                </h1>
              </div>
              <div className="overflow-hidden">
                <h1 
                  className="text-[clamp(3rem,10vw,8rem)] font-thin leading-[0.9] tracking-tight"
                  style={{ 
                    transform: `translateY(${scrollProgress * 0.5}px)`,
                    opacity: 1 - scrollProgress * 0.01
                  }}
                >
                  STUDIO
                </h1>
              </div>
              
              <div className="flex items-start justify-between mt-16">
                <div className="max-w-md">
                  <p className="text-lg font-light leading-relaxed text-white/70">
                    We craft digital experiences that transcend the ordinary. 
                    Where art meets technology, and vision becomes reality.
                  </p>
                </div>
                
                <div className="hidden md:block">
                  <a 
                    href="#work"
                    className="group flex items-center gap-4 text-sm tracking-wider"
                    onMouseEnter={() => setIsHovering(true)} 
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <span>VIEW PROJECTS</span>
                    <div className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center group-hover:border-white transition-colors">
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-[1px] h-20 bg-white/20 relative overflow-hidden">
            <div className="absolute top-0 w-full h-1/3 bg-white animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-6xl md:text-7xl font-thin mb-8">
                WE ARE<br />INFINITIX
              </h2>
              <div className="w-20 h-[1px] bg-white/30 mb-8"></div>
              <p className="text-lg font-light leading-relaxed text-white/70 mb-6">
                A collective of designers, developers, and dreamers. We believe in the power of 
                thoughtful design to shape experiences, influence culture, and drive meaningful change.
              </p>
              <p className="text-lg font-light leading-relaxed text-white/70">
                Our approach is rooted in collaboration, innovation, and an unwavering commitment 
                to craft. Every project is an opportunity to push boundaries and create something extraordinary.
              </p>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-5xl font-light">150+</h3>
                      <p className="text-sm text-white/50 tracking-wider">PROJECTS DELIVERED</p>
                    </div>
                    <div>
                      <h3 className="text-5xl font-light">12</h3>
                      <p className="text-sm text-white/50 tracking-wider">AWARDS WON</p>
                    </div>
                    <div>
                      <h3 className="text-5xl font-light">∞</h3>
                      <p className="text-sm text-white/50 tracking-wider">POSSIBILITIES</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-thin mb-20">SERVICES</h2>
          
          <div className="space-y-0">
            {services.map((service, idx) => (
              <div 
                key={idx} 
                className="group border-t border-white/10 hover:bg-white/5 transition-all duration-500"
                onMouseEnter={() => setIsHovering(true)} 
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="py-12 flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <span className="text-sm text-white/30">{service.number}</span>
                    <div>
                      <h3 className="text-3xl md:text-4xl font-light mb-2 group-hover:translate-x-4 transition-transform duration-500">
                        {service.title}
                      </h3>
                      <p className="text-white/50 max-w-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section id="work" className="py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-20">
            <h2 className="text-6xl md:text-7xl font-thin">FEATURED<br />WORK</h2>
            <a 
              href="#" 
              className="text-sm tracking-wider hover:opacity-60 transition-opacity"
              onMouseEnter={() => setIsHovering(true)} 
              onMouseLeave={() => setIsHovering(false)}
            >
              VIEW ALL PROJECTS →
            </a>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <div 
                key={idx}
                className="group relative"
                onMouseEnter={() => { setActiveProject(idx); setIsHovering(true); }}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="aspect-[4/3] bg-white/5 rounded-lg overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-20 h-20 border border-white rounded-full flex items-center justify-center">
                      <ArrowUpRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-light">{project.title}</h3>
                    <span className="text-sm text-white/50">{project.year}</span>
                  </div>
                  <p className="text-sm text-white/50 tracking-wider">{project.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 px-8 md:px-16 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-thin mb-20">PROCESS</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {['Discover', 'Define', 'Design', 'Deliver'].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="mb-6">
                  <svg className="w-24 h-24 mx-auto" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="none" 
                      stroke="white" 
                      strokeWidth="0.5"
                      strokeDasharray={`${(idx + 1) * 25} 1000`}
                      className="animate-spin-slow"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-light tracking-wider mb-2">{step}</h3>
                <p className="text-sm text-white/50">Lorem ipsum dolor sit amet consectetur.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-6xl md:text-7xl font-thin mb-8">LET'S<br />CREATE</h2>
              <p className="text-lg font-light text-white/70 mb-12">
                Ready to transform your vision into reality? 
                We're always excited to collaborate on new challenges.
              </p>
              
              <div className="space-y-6">
                <a 
                  href="mailto:hello@infinitix.studio" 
                  className="block text-2xl font-light hover:opacity-60 transition-opacity"
                  onMouseEnter={() => setIsHovering(true)} 
                  onMouseLeave={() => setIsHovering(false)}
                >
                  hello@infinitix.studio
                </a>
                <a 
                  href="tel:+14155551234" 
                  className="block text-2xl font-light hover:opacity-60 transition-opacity"
                  onMouseEnter={() => setIsHovering(true)} 
                  onMouseLeave={() => setIsHovering(false)}
                >
                  +1 415 555 1234
                </a>
              </div>
              
              <div className="flex gap-8 mt-12">
                <a href="#" className="text-sm tracking-wider hover:opacity-60 transition-opacity">INSTAGRAM</a>
                <a href="#" className="text-sm tracking-wider hover:opacity-60 transition-opacity">BEHANCE</a>
                <a href="#" className="text-sm tracking-wider hover:opacity-60 transition-opacity">DRIBBBLE</a>
              </div>
            </div>
            
            <div className="flex items-end">
              <div className="w-full">
                <div className="space-y-8">
                  <input 
                    type="text" 
                    placeholder="NAME" 
                    className="w-full bg-transparent border-b border-white/20 pb-4 focus:outline-none focus:border-white transition-colors placeholder:text-white/30"
                  />
                  <input 
                    type="email" 
                    placeholder="EMAIL" 
                    className="w-full bg-transparent border-b border-white/20 pb-4 focus:outline-none focus:border-white transition-colors placeholder:text-white/30"
                  />
                  <textarea 
                    placeholder="MESSAGE" 
                    rows="4" 
                    className="w-full bg-transparent border-b border-white/20 pb-4 focus:outline-none focus:border-white transition-colors resize-none placeholder:text-white/30"
                  ></textarea>
                  <button 
                    className="group flex items-center gap-4 mt-8"
                    onMouseEnter={() => setIsHovering(true)} 
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <span className="text-sm tracking-wider">SEND MESSAGE</span>
                    <div className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center group-hover:border-white transition-colors">
                      <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-8 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/50">© 2025 INFINITIX CREATIVE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">PRIVACY</a>
            <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">TERMS</a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(200%); }
        }
        
        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
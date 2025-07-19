import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, Sparkles, Zap, Target, Palette, Code, Megaphone, Play, ChevronDown, Star, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { icon: <Code className="w-8 h-8" />, title: "Web Development", desc: "Cutting-edge websites that captivate and convert", color: "from-blue-500 to-cyan-500" },
    { icon: <Megaphone className="w-8 h-8" />, title: "Digital Marketing", desc: "Strategic campaigns that amplify your brand's voice", color: "from-purple-500 to-pink-500" },
    { icon: <Palette className="w-8 h-8" />, title: "UI/UX Design", desc: "Intuitive interfaces that users fall in love with", color: "from-orange-500 to-red-500" },
    { icon: <Sparkles className="w-8 h-8" />, title: "Creative Content", desc: "Stories that resonate and inspire action", color: "from-green-500 to-teal-500" },
    { icon: <Play className="w-8 h-8" />, title: "Video & Animation", desc: "Dynamic visuals that bring ideas to life", color: "from-indigo-500 to-purple-500" },
    { icon: <Zap className="w-8 h-8" />, title: "Branding", desc: "Distinctive identities that stand out", color: "from-pink-500 to-rose-500" }
  ];

  const testimonials = [
    { name: "Sarah Chen", role: "CEO, TechStart", text: "Infinitix transformed our digital presence. Their creativity and technical expertise are unmatched.", rating: 5 },
    { name: "Marcus Rodriguez", role: "Marketing Director, Bloom Co", text: "Working with Infinitix was a game-changer. They delivered beyond our expectations.", rating: 5 },
    { name: "Emily Watson", role: "Founder, Artisan Studios", text: "The team's dedication to perfection and innovative approach sets them apart.", rating: 5 }
  ];

  const faqs = [
    { q: "What makes Infinitix different from other agencies?", a: "We blend cutting-edge technology with boundless creativity, delivering solutions that are both beautiful and functional." },
    { q: "How long does a typical project take?", a: "Project timelines vary based on scope, but we typically deliver within 4-12 weeks while maintaining our high standards." },
    { q: "Do you work with small businesses?", a: "Absolutely! We love helping businesses of all sizes achieve their digital dreams." },
    { q: "What's your design process like?", a: "We follow a collaborative approach: Discovery → Strategy → Design → Development → Launch → Growth." }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : ''}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold">Infinitix</span>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <a href="#" className="hover:text-purple-400 transition-colors">Home</a>
              <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
              <a href="#services" className="hover:text-purple-400 transition-colors">Services</a>
              <a href="#work" className="hover:text-purple-400 transition-colors">Work</a>
              <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105">
                Start Project
              </button>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6">
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-white/20">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm">Welcome to the Future of Design</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Where Creativity
            </span>
            <br />
            <span className="text-white">Meets Innovation</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            We craft digital experiences that captivate, engage, and inspire. Your vision, our expertise, infinite possibilities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-white/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all backdrop-blur-sm">
              View Our Work
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/50" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 relative">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                We're Not Just Another
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Design Studio</span>
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                At Infinitix, we believe in pushing boundaries and challenging conventions. Our team of creative rebels and tech wizards work tirelessly to transform your boldest ideas into digital masterpieces.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-1">Strategy-Driven Design</h3>
                    <p className="text-gray-400">Every pixel has a purpose, every interaction tells a story.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-1">Lightning-Fast Delivery</h3>
                    <p className="text-gray-400">Great design shouldn't keep you waiting. We deliver excellence, fast.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-30"></div>
              <div className="relative bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-3xl p-8 backdrop-blur-xl border border-white/10">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <h3 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">150+</h3>
                    <p className="text-gray-300 mt-2">Projects Delivered</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">50+</h3>
                    <p className="text-gray-300 mt-2">Happy Clients</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">5★</h3>
                    <p className="text-gray-300 mt-2">Average Rating</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">24/7</h3>
                    <p className="text-gray-300 mt-2">Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Services That
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Elevate</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              From concept to launch, we offer a complete suite of creative services designed to make your brand unstoppable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <div key={idx} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl -z-10 ${service.color}`}></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all duration-300 h-full">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-6`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-400 mb-4">{service.desc}</p>
                  <a href="#" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                    Learn more <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-3xl p-12 backdrop-blur-xl border border-white/10">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              Why Brands Choose
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Infinitix</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-10 h-10 text-purple-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Creative Excellence</h3>
                <p className="text-gray-400">Award-winning designs that capture attention and drive results.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-10 h-10 text-pink-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Agile Process</h3>
                <p className="text-gray-400">Fast, flexible, and focused on delivering value at every stage.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Results-Driven</h3>
                <p className="text-gray-400">Data-informed strategies that deliver measurable business impact.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Logos */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <p className="text-center text-gray-400 mb-8">Trusted by Industry Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-32 h-12 bg-white/10 rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            What Our
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Clients Say</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Our Creative
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Process</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {['Discover', 'Design', 'Develop', 'Deliver'].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step}</h3>
                <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold">
              Latest
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Insights</span>
            </h2>
            <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2">
              View all posts <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <article key={i} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <div className="h-48 bg-gradient-to-br from-purple-600 to-pink-600"></div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ArrowUpRight className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                  The Future of Web Design in 2025
                </h3>
                <p className="text-gray-400">Exploring emerging trends and technologies shaping digital experiences.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Form */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                Let's Create Something
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400"> Amazing Together</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mt-10">
                <input type="text" placeholder="Your Name" className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-6 py-4 focus:outline-none focus:border-white/50 transition-colors" />
                <input type="email" placeholder="Your Email" className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-6 py-4 focus:outline-none focus:border-white/50 transition-colors" />
                <textarea placeholder="Tell us about your project" rows={4} className="md:col-span-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-6 py-4 focus:outline-none focus:border-white/50 transition-colors resize-none"></textarea>
                <button className="md:col-span-2 bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-4 rounded-lg font-semibold hover:shadow-2xl hover:shadow-orange-500/50 transition-all transform hover:scale-105">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Frequently Asked
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Questions</span>
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === idx ? -1 : idx)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${activeAccordion === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeAccordion === idx && (
                  <div className="px-8 pb-6">
                    <p className="text-gray-400">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-xl border-t border-white/10 py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold">Infinitix</span>
              </div>
              <p className="text-gray-400">Crafting digital experiences that inspire and transform.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">About Us</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Services</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Portfolio</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact</a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Web Development</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">UI/UX Design</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Digital Marketing</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Branding</a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Get in Touch</h3>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> hello@infinitix.com</p>
                <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> +1 (555) 123-4567</p>
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> San Francisco, CA</p>
              </div>
              <div className="flex gap-4 mt-4">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Infinitix Creative. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
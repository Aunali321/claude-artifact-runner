import type { NextPage } from 'next';
import { useEffect, useRef, useState, useCallback } from 'react';

// Types
interface Service {
    id: string;
    title: string;
    short: string;
    details: string;
}
interface Metric {
    id: string;
    label: string;
    value: number;
    suffix?: string;
    description: string;
}
interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    quote: string;
}
interface BlogPost {
    id: string;
    title: string;
    category: string;
    date: string;
    excerpt: string;
}
interface FAQItem {
    id: string;
    q: string;
    a: string;
}

// Data
const services: Service[] = [
    { id: 'brand', title: 'Brand Architecture', short: 'Strategic narrative & scalable identity systems.', details: 'We craft enduring narrative platforms, modular identity components, typographic hierarchies, tonal frameworks and deployment guidelines engineered for multi-channel consistency.' },
    { id: 'product', title: 'Product Experience', short: 'Human-centered UX & interface craft.', details: 'Discovery, flows, interaction models, information architecture, wireframes, prototyping and high-fidelity interface systems aligning intent with measurable activation & retention outcomes.' },
    { id: 'systems', title: 'Design Systems', short: 'Governed, extensible component libraries.', details: 'Token architecture, semantic layering, accessibility standards, composable components, documentation patterns, contribution workflows and adoption enablement.' },
    { id: 'web', title: 'Web Presence', short: 'High-performance, expressive front-ends.', details: 'Experience architecture, progressive enhancement, performance optimization, accessibility conformance, SEO foundations, analytics instrumentation & maintainable code structure.' },
    { id: 'visual', title: 'Visual Direction', short: 'Art direction & motion thinking.', details: 'Mood exploration, palette evolution, typographic selection, compositional systems, motion principles, asset guidance and immersive experiential punctuation.' },
    { id: 'advisory', title: 'Creative Advisory', short: 'Fractional design leadership & ops.', details: 'Org maturity assessment, capability roadmapping, process refinement, talent augmentation, design quality governance and strategic prioritization partnership.' },
];

const metrics: Metric[] = [
    { id: 'proj', label: 'Projects', value: 340, description: 'Multi-disciplinary deliveries', },
    { id: 'sat', label: 'Satisfaction', value: 98, suffix: '%', description: 'Average client rating', },
    { id: 'roi', label: 'Avg ROI Lift', value: 230, suffix: '%', description: 'Post-engagement uplift', },
    { id: 'exp', label: 'Years Combined', value: 65, description: 'Senior team experience', },
];

const testimonials: Testimonial[] = [
    { id: 't1', name: 'Amelia Rivers', role: 'VP Product', company: 'NovaTech', quote: 'Their restraint, precision, and strategic acuity reshaped our product story—adoption metrics accelerated with clarity.' },
    { id: 't2', name: 'Marcus Lee', role: 'Founder', company: 'Orbit Labs', quote: 'A studio that thinks in systems, not just screens. They embedded seamlessly, elevating internal design maturity.' },
    { id: 't3', name: 'Sophia Turner', role: 'Marketing Director', company: 'BlueWave', quote: 'Elegant brand system governance plus accessible implementation playbooks—execution velocity multiplied.' },
];

const processSteps = [
    { id: 1, title: 'Discover', desc: 'Context immersion, audience mapping, success definition.' },
    { id: 2, title: 'Frame', desc: 'Strategic platforms, information architecture, prioritization.' },
    { id: 3, title: 'Design', desc: 'Exploration, iteration, prototypes, validation loops.' },
    { id: 4, title: 'Build', desc: 'Components, performance, accessibility, integration.' },
    { id: 5, title: 'Evolve', desc: 'Measurement, optimization, governance, scaling.' },
];

const blogPosts: BlogPost[] = [
    { id: 'b1', title: 'System Thinking vs. Component Sprawl', category: 'Systems', date: '2024-05-10', excerpt: 'A lens for governing evolution without regressions.' },
    { id: 'b2', title: 'Strategic UX Metrics That Matter', category: 'Strategy', date: '2024-05-02', excerpt: 'Aligning instrumentation with design intent.' },
    { id: 'b3', title: 'Crafting Accessible Motion Language', category: 'UX', date: '2024-04-14', excerpt: 'Principles for inclusive, meaningful motion.' },
];

const faqs: FAQItem[] = [
    { id: 'f1', q: 'How do engagements start?', a: 'We begin with a focused discovery intensive aligning strategic objectives, constraints, audiences and measurable success signals.' },
    { id: 'f2', q: 'Do you build design systems?', a: 'Yes—token architecture, semantic layer, component libraries, contribution workflows, documentation and adoption enablement.' },
    { id: 'f3', q: 'Industry focus?', a: 'We operate cross-industry (SaaS, fintech, health, climate, enterprise platforms) applying transferable system insights.' },
    { id: 'f4', q: 'Retainer / advisory?', a: 'Flexible retainers for iterative design velocity, embedded leadership, governance and outcomes tracking.' },
    { id: 'f5', q: 'Measuring success?', a: 'Joint KPI definition (activation, retention, NPS, brand lift, conversion) with instrumentation loops for learning.' },
];

// Hooks
const usePrefersReducedMotion = () => {
    const [prefers, setPrefers] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => setPrefers(mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);
    return prefers;
};

const useScrollReveal = (options?: IntersectionObserverInit) => {
    const ref = useRef<HTMLElement | null>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    setVisible(true);
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.2, ...options });
        obs.observe(el);
        return () => obs.disconnect();
    }, [options]);
    return { ref, visible };
};

const useCountUp = (trigger: boolean, target: number, duration = 1200) => {
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (!trigger) return;
        let raf: number;
        const start = performance.now();
        const step = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(target * eased));
            if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [trigger, target, duration]);
    return val;
};

// Icons (inline for minimal aesthetic)
const IconArrow = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 5l7 7-7 7" /></svg>
);
const IconMenu = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
);
const IconClose = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18" /><path d="M6 6l12 12" /></svg>
);
const IconSun = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
);
const IconMoon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
);

// Main Component
const HomePage: NextPage = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [dark, setDark] = useState(true);
    const [activeService, setActiveService] = useState<Service>(services[0]);
    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [blogFilter, setBlogFilter] = useState('All');
    const [heroReady, setHeroReady] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', project: '', message: '' });
    const [formErrors, setFormErrors] = useState<{ [k: string]: string }>({});
    const [formSent, setFormSent] = useState(false);
    const [faqOpen, setFaqOpen] = useState<string | null>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    // Scroll state for nav background
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Hero staged entrance
    useEffect(() => {
        const t = setTimeout(() => setHeroReady(true), 100);
        return () => clearTimeout(t);
    }, []);

    // Testimonial auto advance
    useEffect(() => {
        if (paused) return;
        const id = setInterval(() => setTestimonialIndex(i => (i + 1) % testimonials.length), 7000);
        return () => clearInterval(id);
    }, [paused]);

    // Keyboard navigation for testimonials
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') setTestimonialIndex(i => (i + 1) % testimonials.length);
            if (e.key === 'ArrowLeft') setTestimonialIndex(i => (i - 1 + testimonials.length) % testimonials.length);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    // Cursor micro-interaction
    const cursorRef = useRef<HTMLDivElement | null>(null);
    const cursorScaleRef = useRef(1);
    const targetScaleRef = useRef(1);
    const posRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        if (prefersReducedMotion) return;
        const move = (e: MouseEvent) => {
            posRef.current.x = e.clientX;
            posRef.current.y = e.clientY;
        };
        const interactiveSelector = 'a, button, [role="button"], .service-card, .reveal-card';
        const enter = () => { targetScaleRef.current = 2; };
        const leave = () => { targetScaleRef.current = 1; };
        document.addEventListener('mousemove', move);
        document.querySelectorAll(interactiveSelector).forEach(el => {
            el.addEventListener('mouseenter', enter);
            el.addEventListener('mouseleave', leave);
        });
        const tick = () => {
            const el = cursorRef.current; if (!el) return;
            cursorScaleRef.current += (targetScaleRef.current - cursorScaleRef.current) * 0.15;
            el.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px,0) scale(${cursorScaleRef.current})`;
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => {
            document.removeEventListener('mousemove', move);
            document.querySelectorAll(interactiveSelector).forEach(el => {
                el.removeEventListener('mouseenter', enter);
                el.removeEventListener('mouseleave', leave);
            });
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [prefersReducedMotion]);

    // Form
    const validateForm = () => {
        const errs: { [k: string]: string } = {};
        if (!formData.name.trim()) errs.name = 'Required';
        if (!formData.email.trim()) errs.email = 'Required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid';
        if (!formData.project.trim()) errs.project = 'Required';
        if (!formData.message.trim()) errs.message = 'Required';
        setFormErrors(errs);
        return Object.keys(errs).length === 0;
    };
    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setFormSent(true);
        setTimeout(() => {
            setFormSent(false);
            setFormData({ name: '', email: '', project: '', message: '' });
        }, 2500);
    };

    const currentTestimonial = testimonials[testimonialIndex];

    const blogCategories = ['All', ...Array.from(new Set(blogPosts.map(p => p.category)))];
    const filteredPosts = blogPosts.filter(p => blogFilter === 'All' || p.category === blogFilter);

    // Section reveal hooks
    const aboutReveal = useScrollReveal();
    const servicesReveal = useScrollReveal();
    const metricsReveal = useScrollReveal();
    const clientsReveal = useScrollReveal();
    const testiReveal = useScrollReveal();
    const processReveal = useScrollReveal();
    const blogReveal = useScrollReveal();
    const ctaReveal = useScrollReveal();
    const faqReveal = useScrollReveal();

    // Metrics count-ups
    const metricValues = metrics.map(m => useCountUp(metricsReveal.visible, m.value));

    const toggleFAQ = (id: string) => setFaqOpen(prev => prev === id ? null : id);

    const navLinks = [
        { id: 'about', label: 'About' },
        { id: 'services', label: 'Services' },
        { id: 'why', label: 'Why Us' },
        { id: 'clients', label: 'Clients' },
        { id: 'testimonials', label: 'Testimonials' },
        { id: 'process', label: 'Process' },
        { id: 'blog', label: 'Blog' },
        { id: 'contact', label: 'Contact' },
        { id: 'faq', label: 'FAQ' },
    ];

    return (
        <div className={`${dark ? 'dark' : ''}`}>
            <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
                {/* Background Grid & subtle layers */}
                <div className="pointer-events-none fixed inset-0 bg-grid-dark opacity-40" />
                <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950" />

                {/* Custom Cursor */}
                {!prefersReducedMotion && (
                    <div ref={cursorRef} className="fixed z-50 top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-indigo-400/60 bg-indigo-400/10 backdrop-blur-sm pointer-events-none transition-colors duration-300" />
                )}

                <a href="#hero" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-slate-800 focus:rounded-md">Skip to content</a>

                {/* NAV */}
                <header className={`fixed top-0 inset-x-0 z-40 transition-colors ${scrolled ? 'bg-slate-900/70 backdrop-blur border-b border-slate-700/50' : 'bg-transparent'} `}>
                    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 flex items-center justify-center rounded-md bg-slate-800 border border-slate-700 font-semibold tracking-tight">IC</div>
                            <span className="font-medium text-sm tracking-wide text-slate-300">Infinitix Creative</span>
                        </div>
                        <nav className="hidden md:flex items-center gap-2 text-sm">
                            {navLinks.map(l => (
                                <a key={l.id} href={`#${l.id}`} className="px-3 py-2 rounded-md hover:bg-white/5 text-slate-300 hover:text-white transition-colors" data-cursor="scale">{l.label}</a>
                            ))}
                        </nav>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setDark(d => !d)} aria-label="Toggle theme" className="p-2 rounded-md bg-white/5 border border-slate-700 hover:bg-white/10 transition" data-cursor="scale">{dark ? <IconSun /> : <IconMoon />}</button>
                            <button onClick={() => setNavOpen(o => !o)} className="md:hidden p-2 rounded-md bg-white/5 border border-slate-700 hover:bg-white/10" aria-label="Toggle navigation" data-cursor="scale">{navOpen ? <IconClose /> : <IconMenu />}</button>
                        </div>
                    </div>
                    {navOpen && (
                        <div className="md:hidden border-t border-slate-700/50 bg-slate-900/80 backdrop-blur">
                            <div className="px-6 py-4 flex flex-col gap-1 text-sm">
                                {navLinks.map(l => (
                                    <a key={l.id} href={`#${l.id}`} onClick={() => setNavOpen(false)} className="px-3 py-2 rounded-md hover:bg-white/5 text-slate-300 hover:text-white" data-cursor="scale">{l.label}</a>
                                ))}
                            </div>
                        </div>
                    )}
                </header>

                {/* HERO */}
                <section id="hero" className="relative pt-40 pb-32 px-6">
                    <div className="max-w-7xl mx-auto relative">
                        <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-700 to-transparent" />
                        <div className="flex flex-col lg:flex-row gap-20">
                            <div className="flex-1">
                                <div className="space-y-6">
                                    <div className="overflow-hidden">
                                        <h1 className={`font-semibold leading-tight tracking-tight text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-2xl`}>
                                            <span className={`block transition-all duration-700 ${heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Infinite Design.</span>
                                            <span className={`block transition-all delay-100 duration-700 ${heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Purposeful Impact.</span>
                                        </h1>
                                    </div>
                                    <p className={`max-w-xl text-base md:text-lg text-slate-400 transition-all duration-700 delay-200 ${heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>A studio shaping coherent brand and product systems where strategic clarity, accessible craft and measurable outcomes align.</p>
                                    <div className={`flex flex-wrap gap-4 transition-all duration-700 delay-300 ${heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                        <a href="#contact" className="group inline-flex items-center gap-2 px-6 py-3 rounded-md bg-white/10 hover:bg-white/15 border border-slate-700 text-sm font-medium tracking-wide" data-cursor="scale">Start a conversation <IconArrow /></a>
                                        <a href="#services" className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-slate-700 hover:bg-white/5 text-sm font-medium text-slate-300" data-cursor="scale">Explore services</a>
                                    </div>
                                    <div className="h-px w-48 bg-gradient-to-r from-slate-600 to-transparent" />
                                </div>
                            </div>
                            <div className="flex-1 flex items-start">
                                <div className="relative w-full max-w-md ml-auto">
                                    <div className="aspect-square rounded-2xl border border-slate-700 bg-white/5 backdrop-blur-sm p-6 flex flex-col justify-between">
                                        <div className="flex items-center gap-3 text-xs font-medium tracking-wide text-slate-400">
                                            <span className="px-2 py-1 rounded bg-white/5 border border-slate-700">Studio</span>
                                            <span className="px-2 py-1 rounded bg-white/5 border border-slate-700">Systems</span>
                                        </div>
                                        <div className="space-y-4">
                                            <p className="text-sm text-slate-400 leading-relaxed">We design for longevity. Systemic thinking & accessible execution create compounding value beyond launch.</p>
                                            <ul className="text-xs text-slate-500 space-y-1">
                                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Token-driven systems</li>
                                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Accessibility & inclusion</li>
                                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Performance-first engineering</li>
                                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Narrative coherence</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border border-slate-700 bg-white/5 backdrop-blur-sm flex items-center justify-center text-xs text-slate-400">Focus</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ABOUT */}
                <section id="about" ref={aboutReveal.ref} className="relative py-32 px-6">
                    <div className={`max-w-6xl mx-auto transition-all ${aboutReveal.visible || prefersReducedMotion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} duration-700`}>
                        <div className="grid md:grid-cols-2 gap-16 items-start">
                            <div className="space-y-6">
                                <h2 className="text-3xl md:text-4xl font-semibold leading-tight">Purposeful <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-300">Design Systems</span> & Strategic Craft.</h2>
                                <p className="text-slate-400 leading-relaxed">Infinitix Creative assembles strategists, designers and technologists who think in layers: narrative, interaction, system and measurement. We favor clarity over ornament—minimalism that still breathes warmth and nuance.</p>
                                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                                    {['Strategic rigor', 'System scalability', 'Accessible craft', 'Transparent partnership'].map(item => (
                                        <div key={item} className="rounded-lg border border-slate-700 bg-white/5 px-4 py-3 text-sm text-slate-300">{item}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="rounded-xl border border-slate-700 bg-white/5 backdrop-blur-sm p-6">
                                    <h3 className="text-sm font-medium tracking-wide text-slate-300 mb-3">Philosophy</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">Design capital compounds when systems reduce friction between idea and execution. We embed to accelerate learning loops, unify experience surfaces, and align metrics with intention.</p>
                                </div>
                                <div className="rounded-xl border border-slate-700 bg-white/5 backdrop-blur-sm p-6">
                                    <h3 className="text-sm font-medium tracking-wide text-slate-300 mb-3">Impact Lens</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">Outcome over output: adoption, activation, retention, conversion, satisfaction and brand lift. Every artifact is a hypothesis—instrumented, measured, iterated.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SERVICES */}
                <section id="services" ref={servicesReveal.ref} className="py-32 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-14 transition-all duration-700 ${servicesReveal.visible || prefersReducedMotion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <div className="max-w-xl space-y-4">
                                <h2 className="text-3xl md:text-4xl font-semibold">Services</h2>
                                <p className="text-slate-400 text-sm leading-relaxed">End‑to‑end capabilities bridging narrative, experience and scalable system implementation—engineered for durability.</p>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-500">
                                <span>Active:</span>
                                <span className="px-3 py-1 rounded-md bg-white/5 border border-slate-700 text-slate-300 font-medium">{activeService.title}</span>
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-3 gap-10">
                            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
                                {services.map(s => {
                                    const active = activeService.id === s.id;
                                    return (
                                        <button key={s.id} onClick={() => setActiveService(s)} className={`service-card group relative text-left rounded-xl border border-slate-700 bg-white/5 backdrop-blur-sm p-6 overflow-hidden transition-all ${active ? 'ring-1 ring-indigo-400/60' : 'hover:border-slate-600 hover:bg-white/10'} focus:outline-none focus:ring-2 focus:ring-indigo-400`} data-cursor="scale">
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-gradient-to-br from-indigo-400/10 to-transparent" />
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="font-medium tracking-wide text-slate-200">{s.title}</h3>
                                                <span className={`text-[10px] uppercase tracking-wider font-medium px-2 py-1 rounded border ${active ? 'border-indigo-400 text-indigo-300 bg-indigo-400/10' : 'border-slate-700 text-slate-500'}`}>{s.id}</span>
                                            </div>
                                            <p className="text-xs leading-relaxed text-slate-400">{s.short}</p>
                                            <div className={`mt-4 h-px w-full origin-left bg-gradient-to-r ${active ? 'from-indigo-400 to-transparent scale-x-100' : 'from-slate-600/60 to-transparent scale-x-0 group-hover:scale-x-100'} transition-transform`} />
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="rounded-2xl border border-slate-700 bg-white/5 backdrop-blur-sm p-8 flex flex-col justify-between min-h-full transition-all">
                                <div>
                                    <h3 className="text-sm font-medium tracking-wide text-slate-300 mb-4">Detail · {activeService.title}</h3>
                                    <p className="text-sm leading-relaxed text-slate-400 whitespace-pre-line">{activeService.details}</p>
                                </div>
                                <div className="mt-8 flex flex-wrap gap-2 text-[10px] font-medium tracking-wide text-slate-400">
                                    {['Discovery', 'Architecture', 'Execution', 'Iteration', 'Governance'].map(t => (
                                        <span key={t} className="px-2 py-1 rounded bg-white/5 border border-slate-700">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* WHY CHOOSE US / METRICS */}
                <section id="why" ref={metricsReveal.ref} className="py-32 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className={`mb-16 space-y-4 max-w-xl transition-all duration-700 ${metricsReveal.visible || prefersReducedMotion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <h2 className="text-3xl md:text-4xl font-semibold">Why Choose Us</h2>
                            <p className="text-slate-400 text-sm leading-relaxed">Strategic clarity, systemic scalability, measurable outcomes and craft that embraces both restraint and nuance.</p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {metrics.map((m, i) => {
                                const val = metricValues[i];
                                return (
                                    <div key={m.id} className={`reveal-card relative rounded-xl border border-slate-700 bg-white/5 backdrop-blur-sm p-6 flex flex-col gap-3 transition-all ${metricsReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} duration-700`} style={{ transitionDelay: `${i * 80}ms` }} data-cursor="scale">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs tracking-wide text-slate-400">{m.label}</span>
                                            <span className="w-2 h-2 rounded-full bg-indigo-400" />
                                        </div>
                                        <div className="text-3xl font-semibold tracking-tight text-slate-100">{val}{m.suffix || ''}</div>
                                        <p className="text-xs text-slate-500 leading-relaxed">{m.description}</p>
                                        <div className="mt-auto h-px w-full bg-slate-700 overflow-hidden">
                                            <div className="h-px bg-indigo-400 transition-all duration-700" style={{ width: metricsReveal.visible ? `${(val / m.value) * 100}%` : '0%' }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* CLIENT LOGOS */}
                <section id="clients" ref={clientsReveal.ref} className="py-28 px-6">
                    <div className="max-w-7xl mx-auto space-y-12">
                        <div className={`flex items-end justify-between flex-wrap gap-6 transition-all duration-700 ${clientsReveal.visible || prefersReducedMotion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <h2 className="text-2xl md:text-3xl font-semibold">Selected Collaborations</h2>
                            <p className="text-xs text-slate-500 max-w-sm">A representative segment of teams who trusted our process.</p>
                        </div>
                        <div className={`relative overflow-hidden group border border-slate-700 rounded-xl bg-white/5 backdrop-blur-sm ${clientsReveal.visible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>
                            <div className="marquee-track flex items-center gap-12 py-8 will-change-transform group-hover:[animation-play-state:paused]">
                                {Array.from({ length: 2 }).map((_, loop) => (
                                    <div key={loop} className="flex items-center gap-12">
                                        {['NovaTech', 'Orbit', 'BlueWave', 'Vertex', 'Lumen', 'Atlas', 'Pulse', 'Helix', 'Everon', 'Quantum', 'Cobalt', 'Nimbus'].map(c => (
                                            <div key={c} className="flex flex-col items-center gap-3 min-w-[6rem]" data-cursor="scale">
                                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                                                <span className="text-[10px] tracking-wide text-slate-500 uppercase">{c}</span>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* TESTIMONIALS */}
                <section id="testimonials" ref={testiReveal.ref} className="py-32 px-6">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-16 items-start">
                        <div className={`space-y-6 transition-all duration-700 ${testiReveal.visible || prefersReducedMotion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <h2 className="text-3xl md:text-4xl font-semibold">Testimonials</h2>
                            <p className="text-slate-400 text-sm leading-relaxed">Perspectives from partners on collaboration and impact.</p>
                            <div className="flex gap-3 text-xs">
                                <button onClick={() => setTestimonialIndex(i => (i - 1 + testimonials.length) % testimonials.length)} className="px-4 py-2 rounded-md bg-white/5 border border-slate-700 hover:bg-white/10" data-cursor="scale">Prev</button>
                                <button onClick={() => setTestimonialIndex(i => (i + 1) % testimonials.length)} className="px-4 py-2 rounded-md bg-white/10 border border-slate-700 hover:bg-white/15" data-cursor="scale">Next</button>
                            </div>
                            <div className="text-[10px] uppercase tracking-wider text-slate-500">Keyboard ← → enabled</div>
                        </div>
                        <div className="lg:col-span-2 relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
                            <div className="relative h-full min-h-[18rem]">
                                {testimonials.map((t, i) => {
                                    const active = i === testimonialIndex;
                                    return (
                                        <div key={t.id} className={`absolute inset-0 transition-opacity duration-700 ${active ? 'opacity-100 z-10' : 'opacity-0'} flex`} aria-hidden={!active}>
                                            <div className="rounded-2xl border border-slate-700 bg-white/5 backdrop-blur-sm p-10 flex flex-col justify-between w-full">
                                                <div className="flex items-center gap-4 mb-6">
                                                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                                                    <div>
                                                        <h3 className="font-medium tracking-wide text-slate-200">{t.name}</h3>
                                                        <p className="text-xs text-slate-500">{t.role} · {t.company}</p>
                                                    </div>
                                                </div>
                                                <p className="text-sm leading-relaxed text-slate-400 mb-6">{t.quote}</p>
                                                <div className="flex items-center justify-between text-xs text-slate-500">
                                                    <span>{testimonialIndex + 1} / {testimonials.length}</span>
                                                    <span className="px-2 py-1 rounded bg-white/5 border border-slate-700">Perspective</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* PROCESS */}
                <section id="process" ref={processReveal.ref} className="py-32 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className={`mb-20 max-w-xl space-y-4 transition-all duration-700 ${processReveal.visible || prefersReducedMotion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <h2 className="text-3xl md:text-4xl font-semibold">How It Works</h2>
                            <p className="text-slate-400 text-sm leading-relaxed">A resilient framework supporting exploration while preserving momentum and transparency.</p>
                        </div>
                        <div className="relative">
                            <div className="absolute left-3 md:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-slate-700 via-slate-700 to-transparent" />
                            <div className="space-y-10">
                                {processSteps.map((s, i) => (
                                    <div key={s.id} className={`relative pl-10 md:pl-14 transition-all duration-700 ${processReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${i * 80}ms` }}>
                                        <div className="absolute left-0 top-1 w-6 h-6 md:w-8 md:h-8 rounded-full border border-slate-700 bg-slate-900 flex items-center justify-center text-[10px] md:text-xs font-medium text-slate-300">{s.id}</div>
                                        <div className="rounded-xl border border-slate-700 bg-white/5 backdrop-blur-sm p-6 hover:border-slate-600 transition-colors" data-cursor="scale">
                                            <h3 className="font-medium tracking-wide mb-2 text-slate-200">{s.title}</h3>
                                            <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* BLOG */}
                <section id="blog" ref={blogReveal.ref} className="py-32 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16 transition-all duration-700 ${blogReveal.visible || prefersReducedMotion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <div className="space-y-4 max-w-xl">
                                <h2 className="text-3xl md:text-4xl font-semibold">Insights</h2>
                                <p className="text-slate-400 text-sm leading-relaxed">Exploring design systems, product strategy & accessible craft principles.</p>
                            </div>
                            <div className="flex gap-3 flex-wrap text-xs">
                                {blogCategories.map(cat => (
                                    <button key={cat} onClick={() => setBlogFilter(cat)} className={`px-3 py-1 rounded-md border text-slate-300 transition ${blogFilter === cat ? 'border-indigo-400 bg-indigo-400/10' : 'border-slate-700 bg-white/5 hover:bg-white/10'}`} data-cursor="scale">{cat}</button>
                                ))}
                            </div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-10">
                            {filteredPosts.map((p, i) => (
                                <article key={p.id} className={`relative rounded-2xl border border-slate-700 bg-white/5 backdrop-blur-sm p-7 flex flex-col gap-6 hover:border-slate-600 transition-colors ${blogReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} duration-700`} style={{ transitionDelay: `${i * 80}ms` }}>
                                    <div className="flex items-center justify-between text-[10px] tracking-wider uppercase text-slate-500">
                                        <span className="px-2 py-1 rounded bg-white/5 border border-slate-700 text-slate-400">{p.category}</span>
                                        <span>{new Date(p.date).toLocaleDateString()}</span>
                                    </div>
                                    <h3 className="font-medium leading-snug text-slate-200">{p.title}</h3>
                                    <p className="text-sm leading-relaxed text-slate-400 flex-1">{p.excerpt}</p>
                                    <button className="group inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-indigo-300" data-cursor="scale">Read <IconArrow /></button>
                                </article>
                            ))}
                            {filteredPosts.length === 0 && (
                                <div className="col-span-full text-sm text-slate-400">No posts in this category.</div>
                            )}
                        </div>
                    </div>
                </section>

                {/* CTA FORM */}
                <section id="contact" ref={ctaReveal.ref} className="py-32 px-6">
                    <div className="max-w-3xl mx-auto text-center mb-16 transition-all duration-700 ${ctaReveal.visible || prefersReducedMotion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}">
                        <h2 className="text-3xl md:text-4xl font-semibold mb-4">Let’s Collaborate</h2>
                        <p className="text-slate-400 text-sm leading-relaxed">Outline your initiative—we will shape a tailored approach & trajectory.</p>
                    </div>
                    <div className={`max-w-4xl mx-auto transition-all duration-700 ${ctaReveal.visible || prefersReducedMotion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <form onSubmit={submitForm} className="grid md:grid-cols-2 gap-8 rounded-2xl border border-slate-700 bg-white/5 backdrop-blur-sm p-10">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs tracking-wide uppercase text-slate-400">Name</label>
                                <input value={formData.name} onChange={e => setFormData(f => ({ ...f, name: e.target.value }))} className="px-4 py-3 rounded-md bg-slate-900/40 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm" />
                                {formErrors.name && <span className="text-xs text-red-400">{formErrors.name}</span>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs tracking-wide uppercase text-slate-400">Email</label>
                                <input value={formData.email} type="email" onChange={e => setFormData(f => ({ ...f, email: e.target.value }))} className="px-4 py-3 rounded-md bg-slate-900/40 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm" />
                                {formErrors.email && <span className="text-xs text-red-400">{formErrors.email}</span>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs tracking-wide uppercase text-slate-400">Project Type</label>
                                <select value={formData.project} onChange={e => setFormData(f => ({ ...f, project: e.target.value }))} className="px-4 py-3 rounded-md bg-slate-900/40 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm">
                                    <option value="">Select...</option>
                                    <option>Brand Architecture</option>
                                    <option>Product Experience</option>
                                    <option>Design System</option>
                                    <option>Web Presence</option>
                                    <option>Advisory</option>
                                </select>
                                {formErrors.project && <span className="text-xs text-red-400">{formErrors.project}</span>}
                            </div>
                            <div className="flex flex-col gap-2 md:row-span-2">
                                <label className="text-xs tracking-wide uppercase text-slate-400">Message</label>
                                <textarea value={formData.message} onChange={e => setFormData(f => ({ ...f, message: e.target.value }))} rows={8} className="px-4 py-3 rounded-md bg-slate-900/40 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm resize-none" placeholder="Goals, context, timeline..." />
                                {formErrors.message && <span className="text-xs text-red-400">{formErrors.message}</span>}
                            </div>
                            <div className="flex flex-col justify-between gap-6">
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <input type="checkbox" id="subscribe" className="rounded border-slate-600 bg-slate-900" />
                                    <label htmlFor="subscribe">Subscribe to occasional insights</label>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <button type="submit" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-indigo-500 hover:bg-indigo-400 text-sm font-medium text-white tracking-wide transition" data-cursor="scale">Send Inquiry <IconArrow /></button>
                                    {formSent && <div className="text-xs text-green-400 font-medium">Message sent. We will respond soon.</div>}
                                </div>
                            </div>
                        </form>
                    </div>
                </section>

                {/* FAQ */}
                <section id="faq" ref={faqReveal.ref} className="py-32 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className={`text-center mb-16 space-y-4 transition-all duration-700 ${faqReveal.visible || prefersReducedMotion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <h2 className="text-3xl md:text-4xl font-semibold">FAQ</h2>
                            <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">Clarity on our models, philosophy and operational cadence.</p>
                        </div>
                        <div className="space-y-4">
                            {faqs.map((f, i) => {
                                const open = faqOpen === f.id;
                                return (
                                    <div key={f.id} className={`rounded-xl border border-slate-700 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-500 ${faqReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${i * 70}ms` }}>
                                        <button onClick={() => toggleFAQ(f.id)} className="w-full flex items-center justify-between px-6 py-5 text-left text-sm font-medium tracking-wide text-slate-200 hover:bg-white/5" data-cursor="scale">
                                            <span>{f.q}</span>
                                            <span className={`text-xs px-2 py-1 rounded border ${open ? 'border-indigo-400 text-indigo-300' : 'border-slate-600 text-slate-500'}`}>{open ? '−' : '+'}</span>
                                        </button>
                                        {open && (
                                            <div className="px-6 pb-6 text-sm text-slate-400 leading-relaxed">{f.a}</div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="pt-24 pb-12 px-6 border-t border-slate-800">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
                        <div className="space-y-5 max-w-xs">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 flex items-center justify-center rounded-md bg-slate-800 border border-slate-700 font-semibold">IC</div>
                                <span className="text-sm font-medium tracking-wide text-slate-300">Infinitix Creative</span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">Strategic studio crafting scalable brand and product design systems with measurable impact.</p>
                            <div className="flex gap-2 text-xs">
                                {['Twitter', 'LinkedIn', 'Dribbble', 'GitHub'].map(s => (
                                    <a key={s} href="#" className="px-3 py-1 rounded-md bg-white/5 border border-slate-700 hover:bg-white/10 text-slate-300" data-cursor="scale">{s}</a>
                                ))}
                            </div>
                        </div>
                        <div className="text-sm space-y-4">
                            <h4 className="font-medium tracking-wide text-slate-200">Services</h4>
                            <ul className="space-y-2 text-slate-500">
                                {services.slice(0, 5).map(s => (
                                    <li key={s.id}><a href="#services" className="hover:text-slate-300" data-cursor="scale">{s.title}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div className="text-sm space-y-4">
                            <h4 className="font-medium tracking-wide text-slate-200">Navigate</h4>
                            <ul className="space-y-2 text-slate-500">
                                {navLinks.slice(0, 6).map(n => (
                                    <li key={n.id}><a href={`#${n.id}`} className="hover:text-slate-300" data-cursor="scale">{n.label}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div className="text-sm space-y-4">
                            <h4 className="font-medium tracking-wide text-slate-200">Newsletter</h4>
                            <p className="text-xs text-slate-500">Monthly synthesis of frameworks & system insights.</p>
                            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                                <input type="email" placeholder="you@company.com" className="w-full px-4 py-3 rounded-md bg-slate-900/40 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-xs" />
                                <button className="w-full px-4 py-3 rounded-md bg-white/10 border border-slate-700 hover:bg-white/15 text-xs font-medium" data-cursor="scale">Subscribe</button>
                            </form>
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto mt-16 pt-6 border-t border-slate-800 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-[10px] tracking-wide text-slate-500">
                        <p>© {new Date().getFullYear()} Infinitix Creative. All rights reserved.</p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-slate-300" data-cursor="scale">Privacy</a>
                            <a href="#" className="hover:text-slate-300" data-cursor="scale">Terms</a>
                            <a href="#" className="hover:text-slate-300" data-cursor="scale">Accessibility</a>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Global Styles for patterns and animations */}
            <style jsx global>{`
        .bg-grid-dark { background-image: radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px); background-size: 32px 32px; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-track { animation: marquee 30s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .marquee-track { animation-duration: 0.001s; } }
      `}</style>
        </div>
    );
};

export default HomePage;

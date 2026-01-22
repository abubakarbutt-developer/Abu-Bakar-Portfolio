import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Button from './ui/Button';
import CodingBackground from './CodingBackground';
import TypingAnimation from './TypingAnimation';
import StatsCards from './StatsCards';
import { FaGithub, FaLinkedin, FaRocket, FaUsers, FaCode, FaReact, FaNodeJs, FaDocker, FaGitAlt, FaBriefcase } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiGreensock, SiTailwindcss, SiMongodb, SiExpress, SiPostgresql, SiGraphql, SiRedux } from 'react-icons/si';
import { AiOutlineApi } from 'react-icons/ai';
import { VscChevronDown } from 'react-icons/vsc';

interface HeroProps {
    name: string;
    role: string;
    tagline: string;
    socials: { path: string; label: string }[];
}

const Hero: React.FC<HeroProps> = ({ name, role, tagline, socials }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const roleRef = useRef<HTMLHeadingElement>(null);

    // Tech stack for infinite slider
    const techStack = [
        { name: 'React', icon: <FaReact className="animate-icon-pulse" /> },
        { name: 'Next.js', icon: <SiNextdotjs className="animate-icon-pulse" /> },
        { name: 'TypeScript', icon: <SiTypescript className="animate-icon-pulse" /> },
        { name: 'Node.js', icon: <FaNodeJs className="animate-icon-pulse" /> },
        { name: 'GSAP', icon: <SiGreensock className="animate-icon-pulse" /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss className="animate-icon-pulse" /> },
        { name: 'MongoDB', icon: <SiMongodb className="animate-icon-pulse" /> },
        { name: 'Express', icon: <SiExpress className="animate-icon-pulse" /> },
        { name: 'PostgreSQL', icon: <SiPostgresql className="animate-icon-pulse" /> },
        { name: 'Docker', icon: <FaDocker className="animate-icon-pulse" /> },
        { name: 'Git', icon: <FaGitAlt className="animate-icon-pulse" /> },
        { name: 'GraphQL', icon: <SiGraphql className="animate-icon-pulse" /> },
        { name: 'Redux', icon: <SiRedux className="animate-icon-pulse" /> }
    ];

    // Typing animation phrases
    const typingPhrases = [
        'Building digital experiences...',
        'Crafting pixel-perfect interfaces...',
        'Turning ideas into reality...',
        'Creating seamless user journeys...',
    ];

    // Code snippets for floating animation
    const codeSnippets = [
        'const code = () => magic',
        'function build() { return awesome }',
        'npm run dev',
        'git commit -m "feat: amazing"',
        'const [state, setState]',
        'async/await',
        'useEffect(() => {})',
        'export default App'
    ];

    // Portfolio stats
    const stats = [
        { value: '50+', label: 'Projects Completed', icon: <FaRocket className="text-primary" /> },
        { value: '100+', label: 'Happy Clients', icon: <FaUsers className="text-accent" /> },
        { value: '3+', label: 'Years Experience', icon: <FaBriefcase className="text-emerald-400" /> },
    ];

    // Split text into characters for animation
    useEffect(() => {
        if (nameRef.current) {
            const text = nameRef.current.textContent || '';
            nameRef.current.innerHTML = text
                .split('')
                .map((char) => `<span class="char" style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`)
                .join('');
        }
        if (roleRef.current) {
            const text = roleRef.current.textContent || '';
            roleRef.current.innerHTML = text
                .split('')
                .map((char) => `<span class="char" style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`)
                .join('');
        }
    }, [name, role]);

    useGSAP(() => {
        const tl = gsap.timeline({ delay: 0.5 });

        // Video fade in
        tl.to('.hero-video-container', {
            opacity: 1,
            duration: 1.5,
            ease: 'power2.inOut',
        });

        // Greeting animation with glow effect
        tl.from('.hero-greeting', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
        });

        // Name character reveal with 3D effect
        tl.from(nameRef.current?.querySelectorAll('.char') || [], {
            y: 100,
            opacity: 0,
            rotationX: -90,
            transformOrigin: '50% 50% -50px',
            stagger: 0.03,
            duration: 0.8,
            ease: 'back.out(1.7)',
        }, '-=0.4');

        // Role character reveal with gradient
        tl.from(roleRef.current?.querySelectorAll('.char') || [], {
            y: 50,
            opacity: 0,
            scale: 0.5,
            stagger: 0.02,
            duration: 0.6,
            ease: 'power2.out',
        }, '-=0.5');

        // Tagline with clip-path reveal
        tl.from('.hero-tagline', {
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut',
        }, '-=0.3');

        // Tech slider entrance
        tl.from('.tech-slider', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
        }, '-=0.5');

        // Buttons with magnetic effect setup
        tl.from('.hero-btn-wrapper', {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            ease: 'back.out(2)',
        }, '-=0.5');

        // Social icons with bounce
        tl.from('.social-icon', {
            y: 20,
            opacity: 0,
            scale: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: 'back.out(2)',
        }, '-=0.3');

        // Floating code snippets animation
        gsap.utils.toArray('.code-snippet').forEach((snippet: any, i) => {
            gsap.to(snippet, {
                y: `random(-30, 30)`,
                x: `random(-20, 20)`,
                rotation: `random(-5, 5)`,
                duration: `random(3, 5)`,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: i * 0.2,
            });
        });

        // Parallax effect on mouse move
        const handleParallax = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const moveX = (clientX - centerX) / 50;
            const moveY = (clientY - centerY) / 50;

            gsap.to('.parallax-layer-1', {
                x: moveX,
                y: moveY,
                duration: 1,
                ease: 'power2.out',
            });

            gsap.to('.parallax-layer-2', {
                x: moveX * 1.5,
                y: moveY * 1.5,
                duration: 1.2,
                ease: 'power2.out',
            });
        };

        window.addEventListener('mousemove', handleParallax);

        return () => {
            window.removeEventListener('mousemove', handleParallax);
        };

    }, { scope: containerRef });

    // Magnetic button effect
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const buttons = e.currentTarget.querySelectorAll('.magnetic-btn');
        buttons.forEach((btn) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const distance = Math.sqrt(x * x + y * y);

            if (distance < 100) {
                gsap.to(btn, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            }
        });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const buttons = e.currentTarget.querySelectorAll('.magnetic-btn');
        gsap.to(buttons, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
        });
    };

    return (
        <section id="hero" ref={containerRef} className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden">
            {/* Animated Coding Background */}
            <div className="hero-video-container absolute inset-0 opacity-0">
                <CodingBackground />
                {/* Overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
                {/* Animated noise texture */}
                <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
                </div>
            </div>

            {/* Animated gradient orbs - Parallax Layer 1 */}
            <div className="parallax-layer-1 absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-[100px] animate-pulse" />
            <div className="parallax-layer-1 absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

            {/* Floating code snippets - Parallax Layer 2 */}
            {codeSnippets.map((snippet, i) => (
                <div
                    key={i}
                    className="code-snippet parallax-layer-2 absolute text-xs md:text-sm font-mono text-primary/10 dark:text-emerald-400/5 pointer-events-none select-none"
                    style={{
                        top: `${Math.random() * 80 + 10}%`,
                        left: `${Math.random() * 80 + 10}%`,
                    }}
                >
                    {snippet}
                </div>
            ))}

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 relative">
                <h2 className="hero-greeting text-lg md:text-2xl font-medium mb-2 md:mb-4 animate-rgb-text">
                    Hello, I'm
                </h2>

                <h1
                    ref={nameRef}
                    className="text-4xl sm:text-5xl md:text-8xl font-bold tracking-tight mb-4 md:mb-6 bg-gradient-to-r from-white via-emerald-100 to-cyan-200 bg-clip-text text-transparent drop-shadow-2xl perspective-1000 leading-tight"
                    style={{ textShadow: '0 0 80px rgba(16, 185, 129, 0.3)' }}
                >
                    {name}
                </h1>

                <h3
                    ref={roleRef}
                    className="text-xl sm:text-3xl md:text-5xl font-semibold bg-gradient-to-r from-primary via-cyan-400 to-indigo-400 bg-clip-text text-transparent mb-6 md:mb-8"
                >
                    {role}
                </h3>

                <p className="hero-tagline max-w-2xl mx-auto text-base md:text-xl text-slate-300 dark:text-slate-400 mb-4 md:mb-6 leading-relaxed font-light">
                    {tagline}
                </p>

                {/* Typing Animation */}
                <div className="mb-8 md:mb-10 text-lg md:text-2xl font-mono text-primary/80">
                    <TypingAnimation phrases={typingPhrases} />
                </div>

                {/* Infinite Tech Stack Slider */}
                <div className="tech-slider mb-8 md:mb-12 overflow-hidden relative">
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#050505] to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#050505] to-transparent z-10" />
                    <div className="flex gap-4 md:gap-6 animate-scroll whitespace-nowrap">
                        {[...techStack, ...techStack, ...techStack].map((tech, i) => (
                            <div
                                key={i}
                                className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-card-bg/20 border border-primary/20 rounded-full text-xs md:text-base font-medium text-primary backdrop-blur-sm hover:border-primary/40 transition-colors group"
                            >
                                <span className="mr-2 md:mr-3 text-lg md:text-xl group-hover:scale-125 transition-transform duration-300">{tech.icon}</span>
                                {tech.name}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats Cards */}
                <StatsCards stats={stats} />

                {/* CTA Buttons */}
                <div
                    className="hero-btn-wrapper flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-10"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="magnetic-btn">
                        <Button
                            size="lg"
                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                            className="relative overflow-hidden group"
                        >
                            <span className="relative z-10">View My Work</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Button>
                    </div>
                    <div className="magnetic-btn">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="border-blue-500/50 hover:border-blue-400 hover:bg-blue-500/10"
                        >
                            Let's Connect
                        </Button>
                    </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-6">
                    {socials.map((social) => (
                        <a
                            key={social.label}
                            href={social.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon text-secondary hover:text-primary transition-all duration-300 text-3xl hover:scale-125 hover:drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-float"
                            title={social.label}
                        >
                            {social.label.toLowerCase() === 'github' && <FaGithub />}
                            {social.label.toLowerCase() === 'linkedin' && <FaLinkedin />}
                        </a>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer flex flex-col items-center gap-2"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
                <span className="text-[10px] uppercase tracking-widest text-secondary font-medium">Scroll</span>
                <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-33.333%);
                    }
                }
                .animate-scroll {
                    animation: scroll 30s linear infinite;
                }
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default Hero;

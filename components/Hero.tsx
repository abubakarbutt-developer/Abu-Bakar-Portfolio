import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Button from './ui/Button';

interface HeroProps {
    name: string;
    role: string;
    tagline: string;
    socials: { path: string; label: string }[];
}

const Hero: React.FC<HeroProps> = ({ name, role, tagline, socials }) => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from('.hero-text', {
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: 'power4.out',
        })
            .from('.hero-btn', {
                scale: 0.8,
                opacity: 0,
                duration: 0.5,
                ease: 'back.out(1.7)',
            }, '-=0.5');
    }, { scope: containerRef });

    return (
        <section id="hero" ref={containerRef} className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] -z-10 animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                <h2 className="hero-text text-lg md:text-2xl font-medium text-blue-400 mb-2 md:mb-4">
                    Hello, I'm
                </h2>
                <h1 className="hero-text text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 md:mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                    {name}
                </h1>
                <h3 className="hero-text text-xl sm:text-2xl md:text-4xl font-semibold text-slate-700 dark:text-slate-300 mb-4 md:mb-6">
                    {role}
                </h3>
                <p className="hero-text max-w-2xl mx-auto text-base md:text-lg text-slate-600 dark:text-slate-400 mb-8 md:mb-10 leading-normal md:leading-relaxed">
                    {tagline}
                </p>

                <div className="hero-btn flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
                    <Button size="lg" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                        View Work
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                        Contact Me
                    </Button>
                </div>

                <div className="hero-text mt-8 md:mt-12 flex justify-center space-x-6">
                    {socials.map((social) => (
                        <a
                            key={social.label}
                            href={social.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors text-2xl"
                        >
                            {social.label}
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface AboutProps {
    title: string;
    description: string;
}

const About: React.FC<AboutProps> = ({ title, description }) => {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.from('.about-content', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom-=100',
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
        });
    }, { scope: containerRef });

    return (
        <section id="about" ref={containerRef} className="py-20 bg-slate-100/50 dark:bg-slate-800/20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center about-content">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">{title}</h2>
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                    {description}
                </p>
            </div>
        </section>
    );
};

export default About;

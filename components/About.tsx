import React, { useRef, useEffect } from 'react';
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
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);

    // Split text into words for animation
    useEffect(() => {
        if (descRef.current) {
            const text = descRef.current.textContent || '';
            descRef.current.innerHTML = text
                .split(' ')
                .map((word, i) => `<span class="word" style="display: inline-block; margin-right: 0.25em;">${word}</span>`)
                .join('');
        }
    }, [description]);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse',
            },
        });

        // Title animation with scale and rotation
        tl.from(titleRef.current, {
            scale: 0.5,
            opacity: 0,
            rotationY: 90,
            duration: 0.8,
            ease: 'back.out(1.7)',
        });

        // Word-by-word reveal
        tl.from('.word', {
            y: 20,
            opacity: 0,
            stagger: 0.03,
            duration: 0.5,
            ease: 'power2.out',
        }, '-=0.4');

        // Decorative elements float animation
        gsap.to('.float-element', {
            y: -20,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: 0.3,
        });

    }, { scope: containerRef });

    return (
        <section id="about" ref={containerRef} className="py-20 bg-background relative overflow-hidden">
            {/* Decorative floating elements */}
            <div className="float-element absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
            <div className="float-element absolute bottom-10 right-10 w-32 h-32 bg-accent/10 rounded-full blur-xl" />
            <div className="float-element absolute top-1/2 right-20 w-16 h-16 bg-primary/5 rounded-full blur-xl" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h2
                    ref={titleRef}
                    className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                >
                    {title}
                </h2>
                <p
                    ref={descRef}
                    className="text-lg text-secondary leading-relaxed"
                >
                    {description}
                </p>
            </div>
        </section>
    );
};

export default About;

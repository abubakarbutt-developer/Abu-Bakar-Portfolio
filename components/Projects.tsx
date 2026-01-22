import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Badge from './ui/Badge';
import Button from './ui/Button';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface Project {
    id: number;
    title: string;
    description: string;
    tech: string[];
    link: string;
    image?: string;
}

interface ProjectsProps {
    projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);

    useGSAP(() => {
        // Title animation
        gsap.from(titleRef.current, {
            scrollTrigger: {
                trigger: titleRef.current,
                start: 'top bottom-=100',
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
        });

        // Project cards with advanced animations
        const cards = gsap.utils.toArray('.project-card');

        cards.forEach((card: any, i) => {
            const image = card.querySelector('.project-image');
            const content = card.querySelector('.project-content');
            const badges = card.querySelectorAll('.project-badge');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse',
                },
            });

            // Card entrance with rotation
            tl.from(card, {
                y: 100,
                opacity: 0,
                rotationX: -15,
                duration: 0.8,
                ease: 'power3.out',
            });

            // Image reveal with clip-path
            tl.from(image, {
                clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
                duration: 1,
                ease: 'power2.inOut',
            }, '-=0.5');

            // Content fade in
            tl.from(content, {
                y: 30,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out',
            }, '-=0.6');

            // Badges stagger
            tl.from(badges, {
                scale: 0,
                opacity: 0,
                stagger: 0.05,
                duration: 0.4,
                ease: 'back.out(2)',
            }, '-=0.4');
        });

        // Parallax effect on scroll
        cards.forEach((card: any) => {
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
                y: -30,
                ease: 'none',
            });
        });

    }, { scope: containerRef });

    // 3D Tilt effect on hover
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardElement: HTMLDivElement) => {
        const rect = cardElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        gsap.to(cardElement, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.5,
            ease: 'power2.out',
            transformPerspective: 1000,
        });
    };

    const handleMouseLeave = (cardElement: HTMLDivElement) => {
        gsap.to(cardElement, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: 'power2.out',
        });
    };

    return (
        <section id="projects" ref={containerRef} className="py-20 bg-background relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-[150px] -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div ref={titleRef} className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="project-card glass-card rounded-xl overflow-hidden bg-card-bg border border-border-color shadow-lg"
                            style={{ transformStyle: 'preserve-3d' }}
                            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                        >
                            {/* Image with reveal animation */}
                            <div className="project-image aspect-video w-full relative bg-card-bg flex items-center justify-center text-secondary overflow-hidden">
                                {project.image ? (
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                ) : (
                                    <span>Project Image</span>
                                )}
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            <div className="project-content p-6">
                                <h3 className="text-xl font-bold mb-3 text-foreground">
                                    {project.title}
                                </h3>
                                <p className="text-secondary mb-6 text-sm leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map((t) => (
                                        <Badge key={t} variant="secondary" className="project-badge">
                                            {t}
                                        </Badge>
                                    ))}
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    fullWidth
                                    onClick={() => window.open(project.link, '_blank')}
                                >
                                    View Project
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;

import React, { useRef } from 'react';
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

    useGSAP(() => {
        const cards = gsap.utils.toArray('.project-card');

        cards.forEach((card: any, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse',
                },
                y: 50,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.1,
            });
        });
    }, { scope: containerRef });

    return (
        <section id="projects" ref={containerRef} className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                    <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div key={project.id} className="project-card glass-card rounded-xl overflow-hidden hover:transform hover:-translate-y-2 transition-transform duration-300 bg-white/5 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-700/50 shadow-sm dark:shadow-none">
                            {/* Image Placeholder */}
                            {/* Image Placeholder or Actual Image */}
                            <div className="aspect-video w-full relative bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center text-slate-400 dark:text-slate-500 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                {project.image ? (
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <span>Project Image</span>
                                )}
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-100">{project.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map((t) => (
                                        <Badge key={t} variant="secondary">{t}</Badge>
                                    ))}
                                </div>

                                <Button variant="outline" size="sm" fullWidth onClick={() => window.open(project.link, '_blank')}>
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

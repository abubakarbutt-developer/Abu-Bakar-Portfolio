import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { FaReact, FaNodeJs, FaPython, FaDocker, FaFigma, FaGitAlt } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiPostgresql, SiExpress, SiGreensock, SiNestjs, SiFramer } from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';
import { MdWaves } from 'react-icons/md';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface SkillCategory {
    category: string;
    items: { name: string; level: number }[];
}

interface SkillsProps {
    skills: SkillCategory[];
}

const getSkillIcon = (name: string) => {
    const iconClass = "text-primary animate-icon-pulse";
    switch (name.toLowerCase()) {
        case 'react': return <FaReact className="text-cyan-400 animate-icon-pulse" size={32} />;
        case 'next.js': return <SiNextdotjs className="animate-icon-pulse" size={32} />;
        case 'tailwind': return <SiTailwindcss className="text-teal-400 animate-icon-pulse" size={32} />;
        case 'gsap': return <SiGreensock className="text-emerald-500 animate-icon-pulse" size={32} />;
        case 'typescript': return <SiTypescript className="text-blue-500 animate-icon-pulse" size={32} />;
        case 'node.js': return <FaNodeJs className="text-emerald-600 animate-icon-pulse" size={32} />;
        case 'nestjs': return <SiNestjs className="text-red-500 animate-icon-pulse" size={32} />;
        case 'express': return <SiExpress className="animate-icon-pulse" size={32} />;
        case 'framer motion': return <SiFramer className="text-purple-500 animate-icon-pulse" size={32} />;
        case 'react lenis': return <MdWaves className="text-cyan-400 animate-icon-pulse" size={32} />;
        case 'python': return <FaPython className="text-yellow-400 animate-icon-pulse" size={32} />;
        case 'postgresql': return <SiPostgresql className="text-blue-400 animate-icon-pulse" size={32} />;
        case 'git': return <FaGitAlt className="text-orange-500 animate-icon-pulse" size={32} />;
        case 'docker': return <FaDocker className="text-blue-400 animate-icon-pulse" size={32} />;
        case 'figma': return <FaFigma className="text-pink-400 animate-icon-pulse" size={32} />;
        case 'vs code': return <VscCode className="text-blue-500 animate-icon-pulse" size={32} />;
        default: return <VscCode className="text-primary animate-icon-pulse" size={32} />;
    }
};

const Skills: React.FC<SkillsProps> = ({ skills }) => {
    const containerRef = useRef<HTMLElement>(null);
    const titleRef = useRef(null);

    useGSAP(() => {
        // Title animation
        gsap.from(titleRef.current, {
            scrollTrigger: {
                trigger: titleRef.current,
                start: 'top bottom-=100',
            },
            scale: 0.5,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(2)',
        });

        // Skill categories animation
        const categories = containerRef.current?.querySelectorAll('.skill-category');
        if (!categories) return;

        Array.from(categories).forEach((category: any, i) => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: category,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse',
                },
            });

            // Category card entrance
            tl.fromTo(category,
                { y: 80, opacity: 0, rotationX: -20 },
                { y: 0, opacity: 1, rotationX: 0, duration: 0.8, ease: 'power3.out' }
            );

            // Category title
            const title = category.querySelector('.category-title');
            tl.from(title, {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                ease: 'back.out(2)',
            }, '-=0.5');

            // Skill items stagger
            const skillItems = category.querySelectorAll('.skill-item');
            tl.from(skillItems, {
                scale: 0,
                opacity: 0,
                stagger: 0.08,
                duration: 0.5,
                ease: 'back.out(1.7)',
            }, '-=0.3');

            // Animate progress circles
            const progressCircles = category.querySelectorAll('.progress-circle');
            progressCircles.forEach((circle: any) => {
                const level = parseInt(circle.getAttribute('data-level') || '0');
                tl.from(circle, {
                    attr: { 'stroke-dasharray': '0, 100' },
                    duration: 1.5,
                    ease: 'power2.out',
                }, '-=0.8');
            });

            // Icon rotation on entrance
            const icons = category.querySelectorAll('.skill-icon');
            tl.from(icons, {
                rotation: -180,
                stagger: 0.05,
                duration: 0.6,
                ease: 'back.out(1.7)',
            }, '-=1.2');
        });

        // Ensure everything is calculated correctly after mounting
        ScrollTrigger.refresh();

    }, { scope: containerRef, dependencies: [skills] });

    // 3D Tilt effect for category cards
    const handleCategoryMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardElement: HTMLDivElement) => {
        const rect = cardElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        gsap.to(cardElement, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.3,
            ease: 'power2.out',
            transformPerspective: 1000,
        });
    };

    const handleCategoryMouseLeave = (cardElement: HTMLDivElement) => {
        gsap.to(cardElement, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
        });
    };

    // Magnetic effect for skill items
    const handleSkillMouseMove = (e: React.MouseEvent<HTMLDivElement>, skillElement: HTMLDivElement) => {
        const rect = skillElement.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(skillElement, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: 'power2.out',
        });

        // Rotate icon on hover
        const icon = skillElement.querySelector('.skill-icon');
        gsap.to(icon, {
            rotation: 360,
            duration: 0.6,
            ease: 'power2.out',
        });
    };

    const handleSkillMouseLeave = (skillElement: HTMLDivElement) => {
        gsap.to(skillElement, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
        });

        const icon = skillElement.querySelector('.skill-icon');
        gsap.to(icon, {
            rotation: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
        });
    };

    return (
        <section id="skills" ref={containerRef} className="py-20 bg-background relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-[150px] -z-10" />
            <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-gradient-to-br from-accent/5 to-primary/5 rounded-full blur-[150px] -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div ref={titleRef} className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skills.map((skillGroup, idx) => (
                        <div
                            key={idx}
                            className="skill-category glass p-6 rounded-2xl bg-card-bg border border-border-color flex flex-col items-center hover:shadow-xl dark:hover:shadow-primary/5 transition-all duration-300"
                            style={{ transformStyle: 'preserve-3d' }}
                            onMouseMove={(e) => handleCategoryMouseMove(e, e.currentTarget)}
                            onMouseLeave={(e) => handleCategoryMouseLeave(e.currentTarget)}
                        >
                            <h3 className="category-title text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent w-full text-center">
                                {skillGroup.category}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full">
                                {skillGroup.items.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="skill-item flex flex-col items-center gap-3 group cursor-pointer"
                                        onMouseMove={(e) => handleSkillMouseMove(e, e.currentTarget)}
                                        onMouseLeave={(e) => handleSkillMouseLeave(e.currentTarget)}
                                    >
                                        <div className="relative w-20 h-20 flex items-center justify-center">
                                            {/* Circular Progress Background */}
                                            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                                                <path
                                                    className="text-slate-200 dark:text-slate-800"
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.5"
                                                />
                                                <path
                                                    className="progress-circle text-primary drop-shadow-lg transition-all duration-1000 ease-out"
                                                    strokeDasharray={`${skill.level}, 100`}
                                                    data-level={skill.level}
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.5"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            {/* Icon */}
                                            <div className="skill-icon relative z-10 transition-transform duration-300 bg-background p-2 rounded-full shadow-sm">
                                                {getSkillIcon(skill.name)}
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 block">{skill.name}</span>
                                            <span className="text-xs text-slate-500 dark:text-slate-500">{skill.level}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;

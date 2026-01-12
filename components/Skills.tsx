import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useTheme } from '../hooks/useTheme';
import { FaReact, FaNodeJs, FaPython, FaDocker, FaFigma, FaGitAlt } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiPostgresql, SiExpress, SiGreensock } from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';

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
    switch (name.toLowerCase()) {
        case 'react': return <FaReact className="text-blue-400" size={32} />;
        case 'next.js': return <SiNextdotjs className="current-color" size={32} />;
        case 'tailwind': return <SiTailwindcss className="text-cyan-400" size={32} />;
        case 'gsap': return <SiGreensock className="text-green-500" size={32} />;
        case 'typescript': return <SiTypescript className="text-blue-600" size={32} />;
        case 'node.js': return <FaNodeJs className="text-green-500" size={32} />;
        case 'express': return <SiExpress className="current-color" size={32} />;
        case 'python': return <FaPython className="text-yellow-300" size={32} />;
        case 'postgresql': return <SiPostgresql className="text-blue-400" size={32} />;
        case 'git': return <FaGitAlt className="text-orange-500" size={32} />;
        case 'docker': return <FaDocker className="text-blue-500" size={32} />;
        case 'figma': return <FaFigma className="text-pink-500" size={32} />;
        case 'vs code': return <VscCode className="text-blue-400" size={32} />;
        default: return <VscCode size={32} />;
    }
};

const Skills: React.FC<SkillsProps> = ({ skills }) => {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.from('.skill-category', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom-=100',
            },
            y: 30,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
        });
    }, { scope: containerRef });

    return (
        <section id="skills" ref={containerRef} className="py-20 bg-slate-50/30 dark:bg-slate-900/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
                    <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skills.map((skillGroup, idx) => (
                        <div key={idx} className="skill-category glass p-6 rounded-2xl bg-white/5 dark:bg-slate-900/20 border border-slate-200/50 dark:border-slate-700/50 flex flex-col items-center hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-colors duration-300">
                            <h3 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 w-full text-center">
                                {skillGroup.category}
                            </h3>
                            <div className="grid grid-cols-2 gap-6 w-full">
                                {skillGroup.items.map((skill, index) => (
                                    <div key={index} className="flex flex-col items-center gap-3 group">
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
                                                    className="text-blue-500 drop-shadow-lg transition-all duration-1000 ease-out"
                                                    strokeDasharray={`${skill.level}, 100`}
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.5"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            {/* Icon */}
                                            <div className="relative z-10 transition-transform duration-300 group-hover:scale-110 bg-white dark:bg-slate-900 p-2 rounded-full shadow-sm">
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

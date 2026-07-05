import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FaChevronLeft, FaTimes, FaHome, FaUser, FaCode, FaBriefcase, FaEnvelope, FaBars } from 'react-icons/fa';

interface NavLink {
    name: string;
    href: string;
}

interface NavbarProps {
    links: NavLink[];
    isOpen?: boolean;
    setIsOpen?: (value: boolean) => void;
}

const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
        case 'home': return <FaHome size={20} />;
        case 'about': return <FaUser size={20} />;
        case 'skills': return <FaCode size={20} />;
        case 'projects': return <FaBriefcase size={20} />;
        case 'contact': return <FaEnvelope size={20} />;
        default: return <FaHome size={20} />;
    }
};

const Navbar: React.FC<NavbarProps> = ({ links, isOpen: externalIsOpen, setIsOpen: externalSetIsOpen }) => {
    const [internalIsOpen, setInternalIsOpen] = useState(false);

    // Use external state if provided, otherwise internal
    const isControlled = externalIsOpen !== undefined && externalSetIsOpen !== undefined;
    const isOpen = isControlled ? externalIsOpen : internalIsOpen;

    const handleSetIsOpen = (value: boolean) => {
        if (isControlled && externalSetIsOpen) {
            externalSetIsOpen(value);
        } else {
            setInternalIsOpen(value);
        }
    };

    const containerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const chevronRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Initial Highlight / Direction Hint - Only run once on mount
        const tl = gsap.timeline({ delay: 1 });
        tl.fromTo(sidebarRef.current,
            { x: 100, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 1, ease: 'elastic.out(1, 0.5)' }
        )
            .to(chevronRef.current, {
                x: -5,
                duration: 0.5,
                yoyo: true,
                repeat: 5,
                ease: 'power1.inOut'
            });
    }, []); // Empty dependency array ensures this runs only once

    useGSAP(() => {
        if (isOpen) {
            // Opening
            gsap.to(menuRef.current, {
                x: 0,
                duration: 0.5,
                ease: 'power3.out'
            });
            gsap.to(sidebarRef.current, {
                x: 200, // Move sidebar out completely
                autoAlpha: 0, // Hides visibility too
                duration: 0.3
            });
            gsap.fromTo('.nav-item-side',
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, stagger: 0.1, duration: 0.4, delay: 0.2 }
            );
        } else {
            // Closing
            gsap.to(menuRef.current, {
                x: '100%',
                duration: 0.5,
                ease: 'power3.in'
            });
            gsap.to(sidebarRef.current, {
                x: 0,
                autoAlpha: 1,
                duration: 0.3,
                delay: 0.2
            });
        }
    }, [isOpen]);

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-start md:items-center justify-end">
            {/* Mobile Hamburger Button */}
            <div className="pointer-events-auto md:hidden fixed top-6 right-6 z-50">
                <button
                    onClick={() => handleSetIsOpen(!isOpen)}
                    className="p-3 bg-card-bg backdrop-blur-xl border border-border-color rounded-full shadow-lg text-foreground hover:scale-110 transition-transform"
                >
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>
            {/* Collapsed Sidebar (Icons Only) - Samsung Edge Style */}
            <div
                ref={sidebarRef}
                className="hidden md:flex pointer-events-auto relative bg-card-bg backdrop-blur-xl border-y border-l border-border-color rounded-l-3xl shadow-2xl p-4 md:p-5 w-20 md:w-24 flex-col gap-8 items-center justify-center min-h-[50vh] md:min-h-[60vh] z-50 mr-0"
            >
                <div className="w-1.5 h-12 bg-primary/30 rounded-full mb-2 opacity-50" />

                {links.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="text-secondary hover:text-primary hover:scale-125 transition-all duration-200 relative group p-2"
                        title={link.name}
                    >
                        {getIcon(link.name)}
                        {/* Tooltip on hover */}
                        <span className="absolute right-full mr-6 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 transition-all duration-300 whitespace-nowrap pointer-events-none border border-white/10 shadow-xl">
                            {link.name}
                        </span>
                    </Link>
                ))}





                <button
                    onClick={() => handleSetIsOpen(true)}
                    className="mt-4 text-secondary hover:text-primary transition-colors p-2"
                >
                    <div ref={chevronRef}>
                        <FaChevronLeft size={24} />
                    </div>
                </button>
            </div >

            {/* Overlay */}
            {
                isOpen && (
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-auto transition-opacity duration-500"
                        onClick={() => handleSetIsOpen(false)}
                    />
                )
            }

            {/* Expanded Drawer (Text + Icons) */}
            <div
                ref={menuRef}
                className="pointer-events-auto absolute top-0 right-0 h-full w-full sm:w-80 glass border-l border-slate-200/30 dark:border-slate-700/30 transform translate-x-full shadow-2xl flex flex-col overflow-y-auto"
            >
                <button
                    onClick={() => handleSetIsOpen(false)}
                    className="hidden md:block absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                    <FaTimes size={24} />
                </button>



                <div className="px-8 space-y-8 mt-20">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-10 block">
                        Abu Bakar Butt
                    </h2>
                    <div className="flex flex-col space-y-6">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => handleSetIsOpen(false)}
                                className="nav-item-side text-2xl font-medium text-secondary hover:text-primary hover:translate-x-2 transition-all duration-300 flex items-center gap-4 group"
                            >
                                <span className="text-primary group-hover:scale-110 transition-transform">
                                    {getIcon(link.name)}
                                </span>
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="absolute bottom-8 left-0 w-full text-center text-slate-500 text-sm">
                    © 2026 Portfolio
                </div>
            </div>
        </div >
    );
};

export default Navbar;

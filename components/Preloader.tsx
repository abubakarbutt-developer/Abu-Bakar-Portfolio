import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface PreloaderProps {
    onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const [currentLog, setCurrentLog] = useState('Initializing system...');

    const logs = [
        'Establishing secure connection...',
        'Loading design tokens...',
        'Compiling professional assets...',
        'Optimizing user experience...',
        'Mounting React environment...',
        'Finalizing deployment...',
        'Ready for launch.'
    ];

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                setTimeout(onComplete, 500);
            }
        });

        // Main progress counter logic
        tl.to({}, {
            duration: 3,
            onUpdate: function () {
                const prog = Math.round(this.progress() * 100);
                setProgress(prog);

                // Update logs based on progress
                const logIndex = Math.floor(this.progress() * (logs.length - 1));
                setCurrentLog(logs[logIndex]);
            }
        });

        // Terminal text reveal
        tl.from('.terminal-line', {
            x: -20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power2.out'
        }, 0.2);

        // Progress bar expansion
        tl.fromTo('.progress-fill',
            { width: '0%' },
            { width: '100%', duration: 3, ease: 'none' },
            0
        );

        // Glitch effect on exit
        tl.to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: 'power4.inOut',
            delay: 0.2
        });

        // Reveal background scanline
        gsap.to('.scanline', {
            y: '100vh',
            duration: 2,
            repeat: -1,
            ease: 'none'
        });

    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-[#030303] flex flex-col items-center justify-center font-mono overflow-hidden"
        >
            {/* Background Scanning Effect */}
            <div className="scanline absolute top-0 left-0 w-full h-[2px] bg-primary/20 blur-sm pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle,rgba(16,185,129,0.2)_1px,transparent_1px)] bg-[size:30px_30px]" />

            <div className="w-full max-w-2xl px-8 relative z-10">
                {/* Header Section */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 text-primary mb-2 opacity-80">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs tracking-widest uppercase">System Core v4.0.2</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
                        ABU_BAKAR_BUTT<span className="text-primary animate-pulse">_</span>
                    </h1>
                </div>

                {/* Terminal Content */}
                <div className="bg-black/40 border border-white/5 p-6 rounded-lg backdrop-blur-md mb-8 relative group overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary/40" />

                    <div className="space-y-2 mb-8 h-20 overflow-hidden">
                        <div className="terminal-line text-emerald-400/90 text-sm">
                            <span className="text-white/30 mr-2">$</span> root@portfolio:~# <span className="text-white">init_deploy --force</span>
                        </div>
                        <div className="terminal-line text-emerald-400/90 text-sm flex items-center gap-2">
                            <span className="text-white/30 mr-2">$</span>
                            <span className="text-primary/80">{currentLog}</span>
                            <span className="w-1.5 h-3 bg-primary animate-pulse" />
                        </div>
                    </div>

                    {/* Tech Data Visual */}
                    <div className="flex justify-between items-end">
                        <div className="flex gap-2">
                            {[...Array(5)].map((_, i) => (
                                <div key={i}
                                    className="w-1 bg-primary/40"
                                    style={{
                                        height: `${Math.random() * 20 + 10}px`,
                                        animation: `icon-pulse 1.5s ease-in-out infinite ${i * 0.2}s`
                                    }}
                                />
                            ))}
                        </div>
                        <div className="text-right">
                            <div className="text-4xl md:text-6xl font-black text-white lining-nums">
                                {progress}<span className="text-primary text-2xl md:text-3xl">%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Progress Bar Container */}
                <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div className="progress-fill absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-accent to-primary bg-[size:200%_auto] animate-hue-shift" />
                </div>

                {/* Footer Insight */}
                <div className="mt-8 flex justify-between items-center opacity-40 text-[10px] tracking-widest uppercase">
                    <span>Precision Interface Engine</span>
                    <span>2026 Build_8821</span>
                </div>
            </div>

            <style jsx>{`
                @keyframes icon-pulse {
                    0%, 100% { height: 10px; opacity: 0.3; }
                    50% { height: 25px; opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default Preloader;

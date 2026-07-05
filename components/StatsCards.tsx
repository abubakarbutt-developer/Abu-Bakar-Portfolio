import React, { useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface Stat {
    value: string;
    label: string;
    icon: React.ReactNode;
}

interface StatsCardsProps {
    stats: Stat[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
    const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
    const containerRef = React.useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Animate cards entrance
        gsap.fromTo('.stat-card',
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.15,
                duration: 1,
                ease: 'power3.out',
                delay: 1,
            }
        );

        // Animate numbers counting up
        stats.forEach((stat, index) => {
            const targetValue = parseInt(stat.value.replace(/\D/g, ''));
            if (!isNaN(targetValue)) {
                gsap.to({}, {
                    duration: 2,
                    delay: 2 + index * 0.1,
                    onUpdate: function () {
                        const progress = this.progress();
                        setCounts(prev => {
                            const newCounts = [...prev];
                            newCounts[index] = Math.floor(targetValue * progress);
                            return newCounts;
                        });
                    }
                });
            }
        });
    }, { scope: containerRef, dependencies: [stats] });

    return (
        <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 w-full max-w-3xl mx-auto px-4">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="stat-card group relative overflow-hidden bg-gradient-to-br from-primary/10 to-indigo-500/10 backdrop-blur-sm border border-primary/20 rounded-2xl px-4 md:px-6 py-4 md:py-4 transition-all duration-300 hover:scale-105 animate-rgb-border flex justify-center"
                >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10 flex items-center gap-2 md:gap-3">
                        <span className="text-xl md:text-3xl animate-float">{stat.icon}</span>
                        <div>
                            <div className="text-xl md:text-3xl font-bold bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent">
                                {counts[index] > 0 ? counts[index] : stat.value.replace(/\d+/g, '')}
                                {stat.value.includes('+') && counts[index] > 0 ? '+' : ''}
                            </div>
                            <div className="text-[10px] md:text-sm text-secondary font-medium uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsCards;

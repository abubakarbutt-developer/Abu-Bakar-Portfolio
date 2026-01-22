import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'success';
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', className = '' }) => {
    const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300';

    const variants = {
        primary: 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 shadow-sm shadow-primary/10',
        secondary: 'bg-card-bg text-secondary border border-border-color hover:border-primary/40',
        outline: 'border border-border-color text-secondary hover:text-primary hover:border-primary bg-transparent',
        success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20',
    };

    return (
        <span className={`${baseStyles} ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;

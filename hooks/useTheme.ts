import { useEffect, useState } from 'react';

type Theme = 'dark';

export const useTheme = () => {
    // Force dark theme permanently
    const [theme] = useState<Theme>('dark');

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light');
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }, []);

    const toggleTheme = () => {
        // No-op to prevent accidental switching
        console.log("Theme is locked to dark mode.");
    };

    return { theme, toggleTheme };
};

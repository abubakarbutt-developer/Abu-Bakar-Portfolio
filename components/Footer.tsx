import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="py-8 border-t border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/50 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-slate-600 dark:text-slate-500">
                    © {new Date().getFullYear()} Abu Bakar Butt. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;

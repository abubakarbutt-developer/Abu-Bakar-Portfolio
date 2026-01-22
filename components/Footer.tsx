import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="py-8 border-t border-border-color bg-background transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-secondary">
                    © {new Date().getFullYear()} Abu Bakar Butt. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;

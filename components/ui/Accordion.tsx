import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface AccordionItemProps {
    title: string;
    content: string;
    isOpen: boolean;
    onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isOpen, onClick }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (isOpen) {
            gsap.to(contentRef.current, {
                height: 'auto',
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out',
            });
        } else {
            gsap.to(contentRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
            });
        }
    }, [isOpen]);

    return (
        <div className="border-b border-slate-200 dark:border-slate-800 last:border-0">
            <button
                className="w-full py-4 px-2 flex items-center justify-between text-left focus:outline-none group"
                onClick={onClick}
            >
                <span className={`text-lg font-medium transition-colors duration-200 ${isOpen ? 'text-blue-500 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300 group-hover:text-blue-500 dark:group-hover:text-white'}`}>
                    {title}
                </span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-400' : 'text-slate-500'}`}>
                    ▼
                </span>
            </button>
            <div
                ref={contentRef}
                className="overflow-hidden h-0 opacity-0 bg-slate-100 dark:bg-slate-900/30 rounded-lg mb-2"
                style={{ height: 0 }}
            >
                {content}
            </div>
        </div>
    );
};

interface AccordionProps {
    items: { title: string; content: string }[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleItemClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full max-w-2xl mx-auto border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 p-4">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    isOpen={openIndex === index}
                    onClick={() => handleItemClick(index)}
                />
            ))}
        </div>
    );
};

export default Accordion;

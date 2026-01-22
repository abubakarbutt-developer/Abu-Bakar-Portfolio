import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, error, className = '', id, ...props }) => {
    const inputId = id || props.name;

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={inputId} className="block text-sm font-medium text-secondary mb-1.5">
                    {label}
                </label>
            )}
            <textarea
                id={inputId}
                className={`w-full px-4 py-3 bg-card-bg border border-border-color rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder-secondary/50 outline-none transition-all duration-300 min-h-[120px] resize-y ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default Textarea;

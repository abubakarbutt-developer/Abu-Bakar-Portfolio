import React, { useEffect, useState } from 'react';

interface TypingAnimationProps {
    phrases: string[];
    className?: string;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ phrases, className = '' }) => {
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(100);

    useEffect(() => {
        const currentPhrase = phrases[currentPhraseIndex];

        const handleTyping = () => {
            if (!isDeleting) {
                // Typing
                if (currentText.length < currentPhrase.length) {
                    setCurrentText(currentPhrase.substring(0, currentText.length + 1));
                    setTypingSpeed(100);
                } else {
                    // Pause before deleting
                    setTimeout(() => setIsDeleting(true), 2000);
                    return;
                }
            } else {
                // Deleting
                if (currentText.length > 0) {
                    setCurrentText(currentPhrase.substring(0, currentText.length - 1));
                    setTypingSpeed(50);
                } else {
                    setIsDeleting(false);
                    setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
                }
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentPhraseIndex, phrases, typingSpeed]);

    return (
        <span className={className}>
            {currentText}
            <span className="animate-pulse text-blue-400">|</span>
        </span>
    );
};

export default TypingAnimation;

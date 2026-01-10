import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TypewriterEffectProps {
  words: string[];
  className?: string;
  cursorClassName?: string;
}

const TypewriterEffect = ({ words, className = '', cursorClassName = '' }: TypewriterEffectProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const fullText = words.join(' ');

  useEffect(() => {
    if (isComplete) return;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < fullText.length) {
          setDisplayedText(fullText.slice(0, displayedText.length + 1));
        } else {
          setIsComplete(true);
        }
      }
    }, 50);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, fullText, isComplete]);

  const renderWords = () => {
    const wordsArray = displayedText.split(' ');
    
    return wordsArray.map((word, idx) => (
      <motion.span
        key={idx}
        className="inline-block mr-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      >
        {word.split('').map((char, charIdx) => (
          <span
            key={charIdx}
            className={idx === 0 ? 'text-cyan text-glow-cyan' : ''}
          >
            {char}
          </span>
        ))}
      </motion.span>
    ));
  };

  return (
    <div className={`inline-flex items-center ${className}`}>
      <span className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide">
        {renderWords()}
      </span>
      <motion.span
        className={`inline-block w-[3px] h-12 md:h-14 lg:h-16 bg-cyan ml-1 ${cursorClassName}`}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </div>
  );
};

export default TypewriterEffect;

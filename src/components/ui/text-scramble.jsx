import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const defaultChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function TextScramble({
  children,
  duration = 0.8,
  speed = 0.03,
  characterSet = defaultChars,
  className = '',
  as: Component = 'span',
  trigger = true,
  onScrambleComplete,
  ...props
}) {
  const MotionComponent = motion.create(Component);
  const [displayText, setDisplayText] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const text = String(children);

  const scramble = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    const steps = duration / speed;
    let step = 0;

    const interval = setInterval(() => {
      let scrambled = '';
      const progress = step / steps;

      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ' || text[i] === '\n') {
          scrambled += text[i];
          continue;
        }

        if (progress * text.length > i) {
          scrambled += text[i];
        } else {
          scrambled +=
            characterSet[Math.floor(Math.random() * characterSet.length)];
        }
      }

      setDisplayText(scrambled);
      step++;

      if (step > steps) {
        clearInterval(interval);
        setDisplayText(text);
        setIsAnimating(false);
        onScrambleComplete?.();
      }
    }, speed * 1000);
  }, [children, duration, speed, characterSet, isAnimating, onScrambleComplete, text]);

  useEffect(() => {
    if (!trigger) return;
    scramble();
  }, [trigger]);

  return (
    <MotionComponent className={className} {...props}>
      {displayText}
    </MotionComponent>
  );
}

export function ScrambleButtonText({ text, speed = 0.02, duration = 0.5, className = "" }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      className={`inline-block ${className}`}
    >
      <TextScramble
        as="span"
        speed={speed}
        duration={duration}
        trigger={isHovered}
        onScrambleComplete={() => setIsHovered(false)}
      >
        {text}
      </TextScramble>
    </span>
  );
}

export default TextScramble;

import React, { useEffect, useRef } from 'react';
import './ScrambledText.css';

const ScrambledText = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = '.:',
  className = '',
  style = {},
  children
}) => {
  const rootRef = useRef(null);
  const charsRef = useRef([]);
  const animsRef = useRef(new Map());

  useEffect(() => {
    if (!rootRef.current) return;

    const charElements = rootRef.current.querySelectorAll('.scrambled-char');
    charsRef.current = Array.from(charElements);

    charsRef.current.forEach((c) => {
      const origText = c.getAttribute('data-content') || c.innerText;
      c.setAttribute('data-content', origText);
    });

    const scrambleCharacter = (c, dist) => {
      const origText = c.getAttribute('data-content');
      if (!origText || origText === ' ') return;

      const calcDuration = duration * (1 - dist / radius);
      const startTime = Date.now();
      const endTime = startTime + calcDuration * 1000;

      if (animsRef.current.has(c)) {
        cancelAnimationFrame(animsRef.current.get(c));
      }

      const step = () => {
        const now = Date.now();
        if (now < endTime) {
          const randomIndex = Math.floor(Math.random() * scrambleChars.length);
          c.innerText = scrambleChars[randomIndex];
          const nextFrame = requestAnimationFrame(step);
          animsRef.current.set(c, nextFrame);
        } else {
          c.innerText = origText;
          animsRef.current.delete(c);
        }
      };

      step();
    };

    const handleMove = (e) => {
      charsRef.current.forEach((c) => {
        const rect = c.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          scrambleCharacter(c, dist);
        }
      });
    };

    window.addEventListener('pointermove', handleMove);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      animsRef.current.forEach((frameId) => cancelAnimationFrame(frameId));
      animsRef.current.clear();
    };
  }, [radius, duration, speed, scrambleChars]);

  // Wrap words in inline-block containers so words wrap naturally without breaking mid-word
  const renderContent = (content) => {
    if (typeof content !== 'string') return content;

    const words = content.split(' ');
    return words.map((word, wIdx) => (
      <span key={wIdx} className="inline-block whitespace-nowrap">
        {word.split('').map((char, cIdx) => (
          <span
            key={cIdx}
            className="scrambled-char font-mono"
            data-content={char}
          >
            {char}
          </span>
        ))}
        {wIdx < words.length - 1 && (
          <span className="scrambled-char font-mono" data-content=" ">
            {' '}
          </span>
        )}
      </span>
    ));
  };

  return (
    <div ref={rootRef} className={`scrambled-text-block ${className}`} style={style}>
      <p className="m-0 p-0 leading-[1.65] font-mono break-words">{renderContent(children)}</p>
    </div>
  );
};

export default ScrambledText;

import React, { useEffect, useRef, useState, useCallback } from "react";

const PIXEL_SIZE = 12;
const TRAIL_LENGTH = 40;
const FADE_SPEED = 0.04;

export function PixelCursorTrail({ className = "", active = true, color = "#ccff00" }) {
  const [pixels, setPixels] = useState([]);
  const pixelIdRef = useRef(0);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef();

  const createPixel = useCallback((x, y) => {
    return {
      id: pixelIdRef.current++,
      x,
      y,
      opacity: 1,
      age: 0,
    };
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!active) return;
      
      const x = e.clientX;
      const y = e.clientY;

      const dx = x - lastPositionRef.current.x;
      const dy = y - lastPositionRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > PIXEL_SIZE) {
        const newPixel = createPixel(x, y);
        setPixels((prev) => [...prev.slice(-TRAIL_LENGTH), newPixel]);
        lastPositionRef.current = { x, y };
      }
    },
    [createPixel, active]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const animate = () => {
      setPixels((prev) =>
        prev
          .map((pixel) => ({
            ...pixel,
            opacity: pixel.opacity - FADE_SPEED,
            age: pixel.age + 1,
          }))
          .filter((pixel) => pixel.opacity > 0)
      );
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  if (!active && pixels.length === 0) return null;

  return (
    <div className={`fixed inset-0 pointer-events-none z-50 overflow-hidden ${className}`}>
      {pixels.map((pixel) => {
        const sizeMultiplier = Math.max(0.3, 1 - pixel.age / 100);
        const currentSize = PIXEL_SIZE * sizeMultiplier;

        return (
          <div
            key={pixel.id}
            className="absolute pointer-events-none rounded-sm"
            style={{
              left: pixel.x - currentSize / 2,
              top: pixel.y - currentSize / 2,
              width: currentSize,
              height: currentSize,
              backgroundColor: color,
              boxShadow: `0 0 6px ${color}aa`,
              opacity: pixel.opacity,
              transition: "width 0.1s ease-out, height 0.1s ease-out",
            }}
          />
        );
      })}
    </div>
  );
}

export default PixelCursorTrail;

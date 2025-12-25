'use client'

import { useEffect, useState, useMemo } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [showLastName, setShowLastName] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Generate floating white particles (star specs)
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.2,
    }));
  }, []);

  useEffect(() => {
    // Show last name after Anusha animation
    const lastNameTimer = setTimeout(() => {
      setShowLastName(true);
    }, 2200);

    // Show scroll text after last name appears
    const scrollTimer = setTimeout(() => {
      setShowScroll(true);
    }, 3200);

    // Start fade out
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 5500);

    // Complete after fade
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 7500);

    return () => {
      clearTimeout(lastNameTimer);
      clearTimeout(scrollTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 2s ease-out',
      }}
    >
      {/* Floating white particles (star specs) */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Subtle gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-blue-900/5" />
      </div>

      {/* Name animation - always centered */}
      <div className="relative z-10 flex items-center justify-center px-4">
        <div className="flex items-center justify-center">
          {/* ANUSHA with SVG stroke animation */}
          <svg
            height="70"
            viewBox="0 0 340 70"
            className="overflow-visible"
            style={{
              width: 'clamp(180px, 35vw, 340px)',
              height: 'auto',
            }}
          >
            <text
              x="0"
              y="50"
              fontSize="60"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              fill="white"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              fillOpacity="0"
              style={{
                paintOrder: "stroke",
                textTransform: "uppercase",
                letterSpacing: "0.02em",
              }}
            >
              ANUSHA
              <animate
                attributeName="stroke-dashoffset"
                from="1000"
                to="0"
                dur="1.8s"
                fill="freeze"
                calcMode="spline"
                keySplines="0.4 0 0.2 1"
              />
              <animate
                attributeName="fill-opacity"
                from="0"
                to="1"
                dur="0.5s"
                begin="1.6s"
                fill="freeze"
              />
            </text>
          </svg>
          
          {/* RAMACHANDRAN - slides out from right of ANUSHA */}
          <div
            className="overflow-hidden"
            style={{
              maxWidth: showLastName ? '600px' : '0',
              opacity: showLastName ? 1 : 0,
              transition: 'max-width 1s ease-out, opacity 0.6s ease-out',
              marginLeft: '-45px',
            }}
          >
            <svg
              height="70"
              viewBox="0 0 580 70"
              className="overflow-visible"
              style={{
                width: 'clamp(220px, 50vw, 580px)',
                height: 'auto',
              }}
            >
              <text
                x="0"
                y="50"
                fontSize="60"
                fontWeight="900"
                fontFamily="system-ui, -apple-system, sans-serif"
                fill="white"
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.02em",
                }}
              >
                RAMACHANDRAN
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Scroll anywhere text - appears after name animation */}
      <div 
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center"
        style={{
          opacity: showScroll ? 1 : 0,
          transform: showScroll ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        }}
      >
        <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-3">
          Scroll Anywhere
        </p>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;

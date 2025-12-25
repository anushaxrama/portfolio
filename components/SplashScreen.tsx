'use client'

import { useEffect, useState, useMemo } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  duration: number;
  delay: number;
  angle: number;
  length: number;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [showLastName, setShowLastName] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Generate shooting stars
  const shootingStars: ShootingStar[] = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      startX: Math.random() * 80 + 10,
      startY: Math.random() * 40 + 5,
      duration: Math.random() * 1.5 + 1,
      delay: i * 0.8,
      angle: Math.random() * 25 + 35,
      length: Math.random() * 50 + 30,
    }));
  }, []);

  useEffect(() => {
    // Show last name after Anusha animation
    const lastNameTimer = setTimeout(() => {
      setShowLastName(true);
    }, 2200);

    // Show shooting stars after last name appears
    const starsTimer = setTimeout(() => {
      setShowStars(true);
    }, 3000);

    // Start fade out (gentler)
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 5000);

    // Complete after fade
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 7000);

    return () => {
      clearTimeout(lastNameTimer);
      clearTimeout(starsTimer);
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
      {/* Subtle gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/8 via-transparent to-blue-900/8" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Shooting stars - appear after name animation */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          opacity: showStars ? 1 : 0,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        {shootingStars.map((star) => (
          <div
            key={star.id}
            className="absolute"
            style={{
              left: `${star.startX}%`,
              top: `${star.startY}%`,
              width: `${star.length}px`,
              height: '1px',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.5), transparent)',
              transform: `rotate(${star.angle}deg)`,
              animation: showStars ? `shoot ${star.duration}s ease-out ${star.delay}s infinite` : 'none',
            }}
          />
        ))}
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

      {/* Scroll anywhere text - appears after stars */}
      <div 
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center"
        style={{
          opacity: showStars ? 1 : 0,
          transform: showStars ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.6s ease-out 0.5s, transform 0.6s ease-out 0.5s',
        }}
      >
        <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-3">
          Scroll Anywhere
        </p>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
      </div>

      <style jsx>{`
        @keyframes shoot {
          0% {
            opacity: 0;
            transform: rotate(var(--angle, 45deg)) translateX(0);
          }
          10% {
            opacity: 0.6;
          }
          40% {
            opacity: 0.3;
          }
          100% {
            opacity: 0;
            transform: rotate(var(--angle, 45deg)) translateX(150px);
          }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;

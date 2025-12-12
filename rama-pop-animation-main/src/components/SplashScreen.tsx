import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(onComplete, 500);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-splash-bg transition-opacity duration-500 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
    >
      <svg
        width="600"
        height="200"
        viewBox="0 0 600 200"
        className="max-w-[90vw]"
      >
        <defs>
          <linearGradient id="ramaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--logo-orange))" />
            <stop offset="33%" stopColor="hsl(var(--logo-pink))" />
            <stop offset="66%" stopColor="hsl(var(--logo-purple))" />
            <stop offset="100%" stopColor="hsl(var(--logo-blue))" />
          </linearGradient>
        </defs>
        
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="120"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          fill="url(#ramaGradient)"
          stroke="url(#ramaGradient)"
          strokeWidth="3"
          strokeDasharray="1000"
          strokeDashoffset="1000"
          fillOpacity="0"
          className="animate-draw-stroke"
          style={{
            paintOrder: "stroke",
          }}
        >
          RAMA
          <animate
            attributeName="fill-opacity"
            from="0"
            to="1"
            dur="1s"
            begin="2s"
            fill="freeze"
          />
        </text>
      </svg>
    </div>
  );
};

export default SplashScreen;

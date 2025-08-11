"use client";
import React, { useState, useRef } from "react";
import { Gift, RotateCcw, Sparkles } from "lucide-react";
import Image from "next/image";

interface Prize {
  id: number;
  text: string;
  color: string;
  textColor: string;
  icon: string;
}

const prizes: Prize[] = [
  { id: 1, text: "10% OFF", color: "#FF6B35", textColor: "#FFFFFF", icon: "🏷️" }, // Discount tag
  { id: 2, text: "Large Fury Sky Shot", color: "#FFD23F", textColor: "#2D1810", icon: "🚀" }, // Firework explosion
  { id: 3, text: "Better Luck Next Time", color: "#7F8C8D", textColor: "#FFFFFF", icon: "🙁" }, // Grey for loss
  { id: 4, text: "30 Shots", color: "#1E90FF", textColor: "#FFFFFF", icon: "🎇" }, // Multiple spark effects
  { id: 5, text: "Atom Bomb", color: "#E74C3C", textColor: "#FFFFFF", icon: "💣" }, // Explosion icon
  { id: 6, text: "25% OFF", color: "#27AE60", textColor: "#FFFFFF", icon: "🏷️" }, // Green for good deals
  { id: 7, text: "Better Luck Next Time", color: "#7F8C8D", textColor: "#FFFFFF", icon: "🙁" }, // Same grey loss
  { id: 8, text: "Drone", color: "#8E44AD", textColor: "#FFFFFF", icon: "🎇" }, // Helicopter/drone
  { id: 9, text: "Fountains", color: "#F39C12", textColor: "#FFFFFF", icon: "🚀" }, // Fountain shape
  { id: 10, text: "Better Luck Next Time", color: "#7F8C8D", textColor: "#FFFFFF", icon: "🙁" }, // Loss again
];


const SpinWheel: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
  const [rotation, setRotation] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const [hasSpun, setHasSpun] = useState(false);

  const spinWheel = () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);
    setSelectedPrize(null);
    setShowConfetti(false);

    const prizeAngle = 360 / prizes.length;
    const selectedIndex = Math.floor(Math.random() * prizes.length);
    const randomOffset = Math.random() * prizeAngle - prizeAngle / 2;
    const rotationToPrize = 360 - (selectedIndex * prizeAngle + prizeAngle / 2) + randomOffset;
    const fullRotations = 5;
    const totalRotation = fullRotations * 360 + rotationToPrize;

    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedPrize(prizes[selectedIndex]);
      setShowConfetti(true);
      setHasSpun(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }, 3000);
  };

  const resetWheel = () => {
    setRotation(0);
    setSelectedPrize(null);
    setShowConfetti(false);
    setHasSpun(false);
  };

  const renderWheelSegments = () => {
    const segmentAngle = 360 / prizes.length;

    return prizes.map((prize, index) => {
      const startAngle = index * segmentAngle;
      const endAngle = (index + 1) * segmentAngle;
      const largeArcFlag = segmentAngle > 180 ? 1 : 0;
      const x1 = 150 + 140 * Math.cos((startAngle * Math.PI) / 180);
      const y1 = 150 + 140 * Math.sin((startAngle * Math.PI) / 180);
      const x2 = 150 + 140 * Math.cos((endAngle * Math.PI) / 180);
      const y2 = 150 + 140 * Math.sin((endAngle * Math.PI) / 180);
      const pathData = `M 150 150 L ${x1} ${y1} A 140 140 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
      const midAngle = (startAngle + endAngle) / 2;
      const textRadius = 100;
      const textX = 150 + textRadius * Math.cos((midAngle * Math.PI) / 180);
      const textY = 150 + textRadius * Math.sin((midAngle * Math.PI) / 180);

      return (
        <g key={`${prize.id}-${index}`}>
          <path
            d={pathData}
            fill={prize.color}
            stroke="#FFFFFF"
            strokeWidth="2"
            className="transition-all duration-300 hover:brightness-110"
          />
          <text
            x={textX}
            y={textY}
            fill={prize.textColor}
            fontSize="9"
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${midAngle + 90}, ${textX}, ${textY})`}
            className="pointer-events-none font-sans"
          >
            <tspan x={textX} dy="-10"><tspan className="text-[10px]">{prize.icon}</tspan></tspan>
            {prize.text === "Better Luck Next Time" ? (
              <>
                <tspan x={textX} dy="14">Better Luck</tspan>
                <tspan x={textX} dy="14">Next Time</tspan>
              </>
            ) :   prize.text === "Large Fury Sky Shot" ? (
              <>
                <tspan x={textX} dy="14">Large Fury</tspan>
                <tspan x={textX} dy="14">Sky Shot</tspan>
              </>
            ): prize.text.length > 12 ? (
              <>
                <tspan x={textX} dy="14">{prize.text.slice(0, 12)}</tspan>
                <tspan x={textX} dy="14">{prize.text.slice(12)}</tspan>
              </>
            ) : (
              <tspan x={textX} dy="14">{prize.text}</tspan>
            )}
          </text>
        </g>
      );
    });
  };

  return (
      <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: "url('/crackersBg/2.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <Sparkles className="text-yellow-500 w-4 h-4" />
            </div>
          ))}
        </div>
      )}

      <div className="text-center mb-8">
   
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2 tracking-tight">
          Maya Traders
        </h1>
      
        <p className="text-yellow-500 text-lg md:text-xl font-medium">
          Spin to win amazing discounts on premium crackers!
        </p>
      </div>

      <div className="relative mb-8">
        <div className="relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
            <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[25px] border-l-transparent border-r-transparent rotate-180 border-b-red-600 drop-shadow-lg"></div>
          </div>

          <div
            ref={wheelRef}
            className={`relative w-[500px] h-[500px] rounded-full shadow-2xl transition-transform duration-[3000ms] ease-out ${
              isSpinning ? "animate-pulse" : ""
            }`}
            style={{
              transform: `rotate(${rotation}deg)`,
              background:
                "conic-gradient(from 0deg, #FF6B35, #F7931E, #FFD23F, #06D6A0, #118AB2, #8E44AD, #E74C3C, #2ECC71)",
            }}
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 300 300"
              style={{ transform: "rotate(-90deg)" }}
            >
              {renderWheelSegments()}
            </svg>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-amber-600">
           <Image src="/mayaLog.png" alt="" width={100} height={100}/>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        {!hasSpun && (
          <button
            onClick={spinWheel}
            disabled={isSpinning || hasSpun}
            className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
              isSpinning
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : `bg-gradient-to-r from-orange-500 ${
                    hasSpun ? "cursor-not-allowed" : "cursor-pointer"
                  } to-red-500 text-white hover:from-orange-600 hover:to-red-600 active:scale-95`
            }`}
          >
            {isSpinning ? "Spinning..." : "SPIN NOW!"}
          </button>
        )}
      </div>

      {selectedPrize && (
        <div className="bg-white mt-2 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border-4 border-yellow-400 animate-bounce">
          <div className="text-center">
            <div className="text-6xl mb-4">{selectedPrize.icon}</div>
            {selectedPrize.text === "Better Luck Next Time" ? (
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
            ) : (
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Congratulations!
              </h2>
            )}
            <p className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 mb-4">
              {selectedPrize.text !== "Better Luck Next Time"
                ? `You won: ${selectedPrize.text}`
                : selectedPrize.text}
            </p>
            {selectedPrize.text !== "Better Luck Next Time" && (
              <p className="text-gray-600 text-sm">
                Use this offer on your next purchase of premium crackers!
              </p>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 text-center max-w-2xl mx-4">
        <p className="text-white text-sm md:text-base leading-relaxed">
          Click "SPIN NOW!" to discover your exclusive discount. Each spin
          offers a chance to win amazing deals on our premium crackers
          collection. Good luck! 🍪
        </p>
      </div>
    </div>
  );
};

export default SpinWheel;

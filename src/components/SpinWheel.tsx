"use client";
import React, { useState, useRef } from "react";
import { Gift, RotateCcw, Sparkles } from "lucide-react";

interface Prize {
  id: number;
  text: string;
  color: string;
  textColor: string;
  icon: string;
}

const prizes: Prize[] = [
  { id: 1, text: "10% OFF", color: "#FF6B35", textColor: "#FFFFFF", icon: "🎯" },
  { id: 2, text: "25% OFF", color: "#FFD23F", textColor: "#2D1810", icon: "⚡" },
  { id: 3, text: "5% OFF", color: "#118AB2", textColor: "#FFFFFF", icon: "💫" },
  { id: 4, text: "15% OFF", color: "#E74C3C", textColor: "#FFFFFF", icon: "🔥" },
  { id: 5, text: "Better Luck Next Time", color: "#95A5A6", textColor: "#FFFFFF", icon: "🙁" },
  { id: 6, text: "30% OFF", color: "#2ECC71", textColor: "#FFFFFF", icon: "🎉" },
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
        <g key={prize.id}>
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
            fontSize="11"
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${midAngle + 90}, ${textX}, ${textY})`}
            className="pointer-events-none font-sans"
          >
            <tspan x={textX} dy="-10">{prize.icon}</tspan>
            {prize.text.length > 12 ? (
              <>
                <tspan x={textX} dy="14">
                  {prize.text.slice(0, 12)}
                </tspan>
                <tspan x={textX} dy="14">
                  {prize.text.slice(12)}
                </tspan>
              </>
            ) : (
              <tspan x={textX} dy="14">
                {prize.text}
              </tspan>
            )}
          </text>
        </g>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex flex-col items-center justify-center p-4">
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
        <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-2 tracking-tight">
          Lucky Spin Wheel
        </h1>
        <p className="text-amber-700 text-lg md:text-xl font-medium">
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
            className={`relative w-80 h-80 rounded-full shadow-2xl transition-transform duration-[3000ms] ease-out ${
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

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-amber-600">
              <Gift className="w-8 h-8 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={spinWheel}
          disabled={isSpinning || hasSpun}
          className={`px-8 py-4 rounded-full   font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
            isSpinning
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : `bg-gradient-to-r from-orange-500 ${
                  hasSpun ? "cursor-not-allowed" : "cursor-pointer"
                } to-red-500 text-white hover:from-orange-600 hover:to-red-600 active:scale-95`
          }`}
        >
          {isSpinning ? "Spinning..." : "SPIN NOW!"}
        </button>

        <button
          onClick={resetWheel}
          className="px-6 py-4 cursor-pointer rounded-full font-bold text-lg bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {selectedPrize && (
        <div className="bg-white mt-2 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border-4 border-yellow-400 animate-bounce">
          <div className="text-center">
            <div className="text-6xl mb-4">{selectedPrize.icon}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Congratulations!
            </h2>
            <p className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 mb-4">
              You won: {selectedPrize.text}
            </p>
            <p className="text-gray-600 text-sm">
              Use this offer on your next purchase of premium crackers!
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 text-center max-w-2xl mx-4">
        <p className="text-amber-800 text-sm md:text-base leading-relaxed">
          Click "SPIN NOW!" to discover your exclusive discount. Each spin
          offers a chance to win amazing deals on our premium crackers
          collection. Good luck! 🍪
        </p>
      </div>
    </div>
  );
};

export default SpinWheel;

"use client";
import React, { useState, useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import toast from "react-hot-toast";
import Loader from "./Loader";

interface Prize {
  id: number;
  text: string;
  color: string;
  textColor: string;
  icon: string;
}

const prizes: Prize[] = [
  { id: 1, text: "10% OFF", color: "#FF6B35", textColor: "#FFFFFF", icon: "🏷️" },
  { id: 2, text: "Large Fury Sky Shot", color: "#FFD23F", textColor: "#FFFFFF", icon: "🚀" },
  { id: 4, text: "30 Shots", color: "#1E90FF", textColor: "#FFFFFF", icon: "🎇" },
  { id: 5, text: "Atom Bomb", color: "#E74C3C", textColor: "#FFFFFF", icon: "💣" },
  { id: 6, text: "25% OFF", color: "#27AE60", textColor: "#FFFFFF", icon: "🏷️" },
  { id: 8, text: "Drone", color: "#8E44AD", textColor: "#FFFFFF", icon: "🎇" },
  { id: 9, text: "Fountains", color: "#F39C12", textColor: "#FFFFFF", icon: "🚀" },
];

// Custom styles for PhoneInput
const PhoneInputStyles = () => (
  <style>{`
    .custom-phone-input {
      display: flex;
      align-items: center;
      width: 100%;
    }
    .custom-phone-input .PhoneInputCountry {
      margin: 0.5rem 0 0.5rem 0.75rem;
    }
    .custom-phone-input .PhoneInputInput {
      flex: 1;
      border: none;
      outline: none;
      background-color: transparent;
      padding: 0.75rem 1rem 0.75rem 0.5rem;
      color: #4a2e20;
      font-size: 1rem;
      width: 100%;
    }
    .custom-phone-input .PhoneInputInput::placeholder {
      color: rgba(107, 114, 128, 0.8);
    }
  `}</style>
);

const SpinWheel: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
  const [rotation, setRotation] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const [hasSpun, setHasSpun] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // modal states
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [offerCode, setOfferCode] = useState<string | null>(null);
  const [offerClaimed, setOfferClaimed] = useState(false);

  useEffect(() => {
    const storedClaimed = localStorage.getItem("offerClaimed");
    const storedCode = localStorage.getItem("offerCode");
    if (storedClaimed === "true" && storedCode) {
      setOfferClaimed(true);
      setOfferCode(storedCode);
    }
  }, []);

  useEffect(() => {
    const storedPrize = localStorage.getItem("selectedPrize");
    if (storedPrize) {
      setSelectedPrize(JSON.parse(storedPrize));
      setHasSpun(true);
    }
  }, []);

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
      const prizeWon = prizes[selectedIndex];
      setIsSpinning(false);
      setSelectedPrize(prizeWon);
      setShowConfetti(true);
      setHasSpun(true);

      localStorage.setItem("selectedPrize", JSON.stringify(prizeWon));
      setTimeout(() => setShowConfetti(false), 3000);
    }, 3000);
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
          <path d={pathData} fill={prize.color} stroke="#FFFFFF" strokeWidth="2" className="transition-all duration-300 hover:brightness-110" />
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
            <tspan x={textX} dy="-10">
              {prize.icon}
            </tspan>
            <tspan x={textX} dy="14">
              {prize.text}
            </tspan>
          </text>
        </g>
      );
    });
  };

  // Generate random offer code
  const generateOfferCode = () => {
    return "MAYA" + Math.floor(1000 + Math.random() * 9000);
  };

  // Handle claim form submit
  // Handle claim form submit
  const handleClaimSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPrize) return;

    if (!isValidPhoneNumber(userPhone)) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    setIsLoading(true);
    const code = generateOfferCode();
    setOfferCode(code);
    console.log("Generated Offer Code:", code, selectedPrize.text, userName, userPhone);

    try {
      // Save to Google Sheets
      const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL!;
      const response = await fetch(googleScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          name: userName,
          phone: userPhone,
          prize: selectedPrize.text,
          code,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsLoading(false);
        toast.success("Your offer is saved!");
        setOfferClaimed(true);
        localStorage.setItem("offerClaimed", "true");
        localStorage.setItem("offerCode", code);
        setOfferCode(code);
        setShowModal(false);
      } else {
        toast.error("Failed to save data. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: "url('/crackersBg/2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
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
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2 tracking-tight">Maya Traders</h1>
        <p className="text-yellow-500 text-lg md:text-xl font-medium">Spin to win amazing discounts on premium crackers!</p>
      </div>

      <div className="relative mb-8">
        <div className="relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
            <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[25px] border-l-transparent border-r-transparent rotate-180 border-b-red-600 drop-shadow-lg"></div>
          </div>

          <div
            ref={wheelRef}
            className={`relative w-full md:w-[500px] md:h-[500px] rounded-full shadow-2xl transition-transform duration-[3000ms] ease-out ${
              isSpinning ? "animate-pulse" : ""
            }`}
            style={{
              transform: `rotate(${rotation}deg)`,
            }}
          >
            <svg className="w-full h-full" viewBox="0 0 300 300" style={{ transform: "rotate(-90deg)" }}>
              {renderWheelSegments()}
            </svg>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-amber-600">
              <Image src="/mayaLog.png" alt="" width={100} height={100} />
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
                ? ""
                : "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 cursor-pointer hover:to-red-600 active:scale-95"
            }`}
          >
            {isSpinning ? (
              <div className="spinner">
                <div className="spinnerin"></div>
              </div>
            ) : (
              "SPIN NOW!"
            )}
          </button>
        )}
      </div>

      {selectedPrize && (
        <div className="bg-white mt-2 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border-4 border-yellow-400 animate-bounce transition-all duration-300 hover:animate-none text-center">
          <div className="text-6xl mb-4">{selectedPrize.icon}</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Congratulations!</h2>
          <p className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 mb-4">
            You won: {selectedPrize.text}
          </p>

          {!offerClaimed ? (
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 px-6 py-3 cursor-pointer rounded-full bg-green-600 text-white font-bold hover:bg-green-700 transition"
            >
              Claim Your Offer
            </button>
          ) : (
            <div className="mt-4 px-6 py-3 rounded-full bg-yellow-200 text-yellow-800 font-bold border-2 border-yellow-400">
              🎉 Your Offer Code: {offerCode}
            </div>
          )}
        </div>
      )}

      {/* Claim Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4  text-center text-gray-800">Claim Your Offer</h3>
            <form onSubmit={handleClaimSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="w-full text-black px-4 py-2 border rounded-lg"
              />
              <PhoneInputStyles />
              <PhoneInput
                international
                defaultCountry="IN"
                value={userPhone}
                onChange={(value) => setUserPhone(value || "")}
                className="custom-phone-input border rounded-lg"
                placeholder="Enter phone number"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => setShowModal(false)}
                  className={`px-4 py-2 ${isLoading ? "opacity-0" : "opacity-100"} rounded-lg bg-gray-300 text-white hover:bg-gray-400`}
                >
                  Cancel
                </button>
                {isLoading ? (
                  <div>
                    {" "}
                    <button className="">
                      <Loader />
                    </button>
                  </div>
                ) : (
                  <div>
                    {" "}
                    <button type="submit" className="px-4 cursor-pointer py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">
                      Submit
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-black/50 backdrop-blur-xs mt-8 max-w-2xl mx-4 text-center p-4 rounded-xl">
        <p className="text-white text-sm md:text-base leading-relaxed">
          Click "SPIN NOW!" to discover your exclusive discount. Each spin offers a chance to win amazing deals on our premium crackers collection.
          Good luck! 🎆
        </p>
      </div>
    </div>
  );
};

export default SpinWheel;

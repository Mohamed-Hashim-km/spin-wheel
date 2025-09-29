import SpinWheel from "@/components/SpinWheel";

export const goldPrizes = [
  { id: 1, text: "10% Off on Loose crackers", color: "#FF6B35", textColor: "#FFF", icon: "🏷️", probability: 15 },
  { id: 2, text: "10 Shots", color: "#FFD23F", textColor: "#FFF", icon: "🎇", probability: 15 },
  { id: 3, text: "5x4 = 20 Sky Shots", color: "#1E90FF", textColor: "#FFF", icon: "🎆", probability: 15 },
  { id: 4, text: "Large Fancy Sky Shots", color: "#E74C3C", textColor: "#FFF", icon: "🎆", probability: 20 },
  { id: 5, text: "30 Shots", color: "#27AE60", textColor: "#FFF", icon: "🎇", probability: 20 },
  { id: 6, text: "60 Shots", color: "#8E44AD", textColor: "#FFF", icon: "🎆", probability: 10 },
  { id: 7, text: "80 Shots", color: "#F39C12", textColor: "#FFF", icon: "🎇", probability: 5 },
];

export default function Loyality() {
  return (
    <SpinWheel
      pageKey="loyalty"
      googleScriptUrl={process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_LOYALITY!}
      prizes={goldPrizes}
    />
  );
}

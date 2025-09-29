import SpinWheel from "@/components/SpinWheel";

export const platinumPrizes = [
  { id: 1, text: "25% Off on Loose crackers", color: "#FF6B35", textColor: "#FFF", icon: "🏷️", probability: 10 },
  { id: 2, text: "100 Shots Simcha", color: "#FFD23F", textColor: "#FFF", icon: "🎆", probability: 20 },
  { id: 3, text: "120 Shots", color: "#1E90FF", textColor: "#FFF", icon: "🎇", probability: 10 },
  { id: 4, text: "80 Shots", color: "#E74C3C", textColor: "#FFF", icon: "🎆", probability: 20 },
  { id: 5, text: "60 Shots", color: "#27AE60", textColor: "#FFF", icon: "🎇", probability: 20 },
  { id: 6, text: "160 Shots", color: "#8E44AD", textColor: "#FFF", icon: "🎆", probability: 10 },
  { id: 7, text: "240 Shots Rudra", color: "#F39C12", textColor: "#FFF", icon: "🎇", probability: 10 },
];

export default function DiamondPage() {
  return (
    <SpinWheel
      pageKey="diamond"
      googleScriptUrl={process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_DIOMOND!}
      prizes={platinumPrizes}
    />
  );
}

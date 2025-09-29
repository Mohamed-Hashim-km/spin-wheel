import SpinWheel from "@/components/SpinWheel";

export const goldPrizes = [
  { id: 1, text: "5x4 = 20 Sky Shots", color: "#FF6B35", textColor: "#FFF", icon: "🎇", probability: 25 },
  { id: 2, text: "30 Shots", color: "#FFD23F", textColor: "#FFF", icon: "🎆", probability: 20 },
  { id: 3, text: "Barbie 5'' Sky Shots", color: "#1E90FF", textColor: "#FFF", icon: "🎀", probability: 15 },
  { id: 4, text: "50 Shots", color: "#E74C3C", textColor: "#FFF", icon: "🎇", probability: 10 },
  { id: 5, text: "20% Off on Loose Crackers", color: "#27AE60", textColor: "#FFF", icon: "🏷️", probability: 10 },
  { id: 6, text: "100 Shots Simcha", color: "#8E44AD", textColor: "#FFF", icon: "🎆", probability: 0 },
  { id: 7, text: "15 Shots", color: "#F39C12", textColor: "#FFF", icon: "🎇", probability: 20 },
];


export default function GoldPage() {
  return (
    <SpinWheel
      pageKey="gold"
      googleScriptUrl={process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_GOLD!}
      prizes={goldPrizes}
    />
  );
}

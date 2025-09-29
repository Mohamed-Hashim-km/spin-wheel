import SpinWheel from "@/components/SpinWheel";

const silverPrizes = [
  { id: 1, text: "12 Shots", color: "#FF6B35", textColor: "#FFF", icon: "🎇", probability: 13 },
  { id: 2, text: "15 Shots", color: "#FFD23F", textColor: "#FFF", icon: "🎆", probability: 13 },
  { id: 3, text: "Drone", color: "#1E90FF", textColor: "#FFF", icon: "🚁", probability: 13 },
  { id: 4, text: "Fountain", color: "#E74C3C", textColor: "#FFF", icon: "🎆", probability: 13 },
  { id: 5, text: "15% Off on Loose Crackers", color: "#27AE60", textColor: "#FFF", icon: "🏷️", probability: 10 },
  { id: 6, text: "Large Fancy Sky Shots", color: "#8E44AD", textColor: "#FFF", icon: "🎇", probability: 13 },
  { id: 7, text: "30 Shots", color: "#F39C12", textColor: "#FFF", icon: "🎆", probability: 10 },
];


export default function SilverPage() {
  return (
    <SpinWheel
      pageKey="silver"
      googleScriptUrl={process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_SILVER!}
      prizes={silverPrizes}
    />
  );
}

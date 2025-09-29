import SpinWheel from "@/components/SpinWheel";

const bronzePrizes = [
  { id: 1, text: "7 Shots", color: "#FF6B35", textColor: "#FFF", icon: "🎇", probability: 19 },
  { id: 2, text: "12 Shots", color: "#FFD23F", textColor: "#FFF", icon: "🎆", probability: 19 },
  { id: 3, text: "Arc Fountain", color: "#1E90FF", textColor: "#FFF", icon: "🚀", probability: 19 },
  { id: 4, text: "10% Off on Loose Crackers", color: "#27AE60", textColor: "#FFF", icon: "🏷️", probability: 5 },
  { id: 5, text: "Fountain", color: "#E74C3C", textColor: "#FFF", icon: "🎆", probability: 19 },
  { id: 6, text: "Bada Peacock", color: "#8E44AD", textColor: "#FFF", icon: "🦚", probability: 0 },
  { id: 7, text: "Drone", color: "#F39C12", textColor: "#FFF", icon: "🚁", probability: 19 },
];

export default function BronzePage() {
  return (
    <SpinWheel
      pageKey="bronze"
      googleScriptUrl={process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL_BRONZE!}
      prizes={bronzePrizes}
    />
  );
}

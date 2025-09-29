import SpinWheel from "@/components/SpinWheel";

const prizes = [
  { id: 1, text: "50 shots", color: "#FF6B35", textColor: "#FFF", icon: "🎇" },
  { id: 2, text: "80 shots", color: "#FFD23F", textColor: "#FFF", icon: "🎆" },
  { id: 3, text: "Sky Rocket", color: "#1E90FF", textColor: "#FFF", icon: "🚀" },
  { id: 4, text: "20% Off on Loose Crackers", color: "#27AE60", textColor: "#FFF", icon: "🏷️" },
  { id: 5, text: "Mega Fountain", color: "#E74C3C", textColor: "#FFF", icon: "🎆" },
  { id: 6, text: "Royal Peacock", color: "#8E44AD", textColor: "#FFF", icon: "🦚" },
  { id: 7, text: "Pro Drone", color: "#F39C12", textColor: "#FFF", icon: "🚁" },
];

export default function GoldPage() {
  return (
    <SpinWheel
      pageKey="gold"
      googleScriptUrl={process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_GOLD!}
      prizes={prizes}
    />
  );
}

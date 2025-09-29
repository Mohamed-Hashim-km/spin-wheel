import SpinWheel from "@/components/SpinWheel";

const prizes = [
  { id: 1, text: "7 shots", color: "#FF6B35", textColor: "#FFF", icon: "🎇" },
  { id: 2, text: "12 shots", color: "#FFD23F", textColor: "#FFF", icon: "🎆" },
  { id: 3, text: "Arc Fountain", color: "#1E90FF", textColor: "#FFF", icon: "🚀" },
  { id: 4, text: "10% Off on Loose Crackers", color: "#27AE60", textColor: "#FFF", icon: "🏷️" },
  { id: 5, text: "Fountain", color: "#E74C3C", textColor: "#FFF", icon: "🎆" },
  { id: 6, text: "Bada Peacock", color: "#8E44AD", textColor: "#FFF", icon: "🦚" },
  { id: 7, text: "Drone", color: "#F39C12", textColor: "#FFF", icon: "🚁" },
];

export default function BronzePage() {
  return (
    <SpinWheel
      pageKey="bronze"
      googleScriptUrl={process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_BRONZE!}
      prizes={prizes}
    />
  );
}

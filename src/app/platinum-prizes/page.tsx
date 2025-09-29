import SpinWheel from "@/components/SpinWheel";

const prizes = [
  { id: 1, text: "100 shots", color: "#FF6B35", textColor: "#FFF", icon: "🎇" },
  { id: 2, text: "150 shots", color: "#FFD23F", textColor: "#FFF", icon: "🎆" },
  { id: 3, text: "Super Rocket", color: "#1E90FF", textColor: "#FFF", icon: "🚀" },
  { id: 4, text: "25% Off on Loose Crackers", color: "#27AE60", textColor: "#FFF", icon: "🏷️" },
  { id: 5, text: "Ultra Fountain", color: "#E74C3C", textColor: "#FFF", icon: "🎆" },
  { id: 6, text: "Diamond Peacock", color: "#8E44AD", textColor: "#FFF", icon: "🦚" },
  { id: 7, text: "Drone Pro Max", color: "#F39C12", textColor: "#FFF", icon: "🚁" },
];

export default function PlatinumPage() {
  return (
    <SpinWheel
      pageKey="platinum"
      googleScriptUrl={process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_PLATINUM!}
      prizes={prizes}
    />
  );
}

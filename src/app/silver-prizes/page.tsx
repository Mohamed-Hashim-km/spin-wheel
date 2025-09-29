import SpinWheel from "@/components/SpinWheel";

const prizes = [
  { id: 1, text: "20 shots", color: "#FF6B35", textColor: "#FFF", icon: "🎇" },
  { id: 2, text: "40 shots", color: "#FFD23F", textColor: "#FFF", icon: "🎆" },
  { id: 3, text: "Rocket Pack", color: "#1E90FF", textColor: "#FFF", icon: "🚀" },
  { id: 4, text: "15% Off on Loose Crackers", color: "#27AE60", textColor: "#FFF", icon: "🏷️" },
  { id: 5, text: "Fancy Fountain", color: "#E74C3C", textColor: "#FFF", icon: "🎆" },
  { id: 6, text: "Golden Peacock", color: "#8E44AD", textColor: "#FFF", icon: "🦚" },
  { id: 7, text: "Drone XL", color: "#F39C12", textColor: "#FFF", icon: "🚁" },
];

export default function SilverPage() {
  return (
    <SpinWheel
      pageKey="silver"
      googleScriptUrl={process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_SILVER!}
      prizes={prizes}
    />
  );
}

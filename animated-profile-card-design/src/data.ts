export type BrandId =
  | "facebook"
  | "whatsapp"
  | "instagram"
  | "threads"
  | "youtube"
  | "tiktok"
  | "discord"
  | "telegram"
  | "phone";

export interface LinkItem {
  id: BrandId;
  label: string;
  handle: string;
  href: string;
  /** chip background (css) */
  chip: string;
  /** hex color used for hover glow / accents */
  glow: string;
  external: boolean;
}

export const LINKS: LinkItem[] = [
  {
    id: "facebook",
    label: "Facebook",
    handle: "@nayonbiswas007",
    href: "https://www.facebook.com/nayonbiswas007",
    chip: "linear-gradient(135deg,#2f8bff 0%,#1877F2 60%,#0d5dcc 100%)",
    glow: "#1877F2",
    external: true,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    handle: "+880 1906-227200",
    href: "https://wa.me/8801906227200",
    chip: "linear-gradient(135deg,#4ce26b 0%,#25D366 55%,#128C7E 100%)",
    glow: "#25D366",
    external: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@nayon_biswas007",
    href: "https://www.instagram.com/nayon_biswas007/",
    chip: "linear-gradient(45deg,#FEDA75 0%,#FA7E1E 25%,#D62976 50%,#962FBF 75%,#4F5BD5 100%)",
    glow: "#D62976",
    external: true,
  },
  {
    id: "threads",
    label: "Threads",
    handle: "@nayon_biswas007",
    href: "https://www.threads.com/@nayon_biswas007",
    chip: "linear-gradient(135deg,#3a3f4b 0%,#171a21 60%,#05070b 100%)",
    glow: "#9aa4b8",
    external: true,
  },
  {
    id: "youtube",
    label: "YouTube",
    handle: "@NayonGamez",
    href: "https://www.youtube.com/@NayonGamez",
    chip: "linear-gradient(135deg,#ff5f5f 0%,#FF0000 60%,#c20000 100%)",
    glow: "#FF0000",
    external: true,
  },
  {
    id: "tiktok",
    label: "TikTok",
    handle: "@nayongamez",
    href: "https://www.tiktok.com/@nayongamez",
    chip: "linear-gradient(135deg,#1d2129 0%,#010101 65%,#000 100%)",
    glow: "#FE2C55",
    external: true,
  },
  {
    id: "discord",
    label: "Discord",
    handle: "Join the server",
    href: "https://discord.gg/fX9QEHhFUy",
    chip: "linear-gradient(135deg,#7b8cff 0%,#5865F2 60%,#3b49c9 100%)",
    glow: "#5865F2",
    external: true,
  },
  {
    id: "telegram",
    label: "Telegram",
    handle: "@NayonBiswas007",
    href: "https://t.me/NayonBiswas007",
    chip: "linear-gradient(135deg,#4fc3f7 0%,#26A5E4 55%,#0f7cc0 100%)",
    glow: "#26A5E4",
    external: true,
  },
  {
    id: "phone",
    label: "Call Me",
    handle: "+880 1906-227200",
    href: "tel:+8801906227200",
    chip: "linear-gradient(135deg,#a7b6d4 0%,#5d70a0 60%,#33415f 100%)",
    glow: "#9db4e0",
    external: false,
  },
];

export const PROFILE = {
  name: "Nayon Biswas",
  username: "nayonbiswas007",
  bio: ["Student", "Gamer", "Content Creator", "Adventurer"],
  location: "Mohammadpur, Magura",
  avatar: "/images/nayon_real.jpg",
};

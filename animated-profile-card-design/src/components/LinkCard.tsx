import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, PhoneOutgoing } from "lucide-react";
import type { LinkItem } from "../data";
import { BrandIcon } from "./icons";

interface Props {
  link: LinkItem;
  index: number;
}

export default function LinkCard({ link, index }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18 });
  const sy = useSpring(y, { stiffness: 260, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.12);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const delay = 0.85 + index * 0.07;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay, type: "spring", stiffness: 130, damping: 17 }}
    >
      <motion.div
        ref={ref}
        style={{ x: sx, y: sy }}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={reset}
      >
        <motion.a
          href={link.href}
          {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          whileTap={{ scale: 0.96 }}
          className="group relative flex items-center gap-4 overflow-hidden rounded-[22px] border px-4 py-3.5 backdrop-blur-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70 sm:px-5 sm:py-4"
          style={{
            background: hovered ? "rgba(255,255,255,0.075)" : "rgba(255,255,255,0.035)",
            borderColor: hovered ? `${link.glow}80` : "rgba(255,255,255,0.09)",
            boxShadow: hovered
              ? `0 16px 48px -14px ${link.glow}70, inset 0 1px 0 rgba(255,255,255,0.1)`
              : "0 6px 24px -12px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)",
            transition: "background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
          }}
        >
          {/* sheen sweep */}
          <span className="link-sheen" />

          {/* icon chip */}
          <span
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110"
            style={{
              background: link.chip,
              boxShadow: `0 10px 22px -7px ${link.glow}aa, inset 0 1px 0 rgba(255,255,255,0.22)`,
            }}
          >
            <BrandIcon id={link.id} size={20} />
          </span>

          {/* labels */}
          <span className="flex min-w-0 flex-1 flex-col text-left">
            <span className="font-display text-[15.5px] font-semibold tracking-wide text-white">
              {link.label}
            </span>
          </span>

          {/* arrow */}
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300"
            style={{
              borderColor: hovered ? `${link.glow}70` : "rgba(255,255,255,0.1)",
              background: hovered ? `${link.glow}22` : "transparent",
              color: hovered ? link.glow : "rgba(255,255,255,0.45)",
              transform: hovered ? "translate(2px,-2px) scale(1.06)" : "none",
            }}
          >
            {link.external ? <ArrowUpRight size={15} /> : <PhoneOutgoing size={14} />}
          </span>
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

import { useEffect, useMemo } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`;

interface Star {
  left: number;
  top: number;
  size: number;
  dur: number;
  delay: number;
}

export default function Background() {
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: 70 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 1.8 + 0.6,
        dur: 2.5 + Math.random() * 4.5,
        delay: Math.random() * 5,
      })),
    []
  );

  const mx = useMotionValue(-600);
  const my = useMotionValue(-600);
  const sx = useSpring(mx, { stiffness: 50, damping: 18 });
  const sy = useSpring(my, { stiffness: 50, damping: 18 });
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${sx}px ${sy}px, rgba(96,165,250,0.075), transparent 65%)`;

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  return (
    <div className="fixed inset-0 overflow-hidden" aria-hidden="true">
      {/* base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 100% at 50% 0%, #0c1832 0%, #070f22 42%, #03060e 100%)",
        }}
      />

      {/* aurora blobs */}
      <div
        className="blob animate-drift-a"
        style={{
          width: "62vw",
          height: "62vw",
          left: "-18%",
          top: "-22%",
          background: "radial-gradient(circle at center, rgba(29,72,180,0.55), transparent 65%)",
        }}
      />
      <div
        className="blob animate-drift-b"
        style={{
          width: "55vw",
          height: "55vw",
          right: "-20%",
          top: "8%",
          background: "radial-gradient(circle at center, rgba(109,40,217,0.32), transparent 65%)",
        }}
      />
      <div
        className="blob animate-drift-c"
        style={{
          width: "48vw",
          height: "48vw",
          left: "16%",
          bottom: "-32%",
          background: "radial-gradient(circle at center, rgba(8,145,178,0.35), transparent 65%)",
        }}
      />
      <div
        className="blob animate-drift-a breathe"
        style={{
          width: "26vw",
          height: "26vw",
          right: "6%",
          bottom: "-6%",
          background: "radial-gradient(circle at center, rgba(219,39,119,0.18), transparent 65%)",
        }}
      />

      {/* perspective grid */}
      <div className="bg-grid absolute inset-0" />

      {/* stars */}
      {stars.map((s, i) => (
        <span
          key={i}
          className="star"
          style={
            {
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              "--dur": `${s.dur}s`,
              "--delay": `${s.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* cursor spotlight */}
      <motion.div className="absolute inset-0" style={{ background: spotlight }} />

      {/* film grain */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: NOISE }}
      />

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 90% at 50% 45%, transparent 52%, rgba(2,4,10,0.78) 100%)",
        }}
      />
    </div>
  );
}

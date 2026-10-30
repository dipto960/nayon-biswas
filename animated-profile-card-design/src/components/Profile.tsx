import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { PROFILE } from "../data";
import { VerifiedBadge } from "./icons";

const HALO_MASK =
  "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2.5px))";
const HALO_MASK_THIN =
  "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1.5px))";

function Clock() {
  const [now, setNow] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Dhaka",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="font-semibold tabular-nums text-white/85">
      {now} <span className="font-normal text-white/40">GMT+6</span>
    </span>
  );
}

export default function Profile() {
  const [burst, setBurst] = useState(0);

  return (
    <div className="flex flex-col items-center text-center">
      {/* ------- Avatar ------- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.55, y: 26 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 150, damping: 16, delay: 0.1 }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.05, rotate: -2 }}
          whileTap={{ scale: 0.94 }}
          onTap={() => setBurst((b) => b + 1)}
          className="relative h-32 w-32 cursor-pointer select-none"
        >
          {/* halo glow */}
          <div
            className="breathe absolute -inset-5 rounded-full opacity-60 blur-2xl"
            style={{
              background:
                "conic-gradient(from 90deg, rgba(87,184,255,.5), rgba(139,124,255,.5), rgba(34,211,238,.4), rgba(87,184,255,.5))",
            }}
          />

          {/* spinning gradient rings */}
          <div
            className="halo-spin absolute -inset-[7px] rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, rgba(87,184,255,.95) 55deg, transparent 130deg, rgba(139,124,255,.95) 200deg, transparent 270deg, rgba(34,211,238,.85) 320deg, transparent 360deg)",
              WebkitMask: HALO_MASK,
              mask: HALO_MASK,
            }}
          />
          <div
            className="halo-spin-rev absolute -inset-[13px] rounded-full opacity-50"
            style={{
              background:
                "conic-gradient(from 180deg, transparent 0deg, rgba(148,184,255,.6) 80deg, transparent 160deg)",
              WebkitMask: HALO_MASK_THIN,
              mask: HALO_MASK_THIN,
            }}
          />

          {/* tap burst */}
          <AnimatePresence>
            {burst > 0 && (
              <motion.span
                key={burst}
                className="absolute -inset-[7px] rounded-full border-2 border-sky-300/70"
                initial={{ opacity: 0.9, scale: 0.9 }}
                animate={{ opacity: 0, scale: 1.7 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>

          {/* plate + photo */}
          <div className="absolute inset-0 rounded-full bg-[#0a1428] p-[3px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)]">
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <img
                src={PROFILE.avatar}
                alt={PROFILE.name}
                className="h-full w-full object-cover"
                draggable={false}
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.15), transparent 32%)",
                }}
              />
            </div>
          </div>

          {/* online dot */}
          <span className="absolute bottom-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#0a1428]">
            <span className="soft-ping absolute h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-emerald-300/30" />
          </span>
        </motion.div>
      </motion.div>

      {/* ------- Name + verified ------- */}
      <div className="mt-7 flex items-center gap-2.5">
        <h1
          className="font-display text-[34px] font-bold leading-none tracking-tight sm:text-[38px]"
          aria-label={PROFILE.name}
        >
          {PROFILE.name.split("").map((c, i) => (
            <motion.span
              key={i}
              className="inline-block bg-gradient-to-b from-white via-white to-sky-200/70 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: 0.35 + i * 0.035,
                type: "spring",
                stiffness: 220,
                damping: 20,
              }}
            >
              {c === " " ? "\u00A0" : c}
            </motion.span>
          ))}
        </h1>
        <motion.span
          initial={{ opacity: 0, scale: 0, rotate: -40 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.85, type: "spring", stiffness: 320, damping: 13 }}
          className="drop-shadow-[0_0_14px_rgba(29,155,240,0.55)]"
        >
          <VerifiedBadge size={27} />
        </motion.span>
      </div>

      {/* ------- Username ------- */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.92, duration: 0.5, ease: "easeOut" }}
        className="mt-2.5 font-display text-[12px] font-medium uppercase tracking-[0.32em] text-sky-300/70"
      >
        @{PROFILE.username}
      </motion.p>

      {/* ------- Bio ------- */}
      <motion.div
        className="mt-3 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[13.5px] text-white/60"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 1 } } }}
      >
        {PROFILE.bio.map((w, i) => (
          <motion.span
            key={w}
            className="flex items-center gap-2.5"
            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
          >
            {i > 0 && <span className="h-1 w-1 rounded-full bg-sky-400/50" />}
            {w}
          </motion.span>
        ))}
      </motion.div>

      {/* ------- Status pill ------- */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, type: "spring", stiffness: 160, damping: 18 }}
        className="mt-5 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11.5px] text-white/65 backdrop-blur-xl"
      >
        <span className="relative flex h-2 w-2 items-center justify-center">
          <span className="soft-ping absolute h-2 w-2 rounded-full bg-emerald-400" />
          <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span className="font-medium text-emerald-300/90">Active now</span>
        <span className="h-3 w-px bg-white/15" />
        <span className="flex items-center gap-1">
          <MapPin size={11} className="text-sky-300/70" />
          {PROFILE.location}
        </span>
        <span className="h-3 w-px bg-white/15" />
        <Clock />
      </motion.div>
    </div>
  );
}

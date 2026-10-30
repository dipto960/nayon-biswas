import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Share2, Sparkles } from "lucide-react";
import Background from "./components/Background";
import Profile from "./components/Profile";
import LinkCard from "./components/LinkCard";
import { LINKS, PROFILE } from "./data";

export default function App() {
  const [toast, setToast] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const share = useCallback(async () => {
    const url = window.location.href;
    const payload = {
      title: `${PROFILE.name} — Connect`,
      text: "Connect with Nayon Biswas everywhere.",
      url,
    };
    if (navigator.share) {
      try {
        await navigator.share(payload);
        return;
      } catch (e) {
        if ((e as DOMException)?.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* clipboard unavailable — still show feedback */
    }
    setToast(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(false), 2200);
  }, []);

  return (
    <div className="relative min-h-dvh w-full text-white antialiased">
      <Background />

      {/* ----- Share button ----- */}
      <motion.button
        onClick={share}
        initial={{ opacity: 0, y: -18, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.6, type: "spring", stiffness: 170, damping: 15 }}
        whileHover={{ scale: 1.1, rotate: 8 }}
        whileTap={{ scale: 0.88 }}
        aria-label="Share this page"
        className="fixed right-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/75 backdrop-blur-xl transition-colors duration-300 hover:border-sky-300/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
        style={{ boxShadow: "0 12px 32px -10px rgba(0,0,0,0.65)" }}
      >
        <Share2 size={17} />
      </motion.button>

      {/* ----- Content ----- */}
      <main className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[470px] flex-col items-center justify-center px-5 pb-14 pt-20">
        <Profile />

        <div className="mt-9 flex w-full flex-col gap-3">
          {LINKS.map((link, i) => (
            <LinkCard key={link.id} link={link} index={i} />
          ))}
        </div>

        {/* ----- Footer ----- */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.15, duration: 0.9, ease: "easeOut" }}
          className="mt-11 flex flex-col items-center gap-2.5"
        >
          <div className="h-px w-28 bg-gradient-to-r from-transparent via-sky-300/40 to-transparent" />
          <p className="flex items-center gap-2 text-[10.5px] font-medium uppercase tracking-[0.38em] text-white/35">
            <Sparkles size={11} className="text-sky-300/60" />
            {PROFILE.username}
            <Sparkles size={11} className="text-sky-300/60" />
          </p>
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/25">
            Tap a card to connect
          </p>
        </motion.footer>
      </main>

      {/* ----- Copied toast ----- */}
      <AnimatePresence>
        {toast && (
          <div className="pointer-events-none fixed inset-x-0 bottom-8 z-40 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 26, scale: 0.9, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 14, scale: 0.94, filter: "blur(4px)" }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="flex items-center gap-2.5 rounded-full border border-emerald-300/25 bg-[#07150f]/90 py-2.5 pl-3 pr-5 text-[13px] font-medium text-emerald-200 shadow-[0_16px_44px_-12px_rgba(16,185,129,0.45)] backdrop-blur-xl"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
                <Check size={13} strokeWidth={3} />
              </span>
              Link copied to clipboard
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

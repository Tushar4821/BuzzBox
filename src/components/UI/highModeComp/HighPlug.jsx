import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Sparkles,
  MessageCircle,
  Star,
  Zap,
  X,
  BadgeIndianRupee,
  Flame,
  Orbit,
  Crown,
} from "lucide-react";
import plugImg from "../../../assets/highmode/deepanshu.jpeg";

function HighPlug() {
  const [isCalling, setIsCalling] = useState(false);

  const handleFakeCall = () => {
    setIsCalling(true);
    setTimeout(() => {
      setIsCalling(false);
    }, 3500);
  };

  const packs = [
    {
      title: "₹200 Vibe Pack",
      desc: "starter energy",
      icon: BadgeIndianRupee,
      glow: "from-pink-500/30 via-fuchsia-500/20 to-cyan-400/30",
      text: "text-pink-100",
    },
    {
      title: "₹300 Ultra Pack",
      desc: "premium nonsense",
      icon: Flame,
      glow: "from-orange-400/30 via-pink-500/20 to-fuchsia-500/30",
      text: "text-orange-100",
    },
    {
      title: "Madangir Maal",
      desc: "galaxy approved",
      icon: Orbit,
      glow: "from-cyan-400/30 via-sky-500/20 to-indigo-500/30",
      text: "text-cyan-100",
    },
    {
      title: "C-block Maal",
      desc: "top tier contact",
      icon: Crown,
      glow: "from-yellow-300/25 via-amber-400/20 to-orange-500/25",
      text: "text-yellow-100",
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-pink-500/10 blur-3xl" />
          <div className="absolute right-10 bottom-10 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-white/5 px-4 py-2 text-sm text-pink-200 backdrop-blur-xl">
              <Sparkles size={16} />
              Special Connection
            </div>

            <h2 className="text-3xl font-black sm:text-4xl md:text-5xl">
              The{" "}
              <span className="bg-linear-to-r from-pink-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                Plug 🔌
              </span>
            </h2>

            <p className="mt-4 text-sm text-white/70 sm:text-base">
              Need vibes? He knows a guy… and somehow it is always him.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:p-8"
          >
            <div className="absolute inset-0 bg-linear-to-br from-pink-500/10 via-transparent to-cyan-400/10" />

            <div className="relative z-10 grid items-center gap-8 md:grid-cols-[0.9fr_1.1fr]">
              {/* image side */}
              <div className="flex justify-center">
                <motion.div
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  className="group relative w-full max-w-xs"
                >
                  <motion.div
                    variants={{
                      rest: { opacity: 0.35, scale: 1 },
                      hover: { opacity: 1, scale: 1.08 },
                    }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0 rounded-[28px] bg-linear-to-r from-pink-500/30 via-fuchsia-400/20 to-cyan-400/30 blur-2xl"
                  />

                  {/* glitch copies */}
                  <motion.img
                    src={plugImg}
                    alt="Deepanshu The Plug"
                    variants={{
                      rest: { x: 0, opacity: 0 },
                      hover: { x: -5, opacity: 0.22 },
                    }}
                    transition={{
                      duration: 0.15,
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                    className="pointer-events-none absolute inset-0 h-72 w-full rounded-[28px] object-contain mix-blend-screen"
                  />

                  <motion.img
                    src={plugImg}
                    alt="Deepanshu The Plug"
                    variants={{
                      rest: { x: 0, opacity: 0 },
                      hover: { x: 5, opacity: 0.18 },
                    }}
                    transition={{
                      duration: 0.12,
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                    className="pointer-events-none absolute inset-0 h-72 w-full rounded-[28px] object-contain mix-blend-lighten"
                  />

                  {/* main image wrapper */}
                  <motion.div
                    variants={{
                      rest: { scale: 1, rotate: 0 },
                      hover: { scale: 1.03, rotate: 1 },
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 h-72 w-full overflow-hidden rounded-[28px] border border-white/10 bg-black/35 shadow-[0_0_40px_rgba(255,0,200,0.18)]"
                  >
                    <img
                      src={plugImg}
                      alt="Deepanshu The Plug"
                      className="h-full w-full object-contain p-2"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]" />
                  </motion.div>

                  <motion.div
                    variants={{
                      rest: { opacity: 0 },
                      hover: { opacity: 0.14 },
                    }}
                    className="pointer-events-none absolute inset-0 z-20 rounded-[28px] bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.25)_50%,transparent_100%)] bg-size-[100%_10px]"
                  />

                  <div className="absolute left-4 top-4 z-30 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                    <Zap size={14} className="text-yellow-300" />
                    Verified Plug
                  </div>
                </motion.div>
              </div>

              {/* content side */}
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-fuchsia-200">
                    <Star size={13} />
                    5.0 vibe rating
                  </span>

                  <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
                    ● online now
                  </span>
                </div>

                <h3 className="text-2xl font-bold sm:text-3xl">
                  Deepanshu aka The Plug
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/70 sm:text-base">
                  Certified vibe supplier. Emergency philosopher. Night saver.
                  Group ka unofficial connection manager since forever.
                </p>

                {/* brighter meme menu */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {packs.map((pack) => {
                    const Icon = pack.icon;
                    return (
                      <motion.div
                        key={pack.title}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className={`group relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.25)]`}
                      >
                        <div
                          className={`absolute inset-0 bg-linear-to-br ${pack.glow} opacity-90 transition duration-300 group-hover:opacity-100`}
                        />
                        <div className="relative z-10 flex items-start gap-3">
                          <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-black/20 backdrop-blur-md">
                            <Icon size={18} className={pack.text} />
                          </div>
                          <div>
                            <p className={`font-bold ${pack.text}`}>
                              {pack.title}
                            </p>
                            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/70">
                              {pack.desc}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={handleFakeCall}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-pink-500 via-fuchsia-500 to-cyan-400 px-6 py-3 font-semibold text-white shadow-lg"
                  >
                    <Phone size={18} />
                    Call The Plug
                  </motion.button>

                  <motion.a
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.03 }}
                    href="https://wa.me/9711189509?text=Bhai%20scene%20ban%20sakta%20hai%20kya%20%F0%9F%98%AD"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-green-400/20 bg-green-500/10 px-6 py-3 font-semibold text-green-200 transition hover:bg-green-500/20"
                  >
                    <MessageCircle size={18} />
                    WhatsApp The Plug
                  </motion.a>
                </div>

                <p className="mt-4 text-xs text-white/45">
                  * Joke section only. Pure meme energy.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {isCalling && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-999 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              className="relative w-full max-w-sm overflow-hidden rounded-[30px] border border-white/10 bg-[#0d0a16]/95 p-6 text-center text-white shadow-[0_30px_100px_rgba(0,0,0,0.6)]"
            >
              <button
                onClick={() => setIsCalling(false)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/80"
              >
                <X size={16} />
              </button>

              <div className="absolute inset-0 bg-linear-to-br from-pink-500/10 via-transparent to-cyan-500/10" />

              <div className="relative z-10">
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="mx-auto mb-5 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-black/30"
                >
                  <img
                    src={plugImg}
                    alt="Calling Deepanshu"
                    className="h-full w-full object-cover object-top"
                  />
                </motion.div>

                <div className="relative mx-auto mb-5 flex h-10 w-10 items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 2.4], opacity: [0.5, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    className="absolute h-10 w-10 rounded-full border border-pink-400/40"
                  />
                  <motion.div
                    animate={{ scale: [1, 2.8], opacity: [0.4, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
                    className="absolute h-10 w-10 rounded-full border border-cyan-400/40"
                  />
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-pink-500 to-cyan-400">
                    <Phone size={16} />
                  </div>
                </div>

                <h3 className="text-2xl font-bold">Calling The Plug...</h3>
                <p className="mt-2 text-sm text-white/65">
                  Deepanshu is checking stock and vibes
                </p>

                <div className="mt-6 flex items-center justify-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-pink-400" />
                  <motion.span
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.1, repeat: Infinity }}
                    className="text-sm text-white/70"
                  >
                    ringing...
                  </motion.span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default HighPlug;
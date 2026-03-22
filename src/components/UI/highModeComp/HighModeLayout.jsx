import React from "react";
import { motion } from "framer-motion";

function HighModeBackground({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08050d] text-white">
      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#08050d_0%,#12091c_25%,#0d1020_50%,#14091a_75%,#08050d_100%)]" />

      {/* Radial psychedelic glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(168,85,247,0.22),transparent_22%),radial-gradient(circle_at_85%_18%,rgba(74,222,128,0.18),transparent_24%),radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.10),transparent_28%),radial-gradient(circle_at_30%_80%,rgba(236,72,153,0.16),transparent_24%),radial-gradient(circle_at_80%_78%,rgba(132,204,22,0.14),transparent_22%)]" />

      {/* Big moving blurred blobs */}
      <motion.div
        className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl"
        animate={{ x: [0, 60, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-15 top-24 h-96 w-96 rounded-full bg-lime-400/18 blur-3xl"
        animate={{ x: [0, -70, 30, 0], y: [0, 50, -20, 0], scale: [1, 0.95, 1.12, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 left-[30%] h-80 w-80 rounded-full bg-cyan-400/12 blur-3xl"
        animate={{ x: [0, 40, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Soft smoke haze */}
      <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.05),transparent_18%),radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.04),transparent_20%),radial-gradient(circle_at_40%_80%,rgba(255,255,255,0.03),transparent_16%)]" />

      {/* Grid glow texture */}
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-size-[44px_44px]" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(24)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white/30"
            style={{
              width: i % 3 === 0 ? 4 : 2,
              height: i % 3 === 0 ? 4 : 2,
              left: `${(i * 4.3) % 100}%`,
              top: `${(i * 6.7) % 100}%`,
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, i % 2 === 0 ? 8 : -8, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 4 + (i % 5),
              delay: i * 0.18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_45%,rgba(0,0,0,0.45)_100%)]" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default HighModeBackground;
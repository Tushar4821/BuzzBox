import React from "react";
import { NavLink } from "react-router-dom";
import { Instagram, Twitter, Github } from "lucide-react";
import { motion } from "framer-motion";

function Footer() {
  const linkClass =
    "text-gray-300 hover:text-white transition duration-300 text-sm";

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-20"
    >
      {/* connector glow line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="h-px bg-linear-to-r from-transparent via-purple-500/40 to-transparent mb-6" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0f]/90 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          {/* soft connected ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-16 left-10 w-52 h-52 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-16 right-10 w-52 h-52 bg-blue-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative grid md:grid-cols-4 gap-10 px-6 py-10 lg:px-10 lg:py-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                BuzzBox
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-300 max-w-xs">
                Your ultimate place for drinking games, party challenges, and fun moments with friends.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Navigation</h3>
              <div className="flex flex-col gap-3">
                <NavLink to="/" className={linkClass}>Home</NavLink>
                <NavLink to="/games" className={linkClass}>Games</NavLink>
                <NavLink to="/challenges" className={linkClass}>Challenges</NavLink>
                <NavLink to="/categories" className={linkClass}>Categories</NavLink>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <div className="flex flex-col gap-3">
                <NavLink to="/about" className={linkClass}>About</NavLink>
                <NavLink to="/contact" className={linkClass}>Contact</NavLink>
                <NavLink to="/privacy" className={linkClass}>Privacy Policy</NavLink>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="p-3 rounded-2xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition duration-300"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  className="p-3 rounded-2xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition duration-300"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="#"
                  className="p-3 rounded-2xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition duration-300"
                >
                  <Github size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="relative border-t border-white/10 bg-black/20 px-6 lg:px-10 py-4 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} BuzzBox. All rights reserved.
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
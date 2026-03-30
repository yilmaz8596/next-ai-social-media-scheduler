"use client";

import { motion } from "framer-motion";

const footer = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Footer() {
  return (
    <motion.footer
      className="bg-slate-900 border-t border-slate-700 mt-16"
      variants={footer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto max-w-7xl px-6 py-10 text-slate-300">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="text-white font-semibold">⚡ SocialCopilot</div>
          <div className="text-slate-400 text-sm">
            Schedule. Publish. Grow Everywhere.
          </div>
        </div>

        <div className="mt-6 text-sm text-slate-500 text-center">
          © {new Date().getFullYear()} SocialCopilot
        </div>
      </div>
    </motion.footer>
  );
}

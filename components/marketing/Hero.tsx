"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute -top-32 -left-32 w-[40rem] h-[40rem] bg-gradient-to-tr from-violet-700 to-indigo-500 opacity-20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.04, 1], rotate: [0, 2, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      <div className="mx-auto max-w-7xl px-6 py-24">
        <motion.div
          className="max-w-3xl text-center mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-sm text-slate-200 mb-4"
            variants={fadeUp}
          >
            <span>✨</span>
            <span>Powered by Gemini AI</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-white leading-tight"
            variants={fadeUp}
          >
            <span>Schedule. Publish.</span>{" "}
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400"
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              Grow Everywhere.
            </motion.span>
          </motion.h1>

          <motion.p className="mt-4 text-slate-300" variants={fadeUp}>
            Plan your posts, automate replies and measure growth across all
            platforms — all from one beautiful dashboard.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
            variants={fadeUp}
          >
            <Link
              href="/sign-up"
              className="px-5 py-3 rounded-md bg-violet-600 text-white"
            >
              Start for Free
            </Link>
            <a
              href="#features"
              className="px-5 py-3 rounded-md border border-slate-700 text-slate-200"
            >
              Watch Demo →
            </a>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-3 text-xs text-slate-300"
            variants={fadeUp}
          >
            {[
              "Instagram",
              "YouTube",
              "TikTok",
              "Facebook",
              "X",
              "LinkedIn",
              "Pinterest",
              "Slack",
            ].map((p) => (
              <motion.span
                key={p}
                className="px-3 py-1 rounded-md bg-slate-800/60"
                whileHover={{ scale: 1.03 }}
              >
                {p}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

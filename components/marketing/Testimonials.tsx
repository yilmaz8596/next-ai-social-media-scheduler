"use client";

import { motion } from "framer-motion";

export default function Testimonials() {
  const items = [
    {
      name: "Ava Martin",
      role: "Social Manager",
      quote: "SocialCopilot cut our posting time in half.",
    },
    {
      name: "Leo Kim",
      role: "Founder",
      quote: "Amazing analytics and cross-posting.",
    },
    {
      name: "Maya Singh",
      role: "Content Creator",
      quote: "The AI captions are a game changer.",
    },
  ];

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const card = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">What customers say</h2>
      </div>

      <motion.div
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {items.map((i) => (
          <motion.div
            key={i.name}
            className="bg-slate-800 p-6 rounded-lg border border-slate-700"
            variants={card}
            whileHover={{ scale: 1.02 }}
          >
            <div className="h-12 w-12 rounded-full bg-slate-700 mb-3" />
            <p className="text-slate-300">“{i.quote}”</p>
            <div className="mt-4 text-sm text-slate-300 font-medium">
              {i.name} <span className="text-slate-400">— {i.role}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

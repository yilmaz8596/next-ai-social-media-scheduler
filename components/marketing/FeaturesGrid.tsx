"use client";

import { motion } from "framer-motion";

const FEATURES = [
  { title: "AI Caption Generator", desc: "Create captions that convert in seconds.", icon: "✍️" },
  { title: "Visual Scheduler", desc: "Drag & drop calendar for perfect timing.", icon: "🗓️" },
  { title: "Auto Comment Reply", desc: "Keep engagement flowing with AI replies.", icon: "💬" },
  { title: "Analytics Dashboard", desc: "Track growth with clear metrics.", icon: "📊" },
  { title: "Media Management", desc: "Organize your assets in one place.", icon: "🖼️" },
  { title: "Instant Publishing", desc: "Publish natively across platforms.", icon: "🚀" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const card = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

export default function FeaturesGrid(){
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">Features</h2>
        <p className="text-slate-300 mt-2">Everything you need to publish and grow.</p>
      </div>

      <motion.div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        {FEATURES.map(f=> (
          <motion.div key={f.title} className="bg-slate-800 rounded-lg p-5 border border-slate-700" variants={card}>
            <div className="w-12 h-12 rounded-md bg-slate-700 flex items-center justify-center text-xl">{f.icon}</div>
            <h3 className="mt-4 text-white font-semibold">{f.title}</h3>
            <p className="mt-2 text-slate-300 text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

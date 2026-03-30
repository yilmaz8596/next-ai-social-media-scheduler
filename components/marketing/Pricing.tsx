"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const card = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

export default function Pricing(){
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-20">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Pricing</h2>
        <p className="text-slate-300 mt-2">Transparent pricing that grows with you.</p>
      </div>

      <motion.div className="mt-10 flex flex-col md:flex-row gap-6 justify-center items-stretch" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <motion.div variants={card} className="w-full md:w-1/3 bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white">Free</h3>
          <p className="text-slate-300 mt-2">$0 / month</p>
          <ul className="mt-4 text-sm text-slate-300 space-y-2">
            <li>3 accounts</li>
            <li>10 posts / month</li>
            <li>Basic analytics</li>
          </ul>
          <Link href="/sign-up" className="mt-6 inline-block px-4 py-2 rounded-md border border-slate-700 text-slate-200">Get Started</Link>
        </motion.div>

        <motion.div variants={card} className="w-full md:w-1/3 bg-slate-800 rounded-lg p-6 border-2 border-violet-500">
          <h3 className="text-lg font-semibold text-white">Premium</h3>
          <p className="text-slate-300 mt-2">$29 / month</p>
          <ul className="mt-4 text-sm text-slate-300 space-y-2">
            <li>Unlimited accounts</li>
            <li>Unlimited posts</li>
            <li>AI features + auto-reply</li>
          </ul>
          <Link href="/sign-up" className="mt-6 inline-block px-4 py-2 rounded-md bg-violet-600 text-white">Upgrade to Premium</Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

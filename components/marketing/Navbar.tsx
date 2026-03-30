"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const header = { hidden: { y: -12, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.45 } } };
const menu = { hidden: { height: 0, opacity: 0 }, show: { height: 'auto', opacity: 1, transition: { duration: 0.25 } } };

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header className="sticky top-0 z-40 backdrop-blur bg-black/30 border-b border-slate-700" variants={header} initial="hidden" animate="show">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-white font-semibold text-lg flex items-center gap-2">
            <span className="text-violet-400">⚡</span>
            <span>SocialCopilot</span>
          </Link>

          <nav className="hidden md:flex gap-4 text-sm text-slate-300">
            <Link href="#features" className="hover:text-white">Features</Link>
            <Link href="#pricing" className="hover:text-white">Pricing</Link>
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <Link href="/docs" className="hover:text-white">Docs</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex gap-2">
            <Link href="/sign-in" className="px-3 py-1 rounded-md border border-slate-700 text-slate-200">Sign In</Link>
            <Link href="/sign-up" className="px-3 py-1 rounded-md bg-violet-600 text-white">Get Started Free</Link>
          </div>

          <button
            className="md:hidden p-2 rounded-md text-slate-200"
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="md:hidden bg-slate-900/70 border-t border-slate-700 overflow-hidden" initial="hidden" animate="show" exit="hidden" variants={menu}>
            <div className="px-6 py-4 flex flex-col gap-3">
              <Link href="#features" onClick={() => setOpen(false)} className="text-slate-200">Features</Link>
              <Link href="#pricing" onClick={() => setOpen(false)} className="text-slate-200">Pricing</Link>
              <Link href="/blog" onClick={() => setOpen(false)} className="text-slate-200">Blog</Link>
              <Link href="/docs" onClick={() => setOpen(false)} className="text-slate-200">Docs</Link>
              <div className="pt-2 border-t border-slate-700 flex gap-2">
                <Link href="/sign-in" onClick={() => setOpen(false)} className="px-3 py-1 rounded-md border border-slate-700 text-slate-200">Sign In</Link>
                <Link href="/sign-up" onClick={() => setOpen(false)} className="px-3 py-1 rounded-md bg-violet-600 text-white">Get Started</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

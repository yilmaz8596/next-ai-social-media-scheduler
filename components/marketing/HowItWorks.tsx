export default function HowItWorks(){
  const STEPS = [
    { title: 'Connect Accounts', desc: 'Link Instagram, YouTube, TikTok, and more.' },
    { title: 'Compose & Schedule', desc: 'Write posts and choose publish times.' },
    { title: 'Publish & Analyze', desc: 'Auto-publish and view analytics.' },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">How It Works</h2>
        <p className="text-slate-300 mt-2">Three simple steps to publish like a pro.</p>
      </div>

      <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {STEPS.map((s, i) => (
          <div key={s.title} className="flex-1 bg-slate-800 rounded-lg p-6 border border-slate-700 text-center">
            <div className="w-10 h-10 mx-auto rounded-full bg-violet-600 flex items-center justify-center font-bold">{i+1}</div>
            <h3 className="mt-4 text-white font-semibold">{s.title}</h3>
            <p className="mt-2 text-slate-300 text-sm">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

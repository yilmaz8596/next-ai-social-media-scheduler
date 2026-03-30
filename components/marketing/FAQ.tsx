"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const QA = [
  {
    q: "How many accounts can I connect?",
    a: "Free plan supports 3 accounts. Premium is unlimited.",
  },
  {
    q: "Can I schedule videos?",
    a: "Yes — native video scheduling is supported.",
  },
  {
    q: "Does SocialCopilot support team members?",
    a: "Yes, invite teammates on Premium.",
  },
  {
    q: "What integrations exist?",
    a: "Instagram, YouTube, TikTok, Facebook, X, LinkedIn, Pinterest, Slack.",
  },
  { q: "Is there a trial?", a: "Start with Free; upgrade anytime." },
];

export default function FAQ() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="text-2xl font-bold text-white">FAQ</h2>
      <p className="text-slate-300 mt-2">Frequently asked questions</p>

      <div className="mt-6">
        <Accordion type="single" collapsible>
          {QA.map((q, i) => (
            <AccordionItem value={`item-${i}`} key={i}>
              <AccordionTrigger>{q.q}</AccordionTrigger>
              <AccordionContent>
                <p className="text-slate-300">{q.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

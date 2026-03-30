import { cn } from "@/lib/utils";
import "../globals.css";

export const metadata = {
  title: "SocialCopilot — Landing",
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={cn("min-h-full", "h-full", "antialiased")}>
      {children}
    </main>
  );
}

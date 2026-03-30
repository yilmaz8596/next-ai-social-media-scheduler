"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export default function ThemeAndToaster() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Toaster position="top-right" />
    </ThemeProvider>
  );
}

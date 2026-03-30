"use client";

import Link from "next/link";
import { Bell } from "@phosphor-icons/react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function HeaderClient({}: {}) {
  const pathname = usePathname() || "/dashboard";

  return (
    <div className="flex items-center gap-4">
      <h2 className="text-lg font-semibold">
        {pathname === "/dashboard" || pathname === "/dashboard/"
          ? "Dashboard"
          : pathname.split("/")[2]?.replace("-", " ") || "Dashboard"}
      </h2>
      <div className="ml-auto flex items-center gap-3">
        <button
          aria-label="Notifications"
          className="p-2 rounded hover:bg-muted"
        >
          <Bell weight="bold" />
        </button>
        <Link
          href="/compose"
          className="btn-primary px-3 py-2 rounded bg-violet-600 text-white"
        >
          New Post
        </Link>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useQuery, useMutation } from "convex/react";

const PLATFORMS = ["instagram","youtube","tiktok","facebook","x","linkedin","pinterest","slack"];

export default function AccountsPage(){
  const accounts = useQuery("socialAccounts.list", {});
  const remove = useMutation("socialAccounts.remove");
  const upsert = useMutation("socialAccounts.upsert");

  useEffect(() => {
    try {
      const hash = window.location.hash;
      if (!hash) return;
      const params = new URLSearchParams(hash.replace(/^#/, ""));
      if (params.get("oauth") !== "success") return;

      const platform = params.get("platform") || undefined;
      const accountName = params.get("accountName") || "";
      const accountHandle = params.get("accountHandle") || "";
      const avatarUrl = params.get("avatarUrl") || undefined;
      const accessToken = params.get("accessToken") || undefined;
      const refreshToken = params.get("refreshToken") || undefined;
      const expiresAt = params.get("expiresAt") ? Number(params.get("expiresAt")) : undefined;

      if (!platform) return;

      upsert({ platform, accountName, accountHandle, avatarUrl, accessToken, refreshToken, expiresAt });

      // clear fragment
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    } catch (err) {
      console.error("Error processing OAuth fragment", err);
    }
  }, [upsert]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-bold text-white">Connected Accounts</h1>
      <p className="text-slate-300 mt-2">Connect your social accounts to schedule and publish.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {PLATFORMS.map(p=> {
          const acc = accounts?.find(a=> a.platform === p);
          return (
            <div key={p} className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white capitalize">{p}</div>
                {acc ? (
                  <div className="text-slate-300 text-sm">{acc.accountHandle}</div>
                ) : (
                  <div className="text-slate-400 text-sm">Not connected</div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {acc ? (
                  <>
                    <button className="px-3 py-1 rounded-md border border-slate-700 text-slate-200" onClick={() => window.location.href = `/api/oauth/${p}/init`}>Reconnect</button>
                    <button className="px-3 py-1 rounded-md bg-red-600 text-white" onClick={() => remove({ id: acc._id })}>Disconnect</button>
                  </>
                ) : (
                  <button className="px-3 py-1 rounded-md bg-violet-600 text-white" onClick={() => window.location.href = `/api/oauth/${p}/init`}>Connect</button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {accounts && accounts.length === 0 && (
        <div className="mt-8 text-center text-slate-400">No accounts connected yet.</div>
      )}
    </div>
  )
}

import { NextResponse } from "next/server";

async function parseFormEncoded(res: Response) {
  const text = await res.text();
  return Object.fromEntries(new URLSearchParams(text));
}

export async function GET(req: Request, { params }: { params: { platform: string } }) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const platform = params.platform;

  const cookies = req.headers.get("cookie") || "";
  const stateCookie = cookies.split(";").map(s=>s.trim()).find(s=>s.startsWith("oauth_state="));
  const cookieState = stateCookie ? stateCookie.split("=")[1] : null;

  if (!code || !state || state !== cookieState) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/dashboard/accounts#oauth=error`);
  }

  try {
    let tokenResp: any = null;
    let accountInfo: any = {};

    if (platform === "x") {
      // Exchange code for token (Twitter OAuth2). Note: PKCE may be required in production.
      const tokenUrl = "https://api.twitter.com/2/oauth2/token";
      const clientId = process.env.OAUTH_X_CLIENT_ID;
      const clientSecret = process.env.OAUTH_X_CLIENT_SECRET;

      const resp = await fetch(tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          client_id: clientId,
          redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/oauth/x/callback`,
          // code_verifier omitted for starter
        }),
      });

      tokenResp = await resp.json();

      // fetch user info
      if (tokenResp.access_token) {
        const userResp = await fetch("https://api.twitter.com/2/users/me", {
          headers: { Authorization: `Bearer ${tokenResp.access_token}` },
        });
        const userJson = await userResp.json();
        accountInfo = {
          accountName: userJson.data?.name || "",
          accountHandle: userJson.data?.username || "",
          avatarUrl: null,
        };
      }
    } else if (platform === "linkedin") {
      const tokenUrl = "https://www.linkedin.com/oauth/v2/accessToken";
      const clientId = process.env.OAUTH_LINKEDIN_CLIENT_ID;
      const clientSecret = process.env.OAUTH_LINKEDIN_CLIENT_SECRET;

      const resp = await fetch(tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/oauth/linkedin/callback`, client_id: clientId, client_secret: clientSecret }),
      });

      tokenResp = await resp.json();

      if (tokenResp.access_token) {
        const profile = await fetch("https://api.linkedin.com/v2/me", { headers: { Authorization: `Bearer ${tokenResp.access_token}` } });
        const profileJson = await profile.json();
        accountInfo = {
          accountName: profileJson.localizedFirstName + " " + (profileJson.localizedLastName || ""),
          accountHandle: profileJson.id,
          avatarUrl: null,
        };
      }
    } else {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/dashboard/accounts#oauth=error`);
    }

    const fragment = new URLSearchParams({
      oauth: "success",
      platform,
      accountName: accountInfo.accountName || "",
      accountHandle: accountInfo.accountHandle || "",
      avatarUrl: accountInfo.avatarUrl || "",
      accessToken: tokenResp?.access_token || "",
      refreshToken: tokenResp?.refresh_token || "",
      expiresAt: tokenResp?.expires_in ? String(Math.floor(Date.now()/1000) + Number(tokenResp.expires_in)) : "",
    }).toString();

    // clear state cookie
    const redirect = NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/dashboard/accounts#${fragment}`);
    redirect.headers.set("Set-Cookie", `oauth_state=deleted; Path=/; Max-Age=0`);
    return redirect;
  } catch (err) {
    console.error(err);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/dashboard/accounts#oauth=error`);
  }
}

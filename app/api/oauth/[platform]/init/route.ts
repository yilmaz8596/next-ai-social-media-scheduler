import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { platform: string } }) {
  const platform = params.platform;
  const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const state = Math.random().toString(36).slice(2);
  // store state in a cookie for CSRF protection
  const redirectUri = `${origin}/api/oauth/${platform}/callback`;

  let authUrl = "";
  if (platform === "x") {
    const clientId = process.env.OAUTH_X_CLIENT_ID;
    const scope = encodeURIComponent("tweet.read tweet.write users.read offline.access");
    authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state}&code_challenge=challenge&code_challenge_method=plain`;
  } else if (platform === "linkedin") {
    const clientId = process.env.OAUTH_LINKEDIN_CLIENT_ID;
    const scope = encodeURIComponent("w_member_social r_liteprofile r_emailaddress");
    authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state}`;
  } else {
    return NextResponse.json({ error: "Unsupported platform" }, { status: 400 });
  }

  const res = NextResponse.redirect(authUrl);
  res.headers.set("Set-Cookie", `oauth_state=${state}; Path=/; HttpOnly; SameSite=Lax; Max-Age=300`);
  return res;
}

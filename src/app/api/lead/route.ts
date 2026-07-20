import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Simple in-memory rate limiter (per instance). For production scale, back
// this with a shared store (e.g. Upstash Redis).
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // Honeypot: real users never fill this.
  if ((form.get("company") as string)?.trim()) {
    // Pretend success so bots do not learn anything.
    return NextResponse.json({ ok: true });
  }

  const name = (form.get("name") as string)?.trim();
  const phone = (form.get("phone") as string)?.trim();

  if (!name || !phone || name.length > 200 || phone.length > 40) {
    return NextResponse.json({ error: "invalid" }, { status: 422 });
  }

  const lead: Record<string, string> = { formType: "unknown" };
  for (const [key, value] of form.entries()) {
    if (key === "company") continue;
    if (typeof value === "string") {
      lead[key] = value.slice(0, 4000);
    } else {
      lead[key] = `[file] ${value.name} (${value.size} bytes)`;
    }
  }

  // TODO: connect to a real destination (email via Resend, Airtable, Notion,
  // or a CRM). For now the lead is logged server-side so nothing is lost.
  console.log("[lead]", JSON.stringify({ ip, ...lead }));

  return NextResponse.json({ ok: true });
}

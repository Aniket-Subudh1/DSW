import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import path from "path";
import nodemailer from "nodemailer";

function sanitize(val: unknown): string {
  if (typeof val !== "string") return "";
  return val.trim().slice(0, 1000).replace(/[<>]/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = sanitize(body.name);
    const email = sanitize(body.email);
    const company = sanitize(body.company);
    const role = sanitize(body.role);
    const type = sanitize(body.type);
    const phone = sanitize(body.phone);
    const revenue = sanitize(body.revenue);
    const stage = sanitize(body.stage);
    const linkedin = sanitize(body.linkedin);
    const message = sanitize(body.message);

    if (!name || !email || !company || !role) {
      return NextResponse.json(
        { error: "Name, email, company and role are required." },
        { status: 400 }
      );
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const submission = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type: type || "enterprise",
      name,
      email,
      company,
      role,
      ...(phone && { phone }),
      ...(revenue && { revenue }),
      ...(stage && { stage }),
      ...(linkedin && { linkedin }),
      ...(message && { message }),
      submittedAt: new Date().toISOString(),
    };

    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "submissions.json");

    await mkdir(dataDir, { recursive: true });

    let submissions: unknown[] = [];
    try {
      const existing = await readFile(filePath, "utf-8");
      const parsed = JSON.parse(existing);
      if (Array.isArray(parsed)) submissions = parsed;
    } catch {
    }

    submissions.push(submission);
    await writeFile(filePath, JSON.stringify(submissions, null, 2), "utf-8");

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT ?? 465);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const notifyTo = process.env.NOTIFY_TO ?? smtpUser;

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });

      const rows = [
        ["Name", name],
        ["Email", email],
        ["Company", company],
        ["Role", role],
        ...(phone ? [["Phone", phone]] : []),
        ...(revenue ? [["Revenue", revenue]] : []),
        ...(stage ? [["Stage", stage]] : []),
        ...(linkedin ? [["LinkedIn", linkedin]] : []),
        ...(message ? [["Message", message]] : []),
        ["Submission ID", submission.id],
        ["Submitted At", submission.submittedAt],
      ] as [string, string][];

      const tableRows = rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 12px;font-weight:600;color:#aaa;white-space:nowrap;border-bottom:1px solid #222;">${k}</td>` +
            `<td style="padding:6px 12px;color:#fff;border-bottom:1px solid #222;">${v}</td></tr>`
        )
        .join("");

      const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:system-ui,sans-serif;">
  <div style="max-width:580px;margin:32px auto;background:#111;border:1px solid #222;border-radius:12px;overflow:hidden;">
    <div style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);padding:24px 28px;border-bottom:1px solid #222;">
      <p style="margin:0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#555;">Devsomeware</p>
      <h1 style="margin:6px 0 0;font-size:20px;color:#fff;">New Contact Submission</h1>
    </div>
    <div style="padding:20px 0;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${tableRows}
      </table>
    </div>
    <div style="padding:16px 28px;border-top:1px solid #222;">
      <a href="mailto:${email}" style="display:inline-block;padding:10px 20px;background:#fff;color:#000;border-radius:8px;font-weight:600;font-size:13px;text-decoration:none;">Reply to ${name}</a>
    </div>
  </div>
</body>
</html>`;

      await transporter.sendMail({
        from: `"Devsomeware Contact" <${smtpUser}>`,
        to: notifyTo,
        replyTo: email,
        subject: `[DSW] New enquiry from ${name} — ${company}`,
        html,
      });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact/route] error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

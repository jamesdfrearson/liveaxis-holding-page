type ThankYouEmailOptions = {
  name?: string;
  unsubscribeUrl?: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function createThankYouEmail({
  name,
  unsubscribeUrl,
}: ThankYouEmailOptions) {
  const safeName = name ? escapeHtml(name.trim()) : "";
  const greeting = safeName ? `Hi ${safeName},` : "Hi,";

  const subject = "Thanks for registering your interest in LiveAxis";

  const text = `${greeting}

Thank you for registering your interest in LiveAxis.

LiveAxis is being built with a clear long-term goal: to create secure, transparent and practical tools that help businesses deliver better customer experiences.

Our focus is particularly rooted in the live entertainment and venue space, where customer experience, reliability and operational simplicity really matter. But the same principles apply to any business that wants technology to feel useful, approachable and trustworthy — not complicated for the sake of it.

Retina is our first product.

It is a digital signage platform designed to support everyone from small businesses that need a simple, affordable way to manage a few screens, through to larger organisations and enterprises that need more control, flexibility and reliability.

The aim is not just to build another signage platform. The aim is to build something that businesses can genuinely trust — with transparency, security and care at the forefront of every decision.

We want Retina to be:

simple enough for everyday teams to use
flexible enough to grow with a business
secure by design
transparent in pricing and approach
reliable in real-world environments
focused on helping businesses create better customer experiences

This is still the beginning of the journey, so your early interest genuinely means a lot. Every registration helps shape what LiveAxis and Retina become, and helps us better understand what businesses actually need from a modern signage platform.

I’ll share more as things progress, including early previews, trial opportunities and updates on how the platform is coming together.

Thanks again for being one of the first people to show interest.

James Frearson
Founder, LiveAxis

support@liveaxis.co.uk
https://liveaxis.co.uk${
    unsubscribeUrl
      ? `

You can unsubscribe from updates here:
${unsubscribeUrl}`
      : ""
  }`;

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${subject}</title>
  </head>
  <body style="margin:0;background:#f4f4f2;font-family:Arial,Helvetica,sans-serif;color:#171717;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f2;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e7e5df;">
            <tr>
              <td style="padding:34px 34px 24px;">
                <h1 style="margin:0 0 18px;font-size:28px;line-height:1.2;color:#171717;font-weight:700;">
                  Thank you for registering your interest.
                </h1>

                <p style="margin:0 0 22px;font-size:16px;line-height:1.65;color:#3a3936;">
                  ${greeting}
                </p>

                <p style="margin:0 0 18px;font-size:16px;line-height:1.65;color:#3a3936;">
                  Thank you for registering your interest in <strong>LiveAxis</strong>.
                </p>

                <p style="margin:0 0 18px;font-size:16px;line-height:1.65;color:#3a3936;">
                  LiveAxis is being built with a clear long-term goal: to create secure, transparent and practical tools that help businesses deliver better customer experiences.
                </p>

                <p style="margin:0 0 18px;font-size:16px;line-height:1.65;color:#3a3936;">
                 Our focus is particularly rooted in the live entertainment and venue space, where customer experience, reliability and operational simplicity really matter. But the same principles apply to any business that wants technology to feel useful, approachable and trustworthy - not complicated for the sake of it.
                </p>

                <p style="margin:0 0 22px;font-size:16px;line-height:1.65;color:#3a3936;">
                 Retina is our first product.
                </p>

                <p style="margin:0 0 22px;font-size:16px;line-height:1.65;color:#3a3936;">
                 It is a digital signage platform designed to support everyone from small businesses that need a simple, affordable way to manage a few screens, through to larger organisations and enterprises that need more control, flexibility and reliability.
                </p>

                <p style="margin:0 0 22px;font-size:16px;line-height:1.65;color:#3a3936;">
                  The aim is not just to build another signage platform. The aim is to build something that businesses can genuinely trust - with transparency, security and care at the forefront of every decision.
                </p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8f7f4;border-radius:14px;margin:26px 0;">
                  <tr>
                    <td style="padding:22px 24px;">
                      <p style="margin:0 0 12px;font-size:15px;font-weight:700;color:#171717;">
                        We want Retina to be:
                      </p>

                      <ul style="margin:0;padding-left:20px;color:#3a3936;font-size:15px;line-height:1.7;">
                        <li>simple enough for everyday teams to use</li>
                        <li>flexible enough to grow with a business</li>
                        <li>secure by design</li>
                        <li>transparent in pricing and approach</li>
                        <li>reliable in real-world environments</li>
                        <li>focused on helping businesses create better customer experiences</li>
                      </ul>
                    </td>
                  </tr>
                </table>

                <p style="margin:0 0 18px;font-size:16px;line-height:1.65;color:#3a3936;">
                  This is still the beginning of the journey, so your early interest genuinely means a lot. Every registration helps shape what LiveAxis and Retina become, and helps us better understand what businesses actually need from a modern signage platform.
                </p>

                <p style="margin:0 0 18px;font-size:16px;line-height:1.65;color:#3a3936;">
                  I’ll share more as things progress, including early previews, trial opportunities and updates on how the platform is coming together.
                </p>


                <p style="margin:0 0 28px;font-size:16px;line-height:1.65;color:#3a3936;">
                  Thanks again for being one of the first people to show interest.
                </p>

                <p style="margin:0;font-size:16px;line-height:1.6;color:#171717;">
                  <strong>James Frearson</strong><br />
                  Founder, LiveAxis
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:22px 34px;background:#171717;color:#d8d6cf;">
                <p style="margin:0 0 8px;font-size:13px;line-height:1.6;">
                  LiveAxis
                </p>

                <p style="margin:0;font-size:13px;line-height:1.6;">
                  <a href="https://liveaxis.co.uk" style="color:#ffffff;text-decoration:none;">liveaxis.co.uk</a>
                  &nbsp;·&nbsp;
                  <a href="mailto:support@liveaxis.co.uk" style="color:#ffffff;text-decoration:none;">support@liveaxis.co.uk</a>
                </p>

                ${
                  unsubscribeUrl
                    ? `<p style="margin:14px 0 0;font-size:12px;line-height:1.6;color:#aaa79f;">
                        You can <a href="${escapeHtml(unsubscribeUrl)}" style="color:#ffffff;">unsubscribe from updates</a> at any time.
                      </p>`
                    : ""
                }
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return {
    subject,
    text,
    html,
  };
}

import { serve } from 'https://deno.land/std@0.192.0/http/server.ts';

serve(async (req) => {
  const { userEmails, classTitle } = await req.json();

  const apiKey = Deno.env.get('SENDGRID_API_KEY');
  const fromEmail = Deno.env.get('SENDGRID_FROM_EMAIL');

  if (!apiKey || !fromEmail) {
    return new Response('Missing SendGrid environment variables', { status: 500 });
  }

  const emailBody = {
    personalizations: userEmails.map((email: string) => ({
      to: [{ email }],
      subject: `Class "${classTitle}" Cancellation Notice`,
    })),
    from: { email: fromEmail },
    content: [
      {
        type: 'text/plain',
        value: `Hello,\n\nWe regret to inform you that the class "${classTitle}" you booked has been canceled by the instructor.\n\nThank you for understanding.\n\n- YOGIO Team`,
      },
    ],
  };

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailBody),
  });

  if (response.ok) {
    return new Response(JSON.stringify({ message: 'Emails sent successfully!' }), {
      status: 200,
    });
  } else {
    const errorText = await response.text();
    return new Response(`Failed to send email: ${errorText}`, { status: 500 });
  }
});
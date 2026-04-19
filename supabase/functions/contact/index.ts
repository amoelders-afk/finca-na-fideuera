import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const body = await req.json();
    const { name, email, von, bis, personen, nachricht } = body;

    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "Name und E-Mail sind erforderlich" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const recipient = "sarah.hofer0608@gmail.com";

    const html = `
      <h2 style="font-family:sans-serif">Neue Anfrage — Finca Na Fideuera</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>E-Mail:</strong> ${email}</p>
      ${von ? `<p><strong>Anreise:</strong> ${von}</p>` : ""}
      ${bis ? `<p><strong>Abreise:</strong> ${bis}</p>` : ""}
      ${personen ? `<p><strong>Personen:</strong> ${personen}</p>` : ""}
      ${nachricht ? `<p><strong>Nachricht:</strong><br>${nachricht.replace(/\n/g, "<br>")}</p>` : ""}
    `;

    const text = [
      `Neue Anfrage von ${name}`,
      `E-Mail: ${email}`,
      von ? `Anreise: ${von}` : "",
      bis ? `Abreise: ${bis}` : "",
      personen ? `Personen: ${personen}` : "",
      nachricht ? `Nachricht: ${nachricht}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const messageId = crypto.randomUUID();

    const { error } = await supabase.rpc("enqueue_email", {
      queue_name: "transactional_emails",
      payload: {
        message_id: messageId,
        to: recipient,
        from: "Finca Na Fideuera <noreply@notify.finca-na-fideuera.de>",
        sender_domain: "notify.finca-na-fideuera.de",
        subject: `Neue Anfrage von ${name}`,
        html,
        text,
        purpose: "transactional",
        label: "contact-inquiry",
        idempotency_key: `contact-${messageId}`,
        queued_at: new Date().toISOString(),
      },
    });

    if (error) {
      console.error("Enqueue failed", error);
      return new Response(
        JSON.stringify({ error: "E-Mail konnte nicht gesendet werden" }),
        { status: 502, headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err) {
    console.error("Contact API error", err);
    return new Response(JSON.stringify({ error: "Interner Fehler" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});

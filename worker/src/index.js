export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return handleOptions(request, env);
    }

    if (
      request.method === "POST" &&
      new URL(request.url).pathname === "/api/subscribe"
    ) {
      return handleSubscribe(request, env);
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  },
};

function isAllowedOrigin(origin, env) {
  if (!origin) return false;
  if (origin === env.ALLOWED_ORIGIN) return true;
  if (origin.endsWith(".adngx.pages.dev")) return true;
  return false;
}

function handleOptions(request, env) {
  const origin = request.headers.get("Origin");
  if (!isAllowedOrigin(origin, env)) {
    return new Response(null, { status: 403 });
  }
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

async function handleSubscribe(request, env) {
  try {
    const origin = request.headers.get("Origin");
    const corsHeaders = {
      "Access-Control-Allow-Origin": origin || env.ALLOWED_ORIGIN,
      "Content-Type": "application/json",
    };

    if (!isAllowedOrigin(origin, env)) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: corsHeaders,
      });
    }

    let body;
    try {
      const rawBody = await request.text();
      body = JSON.parse(rawBody);
    } catch (e) {
      return new Response(
        JSON.stringify({ error: "Invalid JSON", message: e.message }),
        {
          status: 400,
          headers: corsHeaders,
        },
      );
    }

    const email = body.email_address;
    const honeypot = body.hp_field;

    if (honeypot) {
      return new Response(JSON.stringify({ message: "OK" }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const rateLimitKey = `rate:${ip}`;

    let count = 0;
    try {
      const current = await env.NEWSLETTER_KV.get(rateLimitKey);
      count = current ? parseInt(current, 10) : 0;
    } catch (e) {
      console.error("KV read error:", e);
    }

    if (count >= 5) {
      return new Response(JSON.stringify({ error: "Too many requests" }), {
        status: 429,
        headers: corsHeaders,
      });
    }

    try {
      await env.NEWSLETTER_KV.put(rateLimitKey, String(count + 1), {
        expirationTtl: 60,
      });
    } catch (e) {
      console.error("KV write error:", e);
    }

    const buttondownResponse = await fetch(
      "https://api.buttondown.com/v1/subscribers",
      {
        method: "POST",
        headers: {
          Authorization: `Token ${env.BUTTONDOWN_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          ip_address: ip,
        }),
      },
    );

    if (buttondownResponse.ok || buttondownResponse.status === 409) {
      return new Response(JSON.stringify({ message: "Subscriber created" }), {
        status: 201,
        headers: corsHeaders,
      });
    }

    const errorText = await buttondownResponse.text();
    console.error("Buttondown error:", buttondownResponse.status, errorText);

    return new Response(
      JSON.stringify({
        error: "Upstream error",
        status: buttondownResponse.status,
        detail: errorText,
      }),
      {
        status: 500,
        headers: corsHeaders,
      },
    );
  } catch (e) {
    console.error("Unhandled error:", e);
    return new Response(
      JSON.stringify({ error: "Internal error", message: e.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

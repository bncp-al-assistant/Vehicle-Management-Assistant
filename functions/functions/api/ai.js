import {checkAuth, unauthorized, corsHeaders} from "../_utils.js";

export async function onRequestOptions() {
  return new Response(null, {status: 204, headers: corsHeaders()});
}

export async function onRequestPost(context) {
  const {request, env} = context;
  if (!checkAuth(request, env)) return unauthorized();

  try {
    const body = await request.text();
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body,
    });

    const data = await upstream.text();
    return new Response(data, {
      status: upstream.status,
      headers: {"Content-Type": "application/json", ...corsHeaders()},
    });
  } catch (err) {
    return new Response(JSON.stringify({error: err.message}), {
      status: 500,
      headers: {"Content-Type": "application/json", ...corsHeaders()},
    });
  }
}

import {checkAuth, unauthorized, corsHeaders} from "../_utils.js";

const KV_KEY = "assets-data";

export async function onRequestOptions() {
  return new Response(null, {status: 204, headers: corsHeaders()});
}

export async function onRequestGet(context) {
  const {request, env} = context;
  if (!checkAuth(request, env)) return unauthorized();

  const value = await env.ASSETS_KV.get(KV_KEY);
  return new Response(value || "{}", {
    headers: {"Content-Type": "application/json", ...corsHeaders()},
  });
}

export async function onRequestPost(context) {
  const {request, env} = context;
  if (!checkAuth(request, env)) return unauthorized();

  try {
    const body = await request.text();
    JSON.parse(body);
    await env.ASSETS_KV.put(KV_KEY, body);
    return new Response(JSON.stringify({ok: true}), {
      headers: {"Content-Type": "application/json", ...corsHeaders()},
    });
  } catch (err) {
    return new Response(JSON.stringify({error: err.message}), {
      status: 400,
      headers: {"Content-Type": "application/json", ...corsHeaders()},
    });
  }
}

/**
 * 이 Worker 하나가 세 가지 역할을 합니다:
 * 1. /api/assets  → 차량 데이터 저장/조회 (Cloudflare KV)
 * 2. /api/ai      → Anthropic API 중계 (API 키는 여기(서버)에만 보관)
 * 3. 그 외 모든 요청 → public/index.html 등 정적 파일 그대로 응답
 */

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-app-token",
};

const KV_KEY = "assets-data";

function checkAuth(request, env) {
  const token = request.headers.get("x-app-token") || "";
  return Boolean(env.APP_ACCESS_TOKEN) && token === env.APP_ACCESS_TOKEN;
}

function unauthorized() {
  return new Response(JSON.stringify({error: "인증 실패 (접속 코드를 확인하세요)"}), {
    status: 401,
    headers: {"Content-Type": "application/json", ...CORS_HEADERS},
  });
}

function jsonResponse(data, status = 200) {
  return new Response(typeof data === "string" ? data : JSON.stringify(data), {
    status,
    headers: {"Content-Type": "application/json", ...CORS_HEADERS},
  });
}

async function handleAssetsGet(env) {
  const value = await env.ASSETS_KV.get(KV_KEY);
  return jsonResponse(value || "{}");
}

async function handleAssetsPost(request, env) {
  try {
    const body = await request.text();
    JSON.parse(body); // 유효한 JSON인지 확인
    await env.ASSETS_KV.put(KV_KEY, body);
    return jsonResponse({ok: true});
  } catch (err) {
    return jsonResponse({error: err.message}, 400);
  }
}

async function handleAI(request, env) {
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
      headers: {"Content-Type": "application/json", ...CORS_HEADERS},
    });
  } catch (err) {
    return jsonResponse({error: err.message}, 500);
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === "OPTIONS" && url.pathname.startsWith("/api/")) {
      return new Response(null, {status: 204, headers: CORS_HEADERS});
    }

    if (url.pathname === "/api/assets") {
      if (!checkAuth(request, env)) return unauthorized();
      if (request.method === "GET") return handleAssetsGet(env);
      if (request.method === "POST") return handleAssetsPost(request, env);
      return jsonResponse({error: "Method Not Allowed"}, 405);
    }

    if (url.pathname === "/api/ai") {
      if (!checkAuth(request, env)) return unauthorized();
      if (request.method === "POST") return handleAI(request, env);
      return jsonResponse({error: "Method Not Allowed"}, 405);
    }

    // 그 외 요청은 정적 자산(public/index.html 등)으로 처리
    return env.ASSETS.fetch(request);
  },
};

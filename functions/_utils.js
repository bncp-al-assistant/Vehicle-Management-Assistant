export function checkAuth(request, env) {
  const token = request.headers.get("x-app-token") || "";
  return Boolean(env.APP_ACCESS_TOKEN) && token === env.APP_ACCESS_TOKEN;
}

export function unauthorized() {
  return new Response(JSON.stringify({error: "인증 실패 (접속 코드를 확인하세요)"}), {
    status: 401,
    headers: {"Content-Type": "application/json"},
  });
}

export function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-app-token",
  };
}

// =====================================================================
//   ✏️  현이네 가족 스케줄 — 여기만 수정하세요  ✏️
//   - 쉼표(,)와 큰따옴표("")를 빠뜨리지 마세요.
//   - Cloudflare "편집 코드"에서 고친 뒤 오른쪽 위 [배포]를 누르면 바로 반영됩니다.
//   - 일정·픽업·메모는 평소에 홈페이지 화면에서 바로 고치면 됩니다.
// =====================================================================

const FAMILY = "현이네";

// 가족 구성원 (색상은 바꿔도 됩니다) — kid: true 인 사람만 픽업 대상으로 나와요
const MEMBERS = [
  { name: "엄마", grade: "",         color: "#C8578C" },
  { name: "아빠", grade: "",         color: "#5B6B8C" },
  { name: "서현", grade: "고등학생", color: "#E0664F", kid: true },
  { name: "세현", grade: "중학생",   color: "#3C78B4", kid: true },
  { name: "준현", grade: "초등학생", color: "#2A9A7E", kid: true },
  { name: "가족", grade: "",         color: "#8A6BBE" },
];

// 📅 월간 스케줄 — 맨 처음 시작할 때만 쓰여요. 이후에는 홈페이지 달력에서 추가·수정합니다.
//    date: "년-월-일", time은 없으면 빼도 됩니다(종일)
const EVENTS = [
  { date: "2026-11-07", time: "18:00", who: "가족", title: "(예시) 가족 외식" },
  { date: "2026-11-12", who: "준현", title: "(예시) 현장체험학습" },
  { date: "2026-11-17", who: "세현", title: "(예시) 영어 말하기 대회" },
  { date: "2026-11-21", time: "11:00", who: "가족", title: "(예시) 할머니댁 방문" },
  { date: "2026-11-25", time: "16:00", who: "서현", title: "(예시) 학부모 상담" },
  { date: "2026-12-24", who: "가족", title: "(예시) 크리스마스 이브 가족여행" },
];

// 🚗 주간 픽업 스케줄 (매주 반복, 월~토) — 준현 주간 시간표 기준
//    평소에는 홈페이지 화면에서 바로 고치세요.
//    이 목록으로 홈페이지 픽업표를 통째로 바꾸려면 PICKUP_VERSION 숫자를 1 올리고 배포하세요.
const PICKUP_VERSION = 2;
const PICKUPS = [
  { day: "월", time: "14:30", who: "준현", place: "학교 하교" },
  { day: "월", time: "20:40", who: "준현", place: "수학 학원 (18:00~20:40)" },
  { day: "화", time: "14:30", who: "준현", place: "학교 하교 → 영어 학원 15:00" },
  { day: "화", time: "18:30", who: "준현", place: "국어 학원 (17:00~18:30)" },
  { day: "수", time: "13:50", who: "준현", place: "학교 하교" },
  { day: "수", time: "20:40", who: "준현", place: "수학 학원 (18:00~20:40)" },
  { day: "목", time: "14:30", who: "준현", place: "학교 하교 → 영어 학원 15:00" },
  { day: "목", time: "18:30", who: "준현", place: "국어 학원 (17:00~18:30)" },
  { day: "금", time: "14:30", who: "준현", place: "학교 하교" },
  { day: "금", time: "20:40", who: "준현", place: "수학 학원 (18:00~20:40)" },
  { day: "토", time: "13:00", who: "준현", place: "영어 학원 (11:00~13:00)" },
];

// 공휴일 말고도 픽업이 없는 날 (방학, 재량휴업일 등)
const NO_PICKUP_DAYS = [
  // "2026-12-31",
];

// 공휴일에도 픽업을 표시하려면 false로 바꾸세요
const SKIP_PICKUP_ON_HOLIDAYS = true;

// 가족 메모 — 맨 처음 시작할 때만 쓰여요. 이후에는 홈페이지에서 추가·삭제합니다.
const NOTES = [
  "화·목은 하교 후 영어 학원까지 30분이에요. 영어 끝나면 바로 국어 학원으로 이동해요.",
];

// 🇰🇷 대한민국 공휴일 (대체공휴일 포함). 2028년 이후는 같은 형식으로 추가하세요.
const HOLIDAYS = {
  "2026-01-01":"신정","2026-02-16":"설날 연휴","2026-02-17":"설날","2026-02-18":"설날 연휴",
  "2026-03-01":"삼일절","2026-03-02":"대체공휴일","2026-05-01":"노동절","2026-05-05":"어린이날",
  "2026-05-24":"부처님오신날","2026-05-25":"대체공휴일","2026-06-03":"지방선거","2026-06-06":"현충일",
  "2026-07-17":"제헌절","2026-08-15":"광복절","2026-08-17":"대체공휴일","2026-09-24":"추석 연휴",
  "2026-09-25":"추석","2026-09-26":"추석 연휴","2026-10-03":"개천절","2026-10-05":"대체공휴일",
  "2026-10-09":"한글날","2026-12-25":"성탄절",
  "2027-01-01":"신정","2027-02-06":"설날 연휴","2027-02-07":"설날","2027-02-08":"설날 연휴",
  "2027-02-09":"대체공휴일","2027-03-01":"삼일절","2027-05-01":"노동절","2027-05-03":"대체공휴일",
  "2027-05-05":"어린이날","2027-05-13":"부처님오신날","2027-06-06":"현충일","2027-07-17":"제헌절",
  "2027-07-19":"대체공휴일","2027-08-15":"광복절","2027-08-16":"대체공휴일","2027-09-14":"추석 연휴",
  "2027-09-15":"추석","2027-09-16":"추석 연휴","2027-10-03":"개천절","2027-10-04":"대체공휴일",
  "2027-10-09":"한글날","2027-10-11":"대체공휴일","2027-12-25":"성탄절","2027-12-27":"대체공휴일",
};

// 💬 카카오톡 알림 — 매일 밤 10시(한국시간, wrangler.jsonc의 crons) 다음날 월간 스케줄 일정을 보내요 (픽업 제외)
//    받는 사람은 홈페이지 맨 아래 "카카오톡 알림"에서 각자 한 번 연결합니다.
const KAKAO_RECEIVERS = ["엄마", "아빠"];

// ===================== 여기 아래는 수정하지 않아도 됩니다 =====================

const SETTINGS = { FAMILY, MEMBERS, EVENTS, PICKUP_VERSION, PICKUPS, NO_PICKUP_DAYS, SKIP_PICKUP_ON_HOLIDAYS, NOTES, HOLIDAYS, KAKAO_RECEIVERS };
const names = () => Object.keys(SETTINGS);

const KEY = "state";
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const TIME = /^\d{2}:\d{2}$/;
const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

async function load(env) {
  return (await env.SCHEDULE.get(KEY, "json")) || {};
}

function cleanEvent(e) {
  if (!e || typeof e !== "object") return null;
  const date = String(e.date || ""), who = String(e.who || "").slice(0, 10), title = String(e.title || "").trim().slice(0, 80);
  if (!DATE.test(date) || !title) return null; // who(누구)는 선택 안 해도 됨
  const out = { date, who, title };
  if (e.time && TIME.test(String(e.time))) out.time = String(e.time);
  return out;
}
function cleanPickup(p) {
  if (!p || typeof p !== "object") return null;
  const day = String(p.day || ""), time = String(p.time || ""), who = String(p.who || "").slice(0, 10), place = String(p.place || "").trim().slice(0, 40);
  if (!DAYS.includes(day) || !TIME.test(time) || !who) return null;
  return { day, time, who, place };
}
function cleanNote(n) {
  const t = String(n ?? "").trim().slice(0, 200);
  return t || null;
}
const sameEvent = (a, b) => a.date === b.date && (a.time || "") === (b.time || "") && a.who === b.who && a.title === b.title;
const samePickup = (a, b) => a.day === b.day && a.time === b.time && a.who === b.who && (a.place || "") === (b.place || "");

function view(s, env) {
  return { events: s.events ?? null, pickups: s.pickups ?? null, notes: s.notes ?? null, done: s.done || {}, pickupsVersion: s.pickupsVersion || 0, needCode: !!env.FAMILY_CODE };
}

// Apply add/update/delete to a list; returns an error string or null.
function applyOp(list, op, orig, next, clean, same, max) {
  if (op === "add") {
    const n = clean(next); if (!n) return "bad";
    if (list.length >= max) return "full";
    list.push(n); return null;
  }
  if (op === "update" || op === "delete") {
    const o = clean(orig); if (!o) return "bad";
    const i = list.findIndex((x) => same(x, o));
    if (i < 0) return "gone";
    if (op === "delete") { list.splice(i, 1); return null; }
    const n = clean(next); if (!n) return "bad";
    list[i] = n; return null;
  }
  return "bad";
}

async function onGet(env) {
  if (!env.SCHEDULE) return json({ error: "no_kv" }, 500);
  const s = await load(env);
  // 위 PICKUPS의 버전이 올라가면 저장된 픽업표를 새 목록으로 교체
  if ((s.pickupsVersion || 0) < PICKUP_VERSION) {
    s.pickups = PICKUPS.map(cleanPickup).filter(Boolean);
    s.pickupsVersion = PICKUP_VERSION;
    await env.SCHEDULE.put(KEY, JSON.stringify(s));
  }
  return json({ ...view(s, env), kakao: await kakaoStatus(env) });
}

async function onPost(request, env) {
  if (!env.SCHEDULE) return json({ error: "no_kv" }, 500);
  if (env.FAMILY_CODE && request.headers.get("x-family-code") !== env.FAMILY_CODE)
    return json({ error: "code" }, 401);

  let b;
  try { b = await request.json(); } catch { return json({ error: "bad" }, 400); }
  const seed = (b.seed && typeof b.seed === "object") ? b.seed : {};

  const s = await load(env);
  const events = Array.isArray(s.events) ? s.events : (Array.isArray(seed.events) ? seed.events.map(cleanEvent).filter(Boolean) : []);
  let pickups = Array.isArray(s.pickups) ? s.pickups : (Array.isArray(seed.pickups) ? seed.pickups.map(cleanPickup).filter(Boolean) : []);
  const seedVer = Math.max(0, Math.min(1e6, parseInt(seed.pickupsVersion, 10) || 0));
  let pickupsVersion = Array.isArray(s.pickups) ? (s.pickupsVersion || 0) : seedVer;
  const notes = Array.isArray(s.notes) ? s.notes : (Array.isArray(seed.notes) ? seed.notes.map(cleanNote).filter(Boolean) : []);
  let done = s.done || {};
  const kind = b.kind || "event";
  let err = null;

  if (b.op === "done") {
    const date = String(b.date || ""), key = String(b.key || "").slice(0, 80);
    if (!DATE.test(date) || !key) return json({ error: "bad" }, 400);
    const day = { ...(done[date] || {}) };
    if (b.value) day[key] = true; else delete day[key];
    done = { [date]: day }; // 오늘 것만 보관
  } else if (kind === "event") {
    err = applyOp(events, b.op, b.orig, b.next, cleanEvent, sameEvent, 2000);
  } else if (kind === "pickup" && b.op === "reset") {
    // 홈페이지 파일의 새 픽업 목록(PICKUP_VERSION이 더 큰 경우)으로 교체
    if (seedVer <= (s.pickupsVersion || 0) && Array.isArray(s.pickups)) return json({ error: "old", ...view(s, env) }, 409);
    if (!Array.isArray(seed.pickups)) return json({ error: "bad" }, 400);
    pickups = seed.pickups.map(cleanPickup).filter(Boolean).slice(0, 100);
    pickupsVersion = seedVer;
  } else if (kind === "pickup") {
    err = applyOp(pickups, b.op, b.orig, b.next, cleanPickup, samePickup, 100);
  } else if (kind === "note") {
    err = applyOp(notes, b.op, b.orig, b.next, cleanNote, (a, c) => a === c, 50);
  } else err = "bad";

  const state = { events, pickups, notes, done, pickupsVersion };
  if (err === "gone") return json({ error: "gone", ...view(state, env) }, 409);
  if (err) return json({ error: err }, 400);

  events.sort((a, c) => a.date.localeCompare(c.date) || (a.time || "").localeCompare(c.time || ""));
  pickups.sort((a, c) => DAYS.indexOf(a.day) - DAYS.indexOf(c.day) || a.time.localeCompare(c.time));
  await env.SCHEDULE.put(KEY, JSON.stringify(state));
  return json(view(state, env));
}


/* ===================== 카카오톡 알림 ===================== */
// 필요한 설정 (Cloudflare 워커 → 설정 → 변수 및 비밀, 유형 "비밀"):
//   KAKAO_REST_KEY        카카오 개발자 사이트의 REST API 키
//   KAKAO_CLIENT_SECRET   (카카오 앱에서 Client Secret을 켰을 때만)
const KAKAO_KEY = "kakao";
const kstNow = () => new Date(Date.now() + 9 * 3600 * 1000); // UTC 필드로 한국 날짜·시간을 읽어요
const kIso = (d) => d.toISOString().slice(0, 10);

const authorized = (request, env) => !env.FAMILY_CODE || request.headers.get("x-family-code") === env.FAMILY_CODE;

async function kakaoLoad(env) { return (await env.SCHEDULE.get(KAKAO_KEY, "json")) || {}; }
async function kakaoSave(env, k) { await env.SCHEDULE.put(KAKAO_KEY, JSON.stringify(k)); }

async function kakaoStatus(env) {
  const k = await kakaoLoad(env);
  const out = { ready: !!env.KAKAO_REST_KEY, people: {} };
  for (const who of KAKAO_RECEIVERS) {
    const t = k[who];
    out.people[who] = t ? { linked: !t.broken, broken: !!t.broken, lastSent: t.lastSent || null, lastError: t.lastError || null } : { linked: false };
  }
  return out;
}

async function kakaoToken(env, body) {
  const form = new URLSearchParams({ client_id: env.KAKAO_REST_KEY, ...body });
  if (env.KAKAO_CLIENT_SECRET) form.set("client_secret", env.KAKAO_CLIENT_SECRET);
  const r = await fetch("https://kauth.kakao.com/oauth/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded;charset=utf-8" },
    body: form,
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok || !d.access_token) throw new Error("token:" + (d.error_code || d.error || r.status));
  return d;
}

function applyToken(t, d) {
  const now = Date.now();
  t.access_token = d.access_token;
  t.access_exp = now + (d.expires_in || 3600) * 1000;
  if (d.refresh_token) { t.refresh_token = d.refresh_token; t.refresh_exp = now + (d.refresh_token_expires_in || 0) * 1000; }
  t.broken = false;
  return t;
}

async function kakaoSend(env, k, who, text, link) {
  const t = k[who];
  if (!t || !t.refresh_token) return "not_linked";
  const send = () => fetch("https://kapi.kakao.com/v2/api/talk/memo/default/send", {
    method: "POST",
    headers: { Authorization: "Bearer " + t.access_token, "content-type": "application/x-www-form-urlencoded;charset=utf-8" },
    body: new URLSearchParams({
      template_object: JSON.stringify({
        object_type: "text",
        text,
        link: { web_url: link, mobile_web_url: link },
        button_title: "홈페이지 열기",
      }),
    }),
  });
  try {
    if (!t.access_token || Date.now() > (t.access_exp || 0) - 120000)
      applyToken(t, await kakaoToken(env, { grant_type: "refresh_token", refresh_token: t.refresh_token }));
    let r = await send();
    if (r.status === 401) {
      applyToken(t, await kakaoToken(env, { grant_type: "refresh_token", refresh_token: t.refresh_token }));
      r = await send();
    }
    if (!r.ok) throw new Error("send:" + r.status + " " + (await r.text()).slice(0, 120));
    t.lastSent = new Date().toISOString(); t.lastError = null;
    return "ok";
  } catch (e) {
    t.lastError = String(e.message || e).slice(0, 160);
    if (String(e.message).startsWith("token:")) t.broken = true;
    return "error";
  }
}

// 다음날(한국시간) 월간 스케줄 일정 요약 — 픽업은 넣지 않아요. 카카오 텍스트 메시지는 200자까지
async function tomorrowText(env, prefix = "") {
  const s = (await env.SCHEDULE.get(KEY, "json")) || {};
  const d = kstNow(); d.setUTCDate(d.getUTCDate() + 1);
  const key = kIso(d), dow = DAYS[d.getUTCDay()], hol = HOLIDAYS[key];
  const events = (Array.isArray(s.events) ? s.events : EVENTS).filter((e) => e.date === key)
    .sort((a, b) => (a.time || "").localeCompare(b.time || ""));
  const lines = events.map((e) => `📅 ${e.time ? e.time + " " : ""}${e.who ? e.who + ":" : ""}${e.title}`);
  const head = `${prefix}[${FAMILY}] 내일 ${d.getUTCMonth() + 1}/${d.getUTCDate()}(${dow})${hol ? " " + hol : ""} 일정`;
  if (!lines.length) return { text: head + "\n등록된 일정이 없어요.", empty: true };
  let text = head;
  for (let i = 0; i < lines.length; i++) {
    const rest = lines.length - i - 1;
    if ((text + "\n" + lines[i]).length + (rest ? 8 : 0) > 200) { text += `\n…외 ${lines.length - i}건`; break; }
    text += "\n" + lines[i];
  }
  return { text: text.slice(0, 200), empty: false };
}

async function sendTomorrowAll(env) {
  if (!env.KAKAO_REST_KEY) return;
  const k = await kakaoLoad(env);
  const { text, empty } = await tomorrowText(env);
  if (empty) return; // 내일 일정이 없으면 보내지 않아요
  for (const who of KAKAO_RECEIVERS) if (k[who] && !k[who].broken) await kakaoSend(env, k, who, text, k.origin || "https://kakao.com");
  await kakaoSave(env, k);
}

async function kakaoApi(request, env, url) {
  if (!env.KAKAO_REST_KEY) return json({ error: "no_key" }, 400);
  if (!authorized(request, env)) return json({ error: "code" }, 401);
  let b = {}; try { b = await request.json(); } catch {}
  const who = String(b.who || "");
  if (!KAKAO_RECEIVERS.includes(who)) return json({ error: "bad" }, 400);
  const k = await kakaoLoad(env);
  if (url.pathname === "/api/kakao/start") {
    const nonce = crypto.randomUUID();
    await env.SCHEDULE.put("kakao_state:" + nonce, who, { expirationTtl: 600 });
    const auth = new URL("https://kauth.kakao.com/oauth/authorize");
    auth.search = new URLSearchParams({ client_id: env.KAKAO_REST_KEY, redirect_uri: url.origin + "/kakao/callback", response_type: "code", scope: "talk_message", state: nonce }).toString();
    return json({ url: auth.toString() });
  }
  if (url.pathname === "/api/kakao/test") {
    const { text } = await tomorrowText(env, "[테스트] ");
    const r = await kakaoSend(env, k, who, text, k.origin || url.origin);
    await kakaoSave(env, k);
    return json({ result: r, kakao: await kakaoStatus(env) }, r === "ok" ? 200 : 502);
  }
  if (url.pathname === "/api/kakao/unlink") {
    delete k[who]; await kakaoSave(env, k);
    return json({ kakao: await kakaoStatus(env) });
  }
  return json({ error: "bad" }, 404);
}

async function kakaoCallback(env, url) {
  const back = (q) => Response.redirect(url.origin + "/?" + q + "#kakao", 302);
  if (url.searchParams.get("error")) return back("kakao=cancel");
  const nonce = url.searchParams.get("state") || "", code = url.searchParams.get("code") || "";
  const who = nonce && (await env.SCHEDULE.get("kakao_state:" + nonce));
  if (!who || !code) return back("kakao=expired");
  await env.SCHEDULE.delete("kakao_state:" + nonce);
  try {
    const d = await kakaoToken(env, { grant_type: "authorization_code", redirect_uri: url.origin + "/kakao/callback", code });
    const k = await kakaoLoad(env);
    k[who] = applyToken({ linkedAt: new Date().toISOString() }, d);
    k.origin = url.origin;
    await kakaoSend(env, k, who, `[${FAMILY}] ${who}님 카카오톡 알림이 연결됐어요.\n매일 밤 10시에 다음날 일정을 보내드려요.`, url.origin);
    await kakaoSave(env, k);
    return back("kakao=linked&who=" + encodeURIComponent(who));
  } catch (e) {
    return back("kakao=error");
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/kakao/") && request.method === "POST") return kakaoApi(request, env, url);
    if (url.pathname === "/kakao/callback") return kakaoCallback(env, url);
    if (url.pathname === "/api/state") {
      if (request.method === "GET") return onGet(env);
      if (request.method === "POST") return onPost(request, env);
      return new Response("Method not allowed", { status: 405 });
    }
    if (url.pathname === "/" || url.pathname === "/index.html") {
      const config = names().map((n) => `const ${n} = ${JSON.stringify(SETTINGS[n])};`).join("\n");
      return new Response(PAGE.replace("/*__CONFIG__*/", () => config), {
        headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-cache" },
      });
    }
    return new Response("Not found", { status: 404 });
  },
  // 매일 밤 10시(한국시간, wrangler.jsonc의 crons)에 다음날 일정을 카카오톡으로 보내요
  async scheduled(event, env, ctx) {
    ctx.waitUntil(sendTomorrowAll(env));
  },
};

// 홈페이지 화면 (수정하지 않아도 됩니다)
const PAGE = "<!doctype html>\n<html lang=\"ko\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width,initial-scale=1,viewport-fit=cover\">\n<title>현이네 가족 스케줄</title>\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Gaegu:wght@700&family=IBM+Plex+Sans+KR:wght@400;500;600&display=swap\">\n\n<script>\n/*__CONFIG__*/\n</script>\n\n<style>\n/* Layout: 냉장고 달력 — Korean month calendar (일요일·공휴일 red) with an editable day panel; below, live pickup strip and Mon–Sat time-axis timetable. */\n:root{\n  --paper:#FFFFFF; --card:#FFFFFF; --ink:#1D3127; --muted:#5D6E63; --line:#D8DFD5; --soft:#F1F4EF;\n  --pick:#F2B705; --pick-ink:#3A2C00; --pick-soft:#FFF4CC; --sun:#D23F2A; --sat:#2F68A8; --hol-soft:#FCE9E5;\n  --live:#D6402B; --ok:#2E8B57;\n  --display:\"Gaegu\",\"IBM Plex Sans KR\",cursive;\n  --body:\"IBM Plex Sans KR\",system-ui,-apple-system,\"Apple SD Gothic Neo\",\"Malgun Gothic\",sans-serif;\n  --hour:58px;\n  color-scheme:light;\n}\n*{box-sizing:border-box}\n[hidden]{display:none!important}\nbody{margin:0;background:var(--paper);color:var(--ink);font-family:var(--body);font-size:15px;line-height:1.55}\n.wrap{max-width:1180px;margin:0 auto;padding-block:26px 56px;\n  padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));display:grid;gap:38px}\n.wrap>*{min-width:0}\nh1,h2,h3{font-family:var(--display);font-weight:700;margin:0;line-height:1.15;text-wrap:balance}\nh1{font-size:clamp(36px,6.5vw,56px)} h2{font-size:30px} h3{font-size:24px}\nbutton,input,select{font:inherit;color:inherit}\nbutton{cursor:pointer}\n:focus-visible{outline:3px solid var(--pick);outline-offset:2px;border-radius:6px}\n.muted{color:var(--muted)} .num{font-variant-numeric:tabular-nums}\n.row-head{display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:8px 14px;margin-bottom:12px}\n\nheader{display:flex;flex-wrap:wrap;align-items:end;justify-content:space-between;gap:14px 24px;border-bottom:2px dashed var(--line);padding-bottom:20px}\n.eyebrow{font-size:12px;letter-spacing:.08em;color:var(--muted);font-weight:600}\n.legend{display:flex;flex-wrap:wrap;gap:10px 14px;font-size:13px}\n.legend span{display:inline-flex;align-items:center;gap:6px;font-weight:600}\n.legend small{font-weight:400;color:var(--muted)}\n.dot{width:10px;height:10px;border-radius:50%;background:var(--mc);display:inline-block}\n\n/* calendar */\n.cal-wrap{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:18px;align-items:start}\n.cal{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:14px;min-width:0}\n.cal-nav{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px}\n.cal-nav .m{font-family:var(--display);font-size:30px}\n.nav-btns{display:flex;gap:6px}\n.nbtn{border:1px solid var(--line);background:var(--paper);border-radius:9px;padding:5px 12px;font-size:14px}\n.grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:4px}\n.dow{font-size:12px;font-weight:600;text-align:center;color:var(--muted);padding:4px 0}\n.dow.sun{color:var(--sun)} .dow.sat{color:var(--sat)}\n.cell{border:0;background:var(--soft);border-radius:9px;min-height:96px;padding:6px;text-align:left;display:flex;flex-direction:column;gap:3px;min-width:0;overflow:hidden}\n.cell.out{background:transparent;opacity:.4}\n.cell .top{display:flex;align-items:baseline;gap:5px;min-width:0}\n.cell .d{font-size:13px;font-weight:600;flex:none}\n.cell .hn{font-size:10.5px;color:var(--sun);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}\n.cell.sun .d,.cell.hol .d{color:var(--sun)} .cell.sat:not(.hol) .d{color:var(--sat)}\n.cell.hol{background:var(--hol-soft)}\n.cell.today .d{background:var(--ink);color:var(--paper);border-radius:999px;padding:0 7px}\n.cell.sel{outline:2px solid var(--ink);outline-offset:-2px}\n.ev{font-size:12px;line-height:1.3;padding:2px 6px;border-radius:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;background:var(--mc);color:#fff;font-weight:500}\n.dots{display:none;gap:3px;justify-content:center}\n.dots i{width:7px;height:7px;border-radius:50%;background:var(--mc)}\n\n.panel{display:grid;gap:14px}\n.box{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:16px;display:grid;gap:10px}\n.box-head{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap}\n.hol-tag{font-size:12px;font-weight:600;color:var(--sun);background:var(--hol-soft);padding:2px 8px;border-radius:999px;justify-self:start}\n.plist{list-style:none;margin:0;padding:0;display:grid;gap:8px}\n.plist li{display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center;padding:8px 10px;border-radius:10px;background:var(--soft);border-left:4px solid var(--mc)}\n.plist .tm{font-weight:600;font-size:13px}\n.dday{font-weight:600;font-size:13px;color:var(--mc);min-width:42px}\n.who{font-weight:600;color:var(--mc)}\n.ebtn{border:1px solid var(--line);background:var(--card);border-radius:8px;padding:3px 10px;font-size:12.5px}\n.btn{border:0;border-radius:10px;padding:9px 14px;font-weight:600;background:var(--ink);color:var(--paper)}\n.btn.ghost{background:transparent;color:var(--ink);border:1px solid var(--line)}\n.btn.danger{background:transparent;color:var(--sun);border:1px solid var(--sun)}\n.btn.add{background:var(--soft);color:var(--ink);border:1.5px dashed var(--line);width:100%}\n.btn[disabled]{opacity:.5;cursor:wait}\n\n/* edit form */\n.form{display:grid;gap:10px;padding:12px;border-radius:12px;background:var(--soft)}\n.field{display:grid;gap:4px}\n.field label{font-size:12.5px;color:var(--muted);font-weight:500}\n.field input,.field select{width:100%;padding:8px 10px;border:1px solid var(--line);border-radius:9px;background:var(--card)}\n.row2{display:grid;grid-template-columns:1fr 1fr;gap:8px}\n.check{display:flex;align-items:center;gap:6px;font-size:13px}\n.actions{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end}\n.actions .sp{flex:1}\n.msg{font-size:13px;min-height:1em}\n.msg.err{color:var(--sun)} .msg.ok{color:var(--ok)}\n\n/* github connect */\n.connect{display:grid;gap:10px;font-size:13.5px}\n.connect ol{margin:0;padding-left:20px;display:grid;gap:4px}\n.connect code{background:var(--soft);padding:1px 5px;border-radius:5px;font-size:12.5px;overflow-wrap:anywhere}\n.conn-status{font-size:12.5px;color:var(--muted);display:flex;gap:8px;align-items:center;flex-wrap:wrap}\n.linkbtn{border:0;background:none;padding:0;text-decoration:underline;color:var(--muted);font-size:12.5px}\n\n@media (max-width:900px){.cal-wrap{grid-template-columns:1fr}}\n@media (max-width:620px){\n  .cell{min-height:58px;align-items:center}\n  .cell .top{flex-direction:column;align-items:center;gap:0}\n  .cell .hn{font-size:9px;max-width:100%}\n  .ev{display:none}.dots{display:flex}\n  .cal{padding:10px}\n}\n\n/* live pickup */\n.pick-sec{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:18px;display:grid;gap:18px}\n.pick-sec>*,.live>*{min-width:0}\n.live{display:grid;gap:12px}\n.live-head{display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px}\n.clock{font-size:34px;font-weight:600;font-variant-numeric:tabular-nums;line-height:1}\n.pulse{width:10px;height:10px;border-radius:50%;background:var(--live);display:inline-block}\n@media (prefers-reduced-motion:no-preference){.pulse{animation:pulse 1.6s infinite}}\n@keyframes pulse{0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--live) 60%,transparent)}100%{box-shadow:0 0 0 10px transparent}}\n.next b{font-variant-numeric:tabular-nums}\n.live-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px}\n.lcard{border:1px solid var(--line);border-left:5px solid var(--mc);border-radius:12px;padding:12px 14px;display:grid;gap:4px;background:var(--paper)}\n.lcard .t{font-size:22px;font-weight:600;font-variant-numeric:tabular-nums;line-height:1.1;display:flex;align-items:center;gap:8px;flex-wrap:wrap}\n.st{font-size:12px;font-weight:600;padding:2px 8px;border-radius:999px}\n.st.wait{background:var(--soft);color:var(--muted)}\n.st.soon{background:var(--pick);color:var(--pick-ink)}\n.st.now{background:var(--live);color:#fff}\n.st.done{background:transparent;color:var(--ok);border:1.5px solid var(--ok)}\n.lcard.is-soon{background:var(--pick-soft);border-color:var(--pick);border-left-color:var(--mc)}\n.lcard.is-now{border-color:var(--live);border-left-color:var(--live)}\n.lcard.is-done{opacity:.6}\n.lcard.is-done .t span.ltime{text-decoration:line-through}\n.chk{justify-self:start;margin-top:4px;border:1.5px solid var(--line);background:var(--card);border-radius:999px;padding:3px 12px;font-size:13px;font-weight:600}\n.lcard.is-done .chk{border-color:var(--ok);color:var(--ok)}\n.empty{color:var(--muted);padding:6px 0}\n\n/* time-axis timetable */\n.tt-scroll{overflow-x:auto;border:1px solid var(--line);border-radius:14px}\n.tt{min-width:600px;display:grid;grid-template-columns:56px repeat(6,minmax(0,1fr))}\n.tt-h{background:var(--soft);padding:8px 6px;text-align:center;font-weight:600;font-size:14px;border-bottom:1px solid var(--line)}\n.tt-h.today{background:var(--ink);color:var(--paper)}\n.tt-h.sat{color:var(--sat)} .tt-h.hol{color:var(--sun)} .tt-h.today.sat,.tt-h.today.hol{color:var(--paper)}\n.tt-h small{display:block;font-weight:400;font-size:11.5px;opacity:.85;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.axis{position:relative;border-right:1px solid var(--line)}\n.axis span{position:absolute;right:8px;transform:translateY(-50%);font-size:12px;color:var(--muted);font-variant-numeric:tabular-nums}\n.col{position:relative;border-left:1px solid var(--line);\n  background-image:repeating-linear-gradient(to bottom,var(--line) 0 1px,transparent 1px var(--hour));background-position:0 12px}\n.col.today{background-color:color-mix(in srgb,var(--pick) 9%,transparent)}\n.col.hol{background-color:var(--hol-soft)}\n.blk{position:absolute;left:4px;right:4px;border-radius:7px;padding:3px 7px;background:var(--mc);color:#fff;font-size:12px;line-height:1.25;overflow:hidden;display:flex;flex-direction:column;justify-content:center}\n.blk b{font-variant-numeric:tabular-nums;font-size:12.5px}\n.blk span{opacity:.92;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.blk.done,.blk.off{opacity:.35}\n.nowline{position:absolute;left:0;right:0;height:2px;background:var(--live);z-index:3}\n.nowline::before{content:\"\";position:absolute;left:-5px;top:-4px;width:10px;height:10px;border-radius:50%;background:var(--live)}\n@media (max-width:620px){\n  .tt{min-width:0;grid-template-columns:42px repeat(6,minmax(0,1fr))}\n  .axis span{right:4px;font-size:10.5px}\n  .tt-h{font-size:13px;padding:6px 2px}\n  .blk{left:2px;right:2px;padding:2px 4px;font-size:11px}\n  .blk b{font-size:11px;white-space:normal}\n  .blk span{display:none}\n}\n\n.notes ul{list-style:none;padding:0;margin:10px 0 0}\n.notes li{padding:9px 0;border-bottom:1px solid var(--line);display:flex;gap:10px;align-items:start}\n.notes li .txt{flex:1;min-width:0;overflow-wrap:anywhere}\n.notes .x{border:0;background:transparent;color:var(--muted);font-size:18px;line-height:1;padding:2px 6px}\n.pk-notice{display:flex;flex-wrap:wrap;gap:8px;align-items:center;background:var(--pick-soft);border:1px solid var(--pick);border-radius:10px;padding:8px 12px;margin-bottom:10px;font-size:13px}\n.pk-notice span{flex:1 1 220px}\n.pk-notice input{padding:5px 9px;border:1px solid var(--line);border-radius:8px;background:var(--card);flex:0 1 140px}\n.k-list{display:grid;gap:8px}\n.k-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;padding:10px 12px;border:1px solid var(--line);border-radius:12px;border-left:4px solid var(--mc)}\n.k-row .nm{font-weight:600;min-width:44px}\n.k-row .sp{flex:1}\n.k-row small{flex-basis:100%;color:var(--muted);font-size:12px}\n.kchip{font-size:12px;font-weight:600;padding:2px 9px;border-radius:999px;background:var(--soft);color:var(--muted)}\n.kchip.on{background:color-mix(in srgb,var(--ok) 14%,transparent);color:var(--ok)}\n.kchip.bad{background:var(--hol-soft);color:var(--sun)}\n.kbtn{border:0;background:#FEE500;color:#191600;border-radius:8px;padding:6px 12px;font-weight:600;font-size:13px}\n#kCode{margin-top:10px;padding:8px 10px;border:1px solid var(--line);border-radius:9px;width:min(220px,100%)}\n.note-form{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}\n.note-form input{flex:1 1 220px;min-width:0;padding:9px 12px;border:1px solid var(--line);border-radius:10px;background:var(--card)}\nbutton.blk{border:0;text-align:left;font-family:inherit;color:#fff;cursor:pointer;line-height:1.2;align-items:stretch}\n.col.can{cursor:copy}\ndialog{border:0;border-radius:16px;padding:6px;background:var(--card);color:var(--ink);width:min(420px,calc(100vw - 32px));box-shadow:0 20px 60px rgba(0,0,0,.3)}\ndialog::backdrop{background:rgba(10,20,14,.45)}\nfooter{font-size:13px;color:var(--muted);display:grid;gap:6px}\n.toast{position:fixed;left:50%;bottom:calc(20px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);background:var(--ink);color:var(--paper);padding:10px 16px;border-radius:12px;font-size:14px;z-index:20;max-width:calc(100vw - 32px)}\n</style>\n</head>\n<body>\n<div class=\"wrap\">\n  <header>\n    <div>\n      <div class=\"eyebrow\">FAMILY CALENDAR</div>\n      <h1 id=\"title\">현이네 가족 스케줄</h1>\n      <div class=\"muted num\" id=\"todayLabel\"></div>\n    </div>\n    <div class=\"legend\" id=\"legend\"></div>\n  </header>\n\n\n  <section aria-labelledby=\"pickTitle\">\n    <div class=\"row-head\"><h2 id=\"pickTitle\">픽업</h2><span class=\"muted\" style=\"font-size:13px\">매주 반복 · 월~토 · 공휴일은 쉼</span></div>\n    <div class=\"pick-sec\">\n      <div class=\"live\">\n        <div class=\"live-head\">\n          <span class=\"pulse\" aria-hidden=\"true\"></span>\n          <h3>실시간 픽업 현황</h3>\n          <span class=\"clock\" id=\"clock\"></span><span class=\"muted\" style=\"font-size:13px\">한국시간</span>\n        </div>\n        <div id=\"nextLine\"></div>\n        <div class=\"live-list\" id=\"liveList\"></div>\n      </div>\n      <div>\n        <div class=\"box-head\" style=\"margin-bottom:10px\"><h3>주간 픽업 스케줄</h3><button class=\"ebtn\" id=\"pkAdd\" hidden>+ 픽업 추가</button></div>\n        <div class=\"pk-notice\" id=\"pkNotice\" hidden>\n          <span>새 픽업 시간표가 있어요. 적용하면 지금 픽업표가 새 목록으로 바뀌어요.</span>\n          <input id=\"pkCode\" type=\"password\" autocomplete=\"off\" placeholder=\"가족 비밀번호\" aria-label=\"가족 비밀번호\" hidden>\n          <button class=\"ebtn\" id=\"pkApply\">적용</button>\n        </div>\n        <div class=\"muted\" id=\"pkHint\" style=\"font-size:12.5px;margin:-4px 0 10px\" hidden>블록을 누르면 수정, 빈 칸을 누르면 그 시간에 픽업을 추가해요.</div>\n        <div class=\"tt-scroll\"><div class=\"tt\" id=\"tt\"></div></div>\n      </div>\n    </div>\n  </section>\n\n  <section aria-labelledby=\"calTitle\">\n    <div class=\"row-head\"><h2 id=\"calTitle\">월간 스케줄</h2><span class=\"muted\" style=\"font-size:13px\">날짜를 누르면 일정을 추가·수정할 수 있어요</span></div>\n    <div class=\"cal-wrap\">\n      <div class=\"cal\">\n        <div class=\"cal-nav\">\n          <div class=\"m num\" id=\"monthLabel\"></div>\n          <div class=\"nav-btns\">\n            <button class=\"nbtn\" id=\"prev\" aria-label=\"이전 달\">‹</button>\n            <button class=\"nbtn\" id=\"thisMonth\">오늘</button>\n            <button class=\"nbtn\" id=\"next\" aria-label=\"다음 달\">›</button>\n          </div>\n        </div>\n        <div class=\"grid\" id=\"dows\"></div>\n        <div class=\"grid\" id=\"grid\" style=\"margin-top:4px\"></div>\n      </div>\n      <div class=\"panel\">\n        <div class=\"box\" id=\"dayBox\" aria-live=\"polite\"></div>\n        <div class=\"box\"><h3>다가오는 일정</h3><ul class=\"plist\" id=\"upcoming\"></ul></div>\n      </div>\n    </div>\n  </section>\n\n  <section class=\"notes\"><h2>가족 메모</h2>\n    <ul id=\"notes\"></ul>\n    <form class=\"note-form\" id=\"noteForm\" hidden>\n      <input id=\"noteInput\" maxlength=\"200\" placeholder=\"예: 수요일 체육복 챙기기\" aria-label=\"새 메모\">\n      <input id=\"nCode\" type=\"password\" autocomplete=\"off\" placeholder=\"가족 비밀번호\" aria-label=\"가족 비밀번호\" style=\"flex:0 1 150px\" hidden>\n      <button class=\"btn\" type=\"submit\" id=\"noteAdd\">메모 추가</button>\n    </form>\n  </section>\n\n  <section class=\"kakao\" id=\"kakao\" hidden aria-labelledby=\"kakaoTitle\">\n    <h2 id=\"kakaoTitle\">카카오톡 알림</h2>\n    <p class=\"muted\" style=\"margin:6px 0 12px;font-size:13.5px\">매일 밤 10시(한국시간)에 다음날 월간 스케줄 일정을 각자의 카카오톡 \"나와의 채팅\"으로 보내드려요. 픽업은 보내지 않아요. 받을 사람이 자기 휴대폰에서 한 번씩 연결하세요.</p>\n    <div class=\"k-list\" id=\"kakaoList\"></div>\n    <input id=\"kCode\" type=\"password\" autocomplete=\"off\" placeholder=\"가족 비밀번호\" aria-label=\"가족 비밀번호\" hidden>\n  </section>\n\n  <footer>\n    <div>일정·픽업·메모·\"픽업 완료\"는 이 화면에서 바로 고치고, 가족 모두에게 공유돼요.</div>\n    <div class=\"conn-status\" id=\"connStatus\"></div>\n    <div style=\"font-size:11.5px\">버전 2026-11-18 · v8</div>\n  </footer>\n</div>\n<div class=\"toast\" id=\"toast\" hidden></div>\n<dialog id=\"pkDlg\" aria-labelledby=\"pkTitle\">\n  <form class=\"form\" id=\"pkForm\" method=\"dialog\" style=\"background:transparent\">\n    <strong id=\"pkTitle\" style=\"font-size:17px\">픽업 추가</strong>\n    <div class=\"row2\">\n      <div class=\"field\"><label for=\"pDay\">요일</label><select id=\"pDay\"><option>월</option><option>화</option><option>수</option><option>목</option><option>금</option><option>토</option></select></div>\n      <div class=\"field\"><label for=\"pTime\">시간</label><input id=\"pTime\" type=\"time\" required></div>\n    </div>\n    <div class=\"row2\">\n      <div class=\"field\"><label for=\"pWho\">누구</label><select id=\"pWho\"></select></div>\n      <div class=\"field\"><label for=\"pPlace\">장소</label><input id=\"pPlace\" maxlength=\"40\" placeholder=\"예: 학원\"></div>\n    </div>\n    <div class=\"field\" id=\"pCodeWrap\" hidden><label for=\"pCode\">가족 비밀번호 (처음 한 번만)</label><input id=\"pCode\" type=\"password\" autocomplete=\"off\"></div>\n    <div class=\"msg\" id=\"pMsg\"></div>\n    <div class=\"actions\">\n      <button type=\"button\" class=\"btn danger\" id=\"pDel\" hidden>삭제</button>\n      <span class=\"sp\"></span>\n      <button type=\"button\" class=\"btn ghost\" id=\"pCancel\">취소</button>\n      <button type=\"submit\" class=\"btn\" id=\"pSave\">저장</button>\n    </div>\n  </form>\n</dialog>\n\n<script>\nconst DOW=[\"일\",\"월\",\"화\",\"수\",\"목\",\"금\",\"토\"], PDAYS=[\"월\",\"화\",\"수\",\"목\",\"금\",\"토\"];\nconst $=id=>document.getElementById(id);\nconst pad=n=>String(n).padStart(2,\"0\");\nconst iso=d=>d.getFullYear()+\"-\"+pad(d.getMonth()+1)+\"-\"+pad(d.getDate());\nconst esc=s=>String(s??\"\").replace(/[&<>\"']/g,c=>({\"&\":\"&amp;\",\"<\":\"&lt;\",\">\":\"&gt;\",'\"':\"&quot;\",\"'\":\"&#39;\"}[c]));\nconst mins=t=>{const [h,m]=String(t).split(\":\").map(Number);return h*60+(m||0)};\nconst mem=n=>MEMBERS.find(m=>m.name===n)||{name:n,color:\"#6F7F76\",grade:\"\"};\nconst byTime=(a,b)=>mins(a.time||\"0:00\")-mins(b.time||\"0:00\");\nconst parseISO=s=>{const [y,m,d]=s.split(\"-\").map(Number);return new Date(y,m-1,d)};\nconst store={get(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},del(k){try{localStorage.removeItem(k)}catch(e){}}};\nfunction toast(t){const el=$(\"toast\");el.textContent=t;el.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>el.hidden=true,4000)}\n\n// 한국시간(KST, UTC+9) 기준 현재 시각 — 휴대폰이 어느 나라 시간으로 맞춰져 있어도 한국 날짜·시간으로 계산\nconst kstNow=()=>new Date(Date.now()+(9*60+new Date().getTimezoneOffset())*60000);\nconst today=kstNow(); today.setHours(0,0,0,0);\nconst todayISO=iso(today);\nlet view=new Date(today.getFullYear(),today.getMonth(),1), selected=todayISO;\nlet events=EVENTS.slice(), pickups=PICKUPS.slice(), notes=NOTES.slice(), serverOK=false, needCode=false, loaded=false;\n\n$(\"title\").textContent=FAMILY+\" 가족 스케줄\"; document.title=FAMILY+\" 가족 스케줄\";\n$(\"todayLabel\").textContent=`${today.getFullYear()}년 ${today.getMonth()+1}월 ${today.getDate()}일 ${DOW[today.getDay()]}요일${HOLIDAYS[todayISO]?\" · \"+HOLIDAYS[todayISO]:\"\"}`;\n$(\"legend\").innerHTML=MEMBERS.map(m=>`<span style=\"--mc:${esc(m.color)}\"><i class=\"dot\"></i>${esc(m.name)}${m.grade?` <small>${esc(m.grade)}</small>`:\"\"}</span>`).join(\"\");\n\n/* ================= 월간 스케줄 ================= */\nconst eventsOn=key=>events.filter(e=>e.date===key).sort(byTime);\n\nfunction renderCalendar(){\n  $(\"monthLabel\").textContent=`${view.getFullYear()}년 ${view.getMonth()+1}월`;\n  $(\"dows\").innerHTML=DOW.map((d,i)=>`<div class=\"dow${i===0?\" sun\":i===6?\" sat\":\"\"}\">${d}</div>`).join(\"\");\n  const start=new Date(view); start.setDate(1-view.getDay());\n  let html=\"\";\n  for(let i=0;i<42;i++){\n    const d=new Date(start); d.setDate(start.getDate()+i);\n    if(i===35&&d.getMonth()!==view.getMonth()) break;\n    const key=iso(d), ev=eventsOn(key), hol=HOLIDAYS[key];\n    const cls=[\"cell\",d.getMonth()!==view.getMonth()&&\"out\",d.getDay()===0&&\"sun\",d.getDay()===6&&\"sat\",hol&&\"hol\",key===todayISO&&\"today\",key===selected&&\"sel\"].filter(Boolean).join(\" \");\n    html+=`<button class=\"${cls}\" data-date=\"${key}\" aria-label=\"${d.getMonth()+1}월 ${d.getDate()}일${hol?\" \"+hol:\"\"}${ev.length?`, 일정 ${ev.length}건`:\"\"}\">\n      <span class=\"top\"><span class=\"d num\">${d.getDate()}</span>${hol?`<span class=\"hn\">${esc(hol)}</span>`:\"\"}</span>\n      ${ev.map(e=>`<span class=\"ev\" style=\"--mc:${esc(mem(e.who).color)}\">${e.who?esc(e.who)+\":\":\"\"}${esc(e.title.replace(\"(예시) \",\"\"))}</span>`).join(\"\")}\n      <span class=\"dots\">${ev.map(e=>`<i style=\"--mc:${esc(mem(e.who).color)}\"></i>`).join(\"\")}</span>\n    </button>`;\n  }\n  $(\"grid\").innerHTML=html;\n  renderDay();\n  renderUpcoming();\n}\n\nlet editing=null; // null | {mode:\"add\"} | {mode:\"edit\", orig}\nfunction renderDay(){\n  const sd=parseISO(selected), ev=eventsOn(selected), hol=HOLIDAYS[selected];\n  let h=`<div class=\"box-head\"><h3>${sd.getMonth()+1}월 ${sd.getDate()}일 ${DOW[sd.getDay()]}요일${selected===todayISO?\" · 오늘\":\"\"}</h3></div>`;\n  if(hol) h+=`<span class=\"hol-tag\">공휴일 · ${esc(hol)}</span>`;\n  h+=`<ul class=\"plist\">${ev.length?ev.map((e,i)=>`<li style=\"--mc:${esc(mem(e.who).color)}\">\n      <span class=\"tm num\">${esc(e.time||\"종일\")}</span>\n      <span><span class=\"who\">${esc(e.who)}</span> ${esc(e.title)}</span>\n      ${serverOK?`<button class=\"ebtn\" data-edit=\"${i}\">수정</button>`:\"<span></span>\"}</li>`).join(\"\")\n    :`<li style=\"grid-template-columns:1fr;background:transparent;border:0;padding:0\" class=\"muted\">등록된 일정이 없어요.</li>`}</ul>`;\n  if(editing) h+=formHTML();\n  else if(serverOK) h+=`<button class=\"btn add\" id=\"addBtn\">+ 이 날 일정 추가</button>`;\n  else if(loaded) h+=`<span class=\"muted\" style=\"font-size:13px\">저장 서버에 연결되지 않아 지금은 보기만 할 수 있어요.</span>`;\n  $(\"dayBox\").innerHTML=h;\n  if(editing) bindForm();\n}\n\nfunction formHTML(){\n  const o=editing.mode===\"edit\"?editing.orig:{who:\"\",time:\"\",title:\"\"};\n  return `<form class=\"form\" id=\"evForm\">\n    <strong>${editing.mode===\"edit\"?\"일정 수정\":\"새 일정\"}</strong>\n    <div class=\"field\"><label for=\"fTitle\">내용</label><input id=\"fTitle\" required maxlength=\"60\" value=\"${esc(o.title)}\" placeholder=\"예: 학교 축제\"></div>\n    <div class=\"row2\">\n      <div class=\"field\"><label for=\"fWho\">누구</label><select id=\"fWho\">${(()=>{const l=MEMBERS.filter(m=>m.name!==\"가족\").map(m=>m.name);if(o.who&&!l.includes(o.who))l.push(o.who);return `<option value=\"\"${o.who?\"\":\" selected\"}>선택 안 함</option>`+l.map(n=>`<option${n===o.who?\" selected\":\"\"}>${esc(n)}</option>`).join(\"\")})()}</select></div>\n      <div class=\"field\"><label for=\"fDate\">날짜</label><input id=\"fDate\" type=\"date\" required value=\"${esc(editing.mode===\"edit\"?o.date:selected)}\"></div>\n    </div>\n    <div class=\"row2\">\n      <div class=\"field\"><label for=\"fTime\">시간</label><input id=\"fTime\" type=\"time\" value=\"${esc(o.time||\"\")}\" ${o.time?\"\":\"disabled\"}></div>\n      <label class=\"check\" style=\"align-self:end;padding-bottom:8px\"><input type=\"checkbox\" id=\"fAllDay\" ${o.time?\"\":\"checked\"}> 종일</label>\n    </div>\n    ${needCode&&!store.get(\"familyCode\")?`<div class=\"field\"><label for=\"fCode\">가족 비밀번호 (처음 한 번만)</label><input id=\"fCode\" type=\"password\" autocomplete=\"off\"></div>`:\"\"}\n    <div class=\"msg\" id=\"fMsg\"></div>\n    <div class=\"actions\">\n      ${editing.mode===\"edit\"?`<button type=\"button\" class=\"btn danger\" id=\"fDel\">삭제</button>`:\"\"}\n      <span class=\"sp\"></span>\n      <button type=\"button\" class=\"btn ghost\" id=\"fCancel\">취소</button>\n      <button type=\"submit\" class=\"btn\" id=\"fSave\">저장</button>\n    </div>\n  </form>`;\n}\n\nfunction bindForm(){\n  $(\"fAllDay\").onchange=e=>{$(\"fTime\").disabled=e.target.checked;if(!e.target.checked&&!$(\"fTime\").value)$(\"fTime\").value=\"09:00\"};\n  $(\"fCancel\").onclick=()=>{editing=null;renderDay()};\n  if($(\"fDel\")) $(\"fDel\").onclick=async()=>{\n    const b=$(\"fDel\"); if(b.dataset.c!==\"1\"){b.dataset.c=\"1\";b.textContent=\"한 번 더 누르면 삭제\";return}\n    await commit({type:\"delete\",orig:editing.orig});\n  };\n  $(\"evForm\").onsubmit=async e=>{\n    e.preventDefault();\n    if($(\"fCode\")){const c=$(\"fCode\").value.trim();if(!c){msg(\"가족 비밀번호를 적어주세요.\",\"err\");return}store.set(\"familyCode\",c)}\n    const next={date:$(\"fDate\").value,who:$(\"fWho\").value,title:$(\"fTitle\").value.trim()};\n    if(!$(\"fAllDay\").checked&&$(\"fTime\").value) next.time=$(\"fTime\").value;\n    if(!next.title||!next.date){msg(\"내용과 날짜를 적어주세요.\",\"err\");return}\n    await commit(editing.mode===\"edit\"?{type:\"update\",orig:editing.orig,next}:{type:\"add\",next});\n  };\n  $(\"fTitle\").focus();\n}\nfunction msg(t,k){const m=$(\"fMsg\");if(m){m.textContent=t;m.className=\"msg \"+(k||\"\")}}\n\nfunction renderUpcoming(){\n  const up=events.filter(e=>e.date>=todayISO).sort((a,b)=>a.date.localeCompare(b.date)||byTime(a,b)).slice(0,5);\n  $(\"upcoming\").innerHTML=up.length?up.map(e=>{const d=parseISO(e.date),n=Math.round((d-today)/864e5);\n    return `<li style=\"--mc:${esc(mem(e.who).color)};grid-template-columns:auto 1fr\"><span class=\"dday num\">${n===0?\"D-DAY\":\"D-\"+n}</span><span><span class=\"who\">${esc(e.who)}</span> ${esc(e.title)}<br><span class=\"muted num\" style=\"font-size:12.5px\">${d.getMonth()+1}/${d.getDate()} (${DOW[d.getDay()]})${e.time?\" \"+esc(e.time):\"\"}</span></span></li>`}).join(\"\")\n    :`<li style=\"grid-template-columns:1fr;background:transparent;border:0;padding:0\" class=\"muted\">예정된 일정이 없어요.</li>`;\n}\n\n/* ================= 저장 (Cloudflare) ================= */\nconst API=\"/api/state\";\nconst SEED={events:EVENTS,pickups:PICKUPS,notes:NOTES,pickupsVersion:PICKUP_VERSION};\nlet serverPkVer=0, resetTried=false;\nlet doneMap={};\nfunction applyState(d){\n  if(Array.isArray(d.events)) events=d.events;\n  if(Array.isArray(d.pickups)) pickups=d.pickups;\n  if(Array.isArray(d.notes)) notes=d.notes;\n  doneMap=(d.done&&d.done[todayISO])||{};\n}\nasync function sync(first){\n  try{\n    const r=await fetch(API,{cache:\"no-store\"}); if(!r.ok) throw 0;\n    const d=await r.json(); serverOK=true; needCode=!!d.needCode; applyState(d); serverPkVer=+d.pickupsVersion||0; if(d.kakao) kakao=d.kakao;\n  }catch(e){ if(first){serverOK=false; doneMap=store.get(\"pickupDone\")||{};} }\n  loaded=true;\n  if(!editing) renderCalendar(); else renderUpcoming();\n  if(!$(\"pkDlg\").open) renderLive(); renderNotes(); renderStatus(); renderKakao();\n  checkPickupVersion();\n}\n// index.html의 PICKUPS가 새 버전이면 홈페이지 픽업표를 그 목록으로 바꿉니다\nasync function checkPickupVersion(force){\n  const n=$(\"pkNotice\");\n  if(!serverOK||serverPkVer>=PICKUP_VERSION){n.hidden=true;return}\n  if(!force&&(resetTried||(needCode&&!store.get(\"familyCode\")))){n.hidden=false;$(\"pkCode\").hidden=!(needCode&&!store.get(\"familyCode\"));return}\n  resetTried=true;\n  try{\n    const d=await post({kind:\"pickup\",op:\"reset\",seed:SEED});\n    applyState(d); serverPkVer=+d.pickupsVersion||PICKUP_VERSION; n.hidden=true; renderLive();\n    toast(\"새 픽업 시간표를 적용했어요.\");\n  }catch(e){\n    if(e.status===401) store.del(\"familyCode\");\n    n.hidden=false; $(\"pkCode\").hidden=!(needCode&&!store.get(\"familyCode\"));\n  }\n}\nfunction renderStatus(){\n  $(\"connStatus\").innerHTML=serverOK?\"✓ 저장 서버 연결됨 · 가족 모두에게 바로 반영돼요\"\n    :\"저장 서버에 연결되지 않았어요. Cloudflare 주소(…pages.dev)로 열었는지 확인해주세요.\";\n}\nasync function post(body){\n  const h={\"content-type\":\"application/json\"}; const c=store.get(\"familyCode\"); if(c) h[\"x-family-code\"]=c;\n  const r=await fetch(API,{method:\"POST\",headers:h,body:JSON.stringify(body)});\n  let d={}; try{d=await r.json()}catch(e){}\n  if(!r.ok){const e=new Error(d.error||\"http\");e.status=r.status;e.data=d;throw e}\n  return d;\n}\n\nasync function commit(change){\n  const save=$(\"fSave\"); if(save){save.disabled=true;save.textContent=\"저장 중…\"}\n  msg(\"저장하는 중…\");\n  try{\n    const d=await post({op:change.type,orig:change.orig,next:change.next,seed:SEED});\n    applyState(d); editing=null; renderNotes();\n    if(change.next&&change.next.date!==selected){selected=change.next.date;const dt=parseISO(selected);view=new Date(dt.getFullYear(),dt.getMonth(),1)}\n    renderCalendar();\n    toast(change.type===\"add\"?\"추가했어요.\":change.type===\"delete\"?\"삭제했어요.\":\"수정했어요.\");\n  }catch(e){\n    if(save){save.disabled=false;save.textContent=\"저장\"}\n    if(e.status===401){store.del(\"familyCode\");msg(\"가족 비밀번호가 맞지 않아요. 다시 적어주세요.\",\"err\");renderDay();msg(\"가족 비밀번호가 맞지 않아요. 다시 적어주세요.\",\"err\");}\n    else if(e.status===409){applyState(e.data);editing=null;renderCalendar();toast(\"다른 가족이 먼저 이 일정을 바꿨어요. 최신 내용으로 다시 확인해주세요.\");}\n    else msg(\"저장하지 못했어요. 인터넷 연결을 확인하고 다시 눌러주세요.\",\"err\");\n  }\n}\nasync function toggleDone(k){\n  const v=!doneMap[k]; doneMap={...doneMap}; if(v) doneMap[k]=true; else delete doneMap[k];\n  renderLive();\n  if(!serverOK){store.set(\"pickupDone\",doneMap);return}\n  try{applyState(await post({op:\"done\",date:todayISO,key:k,value:v,seed:SEED}));renderLive()}\n  catch(e){ if(e.status===401){store.del(\"familyCode\");toast(\"가족 비밀번호가 필요해요. 일정이나 픽업을 한 번 저장하면서 입력해주세요.\")} else toast(\"픽업 완료를 저장하지 못했어요.\"); sync(); }\n}\n\n/* ================= 실시간 픽업 ================= */\nconst noPick=new Set(NO_PICKUP_DAYS);\nconst offDay=d=>{const k=iso(d);return noPick.has(k)||(SKIP_PICKUP_ON_HOLIDAYS&&!!HOLIDAYS[k])};\nconst pickupsFor=d=>offDay(d)?[]:pickups.filter(p=>p.day===DOW[d.getDay()]).sort(byTime);\nconst doneKey=p=>`${todayISO}|${p.time}|${p.who}`;\nfunction fmtDur(m){const h=Math.floor(m/60),r=m%60;return h?`${h}시간${r?\" \"+r+\"분\":\"\"}`:`${r}분`}\nfunction status(p,nowM){\n  if(doneMap[doneKey(p)]) return [\"done\",\"완료\"];\n  const diff=mins(p.time)-nowM;\n  if(diff>30) return [\"wait\",`${fmtDur(diff)} 후`];\n  if(diff>0) return [\"soon\",`${diff}분 후 · 곧 출발`];\n  if(diff>-30) return [\"now\",\"픽업 시간\"];\n  return [\"done\",\"시간 지남\"];\n}\nfunction nextPickup(now){\n  const nowM=now.getHours()*60+now.getMinutes();\n  for(let i=0;i<14;i++){\n    const d=new Date(today); d.setDate(today.getDate()+i);\n    const list=pickupsFor(d).filter(p=>i>0||(mins(p.time)>nowM&&!doneMap[doneKey(p)]));\n    if(list.length) return {p:list[0],d,i};\n  }\n  return null;\n}\nfunction renderLive(){\n  const now=kstNow(), nowM=now.getHours()*60+now.getMinutes();\n  $(\"clock\").textContent=`${pad(now.getHours())}:${pad(now.getMinutes())}`;\n  const list=pickupsFor(today), hol=HOLIDAYS[todayISO];\n  $(\"liveList\").innerHTML=list.length?list.map(p=>{\n    const m=mem(p.who), [k,label]=status(p,nowM), isDone=!!doneMap[doneKey(p)];\n    return `<article class=\"lcard is-${k}${isDone?\" is-done\":\"\"}\" style=\"--mc:${esc(m.color)}\">\n      <div class=\"t\"><span class=\"ltime\">${esc(p.time)}</span><span class=\"st ${k}\">${esc(label)}</span></div>\n      <div><span class=\"who\">${esc(p.who)}</span> · ${esc(p.place)}</div>\n      <button class=\"chk\" data-done=\"${esc(doneKey(p))}\">${isDone?\"✓ 픽업 완료\":\"픽업 완료 표시\"}</button>\n    </article>`}).join(\"\"):`<div class=\"empty\">${hol&&SKIP_PICKUP_ON_HOLIDAYS?`오늘은 ${esc(hol)}이라 픽업이 없어요.`:\"오늘은 픽업이 없어요.\"}</div>`;\n  const n=nextPickup(now);\n  if(!n) $(\"nextLine\").innerHTML='<span class=\"muted\">예정된 픽업이 없어요.</span>';\n  else{\n    const when=n.i===0?`오늘 <b>${esc(n.p.time)}</b> (${fmtDur(mins(n.p.time)-nowM)} 후)`\n      :`${n.i===1?\"내일\":`${n.d.getMonth()+1}/${n.d.getDate()}`} (${DOW[n.d.getDay()]}) <b>${esc(n.p.time)}</b>`;\n    $(\"nextLine\").innerHTML=`다음 픽업 · <span class=\"who\" style=\"--mc:${esc(mem(n.p.who).color)}\">${esc(n.p.who)}</span> ${when} · ${esc(n.p.place)}`;\n  }\n  renderTimetable(now);\n}\nlet TT=null;\nfunction renderTimetable(now){\n  const H=parseFloat(getComputedStyle(document.documentElement).getPropertyValue(\"--hour\"))||58;\n  const all=pickups.map(p=>mins(p.time));\n  const startH=all.length?Math.min(13,Math.floor(Math.min(...all)/60)):13, endH=all.length?Math.min(24,Math.max(22,Math.ceil((Math.max(...all)+40)/60))):22;\n  TT={startH,endH,H,PADT:12};\n  const PADT=12, hours=endH-startH, height=hours*H+PADT*2;\n  const top=m=>PADT+(m-startH*60)/60*H;\n  const tdw=DOW[today.getDay()];\n  const mon=new Date(today); mon.setDate(today.getDate()+(today.getDay()===0?1:1-today.getDay()));\n  const dates=PDAYS.map((d,i)=>{const dt=new Date(mon);dt.setDate(mon.getDate()+i);return dt});\n  let h=`<div class=\"tt-h\" style=\"border-right:1px solid var(--line)\"></div>`;\n  PDAYS.forEach((d,i)=>{const dt=dates[i],hol=HOLIDAYS[iso(dt)];\n    h+=`<div class=\"tt-h${d===tdw?\" today\":\"\"}${d===\"토\"?\" sat\":\"\"}${hol?\" hol\":\"\"}\">${d}<small class=\"num\">${hol?esc(hol):`${dt.getMonth()+1}/${dt.getDate()}`}</small></div>`});\n  let axis=`<div class=\"axis\" style=\"height:${height}px\">`;\n  for(let k=0;k<=hours;k++) axis+=`<span style=\"top:${PADT+k*H}px\">${pad(startH+k)}:00</span>`;\n  axis+=\"</div>\";\n  const nowM=now.getHours()*60+now.getMinutes();\n  let cols=\"\";\n  PDAYS.forEach((d,i)=>{\n    const isToday=d===tdw, off=offDay(dates[i]);\n    const items=pickups.filter(p=>p.day===d).sort(byTime);\n    cols+=`<div class=\"col${isToday?\" today\":\"\"}${HOLIDAYS[iso(dates[i])]?\" hol\":\"\"}${serverOK?\" can\":\"\"}\" data-col=\"${d}\" style=\"height:${height}px\">`+\n      items.map(p=>{const m=mem(p.who),dn=isToday&&doneMap[doneKey(p)];\n        return `<button class=\"blk${dn?\" done\":\"\"}${off?\" off\":\"\"}\" data-pk=\"${pickups.indexOf(p)}\" style=\"--mc:${esc(m.color)};top:${top(mins(p.time))+1}px;height:${Math.max(H*0.7,40)}px\" title=\"${esc(p.time+\" \"+p.who+\" \"+p.place)}\"><b>${esc(p.time)} ${esc(p.who)}</b><span>${esc(p.place)}</span></button>`}).join(\"\")+\n      (isToday&&nowM>=startH*60&&nowM<=endH*60?`<div class=\"nowline\" style=\"top:${top(nowM)}px\"></div>`:\"\")+\n      `</div>`;\n  });\n  $(\"tt\").innerHTML=h+axis+cols;\n}\n\n/* ================= 픽업 편집 ================= */\n$(\"pWho\").innerHTML=(MEMBERS.some(m=>m.kid)?MEMBERS.filter(m=>m.kid):MEMBERS.filter(m=>m.name!==\"가족\")).map(m=>`<option>${esc(m.name)}</option>`).join(\"\")||MEMBERS.map(m=>`<option>${esc(m.name)}</option>`).join(\"\");\nlet pkOrig=null;\nfunction openPickup(p,day,time){\n  pkOrig=p||null;\n  $(\"pkTitle\").textContent=p?\"픽업 수정\":\"픽업 추가\";\n  $(\"pDay\").value=p?p.day:(day||\"월\");\n  $(\"pTime\").value=p?p.time:(time||\"15:00\");\n  $(\"pWho\").value=p?p.who:$(\"pWho\").options[0].value;\n  $(\"pPlace\").value=p?p.place||\"\":\"\";\n  $(\"pDel\").hidden=!p; $(\"pDel\").dataset.c=\"\"; $(\"pDel\").textContent=\"삭제\";\n  $(\"pCodeWrap\").hidden=!(needCode&&!store.get(\"familyCode\"));\n  $(\"pMsg\").textContent=\"\"; $(\"pMsg\").className=\"msg\";\n  $(\"pSave\").disabled=false; $(\"pSave\").textContent=\"저장\";\n  $(\"pkDlg\").showModal();\n}\nconst pmsg=(t,k)=>{$(\"pMsg\").textContent=t;$(\"pMsg\").className=\"msg \"+(k||\"\")};\nasync function savePickup(op,next){\n  if(!$(\"pCodeWrap\").hidden){const c=$(\"pCode\").value.trim();if(!c){pmsg(\"가족 비밀번호를 적어주세요.\",\"err\");return}store.set(\"familyCode\",c)}\n  $(\"pSave\").disabled=true; pmsg(\"저장하는 중…\");\n  try{\n    applyState(await post({kind:\"pickup\",op,orig:pkOrig,next,seed:SEED}));\n    $(\"pkDlg\").close(); renderLive(); renderNotes();\n    toast(op===\"add\"?\"픽업을 추가했어요.\":op===\"delete\"?\"픽업을 삭제했어요.\":\"픽업을 수정했어요.\");\n  }catch(e){\n    $(\"pSave\").disabled=false;\n    if(e.status===401){store.del(\"familyCode\");$(\"pCodeWrap\").hidden=false;pmsg(\"가족 비밀번호가 맞지 않아요. 다시 적어주세요.\",\"err\")}\n    else if(e.status===409){applyState(e.data);$(\"pkDlg\").close();renderLive();toast(\"다른 가족이 먼저 이 픽업을 바꿨어요. 최신 내용으로 다시 확인해주세요.\")}\n    else pmsg(\"저장하지 못했어요. 인터넷 연결을 확인하고 다시 눌러주세요.\",\"err\");\n  }\n}\n$(\"pkForm\").addEventListener(\"submit\",e=>{\n  e.preventDefault();\n  const next={day:$(\"pDay\").value,time:$(\"pTime\").value,who:$(\"pWho\").value,place:$(\"pPlace\").value.trim()};\n  if(!next.time){pmsg(\"시간을 적어주세요.\",\"err\");return}\n  savePickup(pkOrig?\"update\":\"add\",next);\n});\n$(\"pCancel\").onclick=()=>$(\"pkDlg\").close();\n$(\"pDel\").onclick=()=>{const b=$(\"pDel\");if(b.dataset.c!==\"1\"){b.dataset.c=\"1\";b.textContent=\"한 번 더 누르면 삭제\";return}savePickup(\"delete\",null)};\n$(\"pkApply\").onclick=()=>{\n  if(!$(\"pkCode\").hidden){const c=$(\"pkCode\").value.trim();if(!c){toast(\"가족 비밀번호를 적어주세요.\");return}store.set(\"familyCode\",c)}\n  checkPickupVersion(true);\n};\n$(\"pkAdd\").onclick=()=>openPickup(null,PDAYS.includes(DOW[today.getDay()])?DOW[today.getDay()]:\"월\");\n$(\"tt\").addEventListener(\"click\",e=>{\n  if(!serverOK) return;\n  const b=e.target.closest(\"[data-pk]\");\n  if(b){openPickup(pickups[+b.dataset.pk]);return}\n  const col=e.target.closest(\"[data-col]\");\n  if(col&&TT){const y=e.clientY-col.getBoundingClientRect().top;\n    let m=Math.round((TT.startH*60+(y-TT.PADT)/TT.H*60)/10)*10; m=Math.max(0,Math.min(23*60+50,m));\n    openPickup(null,col.dataset.col,`${pad(Math.floor(m/60))}:${pad(m%60)}`)}\n});\n\n/* ================= 가족 메모 ================= */\nfunction renderNotes(){\n  $(\"notes\").innerHTML=notes.length?notes.map((n,i)=>`<li><span class=\"txt\">${esc(n)}</span>${serverOK?`<button class=\"x\" data-note=\"${i}\" aria-label=\"메모 삭제\">×</button>`:\"\"}</li>`).join(\"\")\n    :'<li class=\"muted\">메모가 없어요. 준비물이나 일정 변경을 적어두세요.</li>';\n  $(\"noteForm\").hidden=!serverOK; $(\"nCode\").hidden=!(needCode&&!store.get(\"familyCode\")); $(\"pkAdd\").hidden=!serverOK; $(\"pkHint\").hidden=!serverOK;\n}\nasync function noteOp(op,orig,next){\n  try{applyState(await post({kind:\"note\",op,orig,next,seed:SEED}));renderNotes();return true}\n  catch(e){\n    if(e.status===401){store.del(\"familyCode\");renderNotes();toast(\"가족 비밀번호가 맞지 않아요. 다시 적어주세요.\")}\n    else if(e.status===409){applyState(e.data);renderNotes();toast(\"다른 가족이 먼저 이 메모를 바꿨어요.\")}\n    else toast(\"메모를 저장하지 못했어요.\");\n    return false;\n  }\n}\n$(\"noteForm\").addEventListener(\"submit\",async e=>{\n  e.preventDefault(); const v=$(\"noteInput\").value.trim(); if(!v) return;\n  if(needCode&&!store.get(\"familyCode\")){const c=$(\"nCode\").value.trim();if(!c){$(\"nCode\").hidden=false;$(\"nCode\").focus();toast(\"가족 비밀번호를 적어주세요.\");return}store.set(\"familyCode\",c)}\n  $(\"noteAdd\").disabled=true;\n  if(await noteOp(\"add\",null,v)) $(\"noteInput\").value=\"\";\n  $(\"noteAdd\").disabled=false;\n});\n$(\"notes\").addEventListener(\"click\",e=>{const b=e.target.closest(\"[data-note]\");if(!b) return;\n  if(b.dataset.c!==\"1\"){b.dataset.c=\"1\";b.textContent=\"삭제?\";b.style.fontSize=\"13px\";b.style.color=\"var(--sun)\";return}\n  noteOp(\"delete\",notes[+b.dataset.note],null)});\n\n/* ================= 카카오톡 알림 ================= */\nlet kakao=null;\nfunction renderKakao(){\n  const box=$(\"kakao\");\n  if(!serverOK||!kakao||!(typeof KAKAO_RECEIVERS!==\"undefined\"&&KAKAO_RECEIVERS.length)){box.hidden=true;return}\n  box.hidden=false;\n  $(\"kCode\").hidden=!(needCode&&!store.get(\"familyCode\"));\n  if(!kakao.ready){$(\"kakaoList\").innerHTML='<div class=\"muted\" style=\"font-size:13.5px\">카카오 연결 설정(REST API 키)이 아직 안 됐어요. 설정이 끝나면 여기에 연결 버튼이 생겨요.</div>';return}\n  $(\"kakaoList\").innerHTML=KAKAO_RECEIVERS.map(w=>{\n    const st=(kakao.people||{})[w]||{}, m=mem(w);\n    const chip=st.broken?'<span class=\"kchip bad\">다시 연결 필요</span>':st.linked?'<span class=\"kchip on\">연결됨</span>':'<span class=\"kchip\">연결 안 됨</span>';\n    const last=st.lastError?`<small>최근 오류: ${esc(st.lastError)}</small>`:st.lastSent?`<small>마지막 발송: ${esc(new Date(st.lastSent).toLocaleString(\"ko-KR\",{timeZone:\"Asia/Seoul\",month:\"numeric\",day:\"numeric\",hour:\"2-digit\",minute:\"2-digit\"}))}</small>`:\"\";\n    return `<div class=\"k-row\" style=\"--mc:${esc(m.color)}\"><span class=\"nm\">${esc(w)}</span>${chip}<span class=\"sp\"></span>\n      ${st.linked?`<button class=\"ebtn\" data-ktest=\"${esc(w)}\">테스트 보내기</button><button class=\"ebtn\" data-kunlink=\"${esc(w)}\">연결 해제</button>`\n        :`<button class=\"kbtn\" data-klink=\"${esc(w)}\">카카오톡 ${st.broken?\"다시 \":\"\"}연결</button>`}${last}</div>`}).join(\"\");\n}\nasync function kpost(path,body){\n  if(needCode&&!store.get(\"familyCode\")){const c=$(\"kCode\").value.trim();if(!c){$(\"kCode\").hidden=false;$(\"kCode\").focus();toast(\"가족 비밀번호를 적어주세요.\");throw new Error(\"nocode\")}store.set(\"familyCode\",c)}\n  const h={\"content-type\":\"application/json\"};const c=store.get(\"familyCode\");if(c)h[\"x-family-code\"]=c;\n  const r=await fetch(path,{method:\"POST\",headers:h,body:JSON.stringify(body)});let d={};try{d=await r.json()}catch(e){}\n  if(r.status===401){store.del(\"familyCode\");renderKakao();toast(\"가족 비밀번호가 맞지 않아요. 다시 적어주세요.\");throw new Error(\"code\")}\n  return {ok:r.ok,d};\n}\n$(\"kakaoList\").addEventListener(\"click\",async e=>{\n  const l=e.target.closest(\"[data-klink]\"),t=e.target.closest(\"[data-ktest]\"),u=e.target.closest(\"[data-kunlink]\");\n  try{\n    if(l){const {ok,d}=await kpost(\"/api/kakao/start\",{who:l.dataset.klink});if(ok&&d.url) location.href=d.url; else toast(\"카카오 연결을 시작하지 못했어요.\");}\n    if(t){t.disabled=true;t.textContent=\"보내는 중…\";const {ok,d}=await kpost(\"/api/kakao/test\",{who:t.dataset.ktest});if(d.kakao)kakao=d.kakao;renderKakao();toast(ok?\"카카오톡을 확인해보세요. 테스트 메시지를 보냈어요.\":\"보내지 못했어요. 아래 오류 내용을 확인해주세요.\");}\n    if(u){if(u.dataset.c!==\"1\"){u.dataset.c=\"1\";u.textContent=\"한 번 더 누르면 해제\";return}const {d}=await kpost(\"/api/kakao/unlink\",{who:u.dataset.kunlink});if(d.kakao)kakao=d.kakao;renderKakao();toast(\"연결을 해제했어요.\");}\n  }catch(err){}\n});\n(()=>{const q=new URLSearchParams(location.search),k=q.get(\"kakao\");if(!k)return;\n  const msgs={linked:`${q.get(\"who\")||\"\"} 카카오톡 알림이 연결됐어요. 카카오톡 \"나와의 채팅\"을 확인해보세요.`,cancel:\"카카오 연결을 취소했어요.\",expired:\"연결 시간이 지났어요. 다시 눌러주세요.\",error:\"카카오 연결에 실패했어요. 카카오 앱 설정(Redirect URI, 동의항목)을 확인해주세요.\"};\n  setTimeout(()=>toast(msgs[k]||\"\"),300);\n  try{history.replaceState(null,\"\",location.pathname+\"#kakao\")}catch(e){}\n})();\n\n/* ================= 이벤트 ================= */\ndocument.addEventListener(\"click\",e=>{\n  const c=e.target.closest(\"[data-date]\");\n  if(c){selected=c.dataset.date;editing=null;const d=parseISO(selected);\n    if(d.getMonth()!==view.getMonth()||d.getFullYear()!==view.getFullYear()) view=new Date(d.getFullYear(),d.getMonth(),1);\n    renderCalendar();\n    if(window.innerWidth<900) $(\"dayBox\").scrollIntoView({behavior:\"smooth\",block:\"start\"});\n    return;}\n  if(e.target.closest(\"#addBtn\")){editing={mode:\"add\"};renderDay();return}\n  const ed=e.target.closest(\"[data-edit]\");\n  if(ed){editing={mode:\"edit\",orig:eventsOn(selected)[+ed.dataset.edit]};renderDay();return}\n  const b=e.target.closest(\"[data-done]\");\n  if(b){toggleDone(b.dataset.done);}\n});\n$(\"prev\").onclick=()=>{view=new Date(view.getFullYear(),view.getMonth()-1,1);renderCalendar()};\n$(\"next\").onclick=()=>{view=new Date(view.getFullYear(),view.getMonth()+1,1);renderCalendar()};\n$(\"thisMonth\").onclick=()=>{view=new Date(today.getFullYear(),today.getMonth(),1);selected=todayISO;editing=null;renderCalendar()};\n\nrenderCalendar(); renderLive(); renderNotes(); sync(true);\nsetInterval(()=>{ if(iso(kstNow())!==todayISO) location.reload(); else sync(); },30000);\n</script>\n</body>\n</html>\n";

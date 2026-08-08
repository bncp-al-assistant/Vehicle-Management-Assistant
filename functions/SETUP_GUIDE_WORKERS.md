# Cloudflare Workers로 배포하기 (자산택) — Workers 버전

지금 만들어진 프로젝트가 **Pages**가 아니라 **Workers**였기 때문에, 이 방식에 맞게 구조를 바꿨습니다.
이전에 만든 `functions/` 폴더는 이제 필요 없습니다 (지워도 되고, 안 지워도 무시됩니다).

---

## 최종 저장소 구조

```
(저장소 최상위)
├── wrangler.jsonc        ← Worker 설정 파일 (이게 핵심)
├── src/
│   └── worker.js           ← 실제 서버 코드 (API + 정적 파일 라우팅)
└── public/
    └── index.html           ← 자산택 앱 화면 (기존 index.html을 여기로 이동)
```

⚠️ 기존에 저장소 최상위에 있던 `index.html`은 **`public/` 폴더 안으로 옮겨야** 합니다.
(최상위에 그대로 두면 안 됩니다 — `wrangler.jsonc`가 `public` 폴더를 정적 파일 폴더로 지정하기 때문입니다.)

---

## 1. Cloudflare에서 KV 네임스페이스 ID 확인

1. Cloudflare 대시보드 → **Workers & Pages(컴퓨트) → KV**
2. 이미 만들어둔 `assets-kv` 클릭
3. 화면에 보이는 **네임스페이스 ID** (긴 영문+숫자 조합)를 복사해두세요

## 2. wrangler.jsonc에 KV ID 채우기

이 폴더의 `wrangler.jsonc` 파일을 열어서:

```jsonc
"kv_namespaces": [
  {
    "binding": "ASSETS_KV",
    "id": "여기에_KV_네임스페이스_ID_붙여넣기"
  }
]
```

`"여기에_KV_네임스페이스_ID_붙여넣기"` 부분을 1단계에서 복사한 실제 ID로 교체합니다.

## 3. GitHub 저장소 정리

GitHub 웹 화면에서:

1. 기존 최상위 `index.html` → 열기 → **"..." 메뉴 → 파일 삭제**
2. **파일 추가 → 파일 업로드(Upload files)** → 이 폴더의 `wrangler.jsonc`, `src/worker.js`, `public/index.html`을
   **폴더 구조 그대로 유지**하며 업로드
   (드래그 앤 드롭 시 폴더째로 끌어다 놓으면 구조가 유지됩니다. 안 되면 아래 "파일 추가 → 새 파일 만들기"로
   경로를 직접 입력해서 만드셔도 됩니다: `src/worker.js`, `public/index.html`, `wrangler.jsonc`)
3. 기존 `functions` 폴더는 그대로 둬도 무방하지만, 깔끔하게 하려면 각 파일을 열어 삭제하셔도 됩니다.
4. Commit changes

## 4. 재배포 확인

GitHub에 커밋하면 Cloudflare가 자동으로 다시 빌드합니다 (Workers 프로젝트 화면의 "배치" 탭에서 진행 상황 확인 가능).
배포가 끝나면:

1. 프로젝트 개요 화면에서 더 이상 **"정적 자산만 있는 근로자"** 문구가 보이지 않아야 합니다
2. **설정 → 변수와 비밀** 로 들어가면 이제 **"추가" 버튼이 활성화**돼 있을 겁니다

## 5. 환경 변수(비밀 값) 등록

**설정 → 변수와 비밀**에서 아래 2개를 추가:

| 이름 | 값 | 유형 |
|---|---|---|
| `ANTHROPIC_API_KEY` | `sk-ant-...` | **비밀(Secret)** 로 추가 (암호화됨) |
| `APP_ACCESS_TOKEN` | 원하는 접속 코드 (예: `bncp2026!`) | 비밀(Secret) 또는 일반 변수 |

저장하면 자동으로 재배포됩니다.

## 6. 접속 확인

`https://vehicle-management-assistant.chogak1449.workers.dev` 로 접속:

1. 처음 접속 시 "접속 코드를 입력하세요" 팝업 → 5단계에서 정한 `APP_ACCESS_TOKEN` 입력
2. 자산 등록 후 새로고침해도 남아있으면 KV 저장 성공
3. AI 명령 탭에서 질문 → 응답 오면 성공

---

## 문제가 생기면

- **배포 후에도 "정적 자산만 있는 근로자"가 계속 뜸** → `wrangler.jsonc`가 저장소 **최상위**에 있는지, `main` 필드가 `src/worker.js`를 정확히 가리키는지 확인
- **화면이 하얗게 나옴 / 404** → `public/index.html` 위치가 맞는지, `wrangler.jsonc`의 `assets.directory`가 `./public`인지 확인
- **저장/AI가 "Failed to fetch"** → KV 네임스페이스 ID가 정확한지(2단계), 환경 변수 2개가 등록됐는지(5단계) 확인

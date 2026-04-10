/* ── ターミナル出力ヘルパー ────────────────────── */

/** タイトルだけ変えてHTMLを即時セット */
function setKbOut(title, html) {
  document.getElementById('kbTermTitle').textContent = title;
  document.getElementById('kbTermOut').innerHTML = html;
}

/**
 * 行を順番にフェードインしながら出力
 * lines = [{ d: 遅延ms, h: HTML文字列 }, ...]
 */
function typeKbLines(title, lines) {
  document.getElementById('kbTermTitle').textContent = title;
  var out = document.getElementById('kbTermOut');
  out.innerHTML = '';
  lines.forEach(function(l) {
    setTimeout(function() {
      var d = document.createElement('div');
      d.innerHTML = l.h;
      d.style.cssText = 'opacity:0;transition:opacity 0.18s';
      out.appendChild(d);
      out.scrollTop = out.scrollHeight;
      setTimeout(function() { d.style.opacity = '1'; }, 20);
    }, l.d);
  });
}

/* ── キー押下エフェクト ───────────────────────── */
function pressKey(id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.classList.add('pressed');
  setTimeout(function() { el.classList.remove('pressed'); }, 160);
}

/* ── Keyboard 表示トグル ─────────────────────── */
var kbVisible = false;
function toggleKb() {
  kbVisible = !kbVisible;
  var tray = document.getElementById('kbFloat');
  if (tray) tray.classList.toggle('hidden', !kbVisible);
  var btn = document.getElementById('kbToggleBtn');
  if (btn) btn.textContent = kbVisible ? 'Keyboard非表示' : 'Keyboard表示';
}

/* ══════════════════════════════════════════════
   esc キー → セキュリティスキル一覧
══════════════════════════════════════════════ */
function keyEsc() {
  pressKey('key-esc');
  typeKbLines('security_skills.txt', [
    { d: 0,    h: '<span class="tp">shirasaka@portfolio:~$</span> <span class="tv">cat security_skills.txt</span>' },
    { d: 500,  h: '<span class="tc">// Security Skills Overview</span>' },
    { d: 900,  h: '<span class="tg">[✓]</span> <span class="tv">CompTIA Network+</span> <span class="tc">— network fundamentals</span>' },
    { d: 1300, h: '<span class="tg">[✓]</span> <span class="tv">EC-Council CCT</span>  <span class="tc">— cybersecurity</span>' },
    { d: 1700, h: '<span class="tg">[✓]</span> <span class="tv">picoCTF 2024</span>   <span class="tc">— crypto / web</span>' },
    { d: 2100, h: '<span class="ty">[~]</span> <span class="tv">Linux / Bash</span>   <span class="tc">— 習得中</span>' },
    { d: 2500, h: '<span class="ty">[~]</span> <span class="tv">Cloud Security</span> <span class="tc">— 入門中</span>' },
    { d: 3000, h: '<span class="tp">shirasaka@portfolio:~$</span> <span class="cur">▋</span>' },
  ]);
}

/* ══════════════════════════════════════════════
   🔐 キー → グリッチ演出
   ・ターミナルに暗号化アニメを表示
   ・アバター (#avatar) と 名前 (#nameEl) もグリッチ
══════════════════════════════════════════════ */
var glitching = false;
var GLITCH = '█▓▒░$#@%&*!?<>{}[]01アイウエオカキクケコ白緋明';

function keyLock() {
  if (glitching) return;
  glitching = true;
  pressKey('key-lock');

  /* ── ターミナル出力 ── */
  typeKbLines('encrypt.sh — running...', [
    { d: 0,    h: '<span class="tp">shirasaka@portfolio:~$</span> <span class="tv">./encrypt.sh profile.txt</span>' },
    { d: 400,  h: '<span class="tc">暗号化中...</span> <span class="ty">██</span>' },
    { d: 800,  h: '<span class="tc">暗号化中...</span> <span class="ty">████</span>' },
    { d: 1200, h: '<span class="tc">暗号化中...</span> <span class="ty">██████</span>' },
    { d: 1500, h: '<span class="tc">暗号化中...</span> <span class="ty">██████████</span> 100%' },
    { d: 1900, h: '<span class="tg">// 復号完了 — profile restored ✓</span>' },
    { d: 2200, h: '<span class="tp">shirasaka@portfolio:~$</span> <span class="cur">▋</span>' },
  ]);

  /* ── ビジュアルグリッチ (#avatar と #nameEl) ── */
  var av       = document.getElementById('avatar');
  var ne       = document.getElementById('nameEl');
  var origHTML = ne ? ne.innerHTML : '';
  var colors   = ['#0f0','#f0f','#0ff','#ff0','#E24B4A','#fff'];
  var t = 0;

  var iv = setInterval(function() {
    var s = '';
    for (var i = 0; i < 6; i++)
      s += GLITCH[Math.floor(Math.random() * GLITCH.length)];

    if (ne) ne.innerHTML =
      '<span style="font-family:\'DM Mono\',monospace;color:#E24B4A;' +
      'font-size:clamp(13px,1.8vw,17px)">' + s + '</span>';

    if (av) {
      av.style.background = colors[Math.floor(Math.random() * colors.length)];
      av.style.color = '#fff';
    }

    t += 80;
    if (t > 1600) {
      clearInterval(iv);
      if (ne) ne.innerHTML = origHTML;
      if (av) { av.style.background = ''; av.style.color = ''; }
      glitching = false;
    }
  }, 80);
}

/* ══════════════════════════════════════════════
   Ctrl + Alt → Easter egg
══════════════════════════════════════════════ */
var ctrlHeld = false, altHeld = false;

function keyCtrlAlt(k) {
  pressKey('key-' + k);
  if (k === 'ctrl') ctrlHeld = true;
  if (k === 'alt')  altHeld  = true;

  if (ctrlHeld && altHeld) {
    ctrlHeld = false; altHeld = false;

    setKbOut('hidden_command — ACTIVATED',
      '<span class="ty">// HIDDEN COMMAND DETECTED</span><br>' +
      '<span class="tp">shirasaka@portfolio:~$</span> <span class="tv">./secret.sh</span><br>' +
      '<span class="tg">// ACCESS GRANTED 🎁</span>'
    );

    // アニメーション付きでオーバーレイを表示
    var overlay = document.getElementById('easterOverlay');
    var body    = document.getElementById('easterBody');
    if (!overlay || !body) return;

    // 毎回リセット（複数回発動に対応）
    body.innerHTML = '';
    overlay.classList.add('show');

    var lines = [
      { cls: 'ep', text: '❯ sudo cat secret.txt' },
      { cls: 'ew', text: '[sudo] password: ****' },
      { cls: 'tg', text: 'ACCESS GRANTED ✓' },
      { cls: 'em', text: '' },
      { cls: 'em', text: '╔═══════════════════════════╗' },
      { cls: 'em', text: '║  ✦  hidden  message  ✦    ║' },
      { cls: 'em', text: '║  このポートフォリオを      ║' },
      { cls: 'em', text: '║  見つけてくれてありがとう  ║' },
      { cls: 'em', text: '║  flag{shiroshiro_2025}    ║' },
      { cls: 'em', text: '╚═══════════════════════════╝' },
      { cls: 'ep', text: '❯ _' },
    ];

    lines.forEach(function(l, i) {
      setTimeout(function() {
        var d = document.createElement('div');
        d.className  = l.cls;
        d.textContent = l.text;
        body.appendChild(d);
      }, i * 110);
    });

  } else {
    setTimeout(function() { ctrlHeld = false; altHeld = false; }, 2000);
    setKbOut('waiting...',
      '<span class="tp">shirasaka@portfolio:~$</span> ' +
      '<span class="tc"># ' + k.toUpperCase() +
      ' pressed — now press ' + (k === 'ctrl' ? 'Alt' : 'Ctrl') + '...</span><br>' +
      '<span class="cur">▋</span>'
    );
  }
}

function closeEaster() {
  var overlay = document.getElementById('easterOverlay');
  if (overlay) overlay.classList.remove('show');
}
// var ctrlHeld = false, altHeld = false;

// function keyCtrlAlt(k) {
//   pressKey('key-' + k);
//   if (k === 'ctrl') ctrlHeld = true;
//   if (k === 'alt')  altHeld  = true;

//   if (ctrlHeld && altHeld) {
//     ctrlHeld = false; altHeld = false;

//     /* ターミナルに出力 */
//     setKbOut('hidden_command — ACTIVATED',
//       '<span class="ty">// HIDDEN COMMAND DETECTED</span><br>' +
//       '<span class="tp">shirasaka@portfolio:~$</span> <span class="tv">./secret.sh</span><br>' +
//       '<span class="tg">// ACCESS GRANTED 🎁</span>'
//     );

//     /* Easter egg オーバーレイ（要素があれば表示） */
//     var overlay = document.getElementById('easterOverlay');
//     if (overlay) overlay.classList.add('show');

//   } else {
//     setTimeout(function() { ctrlHeld = false; altHeld = false; }, 2000);
//     setKbOut('waiting...',
//       '<span class="tp">shirasaka@portfolio:~$</span> ' +
//       '<span class="tc"># ' + k.toUpperCase() +
//       ' pressed — now press ' + (k === 'ctrl' ? 'Alt' : 'Ctrl') + '...</span><br>' +
//       '<span class="cur">▋</span>'
//     );
//   }
// }
// function closeEaster() {
//   var overlay = document.getElementById('easterOverlay');
//   if (overlay) overlay.classList.remove('show');
// }

/* ══════════════════════════════════════════════
   Enter キー → footer へスクロール
══════════════════════════════════════════════ */
function keyEnter() {
  pressKey('key-enter');
  typeKbLines('contact.sh', [
    { d: 0,    h: '<span class="tp">shirasaka@portfolio:~$</span> <span class="tv">./contact.sh</span>' },
    { d: 500,  h: '<span class="tc">// Redirecting to contact...</span>' },
    { d: 900,  h: '<span class="tg">// フッターへジャンプします ↓</span>' },
    { d: 1200, h: '<span class="tp">shirasaka@portfolio:~$</span> <span class="cur">▋</span>' },
  ]);
  setTimeout(function() {
    var footer = document.querySelector('footer');
    if (footer) footer.scrollIntoView({ behavior: 'smooth' });
  }, 800);
}

/* ══════════════════════════════════════════════
   ./run キー → ブートシーケンス
══════════════════════════════════════════════ */
var running = false;

function keyRun() {
  if (running) return;
  running = true;
  pressKey('key-run');

  typeKbLines('portfolio.sh — booting...', [
    { d: 0,    h: '<span class="tp">shirasaka@portfolio:~$</span> <span class="tv">./run portfolio.sh</span>' },
    { d: 500,  h: '<span class="tc">// Initializing...</span>' },
    { d: 900,  h: '<span class="tg">[BOOT]</span> <span class="tv">Profile...</span> <span class="tg">✓</span>' },
    { d: 1300, h: '<span class="tg">[BOOT]</span> <span class="tv">Skills...</span>  <span class="tg">✓</span>' },
    { d: 1700, h: '<span class="tg">[BOOT]</span> <span class="tv">Certs...</span>   <span class="tg">✓</span>' },
    { d: 2100, h: '<span class="tg">[BOOT]</span> <span class="tv">Work...</span>    <span class="tg">✓</span>' },
    { d: 2500, h: '<span class="ty">━━━━━━━━━━━━━━━━━━</span>' },
    { d: 2800, h: '<span class="tg">// All systems operational 🚀</span>' },
    { d: 3200, h: '<span class="tv">Welcome — Shirasaka Akari Portfolio</span>' },
    { d: 3600, h: '<span class="tp">shirasaka@portfolio:~$</span> <span class="cur">▋</span>' },
  ]);

  /* セクションを順番にスクロール */
  var secs = document.querySelectorAll('section, .tl-section');
  secs.forEach(function(s, i) {
    setTimeout(function() {
      s.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 900 + i * 600);
  });

  setTimeout(function() { running = false; }, 5000);
}
// /* ══════════════════════════════════════
//    KEYBOARD INTERACTIVE JS
//    ── IDマッピング ──
//    key-ctrl  / key-alt   … Ctrl+Alt 同時押しで Easter egg
//    key-esc              … スキル一覧タイプアウト
//    key-lock             … グリッチ演出
//    key-run              … ./run portfolio.sh
//    key-enter            … contact へジャンプ
// ══════════════════════════════════════ */

// /* ── BINARY PULSE BACKGROUND ─────────────────────── */
// function initBg() {
//   const canvas = document.getElementById('heroCanvas');
//   if (!canvas) return;
//   const hero = document.getElementById('hero');
//   canvas.width  = hero.offsetWidth  || 400;
//   canvas.height = hero.offsetHeight || 220;
//   const ctx = canvas.getContext('2d');
//   const W = canvas.width, H = canvas.height;
//   const COLS = Math.floor(W / 14);
//   const ROWS = Math.floor(H / 16);
//   const grid = [];
//   for (let r = 0; r < ROWS; r++) {
//     grid[r] = [];
//     for (let c = 0; c < COLS; c++)
//       grid[r][c] = { ch: Math.random() > .5 ? '1' : '0',
//                      a:  Math.random() * .18 + .03,
//                      da: (Math.random() - .5) * .012 };
//   }
//   function draw() {
//     ctx.clearRect(0, 0, W, H);
//     for (let r = 0; r < ROWS; r++) {
//       for (let c = 0; c < COLS; c++) {
//         const cell = grid[r][c];
//         cell.a += cell.da;
//         if (cell.a < .02 || cell.a > .22) cell.da *= -1;
//         if (Math.random() > .97) cell.ch = Math.random() > .5 ? '1' : '0';
//         ctx.fillStyle = `rgba(226,75,74,${cell.a})`;
//         ctx.font = '11px DM Mono,monospace';
//         ctx.fillText(cell.ch, c * 14 + 4, r * 16 + 13);
//       }
//     }
//     const t = Date.now() / 1000;
//     for (let k = 0; k < 4; k++) {
//       const rad   = (t * 28 + k * 72) % Math.max(W, H);
//       const alpha = Math.max(0, .16 - rad / Math.max(W, H) * .16);
//       ctx.beginPath();
//       ctx.arc(W / 2, H * .6, rad, 0, Math.PI * 2);
//       ctx.strokeStyle = `rgba(226,75,74,${alpha})`;
//       ctx.lineWidth = 1.5;
//       ctx.stroke();
//     }
//   }
//   setInterval(draw, 40);
// }

// /* ── GLITCH CHARS ─────────────────────────────────── */
// const GLITCH = '█▓▒░$#@%&*!?<>{}[]01アイウエオカキクケコ白緋';

// /* ── キーボード表示トグル ─────────────────────────── */
// let kbVisible = false;
// function toggleKb() {
//   kbVisible = !kbVisible;
//   const tray = document.getElementById('kbFloat');
//   if (tray) tray.classList.toggle('hidden', !kbVisible);
//   const btn = document.getElementById('kbToggleBtn');
//   if (btn) btn.textContent = kbVisible ? 'Keyboard非表示' : 'Keyboard表示';
// }

// /* ── キー押下エフェクト ───────────────────────────── */
// // id = 'key-ctrl' など実際のHTML上のID
// function pressKey(id) {
//   const k = document.getElementById(id);
//   if (!k) return;
//   k.classList.add('pressed', 'active-key');
//   setTimeout(() => k.classList.remove('pressed'),     120);
//   setTimeout(() => k.classList.remove('active-key'),  700);
// }

// /* ── Toast (任意: #toast 要素があれば使用) ─────────── */
// function showToast(msg, dur = 2200) {
//   const t = document.getElementById('toast');
//   if (!t) return;
//   t.textContent = msg;
//   t.classList.add('show');
//   setTimeout(() => t.classList.remove('show'), dur);
// }

// /* ══════════════════════════════════════
//    Ctrl + Alt → Easter egg
// ══════════════════════════════════════ */
// let ctrlOn = false, altOn = false, ctrlT = null, altT = null;

// function keyCtrlAlt(which) {
//   if (which === 'ctrl') {
//     pressKey('key-ctrl');
//     ctrlOn = true;
//     clearTimeout(ctrlT);
//     ctrlT = setTimeout(() => ctrlOn = false, 2500);
//     if (altOn) { triggerEgg(); return; }
//     showToast('⌨ Ctrl pressed — now press Alt!');
//   } else {
//     pressKey('key-alt');
//     altOn = true;
//     clearTimeout(altT);
//     altT = setTimeout(() => altOn = false, 2500);
//     if (ctrlOn) { triggerEgg(); return; }
//     showToast('⌨ Alt pressed — now press Ctrl!');
//   }
// }

// function triggerEgg() {
//   ctrlOn = false; altOn = false;
//   const lines = [
//     { c: 'ep', t: '❯ sudo cat secret.txt' },
//     { c: 'ew', t: '[sudo] password: ****' },
//     { c: 'eg', t: 'ACCESS GRANTED ✓' },
//     { c: 'em', t: '' },
//     { c: 'em', t: '╔═══════════════════════════╗' },
//     { c: 'em', t: '║  ✦  hidden  message  ✦    ║' },
//     { c: 'em', t: '║  このポートフォリオを      ║' },
//     { c: 'em', t: '║  見つけてくれてありがとう  ║' },
//     { c: 'em', t: '║  flag{shiroshiro_2025}    ║' },
//     { c: 'em', t: '╚═══════════════════════════╝' },
//     { c: 'ep', t: '❯ _' },
//   ];
//   const body = document.getElementById('eggBody');
//   if (!body) return;
//   body.innerHTML = '';
//   document.getElementById('eggOverlay')?.classList.add('show');
//   lines.forEach((l, i) => setTimeout(() => {
//     const d = document.createElement('div');
//     d.className = l.c; d.textContent = l.t;
//     body.appendChild(d);
//   }, i * 110));
// }
// function closeEgg() {
//   document.getElementById('eggOverlay')?.classList.remove('show');
// }

// /* ══════════════════════════════════════
//    esc キー → スキル一覧タイプアウト
// ══════════════════════════════════════ */
// const SKILLS = [
//   { l: 'python',     v: '★★★★★' },
//   { l: 'linux/bash', v: '★★★★☆' },
//   { l: 'wireshark',  v: '★★★★☆' },
//   { l: 'burp suite', v: '★★★☆☆' },
//   { l: 'nmap',       v: '★★★☆☆' },
//   { l: 'ctf (web)',  v: '★★★★☆' },
//   { l: 'ctf(crypto)',v: '★★★☆☆' },
//   { l: 'git',        v: '★★★★☆' },
// ];

// function keyEsc() {
//   pressKey('key-esc');
//   const modal = document.getElementById('skillModal');
//   const body  = document.getElementById('skillBody');
//   if (!modal || !body) return;
//   body.innerHTML = '';
//   modal.classList.add('show');
//   SKILLS.forEach((s, i) => {
//     const d = document.createElement('div');
//     d.className = 'sm-line';
//     // padEnd でモノスペース揃え
//     d.innerHTML = `<span class="sl">${s.l.padEnd(13, '\u00A0')}</span>${s.v}`;
//     body.appendChild(d);
//     setTimeout(() => d.classList.add('visible'), i * 130 + 80);
//   });
// }
// function closeSkill() {
//   document.getElementById('skillModal')?.classList.remove('show');
// }

// /* ══════════════════════════════════════
//    🔐 キー → グリッチ演出
//    対象: #avatar (アバター円) と #nameEl (h1テキスト)
// ══════════════════════════════════════ */
// let glitching = false;

// function keyLock() {
//   if (glitching) return;
//   glitching = true;
//   pressKey('key-lock');
//   showToast('🔐 encrypting...', 1800);

//   const av = document.getElementById('avatar');
//   const ne = document.getElementById('nameEl'); // h1要素

//   // h1 のオリジナル HTML を保存
//   const origHTML  = ne ? ne.innerHTML  : '';
//   const origColor = ne ? ne.style.color : '';

//   let t = 0;
//   const colors = ['#0f0', '#f0f', '#0ff', '#ff0', '#E24B4A', '#fff'];
//   const iv = setInterval(() => {
//     // ランダム文字列生成
//     let s = '';
//     for (let i = 0; i < 6; i++)
//       s += GLITCH[Math.floor(Math.random() * GLITCH.length)];

//     // h1テキストをグリッチ
//     if (ne) {
//       ne.innerHTML = `<span style="font-family:'DM Mono',monospace;color:#E24B4A;
//                         font-size:clamp(14px,2vw,18px)">${s}</span>`;
//     }
//     // アバターの背景色をグリッチ
//     if (av) {
//       av.style.background = colors[Math.floor(Math.random() * colors.length)];
//       av.style.color = '#fff';
//     }

//     t += 80;
//     if (t > 1600) {
//       clearInterval(iv);
//       if (ne) { ne.innerHTML = origHTML; ne.style.color = origColor; }
//       if (av) { av.style.background = ''; av.style.color = ''; }
//       glitching = false;
//     }
//   }, 80);
// }

// /* ══════════════════════════════════════
//    ./run → projects タブへ
// ══════════════════════════════════════ */
// let runDone = false;

// function keyRun() {
//   pressKey('key-run');
//   showToast('$ ./run portfolio.sh — launching...', 2000);

//   // ── タブ切り替え (nav .ni 方式 or folder-nav 方式、両方に対応) ──
//   // パターンA: .ni クラスのナビ（二番目 = projects）
//   const niItems = document.querySelectorAll('.ni');
//   if (niItems.length >= 2) {
//     document.querySelectorAll('.sec').forEach(s => s.classList.remove('on'));
//     niItems.forEach(n => n.classList.remove('on'));
//     // projectsセクションを探してON
//     const projSec = document.getElementById('projects');
//     if (projSec) projSec.classList.add('on');
//     niItems[1].classList.add('on');
//   }
//   // パターンB: folder-nav 方式（#fn-work など）
//   const fnWork = document.getElementById('fn-work');
//   if (fnWork) fnWork.click();

//   // プロジェクトカードを順番にフェードイン
//   if (!runDone) {
//     runDone = true;
//     ['pc1', 'pc2', 'pc3'].forEach((id, i) => {
//       setTimeout(() => {
//         document.getElementById(id)?.classList.remove('hidden-sec');
//       }, 300 + i * 220);
//     });
//   }
// }

// /* ══════════════════════════════════════
//    Enter → contact タブへジャンプ
// ══════════════════════════════════════ */
// function keyEnter() {
//   pressKey('key-enter');
//   showToast('↩ jumping to contact...', 1600);

//   // パターンA: .ni 方式
//   const navCon = document.getElementById('navContact');
//   if (navCon) {
//     setTimeout(() => {
//       document.querySelectorAll('.sec').forEach(s => s.classList.remove('on'));
//       document.querySelectorAll('.ni').forEach(n => n.classList.remove('on'));
//       document.getElementById('contact')?.classList.add('on');
//       navCon.classList.add('on');
//     }, 400);
//   }
//   // パターンB: folder-nav 方式
//   const fnContact = document.getElementById('fn-contact');
//   if (fnContact) setTimeout(() => fnContact.click(), 400);
// }

// /* ── 初期化 ──────────────────────────────────────── */
// window.addEventListener('load', () => {
//   initBg();
// });
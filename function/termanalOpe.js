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
    { d: 2100, h: '<span class="ty">[~]</span> <span class="tv">Linux </span>   <span class="tc">— 習得中</span>' },
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
/* ══════════════════════════════════════════════
   Enter キー 
══════════════════════════════════════════════ */
function keyEnter() {
  pressKey('key-enter');
  typeKbLines('contact.sh', [
    { d: 0,    h: '<span class="tp">shirasaka@portfolio:~$</span> <span class="tv">./contact.sh</span>' },
    { d: 500,  h: '<span class="tc">// Redirecting to github...</span>' },
    { d: 900,  h: '<span class="tg">// <a href="https://github.com/sirasakaakari" target="_blank" class="btn btn-red">github</a></span>' },
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

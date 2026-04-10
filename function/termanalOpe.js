/* ══════════════════════════
  KEYBOARD FUNCTIONS
══════════════════════════ */
function setKbOut(title, html) {
  document.getElementById('kbTermTitle').textContent = title;
  document.getElementById('kbTermOut').innerHTML = html;
}
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
      setTimeout(function() { d.style.opacity = '1'; }, 20);
    }, l.d);
  });
}
function pressKey(id) {
  var el = document.getElementById(id);
  el.classList.add('pressed');
  setTimeout(function() { el.classList.remove('pressed'); }, 160);
}
// ESC — security skills
function keyEsc() {
  pressKey('key-esc');
  typeKbLines('security_skills.txt', [
    { d: 0,    h: '<span class="tp">shirasaka@portfolio:~$</span> <span class="tv">cat security_skills.txt</span>' },
    { d: 500,  h: '<span class="tc">// Security Skills Overview</span>' },
    { d: 900,  h: '<span class="tg">[✓]</span> <span class="tv">CompTIA Network+</span> <span class="tc">— network fundamentals</span>' },
    { d: 1300, h: '<span class="tg">[✓]</span> <span class="tv">EC-Council CCT</span> <span class="tc">— cybersecurity</span>' },
    { d: 1700, h: '<span class="tg">[✓]</span> <span class="tv">picoCTF 2024</span> <span class="tc">— crypto / web</span>' },
    { d: 2100, h: '<span class="ty">[~]</span> <span class="tv">Linux / Bash</span> <span class="tc">— 習得中</span>' },
    { d: 2500, h: '<span class="ty">[~]</span> <span class="tv">Cloud Security</span> <span class="tc">— 入門中</span>' },
    { d: 3000, h: '<span class="tp">shirasaka@portfolio:~$</span> <span class="cur">▋</span>' },
  ]);
}
// 🔐 — glitch
function keyLock() {
  pressKey('key-lock');
  document.getElementById('kbTermTitle').textContent = 'encrypt.sh — running...';
  var out = document.getElementById('kbTermOut');
  out.innerHTML = '';
  var steps = [
    '<span class="tp">shirasaka@portfolio:~$</span> <span class="tv">./encrypt.sh profile.txt</span>',
    '<span class="tc">暗号化中...</span> <span class="ty">██</span>',
    '<span class="tc">暗号化中...</span> <span class="ty">████</span>',
    '<span class="tc">暗号化中...</span> <span class="ty">██████</span>',
    '<span class="tc">暗号化中...</span> <span class="ty">████████</span>',
    '<span class="tc">暗号化中...</span> <span class="ty">██████████</span> 100%',
    '<span class="tg">// 復号完了 — profile restored ✓</span>',
    '<span class="tp">shirasaka@portfolio:~$</span> <span class="cur">▋</span>',
  ];
  steps.forEach(function(s, i) {
    setTimeout(function() {
      var d = document.createElement('div');
      d.innerHTML = s;
      d.style.cssText = 'opacity:0;transition:opacity 0.15s';
      out.appendChild(d);
      setTimeout(function() { d.style.opacity = '1'; }, 20);
    }, i * 280);
  });
  setTimeout(function() {
    document.getElementById('kbTermTitle').textContent = 'encrypt.sh — done';
  }, steps.length * 280);
}
// Ctrl + Alt — easter egg
var ctrlHeld = false, altHeld = false;
function keyCtrlAlt(k) {
  pressKey('key-' + k);
  if (k === 'ctrl') ctrlHeld = true;
  if (k === 'alt')  altHeld  = true;
  if (ctrlHeld && altHeld) {
    ctrlHeld = false; altHeld = false;
    document.getElementById('easterOverlay').classList.add('show');
    setKbOut('hidden_command — ACTIVATED',
      '<span class="ty">// HIDDEN COMMAND DETECTED</span><br>' +
      '<span class="tp">shirasaka@portfolio:~$</span> <span class="tv">./secret.sh</span><br>' +
      '<span class="tg">// ACCESS GRANTED 🎁</span>'
    );
  } else {
    setTimeout(function() { ctrlHeld = false; altHeld = false; }, 2000);
    setKbOut('waiting...',
      '<span class="tp">shirasaka@portfolio:~$</span> <span class="tc"># ' +
      k.toUpperCase() + ' pressed — now press ' + (k === 'ctrl' ? 'Alt' : 'Ctrl') + '...</span><br>' +
      '<span class="cur">▋</span>'
    );
  }
}
function closeEaster() {
  document.getElementById('easterOverlay').classList.remove('show');
}
// Enter — scroll to footer
function keyEnter() {
  pressKey('key-enter');
  typeKbLines('contact.sh', [
    { d: 0,   h: '<span class="tp">shirasaka@portfolio:~$</span> <span class="tv">./contact.sh</span>' },
    { d: 500, h: '<span class="tc">// Redirecting to contact...</span>' },
    { d: 900, h: '<span class="tg">// フッターへジャンプします ↓</span>' },
    { d: 1200,h: '<span class="tp">shirasaka@portfolio:~$</span> <span class="cur">▋</span>' },
  ]);
  setTimeout(function() {
    document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
  }, 800);
}
// ./run — boot sequence
var running = false;
function keyRun() {
  if (running) return;
  running = true;
  pressKey('key-run');
  typeKbLines('portfolio.sh — booting...', [
    { d: 0,    h: '<span class="tp">shirasaka@portfolio:~$</span> <span class="tv">./run portfolio.sh</span>' },
    { d: 500,  h: '<span class="tc">// Initializing...</span>' },
    { d: 900,  h: '<span class="tg">[BOOT]</span> <span class="tv">Profile...</span> <span class="tg">✓</span>' },
    { d: 1300, h: '<span class="tg">[BOOT]</span> <span class="tv">Skills...</span> <span class="tg">✓</span>' },
    { d: 1700, h: '<span class="tg">[BOOT]</span> <span class="tv">Certs...</span> <span class="tg">✓</span>' },
    { d: 2100, h: '<span class="tg">[BOOT]</span> <span class="tv">Work...</span> <span class="tg">✓</span>' },
    { d: 2500, h: '<span class="ty">━━━━━━━━━━━━━━━━━━</span>' },
    { d: 2800, h: '<span class="tg">// All systems operational 🚀</span>' },
    { d: 3200, h: '<span class="tv">Welcome — Shirasaka Akari Portfolio</span>' },
    { d: 3600, h: '<span class="tp">shirasaka@portfolio:~$</span> <span class="cur">▋</span>' },
  ]);
  var secs = document.querySelectorAll('section, .tl-section');
  secs.forEach(function(s, i) {
    setTimeout(function() {
      s.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 900 + i * 600);
  });
  setTimeout(function() { running = false; }, 5000);
}

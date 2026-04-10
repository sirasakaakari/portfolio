    /* ══════════════════════════
      PROFILE TERMINAL
    ══════════════════════════ */
    var plines = [
      { d: 300,  h: '<span class="tc"># Shirasaka Akari — profile</span>' },
      { d: 900,  h: '<span class="tp">shirasaka@portfolio:~$</span> whoami' },
      { d: 1500, h: '<span class="tv">白坂 明里 // Shirasaka Akari</span>' },
      { d: 2100, h: '<span class="tp">shirasaka@portfolio:~$</span> cat about.json' },
      { d: 2600, h: '<span class="tc">{</span>' },
      { d: 2900, h: '&nbsp;&nbsp;<span class="ta">"university"</span>: <span class="tv">"〇〇大学 情報工学科 4年"</span><span class="tc">,</span>' },
      { d: 3300, h: '&nbsp;&nbsp;<span class="ta">"goal"</span>: <span class="tv">"Security / Infra / Cloud"</span><span class="tc">,</span>' },
      { d: 3700, h: '&nbsp;&nbsp;<span class="ta">"certs"</span>: <span class="tv">["Network+","CCT","基本情報"]</span><span class="tc">,</span>' },
      { d: 4100, h: '&nbsp;&nbsp;<span class="ta">"hobby"</span>: <span class="tv">"CTF, coffee, design"</span>' },
      { d: 4500, h: '<span class="tc">}</span>' },
      { d: 5000, h: '<span class="tp">shirasaka@portfolio:~$</span> echo $MISSION' },
      { d: 5700, h: '<span class="tv">壊れないシステムを作るために、壊し方を学ぶ。</span>' },
      { d: 6400, h: '<span class="tp">shirasaka@portfolio:~$</span> <span class="cur">▋</span>' },
    ];
    var ptb = document.getElementById('profileTerm');
    ptb.innerHTML = '';
    plines.forEach(function(l) {
      setTimeout(function() {
        var d = document.createElement('div');
        d.innerHTML = l.h;
        d.style.cssText = 'opacity:0;transform:translateY(2px);transition:opacity 0.2s,transform 0.2s';
        ptb.appendChild(d);
        setTimeout(function() { d.style.opacity = '1'; d.style.transform = 'translateY(0)'; }, 30);
      }, l.d);
    });

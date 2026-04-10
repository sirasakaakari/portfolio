    /* ══════════════════════════
      PROFILE TERMINAL
    ══════════════════════════ */
    var plines = [
      { d: 300,  h: '<span class="tc"># Shirasaka Akari — profile</span>' },
      { d: 900,  h: '<span class="tp">shirasaka@portfolio:~$</span> whoami' },
      { d: 1500, h: '<span class="tv">白坂 明里 // Shirasaka Akari</span>' },
      { d: 2100, h: '<span class="tp">shirasaka@portfolio:~$</span> cat about.json' },
      { d: 2600, h: '<span class="tc">{</span>' },
      // { d: 2900, h: '&nbsp;&nbsp;<span class="ta">"university"</span>: <span class="tv">"OCA大阪デザイン＆テクノロジー専門学校 スーパーゲームIT科ホワイトハッカー専攻 "</span><span class="tc">,</span>' },
      { d: 3300, h: '&nbsp;&nbsp;<span class="ta">"goal"</span>: <span class="tv">"Security / Infra / Cloud"</span><span class="tc">,</span>' },
      { d: 3700, h: '&nbsp;&nbsp;<span class="ta">"certs"</span>: <span class="tv">["Network+","CCT","基本情報午前"]</span><span class="tc">,</span>' },
      { d: 4100, h: '&nbsp;&nbsp;<span class="ta">"hobby"</span>: <span class="tv">"drawing illustrations, design, 3D"</span>' },
      { d: 4500, h: '<span class="tc">}</span>' },
      { d: 5000, h: '<span class="tp">shirasaka@portfolio:~$</span> echo $ByTheWay' },
      { d: 5700, h: '<span class="tv">因みにプロフィール画像はbrenderを使用した3Dケーキです.</span>' },
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

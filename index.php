<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shirasaka Akari — Portfolio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Noto+Sans+JP:wght@300;400;500;700&family=Cormorant+Garamond:wght@600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/reset.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/common.css">
  <style>
    section{
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1.5rem 1rem;
      animation: fadeUp .3s ease;
    }
  </style>
</head>
<body>
  <div id="splash">
    <div id="splash-logo">Loading</div>
        <div class="bg">
            <?php require_once dirname(__FILE__) .'/birthday_auto_opening.html';?>
        </div> 
<!--/splash-->
    <div id="loading-content"></div>
  </div>
  <div class="splashbg"></div><!---画面遷移用-->

  <?php require_once dirname(__FILE__) .'/temp/header.html';?>
  <!--  -->
  <?php require __DIR__ . '/components/keybord.php'; ?>
  <main>
    <!-- HOME (GIFT 1PAGE) -->
    <section id="home" class="home-sec">
      <div class="term-win red-pro" class="page active">
        <!-- <div class="term-main"> -->
        <div class="term-win-bar red-bar">
          <?php require __DIR__ . '/components/terminal_bar_btn.php'; ?>
            <div class="term-win-title">shirasaka@portfolio:~$ — bash</div>
        </div>
        <div class="home-term-contents"> 
          <!-- TEXT LEFT -->
          <div class="home-term-left"> 
            <div> 
              <span class="term-prompt">shirasaka@portfolio:~$ cat home.txt</span>
              <div class="home-h1">
                Build systems<br>
                that are <span class="hl">reliable.</span><br>
                <span class="dm">// Secure by design.</span>
              </div>
              <p class="home-sub">
                セキュリティ・インフラ・クラウドを目指してます<br>
                2025年度新卒。CompTIA Network+ / CCT 保有。<br>
              </p>
            </div>
            <div class="github-btn"> 
              <a href="https://github.com/sirasakaakari" target="_blank" class="btn btn-red">github</a>
            </div>
          </div>
          <!-- GIFT BOX -->
          <div class="home-gift-panel" id="homeGift" onclick="openhomeGift()">
            <div class="gift-stripe-h"></div>
            <div class="gift-stripe-v"></div>
            <div class="gift-scan"></div>
            <div class="gift-box">
              <div class="g-lid" id="gLid"> 
                <div class="g-bow">
                  <svg width="38" height="20" viewBox="0 0 38 20" fill="none">
                    <ellipse cx="9.5" cy="10" rx="9.5" ry="6" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.52)" stroke-width="1.2"/>
                    <ellipse cx="28.5" cy="10" rx="9.5" ry="6" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.52)" stroke-width="1.2"/>
                    <circle cx="19" cy="10" r="4.2" fill="white" stroke="rgba(255,255,255,0.62)" stroke-width="1"/>
                  </svg>
                </div>
              </div>
              <div class="g-body"> 
                <div class="g-body-sh"></div>
                <div class="g-body-sv"></div>
                <div class="g-chips" id="gChips">
                  <div class="g-chip">Network+</div>
                  <div class="g-chip">CCT</div>
                </div>
              </div>
              <div class="g-hint" id="gHint">— tap to open —</div>
              <div class="g-opened" id="gOpened">// skills unlocked</div>
            </div>
        </div>
        <!-- </div> -->
      </div>
    </section>
    <!-- KEYBOARD TERMINAL OUTPUT -->
    <section class="term-sec">
      <div class="term-win red-pro-height">
        <div class="term-main">
          <div class="term-win-bar red-bar">
            <?php require __DIR__ . '/components/terminal_bar_btn.php'; ?>
            <span class="kb-out-tag">OUTPUT</span>
            <span class="kb-term-title" id="kbTermTitle">waiting for input...</span>
          </div>
        </div>
        <div class="kb-term-body" id="kbTermOut">
          <span class="tc"># キーボードのキーを押すとここに出力されます</span><br>
          <span class="tp">shirasaka@portfolio:~$</span> <span class="cur">▋</span>
        </div>
      </div>
    </section>
    <?php require __DIR__ . '/sections/profile.php'; ?>      
    <?php require __DIR__ . '/sections/skils.php'; ?>
    <?php require __DIR__ . '/sections/certifications.php'; ?>
    <?php require __DIR__ . '/sections/work.php'; ?>
  </main>
  <!-- EASTER EGG -->
   <div class="easter-overlay" id="easterOverlay">
  <div class="easter-box">
    <div class="easter-title">🎁 // HIDDEN COMMAND ACTIVATED</div>
    <div class="easter-msg" id="easterBody"></div>
    <button class="easter-close" onclick="closeEaster()">[ ESC ] close</button>
  </div>
</div>
  <!-- <div class="easter-overlay" id="easterOverlay">
    <div class="easter-box">
      <div class="easter-title">🎁 // HIDDEN COMMAND ACTIVATED</div>
      <div class="easter-msg">
        <!-- <span style="color:#F87171">Ctrl</span> + <span style="color:#F87171">Alt</span> detected...<br><br>
        ACCESS GRANTED — secret file unlocked<br><br>
        <span style="color:#fbbf24">cat secret.txt</span><br>
        ──────────────────<br>
        セキュリティを学ぶ者へ:<br>
        好奇心こそが最強の武器。<br>
        ──────────────────<br>
        <span style="color:#4ade80">// easter egg found 🎉</span> -->
      </div>
      <button class="easter-close" onclick="closeEaster()">[ ESC ] close</button>
    </div>
  </div> -->
  <script src="function/giftbox.js"></script>
  <script src="function/profileTerminal.js"></script>
  <script src="function/termanalOpe.js"></script>
  <script src="function/keybordShow.js"></script>
  <script src="function/loading.js"></script>
</body>
</html>
<>
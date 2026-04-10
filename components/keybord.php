<div class="kb-float" id="kbFloat">
  <div class="kb-wrap" style="position:relative">
    <button class="kb-close" onclick="toggleKb()">×</button>
    <div class="kb-label-sm">// interactive keyboard</div>
    <div class="kb-row">
      <div class="key std" id="key-esc" onclick="keyEsc()">
        <div class="key-main">esc</div>
        <div class="key-sub">skills</div>
      </div>
      <div class="key sq" id="key-lock" onclick="keyLock()">🔐</div>
      <div class="key wide" id="key-enter" onclick="keyEnter()">
        <div class="key-main">Enter</div>
        <div class="key-sub">contact</div>
      </div>
    </div>
    <div class="kb-row">
      <div class="key std" id="key-ctrl" onclick="keyCtrlAlt('ctrl')">
        <div class="key-main">Ctrl</div>
        <div class="key-sub">+Alt!</div>
      </div>
      <div class="key std" id="key-alt" onclick="keyCtrlAlt('alt')">
        <div class="key-main">Alt</div>
        <div class="key-sub">+Ctrl!</div>
      </div>
      <div class="key wide run-key" id="key-run" onclick="keyRun()">
        <div class="key-main">./run</div>
        <div class="key-sub">start!</div>
      </div>
    </div>
  </div>
</div>
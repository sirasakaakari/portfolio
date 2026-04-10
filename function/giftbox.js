    /* ══════════════════════════
      home GIFT BOX
    ══════════════════════════ */
    var homeOpened = false;
    function openhomeGift() {
      if (homeOpened) return;
      homeOpened = true;
      document.getElementById('gLid').classList.add('open');
      document.getElementById('gChips').classList.add('show');
      document.getElementById('gHint').style.opacity = '0';
      document.getElementById('gOpened').classList.add('show');
      document.getElementById('homeGift').style.cursor = 'defadivt';
    }


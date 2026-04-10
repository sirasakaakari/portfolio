// キーボードの表示状態を管理
let userToggledKb = false; // ユーザーが手動操作したか

function toggleKb() {
  const kb = document.getElementById('kbFloat');
  const isHome = isOnHomeSection();
  
  if (kb.classList.contains('show')) {
    kb.classList.remove('show');
    userToggledKb = true; // 手動で閉じた
  } else {
    kb.classList.add('show');
    userToggledKb = false; // 手動で開いた（スクロール制御に戻す）
  }
}

// Home セクションにいるか判定
function isOnHomeSection() {
  const homeSection = document.getElementById('home'); // HomeセクションのID
  if (!homeSection) return false;
  
  const rect = homeSection.getBoundingClientRect();
  // ビューポートの50%以上がhomeセクションに重なっているか
  return rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5;
}

// スクロール監視
function handleScroll() {
  const kb = document.getElementById('kbFloat');
  
  if (isOnHomeSection()) {
    // Home画面: ユーザーが手動で閉じていなければ表示
    if (!userToggledKb) {
      kb.classList.add('show');
    }
  } else {
    // Home以外: 強制非表示 & フラグリセット
    kb.classList.remove('show');
    userToggledKb = false; // 別セクションに移ったらリセット
  }
}

// 初期化
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll(); // 初回実行
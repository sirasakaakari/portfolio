const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// === 要素取得 ===
const sL = document.getElementById('sL');
const sR = document.getElementById('sR');
const boxClosed = document.getElementById('box-closed');
const boxOpening = document.getElementById('box-opening');
const boxOpen = document.getElementById('box-open');
const akariText = document.getElementById('akari-text');
const balloons = document.querySelectorAll('.balloon');
const confettiContainer = document.getElementById('confetti-container');

// === ユーティリティ ===
function fade(el, targetOpacity, durationSec) {
  el.style.transition = `opacity ${durationSec}s`;
  el.style.opacity = targetOpacity;
}

// === 紙吹雪 ===
function spawnConfetti() {
  const colors = ['#f9a8d4','#c084fc','#7dd3fc','#86efac','#fde68a','#ff80b5','#a5f3fc'];
  for (let i = 0; i < 40; i++) {
    const el = document.createElement('div');
    el.className = 'conf';
    el.style.cssText = `
      width:${6 + Math.random()*6}px;
      height:${6 + Math.random()*6}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      left:${Math.random()*100}%;
      top:-10px;
      position:absolute;
      border-radius:2px;
      opacity:1;
      transform:rotate(${Math.random()*360}deg);
    `;
    confettiContainer.appendChild(el);

    const duration = 1500 + Math.random() * 2000;
    const targetY = 400 + Math.random() * 200;
    const targetX = (Math.random() - 0.5) * 200;

    el.animate([
      { transform: `translateY(0) translateX(0) rotate(0deg)`, opacity: 1 },
      { transform: `translateY(${targetY}px) translateX(${targetX}px) rotate(${Math.random()*720}deg)`, opacity: 0 }
    ], { duration, easing: 'ease-in', fill: 'forwards' });

    setTimeout(() => el.remove(), duration + 100);
  }
}

// === 風船フロート ===
function floatBalloons() {
  balloons.forEach((b, i) => {
    const startY = -60 - i * 10;
    let t = 0;
    setInterval(() => {
      t += 0.03;
      const sway = Math.sin(t + i) * 8;
      b.style.transform = `translateY(${startY - t * 10}px) translateX(${sway}px)`;
      if (parseFloat(b.style.opacity) > 0 && startY - t * 10 < -300) {
        b.style.opacity = '0';
      }
    }, 30);
  });
}

// === アニメーション関数 ===
function openShutters() {
  sL.classList.add('open');
  sR.classList.add('open');
}

function startOpeningBox() {
  fade(boxClosed, '0', 0.4);
  setTimeout(() => {
    // SVG の g 要素なので opacity 属性で制御
    boxOpening.style.transition = 'opacity 0.4s';
    boxOpening.style.opacity = '1';
  }, 400);
}

function showAkariSoft() {
  akariText.style.opacity = '0.7';
  akariText.style.transform = 'translate(-50%,-50%) scale(0.9)';
}
function bigExplosion() {
  boxOpening.style.transition = 'opacity 0.3s';
  boxOpening.style.opacity = '0';
  setTimeout(() => fade(boxOpen, '1', 0.4), 300);

  akariText.style.opacity = '1';
  akariText.style.transform = 'translate(-50%,-50%) scale(1)';

  setTimeout(() => {
    akariText.style.transition = 'top 0.8s ease-out, opacity 0.5s, transform 0.5s';
    akariText.style.top = '22%';
  }, 200);

  // 風船
  balloons.forEach((b, i) => {
    setTimeout(() => {
      b.style.transition = 'opacity 0.5s, transform 0.8s cubic-bezier(0.34,1.56,0.64,1)';
      b.style.opacity = '1';
      b.style.transform = `translateY(-${60 + i * 10}px) translateX(${(i % 2 === 0 ? -1 : 1) * 10}px)`;
    }, i * 120);
  });

  setTimeout(floatBalloons, 1000);

  // 紙吹雪
  spawnConfetti();
  setTimeout(spawnConfetti, 400);
  setTimeout(spawnConfetti, 800);
  setTimeout(spawnConfetti, 1600);
}

// === メインの流れ ===
async function playAnimation() {
  await wait(500);
  openShutters();

  await wait(1100);
  startOpeningBox();

  await wait(800);
  showAkariSoft();

  await wait(800);
  bigExplosion();

  await wait(2500);

  const splash = document.getElementById('splash');
  if (splash) {
    splash.style.transition = 'opacity 1s';
    splash.style.opacity = '0';

    setTimeout(() => {
      splash.style.display = 'none';
      const header = document.querySelector('header');
      const main = document.querySelector('main');
      if (header) header.style.opacity = '1';
      if (main) main.style.opacity = '1';
    }, 1000);
  }
}

playAnimation();
(function () {
  'use strict';
  if (window.top !== window) return;

  const PRESETS = [0.5, 1, 1.5, 2, 3, 5];
  const KEY = 'vscSpeed';
  let speed = 1;
  let root;

  const allVideos = () => Array.from(document.querySelectorAll('video'));
  const apply = (value) => {
    speed = Math.max(0.05, Math.min(16, Number(value) || 1));
    allVideos().forEach(v => { try { v.playbackRate = speed; } catch (_) {} });
    root?.querySelectorAll('[data-speed]').forEach(b => b.classList.toggle('active', Number(b.dataset.speed) === speed));
    const status = root?.querySelector('.vsc-status');
    if (status) status.textContent = `当前倍速：${speed}x｜视频数：${allVideos().length}`;
    chrome.storage.local.set({ [KEY]: speed });
  };
  const build = () => {
    root = document.createElement('div'); root.id = 'vsc-lite-root';
    const panel = document.createElement('div'); panel.className = 'vsc-panel';
    panel.innerHTML = '<div class="vsc-title"><span>视频倍速</span><span>HTML5</span></div><div class="vsc-speeds"></div><div class="vsc-custom"><input type="number" min="0.05" max="16" step="0.05" placeholder="自定义，如 2.5"><button>应用</button></div><div class="vsc-status"></div>';
    const speeds = panel.querySelector('.vsc-speeds');
    PRESETS.forEach(n => { const b = document.createElement('button'); b.textContent = `${n}x`; b.dataset.speed = n; b.onclick = () => apply(n); speeds.appendChild(b); });
    panel.querySelector('.vsc-custom button').onclick = () => apply(panel.querySelector('input').value);
    const toggle = document.createElement('button'); toggle.className = 'vsc-toggle'; toggle.textContent = '倍速'; toggle.onclick = () => panel.classList.toggle('open');
    root.append(panel, toggle); document.documentElement.appendChild(root);
  };
  const observe = new MutationObserver(() => allVideos().forEach(v => { if (v.playbackRate !== speed) v.playbackRate = speed; }));
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message && message.type === 'set-speed') {
      apply(message.speed);
      sendResponse({ ok: true, speed: speed, videos: allVideos().length });
    }
    return true;
  });
  build(); observe.observe(document.documentElement, { childList: true, subtree: true });
  chrome.storage.local.get({ [KEY]: 1 }, r => apply(r[KEY]));
})();

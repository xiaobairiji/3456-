const presets = [0.5, 1, 1.5, 2, 3, 5];
const speeds = document.getElementById('speeds');
const status = document.getElementById('status');
function setSpeed(value) {
  const speed = Number(value);
  if (!Number.isFinite(speed) || speed < 0.05 || speed > 16) { status.textContent = '请输入 0.05 到 16 之间的倍速'; return; }
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (!tabs[0] || !tabs[0].id) return;
    chrome.tabs.sendMessage(tabs[0].id, { type: 'set-speed', speed }, response => {
      if (chrome.runtime.lastError) status.textContent = '当前页面不允许注入插件，请刷新普通网页后重试';
      else status.textContent = `已设置 ${speed}x，检测到 ${response?.videos ?? 0} 个视频`;
    });
  });
}
presets.forEach(value => { const button = document.createElement('button'); button.textContent = `${value}x`; button.onclick = () => setSpeed(value); speeds.appendChild(button); });
document.getElementById('apply').onclick = () => setSpeed(document.getElementById('custom').value);

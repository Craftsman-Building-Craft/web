// JS: manejo del modal (popup) y copiar datos

let currentServerData = {};

function openModal(name, ip, port) {
  const modal = document.getElementById('serverModal');
  document.getElementById('modalTitle').textContent = name;
  document.getElementById('modalIp').textContent = ip;
  document.getElementById('modalPort').textContent = port;

  currentServerData = { ip, port };
  modal.style.display = 'flex';
}

function closeModal() {
  document.getElementById('serverModal').style.display = 'none';
}

window.onclick = function(e) {
  const modal = document.getElementById('serverModal');
  if (e.target === modal) closeModal();
}

function copyFromModal(type) {
  const text = type === 'ip' ? currentServerData.ip : currentServerData.port;
  const btnId = type === 'ip' ? 'btnCopyIp' : 'btnCopyPort';
  const btn = document.getElementById(btnId);
  const original = btn.innerText;

  navigator.clipboard.writeText(String(text)).then(() => {
    btn.innerText = '¡COPIADO!';
    btn.style.backgroundColor = 'white';
    btn.style.color = '#00b894';

    setTimeout(() => {
      btn.innerText = original;
      btn.style.backgroundColor = 'transparent';
      btn.style.color = 'white';
    }, 1500);
  });
}
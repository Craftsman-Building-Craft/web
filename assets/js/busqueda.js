// JS: búsqueda, filtro y limpieza de resultados en tabla APKs

let ordenActual = -1;
let direccionAsc = true;

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('inputBusqueda');
  input.addEventListener('keypress', e => {
    if (e.key === 'Enter') buscar();
  });
});

function buscar() {
  const input = document.getElementById('inputBusqueda').value.toLowerCase();
  const tbody = document.getElementById('tablaBody');
  const filas = tbody.getElementsByTagName('tr');

  let hayResultados = false;

  for (let f of filas) {
    const texto = f.textContent.toLowerCase();
    if (texto.includes(input)) {
      f.style.display = '';
      hayResultados = true;
    } else {
      f.style.display = 'none';
    }
  }

  const tabla = document.querySelector('.tabla-apks');
  const mensajePrev = tabla.querySelector('.no-resultados');
  if (mensajePrev) mensajePrev.remove();

  if (!hayResultados && input !== '') {
    const tr = document.createElement('tr');
    tr.className = 'no-resultados';
    tr.innerHTML = `<td colspan="4">No se encontraron resultados para "${input}"</td>`;
    tbody.appendChild(tr);
  }
}

function limpiarBusqueda() {
  document.getElementById('inputBusqueda').value = '';

  const tbody = document.getElementById('tablaBody');
  const filas = tbody.getElementsByTagName('tr');

  for (let f of filas) f.style.display = '';

  const msg = document.querySelector('.no-resultados');
  if (msg) msg.remove();
}

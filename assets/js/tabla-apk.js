/**
 * Datos de la tabla de APKS (Datos originales).
 * Se almacena el HTML completo de cada celda.
 */
const apkData = [
  {
    creatorHtml: '<a target="_blank" href="https://play.google.com/store/apps/developer?id=StarGame12&hl=es_VE">StarGame 12</a>',
    versionHtml: '0.10.0<span class="separator-bar">|</span>0.14.3<br>0.15.10',
    descriptionHtml: '<b>Original</b>',
    megaHtml: '<a target="_blank" href="https://mega.nz/folder/z9JwWBrL#C04yv1t5HkkPYaVJF-tmAA" class="c-btn"><span class="c-btn__label">Mega</span></a>'
  },
  {
    creatorHtml: '<a target="_blank" href="https://www.youtube.com/@Miguelcrack230">Miguelcrack</a>',
    versionHtml: '0.15.10',
    descriptionHtml: 'Este Craftsman tiene las Texturas de las Versiones alphas...<a class="pequeño" target="_blank" href="https://www.youtube.com/watch?v=xZ0BFqCSrq0">[ver]</a>',
    megaHtml: '<a target="_blank" href="https://mega.nz/file/XoIXjTQQ#Vd70derPSkYDG5DA6Nfj-wwRiWf_DE49ge3TME2QICQ" class="c-btn"><span class="c-btn__label">Mega</span></a>'
  },
  {
    creatorHtml: '<a target="_blank" href="https://www.youtube.com/@Miguelcrack230">Miguelcrack</a>',
    versionHtml: '0.15.10',
    descriptionHtml: 'Este es el Craftsman 0.15.10 con las Texturas de la 1.21.90 <a class="pequeño" target="_blank" href="https://www.youtube.com/watch?v=xhqMFtKuoys">[ver]</a>',
    megaHtml: '<a target="_blank" href="https://mega.nz/file/GwgVnLJS#FCufroM55f7bkTZaky12NUSFVyQN8tIhrzdix9z62js" class="c-btn"><span class="c-btn__label">Mega</span></a>'
  },
  {
    creatorHtml: '<a target="_blank" href="https://www.youtube.com/@Miguelcrack230">Miguelcrack</a>',
    versionHtml: '0.15.10',
    descriptionHtml: 'Esta es un Craftsman con las Texturas de el Cliente "Lunar Client" <a class="pequeño" target="_blank" href="https://www.youtube.com/watch?v=840xxfsD0Fk">[ver]</a>',
    megaHtml: '<a target="_blank" href="https://mega.nz/file/nghwCCBA#FaU475vvIXvjGnVVaQ48fquduxtuTIXgLUVyaq1KYr8" class="c-btn"><span class="c-btn__label">Mega</span></a>'
  },
  {
    creatorHtml: '<a target="_blank" href="https://www.youtube.com/@ManuelJrNavarro">Manuel Jr Navarro</a>',
    versionHtml: '0.14.3',
    descriptionHtml: 'En Nueva coordenadas en Craftsman 0.14.3 <a class="pequeño" target="_blank" href="https://www.youtube.com/watch?v=lKgUvO6Jn3w">[ver]</a>',
    megaHtml: '<a target="_blank" href="https://mega.nz/file/2sphCAJb#Qs3HeC_Mgw7tnSwXrFUbuP1FFrOr1J5_EiwCK9GU09A" class="c-btn"><span class="c-btn__label">Mega</span></a>'
  },
  {
    creatorHtml: '<a target="_blank" href="https://www.youtube.com/@ManuelJrNavarro">Manuel Jr Navarro</a>',
    versionHtml: '0.14.3',
    descriptionHtml: 'Craftsman Realista de Celulares de Gama Baja <a class="pequeño" target="_blank" href="https://youtu.be/XerD3JeKcXs?si=OBHYeP7DdLnx_dxt">[ver]</a>',
    megaHtml: '<a target="_blank" href="https://mega.nz/file/u0pV0KbA#jOqESYWkDWGZ4QoKo23lMU1quXpcBOENSw20FLXqDMQ" class="c-btn"><span class="c-btn__label">Mega</span></a>'
  },
  {
    creatorHtml: '<a target="_blank" href="https://www.youtube.com/@ManuelJrNavarro">Manuel Jr Navarro</a>',
    versionHtml: '0.15.10',
    descriptionHtml: 'Este Craftsman tiene las Texturas de las Actions & Stuff <a class="pequeño" target="_blank" href="https://www.youtube.com/watch?v=sHz9f9r8TUA">[ver]</a>',
    megaHtml: '<a target="_blank" href="https://mega.nz/file/Gt41CByY#nYvFPjb3wDNd9oJP5cf0lV7SS2yu-q25fpzLwzOTw0g" class="c-btn"><span class="c-btn__label">Mega</span></a>'
  },
  {
    creatorHtml: '<a target="_blank" href="https://www.youtube.com/@Tit00">Tito Crack 6000</a>',
    versionHtml: '0.15.10',
    descriptionHtml: 'PVP <a class="pequeño" target="_blank" href="https://www.youtube.com/watch?v=LyuqNu-FYHs">[ver]</a>',
    megaHtml: '<a target="_blank" href="https://mega.nz/file/m0IxTKyQ#21VQ_OejexqAHIVxgDMHGx4xImaOQ1YcoL2nvNeY_dQ" class="c-btn"><span class="c-btn__label">Mega</span></a>'
  },
  {
    creatorHtml: '<a target="_blank" href="https://www.youtube.com/@Tit00">Tito Crack 6000</a>',
    versionHtml: '0.14.3<span class="separator-bar">|</span>0.15.10',
    descriptionHtml: 'PVP 2 <a class="pequeño" target="_blank" href="https://www.youtube.com/watch?v=LyuqNu-FYHs">[ver]</a>',
    megaHtml: '<a target="_blank" href="https://mega.nz/folder/D1gjkRbY#Zhd7T_doFFotQKpWh2tfhg" class="c-btn"><span class="c-btn__label">Mega</span></a>'
  },
  {
    creatorHtml: '<a target="_blank" href="https://www.youtube.com/@Tit00">Tito Crack 6000</a>',
    versionHtml: '0.14.3<span class="separator-bar">|</span>0.15.10',
    descriptionHtml: 'PVP 3 <a class="pequeño" target="_blank" href="https://www.youtube.com/watch?v=LyuqNu-FYHs">[ver]</a>',
    megaHtml: '<a target="_blank" href="https://mega.nz/folder/Sl4n1ALJ#DYlGZmma--f9329N00tlbw" class="c-btn"><span class="c-btn__label">Mega</span></a>'
  }
];


// FUNCIÓN PRINCIPAL DE RENDERIZADO (Ahora acepta datos filtrados)
function renderTableRows(dataToRender) {
  // Usa los datos proporcionados o los datos originales si no se pasa nada
  const data = dataToRender || apkData;
  const tbody = document.getElementById('tablaBody');

  if (!tbody) {
    console.error('El elemento con id="tablaBody" no se encontró en el DOM.');
    return;
  }

  // Si no hay resultados de búsqueda, muestra un mensaje
  if (data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 20px;">No se encontraron resultados para la búsqueda.</td></tr>';
      return;
  }

  // Genera el HTML de las filas
  const rowsHtml = data.map(row => {
    return `
      <tr>
        <td>${row.creatorHtml}</td>
        <td>${row.versionHtml}</td>
        <td>${row.descriptionHtml}</td>
        <td>${row.megaHtml}</td>
      </tr>
    `;
  }).join('');

  // Inserta el HTML generado en el tbody
  tbody.innerHTML = rowsHtml;
}


// FUNCIÓN DE BÚSQUEDA
function buscar() {
  const input = document.getElementById('inputBusqueda');
  const searchTerm = input.value.toLowerCase().trim();

  if (searchTerm.length < 2) {
      alert('Por favor, ingresa al menos 2 caracteres para buscar.');
      return;
  }

  const filteredData = apkData.filter(row => {
    // Concatena y normaliza el texto de las celdas para la búsqueda
    const fullText = (
        row.creatorHtml + 
        row.versionHtml + 
        row.descriptionHtml
    ).toLowerCase();

    // Devuelve TRUE si el texto contiene el término de búsqueda
    return fullText.includes(searchTerm);
  });

  // Renderiza la tabla con los datos filtrados
  renderTableRows(filteredData);
}


// FUNCIÓN PARA LIMPIAR Y RESTAURAR
function limpiarBusqueda() {
  const input = document.getElementById('inputBusqueda');
  
  // Limpia el campo de texto
  input.value = '';
  
  // Renderiza la tabla con los datos originales
  renderTableRows(apkData);
}


// Llama a la función de renderizado inicial cuando el documento esté cargado
document.addEventListener('DOMContentLoaded', () => {
    renderTableRows(apkData);
});

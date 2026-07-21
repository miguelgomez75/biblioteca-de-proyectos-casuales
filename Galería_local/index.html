<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Galería</title>
<meta name="description" content="Visor de galerías locales — carga carpetas, navega por páginas, sin subidas.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<style>
:root {
  --bg:        #0a0a0d;
  --surface:   #111116;
  --surface-2: #18181f;
  --border:    #222230;
  --border-2:  #2e2e40;
  --text:      #ddddf0;
  --text-2:    #7070a0;
  --text-3:    #383850;
  --accent:    #e8a030;
  --accent-dim:#1e1508;
  --font-ui:   'Inter', system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;
  --radius:    8px;
  --bar-h:     48px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body {
  height: 100%;
  overflow: hidden;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-ui);
}

/* ══ LAYOUT ══ */
.layout {
  display: flex;
  flex-direction: column;
  height: 100dvh;
}

/* ══ TOP BAR ══ */
.top-bar {
  height: var(--bar-h);
  flex-shrink: 0;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 0;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
}
.top-bar::-webkit-scrollbar { display: none; }

.logo {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-2);
  padding: 0 14px;
  white-space: nowrap;
  flex-shrink: 0;
  border-right: 1px solid var(--border);
  height: 100%;
  display: flex;
  align-items: center;
}
.logo span { color: var(--accent); }

.tabs-wrap {
  display: flex;
  align-items: stretch;
  height: 100%;
  flex: 1;
  overflow-x: auto;
  scrollbar-width: none;
}
.tabs-wrap::-webkit-scrollbar { display: none; }

.tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  font-size: 13px;
  color: var(--text-2);
  cursor: pointer;
  border: none;
  border-right: 1px solid var(--border);
  border-bottom: 2px solid transparent;
  background: transparent;
  white-space: nowrap;
  flex-shrink: 0;
  height: 100%;
  transition: color 0.1s;
}
.tab:hover { color: var(--text); background: var(--surface-2); }
.tab.active {
  color: var(--text);
  background: var(--bg);
  border-bottom-color: var(--accent);
}
.tab-count {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-3);
  background: var(--surface-2);
  border-radius: 4px;
  padding: 1px 5px;
}
.tab.active .tab-count { color: var(--text-2); }
.tab-close {
  font-size: 11px;
  color: var(--text-3);
  margin-left: 2px;
  transition: color 0.1s;
}
.tab:hover .tab-close { color: var(--text-2); }
.tab-close:hover { color: var(--text) !important; }

.add-btn {
  height: 100%;
  padding: 0 16px;
  background: transparent;
  border: none;
  border-right: 1px solid var(--border);
  color: var(--text-3);
  font-size: 18px;
  cursor: pointer;
  flex-shrink: 0;
  transition: color 0.1s, background 0.1s;
}
.add-btn:hover { color: var(--accent); background: var(--surface-2); }

/* ══ VIEWER ══ */
.viewer {
  flex: 1;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
}

.viewer-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
  user-select: none;
  transition: opacity 0.12s;
}
.viewer-img.fading { opacity: 0; }

/* prev/next hit areas */
.nav-zone {
  position: absolute;
  top: 0; bottom: 0;
  width: 25%;
  cursor: pointer;
  display: flex;
  align-items: center;
  opacity: 0;
  transition: opacity 0.15s;
  z-index: 10;
}
.nav-zone:hover { opacity: 1; }
.nav-zone.prev { left: 0; justify-content: flex-start; padding-left: 12px; }
.nav-zone.next { right: 0; justify-content: flex-end; padding-right: 12px; }
.nav-arrow {
  background: rgba(0,0,0,0.6);
  border: 1px solid var(--border-2);
  color: var(--text);
  border-radius: var(--radius);
  padding: 10px 14px;
  font-size: 18px;
  backdrop-filter: blur(4px);
  pointer-events: none;
}

/* empty / loading states */
.viewer-state {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: var(--text-3);
  font-size: 14px;
  text-align: center;
  padding: 2rem;
  pointer-events: none;
}
.viewer-state .icon { font-size: 2.5rem; margin-bottom: 4px; }
.viewer-state b { color: var(--text-2); font-weight: 500; }

/* ══ BOTTOM BAR ══ */
.bottom-bar {
  height: var(--bar-h);
  flex-shrink: 0;
  background: var(--surface);
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
}

.nav-btn {
  background: var(--surface-2);
  border: 1px solid var(--border);
  color: var(--text-2);
  border-radius: var(--radius);
  padding: 6px 14px;
  font-size: 13px;
  font-family: var(--font-mono);
  cursor: pointer;
  transition: color 0.1s, border-color 0.1s;
  white-space: nowrap;
}
.nav-btn:hover:not(:disabled) { color: var(--text); border-color: var(--border-2); }
.nav-btn:disabled { opacity: 0.3; cursor: default; }

.page-select {
  background: var(--surface-2);
  border: 1px solid var(--border);
  color: var(--text);
  border-radius: var(--radius);
  padding: 5px 8px;
  font-family: var(--font-mono);
  font-size: 13px;
  cursor: pointer;
  max-width: 220px;
}
.page-select:focus { outline: none; border-color: var(--accent); }

.page-counter {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-2);
  margin-left: 4px;
  white-space: nowrap;
}
.page-counter b { color: var(--text); }

.spacer { flex: 1; }

.kbd {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-3);
  padding: 2px 5px;
  border: 1px solid var(--text-3);
  border-radius: 3px;
  display: inline-block;
  line-height: 1.4;
}
.kbd-hint { font-size: 11px; color: var(--text-3); display: flex; align-items: center; gap: 4px; }

/* ══ FALLBACK INPUT ══ */
#file-input { display: none; }

/* ══ UTIL ══ */
.hidden { display: none !important; }
</style>
</head>
<body>
<div class="layout">

  <!-- TOP BAR -->
  <div class="top-bar">
    <div class="logo">galería<span>::</span>local</div>
    <button class="add-btn" id="add-btn" title="Añadir galería (carpeta)">＋</button>
    <div class="tabs-wrap" id="tabs-wrap"></div>
  </div>

  <!-- VIEWER -->
  <div class="viewer" id="viewer">
    <div class="viewer-state" id="viewer-state">
      <div class="icon">🗂</div>
      <b>Ninguna galería cargada</b>
      <span>Pulsa <strong>＋</strong> para añadir una carpeta</span>
    </div>
    <img class="viewer-img hidden" id="viewer-img" alt="">
    <div class="nav-zone prev" id="zone-prev"><div class="nav-arrow">‹</div></div>
    <div class="nav-zone next" id="zone-next"><div class="nav-arrow">›</div></div>
  </div>

  <!-- BOTTOM BAR -->
  <div class="bottom-bar">
    <button class="nav-btn" id="btn-prev">‹ Anterior</button>
    <select class="page-select hidden" id="page-select"></select>
    <span class="page-counter hidden" id="page-counter"></span>
    <button class="nav-btn" id="btn-next">Siguiente ›</button>
    <div class="spacer"></div>
    <div class="kbd-hint"><span class="kbd">←</span><span class="kbd">→</span> navegar</div>
  </div>

</div>

<!-- Fallback for browsers without showDirectoryPicker -->
<input type="file" id="file-input" accept=".jpg,.jpeg,.png,.gif" multiple webkitdirectory>

<script>
(function () {

/* ══════════════════════════════════════════════
   STATE
══════════════════════════════════════════════ */
var galleries = [];   /* [{ name, pages: [File, ...] }] */
var activeGallery = -1;
var activePage    = 0;
var objectURLs    = {};  /* galIdx -> [url, url, ...] */

/* ══════════════════════════════════════════════
   DOM REFS
══════════════════════════════════════════════ */
var addBtn      = document.getElementById('add-btn');
var tabsWrap    = document.getElementById('tabs-wrap');
var viewerState = document.getElementById('viewer-state');
var viewerImg   = document.getElementById('viewer-img');
var zonePrev    = document.getElementById('zone-prev');
var zoneNext    = document.getElementById('zone-next');
var btnPrev     = document.getElementById('btn-prev');
var btnNext     = document.getElementById('btn-next');
var pageSelect  = document.getElementById('page-select');
var pageCounter = document.getElementById('page-counter');
var fileInput   = document.getElementById('file-input');

/* ══════════════════════════════════════════════
   NATURAL SORT
══════════════════════════════════════════════ */
function naturalNum(name) {
  var m = name.match(/^(\d+)/);
  return m ? parseInt(m[1], 10) : Infinity;
}
function naturalSort(files) {
  return files.slice().sort(function (a, b) {
    var na = naturalNum(a.name), nb = naturalNum(b.name);
    if (na !== nb) return na - nb;
    return a.name.localeCompare(b.name);
  });
}

/* ══════════════════════════════════════════════
   EXTENSIONS
══════════════════════════════════════════════ */
var ALLOWED = /\.(jpe?g|png|gif)$/i;
function allowed(file) { return ALLOWED.test(file.name); }

/* ══════════════════════════════════════════════
   LOAD GALLERY
══════════════════════════════════════════════ */
function addGallery(name, files) {
  var sorted = naturalSort(files.filter(allowed));
  if (!sorted.length) { alert('No se encontraron imágenes (jpg/jpeg/png/gif) en la carpeta.'); return; }

  /* free any existing URLs for this gallery if name collision */
  var existIdx = galleries.findIndex(function (g) { return g.name === name; });
  if (existIdx !== -1) {
    freeURLs(existIdx);
    galleries.splice(existIdx, 1);
    delete objectURLs[existIdx];
    /* renumber objectURLs */
    rebuildObjectURLKeys();
  }

  var idx = galleries.length;
  galleries.push({ name: name, pages: sorted });
  objectURLs[idx] = sorted.map(function (f) { return URL.createObjectURL(f); });

  renderTabs();
  switchGallery(idx, 0);
}

function freeURLs(idx) {
  var urls = objectURLs[idx];
  if (urls) urls.forEach(function (u) { URL.revokeObjectURL(u); });
}

function rebuildObjectURLKeys() {
  var newMap = {};
  galleries.forEach(function (_, i) {
    newMap[i] = objectURLs[i] || [];
  });
  objectURLs = newMap;
}

/* ══════════════════════════════════════════════
   PICK FOLDER
══════════════════════════════════════════════ */
async function pickFolder() {
  if (window.showDirectoryPicker) {
    try {
      var dir = await window.showDirectoryPicker({ mode: 'read' });
      var files = [];
      for await (var entry of dir.values()) {
        if (entry.kind === 'file') {
          var f = await entry.getFile();
          if (allowed(f)) files.push(f);
        }
      }
      addGallery(dir.name, files);
    } catch (e) {
      /* user cancelled — do nothing */
      if (e.name !== 'AbortError') console.error(e);
    }
  } else {
    /* fallback: <input webkitdirectory> */
    fileInput.click();
  }
}

fileInput.addEventListener('change', function () {
  var files = Array.from(fileInput.files);
  if (!files.length) return;
  /* derive folder name from webkitRelativePath */
  var firstName = files[0].webkitRelativePath || files[0].name;
  var folderName = firstName.split('/')[0] || 'Galería';
  addGallery(folderName, files);
  fileInput.value = '';
});

/* ══════════════════════════════════════════════
   SWITCH GALLERY / PAGE
══════════════════════════════════════════════ */
function switchGallery(gIdx, pIdx) {
  activeGallery = gIdx;
  activePage    = pIdx || 0;
  renderTabs();
  renderPage();
  renderBottomBar();
}

function goPage(pIdx) {
  if (activeGallery < 0) return;
  var total = galleries[activeGallery].pages.length;
  pIdx = Math.max(0, Math.min(total - 1, pIdx));
  if (pIdx === activePage) return;
  activePage = pIdx;
  renderPage();
  renderBottomBar();
}

/* ══════════════════════════════════════════════
   RENDER
══════════════════════════════════════════════ */
function renderTabs() {
  tabsWrap.innerHTML = '';
  galleries.forEach(function (g, i) {
    var btn = document.createElement('button');
    btn.className = 'tab' + (i === activeGallery ? ' active' : '');
    btn.innerHTML =
      '<span>' + escH(g.name) + '</span>' +
      '<span class="tab-count">' + g.pages.length + '</span>' +
      '<span class="tab-close" data-close="' + i + '">✕</span>';

    btn.addEventListener('click', function (e) {
      var closeEl = e.target.closest('[data-close]');
      if (closeEl) {
        e.stopPropagation();
        removeGallery(parseInt(closeEl.getAttribute('data-close')));
        return;
      }
      switchGallery(i, 0);
    });
    tabsWrap.appendChild(btn);
  });
}

function renderPage() {
  if (activeGallery < 0 || !galleries.length) {
    viewerState.classList.remove('hidden');
    viewerImg.classList.add('hidden');
    return;
  }
  viewerState.classList.add('hidden');
  viewerImg.classList.remove('hidden');

  var url = objectURLs[activeGallery][activePage];
  if (viewerImg.src === url) return;
  viewerImg.classList.add('fading');
  setTimeout(function () {
    viewerImg.src = url;
    viewerImg.classList.remove('fading');
  }, 80);
}

function renderBottomBar() {
  if (activeGallery < 0 || !galleries.length) {
    pageSelect.classList.add('hidden');
    pageCounter.classList.add('hidden');
    btnPrev.disabled = true;
    btnNext.disabled = true;
    return;
  }

  var total = galleries[activeGallery].pages.length;
  btnPrev.disabled = activePage === 0;
  btnNext.disabled = activePage === total - 1;

  /* rebuild select */
  pageSelect.classList.remove('hidden');
  pageCounter.classList.remove('hidden');
  pageSelect.innerHTML = '';
  for (var i = 0; i < total; i++) {
    var opt = document.createElement('option');
    opt.value = i;
    opt.textContent = 'Página ' + (i + 1);
    opt.selected = i === activePage;
    pageSelect.appendChild(opt);
  }

  pageCounter.innerHTML = 'Página <b>' + (activePage + 1) + '</b> de <b>' + total + '</b>';
}

/* ══════════════════════════════════════════════
   REMOVE GALLERY
══════════════════════════════════════════════ */
function removeGallery(idx) {
  freeURLs(idx);
  galleries.splice(idx, 1);
  delete objectURLs[idx];
  rebuildObjectURLKeys();

  if (!galleries.length) {
    activeGallery = -1;
    activePage    = 0;
    renderTabs();
    renderPage();
    renderBottomBar();
    return;
  }
  var newIdx = Math.min(idx, galleries.length - 1);
  switchGallery(newIdx, 0);
}

/* ══════════════════════════════════════════════
   EVENTS
══════════════════════════════════════════════ */
addBtn.addEventListener('click', pickFolder);

btnPrev.addEventListener('click', function () { goPage(activePage - 1); });
btnNext.addEventListener('click', function () { goPage(activePage + 1); });

zonePrev.addEventListener('click', function () { goPage(activePage - 1); });
zoneNext.addEventListener('click', function () { goPage(activePage + 1); });

pageSelect.addEventListener('change', function () { goPage(parseInt(pageSelect.value)); });

document.addEventListener('keydown', function (e) {
  if (e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT') return;
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   { e.preventDefault(); goPage(activePage - 1); }
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown')  { e.preventDefault(); goPage(activePage + 1); }
  if (e.key === 'Home') { e.preventDefault(); goPage(0); }
  if (e.key === 'End')  { e.preventDefault(); goPage(galleries[activeGallery]?.pages.length - 1); }
});

/* swipe on touch screens */
var touchStartX = null;
document.getElementById('viewer').addEventListener('touchstart', function (e) {
  touchStartX = e.touches[0].clientX;
}, { passive: true });
document.getElementById('viewer').addEventListener('touchend', function (e) {
  if (touchStartX === null) return;
  var dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) { goPage(dx < 0 ? activePage + 1 : activePage - 1); }
  touchStartX = null;
});

/* ══════════════════════════════════════════════
   UTIL
══════════════════════════════════════════════ */
function escH(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ══════════════════════════════════════════════
   INIT
══════════════════════════════════════════════ */
renderTabs();
renderPage();
renderBottomBar();

})();
</script>
</body>
</html>

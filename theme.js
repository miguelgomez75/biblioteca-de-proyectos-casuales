/* theme.js — tema compartido de biblioteca::casual
   Se carga con <script src="…/theme.js"> en el <head> de cada página.
   Lee 'bc_theme' de localStorage y sobrescribe las variables CSS del <html>.
   Sin tema guardado, o con "Original", no toca nada: cada página conserva su aspecto. */
(function () {
  'use strict';

  var KEY = 'bc_theme';
  var HEX = /^#[0-9a-f]{6}$/i;
  var VARS = ['--bg', '--surface', '--surface-2', '--border', '--border-2',
              '--text', '--text-2', '--text-3', '--accent', '--accent-dim', '--on-accent',
              '--font-ui', '--radius', '--radius-lg'];

  var ORDER = ['original', 'medianoche', 'carbon', 'oceano', 'bosque', 'vino', 'amoled'];
  var PRESETS = {
    medianoche: { name: 'Medianoche', vars: {
      '--bg': '#0c0c10', '--surface': '#13131a', '--surface-2': '#1c1c26', '--border': '#25253a',
      '--border-2': '#40405a', '--text': '#e2e2f0', '--text-2': '#8080a0', '--text-3': '#454560' } },
    carbon: { name: 'Carbón', bg: '#0e0e0e', surface: '#171717', text: '#ececec' },
    oceano: { name: 'Océano', bg: '#0a1018', surface: '#101a26', text: '#dbe7f3' },
    bosque: { name: 'Bosque', bg: '#0b110d', surface: '#121b15', text: '#e0eee4' },
    vino:   { name: 'Vino',   bg: '#120a0d', surface: '#1b1116', text: '#f0e2e6' },
    amoled: { name: 'Amoled', bg: '#000000', surface: '#0b0b0b', text: '#f2f2f2' }
  };
  var FONTS = {
    default: null,
    system: "system-ui,-apple-system,'Segoe UI',Roboto,sans-serif",
    serif: "Georgia,'Times New Roman',serif",
    mono: "'IBM Plex Mono',ui-monospace,monospace"
  };
  var RADII = { default: null, sharp: ['4px', '8px'], round: ['16px', '26px'] };

  /* ── color ── */
  function rgb(h) { return [1, 3, 5].map(function (i) { return parseInt(h.substr(i, 2), 16); }); }
  function hex(c) {
    return '#' + c.map(function (v) {
      var s = Math.max(0, Math.min(255, Math.round(v))).toString(16);
      return s.length < 2 ? '0' + s : s;
    }).join('');
  }
  function mix(a, b, t) {
    var x = rgb(a), y = rgb(b);
    return hex([x[0] + (y[0] - x[0]) * t, x[1] + (y[1] - x[1]) * t, x[2] + (y[2] - x[2]) * t]);
  }
  function lum(h) {
    var c = rgb(h).map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }
  function onColor(h) {
    var l = lum(h);
    return (l + 0.05) / 0.05 >= 1.05 / (l + 0.05) ? '#000000' : '#ffffff';
  }
  function derive(bg, surface, text) {
    return {
      '--bg': bg, '--surface': surface,
      '--surface-2': mix(surface, text, 0.06),
      '--border': mix(surface, text, 0.13),
      '--border-2': mix(surface, text, 0.26),
      '--text': text,
      '--text-2': mix(bg, text, 0.55),
      '--text-3': mix(bg, text, 0.30)
    };
  }
  function presetVars(id) {
    var p = PRESETS[id];
    if (!p) return null;
    return p.vars ? p.vars : derive(p.bg, p.surface, p.text);
  }

  /* ── estado ── */
  function defaults() { return { v: 1, preset: 'original', custom: null, accent: null, font: 'default', radius: 'default' }; }

  function normalize(s) {
    if (!s || typeof s !== 'object') return null;
    var out = defaults();
    if (s.preset === 'original' || s.preset === 'custom' || PRESETS[s.preset]) out.preset = s.preset; else return null;
    if (out.preset === 'custom') {
      var c = s.custom || {};
      if (!HEX.test(c.bg) || !HEX.test(c.surface) || !HEX.test(c.text)) return null;
      out.custom = { bg: c.bg.toLowerCase(), surface: c.surface.toLowerCase(), text: c.text.toLowerCase() };
    }
    if (s.accent != null) {
      if (!HEX.test(s.accent)) return null;
      out.accent = s.accent.toLowerCase();
    }
    out.font = Object.prototype.hasOwnProperty.call(FONTS, s.font) ? s.font : 'default';
    out.radius = Object.prototype.hasOwnProperty.call(RADII, s.radius) ? s.radius : 'default';
    return out;
  }
  function read() {
    try { return normalize(JSON.parse(localStorage.getItem(KEY))); } catch (e) { return null; }
  }
  function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); return true; } catch (e) { return false; }
  }

  function compute(state) {
    var vars = {}, scheme = '', base = null;
    if (state.preset === 'custom' && state.custom) base = derive(state.custom.bg, state.custom.surface, state.custom.text);
    else if (state.preset !== 'original') base = presetVars(state.preset);
    if (base) {
      Object.keys(base).forEach(function (k) { vars[k] = base[k]; });
      scheme = lum(base['--bg']) > 0.5 ? 'light' : 'dark';
    }
    if (state.accent) {
      vars['--accent'] = state.accent;
      vars['--accent-dim'] = mix(base ? base['--bg'] : '#0c0c10', state.accent, 0.16);
      vars['--on-accent'] = onColor(state.accent);
    }
    if (FONTS[state.font]) vars['--font-ui'] = FONTS[state.font];
    if (RADII[state.radius]) { vars['--radius'] = RADII[state.radius][0]; vars['--radius-lg'] = RADII[state.radius][1]; }
    return { vars: vars, scheme: scheme };
  }

  function apply(state) {
    var st = document.documentElement.style;
    VARS.forEach(function (v) { st.removeProperty(v); });
    st.removeProperty('color-scheme');
    var out = compute(state || defaults());
    Object.keys(out.vars).forEach(function (k) { st.setProperty(k, out.vars[k]); });
    if (out.scheme) st.setProperty('color-scheme', out.scheme);
  }

  window.BCTheme = {
    KEY: KEY, ORDER: ORDER, PRESETS: PRESETS, FONTS: FONTS, RADII: RADII,
    defaults: defaults, normalize: normalize, read: read, save: save,
    compute: compute, apply: apply, derive: derive, presetVars: presetVars,
    mix: mix, lum: lum, onColor: onColor
  };

  apply(read());
  /* si cambias el tema en otra pestaña, esta se actualiza sola */
  window.addEventListener('storage', function (e) { if (e.key === KEY) apply(read()); });
})();

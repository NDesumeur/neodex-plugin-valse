// lancé par le test « local » de NeoDex : choisit un morceau intégré, lance la partie, tape quelques coups,
// vérifie que la chanson avance et que les notes sont jugées, puis pause (avec NEO_SHOTS : garde des images du jeu)
module.exports = async ({ pj, sleep }) => {
  const key = k => pj(`document.dispatchEvent(new KeyboardEvent('keydown', {key: '${k}', bubbles: true})), 0`);
  const label = () => pj(`document.getElementById('gc').getAttribute('aria-label') || ''`);
  const shot = async n => { if (!process.env.NEO_SHOTS) return; const d = await pj(`document.getElementById('gc').toDataURL()`); require('fs').writeFileSync(require('path').join(process.env.NEO_SHOTS, 'valse-' + n + '.png'), Buffer.from(d.split(',')[1], 'base64')); };
  await pj(`document.querySelector('#rhSongs .rhSong .btn')?.click(), 0`); await sleep(1000);  // l'étiquette « prêt » du morceau d'avant doit d'abord disparaître
  for (let i = 0; i < 40 && !/: prêt,/.test(await label()); i++) await sleep(500);
  if (!/: prêt,/.test(await label())) throw new Error('le morceau devait se préparer : « ' + await label() + ' »');
  await shot('0-pret');
  await pj(`window.__e = []; addEventListener('error', e => __e.push(e.message)); addEventListener('unhandledrejection', e => __e.push(String(e.reason?.message || e.reason))); 0`);
  await key(' '); await sleep(6500);
  const errs = await pj(`window.__e.join(' | ')`); if (errs) throw new Error('erreur : ' + errs);
  const judged = l => { const m = /: en jeu, score (\d+), combo \d+, parfait (\d+), bien (\d+), ok (\d+), raté (\d+)/.exec(l); return m ? +m[2] + +m[3] + +m[4] + +m[5] : 0; };
  for (let i = 0; i < 80 && judged(await label()) < 3; i++) { await key(i % 2 ? 'f' : 'j'); await sleep(300); }  // le morceau lent commence par une intro sans notes
  await shot('1-partie');
  const l = await label(), m = /: en jeu, score (\d+), combo \d+, parfait (\d+), bien (\d+), ok (\d+), raté (\d+)/.exec(l);
  if (!m || +m[2] + +m[3] + +m[4] + +m[5] < 3) throw new Error('la partie devait avancer et des notes être jugées : « ' + l + ' »');
  // la manette : une fausse manette ; A puis la croix frappent le temps
  await pj(`(() => { window.__pad = {buttons: Array.from({length: 17}, () => ({pressed: false})), axes: [0, 0]}; navigator.getGamepads = () => [window.__pad]; return 0; })()`);
  const pad = async (b, on) => { await pj(`(__pad.buttons[${b}].pressed = ${on}, 0)`); await sleep(120); };
  const tap = () => pj(`document.getElementById('gc').__rh.st().tap`);
  const t0 = await tap(); await pad(0, true); await pad(0, false); const t1 = await tap(); await sleep(150); await pad(12, true); await pad(12, false); const t2 = await tap();
  if (!(t1 > t0 && t2 > t1)) throw new Error('la manette devait frapper le temps : ' + [t0, t1, t2]);
  await key('p'); await sleep(400);
  if (!/: pause,/.test(await label())) throw new Error('P devait mettre en pause : « ' + await label() + ' »');
  // l'écran de fin et sa courbe de précision (une partie inventée : juste au début, des ratés au milieu)
  await pj(`(() => { const T = document.getElementById('gc').__rh, rh = T.st(), L = rh.c.len, h = []; for (let i = 0; i < 200; i++) { const t = i / 200 * L, mid = t > L * .4 && t < L * .6; h.push([t, mid ? (i % 3 ? 1 : 0) : (i % 7 ? 3 : 2)]); } T.finish(h); return 0; })()`);
  await sleep(1200); await shot('2-fin');
  const end = await pj(`(() => { const rh = document.getElementById('gc').__rh.st(); return [rh.mode, rh.hist.length].join(','); })()`);
  if (end !== 'over,200') throw new Error('écran de fin attendu : ' + end);
  return l;
};

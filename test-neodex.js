// lancé par le test « local » de NeoDex : choisit un morceau intégré, le joue juste (un robot tape pile sur chaque dalle), puis tape au hasard :
// la partie doit être perdue (« trop tôt »), puis reprendre au drapeau ; écran de fin et entraînement (avec NEO_SHOTS : garde des images du jeu)
module.exports = async ({ pj, sleep }) => {
  const key = k => pj(`document.dispatchEvent(new KeyboardEvent('keydown', {key: '${k}', bubbles: true})), 0`);
  const label = () => pj(`document.getElementById('gc').getAttribute('aria-label') || ''`);
  const st = js => pj(`(() => { const T = document.getElementById('gc').__rh, rh = T.st(); return ${js}; })()`);
  const shot = async n => { if (!process.env.NEO_SHOTS) return; const d = await pj(`document.getElementById('gc').toDataURL()`); require('fs').writeFileSync(require('path').join(process.env.NEO_SHOTS, 'valse-' + n + '.png'), Buffer.from(d.split(',')[1], 'base64')); };
  const ready = async () => { await pj(`document.querySelector('#rhSongs .rhSong .btn')?.click(), 0`); await sleep(1000);  // l'étiquette « prêt » du morceau d'avant doit d'abord disparaître
    for (let i = 0; i < 40 && !/: prêt,/.test(await label()); i++) await sleep(500);
    if (!/: prêt,/.test(await label())) throw new Error('le morceau devait se préparer : « ' + await label() + ' »'); };
  await ready(); await shot('0-pret');
  await pj(`window.__e = []; addEventListener('error', e => __e.push(e.message)); addEventListener('unhandledrejection', e => __e.push(String(e.reason?.message || e.reason))); 0`);
  // le robot : il tape quand l'horloge du jeu atteint la prochaine dalle
  await pj(`(() => { window.__auto = true; const T = document.getElementById('gc').__rh; const id = setInterval(() => { if (!window.__auto) return clearInterval(id); const rh = T.st(), n = rh.mode === 'play' && rh.notes.find(x => !x.judged); if (n && T.now() >= n.t - .004) T.hit(); }, 4); return 0; })()`);
  await key(' ');
  for (let i = 0; i < 60 && (await st('rh.counts.PARFAIT + rh.counts.BIEN + rh.counts.OK')) < 6; i++) await sleep(300);  // le morceau peut commencer par une intro sans notes
  await shot('1-partie');
  const l = await label(), good = await st(`[rh.mode, rh.counts.PARFAIT + rh.counts.BIEN + rh.counts.OK, rh.counts['RATÉ']].join()`);
  const errs = await pj(`window.__e.join(' | ')`); if (errs) throw new Error('erreur : ' + errs);
  if (!/^play,([6-9]|\d\d+),0$/.test(good)) throw new Error('joué juste, la partie devait avancer sans raté : ' + good + ' · « ' + l + ' » · ' + await st(`[rh.failed, rh.notes.slice(0, 3).map(n => n.t.toFixed(3)), rh.dts, rh.failT].join(' ')`));
  // taper au hasard (à la manette) perd la partie ; un drapeau inventé à la dalle 40 pour la reprise
  await pj(`(window.__auto = false, 0)`); await st(`(rh.cp = Math.min(40, rh.notes.length - 1), 0)`);
  await pj(`(() => { window.__pad = {buttons: Array.from({length: 17}, () => ({pressed: false})), axes: [0, 0]}; navigator.getGamepads = () => [window.__pad]; return 0; })()`);
  for (let i = 0; i < 60 && (await st('rh.mode')) === 'play'; i++) { await pj(`(__pad.buttons[${i % 2 ? 0 : 12}].pressed = true, 0)`); await sleep(40); await pj(`(__pad.buttons[${i % 2 ? 0 : 12}].pressed = false, 0)`); await sleep(40); }
  await sleep(400); const lost = await st(`[rh.mode, rh.failed].join()`);  // l'étiquette se met à jour 4 fois par seconde
  if (!/^fail,TROP (TÔT|TARD)$/.test(lost) || !/: perdu,/.test(await label())) throw new Error('taper au hasard devait perdre la partie : ' + lost);
  await sleep(800); await shot('2-perdu');
  // Espace : la partie repart au drapeau (les 40 premières dalles ne comptent pas)
  await key(' '); for (let i = 0; i < 40 && (await st('rh.mode')) !== 'play'; i++) await sleep(500);
  const back = await st(`[rh.mode, rh.from > 0, rh.notes.filter(n => n.off).length === rh.cp, rh.cp].join()`);
  await key('p'); await sleep(300);
  if (!/^play,true,true,\d+$/.test(back)) throw new Error('reprise au drapeau : ' + back);
  // l'écran de fin et sa courbe de précision (une partie inventée : juste au début, des ratés au milieu)
  await st(`(() => { const L = rh.c.len, h = []; for (let i = 0; i < 200; i++) { const t = i / 200 * L, mid = t > L * .4 && t < L * .6; h.push([t, mid ? (i % 3 ? 1 : 0) : (i % 7 ? 3 : 2)]); } T.finish(h); return 0; })()`);
  await sleep(1200); await shot('3-fin');
  const end = await st(`[rh.mode, rh.hist.length].join()`);
  if (end !== 'over,200') throw new Error('écran de fin attendu : ' + end);
  // l'entraînement à 50 % : les notes d'avant ne comptent pas
  await pj(`(() => { const s = document.getElementById('vaFrom'); s.value = '0.5'; s.dispatchEvent(new Event('change')); return 0; })()`);
  await ready(); await key(' '); await sleep(2500);
  const fr = await st(`[rh.from > 0, rh.notes.filter(n => n.off).length > 0 && rh.notes.filter(n => n.off).length < rh.notes.length, rh.notes.filter(n => !n.off && n.t < rh.from).length].join()`);
  await pj(`(() => { const s = document.getElementById('vaFrom'); s.value = '0'; s.dispatchEvent(new Event('change')); return 0; })()`); await key('p');
  if (fr !== 'true,true,0') throw new Error('entraînement à 50 % : ' + fr);
  await shot('4-entrainement');
  return l + ' · au hasard : ' + lost + ' · reprise au drapeau ok · entraînement ok';
};

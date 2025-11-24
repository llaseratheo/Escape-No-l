const SFX = (function () {
  const s = {};

  function load(n, u) {
    const a = new Audio(u);
    a.preload = 'auto';
    s[n] = a;
  }

  function play(n) {
    const a = s[n];
    if (!a) return;

    const c = a.cloneNode();
    c.volume = 0.7;
    c.play().catch(() => {});
  }

  return { load, play };
})();

// ✔ Corrigé en .mp3
SFX.load('click', 'assets/audio/click.mp3');
SFX.load('success', 'assets/audio/success.mp3');
SFX.load('error', 'assets/audio/error.mp3');

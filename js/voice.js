const Narration = (function () {
  const t = {};

  function load(id, src) {
    t[id] = new Audio(src);
    t[id].preload = "auto";
  }

  function play(id) {
    const a = t[id];
    if (!a) return;
    a.currentTime = 0;
    a.play().catch(() => {});
  }

  return { load, play };
})();

// INTRO
Narration.load("intro", "/assets/audio/intro_theme.mp3");

// ENIGMES
for (let i = 1; i <= 7; i++) {
  Narration.load("enigme" + i, `/assets/audio/enigme${i}.mp3`);
}

// FINAL
Narration.load("final", "/assets/audio/final_theme.mp3");

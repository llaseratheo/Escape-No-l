const SFX = (function () {
  const s = {};

  function load(name, url) {
    const a = new Audio(url);
    a.preload = "auto";
    s[name] = a;
  }

  function play(name) {
    const a = s[name];
    if (!a) return;
    const c = a.cloneNode();
    c.volume = 0.6;
    c.play().catch(()=>{});
  }

  return { load, play };
})();

SFX.load("click", "assets/audio/click.wav");
SFX.load("success", "assets/audio/success.wav");
SFX.load("error", "assets/audio/error.wav");

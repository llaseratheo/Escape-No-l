document.addEventListener('DOMContentLoaded', () => {

  const intro = document.getElementById('intro-screen');
  const game = document.getElementById('game');
  const startBtn = document.getElementById('startBtn');
  const mainContent = document.getElementById('mainContent');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const musicToggle = document.getElementById('musicToggle');
  const voiceToggle = document.getElementById('voiceToggle');

  // 🎵 MUSIQUE DE FOND (loop)
  const bg = new Audio('/assets/audio/background.mp3');
  bg.loop = true;
  bg.volume = 1.0;

  // 🎤 INTRO VOCALE (jouée au chargement du site)
  const introVoice = new Audio('/assets/audio/intro_theme.mp3');
  introVoice.volume = 0.4;

  // ⭐ 1 — Lancer automatiquement l’intro au chargement du site
  window.addEventListener("load", () => {
      if (voiceToggle.checked) {
          introVoice.currentTime = 0;
          introVoice.play().catch(() => {});
      }
  });

  // RÉPONSES
  const solutions = ["1", "42", "18", "4", "134", "83", "520"];

  // 🧩 ENIGMES
  const enigmes = [
    {
      title: "Énigme 1 — La Recette Perdue du Père Noël",
      image: "/assets/images/enigme1.png",
      text: `
Dans le marché enneigé de Levier, les effluves de chocolat chaud embaument la place.

Ressources restantes :
- 6 cuillères de cacao  
- 4 cuillères de sucre  
- 3 doses de lait  

👉 Combien de tasses complètes peut-on préparer ?
`
    },
    {
      title: "Énigme 2 — La Mairie",
      image: "/assets/images/enigme2.png",
      text: `K, S, L → somme des rangs → résultat ?`
    },
    {
      title: "Énigme 3 — Rondé",
      image: "/assets/images/enigme3.png",
      text: `Garde les nombres pairs, additionne, enlève 2.`
    },
    {
      title: "Énigme 4 — Gymnase",
      image: "/assets/images/enigme4.png",
      text: `👉 Quel est le vestiaire du Badminton ?`
    },
    {
      title: "Énigme 5 — Forêt",
      image: "/assets/images/enigme5.png",
      text: `👉 Valeur de ÉCUREUIL ?`
    },
    {
      title: "Énigme 6 — École",
      image: "/assets/images/enigme6.png",
      text: `👉 Valeur du mot BONHEUR ?`
    },
    {
      title: "Énigme 7 — Grande Place",
      image: "/assets/images/enigme7.png",
      text: `👉 Nombre magique final ?`
    }
  ];

  // ⭐ 2 — Quand on clique sur « Commencer l’aventure »
    startBtn.addEventListener("click", () => {
      SFX.play("click");
      intro.classList.add("hidden");
      game.classList.remove("hidden");

    // 1️⃣ Couper totalement l'intro vocale (qu'on ait cliqué tôt ou tard)
      introVoice.pause();
      introVoice.currentTime = 0;

    // 2️⃣ Lancer la musique d'ambiance
      if (musicToggle.checked) {
          bg.pause();
          bg.src = "/assets/audio/background.mp3";
          bg.currentTime = 0;
          bg.volume = 1.0;
          bg.play().catch(() => {});
      }

    // ⚠️ IMPORTANT :
    // On NE rejoue PLUS l'intro ici !
    // Elle ne doit se lancer qu'au chargement du site.

      loadStep(0);
  });
  // 🔍 CHARGER UNE ENIGME
  function loadStep(i) {
    const e = enigmes[i];

    // Couper intro
    introVoice.pause();

    mainContent.innerHTML = `
      <h2>${e.title}</h2>
      <img src="${e.image}" class="enigme-img"/>

      <p class="enigme-text">${e.text}</p>

      <input id="answer" class="answer" placeholder="Ta réponse ici"/>
      
      <button id="validate" class="validate">✅ Valider</button>
      <button id="playN" class="listen">🔊 Écouter l’énigme</button>

      <p id="feedback" class="feedback"></p>
    `;

    // Jouer la narration
    document.getElementById("playN").addEventListener("click", () => {
      SFX.play("click");
      Narration.play("enigme" + (i + 1));
    });

    // Validation
    document.getElementById("validate").addEventListener("click", () => {
      const ans = document.getElementById("answer").value.trim();
      const fb = document.getElementById("feedback");

      if (ans === solutions[i]) {
        fb.textContent = "🎉 Bonne réponse !";
        fb.style.color = "lime";
        SFX.play("success");
        nextBtn.disabled = false;
      } else {
        fb.textContent = "❌ Essaie encore !";
        fb.style.color = "red";
        SFX.play("error");
        nextBtn.disabled = true;
      }
    });

    nextBtn.disabled = true;
    document.getElementById("progress").innerText = `Étape ${i + 1} / 7`;
  }

  // ➡️ SUIVANT
  nextBtn.addEventListener("click", () => {
    const cur = Number(document.getElementById("progress").innerText.split(" ")[1]) - 1;
    if (cur < 6) loadStep(cur + 1);
    else window.location.href = "conclusion.html";
  });

  // ⬅️ PRÉCÉDENT
  prevBtn.addEventListener("click", () => {
    const cur = Number(document.getElementById("progress").innerText.split(" ")[1]) - 1;
    if (cur > 0) loadStep(cur - 1);
  });

});

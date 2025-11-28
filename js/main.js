document.addEventListener('DOMContentLoaded', () => {

  const intro = document.getElementById('intro-screen');
  const game = document.getElementById('game');
  const startBtn = document.getElementById('startBtn');
  const mainContent = document.getElementById('mainContent');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const musicToggle = document.getElementById('musicToggle');
  const voiceToggle = document.getElementById('voiceToggle');

  // 🎵 MUSIQUE AMBIANTE
  const bg = new Audio('/assets/audio/background.mp3');
  bg.loop = true;
  bg.volume = 0.6;

  // 🎤 INTRO VOCALE
  const introVoice = new Audio('/assets/audio/intro_theme.mp3');
  introVoice.volume = 0.2;
  const introNarration = new Audio('/assets/audio/intro.mp3');
  introNarration.volume = 1.0;


  // 🎧 Joue automatiquement l’intro au chargement
  window.addEventListener("load", () => {

    // 🎵 Musique intro (démarre immédiatement)
    introVoice.currentTime = 0;
    introVoice.play().catch(() => {});

    // 🎤 Voix narrative intro (démarre après 3,5s)
    introNarration.currentTime = 0;
    setTimeout(() => {
        introNarration.play().catch(() => {});
    }, 3500); // 3500 ms = 3,5 secondes
});


  // RÉPONSES
  const solutions = ["1", "42", "18", "4", "134", "83", "520"];

  // ENIGMES
  const enigmes = [
    {
      title: "Énigme 1 — La Recette Perdue du Père Noël",
      image: "/assets/images/enigme1.png",
      text: `
Dans le marché enneigé de Levier, les effluves de chocolat chaud embaument la place.
Mais catastrophe… le Père Noël a égaré sa recette secrète !

Un lutin retrouve un petit papier taché de cacao :
“Pour chaque tasse, prends deux cuillères de cacao, ajoute la moitié de sucre qu’il faut pour deux tasses, puis verse autant de lait que de cuillères de cacao.”

Le problème ? Il ne reste que six cuillères de cacao, quatre de sucre et trois de lait.

👉 Combien de tasses complètes de chocolat chaud peut-on préparer sans tricher sur la recette ?
`
    },
    {
      title: "Énigme 2 — La Mairie",
      image: "/assets/images/enigme2.png",
      text: `
Devant la mairie de Levier, les blasons étincellent sous la neige.
Trois symboles s’y dessinent :
Une clé, symbole du passage.
Une scie, symbole des bûcherons.
Un livre, symbole du savoir.

Levier vient du mot latin levare, qui signifie “soulever”.

Si chaque symbole correspond à la première lettre de son mot en français — K, S, et L — additionne leur rang dans l’alphabet.

👉 Quel est le total obtenu ?
`
    },
    {
      title: "Énigme 3 — Rondé",
      image: "/assets/images/enigme3.png",
      text: ` 
Sous le grand sapin du Rondé, sept guirlandes s’entremêlent.

Le Père Noël te demande de ne garder que celles dont le nombre d’étoiles est pair,
puis d’additionner ces nombres et de soustraire deux,
car une bourrasque glacée a emporté une partie de la déco.

👉 Quel est le nombre final ?
    `
    },
    {
      title: "Énigme 4 — Gymnase",
      image: "/assets/images/enigme4.png",
      text: `
Dans le gymnase de Levier, quatre vestiaires sont alignés : un, deux, trois et quatre.

Chaque groupe de lutins y pratique son sport préféré :
badminton, handball, tennis et football.

Le Père Noël a noté leurs exigences sur un parchemin :

1️⃣ Les lutins du handball veulent un vestiaire pair.
2️⃣ Ceux du tennis refusent d’être à côté des lutins du handball.
3️⃣ Les lutins du badminton doivent être entre deux vestiaires occupés.
4️⃣ Les lutins du football veulent le vestiaire le plus éloigné de celui du badminton.

👉 Peux-tu retrouver quel sport correspond à chaque vestiaire ?
  `
    },
    {
      title: "Énigme 5 — Forêt",
      image: "/assets/images/enigme5.png",
      text: `
Dans la forêt de Levier, la neige étouffe les sons.
Trois animaux se cachent sous les sapins : un renard, une chouette… et un écureuil.

Chacun garde un secret : un nombre mystérieux, gravé sur une pierre.

RENARD égale cent quatorze.
CHOUETTE égale cent vingt-huit.

Et ÉCUREUIL ?

Pour trouver sa valeur, il faut découvrir la règle cachée :
chaque mot vaut la somme de ses lettres selon leur rang dans l’alphabet…
mais attention : certaines lettres valent plus que d’autres…

👉 À toi de percer le code pour trouver la valeur d’ÉCUREUIL !
  `
    },
    {
      title: "Énigme 6 — École",
      image: "/assets/images/enigme6.png",
      text: `
Sur le tableau noir de l’école, les enfants ont laissé un message mystérieux :

NOËL égale cinquante.
SAPIN égale soixante-quatre.
BONHEUR égale… ?

Chaque mot vaut la somme des positions de ses lettres dans l’alphabet.
A égale un, B égale deux, C égale trois, et ainsi de suite.

👉 Quelle est la valeur du mot BONHEUR ?
    `
    },
    {
      title: "Énigme 7 — Grande Place",
      image: "/assets/images/enigme7.png",
      text: `
Le maire s’avance sur la grande place illuminée.
Il te confie la clé de la dernière porte :

“Additionne tous les chiffres cachés dans les énigmes précédentes,
puis soustrais le nombre de lettres du mot Levier.”

👉 Quel est le nombre magique final qui ouvre le calendrier de l’Avent ?
  `
    }
  ];

  // 🎄 DÉMARRAGE DU JEU
  startBtn.addEventListener("click", () => {
    SFX.play("click");

    intro.classList.add("hidden");
    game.classList.remove("hidden");

    // Stop intro
    introVoice.pause();
    introVoice.currentTime = 0;
    introNarration.pause();
    introNarration.currentTime = 0;


    // Lance musique
    if (musicToggle.checked) {
      bg.currentTime = 0;
      bg.play().catch(() => {});
    }

    loadStep(0);
  });

  // CHARGER UNE ÉNIGME
  function loadStep(i) {
    const e = enigmes[i];

    mainContent.innerHTML = `
      <div class="enigme-title">${e.title}</div>

      <img src="${e.image}" class="enigme-img"/>

      <div class="enigme-text">${e.text}</div>

      <input id="answer" class="answer" placeholder="Ta réponse ici"/>

      <button id="validate" class="validate">✅ Valider</button>
      <button id="playN" class="listen">🔊 Écouter l’énigme</button>

      <p id="feedback" class="feedback"></p>
    `;

    // Narration
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


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
  const bg = new Audio('assets/audio/background.wav');
  bg.loop = true;
  bg.volume = 0.08;

  // 🎤 INTRO VOCALE (non loop)
  const introVoice = new Audio('assets/audio/intro_theme.mp3');
  introVoice.volume = 1.0;

  // RÉPONSES ATTENDUES
  const solutions = ["1", "42", "18", "4", "134", "83", "520"];

  // 🧩 ENIGMES
  const enigmes = [
    {
      title: "Énigme 1 — La Recette Perdue du Père Noël",
      image: "assets/images/enigme1.png",
      text: `
Dans le marché enneigé de Levier, les effluves de chocolat chaud embaument la place.
Mais catastrophe : le Père Noël a égaré sa recette secrète !

Un lutin retrouve un petit papier taché de cacao :
“Pour chaque tasse, prends 2 cuillères de cacao, ajoute la moitié de sucre nécessaire
pour deux tasses, puis verse autant de lait que de cuillères de cacao.”

Ressources restantes :
- 6 cuillères de cacao  
- 4 cuillères de sucre  
- 3 doses de lait  

👉 Combien de tasses complètes peut-on préparer ?
`
    },
    {
      title: "Énigme 2 — La Mairie et l’Histoire de Levier",
      image: "assets/images/enigme2.png",
      text: `
Devant la mairie, une clé, une scie et un livre brillent sous la neige.

Chaque symbole → première lettre → rang dans l’alphabet :
K, S, L → additionne leurs rangs.

👉 K=11, S=19, L=12 → total ?
`
    },
    {
      title: "Énigme 3 — L’Aire du Rondé",
      image: "assets/images/enigme3.png",
      text: `
Sous le sapin du Rondé, sept guirlandes comportent :
3, 5, 4, 6, 2, 7, 8 étoiles.

Ne garde que les nombres pairs, additionne-les puis enlève 2.

👉 Résultat ?
`
    },
    {
      title: "Énigme 4 — Le Gymnase des Lutins Sportifs",
      image: "assets/images/enigme4.png",
      text: `
Quatre vestiaires : 1, 2, 3, 4  
Sports : Badminton – Handball – Tennis – Football  

Contraintes :
1️⃣ Handball → vestiaire pair  
2️⃣ Tennis → pas à côté du Handball  
3️⃣ Badminton → entre deux vestiaires occupés  
4️⃣ Football → le plus éloigné du Badminton  

👉 Quel est le numéro du vestiaire du Badminton ?
`
    },
    {
      title: "Énigme 5 — La Forêt de Levier",
      image: "assets/images/enigme5.png",
      text: `
Trois animaux : RENARD = 114, CHOUETTE = 128, ÉCUREUIL = ?

Règle cachée :
Somme des lettres + consonnes doublées.

👉 Valeur de ÉCUREUIL ?
`
    },
    {
      title: "Énigme 6 — L’École de Levier",
      image: "assets/images/enigme6.png",
      text: `
NOEL = 50  
SAPIN = 64  
BONHEUR = ?

Somme des lettres → A=1, B=2…

👉 Valeur de BONHEUR ?
`
    },
    {
      title: "Énigme 7 — La Grande Place (Finale)",
      image: "assets/images/enigme7.png",
      text: `
Additionne tous les chiffres trouvés :
1 + 42 + 18 + 4 + 134 + 83 + 238

Puis enlève le nombre de lettres du mot LEVIER (6).

👉 Nombre magique final ?
`
    }
  ];

  // ⭐ LANCEMENT DU JEU
  startBtn.addEventListener("click", () => {
    SFX.play("click");

    // ❗Couper totalement la musique d'intro
    introVoice.pause();
    introVoice.currentTime = 0;

    intro.classList.add("hidden");
    game.classList.remove("hidden");

    // Lancer la musique d’ambiance
    if (musicToggle.checked) {
      bg.currentTime = 0;
      bg.play().catch(() => {});
    }

    loadStep(0);
  });

  // 🔍 CHARGEMENT D'UNE ÉTAPE
  function loadStep(i) {
    const e = enigmes[i];

    mainContent.innerHTML = `
      <h2>${e.title}</h2>
      <img src="${e.image}" class="enigme-img"/>

      <p class="enigme-text">${e.text}</p>

      <input id="answer" class="answer" placeholder="Ta réponse ici"/>
      
      <button id="validate" class="validate">✅ Valider</button>
      <button id="playN" class="listen">🔊 Écouter l’énigme</button>

      <p id="feedback" class="feedback"></p>
    `;

    document.getElementById("playN").addEventListener("click", () => {
      SFX.play("click");
      Narration.play("enigme" + (i + 1));
    });

    // VALIDATION
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

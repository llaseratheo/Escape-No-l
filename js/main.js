document.addEventListener('DOMContentLoaded', () => {

  const intro = document.getElementById('intro-screen');
  const game = document.getElementById('game');
  const startBtn = document.getElementById('startBtn');
  const mainContent = document.getElementById('mainContent');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const musicToggle = document.getElementById('musicToggle');
  const voiceToggle = document.getElementById('voiceToggle');

  // INTRO MUSIC (loop)
  const bg = new Audio('assets/audio/intro_theme.mp3');
  bg.loop = true;
  bg.volume = 0.35;

  // 7 ENIGMES COMPLETES
  const enigmes = [
    {
      title: "Énigme 1 — La Recette Perdue du Père Noël",
      image: "assets/images/enigme1.png",
      text: `
Dans le marché enneigé de Levier, les effluves de chocolat chaud embaument la place.
Mais catastrophe : le Père Noël a égaré sa recette secrète !

Un lutin retrouve un petit papier taché de cacao :
“Pour chaque tasse, prends 2 cuillères de cacao, ajoute la moitié de sucre qu’il faut pour deux tasses,
puis verse autant de lait que de cuillères de cacao.”

Le problème ? Il ne reste que :
6 cuillères de cacao
4 cuillères de sucre
3 doses de lait

👉 Combien de tasses complètes peut-on préparer ?
Indice : 1 tasse = 2 cacao + 1 sucre + 2 lait.

🎄 **Solution : 1 tasse**`
    },
    {
      title: "Énigme 2 — La Mairie et l’Histoire de Levier",
      image: "assets/images/enigme2.png",
      text: `
Devant la mairie de Levier, une clé, une scie et un livre brillent sous la neige.

Chaque symbole correspond à la première lettre de son mot en français :
K, S, L → additionne leur rang dans l’alphabet.

👉 K=11, S=19, L=12 → total ?

🎄 **Solution : 42**`
    },
    {
      title: "Énigme 3 — L’Aire du Rondé",
      image: "assets/images/enigme3.png",
      text: `
Sous le sapin du Rondé, sept guirlandes comportent :
3, 5, 4, 6, 2, 7, 8 étoiles.

Ne garde que les nombres pairs, additionne-les puis retire 2.

👉 (4 + 6 + 2 + 8) – 2

🎄 **Solution : 18**`
    },
    {
      title: "Énigme 4 — Le Gymnase des Lutins Sportifs",
      image: "assets/images/enigme4.png",
      text: `
Dans le gymnase, quatre vestiaires 1 à 4.
Sports : Badminton, Handball, Tennis, Football.

Contraintes :
1️⃣ Handball → vestiaire pair
2️⃣ Tennis → pas à côté du Handball
3️⃣ Badminton → doit être entre deux vestiaires occupés
4️⃣ Football → le plus éloigné du Badminton

🎄 **Solution :**
Vestiaire 1 → Tennis
Vestiaire 2 → Handball
Vestiaire 3 → Badminton
Vestiaire 4 → Football`
    },
    {
      title: "Énigme 5 — La Forêt de Levier",
      image: "assets/images/enigme5.png",
      text: `
Dans la forêt, 3 animaux gardent un nombre :
RENARD = 114
CHOUETTE = 128
ÉCUREUIL = ?

Règle : somme des lettres + consonnes doublées.

🎄 **Solution : 134**`
    },
    {
      title: "Énigme 6 — L’École de Levier",
      image: "assets/images/enigme6.png",
      text: `
NOEL = 50
SAPIN = 64
BONHEUR = ?

Somme des rangs :
B(2)+O(15)+N(14)+H(8)+E(5)+U(21)+R(18)

🎄 **Solution : 83**`
    },
    {
      title: "Énigme 7 — La Grande Place (Finale)",
      image: "assets/images/enigme7.png",
      text: `
Additionne tous les chiffres trouvés :
1 + 42 + 18 + 4 + 134 + 83 + 238 (gymnase + forêt cachée)

Retire ensuite le nombre de lettres du mot LEVIER (6).

🎄 **Solution finale : 520**`
    }
  ];

  // ======== START BUTTON ========
  startBtn.addEventListener("click", () => {
    SFX.play("click");
    intro.classList.add("hidden");
    game.classList.remove("hidden");

    if (musicToggle.checked) bg.play().catch(() => {});
    if (voiceToggle.checked) Narration.play("intro");

    loadStep(0);
  });

  // ======== LOAD A STEP ========
  function loadStep(i) {
    const e = enigmes[i];

    mainContent.innerHTML = `
      <h2>${e.title}</h2>
      <img src="${e.image}" class="enigme-img"/>
      <p class="enigme-text">${e.text}</p>

      <button id="playN" class="listen">🔊 Écouter l’énigme</button>
    `;

    document.getElementById("playN").addEventListener("click", () => {
      SFX.play("click");
      Narration.play("enigme" + (i + 1));
    });

    document.getElementById("progress").innerText = `Étape ${i + 1} / 7`;
  }

  // ======== NAVIGATION ========
  nextBtn.addEventListener("click", () => {
    const cur = Number(document.getElementById("progress").innerText.split(" ")[1]) - 1;

    if (cur < 6) loadStep(cur + 1);
    else window.location.href = "conclusion.html";
  });

  prevBtn.addEventListener("click", () => {
    const cur = Number(document.getElementById("progress").innerText.split(" ")[1]) - 1;

    if (cur > 0) loadStep(cur - 1);
  });

});

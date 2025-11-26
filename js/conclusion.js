/* conclusion.js
   Assure-toi de placer ce fichier dans js/conclusion.js
   (les chemins audio sont "assets/audio/final_theme.mp3" et "assets/audio/final.mp3")
*/

document.addEventListener("DOMContentLoaded", () => {
  const theme = document.getElementById("finalTheme");
  const voice = document.getElementById("finalVoice");
  const restartBtn = document.getElementById("restartBtn");
  const certBtn = document.getElementById("certificateBtn");

  // volumes par défaut
  theme.volume = 0.75;
  voice.volume = 0.95;

  // Play theme immediately (si le navigateur l'autorise)
  const tryPlayTheme = async () => {
    try {
      await theme.play();
      console.debug("final theme started");
    } catch (e) {
      console.warn("Autoplay blocked - theme not started yet");
    }
  };

  // play voice after 12s
  const scheduleVoice = () => {
    setTimeout(async () => {
      try {
        await voice.play();
        console.debug("final voice started");
      } catch (e) {
        console.warn("Autoplay blocked - voice not started yet");
      }
    }, 12000);
  };

  // tenter de jouer au chargement
  tryPlayTheme();
  scheduleVoice();

  // si utilisateur clique n'importe où : relancer sons quand autorisé
  const resumeAudioOnInteraction = () => {
    try {
      theme.play().catch(()=>{});
      voice.play().catch(()=>{});
    } catch(e){}
    // remove listeners : on a assez essayé
    window.removeEventListener('click', resumeAudioOnInteraction);
    window.removeEventListener('keydown', resumeAudioOnInteraction);
  };
  window.addEventListener('click', resumeAudioOnInteraction);
  window.addEventListener('keydown', resumeAudioOnInteraction);

  // bouton rejouer -> renvoie vers index
  restartBtn.addEventListener('click', () => {
    // pause audios proprement
    theme.pause(); theme.currentTime = 0;
    voice.pause(); voice.currentTime = 0;
    window.location.href = "index.html";
  });

  // bouton certificat simple (export texte en image / PDF possible)
  certBtn.addEventListener('click', () => {
    const text = "Je suis un héros de Noël !\nEscape Game - Levier\nNombre magique : 520";
    // méthode simple : ouvrir une page imprimable (l'utilisateur pourra sauver en PDF)
    const w = window.open("", "_blank");
    w.document.write("<pre style='font-family:Segoe UI,Arial; font-size:18px;'>"+text+"</pre>");
    w.document.close();
    w.focus();
  });
});

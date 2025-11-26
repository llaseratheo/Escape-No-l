window.addEventListener("DOMContentLoaded", () => {

    const music = document.getElementById("finalMusic");
    const voice = document.getElementById("finalVoice");

    // Musique finale
    music.currentTime = 0;
    music.volume = 0.8;
    music.play().catch(() => {});

    // Voix après 12 secondes
    setTimeout(() => {
        voice.currentTime = 0;
        voice.volume = 0.9;
        voice.play().catch(() => {});
    }, 12000);

    // Bouton rejouer
    document.getElementById("restartBtn").addEventListener("click", () => {
        window.location.href = "index.html";
    });
});

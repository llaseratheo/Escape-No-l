document.addEventListener('DOMContentLoaded',()=>{
  const startBtn=document.getElementById('startBtn'), intro=document.getElementById('intro-screen'), game=document.getElementById('game');
  const mainContent=document.getElementById('mainContent'), nextBtn=document.getElementById('nextBtn'), prevBtn=document.getElementById('prevBtn');
  const musicToggle=document.getElementById('musicToggle'), voiceToggle=document.getElementById('voiceToggle');
  const bg=new Audio('/assets/audio/background.wav');bg.loop=true;bg.volume=0.25;
  startBtn.addEventListener('click',()=>{SFX.play('click'); intro.classList.add('hidden'); game.classList.remove('hidden'); if(musicToggle.checked) bg.play().catch(()=>{}); if(voiceToggle.checked) Narration.play('intro'); loadStep(0);} );
  function loadStep(i){ mainContent.innerHTML=`<h2>Étape ${i+1}</h2><div class="enigme-card"><p>Le texte complet de l'énigme ${i+1} est disponible dans le README.md et préchargé pour narration.</p><button id="playN">🔊 Écouter</button></div>`;
    document.getElementById('playN').addEventListener('click',()=>{SFX.play('click'); Narration.play('enigme'+(i+1));}); document.getElementById('progress').innerText=`Étape ${i+1} / 7`; }
  nextBtn.addEventListener('click',()=>{const cur = Number(document.getElementById('progress').innerText.split(' ')[1]) - 1; if(cur<6) loadStep(cur+1); else window.location.href='conclusion.html';});
  prevBtn.addEventListener('click',()=>{const cur = Number(document.getElementById('progress').innerText.split(' ')[1]) - 1; if(cur>0) loadStep(cur-1);});
});
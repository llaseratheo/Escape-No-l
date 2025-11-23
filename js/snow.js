(function(){
  const canvas=document.createElement('canvas');canvas.id='snow-canvas';canvas.style.position='fixed';canvas.style.left=0;canvas.style.top=0;canvas.style.zIndex=5;canvas.style.pointerEvents='none';document.getElementById('snow-container').appendChild(canvas);
  const ctx=canvas.getContext('2d');let w,h,flakes=[];
  function init(){w=canvas.width=innerWidth;h=canvas.height=innerHeight;flakes=[];for(let i=0;i<80;i++){flakes.push({x:Math.random()*w,y:Math.random()*h,r:1+Math.random()*3,s:0.5+Math.random()*1.5})}}
  function draw(){ctx.clearRect(0,0,w,h);ctx.fillStyle='rgba(255,255,255,0.9)';flakes.forEach((f,i)=>{ctx.beginPath();ctx.arc(f.x,f.y,f.r,0,Math.PI*2);ctx.fill();f.y+=f.s;f.x+=Math.sin((f.y+i)/30);if(f.y>h+5){f.y=-10;f.x=Math.random()*w}});requestAnimationFrame(draw)}
  window.addEventListener('resize',init);init();draw();
})();
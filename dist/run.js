var music=null;function initMusic(){for(var i=new sonant,e=0;e<8;++e)i.generate(e);(music=i.createAudio()).loop=!0,music.volume=.9}if(!isMobile)try{initMusic()}catch(i){}function initMainMenu(){isMobile&&(document.body.className="mobile");var e=document.getElementById("m"),n=document.getElementById("s");e.addEventListener("change",function(i){music&&(e.checked?(music.currentTime=0,music.play()):music.pause())}),n.addEventListener("change",function(i){aa.on=n.checked}),container.removeChild(loadingScreen),music&&music.play()}function init(){scrollAccel=0,initializePlayer(),initializeDanger()}handleResize(),initMainMenu(),initializeCanvas(),requestAnimationFrame(mainloop);
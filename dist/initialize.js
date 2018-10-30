"use strict";var CANVAS_WIDTH=960,CANVAS_HEIGTH=540,COLUMN_WIDTH=48,COLUMN_COUNT=CANVAS_WIDTH/COLUMN_WIDTH+2,STARTING_HEIGHT=.25*CANVAS_HEIGTH,EASING_POINTS=10,EASING_STEP=Math.pow(EASING_POINTS,-1),T=.02,HALF_COLUMN_WIDTH=.5*COLUMN_WIDTH;function lerp(e,n,t){return e*(1-t)+n*t}function easeInOutQuad(e){return e<.5?2*e*e:2*e*(2-e)-1}function clamp(e,n,t){return e<n?n:t<e?t:e}function shuffle(e){for(var n,t,r=e.length;r;)n=Math.floor(Math.random()*r),t=e[--r],e[r]=e[n],e[n]=t}var container=document.getElementById("container"),hcanvas=document.getElementById("canvas"),canvas=hcanvas.getContext("2d"),aspect=16/9,cscale=1,transformProperty="transform";function setSize(e,n,t){e.style[n]=t+"px"}function handleResize(){var e=window.innerWidth,n=window.innerHeight;aspect<e/n?e=n*aspect:n=e/aspect,cscale=CANVAS_WIDTH/e,setSize(container,"width",e),setSize(container,"height",n),setSize(container,"left",.5*(window.innerWidth-e)),setSize(container,"top",.5*(window.innerHeight-n));var t=.5*e/CANVAS_WIDTH,r="scale3d("+t+","+t+",1)";startScreen.style[transformProperty]=r,endScreen.style[transformProperty]=r}transformProperty in container.style||(transformProperty="webkitTransform"),window.addEventListener("resize",handleResize),window.addEventListener("orientationchange",handleResize),hcanvas.addEventListener("contextmenu",function(e){e.preventDefault()});
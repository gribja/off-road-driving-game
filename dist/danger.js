var BEFORE_DANGER=660,DANGER_DURATION=940,DANGER_PAUSE_EASY=2400,DANGER_PAUSE_HARD=250,DANGER_TABLE=[{a:0,b:100,a2:-1,b2:-1},{a:110,b:100,a2:-1,b2:-1},{a:220,b:100,a2:-1,b2:-1},{a:330,b:100,a2:-1,b2:-1},{a:440,b:100,a2:-1,b2:-1},{a:0,b:220,a2:-1,b2:-1},{a:160,b:220,a2:-1,b2:-1},{a:320,b:220,a2:-1,b2:-1},{a:0,b:100,a2:440,b2:100},{a:110,b:100,a2:330,b2:100},{a:0,b:100,a2:220,b2:100},{a:220,b:100,a2:440,b2:100},{a:0,b:144,a2:396,b2:144}];shuffle(DANGER_TABLE);var nextDanger=NO_DANGER,doDanger=!1,dangerTimer=NaN,dangerPause=DANGER_PAUSE_EASY;function initializeDanger(){for(var a=colBegin,e=COLUMN_COUNT;e;--e)a.danger=NO_DANGER,a=a.next;nextDanger=NO_DANGER,doDanger=!1,dangerTimer=setTimeout(scheduleDanger,dangerPause=DANGER_PAUSE_EASY)}function scheduleDanger(){nextDanger=getDanger(),dangerTimer=setTimeout(dangerBegin,BEFORE_DANGER)}function dangerBegin(){doDanger=!0,dangerTimer=setTimeout(dangerEnd,DANGER_DURATION*(.9+.2*Math.random()))}function dangerEnd(){doDanger=!1,nextDanger=NO_DANGER,dangerTimer=setTimeout(scheduleDanger,dangerPause=Math.max(dangerPause-200,DANGER_PAUSE_HARD))}var nd=0;function getDanger(){return nd==DANGER_TABLE.length&&(nd=0,shuffle(DANGER_TABLE)),DANGER_TABLE[nd++]}
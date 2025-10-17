(function() {
    'use strict';
    const style=document.createElement('style');
    style.innerHTML=`
        #mod_board, #mod_board button { font-family:sans-serif; user-select:none; image-rendering:pixelated; }
        #mod_board button:focus { outline:none; }
    `;
    document.head.appendChild(style);

    const wait=setInterval(()=>{
        if(typeof ig!=='undefined' && ig.game && ig.game.O4269){ clearInterval(wait); initBoard(); }
    },100);

    function initBoard(){
        const board=document.createElement('div');
        board.id='mod_board';
        board.style.cssText=`
            position:fixed; top:20px; right:20px; width:160px; padding:5px;
            background:rgba(191,188,184,0.85);
            border-top:2px solid #efeeec; border-left:2px solid #efeeec;
            border-bottom:2px solid #6f6d69; border-right:2px solid #6f6d69;
            font-size:12px; color:#000;
            z-index:9999; cursor:grab;
            box-sizing:border-box;
        `;
        document.body.appendChild(board);

        // Dragging
        let dragging=false, ox, oy;
        board.onmousedown=e=>{ dragging=true; ox=e.clientX-board.offsetLeft; oy=e.clientY-board.offsetTop; board.style.cursor='grabbing'; };
        document.onmouseup=()=>{ dragging=false; board.style.cursor='grab'; };
        document.onmousemove=e=>{ if(dragging){ board.style.left=e.clientX-ox+'px'; board.style.top=e.clientY-oy+'px'; } };

        const contentDiv=document.createElement('div'); contentDiv.style.marginTop='10px';
        board.appendChild(contentDiv);

        const title=document.createElement('div'); title.textContent='MOD BOARD';
        title.style.cssText='text-align:center; font-weight:bold; margin-bottom:5px;';
        contentDiv.appendChild(title);

        window.modBoard = { board, contentDiv }; // expose for other modules
    }
})();

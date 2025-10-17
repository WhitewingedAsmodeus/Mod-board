(function() {
    'use strict';

    // Styles
    const style = document.createElement('style');
    style.textContent = `
        #mod_board { 
            position: fixed; top: 20px; right: 20px; width: 160px; 
            padding: 5px; background: rgba(191,188,184,0.85); 
            border-top:2px solid #efeeec; border-left:2px solid #efeeec; 
            border-bottom:2px solid #6f6d69; border-right:2px solid #6f6d69; 
            font-family: sans-serif; font-size: 12px; color:#000; z-index: 9999; cursor: grab; box-sizing: border-box;
        }
        #mod_board button { width:100%; padding:2px 0; margin-top:3px; cursor:pointer; font-size:12px; }
        #mod_board button:focus { outline:none; }
    `;
    document.head.appendChild(style);

    // Wait for Manyland to be ready
    const wait = setInterval(()=>{
        if(typeof ig !== 'undefined' && ig.game && ig.game.O4269){ 
            clearInterval(wait); initBoard(); 
        }
    }, 100);

    function initBoard() {
        const board = document.createElement('div');
        board.id = 'mod_board';
        board.textContent = 'MOD BOARD';
        document.body.appendChild(board);

        // Drag
        let dragging = false, ox, oy;
        board.onmousedown = e => { dragging=true; ox=e.clientX-board.offsetLeft; oy=e.clientY-board.offsetTop; board.style.cursor='grabbing'; };
        document.onmouseup = ()=>{ dragging=false; board.style.cursor='grab'; };
        document.onmousemove = e=>{ if(dragging){ board.style.left=e.clientX-ox+'px'; board.style.top=e.clientY-oy+'px'; } };

        // Provide global createButton function for modules
        window.createButton = function(text) {
            const btn = document.createElement('button');
            btn.textContent = text;
            btn.style.background='rgba(198,195,191,0.85)';
            btn.style.borderTop='2px solid #efeeec';
            btn.style.borderLeft='2px solid #efeeec';
            btn.style.borderBottom='2px solid #6f6d69';
            btn.style.borderRight='2px solid #6f6d69';
            board.appendChild(btn);

            // simple click animation
            btn.addEventListener('click', ()=>{
                btn.style.borderTop='2px solid #6f6d69';
                btn.style.borderLeft='2px solid #6f6d69';
                btn.style.borderBottom='2px solid #efeeec';
                btn.style.borderRight='2px solid #efeeec';
                btn.style.background='rgba(170,167,163,0.85)';
                setTimeout(()=>{
                    btn.style.borderTop='2px solid #efeeec';
                    btn.style.borderLeft='2px solid #efeeec';
                    btn.style.borderBottom='2px solid #6f6d69';
                    btn.style.borderRight='2px solid #6f6d69';
                    btn.style.background='rgba(198,195,191,0.85)';
                },200);
            });
            return btn;
        }
    }

})();


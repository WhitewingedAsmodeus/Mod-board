function initBoard() {
    const board = document.createElement('div');
    board.id = 'mod_board';
    document.body.appendChild(board);

    // Add the "MOD BOARD" title
    const title = document.createElement('div');
    title.textContent = 'MOD BOARD';
    title.style.cssText = 'text-align:center; font-weight:bold; margin-bottom:5px;';
    board.appendChild(title);

    // Drag logic...
    let dragging = false, ox, oy;
    board.onmousedown = e => { dragging=true; ox=e.clientX-board.offsetLeft; oy=e.clientY-board.offsetTop; board.style.cursor='grabbing'; };
    document.onmouseup = ()=>{ dragging=false; board.style.cursor='grab'; };
    document.onmousemove = e=>{ if(dragging){ board.style.left=e.clientX-ox+'px'; board.style.top=e.clientY-oy+'px'; } };

    // createButton helper with animation
    window.createButton = function(text){
        const btn = document.createElement('button');
        btn.textContent = text;
        btn.style.background='rgba(198,195,191,0.85)';
        btn.style.borderTop='2px solid #efeeec';
        btn.style.borderLeft='2px solid #efeeec';
        btn.style.borderBottom='2px solid #6f6d69';
        btn.style.borderRight='2px solid #6f6d69';
        board.appendChild(btn);

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


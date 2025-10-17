(function(){
    const board = document.getElementById('mod_board');
    if(!board) return;

    const btn = document.createElement('button');
    btn.textContent = 'Rocket';
    btn.style.cssText = `
        width:100%; padding:2px 0; margin-top:3px;
        background:rgba(198,195,191,0.85);
        border-top:2px solid #efeeec;
        border-left:2px solid #efeeec;
        border-bottom:2px solid #6f6d69;
        border-right:2px solid #6f6d69;
        cursor:pointer;
    `;
    btn.onclick = () => {
        const player = ig.game.O4269;
        if(player && player.vel) player.vel.y = -1100;
        btn.style.background = 'rgba(163,161,157,0.85)';
        setTimeout(()=>btn.style.background='rgba(198,195,191,0.85)',120);
    };
    board.appendChild(btn);
})();

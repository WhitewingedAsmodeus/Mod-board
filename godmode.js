(function(){
    const board = document.getElementById('mod_board');
    if(!board) return;

    const btn = document.createElement('button');
    btn.textContent = 'Godmode';
    btn.dataset.toggled = 'false';
    btn.style.cssText = `
        width:100%; padding:2px 0; margin-top:3px;
        background:rgba(198,195,191,0.85);
        border-top:2px solid #efeeec;
        border-left:2px solid #efeeec;
        border-bottom:2px solid #6f6d69;
        border-right:2px solid #6f6d69;
        cursor:pointer;
    `;

    let godEnabled = false;
    let player = ig.game.O4269;
    const originalKill = player?.kill?.bind(player);

    function updateKill(){
        if(!player) return;
        player.kill = godEnabled ? ()=>{} : originalKill;
    }

    btn.onclick = () => {
        godEnabled = (btn.dataset.toggled === 'true');
        btn.dataset.toggled = godEnabled ? 'false' : 'true';
        updateKill();
    };

    board.appendChild(btn);
})();

(function(){
    const board = document.getElementById('mod_board');
    if(!board) return;

    const btn = document.createElement('button');
    btn.textContent = 'Drag Player (Ctrl+Y)';
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
    
    let dragMode = false;
    let player, mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', e=>{
        const rect = ig.system.canvas.getBoundingClientRect();
        const scale = ig.system.scale || 1;
        mouseX = (e.clientX - rect.left)/scale + ig.game.screen.x;
        mouseY = (e.clientY - rect.top)/scale + ig.game.screen.y;
    });

    function loop(){
        if(dragMode && player){
            const tx = mouseX - player.size.x/2;
            const ty = mouseY - player.size.y/2;
            player.pos.x += (tx - player.pos.x) * 0.2;
            player.pos.y += (ty - player.pos.y) * 0.2;
            player.vel.x = 0; player.vel.y = 0;
        }
        requestAnimationFrame(loop);
    }

    function initDrag(){
        player = ig.game.O4269;
        if(player){ loop(); }
        else setTimeout(initDrag,100);
    }
    initDrag();

    btn.onclick = () => {
        dragMode = (btn.dataset.toggled === 'true');
        btn.dataset.toggled = dragMode ? 'false' : 'true';
    };
    
    document.addEventListener('keydown', e=>{
        if(e.ctrlKey && e.key.toLowerCase() === 'y'){
            e.preventDefault();
            btn.click();
        }
    });

    board.appendChild(btn);
})();

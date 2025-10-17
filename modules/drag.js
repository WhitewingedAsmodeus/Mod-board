
const dragBtn = ModBoard.createButton("Drag Player (Ctrl+Y)", true);

let dragMode = false;
let player, mouseX = 0, mouseY = 0;


const overlay = document.createElement('div');
overlay.style.cssText = 'position:fixed; top:0; left:0; width:100vw; height:100vh; z-index:9998; pointer-events:none; cursor:crosshair;';
document.body.appendChild(overlay);


document.addEventListener('mousemove', e => {
    const rect = ig.system.canvas.getBoundingClientRect();
    const scale = ig.system.scale || 1;
    mouseX = (e.clientX - rect.left) / scale + ig.game.screen.x;
    mouseY = (e.clientY - rect.top) / scale + ig.game.screen.y;
});


function startDragLoop() {
    function loop() {
        if(dragMode && player){
            const tx = mouseX - player.size.x / 2;
            const ty = mouseY - player.size.y / 2;
            player.pos.x += (tx - player.pos.x) * 0.2;
            player.pos.y += (ty - player.pos.y) * 0.2;
            player.vel.x = 0;
            player.vel.y = 0;
        }
        requestAnimationFrame(loop);
    }
    loop();
}


function initDrag() {
    if(window.ig && ig.game && ig.game.O4269) {
        player = ig.game.O4269;
        startDragLoop();
    } else {
        setTimeout(initDrag, 100);
    }
}
initDrag();


dragBtn.onclick = () => {
    dragMode = dragBtn.dataset.toggled === 'true';
    overlay.style.pointerEvents = dragMode ? 'auto' : 'none';
};


document.addEventListener('keydown', e => {
    if(e.ctrlKey && e.key.toLowerCase() === 'y'){
        e.preventDefault();
        dragBtn.click();
    }
});

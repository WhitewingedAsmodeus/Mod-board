(function() {
    'use strict';

    const wait = setInterval(() => {
        if (typeof ig !== 'undefined' && ig.game && ig.game.O4269) {
            clearInterval(wait);
            initDragPlayer();
        }
    }, 100);

    function initDragPlayer() {
        if (document.getElementById('mod_dragplayer')) return;

        const board = document.createElement('div');
        board.id = 'mod_dragplayer';
        board.style.cssText = `
            position:fixed; top:100px; right:20px; width:160px; padding:5px;
            background:rgba(191,188,184,0.85);
            border-top:2px solid #efeeec;
            border-left:2px solid #efeeec;
            border-bottom:2px solid #6f6d69;
            border-right:2px solid #6f6d69;
            font-family:sans-serif; font-size:12px; color:#000;
            z-index:9999; cursor:grab; box-sizing:border-box;
        `;
        document.body.appendChild(board);

        // Remove the old drag implementation and use the global DragManager
        if(window.DragManager) {
            window.DragManager.makeDraggable('mod_dragplayer');
        }

        // Title + close button
        const titleBar = document.createElement('div');
        titleBar.style.cssText = 'display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;';
        board.appendChild(titleBar);

        const title = document.createElement('div');
        title.textContent = 'Drag Player';
        title.style.fontWeight = 'bold';
        titleBar.appendChild(title);

        const closeBtn = document.createElement('div');
        closeBtn.textContent = '✖';
        closeBtn.style.cssText = 'cursor:pointer; font-weight:bold; user-select:none;';
        titleBar.appendChild(closeBtn);

        // Toggle button
        const dragBtn = document.createElement('button');
        dragBtn.textContent = 'Enable Drag';
        dragBtn.dataset.toggled = 'false';
        dragBtn.style.cssText = `
            width:100%; padding:2px 0;
            background:rgba(198,195,191,0.85);
            border-top:2px solid #efeeec;
            border-left:2px solid #efeeec;
            border-bottom:2px solid #6f6d69;
            border-right:2px solid #6f6d69;
            cursor:pointer;
        `;
        board.appendChild(dragBtn);

        let dragMode = false;
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed; top:0; left:0; width:100vw; height:100vh; z-index:9998; pointer-events:none; cursor:crosshair;';
        document.body.appendChild(overlay);

        let player = ig.game.O4269;
        let mouseX = 0, mouseY = 0;

        function getMousePos(e){
            const rect = ig.system.canvas.getBoundingClientRect();
            const scale = ig.system.scale || 1;
            return { x:(e.clientX-rect.left)/scale + ig.game.screen.x, y:(e.clientY-rect.top)/scale + ig.game.screen.y };
        }

        document.addEventListener('mousemove', e => {
            const pos = getMousePos(e);
            mouseX = pos.x;
            mouseY = pos.y;
        });

        function dragLoop(){
            if(dragMode && player){
                const tx = mouseX - player.size.x/2;
                const ty = mouseY - player.size.y/2;
                player.pos.x += (tx - player.pos.x) * 0.2;
                player.pos.y += (ty - player.pos.y) * 0.2;
                player.vel.x = 0;
                player.vel.y = 0;
            }
            requestAnimationFrame(dragLoop);
        }
        dragLoop();

        dragBtn.onclick = () => {
            dragMode = !dragMode;
            dragBtn.dataset.toggled = dragMode ? 'true' : 'false';
            dragBtn.textContent = dragMode ? 'Dragging ON' : 'Enable Drag';
            dragBtn.style.borderTop = dragMode ? '#6f6d69 2px solid' : '#efeeec 2px solid';
            dragBtn.style.borderLeft = dragMode ? '#6f6d69 2px solid' : '#efeeec 2px solid';
            dragBtn.style.borderBottom = dragMode ? '#efeeec 2px solid' : '#6f6d69 2px solid';
            dragBtn.style.borderRight = dragMode ? '#efeeec 2px solid' : '#6f6d69 2px solid';
            dragBtn.style.background = dragMode ? 'rgba(170,167,163,0.85)' : 'rgba(198,195,191,0.85)';
            overlay.style.pointerEvents = dragMode ? 'auto' : 'none';
        };

        dragBtn.onmousedown = e => e.preventDefault();

        // Ctrl+Y listener
        const ctrlYListener = e => {
            if(e.ctrlKey && e.key.toLowerCase() === 'y'){
                e.preventDefault();
                dragBtn.click();
            }
        };
        document.addEventListener('keydown', ctrlYListener);

        // Close button disables Ctrl+Y
        closeBtn.onclick = () => {
            document.removeEventListener('keydown', ctrlYListener);
            overlay.remove();
            board.remove();
        };
    }
})();

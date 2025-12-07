(function() {
    'use strict';

    const wait = setInterval(() => {
        if (typeof ig !== 'undefined' && ig.game) {
            clearInterval(wait);
            initFreecamUI();
        }
    }, 100);

    function initFreecamUI() {
        if (document.getElementById('mod_freecam')) return;

        const board = document.createElement('div');
        board.id = 'mod_freecam';
        board.style.cssText = `
            position:fixed; top:300px; right:20px; width:160px; padding:5px;
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
            window.DragManager.makeDraggable('mod_freecam');
        }

        const titleBar = document.createElement('div');
        titleBar.style.cssText = 'display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;';
        board.appendChild(titleBar);

        const title = document.createElement('div');
        title.textContent = 'Freecam';
        title.style.fontWeight = 'bold';
        titleBar.appendChild(title);

        const closeBtn = document.createElement('div');
        closeBtn.textContent = '✖';
        closeBtn.style.cssText = 'cursor:pointer; font-weight:bold; user-select:none;';
        titleBar.appendChild(closeBtn);

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = 'Enable Freecam';
        toggleBtn.dataset.toggled = 'false';
        toggleBtn.style.cssText = `
            width:100%; padding:2px 0;
            background:rgba(198,195,191,0.85);
            border-top:2px solid #efeeec;
            border-left:2px solid #efeeec;
            border-bottom:2px solid #6f6d69;
            border-right:2px solid #6f6d69;
            cursor:pointer;
            outline:none;
            user-select:none;
            -webkit-tap-highlight-color:transparent;
        `;
        board.appendChild(toggleBtn);

        let followMouse = false;
        const cam = ig.game.camera;
        const origOffset = { x: cam.offset.x, y: cam.offset.y };
        const reachX = 2, reachY = 3;

        function updateButton(isOn){
            toggleBtn.style.borderTop = isOn ? '#6f6d69 2px solid' : '#efeeec 2px solid';
            toggleBtn.style.borderLeft = isOn ? '#6f6d69 2px solid' : '#efeeec 2px solid';
            toggleBtn.style.borderBottom = isOn ? '#efeeec 2px solid' : '#6f6d69 2px solid';
            toggleBtn.style.borderRight = isOn ? '#efeeec 2px solid' : '#6f6d69 2px solid';
            toggleBtn.style.background = isOn ? 'rgba(170,167,163,0.85)' : 'rgba(198,195,191,0.85)';
        }

        toggleBtn.onclick = () => {
            followMouse = !followMouse;
            toggleBtn.dataset.toggled = followMouse ? 'true' : 'false';
            toggleBtn.textContent = followMouse ? 'Freecam ON' : 'Enable Freecam';
            updateButton(followMouse);

            if(followMouse){
                ig.game.viewRange = (ig.game.viewRange||9)*2;
                ig.game.chunkRadius = (ig.game.chunkRadius||5)*2;
            } else {
                cam.offset.x = origOffset.x;
                cam.offset.y = origOffset.y;
                ig.game.viewRange = ig.game.viewRange||9;
                ig.game.chunkRadius = ig.game.chunkRadius||5;
            }
        };

        toggleBtn.onmousedown = e => e.preventDefault();

        const keyListener = e => {
            if(e.ctrlKey && e.code==='KeyE'){
                e.preventDefault();
                toggleBtn.click();
            }
        };
        document.addEventListener('keydown', keyListener);

        const oldUpdate = cam.update.bind(cam);
        cam.update = function(){
            oldUpdate();
            if(followMouse || toggleBtn.dataset.toggled==='true'){
                const mx = ig.input.mouse.x;
                const my = ig.input.mouse.y;
                const cx = ig.system.width/2;
                const cy = ig.system.height/2;
                cam.offset.x = origOffset.x + ((mx-cx)/ig.system.scale) * reachX;
                cam.offset.y = origOffset.y + ((my-cy)/ig.system.scale) * reachY;
            }
        };

        closeBtn.onclick = () => {
            document.removeEventListener('keydown', keyListener);
            cam.update = oldUpdate;
            cam.offset.x = origOffset.x;
            cam.offset.y = origOffset.y;
            board.remove();
        };
    }
})();

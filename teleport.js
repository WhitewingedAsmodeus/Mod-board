(function() {
    'use strict';

    const wait = setInterval(() => {
        if (typeof ig !== 'undefined' && ig.game && ig.game.O4269) {
            clearInterval(wait);
            initTeleportUI();
        }
    }, 100);

    function initTeleportUI() {
        if (document.getElementById('teleportBoard')) return;

        const board = document.createElement('div');
        board.id = 'teleportBoard';
        board.style.cssText = `
            position:fixed; top:20px; right:20px; width:180px; padding:5px;
            background:rgba(191,188,184,0.85);
            border-top:2px solid #efeeec;
            border-left:2px solid #efeeec;
            border-bottom:2px solid #6f6d69;
            border-right:2px solid #6f6d69;
            font-family:sans-serif; font-size:12px; color:#000;
            z-index:9999; cursor:grab; box-sizing:border-box;
        `;
        document.body.appendChild(board);

        if(window.DragManager) {
            window.DragManager.makeDraggable('teleportBoard');
        }

        const titleBar = document.createElement('div');
        titleBar.style.cssText = 'display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;';
        board.appendChild(titleBar);

        const title = document.createElement('div');
        title.textContent = 'TELEPORT';
        title.style.fontWeight = 'bold';
        titleBar.appendChild(title);

        const closeBtn = document.createElement('div');
        closeBtn.textContent = '✖';
        closeBtn.style.cssText = 'cursor:pointer; font-weight:bold; user-select:none;';
        closeBtn.onclick = () => board.remove();
        titleBar.appendChild(closeBtn);

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'x,y,p,a';
        input.style.cssText = `
            width:100%; padding:2px; margin-bottom:3px; font-size:11px;
            box-sizing:border-box; border:1px solid #6f6d69;
        `;
        board.appendChild(input);

        const btn = document.createElement('button');
        btn.textContent = 'Teleport';
        btn.style.cssText = `
            width:100%; padding:2px 0; margin-top:3px;
            background:rgba(198,195,191,0.85);
            border-top:2px solid #efeeec;
            border-left:2px solid #efeeec;
            border-bottom:2px solid #6f6d69;
            border-right:2px solid #6f6d69;
            cursor:pointer;
        `;
        board.appendChild(btn);

        const resetCalibBtn = document.createElement('button');
        resetCalibBtn.textContent = 'Set 0,0 Here';
        resetCalibBtn.style.cssText = `
            width:100%; padding:2px 0; margin-top:3px;
            background:rgba(198,195,191,0.85);
            border-top:2px solid #efeeec;
            border-left:2px solid #efeeec;
            border-bottom:2px solid #6f6d69;
            border-right:2px solid #6f6d69;
            cursor:pointer;
        `;
        board.appendChild(resetCalibBtn);

        const currentWorld = window.location.pathname;

        let calibrationData = {};
        try {
            const stored = localStorage.getItem('teleportCalibration');
            if (stored) {
                calibrationData = JSON.parse(stored);
            }
        } catch (e) {
            console.error("Failed to load teleport calibration ", e);
        }

        const getReferencePoint = () => {
            return calibrationData[currentWorld] || { refPixelX: 0, refPixelY: 0 };
        };

        const setReferencePoint = () => {
            const player = ig.game.O4269;
            if (!player) {
                console.error('Player object not found to set reference point.');
                return;
            }

            const currentPlayerPixelX = player.pos.x;
            const currentPlayerPixelY = player.pos.y;

            calibrationData[currentWorld] = { refPixelX: currentPlayerPixelX, refPixelY: currentPlayerPixelY };
            try {
                localStorage.setItem('teleportCalibration', JSON.stringify(calibrationData));
                console.log(`Reference point (0,0) set for ${currentWorld} at player's current pixel position (${currentPlayerPixelX}, ${currentPlayerPixelY})`);
            } catch (e) {
                console.error("Failed to save teleport reference point ", e);
            }
        };

        btn.onclick = teleport;
        resetCalibBtn.onclick = setReferencePoint;
        input.addEventListener('keydown', e => { if(e.key === 'Enter') teleport(); });

        function teleport() {
            const val = input.value.trim();
            if(!val) return;
            const parts = val.split(',').map(s => s.trim());
            const bx = parseFloat(parts[0]);
            const by = parseFloat(parts[1]);

            if(isNaN(bx) || isNaN(by)) {
                console.error('Invalid coordinates! Please enter numbers for x and y.');
                return;
            }

            const { refPixelX, refPixelY } = getReferencePoint();
            const px = (bx * 19) + refPixelX;
            const py = (by * 19) + refPixelY;

            ig.game.O4269.pos.x = px;
            ig.game.O4269.pos.y = py;

            console.log(`Teleported to block (${bx}, ${by}) in ${currentWorld} → pixels (${px}, ${py}) using reference point (${refPixelX}, ${refPixelY})`);
        }
    }
})();

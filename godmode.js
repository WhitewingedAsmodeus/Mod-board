(function() {
    'use strict';

    const wait = setInterval(() => {
        if (typeof ig !== 'undefined' && ig.game && ig.game.O4269) {
            clearInterval(wait);
            initGodmode();
        }
    }, 100);

    function initGodmode() {
        if (document.getElementById('mod_godmode')) return;

        const board = document.createElement('div');
        board.id = 'mod_godmode';
        board.style.cssText = `
            position:fixed; top:60px; right:20px; width:150px; padding:5px;
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
            window.DragManager.makeDraggable('mod_godmode');
        }

        // Title + close button
        const titleBar = document.createElement('div');
        titleBar.style.cssText = 'display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;';
        board.appendChild(titleBar);

        const title = document.createElement('div');
        title.textContent = 'Godmode';
        title.style.fontWeight = 'bold';
        titleBar.appendChild(title);

        const closeBtn = document.createElement('div');
        closeBtn.textContent = '✖';
        closeBtn.style.cssText = 'cursor:pointer; font-weight:bold; user-select:none;';
        closeBtn.onclick = () => board.remove();
        titleBar.appendChild(closeBtn);

        // Toggle button
        const godBtn = document.createElement('button');
        godBtn.textContent = 'Enable Godmode';
        godBtn.dataset.toggled = 'false';
        godBtn.style.cssText = `
            width:100%; padding:2px 0;
            background:rgba(198,195,191,0.85);
            border-top:2px solid #efeeec;
            border-left:2px solid #efeeec;
            border-bottom:2px solid #6f6d69;
            border-right:2px solid #6f6d69;
            cursor:pointer;
        `;
        board.appendChild(godBtn);

        let godEnabled = false;
        const player = ig.game.O4269;
        const originalKill = player.kill.bind(player);

        function updateKill() {
            if (!player) return;
            player.kill = godEnabled ? () => {} : originalKill;
        }

        godBtn.onclick = () => {
            godEnabled = !godEnabled;
            godBtn.dataset.toggled = godEnabled ? 'true' : 'false';
            godBtn.textContent = godEnabled ? 'Godmode ON' : 'Enable Godmode';
            godBtn.style.borderTop = godEnabled ? '#6f6d69 2px solid' : '#efeeec 2px solid';
            godBtn.style.borderLeft = godEnabled ? '#6f6d69 2px solid' : '#efeeec 2px solid';
            godBtn.style.borderBottom = godEnabled ? '#efeeec 2px solid' : '#6f6d69 2px solid';
            godBtn.style.borderRight = godEnabled ? '#efeeec 2px solid' : '#6f6d69 2px solid';
            godBtn.style.background = godEnabled ? 'rgba(170,167,163,0.85)' : 'rgba(198,195,191,0.85)';
            updateKill();
        };

        godBtn.onmousedown = e => e.preventDefault();
    }
})();

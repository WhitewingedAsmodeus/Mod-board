(function() {
    'use strict';

    const wait = setInterval(() => {
        if (typeof ig !== 'undefined' && ig.game) {
            clearInterval(wait);
            initMod();
        }
    }, 100);

    function initMod() {
        if (document.getElementById('mod_rocket')) return;

        const board = document.createElement('div');
        board.id = 'mod_rocket';
        board.style.cssText = `
            position:fixed; top:20px; right:20px; width:150px; padding:5px;
            background:rgba(191,188,184,0.85);
            border-top:2px solid #efeeec;
            border-left:2px solid #efeeec;
            border-bottom:2px solid #6f6d69;
            border-right:2px solid #6f6d69;
            font-family:sans-serif; font-size:12px; color:#000;
            z-index:9999; cursor:grab; box-sizing:border-box;
        `;
        document.body.appendChild(board);

        // Draggable
        let dragging=false, ox, oy;
        board.onmousedown = e => { dragging=true; ox=e.clientX-board.offsetLeft; oy=e.clientY-board.offsetTop; board.style.cursor='grabbing'; };
        document.onmouseup = () => { dragging=false; board.style.cursor='grab'; };
        document.onmousemove = e => { if(dragging){ board.style.left=e.clientX-ox+'px'; board.style.top=e.clientY-oy+'px'; } };

        // Title + close
        const titleBar = document.createElement('div');
        titleBar.style.cssText = 'display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;';
        board.appendChild(titleBar);

        const title = document.createElement('div');
        title.textContent = 'Rocket';
        title.style.fontWeight = 'bold';
        titleBar.appendChild(title);

        const closeBtn = document.createElement('div');
        closeBtn.textContent = '✖';
        closeBtn.style.cssText = 'cursor:pointer; font-weight:bold; user-select:none;';
        closeBtn.onclick = () => board.remove();
        titleBar.appendChild(closeBtn);

        // Rocket button
        const rocketBtn = document.createElement('button');
        rocketBtn.textContent = 'Launch';
        rocketBtn.style.cssText = `
            width:100%; padding:2px 0;
            background:rgba(198,195,191,0.85);
            border-top:2px solid #efeeec;
            border-left:2px solid #efeeec;
            border-bottom:2px solid #6f6d69;
            border-right:2px solid #6f6d69;
            cursor:pointer;
        `;
        board.appendChild(rocketBtn);

        rocketBtn.onclick = () => {
            const player = ig.game.O4269;
            if (player && typeof player.vel !== 'undefined') player.vel.y = -1100;
        };
    }
})();

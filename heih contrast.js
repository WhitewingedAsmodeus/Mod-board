//heih contrast being an inside joke. so stfu
(function() {
    'use strict';

    const wait = setInterval(() => {
        if (typeof ig !== 'undefined' && ig.game && ig.game.O4269) {
            clearInterval(wait);
            initHighContrastUI();
        }
    }, 100);

    function initHighContrastUI() {
        if (document.getElementById('mod_highcontrast')) return;

        const board = document.createElement('div');
        board.id = 'mod_highcontrast';
        board.style.cssText = `
            position:fixed; top:220px; right:20px; width:160px; padding:5px;
            background:rgba(191,188,184,0.85);
            border-top:2px solid #efeeec;
            border-left:2px solid #efeeec;
            border-bottom:2px solid #6f6d69;
            border-right:2px solid #6f6d69;
            font-family:sans-serif; font-size:12px; color:#000;
            z-index:9999; cursor:grab; box-sizing:border-box;
        `;
        document.body.appendChild(board);

        let dragging=false, ox, oy;
        board.onmousedown = e => { dragging=true; ox=e.clientX-board.offsetLeft; oy=e.clientY-board.offsetTop; board.style.cursor='grabbing'; };
        document.onmouseup = () => { dragging=false; board.style.cursor='grab'; };
        document.onmousemove = e => { if(dragging){ board.style.left=e.clientX-ox+'px'; board.style.top=e.clientY-oy+'px'; } };

        const titleBar = document.createElement('div');
        titleBar.style.cssText = 'display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;';
        board.appendChild(titleBar);

        const title = document.createElement('div');
        title.textContent = 'High Contrast';
        title.style.fontWeight = 'bold';
        titleBar.appendChild(title);

        const closeBtn = document.createElement('div');
        closeBtn.textContent = '✖';
        closeBtn.style.cssText = 'cursor:pointer; font-weight:bold; user-select:none;';
        titleBar.appendChild(closeBtn);

        const contrastBtn = document.createElement('button');
        contrastBtn.textContent = 'Toggle Contrast';
        contrastBtn.dataset.toggled = 'false';
        contrastBtn.style.cssText = `
            width:100%; padding:2px 0;
            background:rgba(198,195,191,0.85);
            border-top:2px solid #efeeec;
            border-left:2px solid #efeeec;
            border-bottom:2px solid #6f6d69;
            border-right:2px solid #6f6d69;
            cursor:pointer;
            user-select:none;
            outline:none;
            -webkit-tap-highlight-color:transparent;
        `;
        board.appendChild(contrastBtn);

        let contrastOn = false;

        function updateButton(on) {
            contrastBtn.style.borderTop = on ? '#6f6d69 2px solid' : '#efeeec 2px solid';
            contrastBtn.style.borderLeft = on ? '#6f6d69 2px solid' : '#efeeec 2px solid';
            contrastBtn.style.borderBottom = on ? '#efeeec 2px solid' : '#6f6d69 2px solid';
            contrastBtn.style.borderRight = on ? '#efeeec 2px solid' : '#6f6d69 2px solid';
            contrastBtn.style.background = on ? 'rgba(170,167,163,0.85)' : 'rgba(198,195,191,0.85)';
        }

        function applyContrast(on) {
            const filter = on ? 'contrast(300%) brightness(110%)' : 'contrast(100%) brightness(100%)';
            const canvas = document.querySelector('canvas');
            if(canvas) canvas.style.filter = filter;
            board.style.filter = filter;
        }

        contrastBtn.onclick = () => {
            contrastOn = !contrastOn;
            updateButton(contrastOn);
            applyContrast(contrastOn);
        };
        contrastBtn.onmousedown = e => e.preventDefault();

        closeBtn.onclick = () => {
            applyContrast(false);
            board.remove();
        };
    }
})();

(function() {
    'use strict';

    const wait = setInterval(() => {
        if (typeof ig !== 'undefined' && ig.game && ig.game.O4269) {
            clearInterval(wait);
            initEditorToggleUI();
        }
    }, 100);

    function initEditorToggleUI() {
        if (document.getElementById('editorToggleBoard')) return;

        const board = document.createElement('div');
        board.id = 'editorToggleBoard';
        board.style.cssText = `
            position:fixed; top:20px; right:220px; width:180px; padding:5px;
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
            window.DragManager.makeDraggable('editorToggleBoard');
        }

        const titleBar = document.createElement('div');
        titleBar.style.cssText = 'display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;';
        board.appendChild(titleBar);

        const title = document.createElement('div');
        title.textContent = 'EDITOR MODE';
        title.style.fontWeight = 'bold';
        titleBar.appendChild(title);

        const closeBtn = document.createElement('div');
        closeBtn.textContent = '✖';
        closeBtn.style.cssText = 'cursor:pointer; font-weight:bold; user-select:none;';
        closeBtn.onclick = () => board.remove();
        titleBar.appendChild(closeBtn);

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = 'Enable Editor';
        toggleBtn.dataset.toggled = 'false';
        toggleBtn.style.cssText = `
            width:100%; padding:2px 0; margin-top:3px;
            background:rgba(198,195,191,0.85);
            border-top:2px solid #efeeec;
            border-left:2px solid #efeeec;
            border-bottom:2px solid #6f6d69;
            border-right:2px solid #6f6d69;
            cursor:pointer;
        `;
        board.appendChild(toggleBtn);

        let editorEnabled = false;

        function updateButton(isOn) {
            toggleBtn.style.borderTop = isOn ? '#6f6d69 2px solid' : '#efeeec 2px solid';
            toggleBtn.style.borderLeft = isOn ? '#6f6d69 2px solid' : '#efeeec 2px solid';
            toggleBtn.style.borderBottom = isOn ? '#efeeec 2px solid' : '#6f6d69 2px solid';
            toggleBtn.style.borderRight = isOn ? '#efeeec 2px solid' : '#6f6d69 2px solid';
            toggleBtn.style.background = isOn ? 'rgba(170,167,163,0.85)' : 'rgba(198,195,191,0.85)';
            toggleBtn.textContent = isOn ? 'Editor ON' : 'Enable Editor';
        }

        toggleBtn.onclick = () => {
            editorEnabled = !editorEnabled;
            toggleBtn.dataset.toggled = editorEnabled ? 'true' : 'false';
            updateButton(editorEnabled);
            ig.game.isEditorHere = editorEnabled;
            console.log(`Editor Mode ${editorEnabled ? 'Enabled' : 'Disabled'}. ig.game.isEditorHere = ${ig.game.isEditorHere}`);
        };

        toggleBtn.onmousedown = e => e.preventDefault();
    }
})();

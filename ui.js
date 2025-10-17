(function() {
    'use strict';

    // Styles for the board
    const style = document.createElement('style');
    style.innerHTML = `
        #mod_board, #mod_board button { font-family:sans-serif; user-select:none; image-rendering:pixelated; }
        #mod_board button:focus { outline:none; }
    `;
    document.head.appendChild(style);

    const wait = setInterval(() => {
        if (typeof ig !== 'undefined' && ig.game && ig.game.O4269) {
            clearInterval(wait);
            initBoard();
        }
    }, 100);

    function initBoard() {
        const board = document.createElement('div');
        board.id = 'mod_board';
        board.style.cssText = `
            position:fixed; top:20px; right:20px; width:160px; padding:5px;
            background:rgba(191,188,184,0.85);
            border-top:2px solid #efeeec;
            border-left:2px solid #efeeec;
            border-bottom:2px solid #6f6d69;
            border-right:2px solid #6f6d69;
            font-size:12px; color:#000;
            z-index:9999; cursor:grab;
            box-sizing:border-box;
        `;
        document.body.appendChild(board);

        const contentDiv = document.createElement('div');
        contentDiv.style.marginTop = '10px';
        board.appendChild(contentDiv);

        // Dragging
        let dragging = false, ox, oy;
        board.onmousedown = e => { dragging = true; ox = e.clientX - board.offsetLeft; oy = e.clientY - board.offsetTop; board.style.cursor='grabbing'; };
        document.onmouseup = () => { dragging = false; board.style.cursor='grab'; };
        document.onmousemove = e => { if(dragging){ board.style.left = e.clientX - ox + 'px'; board.style.top = e.clientY - oy + 'px'; } };

        // Create button helper
        function createButton(text, isToggle = false) {
            const btn = document.createElement('button');
            btn.textContent = text;
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

            btn.addEventListener('click', () => {
                if (!isToggle) {
                    // Animate click
                    btn.style.borderTop='2px solid #6f6d69';
                    btn.style.borderLeft='2px solid #6f6d69';
                    btn.style.borderBottom='2px solid #efeeec';
                    btn.style.borderRight='2px solid #efeeec';
                    btn.style.background='rgba(170,167,163,0.85)';
                    setTimeout(() => {
                        btn.style.borderTop='#efeeec 2px solid';
                        btn.style.borderLeft='#efeeec 2px solid';
                        btn.style.borderBottom='#6f6d69 2px solid';
                        btn.style.borderRight='#6f6d69 2px solid';
                        btn.style.background='rgba(198,195,191,0.85)';
                    }, 200);
                } else {
                    const toggled = btn.dataset.toggled === 'true';
                    btn.dataset.toggled = toggled ? 'false' : 'true';
                    btn.style.borderTop = toggled ? '#efeeec 2px solid' : '#6f6d69 2px solid';
                    btn.style.borderLeft = toggled ? '#efeeec 2px solid' : '#6f6d69 2px solid';
                    btn.style.borderBottom = toggled ? '#6f6d69 2px solid' : '#efeeec 2px solid';
                    btn.style.borderRight = toggled ? '#6f6d69 2px solid' : '#efeeec 2px solid';
                    btn.style.background = toggled ? 'rgba(198,195,191,0.85)' : 'rgba(170,167,163,0.85)';
                }
            });

            contentDiv.appendChild(btn);
            return btn;
        }

        // Expose globally
        window.ModBoard = { createButton, board, contentDiv };
    }

})();

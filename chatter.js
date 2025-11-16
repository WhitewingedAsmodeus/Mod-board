(function() {
    'use strict';

    const wait = setInterval(() => {
        if (typeof ig !== 'undefined' && ig.game) {
            clearInterval(wait);
            initChatterUI();
        }
    }, 100);

    function initChatterUI() {
        if (document.getElementById('mod_chatter')) return;

        const board = document.createElement('div');
        board.id = 'mod_chatter';
        board.style.cssText = `
            position:fixed; top:200px; right:20px; width:160px; padding:5px;
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
        title.textContent = 'Chatter';
        title.style.fontWeight = 'bold';
        titleBar.appendChild(title);

        const closeBtn = document.createElement('div');
        closeBtn.textContent = '✖';
        closeBtn.style.cssText = 'cursor:pointer; font-weight:bold; user-select:none;';
        titleBar.appendChild(closeBtn);

        let chatterEnabled = false;
        let contentDiv = null;

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = 'Enable Chatter';
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

        toggleBtn.onclick = () => {
            chatterEnabled = !chatterEnabled;
            toggleBtn.dataset.toggled = chatterEnabled ? 'true' : 'false';
            toggleBtn.textContent = chatterEnabled ? 'Chatter ON' : 'Enable Chatter';
            toggleBtn.style.borderTop = chatterEnabled ? '#6f6d69 2px solid' : '#efeeec 2px solid';
            toggleBtn.style.borderLeft = chatterEnabled ? '#6f6d69 2px solid' : '#efeeec 2px solid';
            toggleBtn.style.borderBottom = chatterEnabled ? '#efeeec 2px solid' : '#6f6d69 2px solid';
            toggleBtn.style.borderRight = chatterEnabled ? '#efeeec 2px solid' : '#6f6d69 2px solid';
            toggleBtn.style.background = chatterEnabled ? 'rgba(170,167,163,0.85)' : 'rgba(198,195,191,0.85)';

            if(chatterEnabled && !contentDiv){
                contentDiv = document.createElement('div');
                contentDiv.style.marginTop = '5px';
                board.appendChild(contentDiv);

                const textInput = document.createElement('input');
                textInput.type = 'text';
                textInput.placeholder = 'Enter text...';
                textInput.style.cssText = 'width:100%; margin-bottom:3px; font-size:11px; box-sizing:border-box;';
                contentDiv.appendChild(textInput);

                const speedLabel = document.createElement('label');
                speedLabel.textContent = 'Speed';
                speedLabel.style.cssText = 'font-size:11px;';
                contentDiv.appendChild(speedLabel);

                const speedSlider = document.createElement('input');
                speedSlider.type = 'range';
                speedSlider.min = 20;
                speedSlider.max = 100;
                speedSlider.value = 50;
                speedSlider.style.cssText = 'width:100%; margin-bottom:3px;';
                contentDiv.appendChild(speedSlider);

                const runBtn = document.createElement('button');
                runBtn.textContent = 'Run';
                runBtn.style.cssText = `
                    width:100%; padding:2px 0;
                    background:rgba(198,195,191,0.85);
                    border-top:2px solid #efeeec;
                    border-left:2px solid #efeeec;
                    border-bottom:2px solid #6f6d69;
                    border-right:2px solid #6f6d69;
                    cursor:pointer;
                `;
                contentDiv.appendChild(runBtn);

                runBtn.onclick = () => {
                    const text = textInput.value;
                    const delay = 120 - parseInt(speedSlider.value);
                    if(!text) return;
                    let i=0;
                    const typeLoop = setInterval(() => {
                        if(i>=text.length) return clearInterval(typeLoop);
                        ig.game.O884.say('_s'+text.charAt(i));
                        i++;
                    }, delay);
                };
            }

            if(contentDiv) contentDiv.style.display = chatterEnabled ? 'block' : 'none';
        };

        toggleBtn.onmousedown = e => e.preventDefault();

        const ctrlYListener = e => {
            if(e.ctrlKey && e.key.toLowerCase() === 'y'){
                e.preventDefault();
                toggleBtn.click();
            }
        };

        document.addEventListener('keydown', ctrlYListener);

        closeBtn.onclick = () => {
            document.removeEventListener('keydown', ctrlYListener);
            if(contentDiv) contentDiv.remove();
            board.remove();
        };
    }
})();

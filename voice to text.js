(function() {
    'use strict';

    const wait = setInterval(() => {
        if (typeof ig !== 'undefined' && ig.game && ig.game.O884) {
            clearInterval(wait);
            initVoiceToTextUI();
        }
    }, 100);

    function initVoiceToTextUI() {
        if (document.getElementById('voiceToTextBoard')) return;

        const board = document.createElement('div');
        board.id = 'voiceToTextBoard';
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
            window.DragManager.makeDraggable('voiceToTextBoard');
        }

        const titleBar = document.createElement('div');
        titleBar.style.cssText = 'display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;';
        board.appendChild(titleBar);

        const title = document.createElement('div');
        title.textContent = 'VOICE TO TEXT';
        title.style.fontWeight = 'bold';
        titleBar.appendChild(title);

        const closeBtn = document.createElement('div');
        closeBtn.textContent = '✖';
        closeBtn.style.cssText = 'cursor:pointer; font-weight:bold; user-select:none;';
        closeBtn.onclick = () => board.remove();
        titleBar.appendChild(closeBtn);

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = 'Enable Voice';
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

        let recognitionActive = false;
        let recognition = null;
        const textBuffer = [];

        function updateButton(isOn) {
            toggleBtn.style.borderTop = isOn ? '#6f6d69 2px solid' : '#efeeec 2px solid';
            toggleBtn.style.borderLeft = isOn ? '#6f6d69 2px solid' : '#efeeec 2px solid';
            toggleBtn.style.borderBottom = isOn ? '#efeeec 2px solid' : '#6f6d69 2px solid';
            toggleBtn.style.borderRight = isOn ? '#efeeec 2px solid' : '#6f6d69 2px solid';
            toggleBtn.style.background = isOn ? 'rgba(170,167,163,0.85)' : 'rgba(198,195,191,0.85)';
            toggleBtn.textContent = isOn ? 'Voice ON' : 'Enable Voice';
        }

        async function timeout(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function slowTypeText(text, delay = 50) {
            if (!text) return;
            for (let i = 0; i < text.length; i++) {
                const char = text.charAt(i);
                if (char) {
                    ig.game.O884.say("_s" + char);
                }
                if ((i + 1) % 20 === 0 && (char === " " || char === "~")) {
                    ig.game.O884.say("_nl");
                }
                await timeout(delay);
            }
            ig.game.O884.say("_nl");
        }

        function startRecognition() {
            if (!('webkitSpeechRecognition' in window)) {
                console.error("Web Speech API not supported in this browser.");
                return;
            }

            recognition = new webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = false;

            recognition.onresult = function(event) {
                const lastResult = event.results[event.results.length - 1];
                const transcript = lastResult?.[0]?.transcript?.trim();
                if (transcript) {
                    textBuffer.push(transcript);
                }
            };

            recognition.onerror = function() {};
            recognition.onend = function() { 
                if (recognitionActive) {
                    recognition.start(); 
                }
            };
            
            recognition.start();
        }

        function stopRecognition() {
            if (recognition) {
                recognition.stop();
                recognition = null;
            }
        }

        setInterval(() => {
            if (textBuffer.length > 0 && recognitionActive) {
                const phrase = textBuffer.shift();
                if (phrase) slowTypeText(phrase);
            }
        }, 100);

        toggleBtn.onclick = () => {
            recognitionActive = !recognitionActive;
            toggleBtn.dataset.toggled = recognitionActive ? 'true' : 'false';
            updateButton(recognitionActive);

            if (recognitionActive) {
                startRecognition();
            } else {
                stopRecognition();
            }
        };

        toggleBtn.onmousedown = e => e.preventDefault();
    }
})();

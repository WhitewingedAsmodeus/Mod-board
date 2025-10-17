(function(){
    const board = document.getElementById('mod_board');
    if(!board) return;

    const btn = document.createElement('button');
    btn.textContent = 'High Contrast';
    btn.dataset.toggled = localStorage.getItem('contrastsettings') === 'true' ? 'true' : 'false';
    btn.style.cssText = `
        width:100%; padding:2px 0; margin-top:3px;
        background:rgba(198,195,191,0.85);
        border-top:2px solid #efeeec;
        border-left:2px solid #efeeec;
        border-bottom:2px solid #6f6d69;
        border-right:2px solid #6f6d69;
        cursor:pointer;
    `;

    function applyContrast(on){
        const filter = on ? 'contrast(300%) brightness(110%)' : 'contrast(100%) brightness(100%)';
        const canvas = document.querySelector('canvas');
        if(canvas) canvas.style.filter = filter;
        board.style.filter = filter;
    }

    let highContrast = btn.dataset.toggled === 'true';
    applyContrast(highContrast);

    btn.onclick = () => {
        highContrast = !highContrast;
        btn.dataset.toggled = highContrast ? 'true' : 'false';
        localStorage.setItem('contrastsettings', highContrast);
        applyContrast(highContrast);
    };

    board.appendChild(btn);
})();

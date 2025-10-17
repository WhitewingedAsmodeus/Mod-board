(function() {
    const btn = createButton("Rocket"); // comes from ui.js
    btn.onclick = () => {
        const player = ig.game.O4269;
        if (player && typeof player.vel !== 'undefined') player.vel.y = -1100;
    };
})();

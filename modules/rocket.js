const rocketBtn = ModBoard.createButton("Rocket");

rocketBtn.onclick = () => {
    const player = ig.game.O4269;
    if (player && typeof player.vel !== 'undefined') player.vel.y = -1100;
};

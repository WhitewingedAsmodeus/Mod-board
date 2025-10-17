// ==UserScript==
// @name         Saltfree Mod Board
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Main loader for Saltfree Mod Board
// @match        https://saltfree.antisa.lt/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

   
    const uiScript = document.createElement('script');
    uiScript.src = 'https://whitewingedasmodeus.github.io/Mod-board/ui.js';
    uiScript.onload = () => {
        console.log('[Mod Board] UI loaded, loading modules...');

        const modules = ['rocket.js','drag.js','godmode.js','chatter.js','freecam.js','selfdestruct.js','info.js','contrast.js'];
        modules.forEach(name => {
            const mod = document.createElement('script');
            mod.src = `https://whitewingedasmodeus.github.io/Mod-board/modules/${name}`;
            mod.onload = () => console.log(`[Mod Board] ${name} loaded`);
            mod.onerror = () => console.error(`[Mod Board] ${name} failed`);
            document.head.appendChild(mod);
        });
    };
    uiScript.onerror = () => console.error('[Mod Board] UI failed to load');

    document.head.appendChild(uiScript);
})();

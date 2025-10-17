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

    console.log('%c[Mod Board] loader up and at em...', 'color: green');

    // Load UI first
    const uiScript = document.createElement('script');
    uiScript.src = 'https://whitewingedasmodeus.github.io/Mod-board/ui.js';
    uiScript.onload = () => {
        console.log('%c[Mod Board] UI loaded, modules coming...', 'color: green');

        // Load modules in order
        const modules = ['rocket.js', 'drag.js', 'godmode.js']; // add more here
        modules.forEach(name => {
            const mod = document.createElement('script');
            mod.src = `https://whitewingedasmodeus.github.io/Mod-board/modules/${name}`;
            mod.onload = () => console.log(`[Mod Board] ${name} loaded`);
            mod.onerror = () => console.error(`[Mod Board] ${name} failed to load`);
            document.head.appendChild(mod);
        });
    };
    uiScript.onerror = () => console.error('%c[Mod Board] UI failed to load', 'color: red');
    document.head.appendChild(uiScript);
})();

    uiScript.onerror = () => console.error('%c[Mod Board] UI failed to load', 'color: red');

    document.head.appendChild(uiScript);
})();

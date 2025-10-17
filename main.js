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

    console.log('%c[Mod Board] mod loader is up and at em...', 'color: green');

    // Load ui.js first
    const uiScript = document.createElement('script');
    uiScript.src = 'https://whitewingedasmodeus.github.io/Mod-board/ui.js';
    uiScript.onload = () => {
        console.log('%c[Mod Board] UI loaded, now loading modules...', 'color: green');

        // Load modules after UI is ready
        const modules = ['rocket', 'drag', 'godmode']; // Add more module names here
        modules.forEach(name => {
            const modScript = document.createElement('script');
            modScript.src = `https://whitewingedasmodeus.github.io/Mod-board/modules/${name}.js`;
            document.head.appendChild(modScript);
        });
    };
    uiScript.onerror = () => console.error('%c[Mod Board] UI failed to load', 'color: red');

    document.head.appendChild(uiScript);
})();

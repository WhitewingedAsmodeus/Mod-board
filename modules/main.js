// ==UserScript==
// @name         Saltfree Mod Board
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Main loader for Saltfree Mod Board
// @match        https://saltfree.antisa.lt/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict'

    console.log('%c[Mod Board] mod loader is up and at em...', 'color: green');

    // Dynamically load your ui.js
    const uiScript = document.createElement('script');
    uiScript.src = 'https://whitewingedasmodeus.github.io/Mod-board/ui.js';
    uiScript.onload = () => console.log('%c[Mod Board] woken up!', 'color: green');
    uiScript.onerror = () => console.error('%c[Mod Board] slept in... smh', 'color: red');

    document.head.appendChild(uiScript);
})();

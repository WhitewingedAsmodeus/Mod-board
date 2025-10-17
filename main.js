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

  console.log('%c[Saltfree Mod Board] Loaded base loader', 'color: lime')

  // Load your existing UI script
  const uiScript = document.createElement('script')
  uiScript.src = 'https://your-github-username.github.io/saltfree-mod-board/ui.js'
  document.head.appendChild(uiScript)
})()

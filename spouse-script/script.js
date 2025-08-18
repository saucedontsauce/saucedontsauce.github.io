// ==UserScript==
// @name         Spouse Display
// @namespace    http://tampermonkey.net/
// @version      16-08-2025
// @description  Script for sharing spouse display for saving purposes
// @author       D00dleD
// @match        https://www.torn.com/index.php
// @match        https://www.torn.com/page.php?sid=travel
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant    GM.getValue
// @grant    GM.setValue
// @grant    GM.deleteValue
// @require https://saucedontsauce.github.io/spouse-script/bin/Data.module.js?ts=<?= Date.now() ?>
// @require https://saucedontsauce.github.io/spouse-script/bin/CheckData.module.js?ts=<?= Date.now() ?>
// @require https://saucedontsauce.github.io/spouse-script/bin/BuildingBlocks.module.js?ts=<?= Date.now() ?>
// @require https://saucedontsauce.github.io/spouse-script/bin/SignInForm.module.js?ts=<?= Date.now() ?>
// @require https://saucedontsauce.github.io/spouse-script/bin/SpouseDisplay.module.js?ts=<?= Date.now() ?>
// ==/UserScript==


(async function () {
    'use strict';
    const log = console.log;
    const logStyle = 'background-color: darkblue; color: white; font-style: italic; border: 5px solid hotpink; font-size: 2em;';
    const $get = (selector) => document.querySelector(selector);
    const $create = (tag) => document.createElement(tag);
    function setStyles(el, styles) { Object.assign(el.style, styles); };


    function filterRow() { const fr = $create("div"); setStyles(fr, { display: "flex", padding: ".5rem 0", flexWrap: "wrap", flexDirection: "row", gap: ".5rem", rowGap: ".5rem", justifyContent: "space-evenly" }); return fr; };
    function hr() { const hr0 = $create("hr"); hr0.id = "hr0"; hr0.style.borderTopLeftRadius = "5px !important"; hr0.style.borderBottomLeftRadius = "5px !important"; hr0.className = "page-head-delimiter border-round m-top10 m-bottom10"; return hr0; };

    class SpouseScript {


        #render(target, fnOrEl) { log("%cRendering box", logStyle); let targetDiv = $get(target); if (!targetDiv) return; log("%cTARGET FOUND", logStyle); const jubwr = $create("div"); jubwr.className = "api-form-wrapper"; const outerWrap = $create("div"); outerWrap.className = "flex border-round info-msg"; outerWrap.style.alignItems = "center"; const innerWrap = $create("div"); innerWrap.className = "delimiter border-round"; innerWrap.style.borderRadius = "5px"; let item; if (typeof fnOrEl === "function") { item = fnOrEl(); } else { item = fnOrEl; }; if (!(item instanceof HTMLElement)) { console.warn("renderBox expected a DOM node but got:", item); return; }; const hrr = hr(); innerWrap.appendChild(item); outerWrap.appendChild(innerWrap); jubwr.appendChild(outerWrap); jubwr.appendChild(hrr); targetDiv.prepend(jubwr); };

        #log() {
            log("%cKey: %o", logStyle, data.key);
            log("%cData: %o", logStyle, data.system);
            log("%cUser: %o", logStyle, data.user);
            log("%cSpouse: %o", logStyle, data.spouse);
            log("%cMerged: %o", logStyle, data.mergedDisplay);
            log("%cFilters: %o", logStyle, data.filters);
            log("%cFiltered: %o", logStyle, data.filteredItems);
        }

        static async init() {
            log("%cspouse-script - made by d00dleD", logStyle);

            const a = new SpouseScript();

           /**/ a.#log();
            const indicator = $get("h4").textContent.trim()
            switch (indicator) {
                case "Mexico":
                case "Canada":
                case "Cayman Islands":
                case "Hawaii":
                case "United Kingdom":
                case "Argentina":
                case "Switzerland":
                case "Japan":
                case "China":
                case "UAE":
                case "South Africa":
                case "Traveling":
                case "Travel Agency": {
                    log("%c%s", logStyle, indicator);
                    if (data.key) {
                        log("%cNO KEY PRESENT", logStyle);
                        a.#render("div.content-wrapper", createSpouseDisplay);
                    } else {
                        a.#render("div.content-wrapper", createSignInForm);
                    }
                    break;
                }
                default: {
                    log("%cSCREEN DETECTOR  - Shit the bed", logStyle);
                    break;
                }
            }

        }
    };
    SpouseScript.init()
})();

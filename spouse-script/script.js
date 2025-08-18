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
// @require https://saucedontsauce.github.io/spouse-script/bin/Overides.module.js?ts=<?= Date.now() ?>
// @require https://saucedontsauce.github.io/spouse-script/bin/Data.module.js?ts=<?= Date.now() ?>
// @require https://saucedontsauce.github.io/spouse-script/bin/Util.module.js?ts=<?= Date.now() ?>
// @require https://saucedontsauce.github.io/spouse-script/bin/CheckData.module.js?ts=<?= Date.now() ?>
// @require https://saucedontsauce.github.io/spouse-script/bin/BuildingBlocks.module.js?ts=<?= Date.now() ?>
// @require https://saucedontsauce.github.io/spouse-script/bin/SignInForm.module.js?ts=<?= Date.now() ?>
// @require https://saucedontsauce.github.io/spouse-script/bin/SpouseDisplay.module.js?ts=<?= Date.now() ?>
// ==/UserScript==


(async function () {
    'use strict';

    class SpouseScript {


        #render() {

        }

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
                        renderBox("div.content-wrapper", createSpouseDisplay);
                    } else {
                        renderBox("div.content-wrapper", createSignInForm);
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

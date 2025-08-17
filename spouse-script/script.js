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
// @require https://saucedontsauce.github.io/spouse-script/bin/Overides.module.js?ts=<?= Date.now() ?>
// @require https://saucedontsauce.github.io/spouse-script/bin/Util.module.js?ts=<?= Date.now() ?>
// @require https://saucedontsauce.github.io/spouse-script/bin/CheckData.module.js?ts=<?= Date.now() ?>
// @require https://saucedontsauce.github.io/spouse-script/bin/BuildingBlocks.module.js?ts=<?= Date.now() ?>
// @require https://saucedontsauce.github.io/spouse-script/bin/SignInForm.module.js?ts=<?= Date.now() ?>
// @require https://saucedontsauce.github.io/spouse-script/bin/SpouseDisplay.module.js?ts=<?= Date.now() ?>
// ==/UserScript==

// remove ?ts=<?= Date.now() ?> when finished as this removes module caching, slowing load times


(async function () {
    'use strict';
    if (window.SPOUSE_DISPLAY_INJECTED) { // set this at some point
        return;
    }

    /* Remove for production */
    //await GMDelete("TornApiKey");
    await GMDelete("user_data");
    await GMDelete("spouse_data");
    log("%cAll data reset", logStyle)
    /**/

    // Code After Here
    const key = await GMGet("TornApiKey");
    log("%cspouse-script - made by d00dleD", logStyle);
    log("%cLOCALKEY - %s", logStyle, key);


    log("%cSpouse Travel script loaded", logStyle);

    if (key) {
        log(key)
        let user = await GMGet("user_data"); if (user) { user = await JSON.parse(user); } else { const nu = await fetchUserUTIL(key); await GMSet("user_data", JSON.stringify(nu)); user = nu };
        log("%cUSER: %o", logStyle, user);

        let spouse = await GMGet("spouse_data"); if (spouse) { spouse = await JSON.parse(spouse); } else if (user.married) { const ns = await fetchSpouseUTIL(key, user.married.spouse_id); await GMSet("spouse_data", JSON.stringify(ns)); spouse = ns }
        await checkData(key, user, spouse);
        const mergedDisplay = mergeUTIL(user, spouse, data);
        let filteredItems = [];
        let filters = [];

        /* Remove for production */
        log("%cData: %o", logStyle, data); // CHECK STATE
        log("%cUser: %o", logStyle, user); // CHECK STATE
        log("%cSpouse: %o", logStyle, spouse); // CHECK STATE
        log("%cJoined: %o", logStyle, mergedDisplay); // CHECK STATE
        log("%cFilters: %o", logStyle, filters); // CHECK STATE
        log("%cFiltered: %o", logStyle, filteredItems); // CHECK STATE
        /**/

        // check location before rendering display;
        switch ($get("h4").textContent) {
            case "Mexico": {
                log("%cMexico", logStyle);
                renderBox("div.content-wrapper.travelling", createSpouseDisplay);
                break;
            };
            case "Canada": {
                log("%cCanada", logStyle);
                renderBox("div.content-wrapper.travelling", createSpouseDisplay);
                break;
            };
            case "Cayman Islands": {
                log("%cCayman Islands", logStyle);
                renderBox("div.content-wrapper.travelling", createSpouseDisplay);
                break;
            };
            case "Hawaii": {
                log("%cHawaii", logStyle);
                renderBox("div.content-wrapper.travelling", createSpouseDisplay);
                break;
            };
            case "United Kingdom": {
                log("%cUnited Kingdom", logStyle);
                renderBox("div.content-wrapper.travelling", createSpouseDisplay);
                break;
            };
            case "Argentina": {
                log("%cSArgentina", logStyle);
                renderBox("div.content-wrapper.travelling", createSpouseDisplay);
                break;
            };
            case "Switzerland": {
                log("%cSwitzerland", logStyle);
                renderBox("div.content-wrapper.travelling", createSpouseDisplay);
                break;
            };
            case "Japan": {
                log("%cJapan", logStyle);
                renderBox("div.content-wrapper.travelling", createSpouseDisplay);
                break;
            };
            case "China": {
                log("%cChina", logStyle);
                renderBox("div.content-wrapper.travelling", createSpouseDisplay);
                break;
            };
            case "UAE": {
                log("%cUAE", logStyle);
                renderBox("div.content-wrapper.travelling", createSpouseDisplay);
                break;
            };
            case "South Africa": {
                log("%cSouth Africa", logStyle);
                renderBox("div.content-wrapper.travelling", createSpouseDisplay);
                break;
            };
            case "Traveling": {
                log("%cFlying", logStyle);
                renderBox("div.content-wrapper.travelling", createSpouseDisplay)
                break;
            }
            case "Travel Agency": {
                log("%cTravel Agency", logStyle);
                renderBox("#div.wrapper", createSpouseDisplay)
                break;
            }
            default: {
                log("%cSCREEN DETECTOR KEY - Shit the bed", logStyle);
                break;
            }
        }
    } else {
        log("%cNO KEY PRESENT", logStyle);
        // check location before rendering api key input form
        switch ($get("h4").textContent.trim()) {
            case "Mexico": {
                log("%cMexico", logStyle);
                renderBox("div.content-wrapper.travelling", createSignInForm);
                break;
            };
            case "Canada": {
                log("%cCanada", logStyle);
                renderBox("div.content-wrapper.travelling", createSignInForm);
                break;
            };
            case "Cayman Islands": {
                log("%cCayman Islands", logStyle);
                renderBox("div.content-wrapper.travelling", createSignInForm);
                break;
            };
            case "Hawaii": {
                log("%cHawaii", logStyle);
                renderBox("div.content-wrapper.travelling", createSignInForm);
                break;
            };
            case "United Kingdom": {
                log("%cUnited Kingdom", logStyle);
                renderBox("div.content-wrapper.travelling", createSignInForm);
                break;
            };
            case "Argentina": {
                log("%cSArgentina", logStyle);
                renderBox("div.content-wrapper.travelling", createSignInForm);
                break;
            };
            case "Switzerland": {
                log("%cSwitzerland", logStyle);
                renderBox("div.content-wrapper.travelling", createSignInForm);
                break;
            };
            case "Japan": {
                log("%cJapan", logStyle);
                renderBox("div.content-wrapper.travelling", createSignInForm);
                break;
            };
            case "China": {
                log("%cChina", logStyle);
                renderBox("div.content-wrapper.travelling", createSignInForm);
                break;
            };
            case "UAE": {
                log("%cUAE", logStyle);
                renderBox("div.content-wrapper.travelling", createSignInForm);
                break;
            };
            case "South Africa": {
                log("%cSouth Africa", logStyle);
                renderBox("div.content-wrapper.travelling", createSignInForm);
                break;
            };
            case "Traveling": { log("%cFlying", logStyle); renderBox("div.content-wrapper.travelling", createSignInForm); break; };
            case "Travel Agency": {
                log("%cTravel Agency", logStyle);
                renderBox("div.wrapper", createSignInForm)
                break;
            };
            default: { log("%cSCREEN DETECTOR NO KEY - Shit the bed", logStyle); break; };
        }
    };
})();

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

    // Code After Here
    const key = await GMGet("TornApiKey");
    log("%cspouse-script - made by d00dleD", logStyle);
    log("%cLOCALKEY - %s", logStyle, key);

    /* Remove for production */
    //GMDelete("TornApiKey");
    GMDelete("user_data");
    GMDelete("spouse_data");
    log("%cAll data reset", logStyle)
    /**/

    log("%cSpouse Travel script loaded", logStyle);

    if (key) {
        log(key)
        let user = await GMGet("user_data"); if (user) { user = await JSON.parse(user); } else { return await fetchUserUTIL(key) };
        console.log(user)
        let spouse = await GMGet("spouse_data"); if (spouse) { spouse = await JSON.parse(spouse); } else { console.log(user); return await fetchSpouseUTIL(key, user.married.spouse_id) }
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

        function renderToolDisp(target) {
            //const displaylist = createItemDisplay();//displaylist
            // log(displaylist);
            //travelAgentTarget.insertAdjacentElement('afterend', displaylist);// makes sure display appears after filter
            /*
                            const filterlist = createFilterForm();
                            log(filterlist)
                            let travelAgentTargetDiv = $get("div.wrapper")//travel agent target
                            if (travelAgentTargetDiv) { //only if in travel agent
                                const hrr = hr();
                                travelAgentTargetDiv.insertAdjacentElement('afterend', hrr);
                                const filterform = createFilterForm();
                                filterform.style.minHeight = '1rem';
                                travelAgentTargetDiv.insertAdjacentElement('afterend', filterlist);
                            };
            */
            const targetDiv = $get(target);
            if (targetDiv) {
                const hrr = hr();
                targetDiv.insertAdjacentElement('afterend', hrr);
                const signinform = createSignInForm();
                targetDiv.insertAdjacentElement('afterend', signinform);
            }
        };

        // check location before rendering display;
        switch ($get("h4").textContent) {
            case "Mexico": {
                log("%cMexico", logStyle);
                renderToolDisp("div.content-wrapper.travelling");
                break;
            };
            case "Canada": {
                log("%cCanada", logStyle);
                renderToolDisp("div.content-wrapper.travelling");
                break;
            };
            case "Cayman Islands": {
                log("%cCayman Islands", logStyle);
                renderToolDisp("div.content-wrapper.travelling");
                break;
            };
            case "Hawaii": {
                log("%cHawaii", logStyle);
                renderToolDisp("div.content-wrapper.travelling");
                break;
            };
            case "UK": {
                log("%cUK", logStyle);
                renderToolDisp("div.content-wrapper.travelling");
                break;
            };
            case "Argentina": {
                log("%cSArgentina", logStyle);
                renderToolDisp("div.content-wrapper.travelling");
                break;
            };
            case "Switzerland": {
                log("%cSwitzerland", logStyle);
                renderToolDisp("div.content-wrapper.travelling");
                break;
            };
            case "Japan": {
                log("%cJapan", logStyle);
                renderToolDisp("div.content-wrapper.travelling");
                break;
            };
            case "China": {
                log("%cChina", logStyle);
                renderToolDisp("div.content-wrapper.travelling");
                break;
            };
            case "UAE": {
                log("%cUAE", logStyle);
                renderToolDisp("div.content-wrapper.travelling");
                break;
            };
            case "South Africa": {
                log("%cSouth Africa", logStyle);
                renderToolDisp("div.content-wrapper.travelling");
                break;
            };
            case "Traveling": {
                log("%cFlying", logStyle);
                renderToolDisp("div.content-wrapper.travelling")
                break;
            }
            case "Travel Agency": {
                log("%cTravel Agency", logStyle);
                renderToolDisp("#div.wrapper")
                break;
            }
            default: {

                log("%cShit the bed", logStyle);

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
            case "UK": {
                log("%cUK", logStyle);
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
            default: { log("%cShit the bed", logStyle); break; };
        }
    };
})();


log("%cscript.user.js loaded", logStyle);

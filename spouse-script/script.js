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
// @require https://saucedontsauce.github.io/spouse-script/bin/Util.module.js?ts=<?= Date.now() ?>
// @require https://saucedontsauce.github.io/spouse-script/bin/CheckData.module.js?ts=<?= Date.now() ?>
// @require https://saucedontsauce.github.io/spouse-script/bin/BuildingBlocks.module.js?ts=<?= Date.now() ?>
// @require https://saucedontsauce.github.io/spouse-script/bin/SignInForm.module.js?ts=<?= Date.now() ?>
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
    GMDelete("local_data");
    GMDelete("user_data");
    GMDelete("spouse_data");
    log("%cAll data reset", logStyle)
    /**/

    log("%cSpouse Travel script loaded", logStyle);

    if (key) {
        log(key)
        let data = await GMGet("local_data"); if (data) { data = await JSON.parse(data); } else { const da = await fetch("https://saucedontsauce.github.io/spouse-script/data/torndata.json"); const jso = da.json(); data = jso };
        let user = await GMGet("user_data"); if (user) { user = await JSON.parse(user); } else { user = await fetchUserUTIL(key) };
        let spouse = await GMGet("spouse_data"); if (spouse) { spouse = await JSON.parse(spouse); } else { spouse = user.married ? await fetchSpouseUTIL(key, user.married.spouse_id) : null }
        await checkData(key, user, spouse);
        const mergedDisplay = data ? mergeUTIL(user, spouse, data) : [];
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
            case "Traveling": {
                log("%cFlying", logStyle);
                renderToolDisp("#travel-root")
                break;
            }
            case "Travel Agency": {

                log("%cTravel Agency", logStyle);
                renderToolDisp("#div.wrapper")

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
                renderSignInForm("div.content-wrapper.travelling");
                break;
            };
            case "Canada": {
                log("%cCanada", logStyle);
                renderSignInForm("div.content-wrapper.travelling");
                break;
            };
            case "Cayman Islands": {
                log("%cCayman Islands", logStyle);
                renderSignInForm("div.content-wrapper.travelling");
                break;
            };
            case "Hawaii": {
                log("%cHawaii", logStyle);
                renderSignInForm("div.content-wrapper.travelling");
                break;
            };
            case "UK": {
                log("%cUK", logStyle);
                renderSignInForm("div.content-wrapper.travelling");
                break;
            };
            case "Argentina": {
                log("%cSArgentina", logStyle);
                renderSignInForm("div.content-wrapper.travelling");
                break;
            };
            case "Switzerland": {
                log("%cSwitzerland", logStyle);
                renderSignInForm("div.content-wrapper.travelling");
                break;
            };
            case "Japan": {
                log("%cJapan", logStyle);
                renderSignInForm("div.content-wrapper.travelling");
                break;
            };
            case "China": {
                log("%cChina", logStyle);
                renderSignInForm("div.content-wrapper.travelling");
                break;
            };
            case "UAE": {
                log("%cUAE", logStyle);
                renderSignInForm("div.content-wrapper.travelling");
                break;
            };
            case "South Africa": {
                log("%cSouth Africa", logStyle);
                renderSignInForm("div.content-wrapper.travelling");
                break;
            };
            case "Traveling": { log("%cFlying", logStyle); renderSignInForm("div.content-wrapper.travelling"); break; };
            case "Travel Agency": {
                log("%cTravel Agency", logStyle);
                renderSignInForm("div.wrapper")
                break;
            };
            default: { log("%cShit the bed", logStyle); break; };
        }
    };
})();
log("%cscript.user.js loaded", logStyle);

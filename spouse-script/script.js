// ==UserScript==
// @name         Spouse Display
// @namespace    http://tampermonkey.net/
// @version      16-08-2025
// @description  Script for sharing spouse display for saving purposes
// @author       D00dleD
// @match        https://www.torn.com/travelagency.php
// @match        https://www.torn.com/page.php?sid=travel
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @require https://saucedontsauce.github.io/spouse-script/bin/Overides.module.js?ts=<?= Date.now() ?>
// @require https://saucedontsauce.github.io/spouse-script/bin/Util.module.js?ts=<?= Date.now() ?>
// @require https://saucedontsauce.github.io/spouse-script/bin/CheckData.module.js?ts=<?= Date.now() ?>
// @require https://saucedontsauce.github.io/spouse-script/bin/BuildingBlocks.module.js?ts=<?= Date.now() ?>
// @require https://saucedontsauce.github.io/spouse-script/bin/SignInForm.module.js?ts=<?= Date.now() ?>
// @grant    GM.getValue
// @grant    GM.setValue
// @grant    GM.deleteValue
// ==/UserScript==

// remove ?ts=<?= Date.now() ?> when finished as this removes module caching, slowing load times


(async function () {
    'use strict';
    // Code After Here
    const key = localStorage.getItem("TornApiKey");
    log("%cspouse-script - made by d00dleD", logStyle);
    log("%cLOCALKEY - %s", logStyle, key);

    /* Remove for production */
    GMDelete("local_data");
    GMDelete("local_user");
    GMDelete("local_spouse");
    log("%cAll data reset", logStyle)
    /**/

    log("%cSpouse Travel script loaded", logStyle);

    if (key) {
        let data = await GMGet("local_data"); if (data) data = await JSON.parse(data);
        let user = await GMGet("user_data"); if (user) user = await JSON.parse(user);
        let spouse = await GMGet("spouse_data"); if (spouse) spouse = await JSON.parse(spouse);
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

        await checkData(user, spouse);
        //const abroad indicator = $get("#skip-to-content");

        function renderToolDisp(target) {
            const targetDiv = $get(target);
            if (targetDiv) {
                const hrr = hr();
                targetDiv.insertAdjacentElement('afterend', hrr);
                const signinform = createSignInForm();
                targetDiv.insertAdjacentElement('afterend', signinform);
            }
        };

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
        renderSignInForm()
    };



})();
log("%cscript.user.js loaded", logStyle);

// ==UserScript==
// @name         Spouse Display
// @namespace    http://tampermonkey.net/
// @version      2025-08-13
// @description  try to take over the world!
// @author       You
// @match        https://www.torn.com/travelagency.php
// @match        https://www.torn.com/page.php?sid=travel
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @require https://saucedontsauce.github.io/spouse-script/bin/Overides.module.js
// @require https://saucedontsauce.github.io/spouse-script/bin/BuildingBlocks.module.js
// @require https://saucedontsauce.github.io/spouse-script/bin/SignInForm.module.js
// @grant    GM.getValue
// @grant    GM.setValue
// @grant    GM.deleteValue
// ==/UserScript==
(async function () {
    'use strict';
    // Code After Here



    log("%cSpouse Travel script loaded", logStyle);
})();
log("%cscript.user.js loaded", logStyle);

(async function () {
    'use strict';
    // ----------------CODE AFTER HERE-------------------//
    const key = localStorage.getItem("TornApiKey");
    // OVERIDES //

    // GLOBAL VARIABLES //
    let data = { "Kitten Plushie": { "location": "City", "type": "Plushie", "price": 50, "img-src": "https://www.torn.com/images/items/215/large.png", "target": 0 }, "Sheep Plushie": { "location": "City", "type": "Plushie", "price": 25, "img-src": "https://www.torn.com/images/items/186/large.png", "target": 0 }, "Teddy Bear Plushie": { "location": "City", "type": "Plushie", "price": 30, "img-src": "https://www.torn.com/images/items/187/large.png", "target": 0 }, "Jaguar Plushie": { "location": "Mexico", "type": "Plushie", "price": 10000, "img-src": "https://www.torn.com/images/items/258/large.png", "target": 0 }, "Dahlia": { "location": "Mexico", "type": "Flower", "price": 300, "img-src": "https://www.torn.com/images/items/260/large.png", "target": 0 }, "Wolverine Plushie": { "location": "Canada", "type": "Plushie", "price": 30, "img-src": "https://www.torn.com/images/items/261/large.png", "target": 0 }, "Crocus": { "location": "Canada", "type": "Flower", "price": 600, "img-src": "https://www.torn.com/images/items/263/large.png", "target": 0 }, "Banana Orchid": { "location": "Cayman Islands", "type": "Flower", "price": 4000, "img-src": "https://www.torn.com/images/items/617/large.png", "target": 0 }, "Stingray Plushie": { "location": "Cayman Islands", "type": "Plushie", "price": 400, "img-src": "https://www.torn.com/images/items/618/large.png", "target": 0 }, "Orchid": { "location": "Hawaii", "type": "Flower", "price": 700, "img-src": "https://www.torn.com/images/items/264/large.png", "target": 0 }, "Heather": { "location": "UK", "type": "Flower", "price": 5000, "img-src": "https://www.torn.com/images/items/267/large.png", "target": 0 }, "Nessie Plushie": { "location": "UK", "type": "Plushie", "price": 200, "img-src": "https://www.torn.com/images/items/266/large.png", "target": 0 }, "Red Fox Plushie": { "location": "UK", "type": "Plushie", "price": 1000, "img-src": "https://www.torn.com/images/items/268/large.png", "target": 0 }, "Ceibo Flower": { "location": "Argentina", "price": 500, "type": "Flower", "img-src": "https://www.torn.com/images/items/271/large.png", "target": 0 }, "Monkey Plushie": { "location": "Argentina", "type": "Plushie", "price": 400, "img-src": "https://www.torn.com/images/items/269/large.png", "target": 0 }, "Edelweiss": { "location": "Switzerland", "type": "Flower", "price": 900, "img-src": "https://www.torn.com/images/items/272/large.png", "target": 0 }, "Chamois Plushie": { "location": "Switzerland", "type": "Plushie", "price": 400, "img-src": "https://www.torn.com/images/items/273/large.png", "target": 0 }, "Cherry Blossom": { "location": "Japan", "type": "Flower", "price": 500, "img-src": "https://www.torn.com/images/items/277/large.png", "target": 0 }, "Panda Plushie": { "location": "China", "type": "Plushie", "price": 400, "img-src": "https://www.torn.com/images/items/274/large.png", "target": 0 }, "Peony": { "location": "China", "type": "Flower", "price": 5000, "img-src": "https://www.torn.com/images/items/276/large.png", "target": 0 }, "Camel Plushie": { "location": "UAE", "type": "Plushie", "price": 14000, "img-src": "https://www.torn.com/images/items/384/large.png", "target": 0 }, "Tribulus Omanense": { "location": "UAE", "type": "Flower", "price": 6000, "img-src": "https://www.torn.com/images/items/385/large.png", "target": 0 }, "Lion Plushie": { "location": "South Africa", "type": "Plushie", "price": 400, "img-src": "https://www.torn.com/images/items/281/large.png", "target": 0 }, "African Violet": { "location": "South Africa", "type": "Flower", "price": 2000, "img-src": "https://www.torn.com/images/items/282/large.png", "target": 0 } };
    let user = await GMGet("user_data");
    if (user) user = await JSON.parse(user)
    let spouse = await GMGet("spouse_data");
    if (spouse) spouse = await JSON.parse(spouse)
    let mergedDisplay;
    let filteredItems;
    let filters = [];
    /* Resets TEMP*/
    GMDelete("local_data");
    GMDelete("local_user");
    GMDelete("local_spouse");
    log("%cAll data reset", logStyle)
    /**/
    log("%cSPOUSE DISPLAY - made by d00dleD", logStyle);
    log("%cLOCALKEY - %s", logStyle, key)

    // BUILDING BLOCKS //

    const tbb = $create("tbody");
    function cr_displayth(d) { if (!d) return; const th = $create('th'); d.textContent = d; return th };
    function cr_displaytd(d) { if (!d) return; const td = $create("td"); td.textContent = d; return td; };

    /*
    function cr_displaytr(d) {

        return tr
    }
    function cr_createtbody(d) {
        if (!d) return;
        const tableBody = $create("tbody");
        log("%ctbody data %o", logStyle, d);
        d.forEach((i) => {
            const item = d[i];
            if (!item) return;
            const itemrow = cr_displaytr();

        });

    }
*/
    // FETCH FUNCTIONS //
    async function fetchUserData() {
        log("%cFetching user", logStyle);
        try {
            const data = await fetch("https://api.torn.com/v2/user?selections=profile,display,timestamp&key=" + key);
            log(data);
            const json = data.json();
            if (!json.error) return json;
        } catch (err) {
            GMDelete("localkey");
            log(err);
        };
    };
    async function fetchSpouseData(id) {
        log("%cFetching spouse", logStyle);
        try {
            const data = await fetch(`https://api.torn.com/v2/user/${id}?selections=display,timestamp&key=${key}`);
            const json = data.json();
            if (!json.error) return json;
        } catch (err) {
            GMDelete("localkey"); log(err);
            log(err)
        }
    };

    async function loadData() {
        if (!user) {
            log("%cNo local user data present", logStyle);
            const newUserData = await fetchUserData();
            user = newUserData;
            GMSet('user_data', JSON.stringify(newUserData))
        } else {
            const jsonuser = user;
            if (Math.floor((jsonuser.timestamp * 1000) - 21600) <= Date.now() || jsonuser.error) {
                const newUserData = await fetchUserData();
                GMSet('user_data', JSON.stringify(newUserData));
            } else {
                log("%cLocal user data present and valid", logStyle);
                user = { ...jsonuser };
            };
        };
        if (!spouse && user?.married?.spouse_id) {
            log("%cHas spouse but no data", logStyle);
            const newSpouseData = await fetchSpouseData(user.married.spouse_id);
            spouse = newSpouseData; GMSet('local_spouse', JSON.stringify(newSpouseData));
        } else {
            const jsonspouse = spouse;
            if (Math.floor((jsonspouse.timestamp * 1000) - 21600) <= Date.now() || jsonspouse.error) {
                const newSpouseData = await fetchSpouseData(user.married.spouse_id);
                spouse = newSpouseData;
                GMSet('local_spouse', JSON.stringify(newSpouseData));
            } else {
                log("%cLocal spouse data present and valid", logStyle);
                spouse = { ...jsonspouse };
            }
        };
    }
    if (key) loadData()



    function JoinData() {
        user.display.forEach(i => {
            //console.log({...dd[i.name]})
            mergedDisplay[i.name] = { ...i, ...data[i.name] };
            mergedDisplay[i.name].my_quantity = i.quantity;
            mergedDisplay[i.name].spouse_quantity = 0;
        });
        if (spouse) {
            spouse.display.forEach(i => {
                if (mergedDisplay[i.name]) {
                    mergedDisplay[i.name] = { ...mergedDisplay[i.name], spouse_quantity: i.quantity, quantity: mergedDisplay[i.name].quantity += i.quantity };

                } else {
                    mergedDisplay[i.name] = { ...i, spouse_quantity: i.quantity, my_quantity: 0 };
                }
            })
        }
    }
    // CREATE DISPLAYS FUNCTIONS //
    function createSignInForm() {
        function form() {
            function keyinput() { const ki = $create("input"); ki.setAttribute('type', 'text'); ki.setAttribute('placeholder', 'Enter your API key'); ki.setAttribute('id', 'apiKey'); ki.setAttribute('required', 'true'); ki.setAttribute("data-lpignore", "true"); ki.setAttribute("autocomplete", "off"); ki.style.backgroundColor = "white"; ki.style.border = "1px solid"; ki.style.borderRadius = "5px"; ki.style.backgroundImage = "linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)"; ki.style.padding = "10px"; ki.style.lineHeight = "14px"; ki.style.marginRight = "8px"; ki.style.borderColor = "#ddd"; return ki; };
            function button() { const ks = $create("button"); ks.setAttribute('type', 'submit'); ks.setAttribute('id', 'submitApiKey'); ks.setAttribute('aria-label', 'submitApibutton'); ks.setAttribute('i-data', 'submitApibutton'); ks.textContent = 'Submit'; ks.className = 'torn-btn'; return ks; };
            const f = $create("form");
            f.style.display = "flex";
            f.style.justifyContent = "space-evenly";
            f.style.alignItems = "center";
            f.style.gap = "1rem";
            f.addEventListener('submit', (e) => {
                e.preventDefault();
                log('form submitted: %s', $get("#apiKey").value);
                localStorage.setItem("TornApiKey", $get("#apiKey").value)
            });

            const inputDiv = keyinput();
            f.appendChild(inputDiv);
            const submitbutton = button();
            f.appendChild(submitbutton);
            return f;
        };

        function innerwrapper() {
            const fw = $create("div");//FORM wrapper
            fw.textContent = "Use this to set your api key for spouse display"
            const hr1 = $create("hr");//hr
            hr1.className = "page-head-delimiter m-top10 m-bottom10"
            hr1.style.borderRadius = 0;
            hr1.style.borderRadius = '5px';
            fw.appendChild(hr1);
            fw.className = "msg border-round";
            fw.style.width = "auto !important";
            const f = form();
            fw.appendChild(f);
            return fw
        };

        function formwrapper() {
            const akfd = $create("div");
            akfd.className = "delimiter border-round";
            akfd.style.borderRadius = 0;
            akfd.style.borderRadius = '5px';
            const innerWrapper = innerwrapper();
            akfd.appendChild(innerWrapper);
            return akfd
        };

        const formObject = $create("div");//FORM outer wrapper
        formObject.className = "flex border-round info-msg";
        formObject.style.alignItems = "center";
        const formwrap = formwrapper();
        formObject.appendChild(formwrap);
        return formObject;
    };
    function createFilterForm() {
        const filterWrapper = $create("div");

        const types = ["Plushie", "Flower"];
        const countries = [];

        const handleFilterClick = (e) => {
            console.log("filter clicked")
        };

        const typeRow = $create("div")
        types.forEach((s) => {
            const item = $create("span");
            item.dataset.type = "type";
            item.dataset.value = s;
            item.dataset.active = s;
            item.addEventListener("click", handleFilterClick);
            typeRow.appendChild(item);
        });

        filterWrapper.appendChild(typeRow);
        return filterWrapper
    };
    function createItemDisplay() {

    };
    // RENDER FUNCTIONS //
    function renderSignInForm() {
        log("%cKey absent", logStyle);
        let travelAgentTargetDiv = $get("div.wrapper")//travel agent target
        if (travelAgentTargetDiv) { //only if in travel agent
            const hrr = hr();
            travelAgentTargetDiv.insertAdjacentElement('afterend', hrr);
            const signinform = createSignInForm();//whats you
            travelAgentTargetDiv.insertAdjacentElement('afterend', signinform);
        }
    };

    function renderItemDisplay() {

    };

    log("%cData: %o", logStyle, data); // CHECK STATE
    log("%cUser: %o", logStyle, user); // CHECK STATE
    log("%cSpouse: %o", logStyle, spouse); // CHECK STATE
    log("%cJoined: %o", logStyle, mergedDisplay); // CHECK STATE
    log("%cFiltered: %o", logStyle, []); // CHECK STATE

    // DO STUFF //

    function rerenderList() {
        log("%cNeed list render ", logStyle);
        const newForm = createFilterForm();
        $get('#itemdisplay').replaceWith(newForm);
    };

    if (key) {
        const lai = $get("#skip-to-content");
        const lti = $get("h4").textContent === "Traveling";//flying
        const lta = $get("h4").textContent === "Travel Agency";//travel agents*
        if (lai) {
            log("%cAbroad", logStyle);
            renderItemDisplay();
        } else if (lti) {
            log("%cFlying", logStyle);
            let travelingTarget = $get("#travel-root")//traveling target


        } else if (lta) {
            log("%cTravel Agency", logStyle);
            let travelAgentTarget = $get("div.wrapper")//travel agent target

            //const displaylist = createItemDisplay();//displaylist
            // log(displaylist);
            //travelAgentTarget.insertAdjacentElement('afterend', displaylist);// makes sure display appears after filter

            const filterlist = createFilterForm();
            console.log(filterlist)
            let travelAgentTargetDiv = $get("div.wrapper")//travel agent target
            if (travelAgentTargetDiv) { //only if in travel agent
                const hrr = hr();
                travelAgentTargetDiv.insertAdjacentElement('afterend', hrr);
                const filterform = createFilterForm();
                filterform.style.minHeight = '1rem';
                travelAgentTargetDiv.insertAdjacentElement('afterend', filterlist);
            };
        } else {
            log("%cShit the bed", logStyle);

        };
    } else {
        renderSignInForm()
    }
})();
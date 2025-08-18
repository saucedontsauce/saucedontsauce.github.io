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
// ==/UserScript==


(async function () {
    'use strict';
    // code 
    function filterRow() { const fr = $create("div"); setStyles(fr, { display: "flex", padding: ".5rem 0", flexWrap: "wrap", flexDirection: "row", gap: ".5rem", rowGap: ".5rem", justifyContent: "space-evenly" }); return fr; };
    function hr() { const hr0 = $create("hr"); hr0.id = "hr0"; hr0.style.borderTopLeftRadius = "5px !important"; hr0.style.borderBottomLeftRadius = "5px !important"; hr0.className = "page-head-delimiter border-round m-top10 m-bottom10"; return hr0; };

    class SpouseScript {


        createSpouseDisplay(filteredItems = []) {
            console.log("%ccreating spouse display", logStyle);
            const wrapper = $create("div");
            wrapper.className = "msg border-round";
            setStyles(wrapper, {
                width: "auto",
                rowGap: "8px"
            });
            // filter lists
            const filterheader = $create("p");
            filterheader.textContent = "Filters";
            setStyles(filterheader, {
                padding: ".5rem",
                display: "flex",
                fontWeight: 600,
                justifyContent: "center",
                alignItems: "center"
            });
            wrapper.appendChild(filterheader);

            function toggleFilterStatus(target) {
                var div = $get("#" + target.dataset.type + target.dataset.value);
                if (div.dataset.active === "true") {
                    div.style.border = "2px solid grey";
                    div.dataset.active = "false";
                } else {
                    div.style.border = "3px solid #22dd22";
                    div.dataset.active = "true";
                }
            }



            function filterBtnHandler(e) {

                const type = e.target.dataset.type;
                const value = e.target.dataset.value;
                switch (type) {
                    case "control": {
                        switch (value) {
                            case "types": {
                                log("%ctypes control", logStyle);
                                toggleFilterStatus(e.target);
                                const catset = e.target.dataset.active
                                data.types.forEach((type) => {
                                    if (filters.indexOf(type) >= 0) {
                                        if (!catset) {
                                            filters.slice(filters.indexOf(type), 1);
                                        }
                                    } else {
                                        if (catset) {
                                            filters.push(type);
                                        }
                                    };
                                });
                                break;
                            };
                            case "locations": {
                                log("%clocations control", logStyle);
                                toggleFilterStatus(e.target);
                                const catset = e.target.dataset.active;
                                data.locations.forEach((location) => {
                                    if (filters.indexOf(location) >= 0) {
                                        if (!catset) {
                                            filters.slice(filters.indexOf(location), 1);
                                        }
                                    } else {
                                        if (catset) {
                                            filters.push(location);
                                        }
                                    }
                                })
                                break;
                            }
                            default: {
                                log("%cfilterBtnHandler control Shit itself", logStyle);
                                break;
                            }
                        };
                        break;
                    };
                    case "locations": {
                        toggleFilterStatus(e.target);
                        if (e.target.dataset.active === "true") {

                        };
                        break;
                    }
                    default: {
                        log("%cfilterBtnHandler Shit itself", logStyle)
                        break;
                    }
                };

                console.log("%cFilters Updated: %o", logStyle, data.filters);
            };

            const filterrow0 = filterRow();//supers / set all 
            data.controls.forEach((ob) => {
                const btn = $create("div");
                btn.dataset.type = "control";
                btn.dataset.value = ob.value;
                btn.dataset.active = "true";
                btn.id = "control" + ob.value;
                btn.title = ob.value;
                btn.innerHTML = ob.icon;
                btn.addEventListener("click", filterBtnHandler);
                setStyles(btn, {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "35px",
                    overflow: "hidden",
                    width: "35px",
                    borderRadius: '50%',
                    border: "3px solid #22dd22",
                    cursor: "pointer",
                    padding: "5px"
                });
                filterrow0.appendChild(btn);
            });
            wrapper.appendChild(filterrow0);


            const filterrow1 = filterRow();//locations
            data.locations.forEach((location) => {
                const btn = $create("div");
                btn.dataset.type = "location";
                btn.dataset.value = location.name;
                btn.title = location.name;
                btn.dataset.active = "true";
                btn.innerHTML = location.icon;
                btn.addEventListener("click", filterBtnHandler);
                btn.id = "location" + location.name;
                setStyles(btn, {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "35px",
                    overflow: "hidden",
                    width: "35px",
                    borderRadius: '50%',
                    border: "3px solid #22dd22",
                    cursor: "pointer"
                });
                filterrow1.appendChild(btn);
            });
            wrapper.appendChild(filterrow1);



            const filterrow2 = filterRow();//locations




            // break
            const hr1 = $create("hr");
            hr1.className = "page-head-delimiter m-top10 m-bottom10";
            hr1.style.borderRadius = "5px";
            wrapper.appendChild(hr1);
            //header
            const displayheader = $create("p");
            displayheader.textContent = "Items";
            setStyles(displayheader, {
                display: "flex",
                fontWeight: 600,
                justifyContent: "center",
                alignItems: "center"
            });
            wrapper.appendChild(displayheader);
            //list
            if (data.filteredItems.length) {
                data.filteredItems.forEach(item => {
                    const el = $create("div");
                    el.textContent = `• ${item.name}-${item.location}  -- ${item.quantity}/${item.target}`;
                    wrapper.appendChild(el);
                });
            } else {
                const empty = $create("p");
                empty.textContent = "No data available.";
                wrapper.appendChild(empty);
            }

            return wrapper;
        }



        createSignInForm() {
            function form() {
                function keyinput() { const ki = $create("input"); ki.setAttribute('type', 'text'); ki.setAttribute('placeholder', 'Enter your API key'); ki.setAttribute('id', 'apiKey'); ki.setAttribute('required', 'true'); ki.setAttribute("data-lpignore", "true"); ki.setAttribute("autocomplete", "off"); ki.style.backgroundColor = "white"; ki.style.border = "1px solid"; ki.style.borderRadius = "5px"; ki.style.backgroundImage = "linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)"; ki.style.padding = "10px"; ki.style.lineHeight = "14px"; ki.style.marginRight = "8px"; ki.style.borderColor = "#ddd"; return ki; };
                function button() { const ks = $create("button"); ks.setAttribute('type', 'submit'); ks.setAttribute('id', 'submitApiKey'); ks.setAttribute('aria-label', 'submitApibutton'); ks.setAttribute('i-data', 'submitApibutton'); ks.textContent = 'Submit'; ks.className = 'torn-btn'; return ks; };
                function link() {
                    const lin = $create("a");
                    lin.href = "https://www.torn.com/preferences.php#tab=api";
                    lin.target = "_blank";
                    lin.innerHTML = '<p>No Key?</p>';
                    lin.className = "torn-btn";
                    return lin
                };

                const f = $create("form");
                setStyles(f, {
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "1rem"
                });

                f.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    log('form submitted: %s', $get("#apiKey").value);
                    await data.loginHandler($get("#apiKey").value);
                });

                const inputDiv = keyinput();
                setStyles(inputDiv, {
                    display: "inline-flex",
                    flexGrow: "grow"
                })
                f.appendChild(inputDiv);
                const submitbutton = button();
                f.appendChild(submitbutton);
                const keylink = link();
                f.appendChild(keylink);
                return f;
            };

            const fw = $create("div");//FORM wrapper
            fw.className = "msg border-round";
            fw.style.width = "auto !important";

            const headr = $create("p");
            headr.textContent = "Use this to set your api key for spouse display";
            setStyles(headr, {
                textAlign: "center"
            });
            fw.appendChild(headr)

            const hr1 = $create("hr");//hr
            hr1.className = "page-head-delimiter m-top10 m-bottom10"
            setStyles(hr1, {
                borderRadius: 0,
                borderRadius: '5px'
            });
            fw.appendChild(hr1);
            const f = form();
            fw.appendChild(f);

            return fw
        }

        #render(target, fnOrEl) { log("%cRendering box", logStyle); let targetDiv = $get(target); if (!targetDiv) return; log("%cTARGET FOUND", logStyle); const jubwr = $create("div"); jubwr.className = "api-form-wrapper"; const outerWrap = $create("div"); outerWrap.className = "flex border-round info-msg"; outerWrap.style.alignItems = "center"; const innerWrap = $create("div"); innerWrap.className = "delimiter border-round"; innerWrap.style.borderRadius = "5px"; let item; if (typeof fnOrEl === "function") { item = fnOrEl(); } else { item = fnOrEl; }; if (!(item instanceof HTMLElement)) { console.warn("renderBox expected a DOM node but got:", item); return; }; const hrr = hr(); innerWrap.appendChild(item); outerWrap.appendChild(innerWrap); jubwr.appendChild(outerWrap); jubwr.appendChild(hrr); targetDiv.prepend(jubwr); };

        #log() {
            log("%cKey: %o", logStyle, data.key);
            log("%cData: %o", logStyle, data.system);
            log("%cUser: %o", logStyle, data.user);
            log("%cSpouse: %o", logStyle, data.spouse);
            log("%cMerged: %o", logStyle, data.user && data.mergedDisplay);
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
                        a.#render("div.content-wrapper", a.createSpouseDisplay);
                    } else {
                        a.#render("div.content-wrapper", a.createSignInForm);
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
    await SpouseScript.init()
})();

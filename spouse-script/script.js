// ==UserScript==
// @name         Spouse Display
// @namespace    http://tampermonkey.net/
// @version      16-08-2025
// @description  Script for sharing spouse display for saving purposes
// @author       D00dleD
// @match        https://www.torn.com/index.php
// @match        https://www.torn.com/page.php?sid=travel
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.deleteValue
// ==/UserScript==

(async function () {
    'use strict';

    // overides
    const log = console.log;
    const logStyle = 'background-color: darkblue; color: white; font-style: italic; border: 5px solid hotpink; font-size: 2em;';
    const $get = (selector) => document.querySelector(selector);
    const SYSTEM = {
        "Kitten Plushie": { "location": "City", "type": "Plushie", "price": 50, "img-src": "https://www.torn.com/images/items/215/large.png", "target": 0 },
        "Sheep Plushie": { "location": "City", "type": "Plushie", "price": 25, "img-src": "https://www.torn.com/images/items/186/large.png", "target": 0 },
        "Teddy Bear Plushie": { "location": "City", "type": "Plushie", "price": 30, "img-src": "https://www.torn.com/images/items/187/large.png", "target": 0 },
        "Jaguar Plushie": { "location": "Mexico", "type": "Plushie", "price": 10000, "img-src": "https://www.torn.com/images/items/258/large.png", "target": 0 },
        "Dahlia": { "location": "Mexico", "type": "Flower", "price": 300, "img-src": "https://www.torn.com/images/items/260/large.png", "target": 0 },
        "Wolverine Plushie": { "location": "Canada", "type": "Plushie", "price": 30, "img-src": "https://www.torn.com/images/items/261/large.png", "target": 0 },
        "Crocus": { "location": "Canada", "type": "Flower", "price": 600, "img-src": "https://www.torn.com/images/items/263/large.png", "target": 0 },
        "Banana Orchid": { "location": "Cayman Islands", "type": "Flower", "price": 4000, "img-src": "https://www.torn.com/images/items/617/large.png", "target": 0 },
        "Stingray Plushie": { "location": "Cayman Islands", "type": "Plushie", "price": 400, "img-src": "https://www.torn.com/images/items/618/large.png", "target": 0 },
        "Orchid": { "location": "Hawaii", "type": "Flower", "price": 700, "img-src": "https://www.torn.com/images/items/264/large.png", "target": 0 },
        "Heather": { "location": "UK", "type": "Flower", "price": 5000, "img-src": "https://www.torn.com/images/items/267/large.png", "target": 0 },
        "Nessie Plushie": { "location": "UK", "type": "Plushie", "price": 200, "img-src": "https://www.torn.com/images/items/266/large.png", "target": 0 },
        "Red Fox Plushie": { "location": "UK", "type": "Plushie", "price": 1000, "img-src": "https://www.torn.com/images/items/268/large.png", "target": 0 },
        "Ceibo Flower": { "location": "Argentina", "price": 500, "type": "Flower", "img-src": "https://www.torn.com/images/items/271/large.png", "target": 0 },
        "Monkey Plushie": { "location": "Argentina", "type": "Plushie", "price": 400, "img-src": "https://www.torn.com/images/items/269/large.png", "target": 0 },
        "Edelweiss": { "location": "Switzerland", "type": "Flower", "price": 900, "img-src": "https://www.torn.com/images/items/272/large.png", "target": 0 },
        "Chamois Plushie": { "location": "Switzerland", "type": "Plushie", "price": 400, "img-src": "https://www.torn.com/images/items/273/large.png", "target": 0 },
        "Cherry Blossom": { "location": "Japan", "type": "Flower", "price": 500, "img-src": "https://www.torn.com/images/items/277/large.png", "target": 0 },
        "Panda Plushie": { "location": "China", "type": "Plushie", "price": 400, "img-src": "https://www.torn.com/images/items/274/large.png", "target": 0 },
        "Peony": { "location": "China", "type": "Flower", "price": 5000, "img-src": "https://www.torn.com/images/items/276/large.png", "target": 0 },
        "Camel Plushie": { "location": "UAE", "type": "Plushie", "price": 14000, "img-src": "https://www.torn.com/images/items/384/large.png", "target": 0 },
        "Tribulus Omanense": { "location": "UAE", "type": "Flower", "price": 6000, "img-src": "https://www.torn.com/images/items/385/large.png", "target": 0 },
        "Lion Plushie": { "location": "South Africa", "type": "Plushie", "price": 400, "img-src": "https://www.torn.com/images/items/281/large.png", "target": 0 },
        "African Violet": { "location": "South Africa", "type": "Flower", "price": 2000, "img-src": "https://www.torn.com/images/items/282/large.png", "target": 0 }
    };
    const CONTROLS = [
        {
            value: "type",
            text: "All Types",
            icon: `https://images.icon-icons.com/3404/PNG/512/categories_collapse_icon_215799.png`
        },
        {
            value: "location",
            text: "All Locations",
            icon: `https://images.icon-icons.com/1678/PNG/96/wondicon-ui-free-website_111210.png`
        }
    ];
    const TYPE = [
        { value: "Plushie", icon: "https://api.iconify.design/mdi/teddy-bear.svg" },
        { value: "Flower", icon: "https://api.iconify.design/tabler/flower.svg" },
        { value: "Temporary", icon: "https://api.iconify.design/game-icons/grenade.svg" },
        { value: "Medical", icon: "https://api.iconify.design/fluent-emoji/medical-symbol.svg?width=24&height=24" },
        { value: "Alcohol", icon: "https://api.iconify.design/tabler/glass.svg" },
        { value: "Drug", icon: "https://api.iconify.design/mdi/pill.svg" },
        { value: "Booster", icon: "https://api.iconify.design/radix-icons/thick-arrow-up.svg" }];
    const LOCATION = [
        { value: "Mexico", icon: `/images/v2/travel_agency/flags/fl_mexico.svg` },
        { value: "Canada", icon: `/images/v2/travel_agency/flags/fl_canada.svg` },
        { value: "Cayman Islands", icon: `/images/v2/travel_agency/flags/fl_cayman_islands.svg` },
        { value: "Hawaii", icon: `/images/v2/travel_agency/flags/fl_hawaii.svg` },
        { value: "Argentina", icon: `/images/v2/travel_agency/flags/fl_argentina.svg` },
        { value: "United Kingdom", icon: `/images/v2/travel_agency/flags/fl_uk.svg` },
        { value: "Switzerland", icon: `/images/v2/travel_agency/flags/fl_switzerland.svg` },
        { value: "Japan", icon: `/images/v2/travel_agency/flags/fl_japan.svg` },
        { value: "China", icon: `/images/v2/travel_agency/flags/fl_china.svg` },
        { value: "UAE", icon: `/images/v2/travel_agency/flags/fl_uae.svg` },
        { value: "South Africa", icon: `/images/v2/travel_agency/flags/fl_south_africa.svg` }
    ];
    const FILTERDEFAULT = [
        ...LOCATION.map(l => ({ type: "location", value: l.value })),
        ...TYPE.map(t => ({ type: "type", value: t.value }))
    ];
    const KEYS = {
        key: "TornApiKey",
        user: "user_data",
        spouse: "spouse_data",
        filter: "filter_data"
    };
    function ISOBJECT(v) {
        if (typeof v === "string") {
            return false
        } else if (Array.isArray(v)) {
            return false
        } else if (typeof v === "number") {
            return false
        } else {
            return true
        }
    }
    function SHOULDBEJSON(v) {
        try { JSON.parse(v); return true; }
        catch { return false; }
    }

    // Helper to create elements
    function createEl(tag, { dataset = {}, attrs = {}, styles = {}, innerHTML, children = [] } = {}) {
        const el = document.createElement(tag);
        Object.assign(el.dataset, dataset);
        Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
        Object.assign(el.style, styles);
        if (innerHTML) el.innerHTML = innerHTML;
        children.forEach(c => el.appendChild(c));
        return el;
    }

    // Filter row wrapper
    const filterRow = () => createEl('div', { styles: { display: 'flex', padding: '.5rem 0', flexWrap: 'wrap', gap: '.5rem', justifyContent: 'space-evenly' } });
    const hrEl = () => createEl('hr', { styles: { borderRadius: '5px' }, attrs: { class: 'page-head-delimiter m-top10 m-bottom10' } });



    class Store {
        system = { ...SYSTEM };
        controls = [...CONTROLS];
        type = [...TYPE];
        location = [...LOCATION]
        #filterDefault = [...FILTERDEFAULT];

        #KEYS = KEYS

        async #get(k) {
            const val = await GM.getValue(this.#KEYS[k]);
            if (val === undefined) return null;
            return SHOULDBEJSON(val) ? JSON.parse(val) : val;
        }

        async #set(k, v) {
            try {
                const val = ISOBJECT(v) ? JSON.stringify(v) : v;
                log("%cSTORE - #set() - %s %s", logStyle, this.#KEYS[k], v);
                await GM.setValue(this.#KEYS[k], val);
                return true;
            } catch (err) {
                log("%cSTORE - #set() ERROR", logStyle, err);
                return false;
            }
        }

        async #delete(k) {
            try {
                await GM.deleteValue(this.#KEYS[k]);
                return true;
            } catch (error) {
                log("%STORE - Error deleting item", logStyle, error);
                return false;
            }
        }

        get mergedDisplay() {
            let merged = { ...this.system };
            Object.keys(merged).forEach((i) => { merged[i] = { name: i, quantity: 0, my_quantity: 0, spouse_quantity: 0 } })
            if (!this.user || !this.system) throw new Error("STORE - Incorrect data passed to merge function")
            this.user.display.forEach(i => {
                merged[i.name] = { ...merged[i.name], quantity: i.quantity, my_quantity: i.quantity };
            });
            if (this.spouse) {
                this.spouse.display.forEach(i => {
                    merged[i.name] = { ...merged[i.name], spouse_quantity: i.quantity, quantity: merged[i.name]?.quantity ? merged[i.name].quantity + i.quantity : i.quantity };
                });
            };
            return merged;
        }

        get filteredItems() {
            const activeFilters = this.filters.reduce((acc, f) => {
                acc[f.type] ??= new Set();
                acc[f.type].add(f.value);
                return acc;
            }, {});

            return Object.values(this.mergedDisplay)
                .filter(item =>
                    (!activeFilters.location || activeFilters.location.has(item.location)) &&
                    (!activeFilters.type || activeFilters.type.has(item.type))
                );
        }

        async #fetchPlayer(key, saveKey, id = "") {
            log("%cFetching user", logStyle);
            try {
                const url = `https://api.torn.com/v2/user${id ? "/" + id : ""}?selections=${id ? "display,timestamp" : "profile,display,timestamp"}&key=${key}`;
                const res = await fetch(url);
                const json = await res.json();
                if (json.error) return this.#handleApiError(json);
                await this.#set(saveKey, json);
                return json;
            } catch (err) {
                await this.#delete("key");
                log(err);
            }
        }

        #handleApiError(json) {
            switch (json.error.code) {
                case 2:
                    this.#delete("key");
                    window.alert(json.error.error);
                    window.location.reload();
                    break;
                default:
                    log("%cSTORE - API Fetch failed : %s", logStyle, json.error);
            }
        }

        async handleFilterChange() {
            await this.#set("filter", this.filters);
            log("%cSTORE - handleFilterChange() - FILTERS SET LOCALLY", logStyle);
        }

        async #ensureFresh(type, id = null) {
            console.log(type, id)
            let cached = await this.#get(type);
            if (!cached) { log(`%cSTORE - NO ${type.toUpperCase()}`, logStyle); return await this.#fetchPlayer(this.key, type, id); }
            let isStale = (Date.now() - cached.timestamp * 1000) > 3600000;
            if (isStale) { log(`%cSTORE - OLD ${type.toUpperCase()}`, logStyle); return await this.#fetchPlayer(this.key, type, id); }
            log(`%cSTORE - ${type.toUpperCase()} VALID`, logStyle);
            return cached;
        }

        async #checkData() {
            if (!this.key) return log("%cSTORE - #checkData()- NO KEY", logStyle);

            console.log(this.user)
            this.user = await this.#ensureFresh("user");
            if (this.user?.married?.spouse_id) {
                console.log(this.spouse)
                this.spouse = await this.#ensureFresh("spouse", this.user.married.spouse_id);
            }

            if (!this.filters) {
                this.filters = [...this.#filterDefault];
                await this.#set("filter", this.#filterDefault);
            }
        }

        async loginHandler(key) {
            log("%cSTORE - loginHandler() -LOGIN CALLED %s", logStyle, key);
            const saved = await this.#set("key", key);
            if (!saved) {
                window.alert("Failed to save key.");
                return false;
            }

            // reload key from storage to confirm
            this.key = await this.#get("key");
            log("%cSTORE - Key after saving: %s", logStyle, this.key);

            await this.refresh();
            return true;
        }

        async refresh() {
            this.key = await this.#get("key");
            this.user = await this.#get("user");
            this.spouse = await this.#get("spouse");
            this.filters = await this.#get("filter");
            await this.#checkData()
        }

        static async init() {
            const s = new Store();
            s.key = await s.#get("key");
            s.user = await s.#get("user");
            s.spouse = await s.#get("spouse");
            s.filters = await s.#get("filter");
            await s.#checkData()
            return s;
        }

    };
    let data = await Store.init();


    //////////////////////////////////////////////////////////////////
    class SpouseScript {
        #createSpouseDisplay() {
            const wrapper = createEl('div', { styles: { width: 'auto', rowGap: '8px' }, attrs: { class: 'msg border-round' } });

            // Header
            wrapper.appendChild(createEl('p', { innerHTML: 'Filters', styles: { padding: '.5rem', display: 'flex', fontWeight: 600, justifyContent: 'center', alignItems: 'center' } }));

            // Toggle filter
            const toggleFilterStatus = target => {
                const div = document.getElementById(target.dataset.type + target.dataset.value.replace(/\s/g, ''));
                div.dataset.active = div.dataset.active === 'true' ? 'false' : 'true';
                div.style.border = div.dataset.active === 'true' ? '3px solid #22dd22' : '2px solid grey';
            };

            const filterBtnHandler = e => {
                const btn = e.target.tagName === 'IMG' ? e.target.parentElement : e.target;
                toggleFilterStatus(btn);
                const type = btn.dataset.type, value = btn.dataset.value;
                const active = btn.dataset.active === 'true';
                if (type === 'control') {
                    data[value].forEach(flt => {
                        const idx = data.filters.findIndex(o => o.type === value && o.value === flt.value);
                        if (active && idx === -1) {
                            data.filters.push({ type: value, value: flt.value });
                            toggleFilterStatus(document.getElementById(value + flt.value.replace(/\s/g, '')));
                        } else if (!active && idx !== -1) {
                            data.filters.splice(idx, 1);
                            toggleFilterStatus(document.getElementById(value + flt.value.replace(/\s/g, '')));
                        }
                    });
                } else {
                    const ctrl = document.getElementById('control' + type);
                    if (ctrl.dataset.active === 'true' && !active) toggleFilterStatus(ctrl);
                    const idx = data.filters.findIndex(o => o.type === type && o.value === value);
                    idx === -1 ? data.filters.push({ type: type, value: value }) : data.filters.splice(idx, 1);
                }
                log("%cFilters changed %o", logStyle, data.filters);
                data.handleFilterChange()
                this.#rerenderItems()
            };

            // Control buttons
            const row0 = filterRow();
            data.controls.forEach(ob => {
                const icon = createEl('img', { attrs: { src: ob.icon, class: "circularFlag___CBX4B" }, dataset: { type: 'control', value: ob.value }, styles: { width: '100%', height: '100%' } });
                const btn = createEl('div', {
                    dataset: { type: 'control', value: ob.value, active: 'true' },
                    attrs: { id: 'control' + ob.value.replace(/\s/g, ''), title: ob.value, class: "circleFlagWrapper___M6hdY" },
                    children: [icon],
                    styles: { border: '3px solid #22dd22', cursor: 'pointer' }
                });
                btn.addEventListener('click', filterBtnHandler);
                row0.appendChild(btn);
            });
            wrapper.appendChild(row0);

            // Location buttons
            const row1 = filterRow();
            data.location.forEach(loc => {
                const icon = createEl('img', { attrs: { src: loc.icon, class: "circularFlag___CBX4B" }, dataset: { type: 'location', value: loc.value } });
                const btn = createEl('div', {
                    dataset: { type: 'location', value: loc.value, active: 'true' },
                    attrs: { id: 'location' + loc.value.replace(/\s/g, ''), title: loc.value, class: "circleFlagWrapper___M6hdY" },
                    children: [icon],
                    styles: { padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '3px solid #22dd22', cursor: 'pointer' }
                });
                btn.addEventListener('click', filterBtnHandler);
                row1.appendChild(btn);
            });
            wrapper.appendChild(row1);

            const row2 = filterRow();
            data.type.forEach(typ => {
                const icon = createEl('img', { attrs: { src: typ.icon }, dataset: { type: 'type', value: typ.value }, styles: { width: '100%', height: '100%' } });
                const btn = createEl('div', {
                    dataset: { type: 'type', value: typ.value, active: 'true' },
                    attrs: { id: 'type' + typ.value, title: typ.value },
                    children: [icon],
                    styles: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '35px', width: '35px', borderRadius: '50%', border: '3px solid #22dd22', cursor: 'pointer' }
                });
                btn.addEventListener('click', filterBtnHandler);
                row2.appendChild(btn);
            });
            wrapper.appendChild(row2);

            wrapper.appendChild(hrEl());

            wrapper.appendChild(createEl('p', { innerHTML: 'Items', styles: { display: 'flex', fontWeight: 600, justifyContent: 'center', alignItems: 'center' } }));

            const itemWrapper = createEl("div", {
                attrs: { id: "itemDisplay" }
            })
            // Items
            if (data.filteredItems.length) {
                data.filteredItems.forEach(item => itemWrapper.appendChild(createEl('div', { innerHTML: `• ${item.name}-${item.location} -- ${item.quantity}/${item.target || "0"}` })));
            } else {
                itemWrapper.appendChild(createEl('p', { innerHTML: 'No data available.' }));
            }

            wrapper.appendChild(itemWrapper)

            return wrapper;
        }

        #createSignInForm() {
            const form = createEl('form', { styles: { display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', gap: '1rem', flexWrap: "wrap" } });
            const input = createEl('input', { attrs: { type: 'text', placeholder: 'Enter your API key', id: 'apiKey', required: true, autocomplete: 'on', 'data-lpignore': true }, styles: { display: 'inline-flex', flexGrow: 2, backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '5px', padding: '10px', lineHeight: '14px', marginRight: '8px' } });
            const submit = createEl('button', { attrs: { type: 'submit', id: 'submitApiKey', class: "torn-btn" }, innerHTML: 'Submit', styles: { cursor: 'pointer' } });
            const link = createEl('a', { attrs: { href: 'https://www.torn.com/preferences.php#tab=api', target: '_blank', class: "torn-btn" }, innerHTML: '<p>No Key?</p>', styles: { cursor: 'pointer' } });
            const btnwrap = createEl('div', { children: [submit, link], styles: { display: 'flex', flexGrow: 1 } })
            form.append(input, btnwrap);

            form.addEventListener('submit', async e => {
                e.preventDefault();
                const res = await data.loginHandler(input.value);
                log("%cLOGINN HANDLED %s", logStyle, res);
                res && await SpouseScript.init();
            });

            return createEl('div', {
                attrs: { class: 'msg border-round' }, children: [
                    createEl('p', { innerHTML: 'Use this to set your api key for spouse display', styles: { textAlign: 'center' } }),
                    hrEl(),
                    form
                ]
            });
        };

        #rerenderItems() {
            const targetDiv = $get("#itemDisplay")
            targetDiv.innerHTML = ``;
            // Items
            if (data.filteredItems.length) {
                data.filteredItems.forEach(item => targetDiv.appendChild(createEl('div', { innerHTML: `• ${item.name}-${item.location} -- ${item.quantity}/${item.target || 0}` })));
            } else {
                targetDiv.appendChild(createEl('p', { innerHTML: 'No data available.' }));
            }

        }

        #render(target, contentFn) {
            const targetDiv = $get(target);
            if (!targetDiv) return;
            const wrapper = createEl('div', { attrs: { id: "spouse-script-div", class: 'api-form-wrapper' } });
            const outer = createEl('div', { attrs: { class: 'flex border-round info-msg' }, styles: { alignItems: 'center' } });
            const inner = createEl('div', { attrs: { class: 'delimiter border-round' }, styles: { borderRadius: '5px' }, children: [typeof contentFn === 'function' ? contentFn() : contentFn] });
            outer.appendChild(inner);
            wrapper.appendChild(outer);
            wrapper.appendChild(hrEl());
            targetDiv.prepend(wrapper);
        }

        #toggleShowing() {

        }

        static async init() {
            const existingDiv = $get("#spouse-script-div")
            if (existingDiv) {
                log("%cSpouseScript - init() -SCRIPT ALREADY EXISTED");
                await existingDiv.remove();
            }
            log("%cSpouseScript - init() - SYSTEM %o", logStyle, data.system)
            log("%cSpouseScript - init() -KEY %o", logStyle, data.key)
            log("%cSpouseScript - init() -USER %o", logStyle, data.user)
            log("%cSpouseScript - init() -SPOUSE %o", logStyle, data.spouse)
            log("%cSpouseScript - init() -MERGED %o", logStyle, data.user && data.mergedDisplay)
            log("%cSpouseScript - init() -FILTERS %o", logStyle, data.filters)
            log("%cSpouseScript - init() -FILTERED ITEMS %o", logStyle, data.user && data.filteredItems)
            const a = new SpouseScript();
            const indicator = document.querySelector('h4')?.textContent.trim();
            if (['Mexico', 'Canada', 'Cayman Islands', 'Hawaii', 'United Kingdom', 'Argentina', 'Switzerland', 'Japan', 'China', 'UAE', 'South Africa', 'Traveling', 'Travel Agency'].includes(indicator)) {
                a.#render('div.content-wrapper', data.user ? a.#createSpouseDisplay : a.#createSignInForm);
            }
        }
    }

    await SpouseScript.init();
})();

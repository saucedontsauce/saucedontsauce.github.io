// overides
const log = console.log;
const logStyle = 'background-color: darkblue; color: white; font-style: italic; border: 5px solid hotpink; font-size: 2em;';
const $get = (selector) => document.querySelector(selector);
const $create = (tag) => document.createElement(tag);
function setStyles(el, styles) { Object.assign(el.style, styles); };

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
    { value: "Mexico", icon: `https://flagcdn.com/72x54/mx.png` },
    { value: "Canada", icon: `https://flagcdn.com/72x54/ca.png` },
    { value: "Cayman Islands", icon: `https://flagcdn.com/72x54/ky.png` },
    { value: "Hawaii", icon: `https://flagcdn.com/72x54/us.png` },
    { value: "Argentina", icon: `https://flagcdn.com/72x54/ar.png` },
    { value: "United Kingdom", icon: `https://flagcdn.com/72x54/gb.png` },
    { value: "Switzerland", icon: `https://flagcdn.com/72x54/ch.png` },
    { value: "Japan", icon: `https://flagcdn.com/72x54/jp.png` },
    { value: "China", icon: `https://flagcdn.com/72x54/cn.png` },
    { value: "UAE", icon: `https://flagcdn.com/72x54/ae.png` },
    { value: "South Africa", icon: `https://flagcdn.com/72x54/za.png` }
];
const FILTERDEFAULT = [{ type: "location", value: "Mexico" }, { type: "location", value: "Canada" }, { type: "location", value: "Cayman Islands" }, { type: "location", value: "Hawaii" }, { type: "location", value: "Argentina" }, { type: "location", value: "United Kingdom" }, { type: "location", value: "Switzerland" }, { type: "location", value: "Japan" }, { type: "location", value: "China" }, { type: "location", value: "UAE" }, { type: "location", value: "South Africa" }, { type: "type", value: "Plushie" }, { type: "type", value: "Flower" }, { type: "type", value: "Alcohol" }, { type: "type", value: "Medical" }, { type: "type", value: "Temporary" }, { type: "type", value: "Booster" }, { type: "type", value: "Drug" }]

class Store {
    keykey = "TornApiKey";
    userkey = "user_data";
    spousekey = "user_data";
    filterkey = "filter_data";

    system = { ...SYSTEM };
    controls = [...CONTROLS];
    type = [...TYPE];
    location = [...LOCATION]
    #filterDefault = [...FILTERDEFAULT];

    #keyLocation = "TornApiKey"
    #userLocation = "user_data"
    #spouseLocation = "spouse_data"
    #filterLocation = "filter_data"

    async #get(k) { const val = await GM.getValue(k); return val ? val : false; }
    async #set(k, v) { const val = await GM.setValue(k, v); return val ? val : false; }
    async #delete(key) { try { GM.deleteValue(key); return true; } catch (error) { log("%cError deleting item", logStyle); return false; }; }

    async loginHandler(e) {
        e.preventDefault();

    }

    get mergedDisplay() {
        console.log(this.user)
        let merged = {};
        if (!this.user || !this.system) throw new Error("Incorrect data passed to merge function")
        this.user.display.forEach(i => {
            merged[i.name] = { ...i, ...this.system[i.name] };
            merged[i.name].my_quantity = i.quantity;
            merged[i.name].spouse_quantity = 0;
        });
        if (this.spouse) {
            this.spouse.display.forEach(i => {
                if (merged[i.name]) {
                    merged[i.name] = { ...merged[i.name], spouse_quantity: i.quantity, quantity: merged[i.name].quantity += i.quantity };

                } else {
                    merged[i.name] = { ...i, spouse_quantity: i.quantity, my_quantity: 0 };
                }
            })
        };
        return merged;
    }

    get filteredItems() {
        const locations = this.filters
            .filter(f => f.type === "location")
            .map(f => f.value);

        const types = this.filters
            .filter(f => f.type === "type")
            .map(f => f.value);

        return Object.values(this.mergedDisplay)
            .filter(item => locations.includes(item.location) && types.includes(item.type));
    }

    async #fetchPlayer(key, save, id) {
        log("%cFetching user", logStyle);
        try {
            const data = await fetch(String(`https://api.torn.com/v2/user${id ? "/" + id : ""}?selections=${id ? "display,timestamp" : "profile,display,timestamp"}&key=${key}`));
            const json = await data.json();
            if (json.error) {
                switch (json.error.code) {
                    case 2: { await this.#delete(this.#keyLocation); window.alert(json.error.error); window.location.reload(); break; };
                    default: { log("USER Fetch shit itself"); break; }
                };
            } else {
                this.#set(save, JSON.stringify(json));
                return json;
            };
        } catch (err) {
            await this.#delete(this.#keyLocation);
            log(err);
        };
    };

    async handleFilterChange() {
        await this.#set(this.#filterLocation, this.filters);
        log("%cFILTERS SET LOCALLY", logStyle);
    };

    async #checkData() {
        log("c%CHECKING DATA", logStyle);
        if (!this.key) {
            log("%cNO KEY", logStyle);
        } else {
            if (!this.user) {
                log("%cNO USER", logStyle);
                await this.#fetchPlayer(this.key, this.#userLocation);
            } else {
                const jsonuser = JSON.parse(this.user);
                if ((Date.now() - (jsonuser.timestamp * 1000) > 3600000)) {
                    log("%cOLD USER", logStyle);
                    let usr = await this.#fetchPlayer(this.key, this.#userLocation);
                    this.user = usr
                } else {
                    log("%cUSER VALID", logStyle);
                    this.user = { ...jsonuser };
                };
            };
            if (this.user.married?.spouse_id) {
                if (!this.spouse) {
                    log("%cNO SPOUSE BUT MARRIED", logStyle);
                    await this.#fetchPlayer(this.key, this.#spouseLocation, this.user.married.spouse_id);
                } else {
                    const jsonspouse = JSON.parse(this.spouse);
                    if ((Date.now() - (jsonspouse.timestamp * 1000) > 3600000)) {
                        log("%cOLD SPOUSE", logStyle);
                        let spous = await this.#fetchPlayer(this.key, this.#spouseLocation);
                        this.spouse = spous

                    } else {
                        log("%cSPOUSE VALID", logStyle);
                        this.spouse = { ...jsonspouse };
                    }
                }
            }
            if (!this.filters) {
                this.filters = [...this.#filterDefault];
                this.#set(this.#filterLocation, this.#filterDefault);
            }
        }
    }

    async loginHandler(key) {
        await this.#set(this.#keyLocation, key);
        window.location.reload();
    };

    static async init() {
        const s = new Store();

        s.key = await s.#get(s.#keyLocation);
        s.user = await s.#get(s.#userLocation);
        s.spouse = await s.#get(s.#spouseLocation);
        s.filters = await s.#get(s.#filterLocation);
        await s.#checkData()
        return s;
    }

};
const data = await Store.init();

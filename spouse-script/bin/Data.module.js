class Store {
    keykey = "TornApiKey";
    userkey = "user_data";
    spousekey = "user_data";
    filterkey = "filter_data";

    system = {
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
    }
    controls = [
        {
            value: "types",
            text: "All Types",
            icon: `<svg data-type="control" data-value="types" fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;}</style></defs><title>categories</title><path data-type="control" data-value="types" d="M6.76,6l.45.89L7.76,8H12v5H4V6H6.76m.62-2H3A1,1,0,0,0,2,5v9a1,1,0,0,0,1,1H13a1,1,0,0,0,1-1V7a1,1,0,0,0-1-1H9L8.28,4.55A1,1,0,0,0,7.38,4Z" transform="translate(0 0)"/><path data-type="control" data-value="types" d="M22.76,6l.45.89L23.76,8H28v5H20V6h2.76m.62-2H19a1,1,0,0,0-1,1v9a1,1,0,0,0,1,1H29a1,1,0,0,0,1-1V7a1,1,0,0,0-1-1H25l-.72-1.45a1,1,0,0,0-.9-.55Z" transform="translate(0 0)"/><path data-type="control" data-value="types" d="M6.76,19l.45.89L7.76,21H12v5H4V19H6.76m.62-2H3a1,1,0,0,0-1,1v9a1,1,0,0,0,1,1H13a1,1,0,0,0,1-1V20a1,1,0,0,0-1-1H9l-.72-1.45a1,1,0,0,0-.9-.55Z" transform="translate(0 0)"/><path data-type="control" data-value="types" d="M22.76,19l.45.89L23.76,21H28v5H20V19h2.76m.62-2H19a1,1,0,0,0-1,1v9a1,1,0,0,0,1,1H29a1,1,0,0,0,1-1V20a1,1,0,0,0-1-1H25l-.72-1.45a1,1,0,0,0-.9-.55Z" transform="translate(0 0)"/><rect data-type="control" data-value="types" id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"/></svg>`
        },
        {
            value: "locations",
            text: "All Locations",
            icon: `<svg data-type="control" data-value="locations" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 511.986 511.986" xml:space="preserve">
<g data-type="control" data-value="locations" >
	<g data-type="control" data-value="locations" >
		<g data-type="control" data-value="locations" >
			<path data-type="control" data-value="locations"  d="M170.654,170.652c-35.355,0-64,28.645-64,64c0,35.34,28.65,64,64,64c35.35,0,64-28.66,64-64
				C234.654,199.297,206.009,170.652,170.654,170.652z M170.654,255.986c-11.782,0-21.333-9.554-21.333-21.333
				c0-11.791,9.542-21.333,21.333-21.333s21.333,9.542,21.333,21.333C191.987,246.431,182.436,255.986,170.654,255.986z"/>
			<path data-type="control" data-value="locations"  d="M341.321,63.986c-35.355,0-64,28.645-64,64s28.645,64,64,64s64-28.645,64-64S376.676,63.986,341.321,63.986z
				 M341.321,149.319c-11.791,0-21.333-9.542-21.333-21.333s9.542-21.333,21.333-21.333s21.333,9.542,21.333,21.333
				S353.112,149.319,341.321,149.319z"/>
			<path data-type="control" data-value="locations"  d="M314.046,2.825c-50.626,10.526-90.594,52.553-98.965,103.758c-0.421,2.56-0.751,5.122-1.01,7.683
				c-21.626-7.8-45.835-9.955-70.7-4.776c-50.637,10.554-90.596,52.563-98.965,103.758c-4.638,28.395,0.042,56.452,12.934,80.91
				c2.981,5.665,5.474,10.347,10.755,20.223l0.852,1.594c19.541,36.545,28.265,53.879,37.153,75.197l44.862,107.685
				c7.293,17.505,32.091,17.506,39.385,0.002l48.619-116.672c8.674-20.841,17.38-37.76,36.947-73.291l0.917-1.666
				c2.573-4.672,3.955-7.185,5.344-9.719l39.464,94.685c7.295,17.504,32.093,17.501,39.385-0.005l48.597-116.672
				c8.674-20.807,17.295-37.558,36.958-73.296l0.679-1.233c3.219-5.85,4.646-8.448,6.445-11.74
				c10.199-18.615,15.628-39.566,15.628-61.262C469.329,46.958,395.146-14.067,314.046,2.825z M239.456,286.646l-0.918,1.667
				c-20.303,36.867-29.503,54.747-38.961,77.47l-28.92,69.401l-25.174-60.427c-9.585-22.99-18.735-41.171-38.911-78.902
				l-0.853-1.594c-5.237-9.794-7.699-14.416-10.629-19.985c-8.596-16.308-11.709-34.973-8.577-54.148
				c5.53-33.829,32.258-61.928,65.56-68.869c26.85-5.593,52.465,1.449,71.548,16.497c0.198,0.173,0.387,0.355,0.592,0.521
				c17.708,14.319,28.983,34.891,31.321,57.555c0.041,0.409,0.087,0.815,0.123,1.226c0.013,0.146,0.022,0.293,0.034,0.44
				c0.186,2.268,0.285,4.564,0.292,6.885c-0.008,0.25-0.018,0.567-0.03,0.997c0,0.17,0.011,0.338,0.015,0.508
				c-0.199,14.037-3.775,27.514-10.36,39.564C243.9,278.573,242.549,281.03,239.456,286.646z M416.273,168.767
				c-1.785,3.265-3.19,5.823-6.399,11.655l-0.679,1.234c-20.394,37.067-29.5,54.76-38.96,77.451l-28.913,69.414l-25.188-60.431
				c-4.934-11.846-10.481-23.729-17.548-37.843c-0.076-2.222-0.211-4.434-0.4-6.633c-0.057-0.676-0.129-1.347-0.197-2.019
				c-0.04-0.394-0.075-0.789-0.119-1.182c-3.491-31.877-18.568-59.878-40.723-80.124c-1.402-9.021-1.422-17.938,0.036-26.802
				c5.536-33.86,32.267-61.97,65.553-68.89c54.498-11.352,103.924,29.307,103.924,83.391
				C426.663,142.475,423.059,156.381,416.273,168.767z"/></g></g></g></svg>`}
    ]
    types = [{ value: "Plushie", icon: "" }, { value: "Flower", icon: "" }, { value: "Temporary", icon: "" }, { value: "Drug", icon: "" }, { value: "Booster", icon: "" }];
    locations = [
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
    #filterDefault = [{ type: "location", value: "Mexico" }, { type: "location", value: "Canada" }, { type: "location", value: "Cayman Islands" }, { type: "location", value: "Hawaii" }, { type: "location", value: "Argentina" }, { type: "location", value: "United Kingdom" }, { type: "location", value: "Switzerland" }, { type: "location", value: "Japan" }, { type: "location", value: "China" }, { type: "location", value: "UAE" }, { type: "location", value: "South Africa" }, { type: "type", value: "Plushie" }, { type: "type", value: "Flower" }, { type: "type", value: "Temporary" }, { type: "type", value: "Booster" }, { type: "type", value: "Drug" }];

    #keyLocation = "TornApiKey"
    #userLocation = "user_data"
    #spouseLocation = "user_data"
    #filterLocation = "filter_data"

    async #get(k) { const val = await GM.getItem(k); return val ? val : false; }
    async #set(k, v) { const val = await GM.setItem(k, v); return val ? val : false; }
    async #delete(key) { try { GM.deleteValue(key); return true; } catch (error) { log("%cError deleting item", logStyle); return false; }; }

    async loginHandler(e) {
        e.preventDefault();

    }

    get mergedDisplay() {
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

        return this.merged;
    }

    async #fetchPlayer(key, id) {
        log("%cFetching user", logStyle);
        try {
            const data = await fetch(String(`https://api.torn.com/v2/user${id ? "/" + id : ""}?selections=${id ? "display,timestamp" : "profile,display,timestamp"}&key=${key}`));
            const json = await data.json();
            if (json.error) {
                switch (json.error.code) {
                    case 2: {
                        await this.#delete(this.#keyLocation);
                        window.alert(json.error.error);
                        window.location.reload();
                        break;
                    };
                    default: {
                        log("USER Fetch shit itself");
                        break
                    }
                };
            } else {
                return json
            };
        } catch (err) {
            await this.#delete(this.#keyLocation);
            log(err);
        };
    };

    async #checkData() {
        log("c%Checking Data", logStyle);

    }

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
const data = Store.init();

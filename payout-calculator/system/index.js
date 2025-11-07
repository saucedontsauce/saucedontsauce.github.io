import { Alert } from './alert/index.js'


class System {
    error(msg) {
        document.getElementById("alert").replaceWith(Alert(msg, "error"))
    }
    success(msg) {
        document.getElementById("alert").replaceWith(Alert(msg, "success"))
    }
    warning(msg) {
        document.getElementById("alert").replaceWith(Alert(msg, "warning"))
    }
    async init(key) {
        console.log("Initializing System...");
        if (!key) throw new Error("API Key is required to initialize the system");
        this.apiKey = key;
        const response = await fetch(`https://api.torn.com/faction?selections=basic,rankedwars,timestamp&key=${key}`);
        if (!response.ok) {
            localStorage.removeItem("apiKey");
            console.log("Failed to fetch faction data:", response.statusText);
            throw new Error("Failed to fetch faction data");
        };
        this.factionData = await response.json();
        if (this.factionData.error) {
            localStorage.removeItem("apiKey");
            console.log("Problem with faction data received:", this.factionData.error.error);
            throw new Error(this.factionData.error.error);
        }
        Object.entries(this.factionData.rankedwars).forEach(([k, v]) => {
            const warid = k;
            console.log(v);
            const opps = Object.values(v.factions).find(f => f.ID !== this.factionData.basic.ID);
            console.log(opps);
            console.log(warid);

        })
        this.success("System Initialized with API Key");
        console.log("System Initialized with API Key:", key);
    }
}

export { System }
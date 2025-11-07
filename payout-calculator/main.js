import { System } from "./system/index.js";

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

(async function () {
    const apiKey = localStorage.getItem("apiKey");
    const sys = new System()


    try {
        apiKey !== null ? (() => {
            console.log("api key is :", apiKey);
            sys.init(apiKey);


        })() : (() => {
            console.log("No API key found");
            document.getElementById("apiKeyModal").style.display = "flex";
            document.getElementById("apiKeyModal").addEventListener("submit", (event) => {
                event.preventDefault();
                const inputKey = document.getElementById("apiKeyInput").value;
                if (inputKey) {
                    localStorage.setItem("apiKey", inputKey);
                    sys.init(inputKey);
                    document.getElementById("apiKeyModal").style.display = "none";
                }
                window.location.reload();
            });

        })();

        sys.success("Script Loaded Successfully");
    } catch (err) {
        window.alert(err.message);
        sys.error("Script Load Failed")
    }

    console.log("Main Script loaded!");
})();
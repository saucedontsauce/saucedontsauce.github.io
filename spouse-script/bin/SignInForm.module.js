
function createSignInForm() {
    function form() {
        function keyinput() { const ki = $create("input"); ki.setAttribute('type', 'text'); ki.setAttribute('placeholder', 'Enter your API key'); ki.setAttribute('id', 'apiKey'); ki.setAttribute('required', 'true'); ki.setAttribute("data-lpignore", "true"); ki.setAttribute("autocomplete", "off"); ki.style.backgroundColor = "white"; ki.style.border = "1px solid"; ki.style.borderRadius = "5px"; ki.style.backgroundImage = "linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)"; ki.style.padding = "10px"; ki.style.lineHeight = "14px"; ki.style.marginRight = "8px"; ki.style.borderColor = "#ddd"; return ki; };
        function button() { const ks = $create("button"); ks.setAttribute('type', 'submit'); ks.setAttribute('id', 'submitApiKey'); ks.setAttribute('aria-label', 'submitApibutton'); ks.setAttribute('i-data', 'submitApibutton'); ks.textContent = 'Submit'; ks.className = 'torn-btn'; return ks; };
        function link() {
            const lin = $create("a");
            lin.href = "https://www.torn.com/preferences.php#tab=api";
            lin.target = "_blank";
            lin.innerHTML = '<p>Need a key?</p>';
            lin.className = "torn-btn";
            return lin
        };

        const f = $create("form");
        setStyles(f, {
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: "1rem"
        });

        f.addEventListener('submit', async (e) => {
            e.preventDefault();
            log('form submitted: %s', $get("#apiKey").value);
            await GMSet("TornApiKey", $get("#apiKey").value);
            window.location.reload();
        });

        const inputDiv = keyinput();
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
};

//call like renderBox(target,fn)

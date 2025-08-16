log("%cloading SignUpForm.module.js", logStyle);

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

//leave this here
log("%cSignUpForm.module.js loaded", logStyle);

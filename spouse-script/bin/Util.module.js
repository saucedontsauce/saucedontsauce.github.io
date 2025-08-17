function setStyles(el, styles) {
    Object.assign(el.style, styles);
}
function mergeUTIL(user, spouse, data) {
    let merged = {};
    if (data) return null
    user.display.forEach(i => {
        //console.log({...dd[i.name]})
        merged[i.name] = { ...i, ...data[i.name] };
        merged[i.name].my_quantity = i.quantity;
        merged[i.name].spouse_quantity = 0;
    });
    if (spouse) {
        spouse.display.forEach(i => {
            if (merged[i.name]) {
                merged[i.name] = { ...merged[i.name], spouse_quantity: i.quantity, quantity: merged[i.name].quantity += i.quantity };

            } else {
                merged[i.name] = { ...i, spouse_quantity: i.quantity, my_quantity: 0 };
            }
        })
    };
    return merged;
};

function filterUTIL(filters, merged) {

    return merged
}

// FETCH FUNCTIONS //
async function fetchUserUTIL(key) {
    log("%cFetching user", logStyle);
    try {
        const data = await fetch(String(`https://api.torn.com/v2/user?selections=profile,display,timestamp&key=${key}`));
        const json = await data.json();
        if (json.error) {
            switch (json.error.code) {
                case 2: {
                    await GMDelete("TornApiKey");
                    window.alert(json.error.error);
                    window.location.reload();
                    break;
                };
                default: {
                    console.log("Fetch shit itself");
                    break
                }
            };
        } else {
            return json
        };
    } catch (err) {
        await GMDelete("TornApiKey");
        log(err);
    };
};
async function fetchSpouseUTIL(key, id) {
    log("%cFetching spouse", logStyle);
    try {
        const data = await fetch(String(`https://api.torn.com/v2/user/${id}?selections=display,timestamp&key=${key}`));
        const json = await data.json();
        if (json.error) {
            switch (json.error.code) {
                case 2: {
                    await GMDelete("TornApiKey");
                    window.alert(json.error.error);
                    window.location.reload();
                    break;
                };
                default: {
                    console.log("Fetch shit itself");
                    break
                }
            };
        } else {
            return json
        };
    } catch (err) {
        await GMDelete("TornApiKey");
        log(err)
    }
};


function renderBox(target, fnOrEl) {
    log("%cRendering box", logStyle);
    let targetDiv = $get(target);

    if (!targetDiv) return;

    log("%cTARGET FOUND", logStyle);

    const jubwr = $create("div");
    jubwr.className = "api-form-wrapper";

    const outerWrap = $create("div");
    outerWrap.className = "flex border-round info-msg";
    outerWrap.style.alignItems = "center";

    const innerWrap = $create("div");
    innerWrap.className = "delimiter border-round";
    innerWrap.style.borderRadius = "5px";

    // 🔑 Normalize argument
    let item;
    if (typeof fnOrEl === "function") {
        item = fnOrEl(); // call the function
    } else {
        item = fnOrEl; // assume it's already a DOM node
    }

    if (!(item instanceof HTMLElement)) {
        console.warn("renderBox expected a DOM node but got:", item);
        return; // bail early
    }

    innerWrap.appendChild(item);
    outerWrap.appendChild(innerWrap);
    jubwr.appendChild(outerWrap);

    const hrr = hr();
    jubwr.appendChild(hrr);

    targetDiv.prepend(jubwr);
}


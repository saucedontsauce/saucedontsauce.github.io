log("%cloading Util.module.js", logStyle);

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
        log(data);
        const json = await data.json();
        log(json);
        if (json.error.code == 2) {
            await GMDelete("TornApiKey");
            window.alert(json.error.error);
            window.location.replace(window.location.href);
            throw json.error.error
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
        log(json);
        if (json.error.code == 2) {
            await GMDelete("TornApiKey");
            window.alert(json.error.error);
            window.location.replace(window.location.href);
            throw json.error.error
        } else {
            return json
        };
    } catch (err) {
        await GMDelete("TornApiKey");
        log(err)
    }
};

//leave this here
log("%cUtil.module.js loaded", logStyle);

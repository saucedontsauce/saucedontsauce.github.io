async function checkData(key, user, spouse) {
    if (!key) {
        log("%cNo key present", logStyle);
    }
    if (!user) {
        log("%cNo local user data present", logStyle);
        const newUserData = await fetchUserUTIL(key);
        user = newUserData;
        GMSet('user_data', JSON.stringify(newUserData))
    } else {
        const jsonuser = user;
        if (((jsonuser.timestamp * 1000) - 21600 <= Date.now()) || jsonuser.error) {
            const newUserData = await fetchUserUTIL(key);
            GMSet('user_data', JSON.stringify(newUserData));
        } else {
            log(jsonuser);
            log("%cLocal user data present and valid", logStyle);
            user = { ...jsonuser };
        };
    };
    if (!spouse && user?.married?.spouse_id) {
        log("%cHas spouse but no data", logStyle);
        const newSpouseData = await fetchSpouseUTIL(key, user.married.spouse_id);
        spouse = newSpouseData; GMSet('spouse_data', JSON.stringify(newSpouseData));
    } else {
        const jsonspouse = spouse;
        if (((jsonspouse.timestamp * 1000) - 21600 <= Date.now()) || jsonspouse.error) {
            const newSpouseData = await fetchSpouseUTIL(key, user.married.spouse_id);
            spouse = newSpouseData;
            GMSet('spouse_data', JSON.stringify(newSpouseData));
        } else {
            log(jsonspouse);
            log("%cLocal spouse data present and valid", logStyle);
            spouse = { ...jsonspouse };
        }
    };
};
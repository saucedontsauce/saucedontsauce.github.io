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
        if ((Date.now() - (jsonuser.timestamp * 1000) > 3600000) || jsonuser.error) {
            log("%cold data", logStyle);
            const newUserData = await fetchUserUTIL(key);
            GMSet('user_data', JSON.stringify(newUserData));
        } else {
            log("%cLocal user data present and valid", logStyle);
            user = { ...jsonuser };
        };
    };
    if (!spouse && user?.married?.spouse_id || !spouse) {
        log("%cHas spouse but no data", logStyle);
        const newSpouseData = await fetchSpouseUTIL(key, user.married.spouse_id);
        spouse = newSpouseData; GMSet('spouse_data', JSON.stringify(newSpouseData));
    } else {
        const jsonspouse = spouse;
        if ((Date.now() - (jsonspouse.timestamp * 1000) > 3600000) || jsonspouse.error) {
            log("%cold data", logStyle)
            const newSpouseData = await fetchSpouseUTIL(key, user.married.spouse_id);
            spouse = newSpouseData;
            GMSet('spouse_data', JSON.stringify(newSpouseData));
        } else {
            log("%cLocal spouse data present and valid", logStyle);
            spouse = { ...jsonspouse };
        }
    };
};
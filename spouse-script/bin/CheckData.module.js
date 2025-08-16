async function checkData(user, spouse) {
    if (!user) {
        log("%cNo local user data present", logStyle);
        const newUserData = await fetchUserUTIL();
        user = newUserData;
        GMSet('user_data', JSON.stringify(newUserData))
    } else {
        const jsonuser = user;
        if (Math.floor((jsonuser.timestamp * 1000) - 21600) <= Date.now() || jsonuser.error) {
            const newUserData = await fetchUserUTIL();
            GMSet('user_data', JSON.stringify(newUserData));
        } else {
            log("%cLocal user data present and valid", logStyle);
            user = { ...jsonuser };
        };
    };
    if (!spouse && user?.married?.spouse_id) {
        log("%cHas spouse but no data", logStyle);
        const newSpouseData = await fetchSpouseUTIL(user.married.spouse_id);
        spouse = newSpouseData; GMSet('local_spouse', JSON.stringify(newSpouseData));
    } else {
        const jsonspouse = spouse;
        if (Math.floor((jsonspouse.timestamp * 1000) - 21600) <= Date.now() || jsonspouse.error) {
            const newSpouseData = await fetchSpouseUTIL(user.married.spouse_id);
            spouse = newSpouseData;
            GMSet('local_spouse', JSON.stringify(newSpouseData));
        } else {
            log("%cLocal spouse data present and valid", logStyle);
            spouse = { ...jsonspouse };
        }
    };
};
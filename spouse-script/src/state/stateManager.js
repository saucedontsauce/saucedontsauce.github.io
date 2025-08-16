
import { fetchJSON } from "../util/util.js";
import { pages, navContent } from "./pages.js";
var myKey;
var myData;
var spouseData;
var mergedDisplay;
var spouseShown;
var typeFilter;
var emptyFilter;
var items;
//      functions
const stateManager = async () => {
    //console.log("--STATE-MANAGER--");
    myKey = await loadMyKey();
    myData = await loadMyData();

    if (myKey && !myData || myData?.timestamp <= (Math.floor(Date.now() / 1000) - 900)) {
        try {
            if (!items) {
                const response = await fetchJSON('./src/state/items.json');
                setItems(response)
                items = response;
            }
            const data = await fetchJSON(`https://api.torn.com/user/?selections=profile,display,timestamp&key=${myKey}&comment=tornAIDS`);
            setMyData(data);
            myData = data; // Update local myData after setting
            if (document.getElementById('logo-icon')) { document.getElementById('logo-icon').href = myData.profile_image };
            if (document.getElementById('nav-title')) { document.getElementById('nav-title').textContent = myData.name };
            console.log(myData);
            if (myData?.married?.spouse_id) { // spouse detected
                const spousedataFetched = await fetchJSON(`https://api.torn.com/user/${myData.married.spouse_id}?selections=profile,display,timestamp&key=${myKey}&comment=tornAIDS`);
                console.log(spousedataFetched);
                setSpouseData(spousedataFetched);
                spouseData = spousedataFetched; // Update local spouseData after setting
            }
            mergedDisplay = await mergeDisplays();
            spouseShown = await checkSpouseShown();
            emptyFilter = await checkEmptyFilter();
            typeFilter = await checktypeFilter();
            !items && (items = getItems())

        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    } else if (myData) {
        items = getItems()
        spouseData = loadSpouseData();
        mergedDisplay = await mergeDisplays();
        spouseShown = await checkSpouseShown();
        emptyFilter = await checkEmptyFilter();
        typeFilter = await checktypeFilter();
    };
}
////          key state
const setMyKey = (value) => {
    localStorage.setItem("my_key", value);
    myKey = value
};
const loadMyKey = () => {
    const key = localStorage.getItem("my_key");
    return key;
}
////          myData 
const setMyData = (value) => {
    localStorage.setItem("my_data", JSON.stringify(value));
    myData = value;
};
const loadMyData = () => {
    const data = localStorage.getItem('my_data');
    return data ? JSON.parse(data) : null;
};
////          spouseData 
const setSpouseData = (value) => {
    localStorage.setItem("spouse_data", JSON.stringify(value));
    spouseData = value;
};
const loadSpouseData = () => {
    const data = localStorage.getItem('spouse_data');
    return data ? JSON.parse(data) : null;
};
////          merge displays
const mergeDisplays = () => {
    var merged = {};
    for (const key in myData.display) {
        merged[myData.display[key].ID] = { ...myData.display[key] }
    }
    for (const key in spouseData.display) {
        if (merged[spouseData.display[key].ID]) {
            merged[spouseData.display[key].ID].quantity += spouseData.display[key].quantity
        } else {
            merged[spouseData.display[key].ID] = spouseData.display[key]
        }
    }
    return merged;
};

////             shouse shown
const checkSpouseShown = () => {
    return localStorage.getItem("spouse_shown");
};
const setSpouseShown = async (value) => {
    localStorage.setItem("spouse_shown", value);
    spouseShown = value;
}

const setEmptyFilter = (value) => {
    localStorage.setItem("empty_filter", value)
    emptyFilter = value
}
const setTypeFilter = (value) => {
    localStorage.setItem('type_filter', value);
    typeFilter = value
}
const checkEmptyFilter = () => {
    return localStorage.getItem('empty_filter');
}
const checktypeFilter = () => {
    return localStorage.getItem('type_filter')
}

const setItems = (value) => {
    localStorage.setItem("items", JSON.stringify(value));
    items = value;
};
const getItems = () => {
    const data = localStorage.getItem('items');
    return data ? JSON.parse(data) : null;
}
// export
export {
    stateManager,
    myKey, setMyKey,
    myData, setMyData,
    spouseData, setSpouseData,
    mergedDisplay, items,
    spouseShown, setSpouseShown,
    pages, navContent,
    typeFilter, emptyFilter,
    setTypeFilter, setEmptyFilter
}
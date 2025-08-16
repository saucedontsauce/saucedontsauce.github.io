
const divMap = {
    "rootDiv": document.getElementById('root'),
    "navLinkWrap": document.getElementById('nav-link-wrap'),
    "navTitle": document.getElementById("nav-title"),
    "myDataFields": document.getElementsByClassName("myData"),
    "apiKeyField": document.getElementById('apikeyfield'),
    "apiKeyInput": document.getElementById('apikey'),
    "apiNotification": document.getElementById('apiNotification'),
    "apiNotificationPopup": document.getElementById('notificationPopup'),
    "closeApiPopup": document.getElementById('closePopup'),
    "apiKeyLink": document.getElementById('apiKeyLink'),
    "notificationBadgeCount": document.getElementById('badgeCount'),
    "mobileMenuButton": document.querySelector('.mobile-menu-btn'),
    "navLinks": document.querySelector('.nav-links'),
    "navTitle": document.getElementById("nav-title"),
    "navIcon": document.getElementById("logo-icon"),
    "displaycase": document.getElementById("itemsContainer"),
    "displayspouse": document.getElementsByName("spouse-status"),
    "displayspouseheader": document.getElementById("display-spouse-head"),
    "displaytotalheader": document.getElementById("display-total-head"),
    "displayhead": document.getElementById("display-head"),
    "solooption": document.getElementById("solo-option"),
    "spouseoption": document.getElementById("spouse-option"),
    "homehero": document.getElementById("home-hero"),
    "navLinkHolder": document.getElementById("navlink-holder")
};

async function fetchJSON(url) {
    return fetch(url)
        .then(response => response.json())
        .catch((error) => {
            console.log(error);
        });
}

async function mergeObj(obj1, obj2) {
    var merged = { ...obj1 };
    for (var key in obj2) {
        if (obj2.hasOwnProperty(merged[key])) {
            if (merged.hasOwnProperty(merged[key])) {
                merged[key] += obj2[key];
            } else {
                merged[key] = obj2[key];
            }
        }
    }
    return merged;
}



export { divMap, fetchJSON, mergeObj }

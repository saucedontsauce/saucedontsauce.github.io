import { navContent, footerContent } from '../state/pages.js';
import { divMap } from '../util/util.js';
import { items, myData, spouseData, mergedDisplay, pages, spouseShown, stateManager } from '../state/stateManager.js'
import addApiInputListeners from './listeners/apiKeyPopupListener.js';
import addNavListeners from './listeners/addNavListeners.js';
import addSpouseToggleListeners from './listeners/addSpouseToggleListeners.js';
import addFilterListeners from './listeners/addFilterListeners.js';

const renderManager = async () => {
    //console.log('--RENDER-MANAGER--');
    await stateManager();

    document.getElementById("logo-icon") && (document.getElementById("logo-icon").src = myData?.profile_image);
    document.getElementById("nav-title") && (document.getElementById("nav-title").textContent = myData?.name);

    if (mergedDisplay && Object.keys(mergedDisplay).length !== 0) {// data present
        renderDisplayCase()
    } else {
        const itemdisplay = document.getElementById("itemsContainer");
        if (itemdisplay) {
            itemdisplay.innerHTML = '<tr><td colspan="6">No items to display.</td></tr>';
        }
        if (document.getElementById("travel-spinner")) {
            document.getElementById("travel-spinner").remove();
        }
    };
};
const buildNavLinks = async () => {
    var pagelinks = ''
    Object.keys(pages).map(page => {
        pagelinks += `<li><a href='${pages[page].link}'>${pages[page].name}</a> </li>`
    });
    return pagelinks
};
function renderShell() {
    //console.log('--RENDER-SHELL--');
    const root = divMap.rootDiv;
    const nav = document.createElement("nav");

    nav.id = "nav";
    nav.className = "navbar";
    nav.innerHTML = navContent;
    root.appendChild(nav);

    buildNavLinks().then((links) => {
        const navlinkholder = document.getElementById("navlink-holder")
        if (navlinkholder) {
            navlinkholder.innerHTML = links;
        }
    });

    const footer = document.createElement("footer");
    footer.innerHTML = footerContent;
    root.innerHTML = "";

    root.appendChild(nav);

    Object.keys(pages).map(page => {
        var div = document.createElement("section");
        div.className = "hero"
        div.id = pages[page].link
        div.innerHTML = pages[page].html
        root.appendChild(div);
    });

    // Add buttons to home-hero
    const homeHero = document.getElementById('home-hero');
    if (homeHero) {
        for (var i in pages) {
            var div = document.createElement('a');
            div.href = `#${i}`;
            div.className = 'btn spaceeven';
            div.innerHTML = `${pages[i]?.name}`;
            homeHero.appendChild(div);
        }
    }




    // Set initial state for spouse toggle
    const soloOption = document.getElementById("solo-option");
    const spouseOption = document.getElementById("spouse-option");
    if (soloOption && spouseOption) {
        if (spouseShown === 'true') { // Compare with string 'true'
            spouseOption.checked = true;
        } else {
            soloOption.checked = true;
        }
    }


    root.appendChild(footer);





    addApiInputListeners();
    addSpouseToggleListeners();
    addNavListeners();
    addFilterListeners();
    return true;
};

function renderDisplayCase() {
    const itemdisplay = document.getElementById("itemsContainer");
    const displayhead = document.getElementById("display-head");
    let displayspouseheader = document.getElementById("display-spouse-head");
    let displaytotalheader = document.getElementById("display-total-head")
    const filterboxes = document.querySelectorAll('.filter-item input');
    const showEmpty = document.getElementById("showEmpty").checked

    if (!itemdisplay || !displayhead) {
        console.warn("Required display elements not found.");
        return;
    };

    var mtotal = 0;
    var stotal = 0;
    var combinedTotal = 0;

    var filters = [];
    filterboxes.forEach(box => {
        if (box.checked) {
            filters.push(box.value);
        }
    })

    var myDisplayData = {};
    if (myData && myData.display) {
        myData.display.forEach(item => {
            myDisplayData[item.ID] = item;
            mtotal += item.quantity;
        });
    }
    var spouseDisplayData = {};
    if (spouseData && spouseData.display) {
        spouseData.display.forEach(item => {
            spouseDisplayData[item.ID] = item;
            stotal += item.quantity;
        });
    };
    itemdisplay.innerHTML = ''; // Clear previous content
    const travelSpinner = document.getElementById("travel-spinner");
    if (travelSpinner) {
        travelSpinner.remove();
    }

    const filteredItems = {};
    for (const id in items) {
        if (items.hasOwnProperty(id) && filters.includes(items[id].type)) {
            if (spouseShown === 'true') {
                if (!showEmpty && myDisplayData[id]?.quantity || spouseDisplayData[id]?.quantity) {
                    filteredItems[id] = items[id];
                } if (showEmpty) {
                    filteredItems[id] = items[id];
                }
            } else {
                if (!showEmpty && myDisplayData[id]?.quantity) {
                    filteredItems[id] = items[id];
                } if (showEmpty) {
                    filteredItems[id] = items[id];
                }
            }
        }
    }
    if (spouseShown === 'true') { // Compare with string 'true'
        if (!displayspouseheader) {
            displayspouseheader = document.createElement("th");
            displayspouseheader.id = "display-spouse-head";
            displayspouseheader.textContent = "Spouse";
            displayhead.appendChild(displayspouseheader);
        }
        if (!displaytotalheader) {
            displaytotalheader = document.createElement("th");
            displaytotalheader.id = "display-total-head";
            displaytotalheader.textContent = "Total";
            displayhead.appendChild(displaytotalheader);
        }
    } else {
        if (displayspouseheader) {
            displayspouseheader.remove();
        }
        if (displaytotalheader) {
            displaytotalheader.remove();
        }
    };

    for (const key in filteredItems) {
        if (filteredItems.hasOwnProperty(key)) {
            const item = filteredItems[key];
            const myQuantity = myDisplayData[key] && myDisplayData[key]?.quantity || 0;
            const spouseQuantity = spouseDisplayData[key] && spouseDisplayData[key]?.quantity || 0;
            const mergedQuantity = mergedDisplay[key] && mergedDisplay[key]?.quantity || 0; // Use mergedDisplay
            const row = document.createElement('tr');
            let rowHtml = `
                <td class="item-name">${item.name}</td>
                <td>
                    <img src="${item.image}" alt="${item.name}" class="item-img">
                </td>
                <td class="location">${item.location || 'N/A'}</td>
                <td>${myQuantity}</td>
            `;
            if (spouseShown === 'true') {
                rowHtml += `
                <td class="s${key}">${spouseQuantity}</td>
                    <td class="total">${mergedQuantity}</td>
                             `;
                combinedTotal += mergedQuantity; // Accumulate total for merged display
            } else {
                combinedTotal += myQuantity; // Accumulate total for solo display
            }
            row.innerHTML = rowHtml;
            itemdisplay.appendChild(row);
        }
    };

    const cap = document.createElement("tr");
    let capHtml = `
        <td class="item-name"></td>
        <td class="item-name"></td>
        <td class="item-name">Total:</td>
        <td class="item-name">${mtotal}</td>
    `;
    if (spouseShown === 'true') {
        capHtml += `
            <td class="item-name">${stotal}</td>
            <td class="item-name">${combinedTotal}</td>
        `;
    };

    cap.innerHTML = capHtml;
    itemdisplay.appendChild(cap);

};

export { renderManager, renderShell, renderDisplayCase }
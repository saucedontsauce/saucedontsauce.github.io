function setStyles(el, styles) {
    Object.assign(el.style, styles);
}

function filterUTIL(filters, merged) {

    return merged
}

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


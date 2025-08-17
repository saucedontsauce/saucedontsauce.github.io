function createSpouseDisplay(filteredItems = []) {
    console.log("%ccreating spouse display", logStyle);

    const wrapper = $create("div");
    wrapper.className = "msg border-round";
    wrapper.style.width = "auto";

    const title = $create("p");
    title.textContent = "Spouse display:";
    wrapper.appendChild(title);

    const hr1 = $create("hr");
    hr1.className = "page-head-delimiter m-top10 m-bottom10";
    hr1.style.borderRadius = "5px";
    wrapper.appendChild(hr1);

    if (filteredItems.length) {
        filteredItems.forEach(item => {
            const el = $create("div");
            el.textContent = `• ${item}`;
            wrapper.appendChild(el);
        });
    } else {
        const empty = $create("p");
        empty.textContent = "No spouse data available.";
        wrapper.appendChild(empty);
    }

    return wrapper;
}

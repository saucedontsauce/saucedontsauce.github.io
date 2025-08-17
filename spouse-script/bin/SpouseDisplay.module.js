function createSpouseDisplay(filteredItems = []) {
    console.log("%ccreating spouse display", logStyle);

    const wrapper = $create("div");
    wrapper.className = "msg border-round";
    wrapper.style.width = "auto";

    const filterheader = $create("p");
    filterheader.textContent = "Filters";
    wrapper.appendChild(filterheader);



    const hr1 = $create("hr");
    hr1.className = "page-head-delimiter m-top10 m-bottom10";
    hr1.style.borderRadius = "5px";
    wrapper.appendChild(hr1);

    const displayheader = $create("p");
    displayheader.textContent = "Items";
    wrapper.appendChild(displayheader);
    if (filteredItems.length) {
        filteredItems.forEach(item => {
            const el = $create("div");
            el.textContent = `• ${item.name}-${item.location}  -- ${item.quantity}/${item.target}`;
            wrapper.appendChild(el);
        });
    } else {
        const empty = $create("p");
        empty.textContent = "No data available.";
        wrapper.appendChild(empty);
    }

    return wrapper;
}

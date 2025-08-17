function createSpouseDisplay(filteredItems = []) {
    console.log("%ccreating spouse display", logStyle);
    const wrapper = $create("div");
    wrapper.className = "msg border-round";
    wrapper.style.width = "auto";
    // list
    const filterheader = $create("p");
    filterheader.textContent = "Filters";
    wrapper.appendChild(filterheader);

    function toggleFilter(id) {
        var div = $get("#" + id);

    }

    function filterBtnHandler(e) {
        const type = e.target.type;
        const value = e.target.value;
        switch (type) {
            case "control": {
                switch (value) {
                    case "types": {

                    };
                    case "locations": {

                    }
                    default: {
                        log("%cfilterBtnHandler control Shit itself", logStyle);
                        break;
                    }
                };
                break;
            };
            default: {
                log("%cfilterBtnHandler Shit itself", logStyle)
                break;
            }
        };
    };

    const filterrow0 = filterRow();
    [{ value: "types", text: "All Types" }, { value: "locations", text: "All Locations" }].forEach((ob) => {
        const btn = $create("div");
        btn.type = "control";
        btn.value = ob.value;
        btn.title = ob.value
        btn.addEventListener("click", filterBtnHandler);
        setStyles(btn, {
            height: "50px",
            width: "50px",
            borderRadius: '50%',
            borderWidth: "3px",
        });
        filterrow0.appendChild(btn);
    });
    wrapper.appendChild(filterrow0);


    // break
    const hr1 = $create("hr");
    hr1.className = "page-head-delimiter m-top10 m-bottom10";
    hr1.style.borderRadius = "5px";
    wrapper.appendChild(hr1);
    //header
    const displayheader = $create("p");
    displayheader.textContent = "Items";
    wrapper.appendChild(displayheader);
    //list
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

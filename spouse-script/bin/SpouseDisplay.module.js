function createSpouseDisplay(filteredItems = []) {
    console.log("%ccreating spouse display", logStyle);
    const wrapper = $create("div");
    wrapper.className = "msg border-round";
    setStyles(wrapper, {
        width: "auto",
        rowGap: "8px"
    });
    // filter lists
    const filterheader = $create("p");
    filterheader.textContent = "Filters";
    setStyles(filterheader, {
        padding: ".5rem",
        display: "flex",
        fontWeight: 600,
        justifyContent: "center",
        alignItems: "center"
    });
    wrapper.appendChild(filterheader);

    function toggleFilterStatus(target) {
        var div = $get("#" + target.dataset.type + target.dataset.value);
        if (div.dataset.active === "true") {
            div.style.border = "2px solid grey";
            div.dataset.active = "false";
        } else {
            div.style.border = "3px solid #22dd22";
            div.dataset.active = "true";
        }
    }



    function filterBtnHandler(e) {

        const type = e.target.dataset.type;
        const value = e.target.dataset.value;
        switch (type) {
            case "control": {
                switch (value) {
                    case "types": {
                        log("%ctypes control", logStyle);
                        toggleFilterStatus(e.target);
                        const catset = e.target.dataset.active
                        data.types.forEach((type) => {
                            if (filters.indexOf(type) >= 0) {
                                if (!catset) {
                                    filters.slice(filters.indexOf(type), 1);
                                }
                            } else {
                                if (catset) {
                                    filters.push(type);
                                }
                            };
                        });
                        break;
                    };
                    case "locations": {
                        log("%clocations control", logStyle);
                        toggleFilterStatus(e.target);
                        const catset = e.target.dataset.active;
                        data.locations.forEach((location) => {
                            if (filters.indexOf(location) >= 0) {
                                if (!catset) {
                                    filters.slice(filters.indexOf(location), 1);
                                }
                            } else {
                                if (catset) {
                                    filters.push(location);
                                }
                            }
                        })
                        break;
                    }
                    default: {
                        log("%cfilterBtnHandler control Shit itself", logStyle);
                        break;
                    }
                };
                break;
            };
            case "locations": {
                toggleFilterStatus(e.target);
                if (e.target.dataset.active === "true") {

                };
                break;
            }
            default: {
                log("%cfilterBtnHandler Shit itself", logStyle)
                break;
            }
        };

        console.log("%cFilters Updated: %o", logStyle, data.filters);
    };

    const filterrow0 = filterRow();//supers / set all 
    data.controls.forEach((ob) => {
        const btn = $create("div");
        btn.dataset.type = "control";
        btn.dataset.value = ob.value;
        btn.dataset.active = "true";
        btn.id = "control" + ob.value;
        btn.title = ob.value;
        btn.innerHTML = ob.icon;
        btn.addEventListener("click", filterBtnHandler);
        setStyles(btn, {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "35px",
            overflow: "hidden",
            width: "35px",
            borderRadius: '50%',
            border: "3px solid #22dd22",
            cursor: "pointer",
            padding: "5px"
        });
        filterrow0.appendChild(btn);
    });
    wrapper.appendChild(filterrow0);


    const filterrow1 = filterRow();//locations
    data.locations.forEach((location) => {
        const btn = $create("div");
        btn.dataset.type = "location";
        btn.dataset.value = location.name;
        btn.title = location.name;
        btn.dataset.active = "true";
        btn.innerHTML = location.icon;
        btn.addEventListener("click", filterBtnHandler);
        btn.id = "location" + location.name;
        setStyles(btn, {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "35px",
            overflow: "hidden",
            width: "35px",
            borderRadius: '50%',
            border: "3px solid #22dd22",
            cursor: "pointer"
        });
        filterrow1.appendChild(btn);
    });
    wrapper.appendChild(filterrow1);



    const filterrow2 = filterRow();//locations




    // break
    const hr1 = $create("hr");
    hr1.className = "page-head-delimiter m-top10 m-bottom10";
    hr1.style.borderRadius = "5px";
    wrapper.appendChild(hr1);
    //header
    const displayheader = $create("p");
    displayheader.textContent = "Items";
    setStyles(displayheader, {
        display: "flex",
        fontWeight: 600,
        justifyContent: "center",
        alignItems: "center"
    });
    wrapper.appendChild(displayheader);
    //list
    if (data.filteredItems.length) {
        data.filteredItems.forEach(item => {
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

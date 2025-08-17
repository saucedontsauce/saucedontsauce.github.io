
function createSpouseDisplay(filteredItems) {
    console.log("%ccreating spouse display", logStyle)

    const wrapper = $create("div");//FORM wrapper
    wrapper.textContent = "Use this to set your api key for spouse display"
    const hr1 = $create("hr");//hr
    hr1.className = "page-head-delimiter m-top10 m-bottom10"
    hr1.style.borderRadius = 0;
    hr1.style.borderRadius = '5px';
    wrapper.appendChild(hr1);
    wrapper.className = "msg border-round";
    wrapper.style.width = "auto !important";
    //const f = form();


    //wrapper.appendChild(f);
    return wrapper
};
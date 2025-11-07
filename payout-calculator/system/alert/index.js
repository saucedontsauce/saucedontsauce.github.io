function alertBtnHandler(e) {
    e.preventDefault();
    document.getElementById("alert").replaceWith(document.createElement("div"))
}
function refreshPage(e) {
    e.preventDefault();
    location.reload()
}

function Alert(text, type) {

    try {
        const alertElement = document.createElement('div');
        alertElement.className = 'alert alert-' + type;
        alertElement.id = "alert";
        const p = document.createElement('p');
        p.textContent = text;
        alertElement.appendChild(p);

        type === "" ? alertElement.addEventListener("click", refreshPage) : alertElement.addEventListener("click", alertBtnHandler)
        return alertElement;
    } catch (err) {
        window.alert(err.message);
    }

}



export { Alert }
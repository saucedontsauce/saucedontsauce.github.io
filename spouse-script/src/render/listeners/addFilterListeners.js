import { renderDisplayCase } from "../renderManager.js";
import { setTypeFilter, typeFilter, setEmptyFilter, emptyFilter } from '../../state/stateManager.js';

export default async function addFilterListeners() {
    const filterBoxes = document.querySelectorAll(".filter-item input")
    const emptyBox = document.getElementById("showEmpty");
    for (var i = 0; i < filterBoxes.length; i++) {
        var tf;
        if (!typeFilter) {
            setTypeFilter(["Flower", "Plushie"]);
            tf = ["Flower", "Plushie"]
        } else {
            tf = typeFilter
        }

        if (tf.includes(filterBoxes[i].value)) {
            filterBoxes[i].checked = true
        } else {
            filterBoxes[i].checked = false
        }

        filterBoxes[i].addEventListener("change", (e) => {
            var filters = typeof typeFilter === "string" ? typeFilter.split(',') : typeFilter;
            if (filters.indexOf(e.target.value) >= 0) {
                filters.splice(filters.indexOf(e.target.value), 1);
            } else {
                filters.push(e.target.value);
            }
            setTypeFilter(filters)
            renderDisplayCase()
        });
    };


    if (emptyBox) {
        if (emptyFilter) {
            emptyBox.checked = emptyFilter

        }

        emptyBox.addEventListener("change", (e) => {
            setEmptyFilter(e.target.checked)
            renderDisplayCase()
        })
    };
}
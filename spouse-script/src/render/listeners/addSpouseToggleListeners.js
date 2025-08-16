import { setSpouseShown } from '../../state/stateManager.js'
import { renderDisplayCase } from '../../render/renderManager.js'

const addSpouseToggleListeners = async () => {
    document.querySelectorAll('.toggle-option').forEach(radio => {
        radio.addEventListener('change', function () {
            const val = this.value;
            setSpouseShown(val);
            renderDisplayCase();
        });
    });


};
export default addSpouseToggleListeners;

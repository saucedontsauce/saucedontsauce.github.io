import { stateManager, myKey, myData } from './state/stateManager.js';
import { renderManager, renderShell } from './render/renderManager.js';
import './styles/loadcss.js'// loads styles


(async () => {
    await stateManager();
    renderShell();
    if (myKey) {
        renderManager();
    } else {
        console.log("No API key found. Please enter your API key.");
    }
})();


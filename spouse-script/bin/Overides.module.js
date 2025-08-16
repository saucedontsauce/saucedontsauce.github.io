console.log("%cloading Overides.module.js", 'background-color: darkblue; color: white; font-style: italic; border: 5px solid hotpink; font-size: 2em;');
// GENERAL
const log = console.log;
const logStyle = 'background-color: darkblue; color: white; font-style: italic; border: 5px solid hotpink; font-size: 2em;';

// DOM
const $get = (selector) => document.querySelector(selector);
const $create = (tag) => document.createElement(tag);

// GM 
const GMSet = async (key, value) => {
    try {
        await GM.setValue(key, value);
        console.log('Value set successfully');
    } catch (err) {
        console.error('Error setting value:', err);
        throw err;
    }
};
const GMGet = async (key, deflt) => {
    try {
        const data = await GM.getValue(key, deflt);
        if (data !== undefined) {
            return data;
        } else {
            return false;
        }
    } catch (err) {
        console.error('Error setting value:', err);
    }
};
const GMDelete = async (key) => { await GM.deleteValue(key) };

log("%cOverides.module.js loaded", logStyle);


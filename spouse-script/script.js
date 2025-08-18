// ==UserScript==
// @name         Spouse Display
// @namespace    http://tampermonkey.net/
// @version      16-08-2025
// @description  Script for sharing spouse display for saving purposes
// @author       D00dleD
// @match        https://www.torn.com/index.php
// @match        https://www.torn.com/page.php?sid=travel
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.deleteValue
// @require      https://saucedontsauce.github.io/spouse-script/bin/Data.module.js?ts=<?= Date.now() ?>
// ==/UserScript==

(async function () {
    'use strict';

    // Helper to create elements
    function createEl(tag, { dataset = {}, attrs = {}, styles = {}, innerHTML, children = [] } = {}) {
        const el = document.createElement(tag);
        Object.assign(el.dataset, dataset);
        Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
        Object.assign(el.style, styles);
        if (innerHTML) el.innerHTML = innerHTML;
        children.forEach(c => el.appendChild(c));
        return el;
    }

    // Filter row wrapper
    const filterRow = () => createEl('div', { styles: { display: 'flex', padding: '.5rem 0', flexWrap: 'wrap', gap: '.5rem', justifyContent: 'space-evenly' } });
    const hrEl = () => createEl('hr', { styles: { borderRadius: '5px' }, attrs: { class: 'page-head-delimiter m-top10 m-bottom10' } });

    class SpouseScript {
        #createSpouseDisplay() {
            const wrapper = createEl('div', { styles: { width: 'auto', rowGap: '8px' }, attrs: { class: 'msg border-round' } });

            // Header
            wrapper.appendChild(createEl('p', { innerHTML: 'Filters', styles: { padding: '.5rem', display: 'flex', fontWeight: 600, justifyContent: 'center', alignItems: 'center' } }));

            // Toggle filter
            const toggleFilterStatus = target => {
                const div = document.getElementById(target.dataset.type + target.dataset.value.replace(/\s/g, ''));
                div.dataset.active = div.dataset.active === 'true' ? 'false' : 'true';
                div.style.border = div.dataset.active === 'true' ? '3px solid #22dd22' : '2px solid grey';
            };

            const filterBtnHandler = e => {
                const btn = e.target.tagName === 'IMG' ? e.target.parentElement : e.target;
                toggleFilterStatus(btn);
                const type = btn.dataset.type, value = btn.dataset.value;
                const active = btn.dataset.active === 'true';
                if (type === 'control') {
                    data[value].forEach(flt => {
                        const idx = data.filters.findIndex(o => o.type === value && o.value === flt.value);
                        if (active && idx === -1) {
                            data.filters.push({ type: value, value: flt.value });
                            toggleFilterStatus(document.getElementById(value + flt.value.replace(/\s/g, '')));
                        } else if (!active && idx !== -1) {
                            data.filters.splice(idx, 1);
                            toggleFilterStatus(document.getElementById(value + flt.value.replace(/\s/g, '')));
                        }
                    });
                } else {
                    const ctrl = document.getElementById('control' + type);
                    if (ctrl.dataset.active === 'true' && !active) toggleFilterStatus(ctrl);
                    const idx = data.filters.findIndex(o => o.type === type && o.value === value);
                    idx === -1 ? data.filters.push({ type, value }) : data.filters.splice(idx, 1);
                }
            };

            // Control buttons
            const row0 = filterRow();
            data.controls.forEach(ob => {
                const btn = createEl('div', {
                    dataset: { type: 'control', value: ob.value, active: 'true' },
                    attrs: { id: 'control' + ob.value.replace(/\s/g, ''), title: ob.value },
                    innerHTML: ob.icon,
                    styles: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '35px', width: '35px', borderRadius: '50%', border: '3px solid #22dd22', cursor: 'pointer', padding: '5px' }
                });
                btn.addEventListener('click', filterBtnHandler);
                row0.appendChild(btn);
            });
            wrapper.appendChild(row0);

            // Location buttons
            const row1 = filterRow();
            data.location.forEach(loc => {
                const icon = createEl('img', { attrs: { src: loc.icon }, dataset: { type: 'location', value: loc.value }, styles: { width: '100%', height: '100%' } });
                const btn = createEl('div', {
                    dataset: { type: 'location', value: loc.value, active: 'true' },
                    attrs: { id: 'location' + loc.value.replace(/\s/g, ''), title: loc.value },
                    children: [icon],
                    styles: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '35px', width: '35px', borderRadius: '50%', border: '3px solid #22dd22', cursor: 'pointer' }
                });
                btn.addEventListener('click', filterBtnHandler);
                row1.appendChild(btn);
            });
            wrapper.appendChild(row1);

            const row2 = filterRow();
            data.type.forEach(typ => {
                const icon = createEl('img', { attrs: { src: typ.icon }, dataset: { type: 'type', value: typ.value }, styles: { width: '100%', height: '100%' } });
                const btn = createEl('div', {
                    dataset: { type: 'type', value: typ.value, active: 'true' },
                    attrs: { id: 'type' + typ.value.replace(/\s/g, ''), title: typ.value },
                    children: [icon],
                    styles: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '35px', width: '35px', borderRadius: '50%', border: '3px solid #22dd22', cursor: 'pointer' }
                });
                btn.addEventListener('click', filterBtnHandler);
                row2.appendChild(btn);
            });
            wrapper.appendChild(row2);

            wrapper.appendChild(hrEl());
            wrapper.appendChild(createEl('p', { innerHTML: 'Items', styles: { display: 'flex', fontWeight: 600, justifyContent: 'center', alignItems: 'center' } }));

            // Items
            if (data.filteredItems.length) {
                data.filteredItems.forEach(item => wrapper.appendChild(createEl('div', { innerHTML: `• ${item.name}-${item.location} -- ${item.quantity}/${item.target}` })));
            } else {
                wrapper.appendChild(createEl('p', { innerHTML: 'No data available.' }));
            }

            return wrapper;
        }

        #createSignInForm() {
            const form = createEl('form', { styles: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem' } });
            const input = createEl('input', { attrs: { type: 'text', placeholder: 'Enter your API key', id: 'apiKey', required: true, autocomplete: 'off', 'data-lpignore': true }, styles: { backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '5px', padding: '10px', lineHeight: '14px', marginRight: '8px' } });
            const submit = createEl('button', { attrs: { type: 'submit', id: 'submitApiKey' }, innerHTML: 'Submit', styles: { cursor: 'pointer' } });
            const link = createEl('a', { attrs: { href: 'https://www.torn.com/preferences.php#tab=api', target: '_blank' }, innerHTML: '<p>No Key?</p>', styles: { cursor: 'pointer' } });
            form.append(input, submit, link);

            form.addEventListener('submit', async e => {
                e.preventDefault();
                await data.loginHandler(input.value);
            });

            return createEl('div', {
                attrs: { class: 'msg border-round' }, children: [
                    createEl('p', { innerHTML: 'Use this to set your api key for spouse display', styles: { textAlign: 'center' } }),
                    hrEl(),
                    form
                ]
            });
        }

        #render(target, contentFn) {
            const targetDiv = document.querySelector(target);
            if (!targetDiv) return;
            const wrapper = createEl('div', { attrs: { class: 'api-form-wrapper' } });
            const outer = createEl('div', { attrs: { class: 'flex border-round info-msg' }, styles: { alignItems: 'center' } });
            const inner = createEl('div', { attrs: { class: 'delimiter border-round' }, styles: { borderRadius: '5px' }, children: [typeof contentFn === 'function' ? contentFn() : contentFn] });
            outer.appendChild(inner);
            wrapper.appendChild(outer);
            wrapper.appendChild(hrEl());
            targetDiv.prepend(wrapper);
        }

        static async init() {
            const a = new SpouseScript();
            const indicator = document.querySelector('h4')?.textContent.trim();
            if (['Mexico', 'Canada', 'Cayman Islands', 'Hawaii', 'United Kingdom', 'Argentina', 'Switzerland', 'Japan', 'China', 'UAE', 'South Africa', 'Traveling', 'Travel Agency'].includes(indicator)) {
                a.#render('div.content-wrapper', data.user ? a.#createSpouseDisplay : a.#createSignInForm);
            }
        }
    }

    await SpouseScript.init();
})();

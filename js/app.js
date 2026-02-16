import { countries } from './data/countries.js';
import { initWhatsAppForm } from './ui/form.js';

function renderCountryOptions(selectEl, items, defaultIso = 'BR') {
    const options = items
        .map((country) => {
            const selected = country.iso === defaultIso ? ' selected' : '';
            return `<option data-countryCode="${country.iso}" value="${country.dialCode}"${selected}>(+${country.dialCode}) ${country.name}</option>`;
        })
        .join('');

    selectEl.innerHTML = options;
}

export function initWhatsAppApp() {
    const elements = {
        form: document.getElementById('form_whats'),
        copyButton: document.getElementById('bt_copiar'),
        resetButton: document.getElementById('bt_refazer'),
        openButton: document.getElementById('bt_abrir'),
        countrySelect: document.getElementById('pais'),
        numberInput: document.getElementById('numero'),
        messageInput: document.getElementById('mensagem'),
        linkInput: document.getElementById('link'),
        statusEl: document.getElementById('status')
    };

    renderCountryOptions(elements.countrySelect, countries, 'BR');
    initWhatsAppForm(elements);
}

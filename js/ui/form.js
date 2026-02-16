import { sanitizeNumber, isPhoneValid } from '../domain/phone.js';
import { buildWhatsappLink } from '../domain/whatsapp.js';
import { createStatusRenderer } from './status.js';

async function copyToClipboard(text, inputEl) {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
    }

    inputEl.focus();
    inputEl.select();
    document.execCommand('copy');
}

export function initWhatsAppForm(elements) {
    const {
        form,
        copyButton,
        resetButton,
        openButton,
        countrySelect,
        numberInput,
        messageInput,
        linkInput,
        statusEl
    } = elements;

    const showStatus = createStatusRenderer(statusEl);

    window.addEventListener('load', () => {
        numberInput.focus();
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const country = countrySelect.value;
        const number = sanitizeNumber(numberInput.value);

        if (!number) {
            showStatus('Informe um numero de telefone.', 'error');
            return;
        }

        if (!isPhoneValid(country, number)) {
            showStatus('Numero invalido para o pais selecionado.', 'error');
            return;
        }

        linkInput.value = buildWhatsappLink(country, number, messageInput.value);
        showStatus('Link gerado com sucesso.', 'success');
    });

    copyButton.addEventListener('click', async () => {
        if (!linkInput.value) {
            showStatus('Gere um link antes de copiar.', 'error');
            return;
        }

        try {
            await copyToClipboard(linkInput.value, linkInput);
            showStatus('Link copiado para a area de transferencia.', 'success');
        } catch {
            showStatus('Nao foi possivel copiar o link.', 'error');
        }
    });

    openButton.addEventListener('click', () => {
        if (!linkInput.value) {
            showStatus('Gere um link antes de abrir.', 'error');
            return;
        }

        showStatus('Link aberto com sucesso.', 'success');
        window.open(linkInput.value, '_blank', 'noopener,noreferrer');
    });

    resetButton.addEventListener('click', () => {
        form.reset();
        linkInput.value = '';
        showStatus('Campos limpos com sucesso.', 'success');
        numberInput.focus();
    });
}

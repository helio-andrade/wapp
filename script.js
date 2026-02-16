const formulario = document.getElementById('form_whats');
const botaoCopiar = document.getElementById('bt_copiar');
const botaoRefazer = document.getElementById('bt_refazer');
const botaoAbrir = document.getElementById('bt_abrir');
const paisSelect = document.getElementById('pais');
const numeroInput = document.getElementById('numero');
const mensagemInput = document.getElementById('mensagem');
const linkInput = document.getElementById('link');
const statusEl = document.getElementById('status');

const countryRules = {
    '55': { min: 10, max: 11 },
    '351': { min: 9, max: 9 },
    '1': { min: 10, max: 10 }
};

function showStatus(message, type) {
    statusEl.textContent = message;
    statusEl.className = type ? type : '';
}

function sanitizeNumber(value) {
    return value.replace(/\D/g, '');
}

function isPhoneValid(countryCode, number) {
    const rule = countryRules[countryCode];
    if (!rule) {
        return number.length >= 8 && number.length <= 15;
    }
    return number.length >= rule.min && number.length <= rule.max;
}

function buildWhatsappLink(countryCode, number, message) {
    let link = `https://wa.me/${countryCode}${number}`;
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
        link += `?text=${encodeURIComponent(trimmedMessage)}`;
    }
    return link;
}

async function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
    }

    linkInput.focus();
    linkInput.select();
    document.execCommand('copy');
}

window.addEventListener('load', () => {
    numeroInput.focus();
});

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const pais = paisSelect.value;
    const numero = sanitizeNumber(numeroInput.value);

    if (!numero) {
        showStatus('Informe um numero de telefone.', 'error');
        return;
    }

    if (!isPhoneValid(pais, numero)) {
        showStatus('Numero invalido para o pais selecionado.', 'error');
        return;
    }

    const linkWhatsApp = buildWhatsappLink(pais, numero, mensagemInput.value);
    linkInput.value = linkWhatsApp;
    showStatus('Link gerado com sucesso.', 'success');
});

botaoCopiar.addEventListener('click', async () => {
    if (!linkInput.value) {
        showStatus('Gere um link antes de copiar.', 'error');
        return;
    }

    try {
        await copyToClipboard(linkInput.value);
        showStatus('Link copiado para a area de transferencia.', 'success');
    } catch (error) {
        showStatus('Nao foi possivel copiar o link.', 'error');
    }
});

botaoAbrir.addEventListener('click', () => {
    if (!linkInput.value) {
        showStatus('Gere um link antes de abrir.', 'error');
        return;
    }

    window.open(linkInput.value, '_blank', 'noopener,noreferrer');
});

botaoRefazer.addEventListener('click', () => {
    formulario.reset();
    linkInput.value = '';
    showStatus('', '');
    numeroInput.focus();
});

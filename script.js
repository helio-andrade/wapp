// Selecionando os elementos do DOM
const formulario = document.getElementById('form_whats');
const botaoCopiar = document.getElementById('bt_copiar');
const botaoRefazer = document.getElementById('bt_refazer');
const numeroInput = document.getElementById('numero');
const mensagemInput = document.getElementById('mensagem');
const linkInput = document.getElementById('link');

// Função para gerar link de WhatsApp
formulario.onsubmit = function(evento) {
    evento.preventDefault(); // Impede o envio do formulário
    const pais = document.getElementById('pais').value; // Obtém o valor do país
    const numero = numeroInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const mensagem = encodeURIComponent(mensagemInput.value.trim()); // Codifica a mensagem

    // Verifica se o número é válido
    if (numero) {
        const linkWhatsApp = `https://wa.me/${pais}${numero}?text=${mensagem}`; // Cria o link
        linkInput.value = linkWhatsApp; // Define o valor do input de link
    } else {
        alert('Por favor, insira o número de telefone.'); // Alerta caso o número esteja vazio
    }
};

// Função para copiar o link
botaoCopiar.onclick = function() {
    linkInput.select(); // Seleciona o link
    document.execCommand('copy'); // Copia o link para a área de transferência
    alert('Link copiado para a área de transferência!'); // Confirmação
};

// Função para refazer o formulário
botaoRefazer.onclick = function(evento) {
    evento.preventDefault(); // Impede o envio do formulário
    // Limpa os campos do formulário
    numeroInput.value = '';
    mensagemInput.value = '';
    linkInput.value = '';
    numeroInput.focus(); // Foca no campo do número
};

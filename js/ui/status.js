export function createStatusRenderer(statusEl) {
    const iconMap = {
        success: 'fa-circle-check',
        error: 'fa-triangle-exclamation'
    };

    return function showStatus(message, type) {
        if (!message) {
            statusEl.innerHTML = '';
            statusEl.className = '';
            return;
        }

        const iconClass = iconMap[type] || 'fa-circle-info';
        statusEl.className = type || '';
        statusEl.innerHTML = `<i class="fa-solid ${iconClass}" aria-hidden="true"></i><span>${message}</span>`;
    };
}

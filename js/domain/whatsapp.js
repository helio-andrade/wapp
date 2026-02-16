export function buildWhatsappLink(countryCode, number, message) {
    let link = `https://wa.me/${countryCode}${number}`;
    const trimmedMessage = message.trim();

    if (trimmedMessage) {
        link += `?text=${encodeURIComponent(trimmedMessage)}`;
    }

    return link;
}

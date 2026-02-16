const countryRules = {
    '55': { min: 10, max: 11 },
    '351': { min: 9, max: 9 },
    '1': { min: 10, max: 10 }
};

export function sanitizeNumber(value) {
    return value.replace(/\D/g, '');
}

export function isPhoneValid(countryCode, number) {
    const rule = countryRules[countryCode];
    if (!rule) {
        return number.length >= 8 && number.length <= 15;
    }
    return number.length >= rule.min && number.length <= rule.max;
}

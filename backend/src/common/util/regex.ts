export function isEmail(target: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(target);
}

export function isPhoneNumber(target: string): boolean {
    const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;

    return phoneRegex.test(target);
}
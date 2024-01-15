
function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

/**
 * 문자 3자리 + 숫자 3자리로 포함된 문자열 난수 생성
 * 
 * e.g. abc024
 */
export function genRandomId(): string {
    const alphabets = 'qwertyuiopasdfghjklzxcvbnm';
    const numbers = '0123456789';

    let string = '';
    for (let i = 0; i < 3; i++) {
        const idx = getRandomInt(alphabets.length);
        string += alphabets[idx];
    }
    for (let i = 0; i < 3; i++) {
        const idx = getRandomInt(numbers.length);
        string += numbers[idx];
    }

    return string.toString();
}
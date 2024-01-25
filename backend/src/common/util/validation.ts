export function getKeyByEnumValue<T extends string | number>(value: string, enumObject: T): keyof T | undefined {
    const keys = Object.keys(enumObject) as (keyof T)[];

    for (const key of keys) {
        if (enumObject[key] === value) {
            return key;
        }
    }

    return undefined;
}
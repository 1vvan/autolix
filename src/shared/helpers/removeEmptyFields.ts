export const removeEmptyFields = <T extends Record<string, any>>(obj: T): Partial<T> => {
    return Object.keys(obj).reduce((acc, key) => {
        if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
            // @ts-ignore
            acc[key] = obj[key];
        }
        return acc;
    }, {} as Partial<T>);
};
export function calculateServicePrice(basePrice: number, carYear: number) {
    const currentYear = new Date().getFullYear();
    const diff = currentYear - carYear;

    let modifier = 0;
    if (diff <= 3) modifier = 0;
    else if (diff <= 10) modifier = 100;
    else modifier = 200;

    return basePrice + modifier;
}

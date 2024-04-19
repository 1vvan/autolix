export const moneyFormatter = (value: string | number) => {
    if(!value) return '0'

    return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

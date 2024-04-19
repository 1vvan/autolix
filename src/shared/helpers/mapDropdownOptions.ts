export const mapOptions = (options) => options && options.map(item => ({
    label: item.name,
    value: item.id
}));
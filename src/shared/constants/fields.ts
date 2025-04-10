export const userMenu = [
    {
        path: '/',
        label: 'Available Cars',
    },
    {
        path: '/user-purchases',
        label: 'Your Purchases',
    },
    {
        path: '/service',
        label: 'Service',
    },
]

export const adminMenu = [
    {
        path: '/',
        label: 'Cars',
    },
    {
        path: '/clients',
        label: 'Clients',
    },
    {
        path: '/sales',
        label: 'Sales',
    },
    {
        path: '/add-car',
        label: 'Add Car',
    },
    {
        path: '/edit-models',
        label: 'Cars Models',
    },
    {
        path: '/service-dashboard',
        label: 'Service Dashboard',
    },
]

export const buyCarFormFields = [
    {
        label: 'Email',
        type: 'email',
        key: 'email'
    },
    {
        label: 'Address',
        type: 'text',
        key: 'address'
    },
    {
        label: 'Phone',
        type: 'tel',
        key: 'phone'
    }
]

export const addCarFormSelects = [
    {
        label: 'Engine Type',
        key: 'engine_type_id'
    },
    {
        label: 'Fuel Type',
        key: 'fuel_id'
    },
    {
        label: 'Gearbox Type',
        key: 'gearbox_type_id'
    },
    {
        label: 'Drive Unit',
        key: 'drive_unit_id'
    },
    {
        label: 'Brand',
        key: 'brand_id'
    },
    {
        label: 'Model',
        key: 'model_id'
    },
]

export const editCarFormSelects = [
    {
        label: 'Brand',
        key: 'brand_id'
    },
    {
        label: 'Model',
        key: 'model_id'
    },
    {
        label: 'Engine Type',
        key: 'engine_type_id'
    },
    {
        label: 'Fuel Type',
        key: 'fuel_id'
    },
    {
        label: 'Gearbox Type',
        key: 'gearbox_type_id'
    },
    {
        label: 'Drive Unit',
        key: 'drive_unit_id'
    },
    {
        label: 'Status',
        key: 'status_id'
    },
]

export const editCarFormInputs = [
    {
        label: 'Year',
        key: 'year',
        onKeyDown: true,
        step: 1,
        maxLength: 4,
        max: new Date().getFullYear()
    },
    {
        label: 'Engine Capacity',
        key: 'engine_capacity',
        onKeyDown: true,
        step: 0.1,
        maxLength: 3,
        max: 7
    },
    {
        label: 'VIN',
        key: 'vin',
        onKeyDown: false,
        step: null,
        maxLength: 17,
        max: null
    },
    {
        label: 'Price',
        key: 'price',
        onKeyDown: true,
        step: 1,
        maxLength: 7,
        max: null
    },
    {
        label: 'Horse Power',
        key: 'horse_power',
        onKeyDown: true,
        step: 1,
        maxLength: 4,
        max: null
    },
]
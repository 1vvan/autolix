export const userMenu = [
    {
        path: '/',
        label: 'Available Cars',
    },
    {
        path: '/user-purchases',
        label: 'Your Purchases',
    }
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
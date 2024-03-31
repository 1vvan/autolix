const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@icons': path.resolve(__dirname, 'src/shared/assets/icons'),
            '@ui': path.resolve(__dirname, 'src/shared/UI'),
            '@constants': path.resolve(__dirname, 'src/shared/constants'),
        },
    },
};
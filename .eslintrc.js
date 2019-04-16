module.exports = {
    'extends': 'airbnb',
    'parser': 'babel-eslint',
    'env': {
        'jest': true,
    },
    'rules': {
        'no-use-before-define': 'off',
        'react/jsx-filename-extension': 'off',
        'react/prop-types': 'off',
        'comma-dangle': 'off',
        'linebreak-style': 'off',
        'indent': ["error", 4],
        'semi': 'off',
        'no-plusplus': 'off',
        'react/destructuring-assignment': 'never',
        'react/jsx-indent': [4, 'tab'],
        'react/jsx-indent-props': [4, 'tab'],
        'max-len': ["error", 120],
        'object-curly-newline': 'off',
        'camelcase': ["error", { allow: ["^p_"] }],
        'object-property-newline': 'off',
        'no-else-return': 'off', // Delete in future
        'class-methods-use-this': 'off', // Delete in future
        'react/no-array-index-key': 'off', // Delete in future
        'react/no-access-state-in-setstate': 'off', // Delete in future
        'no-return-assign': 'off', // Delete in future
        'eol-last': 'off', // Delete in future
        'no-console': 'off', // Delete in future
        'camelcase': 'off', // Delete in future
    },
    'globals': {
        "fetch": false
    }
}
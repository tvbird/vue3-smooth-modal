module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        'vue/setup-compiler-macros': true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "vue",
    ],
    "rules": {
        // override/add rules settings here, such as:
        'vue/no-unused-vars': 'warn',
        'no-unused-vars': 'warn',
        'vue/require-valid-default-prop': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-multiple-template-root': 'off',
        'semi': ["warn", "never"]
    }
}

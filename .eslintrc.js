module.exports = {
    "parser":"babel-eslint",
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "rules": {
        "indent": ["error", 4],
        "quotes":[
            "error",
            "single",
            {
                "allowTemplateLiterals":true
            }
        ],
        "semi":[
            "error",
            "never"
        ]
    }
};
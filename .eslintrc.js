module.exports = {
  extends: [
    'next',                  
    'next/core-web-vitals',   
    'eslint:recommended',     
  ],
  parserOptions: {
    ecmaVersion: 2025,  
    sourceType: 'module', 
  },
  rules: {
    'react/react-in-jsx-scope': 'off', 
    // 'no-console': 'warn',             
  },
  settings: {
    react: {
      version: 'detect', 
    },
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
};

/** @type {import('prettier').Options} */
module.exports = {
  semi: false,
  useTabs: false,
  tabWidth: 2,
  printWidth: 100,
  bracketSpacing: true,
  jsxBracketSameLine: true,
  singleQuote: true,
  trailingComma: 'es5',
  arrowParens: 'avoid',
  quoteProps: 'as-needed',
  endOfLine: 'lf',
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx'],
  tailwindStylesheet: './styles/tailwind.css',
}

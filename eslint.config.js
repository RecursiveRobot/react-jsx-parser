import js from '@eslint/js'
import react from '@eslint-react/eslint-plugin'
import stylistic from '@stylistic/eslint-plugin'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	{ ignores: ['dist/', 'test-coverage/', 'patches/'] },
	js.configs.recommended,
	tseslint.configs.recommended,
	{
		files: ['**/*.{js,ts,tsx}'],
		extends: [
			react.configs['recommended-typescript'],
			reactHooks.configs.flat['recommended-latest'],
			// @eslint-react ships its own hooks rules; defer to eslint-plugin-react-hooks for those...
			react.configs['disable-conflict-eslint-plugin-react-hooks'],
		],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.vitest,
			},
		},
		plugins: {
			'@stylistic': stylistic,
		},
		rules: {
			'@stylistic/arrow-parens': ['error', 'as-needed'],
			'@stylistic/comma-dangle': ['error', 'always-multiline'],
			'@stylistic/indent': ['error', 'tab', { SwitchCase: 0 }],
			'@stylistic/jsx-indent-props': ['error', 'tab'],
			'@stylistic/max-len': ['error', {
				code: 120,
				tabWidth: 2,
				ignoreUrls: true,
				ignoreComments: false,
				ignoreRegExpLiterals: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
			}],
			'@stylistic/object-curly-newline': ['error', { ObjectPattern: { multiline: true } }],
			'@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
			'@stylistic/semi': ['error', 'never'],
			// A runtime JSX parser fundamentally traffics in dynamic values and constructed functions...
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unsafe-function-type': 'off',
			'@typescript-eslint/no-unused-vars': ['error', {
				argsIgnorePattern: '_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_',
			}],
			'@typescript-eslint/no-use-before-define': 'error',
			'no-case-declarations': 'off',
			'no-unused-vars': 'off',
			'no-use-before-define': 'off',
		},
	},
	{
		// Tests and the dev demo deliberately exercise parser features (cloneElement,
		// Children.only, forced re-renders) that these rules exist to discourage in app code...
		files: ['**/*.test.{js,ts,tsx}', 'source/demo.tsx'],
		rules: {
			'@eslint-react/naming-convention-ref-name': 'off',
			'@eslint-react/no-array-index-key': 'off',
			'@eslint-react/no-children-only': 'off',
			'@eslint-react/no-clone-element': 'off',
			'@eslint-react/set-state-in-effect': 'off',
			'@eslint-react/use-state': 'off',
		},
	},
)

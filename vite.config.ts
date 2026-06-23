/// <reference types="vitest/config" />
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'

export default defineConfig({
	build: {
		emptyOutDir: true,
		lib: {
			entry: resolve(__dirname, 'source/index.ts'),
			fileName: () => 'react-jsx-parser.js',
			formats: ['es'],
		},
		outDir: 'dist',
		sourcemap: true,
		// Externalize React only. acorn / acorn-jsx are bundled so the published
		// artifact carries the patched acorn-jsx (autoCloseVoidElements support).
		rollupOptions: {
			external: ['react', 'react-dom', 'react/jsx-runtime'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
				},
			},
		},
	},
	plugins: [
		react(),
		dts({
			include: ['source/index.ts', 'source/**/*.ts', 'source/**/*.tsx'],
			exclude: ['source/**/*.test.*', 'source/demo.tsx'],
			insertTypesEntry: true,
		}),
	],
	test: {
		coverage: {
			provider: 'v8',
			include: ['source/**/*.{ts,tsx,js}'],
			exclude: [
				'**/dist/**',
				'**/node_modules/**',
				'**/*.d.ts',
				'**/*.test.{ts,tsx,js}',
				'source/demo.tsx',
				'source/index.ts',
			],
			reporter: ['html', 'lcov', 'text'],
			reportsDirectory: 'test-coverage',
			thresholds: {
				branches: 85,
				functions: 95,
				lines: 95,
				statements: 95,
			},
		},
		environment: 'jsdom',
		globals: true,
		setupFiles: [resolve(__dirname, 'vitest.setup.ts')],
	},
})

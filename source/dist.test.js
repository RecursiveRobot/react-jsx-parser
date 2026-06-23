/**
 * @vitest-environment node
 */
import { existsSync } from 'fs'
import { resolve } from 'path'

const distFile = resolve(import.meta.dirname, '../dist/react-jsx-parser.js')
const isBuilt = existsSync(distFile)

describe('JSXParser', () => {
	describe('esm build', () => {
		// Only runs after `yarn build` has produced the bundle.
		it.skipIf(!isBuilt)('should load and parse', async () => {
			// eslint-disable-next-line import/extensions
			await expect(import('../dist/react-jsx-parser.js')).resolves.toBeDefined()
		})
	})
})

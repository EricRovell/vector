import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

/**
 * Generates Rollup Plugin Configuration.
 */
function getPluginsConfig(compilerOptions) {
	return [
		typescript({
			tsconfigOverride: { compilerOptions }
		}),
		terser({
			ecma: 2021,
			module: true,
			toplevel: true,
			compress: { pure_getters: true },
			format: { wrap_func_args: false }
		})
	];
}

export default [
	/**
   * Core bundle build in ESM
   */
	{
		input: "src/index.ts",
		output: {
			file: "dist/index.js",
			format: "es"
		},
		plugins: getPluginsConfig({ declaration: true })
	},
	/**
   * Core bundle in CJS
   */
	{
		input: "src/index.ts",
		output: {
			file: "dist/index.cjs",
			format: "cjs",
		},
		plugins: getPluginsConfig({ declaration: false }),
	}
];

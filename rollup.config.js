"use strict";

import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import progress from "rollup-plugin-progress";
import typescript from "rollup-plugin-typescript2";
import screeps from "rollup-plugin-screeps";

let cfg;
const dest = process.env.DEST;
if (!dest) {
	console.log('\x1b[46m%s\x1b[0m \x1b[36m%s\x1b[0m', 'Compiling Spacers Choice...', '(deploy destination: none)');
} else if ((cfg = require("./screeps")[dest]) == null) {
	throw new Error("Invalid upload destination");
} else {
	console.log('\x1b[46m%s\x1b[0m \x1b[36m%s\x1b[0m', 'Compiling Spacers Choice...', `(deploy destination: ${dest})`);
}

const ignoreWarnings = [
	'commonjs-proxy',
	'Circular dependency',
	"The 'this' keyword is equivalent to 'undefined'",
	"Use of eval is strongly discouraged"];

export default {
	input: "src/main.ts",
	plugins: [
		progress({ clearLine: true   }),
		resolve(),
		commonjs({
			namedExports: {
				'node_modules/lodash/lodash.js': [
					'find',
					'size'
				]
			}
		}),
		typescript({tsconfig: "./tsconfig.json"}),
		screeps({config: cfg, dryRun: cfg == null})
	],
	treeshake: true,
	output: {
		file: 'dist/main.js',
		format: 'cjs',
		sourcemap: false
	}
}

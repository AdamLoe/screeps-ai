"use strict";

import clean from "rollup-plugin-clean";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
//import typescript from "rollup-plugin-typescript2";
import screeps from "rollup-plugin-screeps";

let cfg = require("./screeps");

console.log("config", JSON.stringify(cfg));

export default {
	input: "src/main.js",
	output: {
		file: "main.js",
		format: "cjs"
	},

	sourcemap: true,

	plugins: [
		clean(),
		resolve(),
		commonjs(),
		screeps({config: cfg})
	]
};
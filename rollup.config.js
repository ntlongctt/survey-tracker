import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
	input: "src/index.js",
	output: {
		file: "build/bundle.js",
		format: "cjs", // or 'esm' for ES modules
	},
	plugins: [nodeResolve(), commonjs()],
};

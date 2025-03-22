/* eslint-disable no-undef */
import * as esbuild from 'esbuild';

const isProd = process.env.NODE_ENV === 'production';

/** @type {esbuild.BuildOptions} */
const config = {
	entryPoints: ['src/index.ts'],
	bundle: true,
	platform: 'node',
	target: 'node22',
	outdir: 'dist',
	sourcemap: !isProd,
	minify: isProd,
	format: 'esm',
	packages: 'external',
};

if (process.argv.includes('--watch')) {
	const ctx = await esbuild.context(config);
	await ctx.watch();
	console.log('Watching for changes...');
} else {
	await esbuild.build(config);
}

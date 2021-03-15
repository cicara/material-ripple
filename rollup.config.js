import rollupPluginDelete from 'rollup-plugin-delete';
import rollupPluginTypescript from '@rollup/plugin-typescript';
import { terser as rollupPluginTerser } from 'rollup-plugin-terser';

const production = process.env.NODE_ENV === 'production';

/**
 * @type {import('rollup').RollupOptions}
 */
 const options = {
  input: [
    'src/index.ts',
  ],
  output: [
    {
      dir: 'dist/',
      format: 'esm',
      sourcemap: !production,
      entryFileNames: 'index.esm.js'
    },
    {
      dir: 'dist/',
      name: 'MaterialRipple',
      format: 'umd',
      sourcemap: !production,
    },
  ],
  plugins: [
    rollupPluginDelete(
      {
        targets: [
          'dist/**/*',
        ],
      }
    ),
    rollupPluginTypescript(
      {
        cacheDir: './node_modules/.rollup.cache',
        tsconfig: 'tsconfig.json',
        sourceMap: !production,
      },
    ),
    production && rollupPluginTerser(),
  ],
};

export default options;

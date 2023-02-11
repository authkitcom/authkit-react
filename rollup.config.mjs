import typescript from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import svgr from '@svgr/rollup'
import postcss from 'rollup-plugin-postcss';
import url from "@rollup/plugin-url";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import pkg from './package.json' assert {type: "json"};
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import babel from "@rollup/plugin-babel";


export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    commonjs(),
    nodeResolve(),
    url(),
    json(),
    postcss({
      modules: true
    }),
    svgr(),
    typescript({
      clean: true
    }),
  ]
}

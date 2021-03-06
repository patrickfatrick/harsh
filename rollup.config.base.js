import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  dest: 'dist/harsh.js',
  plugins: [
    babel({
      exclude: 'node_modules/**/*'
    })
  ],
  format: 'es'
};

var dest = './dist'
var src = '.'

module.exports = {
  build: {
    transform: ['babelify', {
      compact: false
    }],
    config: './config.js',
    src: src + '/index.js',
    dest: dest + '/',
    outputName: 'harsh.js',
    standalone: 'harsh',
    extensions: ['js']
  },
  min: {
    transform: ['babelify', {
      compact: true
    }],
    config: './config.js',
    src: src + '/index.js',
    dest: dest + '/',
    outputName: 'harsh.min.js',
    standalone: 'harsh',
    extensions: ['js', 'es6']
  },
  lint: {
    src: src + '/index.js'
  }
}

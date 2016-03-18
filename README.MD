#Harsh

_A number-hash ready to go for Talk Like A Pirate Day._

[![Circle CI](https://circleci.com/gh/patrickfatrick/harsh.svg?style=shield)](https://circleci.com/gh/patrickfatrick/harsh)
[![codecov.io](https://codecov.io/github/patrickfatrick/harsh/coverage.svg?branch=master)](https://codecov.io/github/patrickfatrick/harsh?branch=master)
[![bitHound Score](https://www.bithound.io/github/patrickfatrick/harsh/badges/score.svg)](https://www.bithound.io/github/patrickfatrick/harsh)
[![bitHound Dependencies](https://www.bithound.io/github/patrickfatrick/harsh/badges/dependencies.svg)](https://www.bithound.io/github/patrickfatrick/harsh/master/dependencies/npm)
[![MIT License][license-image]][license-url]

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## What is it?

Harsh is a tiny library for tokenizing lists of numbers, and then subsequently reversing those tokens back to the original numbers. You can also create a token from nothing by calling it with no arguments.

**NOTE: This library should never be used for serious encryption. It is strictly a tokenizer.**

## Install

```bash
$ git clone git@github.com:patrickfatrick/harsh.git
$ npm install harsh
$ bower install harsh
```

You can either use it as a module or include the minified file from the `dist` folder in a script tag.

## Usage

Harsh basically stringifies the numbers you feed it, and appends randomly generated salts to them in a random order. The salts will always be the same for the entire array, which makes them trivial to reverse, provided that stored the salts. The implementation goes like so:

```
harsh.hash([number array[, number of salts[, base]]])
// number of salts defaults to 2,
// base defaults to 36
```

```javascript
harsh.hash() // Create a single token using a random number
harsh.hash([1234, 5678]) // Create two tokens that will reverse back to 1234 and 5678
harsh.hash([1234, 5678], 3) // Create two tokens that will have 3 salts appended to them
harsh.hash([1234, 5678], 3, 16) // Create two tokens with 3 salts and using base-16 (hexadecimal)
```

resulting in something like

```javascript
// 1wapgwcgl
// j9exyab2rt, j9exb2rt4dq
// ggtdbrhfyaget1, 4dqbrhfget1ggtd
// 55e8a353c53b8124d2, 55e8a3b812353c5162e
```

Well really, what it returns is an object that contains the following properties

```javascript
ids: [1234, 5678], // the array of numbers used
hashes: ['55e8a353c53b8124d2', '55e8a3b812353c5162e'], // the tokens created
salts: ['55e8a', '353c5', '3b812'], // the salts created
base: 16 // the base used for tokenization
```

If you want to eventually reverse tokens back to the original numbers you will need to store this object somewhere, or at least the salts (assuming you're consistent with the base).

#### Reversing / Revarsing

Reversing works very similarly, the format is

```
harsh.revarse([token array[, salts array[, base]]])
// base defaults to 36
```

So to reverse the first token from before, 

```javascript
harsh.revarse(['55e8a353c53b8124d2'], ['55e8a', '353c5', '3b812'], 16)
// [1234] Note this also returns an array.
```

The base and salts must match the original hashing, or this will not work.

## Running the tests

```bash
$ npm install
$ npm test
```

## What's the plan

- Include a way to create a certain number of random tokens

## License

Harsh is freely distributable under the terms of the [MIT license](./LICENSE).

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
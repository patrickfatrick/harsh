(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.harsh = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var harsh = {
  _base: 36,
  _id: Math.floor(Math.random() * 100),
  _n: 2,
  /**
   * Takes a number and a radix base, outputs a salted hash
   * @param  {Array} ids   list of ids to hash   
   * @param {Number} n number of salts to add to the hash
   * @param  {Number} base radix base, 16 through 36 allowed
   * @return {Object}      a hash object containing the hashes as well as info needed to reverse them
   */
  hash: function hash() {
    var ids = arguments.length <= 0 || arguments[0] === undefined ? [this._id] : arguments[0];
    var n = arguments.length <= 1 || arguments[1] === undefined ? this._n : arguments[1];
    var base = arguments.length <= 2 || arguments[2] === undefined ? this._base : arguments[2];

    try {
      var _ret = function () {
        if (!ids.splice) {
          throw new TypeError('The ids argument should be an array of numbers');
        }
        if (typeof n !== 'number' || n < 0) {
          throw new TypeError('The number of salts should be a positive integer');
        }
        if (typeof base !== 'number' || base < 16 || base > 36) {
          throw new TypeError('The base should be a number between 16 and 36');
        }

        // Create the salts. This will be the same for all hashes
        var salts = [];
        for (var i = 0; i < n; i++) {
          salts.push(Math.floor(Math.random() * Math.pow(10, 6)).toString(base));
        }

        // Combine the salts and the actual
        var hashes = ids.map(function (id) {
          if (typeof id !== 'number') {
            throw new TypeError('The ids you\'re hashing should only be numbers');
          }
          var hash = id.toString(base);
          var pieces = [].concat(salts, [hash]);
          var hashString = '';
          do {
            var index = Math.floor(Math.random() * pieces.length);
            hashString += pieces[index];
            pieces.splice(index, 1);
          } while (pieces.length);
          return hashString;
        });

        return {
          v: {
            ids: ids,
            hashes: hashes,
            salts: salts,
            base: base
          }
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    } catch (e) {
      console.error(e.name, e.message);
    }
  },

  /**
   * Takes a string and necessary components to reverse back to the original number
   * @param  {Array} hashes   list of hashes to reverse
   * @param  {Array} salts  list of salts applied to the list (provided from `hash`)
   * @param  {base} base     radix base, 16 through 36 allowed
   * @return {Array}          list of reversed hashes
   */
  revarse: function revarse(hashes, salts) {
    var base = arguments.length <= 2 || arguments[2] === undefined ? this._base : arguments[2];

    try {
      var _ret2 = function () {
        if (!hashes.splice) {
          throw new TypeError('The hashes argument should be an array of hashes provided by the hash method');
        }
        if (!hashes.splice) {
          throw new TypeError('The salts argument should be an array of salt strings provided by the hash method');
        }
        if (typeof base !== 'number' || base < 16 || base > 36) {
          throw new TypeError('The base should be a number between 16 and 36');
        }
        var re = new RegExp(salts.join('\|'), 'g');

        var reversed = hashes.map(function (hash) {
          if (typeof hash !== 'string') {
            throw new TypeError('The hashes you\'re reversing should only be strings');
          }
          var stripped = hash.replace(re, '');
          return parseInt(stripped, base);
        });
        return {
          v: reversed
        };
      }();

      if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
    } catch (e) {
      console.error(e.name, e.message);
    }
  }
};

module.exports = harsh;

},{}]},{},[1])(1)
});


//# sourceMappingURL=harsh.js.map
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.harsh = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var createSalts = function createSalts(n, base) {
  var salts = [];
  for (var i = 0; i < n; i++) {
    salts.push(Math.floor(Math.random() * Math.pow(10, 6)).toString(base));
  }
  return salts;
};

var createHash = function createHash(id, salts, base) {
  var hash = id.toString(base);
  var pieces = [].concat(_toConsumableArray(salts), [hash]);
  var hashString = '';
  do {
    var index = Math.floor(Math.random() * pieces.length);
    hashString += pieces[index];
    pieces.splice(index, 1);
  } while (pieces.length);
  return hashString;
};

module.exports = {
  /**
   * Takes a number and a radix base, outputs a salted hash
   * @param  {Array} ids   list of ids to hash
   * @param {Number} n number of salts to add to the hash
   * @param  {Number} base radix base, 16 through 36 allowed
   * @return {Object}      a hash object containing the hashes as well as info needed to reverse them
   */
  hash: function hash(ids, n, base) {
    ids = ids || [Math.floor(Math.random() * 100)];
    n = n || 2;
    base = base || 36;

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
    var salts = createSalts(n, base);

    // Combine the salts and the actual
    var hashes = ids.map(function (id) {
      if (typeof id !== 'number') {
        throw new TypeError('The ids you\'re hashing should only be numbers');
      }
      return createHash(id, salts, base);
    });

    return {
      ids: ids,
      hashes: hashes,
      salts: salts,
      base: base
    };
  },

  /**
   * Simplified API to just return a single token using defaults
   * @return {String} a hash
   */
  hashish: function hashish() {
    return createHash([Math.floor(Math.random() * 100)], createSalts(2, 36), 36);
  },

  /**
   * Creates a specified number of random tokens
   * @param  {Number} num  number of tokens to create
   * @param  {Number} n    number of salts to add to each hash
   * @param  {Number} base radix base, 16 through 36 allowed
   * @return {Object}      a hash object containing the hashes as well as info needed to reverse them
   */
  bunch: function bunch(num, n, base) {
    num = num || 1;
    n = n || 2;
    base = base || 36;

    if (typeof num !== 'number') {
      throw new TypeError('The num should be a number');
    }
    if (typeof n !== 'number' || n < 0) {
      throw new TypeError('The number of salts should be a positive integer');
    }
    if (typeof base !== 'number' || base < 16 || base > 36) {
      throw new TypeError('The base should be a number between 16 and 36');
    }

    // Create the ids
    var ids = [];
    for (var i = 0; i < num; i++) {
      ids.push(Math.floor(Math.random() * Math.pow(10, num.toString(10).length + 2)));
    }

    // Create the salts. This will be the same for all hashes
    var salts = createSalts(n, base);

    // Combine the salts and the actual
    var hashes = ids.map(function (id) {
      return createHash(id, salts, base);
    });

    return {
      ids: ids,
      hashes: hashes,
      salts: salts,
      base: base
    };
  },

  /**
   * Takes a string and necessary components to reverse back to the original number
   * @param  {Array} hashes   list of hashes to reverse
   * @param  {Array} salts  list of salts applied to the list (provided from `hash`)
   * @param  {base} base     radix base, 16 through 36 allowed
   * @return {Array}          list of reversed hashes
   */
  reverse: function reverse(hashes, salts, base) {
    base = base || 36;

    if (!hashes.splice) {
      throw new TypeError('The hashes argument should be an array of hashes provided by the hash method');
    }
    if (!salts.splice) {
      throw new TypeError('The salts argument should be an array of salt strings provided by the hash method');
    }
    if (typeof base !== 'number' || base < 16 || base > 36) {
      throw new TypeError('The base should be a number between 16 and 36');
    }
    var re = new RegExp(salts.join('|'), 'g');

    var reversed = hashes.map(function (hash) {
      if (typeof hash !== 'string') {
        throw new TypeError('The hashes you\'re reversing should only be strings');
      }
      var stripped = hash.replace(re, '');
      return parseInt(stripped, base);
    });

    return reversed;
  }
};

},{}]},{},[1])(1)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7O0FBRUEsSUFBTSxjQUFjLFNBQWQsV0FBYyxDQUFDLENBQUQsRUFBSSxJQUFKLEVBQWE7QUFDL0IsTUFBSSxRQUFRLEVBQVo7QUFDQSxPQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksQ0FBcEIsRUFBdUIsR0FBdkIsRUFBNEI7QUFDMUIsVUFBTSxJQUFOLENBQVcsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLEtBQUssR0FBTCxDQUFTLEVBQVQsRUFBYSxDQUFiLENBQTNCLEVBQTRDLFFBQTVDLENBQXFELElBQXJELENBQVg7QUFDRDtBQUNELFNBQU8sS0FBUDtBQUNELENBTkQ7O0FBUUEsSUFBTSxhQUFhLFNBQWIsVUFBYSxDQUFDLEVBQUQsRUFBSyxLQUFMLEVBQVksSUFBWixFQUFxQjtBQUN0QyxNQUFNLE9BQU8sR0FBRyxRQUFILENBQVksSUFBWixDQUFiO0FBQ0EsTUFBSSxzQ0FBYSxLQUFiLElBQW9CLElBQXBCLEVBQUo7QUFDQSxNQUFJLGFBQWEsRUFBakI7QUFDQSxLQUFHO0FBQ0QsUUFBSSxRQUFRLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixPQUFPLE1BQWxDLENBQVo7QUFDQSxrQkFBYyxPQUFPLEtBQVAsQ0FBZDtBQUNBLFdBQU8sTUFBUCxDQUFjLEtBQWQsRUFBcUIsQ0FBckI7QUFDRCxHQUpELFFBSVMsT0FBTyxNQUpoQjtBQUtBLFNBQU8sVUFBUDtBQUNELENBVkQ7O0FBWUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2Y7Ozs7Ozs7QUFPQSxNQVJlLGdCQVFULEdBUlMsRUFRSixDQVJJLEVBUUQsSUFSQyxFQVFLO0FBQ2xCLFVBQU0sT0FBTyxDQUFDLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixHQUEzQixDQUFELENBQWI7QUFDQSxRQUFJLEtBQUss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TSxJQUFJLFNBQUosQ0FBYyw4RUFBZCxDQUFOO0FBQ0Q7QUFDRCxRQUFJLENBQUMsTUFBTSxNQUFYLEVBQW1CO0FBQ2pCLFlBQU0sSUFBSSxTQUFKLENBQWMsbUZBQWQsQ0FBTjtBQUNEO0FBQ0QsUUFBSSxPQUFPLElBQVAsS0FBZ0IsUUFBaEIsSUFBNEIsT0FBTyxFQUFuQyxJQUF5QyxPQUFPLEVBQXBELEVBQXdEO0FBQ3RELFlBQU0sSUFBSSxTQUFKLENBQWMsK0NBQWQsQ0FBTjtBQUNEO0FBQ0QsUUFBTSxLQUFLLElBQUksTUFBSixDQUFXLE1BQU0sSUFBTixDQUFXLEdBQVgsQ0FBWCxFQUE0QixHQUE1QixDQUFYOztBQUVBLFFBQUksV0FBVyxPQUFPLEdBQVAsQ0FBVyxVQUFDLElBQUQsRUFBVTtBQUNsQyxVQUFJLE9BQU8sSUFBUCxLQUFnQixRQUFwQixFQUE4QjtBQUM1QixjQUFNLElBQUksU0FBSixDQUFjLHFEQUFkLENBQU47QUFDRDtBQUNELFVBQUksV0FBVyxLQUFLLE9BQUwsQ0FBYSxFQUFiLEVBQWlCLEVBQWpCLENBQWY7QUFDQSxhQUFPLFNBQVMsUUFBVCxFQUFtQixJQUFuQixDQUFQO0FBQ0QsS0FOYyxDQUFmOztBQVFBLFdBQU8sUUFBUDtBQUNEO0FBN0hjLENBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBjcmVhdGVTYWx0cyA9IChuLCBiYXNlKSA9PiB7XG4gIGxldCBzYWx0cyA9IFtdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgc2FsdHMucHVzaChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLnBvdygxMCwgNikpLnRvU3RyaW5nKGJhc2UpKVxuICB9XG4gIHJldHVybiBzYWx0c1xufVxuXG5jb25zdCBjcmVhdGVIYXNoID0gKGlkLCBzYWx0cywgYmFzZSkgPT4ge1xuICBjb25zdCBoYXNoID0gaWQudG9TdHJpbmcoYmFzZSlcbiAgbGV0IHBpZWNlcyA9IFsuLi5zYWx0cywgaGFzaF1cbiAgbGV0IGhhc2hTdHJpbmcgPSAnJ1xuICBkbyB7XG4gICAgbGV0IGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcGllY2VzLmxlbmd0aClcbiAgICBoYXNoU3RyaW5nICs9IHBpZWNlc1tpbmRleF1cbiAgICBwaWVjZXMuc3BsaWNlKGluZGV4LCAxKVxuICB9IHdoaWxlIChwaWVjZXMubGVuZ3RoKVxuICByZXR1cm4gaGFzaFN0cmluZ1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLyoqXG4gICAqIFRha2VzIGEgbnVtYmVyIGFuZCBhIHJhZGl4IGJhc2UsIG91dHB1dHMgYSBzYWx0ZWQgaGFzaFxuICAgKiBAcGFyYW0gIHtBcnJheX0gaWRzICAgbGlzdCBvZiBpZHMgdG8gaGFzaFxuICAgKiBAcGFyYW0ge051bWJlcn0gbiBudW1iZXIgb2Ygc2FsdHMgdG8gYWRkIHRvIHRoZSBoYXNoXG4gICAqIEBwYXJhbSAge051bWJlcn0gYmFzZSByYWRpeCBiYXNlLCAxNiB0aHJvdWdoIDM2IGFsbG93ZWRcbiAgICogQHJldHVybiB7T2JqZWN0fSAgICAgIGEgaGFzaCBvYmplY3QgY29udGFpbmluZyB0aGUgaGFzaGVzIGFzIHdlbGwgYXMgaW5mbyBuZWVkZWQgdG8gcmV2ZXJzZSB0aGVtXG4gICAqL1xuICBoYXNoIChpZHMsIG4sIGJhc2UpIHtcbiAgICBpZHMgPSBpZHMgfHwgW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCldXG4gICAgbiA9IG4gfHwgMlxuICAgIGJhc2UgPSBiYXNlIHx8IDM2XG5cbiAgICBpZiAoIWlkcy5zcGxpY2UpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBpZHMgYXJndW1lbnQgc2hvdWxkIGJlIGFuIGFycmF5IG9mIG51bWJlcnMnKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInIHx8IG4gPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgbnVtYmVyIG9mIHNhbHRzIHNob3VsZCBiZSBhIHBvc2l0aXZlIGludGVnZXInKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGJhc2UgIT09ICdudW1iZXInIHx8IGJhc2UgPCAxNiB8fCBiYXNlID4gMzYpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBiYXNlIHNob3VsZCBiZSBhIG51bWJlciBiZXR3ZWVuIDE2IGFuZCAzNicpXG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIHRoZSBzYWx0cy4gVGhpcyB3aWxsIGJlIHRoZSBzYW1lIGZvciBhbGwgaGFzaGVzXG4gICAgY29uc3Qgc2FsdHMgPSBjcmVhdGVTYWx0cyhuLCBiYXNlKVxuXG4gICAgLy8gQ29tYmluZSB0aGUgc2FsdHMgYW5kIHRoZSBhY3R1YWxcbiAgICBsZXQgaGFzaGVzID0gaWRzLm1hcCgoaWQpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgaWQgIT09ICdudW1iZXInKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBpZHMgeW91XFwncmUgaGFzaGluZyBzaG91bGQgb25seSBiZSBudW1iZXJzJylcbiAgICAgIH1cbiAgICAgIHJldHVybiBjcmVhdGVIYXNoKGlkLCBzYWx0cywgYmFzZSlcbiAgICB9KVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkczogaWRzLFxuICAgICAgaGFzaGVzOiBoYXNoZXMsXG4gICAgICBzYWx0czogc2FsdHMsXG4gICAgICBiYXNlOiBiYXNlXG4gICAgfVxuICB9LFxuICAvKipcbiAgICogU2ltcGxpZmllZCBBUEkgdG8ganVzdCByZXR1cm4gYSBzaW5nbGUgdG9rZW4gdXNpbmcgZGVmYXVsdHNcbiAgICogQHJldHVybiB7U3RyaW5nfSBhIGhhc2hcbiAgICovXG4gIGhhc2hpc2ggKCkge1xuICAgIHJldHVybiBjcmVhdGVIYXNoKFxuICAgICAgW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCldLFxuICAgICAgY3JlYXRlU2FsdHMoMiwgMzYpLFxuICAgICAgMzZcbiAgICApXG4gIH0sXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgc3BlY2lmaWVkIG51bWJlciBvZiByYW5kb20gdG9rZW5zXG4gICAqIEBwYXJhbSAge051bWJlcn0gbnVtICBudW1iZXIgb2YgdG9rZW5zIHRvIGNyZWF0ZVxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IG4gICAgbnVtYmVyIG9mIHNhbHRzIHRvIGFkZCB0byBlYWNoIGhhc2hcbiAgICogQHBhcmFtICB7TnVtYmVyfSBiYXNlIHJhZGl4IGJhc2UsIDE2IHRocm91Z2ggMzYgYWxsb3dlZFxuICAgKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgYSBoYXNoIG9iamVjdCBjb250YWluaW5nIHRoZSBoYXNoZXMgYXMgd2VsbCBhcyBpbmZvIG5lZWRlZCB0byByZXZlcnNlIHRoZW1cbiAgICovXG4gIGJ1bmNoIChudW0sIG4sIGJhc2UpIHtcbiAgICBudW0gPSBudW0gfHwgMVxuICAgIG4gPSBuIHx8IDJcbiAgICBiYXNlID0gYmFzZSB8fCAzNlxuXG4gICAgaWYgKHR5cGVvZiBudW0gIT09ICdudW1iZXInKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgbnVtIHNob3VsZCBiZSBhIG51bWJlcicpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDApIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBudW1iZXIgb2Ygc2FsdHMgc2hvdWxkIGJlIGEgcG9zaXRpdmUgaW50ZWdlcicpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgYmFzZSAhPT0gJ251bWJlcicgfHwgYmFzZSA8IDE2IHx8IGJhc2UgPiAzNikge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGJhc2Ugc2hvdWxkIGJlIGEgbnVtYmVyIGJldHdlZW4gMTYgYW5kIDM2JylcbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgdGhlIGlkc1xuICAgIGxldCBpZHMgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcbiAgICAgIGlkcy5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGgucG93KDEwLCBudW0udG9TdHJpbmcoMTApLmxlbmd0aCArIDIpKSlcbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgdGhlIHNhbHRzLiBUaGlzIHdpbGwgYmUgdGhlIHNhbWUgZm9yIGFsbCBoYXNoZXNcbiAgICBjb25zdCBzYWx0cyA9IGNyZWF0ZVNhbHRzKG4sIGJhc2UpXG5cbiAgICAvLyBDb21iaW5lIHRoZSBzYWx0cyBhbmQgdGhlIGFjdHVhbFxuICAgIGxldCBoYXNoZXMgPSBpZHMubWFwKChpZCkgPT4ge1xuICAgICAgcmV0dXJuIGNyZWF0ZUhhc2goaWQsIHNhbHRzLCBiYXNlKVxuICAgIH0pXG5cbiAgICByZXR1cm4ge1xuICAgICAgaWRzOiBpZHMsXG4gICAgICBoYXNoZXM6IGhhc2hlcyxcbiAgICAgIHNhbHRzOiBzYWx0cyxcbiAgICAgIGJhc2U6IGJhc2VcbiAgICB9XG4gIH0sXG4gIC8qKlxuICAgKiBUYWtlcyBhIHN0cmluZyBhbmQgbmVjZXNzYXJ5IGNvbXBvbmVudHMgdG8gcmV2ZXJzZSBiYWNrIHRvIHRoZSBvcmlnaW5hbCBudW1iZXJcbiAgICogQHBhcmFtICB7QXJyYXl9IGhhc2hlcyAgIGxpc3Qgb2YgaGFzaGVzIHRvIHJldmVyc2VcbiAgICogQHBhcmFtICB7QXJyYXl9IHNhbHRzICBsaXN0IG9mIHNhbHRzIGFwcGxpZWQgdG8gdGhlIGxpc3QgKHByb3ZpZGVkIGZyb20gYGhhc2hgKVxuICAgKiBAcGFyYW0gIHtiYXNlfSBiYXNlICAgICByYWRpeCBiYXNlLCAxNiB0aHJvdWdoIDM2IGFsbG93ZWRcbiAgICogQHJldHVybiB7QXJyYXl9ICAgICAgICAgIGxpc3Qgb2YgcmV2ZXJzZWQgaGFzaGVzXG4gICAqL1xuICByZXZlcnNlIChoYXNoZXMsIHNhbHRzLCBiYXNlKSB7XG4gICAgYmFzZSA9IGJhc2UgfHwgMzZcblxuICAgIGlmICghaGFzaGVzLnNwbGljZSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGhhc2hlcyBhcmd1bWVudCBzaG91bGQgYmUgYW4gYXJyYXkgb2YgaGFzaGVzIHByb3ZpZGVkIGJ5IHRoZSBoYXNoIG1ldGhvZCcpXG4gICAgfVxuICAgIGlmICghc2FsdHMuc3BsaWNlKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgc2FsdHMgYXJndW1lbnQgc2hvdWxkIGJlIGFuIGFycmF5IG9mIHNhbHQgc3RyaW5ncyBwcm92aWRlZCBieSB0aGUgaGFzaCBtZXRob2QnKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGJhc2UgIT09ICdudW1iZXInIHx8IGJhc2UgPCAxNiB8fCBiYXNlID4gMzYpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBiYXNlIHNob3VsZCBiZSBhIG51bWJlciBiZXR3ZWVuIDE2IGFuZCAzNicpXG4gICAgfVxuICAgIGNvbnN0IHJlID0gbmV3IFJlZ0V4cChzYWx0cy5qb2luKCd8JyksICdnJylcblxuICAgIGxldCByZXZlcnNlZCA9IGhhc2hlcy5tYXAoKGhhc2gpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgaGFzaCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGhhc2hlcyB5b3VcXCdyZSByZXZlcnNpbmcgc2hvdWxkIG9ubHkgYmUgc3RyaW5ncycpXG4gICAgICB9XG4gICAgICBsZXQgc3RyaXBwZWQgPSBoYXNoLnJlcGxhY2UocmUsICcnKVxuICAgICAgcmV0dXJuIHBhcnNlSW50KHN0cmlwcGVkLCBiYXNlKVxuICAgIH0pXG5cbiAgICByZXR1cm4gcmV2ZXJzZWRcbiAgfVxufVxuIl19
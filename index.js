'use strict'

const harsh = {
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
  hash (ids = [this._id], n = this._n, base = this._base) {
    try {
      if (!ids.splice) {
        throw new TypeError('The ids argument should be an array of numbers')
      }
      if (typeof n !== 'number' || n < 0) {
        throw new TypeError('The number of salts should be a positive integer')
      }
      if (typeof base !== 'number' || base < 16 || base > 36) {
        throw new TypeError('The base should be a number between 16 and 36')
      }
      
      // Create the salts. This will be the same for all hashes
      let salts = []
      for (let i = 0; i < n; i++) {
        salts.push(Math.floor(Math.random() * Math.pow(10, 6)).toString(base))
      }

      // Combine the salts and the actual 
      let hashes = ids.map((id) => {
        if (typeof id !== 'number') {
          throw new TypeError('The ids you\'re hashing should only be numbers')
        }
        const hash = id.toString(base)
        let pieces = [...salts, hash]
        let hashString = ''
        do {
          let index = Math.floor(Math.random() * pieces.length)
          hashString += pieces[index]
          pieces.splice(index, 1)
        } while (pieces.length)
        return hashString
      })

      return {
        ids: ids,
        hashes: hashes,
        salts: salts,
        base: base
      } 
    } catch (e) {
      console.error(e.name, e.message)
    }
  },
  /**
   * Takes a string and necessary components to reverse back to the original number
   * @param  {Array} hashes   list of hashes to reverse
   * @param  {Array} salts  list of salts applied to the list (provided from `hash`)
   * @param  {base} base     radix base, 16 through 36 allowed
   * @return {Array}          list of reversed hashes
   */
  revarse (hashes, salts, base = this._base) {
    try {
      if (!hashes.splice) {
        throw new TypeError('The hashes argument should be an array of hashes provided by the hash method')
      }
      if (!hashes.splice) {
        throw new TypeError('The salts argument should be an array of salt strings provided by the hash method')
      }
      if (typeof base !== 'number' || base < 16 || base > 36) {
        throw new TypeError('The base should be a number between 16 and 36')
      }
      const re = new RegExp(salts.join('\|'), 'g')
      
      let reversed = hashes.map((hash) => {
        if (typeof hash !== 'string') {
          throw new TypeError('The hashes you\'re reversing should only be strings')
        }
        let stripped = hash.replace(re, '')
        return parseInt(stripped, base)
      })
      return reversed
    } catch (e) {
      console.error(e.name, e.message)
    }
  }
}

module.exports = harsh
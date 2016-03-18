/* global describe it */

import {assert} from 'chai'
import harsh from '../index'

describe('harsh', () => {
  it('has default properties', () => {
    assert.isObject(harsh)
    assert.strictEqual(harsh._base, 36)
    assert.strictEqual(harsh._n, 2)
    assert.isNumber(harsh._id)
    assert.isFunction(harsh.hash)
    assert.isFunction(harsh.revarse)
  })

  describe('hash', () => {
    it('accepts no args if desired', () => {
      const hash = harsh.hash()
      assert.isObject(hash)
      assert.isOk(hash)
      assert.lengthOf(hash.ids, 1)
      assert.lengthOf(hash.hashes, 1)
      assert.lengthOf(hash.salts, 2)
      assert.strictEqual(hash.base, 36)
    })
    it('returns undefined if invalid arguments', () => {
      assert.isNotOk(harsh.hash(123))
      assert.isNotOk(harsh.hash([123], 'a'))
      assert.isNotOk(harsh.hash([123], 2, 15))
      assert.isNotOk(harsh.hash([123], 2, 37))
      assert.isOk(harsh.hash([123], 2, 36))
    })
    it('returns the same number of hashes as ids', () => {
      assert.lengthOf(harsh.hash().hashes, 1)
      let ids = [1]
      assert.lengthOf(harsh.hash(ids).hashes, 1)
      ids.push(12)
      assert.lengthOf(harsh.hash(ids).hashes, 2)
      ids.push(123)
      assert.lengthOf(harsh.hash(ids).hashes, 3)
    })
    it('returns the same number of salts as specified', () => {
      assert.lengthOf(harsh.hash().salts, 2)
      assert.lengthOf(harsh.hash([123]).salts, 2)
      assert.lengthOf(harsh.hash([123], 1).salts, 1)
      assert.lengthOf(harsh.hash([123], 2).salts, 2)
    })
    it('returns the same base as specified', () => {
      assert.strictEqual(harsh.hash().base, 36)
      assert.strictEqual(harsh.hash([123], 2).base, 36)
      assert.strictEqual(harsh.hash([123], 1, 36).base, 36)
      assert.strictEqual(harsh.hash([123], 2, 16).base, 16)
    })
    it('creates a stringified version of the ids', () => {
      const re = new RegExp(`${(123).toString(36)}`)
      const re2 = new RegExp(`${(1234).toString(36)}`)
      assert.match(harsh.hash([123]).hashes[0], re)
      assert.match(harsh.hash([123, 1234]).hashes[1], re2)
    })
    it('adds salts to the stringified id', () => {
      const re = new RegExp(`${(123).toString(36)}`)
      assert.match(harsh.hash([123]).hashes[0], re)
      assert.operator(harsh.hash([123]).hashes[0].length, '>', (123).toString(36).length)
    })
  })
  describe('revarse', () => {
    it('returns undefined if invalid arguments', () => {
      const hash = harsh.hash([123])

      assert.isNotOk(harsh.revarse())
      assert.isNotOk(harsh.revarse(hash))
      assert.isNotOk(harsh.revarse(hash.hashes, 'a'))
      assert.isNotOk(harsh.revarse(hash.hashes, hash.salts, 37))
      assert.isNotOk(harsh.revarse(hash.hashes, hash.salts, 15))
      assert.isOk(harsh.revarse(hash.hashes, hash.salts, hash.base))
    })
    it('reverses a hash back to its id', () => {
      const hash = harsh.hash([123])

      assert.sameDeepMembers(harsh.revarse(hash.hashes, hash.salts), hash.ids)
    })
    it('reverses multiple hashes back to their id', () => {
      const hash = harsh.hash([1, 12, 123])

      assert.sameDeepMembers(harsh.revarse(hash.hashes, hash.salts), hash.ids)
    })
    it('requires a matching base', () => {
      const hash = harsh.hash([123, 1234, 12345])

      assert.notInclude(harsh.revarse(hash.hashes, hash.salts, 16), hash.ids[0])
      assert.notInclude(harsh.revarse(hash.hashes, hash.salts, 16), hash.ids[1])
      assert.notInclude(harsh.revarse(hash.hashes, hash.salts, 16), hash.ids[2])
    })
  })
})

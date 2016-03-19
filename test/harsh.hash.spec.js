import test from 'ava'
import harsh from '../index'

let consoleErrorClone

test.beforeEach((t) => {
  consoleErrorClone = console.error

  console.error = (msg) => {
    return msg
  }
})

test.afterEach((t) => {
  console.error = consoleErrorClone
})

test('accepts no args if desired', (t) => {
  const hash = harsh.hash()
  t.true(typeof hash === 'object')
  t.ok(hash)
  t.same(hash.ids.length, 1)
  t.same(hash.hashes.length, 1)
  t.same(hash.salts.length, 2)
  t.same(hash.base, 36)
})

test('throws TypeErrors if invalid arguments', (t) => {
  t.throws(harsh.hash(123), TypeError)
  t.throws(harsh.hash(['a']), TypeError)
  t.throws(harsh.hash([123], 'a'), TypeError)
  t.throws(harsh.hash([123], 2, 15), TypeError)
  t.throws(harsh.hash([123], 2, 37), TypeError)
  t.ok(harsh.hash([123], 2, 36))
})

test('returns the same number of hashes as ids', (t) => {
  t.same(harsh.hash().hashes.length, 1)
  let ids = [1]
  t.same(harsh.hash(ids).hashes.length, 1)
  ids.push(12)
  t.same(harsh.hash(ids).hashes.length, 2)
  ids.push(123)
  t.same(harsh.hash(ids).hashes.length, 3)
})

test('returns the same number of salts as specified', (t) => {
  t.same(harsh.hash().salts.length, 2)
  t.same(harsh.hash([123]).salts.length, 2)
  t.same(harsh.hash([123], 1).salts.length, 1)
  t.same(harsh.hash([123], 2).salts.length, 2)
})

test('returns the same base as specified', (t) => {
  t.same(harsh.hash().base, 36)
  t.same(harsh.hash([123], 2).base, 36)
  t.same(harsh.hash([123], 1, 36).base, 36)
  t.same(harsh.hash([123], 2, 16).base, 16)
})

test('creates a stringified version of the ids', (t) => {
  const re = new RegExp(`${(123).toString(36)}`)
  const re2 = new RegExp(`${(1234).toString(36)}`)
  t.regex(harsh.hash([123]).hashes[0], re)
  t.regex(harsh.hash([123, 1234]).hashes[1], re2)
})

test('adds salts to the stringified id', (t) => {
  const re = new RegExp(`${(123).toString(36)}`)
  t.regex(harsh.hash([123]).hashes[0], re)
  t.true(harsh.hash([123]).hashes[0].length > (123).toString(36).length)
})

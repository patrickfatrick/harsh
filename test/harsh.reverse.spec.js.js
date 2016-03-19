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

test('throws TypeErrors if invalid arguments', (t) => {
  const hash = harsh.hash([123])

  t.throws(harsh.reverse(), TypeError)
  t.throws(harsh.reverse(hash), TypeError)
  t.throws(harsh.reverse([123], hash.salts), TypeError)
  t.throws(harsh.reverse(hash.hashes, 'a'), TypeError)
  t.throws(harsh.reverse(hash.hashes, hash.salts, 37), TypeError)
  t.throws(harsh.reverse(hash.hashes, hash.salts, 15), TypeError)
  t.ok(harsh.reverse(hash.hashes, hash.salts, hash.base))
})

test('reverses a hash back to its id', (t) => {
  const hash = harsh.hash([123])

  t.same(harsh.reverse(hash.hashes, hash.salts), hash.ids)
})
test('reverses multiple hashes back to their id', (t) => {
  const hash = harsh.hash([1, 12, 123])

  t.same(harsh.reverse(hash.hashes, hash.salts), hash.ids)
})
test('requires a matching base', (t) => {
  const hash = harsh.hash([123, 1234, 12345])

  t.not(harsh.reverse(hash.hashes, hash.salts, 16)[0], hash.ids[0])
  t.not(harsh.reverse(hash.hashes, hash.salts, 16)[1], hash.ids[1])
  t.not(harsh.reverse(hash.hashes, hash.salts, 16)[2], hash.ids[2])
})

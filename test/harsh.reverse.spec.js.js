import test from 'ava'
import { hash, reverse } from '../index'

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
  const h = hash([123])

  t.throws(reverse(), TypeError)
  t.throws(reverse(h), TypeError)
  t.throws(reverse([123], h.salts), TypeError)
  t.throws(reverse(h.hashes, 'a'), TypeError)
  t.throws(reverse(h.hashes, h.salts, 37), TypeError)
  t.throws(reverse(h.hashes, h.salts, 15), TypeError)
  t.ok(reverse(h.hashes, h.salts, h.base))
})

test('reverses a hash back to its id', (t) => {
  const h = hash([123])

  t.same(reverse(h.hashes, h.salts), h.ids)
})
test('reverses multiple hashes back to their id', (t) => {
  const h = hash([1, 12, 123])

  t.same(reverse(h.hashes, h.salts), h.ids)
})
test('requires a matching base', (t) => {
  const h = hash([123, 1234, 12345])

  t.not(reverse(h.hashes, h.salts, 16)[0], h.ids[0])
  t.not(reverse(h.hashes, h.salts, 16)[1], h.ids[1])
  t.not(reverse(h.hashes, h.salts, 16)[2], h.ids[2])
})

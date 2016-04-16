import test from 'ava'
import { bunch } from '../index'

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
  const b = bunch()
  t.true(typeof b === 'object')
  t.truthy(b)
  t.deepEqual(b.ids.length, 1)
  t.deepEqual(b.hashes.length, 1)
  t.deepEqual(b.salts.length, 2)
  t.deepEqual(b.base, 36)
})

test('throws TypeErrors if invalid arguments', (t) => {
  t.throws(bunch([123]), TypeError)
  t.throws(bunch(1, 'a'), TypeError)
  t.throws(bunch(1, 2, 15), TypeError)
  t.throws(bunch(1, 2, 37), TypeError)
  t.truthy(bunch(1, 2, 36))
})

test('returns the same number of hashes as ids', (t) => {
  t.deepEqual(bunch().hashes.length, 1)
  let ids = 1
  t.deepEqual(bunch(ids).hashes.length, 1)
  ids = 2
  t.deepEqual(bunch(ids).hashes.length, 2)
  ids = 3
  t.deepEqual(bunch(ids).hashes.length, 3)
})

test('returns the same number of salts as specified', (t) => {
  t.deepEqual(bunch().salts.length, 2)
  t.deepEqual(bunch(1).salts.length, 2)
  t.deepEqual(bunch(1, 1).salts.length, 1)
  t.deepEqual(bunch(1, 2).salts.length, 2)
})

test('returns the same base as specified', (t) => {
  t.deepEqual(bunch().base, 36)
  t.deepEqual(bunch(1, 2).base, 36)
  t.deepEqual(bunch(1, 1, 36).base, 36)
  t.deepEqual(bunch(1, 2, 16).base, 16)
})

test('creates a stringified version of the ids', (t) => {
  t.true(typeof bunch(1).hashes[0] === 'string')
  t.true(typeof bunch(2).hashes[1] === 'string')
})

test('adds salts to the stringified id', (t) => {
  t.true(bunch(1).hashes[0].length > (99).toString(36).length)
})

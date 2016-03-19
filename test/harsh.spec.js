import test from 'ava'
import harsh from '../index'

test('has default properties', (t) => {
  t.true(typeof harsh === 'object')
  t.same(harsh._base, 36)
  t.same(harsh._n, 2)
  t.same(harsh._num, 1)
  t.ok(harsh._ids.splice)
  t.true(typeof harsh.hash === 'function')
  t.true(typeof harsh.reverse === 'function')
})
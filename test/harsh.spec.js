import test from 'ava'
import harsh from '../index'

test('has some functions', (t) => {
  t.true(typeof harsh === 'object')
  t.true(typeof harsh.hash === 'function')
  t.true(typeof harsh.reverse === 'function')
})

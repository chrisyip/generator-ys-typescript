import test from 'ava'
import * as os from 'os'
import { sayHello } from '../source'

test('sayHello()', t => {
  t.is(sayHello(), `Hello, ${os.userInfo().username}`)
})

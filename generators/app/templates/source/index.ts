import * as os from 'os'

/**
 * Say hello
 */
export function sayHello () {
  return `Hello, ${os.userInfo().username}`
}

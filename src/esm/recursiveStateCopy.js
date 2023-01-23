/**
 * this will deep copy variables
 * I think it's borked if you pass in any built in weird javascript class instances or Date objects, nodelists, things like that
 * but it can handle Arrays, Objects, Number, String, Boolean, and functions
 * it probably won't work with react components
 */
const recursiveStateCopy = (oldState) => {
  if (thisIsPrimitive(oldState) || typeof oldState === 'function') {
    return oldState
  }
  let newState
  if (oldState instanceof Map) {
    newState = new Map([...oldState].map((pair) => recursiveStateCopy(pair)))
  } else if (oldState instanceof Set) {
    newState = new Set([...oldState].map((item) => recursiveStateCopy(item)))
  } else if (Array.isArray(oldState)) {
    newState = oldState.map(value => recursiveStateCopy(value))
  } else if (thisIsAPlainObject(oldState)) {
    // this is a boring-ass object
    newState = Object.keys(oldState).reduce((acc, cur) => {
      acc[cur] = recursiveStateCopy(oldState[cur])
      return acc
    }, {})
  } else if (typeof oldState === 'object') {
    // it's an object, but it didn't pass the plain object test above
    // so this object must be an instance of some special class
    // I haven't tested this thoroughly... it seems too easy
    newState = Object.assign(Object.create(Object.getPrototypeOf(oldState)), oldState)
  }
  return newState
}

const thisIsAPlainObject = (thing) => {
  return Object.getPrototypeOf(thing).constructor.name === 'Object'
}

const thisIsPrimitive = (thing) => {
  return typeof thing === 'string' || typeof thing === 'number' || typeof thing === 'boolean'
}

export default recursiveStateCopy
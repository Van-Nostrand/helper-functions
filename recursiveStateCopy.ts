// this will deep copy objects and arrays
// it's borked if you pass in any "array-like objects" or Date objects, weird things like that. 
// but it can handle Arrays, Objects, Number, String, Boolean
// I recently added support for functions, and a condition for unique classes but I haven't tested it much
export const recursiveStateCopy = (oldState) => {
  if (thisIsPrimitive(oldState) || typeof oldState === 'function') return oldState
  let newState;
  if (Array.isArray(oldState)) {
    newState = oldState.map(value => {
      return recursiveStateCopy(value)
    })
  } else if (thisIsAnObject(oldState)) {
    if (Object.getPrototypeOf(oldState).constructor.name === 'Object') {
      // this is a normal object
      newState = {}
      Object.keys(oldState).forEach(key => {
        newState[key] = recursiveStateCopy(oldState[key])
      })
    } else {
      // must be a special class
      return Object.assign(Object.create(Object.getPrototypeOf(oldState)), oldState)
    }
  }
  return newState;
}

const thisIsAnObject = (thing) => {
  return typeof thing === 'object' && !Array.isArray(thing)
}

const thisIsPrimitive = (thing) => {
  return typeof thing === 'string' || typeof thing === 'number' || typeof thing === 'boolean'
}

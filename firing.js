// DESCRIPTON ON IF BELOW:
// if a consent type is required:true, we run onAccept only since they should never be rejected
// If required not there or required:false, we run both onAccept or onReject depending if it's being accepted rejected

// not firing onReject function on types that have required:true
// if it's required, it should not be rejected
if (checkbox.required) {
  // required so only onAccept firing
  // Verify the key 'onAccept' exists and it's a function
  // If a callback function exists, we run it
  // If the key exists but a non-function is passed, we show a warning on Console
  if (type.onAccept && typeof type.onAccept === 'function') {
    type.onAccept()
  } else if (type.onAccept && typeof type.onAccept !== 'function') {
    console.warn(`Property onAccept on cookie consent type with id "${type.id}" expected a function but received a ${typeof type.onAccept}. Review and make sure you pass a function if you want a callback to run on accepting this cookie consent type.`)
  }
} else {
  if (checkbox?.checked) {
    // consent not required, check if checked so we run onAccept
    // Verify the key 'onAccept' exists and it's a function
    // If a callback function exists, we run it
    // If the key exists but a non-function is passed, we show a warning on Console
    if (type.onAccept && typeof type.onAccept === 'function') {
      type.onAccept()
    } else if (type.onAccept && typeof type.onAccept !== 'function') {
      console.warn(`Property onAccept on cookie consent type with id "${type.id}" expected a function but received a ${typeof type.onAccept}. Review and make sure you pass a function if you want a callback to run on accepting this cookie consent type.`)
    }
  } else {
    // Verify the key 'onReject' exists and it's a function
    // If a callback function exists, we run it
    // If the key exists but a non-function is passed, we show a warning on Console
    if (type.onReject && typeof type.onReject === 'function') {
      type.onReject()
    } else if (type.onReject && typeof type.onReject !== 'function') {
      console.warn(`Property onReject on cookie consent type with id "${type.id}" expected a function but received a ${typeof type.onReject}. Review and make sure you pass a function if you want a callback to run on accepting this cookie consent type.`)
    }
  }
}

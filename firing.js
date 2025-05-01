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

/////////

setDefaultConsents() {
  return
  const consentTypes = this.getConsentTypes()

  const ads = []
  const analytics = []
  const personalization = []

  consentTypes.forEach(type => {
    if (type?.forAds === true) {
      ads.push(type?.id)
    }
    if (type?.forAnalytics === true) {
      analytics.push(type?.id)
    }
    if (type?.forPersonalization === true) {
      personalization.push(type?.id)
    }
  })

  this.gtag('consent', 'default', {
    functionality_storage: 'granted',
    security_storage: 'granted',
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    personalization_storage: 'denied',
  })

  console.log({ ads }, { analytics }, { personalization })

  return

  console.log(consentTypes)

  if (!consentTypes || consentTypes.length === 0) {
    console.warn(`No consent types found in setDefaultConsents()`)
    return
  }

  // function getConsentTypesForAds() {
  // }

  const consentTypeIDs = []

  consentTypes.forEach(type => {
    if (type?.required === true) {
      consentTypeIDs.push(type?.id)
    }
  })

  // const consentTypeIDs = consentTypes.map(type => {
  //   console.log({ type })
  //   if (type?.required === true) {
  //     return type?.id
  //   } else {
  //     return
  //   }
  // })

  console.log({ consentTypeIDs })

  if (!consentTypeIDs || consentTypeIDs.length === 0) {
    console.warn(`No id found found in setDefaultConsents()`)
    return
  }

  const thirdArg = {}

  consentTypeIDs.forEach(id => {
    const name = this.CONSENT_TYPE_PREFIX + id

    thirdArg[id] = localStorage.getItem(name) === this.SET_VALUE ? 'granted' : 'denied'
  })

  console.log(thirdArg)

  this.gtag('consent', 'default', thirdArg)
}
export default class cookieConsent {
  constructor(userConsentTypes, userConfigs) {
    this.PREFIX = 'cookieConsent_' // the global prefix - keep the _ at the end
    this.CONSENT_TYPE_PREFIX = this.PREFIX + 'consentType_' // the name of the consent type
    this.SET_NAME = this.PREFIX + 'isSet' // the name when consent is set
    this.SET_VALUE = 'true' // the value when consent is set

    this.defaultConsentTypes = []
    this.userConsentTypes = userConsentTypes

    this.defaultConfigs = {
      // BEHAVIOR

      // Center the modal vertically
      // https://getbootstrap.com/docs/5.3/components/modal/#vertically-centered
      centered: true,

      // When modals become too long for the user’s viewport or device, they scroll independent of the page itself.
      // https://getbootstrap.com/docs/5.3/components/modal/#scrolling-long-content
      scrollable: true,

      // For modals that simply appear rather than fade in to view, remove the .fade class from your modal markup.
      // https://getbootstrap.com/docs/5.3/components/modal/#remove-animation
      animation: true,

      // When backdrop is set to static, the modal will not close when clicking outside of it.
      // https://getbootstrap.com/docs/5.3/components/modal/#static-backdrop
      staticBackground: true,

      showRejectAllButtonOnBanner: true,

      useCookieInsteadOfLocalStorage: false,

      // CONTENT
      title: 'Cookie Consent',
      rejectAllButtonText: 'Reject all',
      acceptAllButtonText: 'Accept all',
      saveButtonText: 'Save',
    }
    this.userConfigs = userConfigs
  }

  // CONSTANTS

  getPrefix() {
    return this.PREFIX
  }

  getConsentTypePrefix() {
    return this.CONSENT_TYPE_PREFIX
  }

  getConsentSetName() {
    return this.SET_NAME
  }

  getConsentSetValue() {
    return this.SET_VALUE
  }

  // CONSENTS

  getDefaultConsentTypes() {
    return this.defaultConsentTypes
  }

  getUserConsentTypes() {
    return this.userConsentTypes
  }

  getConsentTypes() {
    const defaultConsentTypes = this.getDefaultConsentTypes()
    const userConsentTypes = this.getUserConsentTypes()

    const consentTypes = [...defaultConsentTypes, ...userConsentTypes]

    return consentTypes
  }

  isConsentSet() {
    const consentSetName = this.getConsentSetName()
    const consentSetValue = this.getConsentSetValue()

    try {
      // we need configs to decide if user wants to use localStorage (default) or cookies
      const configs = this.getConfigs()

      if (configs?.useCookieInsteadOfLocalStorage) {
        // TODO: to be developed to set cookie instead of localStorage
        console.log('You are opting to use cookies instead of local storage')
      } else {
        // Gets the item from the localStorage
        const consentValue = localStorage.getItem(consentSetName)

        // Validate if the value stored matches what it should be
        // In this case, even if the name exists but has a different value, we return false
        // This makes sure if the value has changed, or tampered with, we correct it
        return consentValue === consentSetValue
      }
    } catch (error) {
      console.error(error)
    }
  }

  // CONFIGS

  getDefaultConfigs() {
    return this.defaultConfigs
  }

  getUserConfigs() {
    return this.userConfigs
  }

  getConfigs() {
    const defaultConfigs = this.getDefaultConfigs()
    const userConfigs = this.getUserConfigs()

    const configs = { ...defaultConfigs, ...userConfigs }

    return configs
  }

  // Other Functions

  bootstrapExists() {
    return typeof bootstrap !== 'undefined'
  }

  // INITIALIZE

  init() {
    // check if Bootstrap exists before anything else
    if (!this.bootstrapExists()) {
      console.error('BOOTSTRAP COOKIE CONSENT MANAGER: Bootstrap JS is not found. Make sure Bootstrap JS is loaded BEFORE loading this script. For more information, visit https://github.com/ashkan-ahmadi/bootstrap-cookie-consent-manager')
      return
    }
  }
}

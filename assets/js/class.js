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

  getCookieTypePrefix() {
    return this.CONSENT_TYPE_PREFIX
  }

  getCookieSetName() {
    return this.SET_NAME
  }

  getCookieSetValue() {
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

  doesBootstrapExist() {
    if (!bootstrap) {
      console.error('BOOTSTRAP COOKIE CONSENT MANAGER: Bootstrap JS is not found. Make sure Bootstrap JS is loaded BEFORE loading this script. For more information, visit https://github.com/ashkan-ahmadi/bootstrap-cookie-consent-manager')
      return false
    }
    return true
  }

  // INITIALIZE

  init() {
    // check if Bootstrap exists before anything else
    if (!this.doesBootstrapExist()) {
      return
    }
  }
}

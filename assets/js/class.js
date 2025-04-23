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

    // this contains the entire modal HTML and its content
    this.modal = null
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

  showModal(modal) {
    // Pass it: new bootstrap.Modal(selector)
    // The method works only on bootstrap.Modal
    // It doesn't work on an HTML element (for example using document.querySelector('...'))
    // If you have an HTML element, you have to pass to pass it into bootstrap.Modal
    // For example: new bootstrap.Modal(document.querySelector('.modal'))
    modal.show(modal)
  }

  createCookieConsentModalHTML() {
    // if modal has been modified before, we remove it from DOM and re-set it back to null
    if (this.modal !== null) {
      this.modal.remove()
      this.modal = null
    }

    const configs = this.getConfigs()

    const { title, centered, scrollable, animation, staticBackground, showRejectAllButtonOnBanner, rejectAllButtonText, acceptAllButtonText, saveButtonText } = configs || {}

    const modalDialogClasses = []

    if (centered) {
      modalDialogClasses.push('modal-dialog-centered')
    }

    if (scrollable) {
      modalDialogClasses.push('modal-dialog-scrollable')
    }

    // Create a div element to push all the modal HTML into it
    this.modal = document.createElement('div')

    this.modal.innerHTML = `
    <div class="modal ${animation ? 'fade' : ''}" tabindex="-1" ${staticBackground ? 'data-bs-backdrop="static"' : ''} id="cookie-consent-modal">
      <div class="modal-dialog ${modalDialogClasses.join(' ')}">
        <div class="modal-content">
          <div class="modal-header bg-light">
            <p class="modal-title h6">${title}</p>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Body....
          </div>
        </div>
      </div>
    </div>
  `
    return this.modal
  }

  // INITIALIZE
  init() {
    // check if Bootstrap exists before anything else
    if (!this.bootstrapExists()) {
      console.error('BOOTSTRAP COOKIE CONSENT MANAGER: Bootstrap JS is not found. Make sure Bootstrap JS is loaded BEFORE loading this script. For more information, visit https://github.com/ashkan-ahmadi/bootstrap-cookie-consent-manager')
      return
    }

    // This creates and returns the modal's HTML
    this.modal = this.createCookieConsentModalHTML()

    // We add it to the DOM
    document.body.append(this.modal)

    const modalAsBSModalObject = new bootstrap.Modal(this.modal.querySelector('#cookie-consent-modal'))
    const modalHTMLNode = this.modal.querySelector('#cookie-consent-modal')

    this.showModal(modalAsBSModalObject)
  }
}

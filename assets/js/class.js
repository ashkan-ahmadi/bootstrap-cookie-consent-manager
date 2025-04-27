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

      showCloseButtonOnModal: false,

      showRejectAllButtonOnBanner: true,

      // useCookieInsteadOfLocalStorage: false,

      // CONTENT
      title: 'Cookie Consent',
      rejectAllButtonText: 'Reject all',
      acceptAllButtonText: 'Accept all',
      saveButtonText: 'Save',
    }
    this.userConfigs = userConfigs

    // this contains the entire toast banner HTML and its content
    this.cookieBanner = null
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

  setConsent_acceptAll() {
    try {
      const consentTypes = this.getConsentTypes()

      if (!consentTypes || consentTypes?.length === 0) {
        return
      }

      consentTypes.forEach(type => {
        // verify that the type has an id key
        if (typeof type.id === 'undefined' || !type?.id) {
          console.warn(`Consent type required an "id" property but either it was not provided, or it's empty. This type was skipped completely and nothing was set for this type.`)

          // Returning in a forEach skips the current itiration and goes to the next one
          return
        }

        const name = this.CONSENT_TYPE_PREFIX + type?.id
        const value = this.SET_VALUE // set everything to the default set value (usually true)

        localStorage.setItem(name, value)

        // fire one event per consent type
        // this makes setting up different triggers and tags much easier on GTM
        // TODO: this could go into a standalone function to be reused when init loads and conset is already set
        // we still need to fire this on every page
        this.pushToDataLayer({
          event: `accept_consent_type_${type?.id}`,
        })

        // Verify the key 'onAccept' exists and it's a function
        // If a callback function exists, we run it
        // If the key exists but a non-function is passed, we show a warning on Console
        if (type.onAccept && typeof type.onAccept === 'function') {
          type.onAccept()
        } else if (type.onAccept && typeof type.onAccept !== 'function') {
          console.warn(`Property onAccept on cookie consent type with id "${type.id}" expected a function but received a ${typeof type.onAccept}. Review and make sure you pass a function if you want a callback to run on accepting this cookie consent type.`)
        }
      })

      // Set an item to show that conset is set
      localStorage.setItem(this.SET_NAME, this.SET_VALUE)
    } catch (error) {
      console.error('There was an error with setConsent_acceptAll()')
      console.error(error)
    }
  }

  setConsent_rejectAll() {
    console.log('running setConsent_rejectAll')
  }

  setConsent_customize() {
    console.log('running setConsent_customize')
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

  pushToDataLayer(obj) {
    window.dataLayer = window.dataLayer || []

    window.dataLayer.push(obj)

    console.log(window.dataLayer)
  }

  gtag() {
    window.dataLayer = window?.dataLayer || []

    dataLayer.push(arguments)
  }

  // BANNER
  createBannerHTML() {
    const cookieBannerOuterDiv = document.createElement('div')

    cookieBannerOuterDiv.innerHTML = `
      <div class="position-fixed top-0 bottom-0 start-0 end-0 bg-dark opacity-50 z-1">
      </div>
    `

    const banner = document.createElement('div')

    banner.innerHTML = `

      <div class="position-fixed bottom-0 start-0 p-3 w-100 border-top bg-light z-2">
        <div class="container">
          <div class="row g-3 g-md-4 g-xl-5">
            <div class="col-12 col-md-8 col-xl-9">
              <p class="fs-5 fw-bold mb-1">
                Customize the cookies
              </p>
            
              <p class="mb-0">
               We use cookies on our site to enhance your user experience, provide personalized content, and analyze our traffic. You can find more information on our <a href="#">Cookie Policy</a>.
              </p>
            </div>
            <div class="col">
              <div class="row xxl-block flex-column g-1">
                <button type="button" class="btn btn-primary" data-function="accept-all-cookies">Accept all</button>
                <button type="button" class="btn btn-primary" data-function="refuse-all-cookies">Refuse non-essentials</button>
                <button type="button" class="btn btn-primary" data-function="customize-cookies">Customize</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>
    `

    cookieBannerOuterDiv.appendChild(banner)

    return cookieBannerOuterDiv
  }

  showBanner() {
    // if modal has been modified before, we remove it from DOM and re-set it back to null
    if (this.cookieBanner !== null) {
      this.cookieBanner.remove()
      this.cookieBanner = null
    }

    this.cookieBanner = this.createBannerHTML()

    document.body.append(this.cookieBanner)

    const allButtons = this.cookieBanner.querySelectorAll('button')

    if (!allButtons) {
      return
    }

    const [acceptAllButton, rejectAllButton, customizeButton] = allButtons

    if (acceptAllButton) {
      acceptAllButton.addEventListener('click', e => {
        try {
          console.log('accept all')
          this.setConsent_acceptAll()
          this.cookieBanner.remove()
          this.cookieBanner = null

          this.pushToDataLayer({ event: 'accept_all_consent_types' })
        } catch (error) {
          console.log('There was an issue with callback function of acceptAllButton')
          console.error(error)
        }
      })
    }

    if (rejectAllButton) {
      rejectAllButton.addEventListener('click', e => {
        console.log('reject all')
      })
    }

    if (customizeButton) {
      customizeButton.addEventListener('click', e => {
        try {
          console.log('customize')

          this.cookieBanner.remove()
          this.cookieBanner = null

          this.showModal()
        } catch (error) {
          console.log('There was an issue with callback function of customizeButton')
          console.error(error)
        }
      })
    }
  }
  // MODAL

  createModalHTML() {
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
            ${this.showCloseButtonOnModal ? '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' : ''}
            
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

  showModal() {
    // This creates and returns the modal's HTML
    this.modal = this.createModalHTML()

    const modalAsBSModalObject = new bootstrap.Modal(this.modal.querySelector('#cookie-consent-modal'))

    modalAsBSModalObject.show()
  }

  // INITIALIZE
  init() {
    // check if Bootstrap exists before anything else
    if (!this.bootstrapExists()) {
      console.error('BOOTSTRAP COOKIE CONSENT MANAGER: Bootstrap JS is not found. Make sure Bootstrap JS is loaded BEFORE loading this script. For more information, visit https://github.com/ashkan-ahmadi/bootstrap-cookie-consent-manager')
      return
    }

    // Verify if cookie is already set. If yes, nothing needs to be done at the moment
    if (this.isConsentSet()) {
      console.log('consent is set already')
      return // TODO: not sure what to do here

      // read values from localStorage
      // fire GA events
    }

    this.showBanner()
  }
}

class cookieConsentManager {
  constructor(userConsentTypes, userConfigs) {
    this.defaultConsentTypes = []
    this.userConsentTypes = userConsentTypes

    this.defaultConfigs = {
      // Core information
      prefix: 'cookieConsent', // the name of the cookie consent system
      consentTypePrefix: 'consentType', // the name of the consent type
      setName: 'isSet', // the value when consent is set
      positiveValue: 'true', //  the value when consent is accepted/granted
      negativeValue: 'false', // the value when consent is rejected/denied
      versionName: 'version', // the label of the version
      version: 2.2, // the version number

      // EVENT NAMES
      cookieConsentAcceptEventName: 'cookie_consent_accept', // this is the name of the event that fires when consent is accepted
      cookieConsentRejectEventName: 'cookie_consent_reject', // this is the name of the event that fires when consent is rejected
      cookieConsentUpdateEventName: 'cookie_consent_update', // this is the name of the event that fires when consent is updated - this is the name you should use on GTM > Triggers > Custom Event

      // MODAL

      modalId: 'cookie-consent-manager-modal',

      modalTitle: 'Customize the cookies',

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

      useLocalStorage: true, // not implemented yet

      // CONTENT
      acceptAllButtonText: 'Accept all',
      acceptAllButtonAccessibleText: 'Accept all cookies',
      rejectAllButtonText: 'Reject all',
      rejectAllButtonAccessibleText: 'Reject all cookies',
      customizeButtonText: 'Customize',
      customizeButtonAccessibleText: 'Customize cookies',
      saveButtonText: 'Save',
      saveButtonAccessibleText: 'Save preferences',

      // BANNER
      bannerTitle: 'We respect your privacy',
      bannerText: 'We use cookies on our site to enhance your user experience, provide personalized content, and analyze our traffic. You can find more information on our <a href="/cookie-policy">Cookie Policy</a>.',
      showRejectAllButtonOnBanner: true,
      freezeScrollingOnBanner: true,

      // CONFIRMATION TOAST
      showToast: true,
      toastText: 'Cookie consent saved successfully',
      toastPosition: 'bottom-left', // top-left|top-center|top-right|middle-left|middle-center|middle-right|bottom-left|bottom-center|bottom-right
      toastContainerId: 'toast-container',
      toastId: 'toast-' + Date.now(),
      toastBackgroundClass: 'text-bg-success',
      toastShowCloseButton: true,
      toastEscapeHTML: true,
      toastAnimation: true,
      toastAutohide: true,
      toastDelay: 3500,
    }
    this.userConfigs = userConfigs

    // HTML ELEMENTS
    this.banner = null
    this.modal = null
  }

  // +-------------------------------------+
  // | INITIALIZE                          |
  // +-------------------------------------+

  init() {
    // check if Bootstrap exists before anything else
    if (!this.bootstrapExists()) {
      console.error('BOOTSTRAP COOKIE CONSENT MANAGER: Bootstrap JS is not found. Make sure Bootstrap JS is loaded BEFORE loading this script. For more information, visit https://github.com/ashkan-ahmadi/bootstrap-cookie-consent-manager')
      return
    }

    // First thing we do, we set the default
    this.setConsent_default()

    // first time visiting, nothing set
    if (!this.isConsentSet()) {
      this.showBanner()
      return
    }

    if (!this.verifyVersionFromLocalStorage()) {
      console.warn(`There is a version mismatch between the current version of the Cookie Consent Manager library and what's stored in the localStorage. It's recommended to update the Cookie Consent Manager library: https://github.com/ashkan-ahmadi/bootstrap-cookie-consent-manager`)
    }

    // 👇 Everything below is for someone who has already responded

    // This updates the consent from what's in the localStorage
    this.updateConsent_fromLocalStorage()

    // This fires the cookie_consent_update event which the tags rely on on GTM
    this.fireCookieConsentUpdateEvent()

    // This is an optional and extra step to fire an event per consent type
    // this can be used as the GTM trigger as well
    this.fireCookieConsentIndividualEvents()
  }

  // +-------------------------------------+
  // | CONSTANTS                           |
  // +-------------------------------------+

  getPrefix() {
    const configs = this.getConfigs()

    const { prefix } = configs || {}

    if (!prefix) {
      console.warn(`The 'prefix' value is not found or it's empty. Make sure you pass a prefix value (or remove to set the default value)`)
    }

    return prefix + '_'
  }

  getConsentTypePrefix() {
    const prefix = this.getPrefix()

    const configs = this.getConfigs()

    const { consentTypePrefix } = configs || {}

    if (!consentTypePrefix) {
      console.warn(`The 'consentTypePrefix' value is not found or it's empty. Make sure you pass a consentTypePrefix value (or remove to set the default value)`)
    }

    return prefix + consentTypePrefix + '_'
  }

  getConsentSetName() {
    const prefix = this.getPrefix()

    const configs = this.getConfigs()

    const { setName } = configs || {}

    if (!setName) {
      console.warn(`The 'setName' value is not found or it's empty. Make sure you pass a setName value (or remove to set the default value)`)
    }

    return prefix + setName
  }

  getPositiveValue() {
    const configs = this.getConfigs()

    const { positiveValue } = configs || {}

    if (!positiveValue) {
      console.warn(`The 'positiveValue' value is not found or it's empty. Make sure you pass a positiveValue value (or remove to set the default value)`)
    }

    return positiveValue
  }

  getNegativeValue() {
    const configs = this.getConfigs()

    const { negativeValue } = configs || {}

    if (!negativeValue) {
      console.warn(`The 'negativeValue' value is not found or it's empty. Make sure you pass a negativeValue value (or remove to set the default value)`)
    }

    return negativeValue
  }

  getVersion() {
    const configs = this.getConfigs()

    const { version } = configs || {}

    if (!version) {
      console.warn(`The 'version' value is not found or it's empty. Make sure you pass a version value (or remove to set the default value)`)
    }

    return version
  }

  getVersionName() {
    const prefix = this.getPrefix()

    const configs = this.getConfigs()

    const { versionName } = configs || {}

    if (!versionName) {
      console.warn(`The 'versionName' value is not found or it's empty. Make sure you pass a versionName value (or remove to set the default value)`)
    }

    return prefix + versionName
  }

  // +-------------------------------------+
  // | CONSENTS                            |
  // +-------------------------------------+

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

  getEnabledConsentTypes() {
    const consentTypes = this.getConsentTypes()

    if (!consentTypes) {
      return
    }

    const enabledConsentTypes = consentTypes.filter(consentType => {
      // not false allows us to not pass enabled at all
      // unless it's enabled:false explicitly, it will show up
      return consentType.enabled !== false
    })

    return enabledConsentTypes
  }

  getRequiredConsentTypes() {
    const consentTypes = this.getConsentTypes()

    if (!consentTypes) {
      return
    }

    const requiredConsentTypes = consentTypes.filter(consentType => {
      // not false allows us to not pass enabled at all
      // unless it's enabled:false explicitly, it will show up
      return consentType.required === true
    })

    return requiredConsentTypes
  }

  isConsentSet() {
    const consentSetName = this.getConsentSetName()
    const positiveValue = this.getPositiveValue()

    try {
      // we need configs to decide if user wants to use localStorage (default) or cookies
      const configs = this.getConfigs()

      if (!configs?.useLocalStorage) {
        console.log('You are opting to use cookies instead of local storage')
      } else {
        // Gets the item from the localStorage
        const consentValue = localStorage.getItem(consentSetName)

        // Validate if the value stored matches what it should be
        // In this case, even if the name exists but has a different value, we return false
        // This makes sure if the value has changed, or tampered with, we correct it
        return consentValue === positiveValue
      }
    } catch (error) {
      console.error(error)
    }
  }

  setConsent_acceptAll() {
    try {
      const enabledConsentTypes = this.getEnabledConsentTypes()

      if (!enabledConsentTypes || enabledConsentTypes?.length === 0) {
        return
      }

      enabledConsentTypes.forEach(type => {
        // verify that the type has an id key
        if (typeof type.id === 'undefined' || !type?.id) {
          console.warn(`Consent type required an "id" property but either it was not provided, or it's empty. This type was skipped completely and nothing was set for this type.`)

          // Returning in a forEach skips the current itiration and goes to the next one
          return
        }

        const prefix = this.getConsentTypePrefix()

        const name = prefix + type?.id
        const value = this.getPositiveValue() // set everything to the default set value (usually true)

        localStorage.setItem(name, value)

        if (type.onAccept) {
          if (typeof type.onAccept === 'function') {
            type.onAccept()
          } else {
            console.warn(`Property onAccept on cookie consent type with id "${type.id}" expected a function but received a ${typeof type.onAccept}. Review and make sure you pass a function if you want a callback to run on accepting this cookie consent type.`)
          }
        }
      })

      // Set consent isSet and version
      this.setConsentSet()
      this.setVersion()
    } catch (error) {
      console.error('There was an error with setConsent_acceptAll()')
      console.error(error)
    }
  }

  setConsent_rejectAll() {
    try {
      const enabledConsentTypes = this.getEnabledConsentTypes()

      if (!enabledConsentTypes || enabledConsentTypes?.length === 0) {
        console.warn(`requiredConsentTypes is null or empty. If this is intentional, you can ignore this warning.`)
        return
      }

      enabledConsentTypes.forEach(type => {
        // verify that the type has an id key
        if (typeof type.id === 'undefined' || !type?.id) {
          console.warn(`Consent type required an "id" property but either it was not provided, or it's empty. This type was skipped completely and nothing was set for this type.`)

          // Returning in a forEach skips the current itiration and goes to the next one
          return
        }

        const prefix = this.getConsentTypePrefix()
        const positiveValue = this.getPositiveValue()
        const negativeValue = this.getNegativeValue()

        const name = prefix + type?.id
        const value = type?.required ? positiveValue : negativeValue

        localStorage.setItem(name, value)

        // not firing onReject function on types that have required:true
        // if it's required, it should not be rejected
        if (type.required !== true) {
          if (type.onReject) {
            if (typeof type.onReject === 'function') {
              type.onReject()
            } else {
              console.warn(`Property onReject on cookie consent type with id "${type.id}" expected a function but received a ${typeof type.onReject}. Review and make sure you pass a function if you want a callback to run on accepting this cookie consent type.`)
            }
          }
        } else {
          if (type.onAccept) {
            if (typeof type.onAccept === 'function') {
              type.onAccept()
            } else {
              console.warn(`Property onAccept on cookie consent type with id "${type.id}" expected a function but received a ${typeof type.onAccept}. Review and make sure you pass a function if you want a callback to run on accepting this cookie consent type.`)
            }
          }
        }
      })

      // Set consent isSet and version
      this.setConsentSet()
      this.setVersion()
    } catch (error) {
      console.error('There was an error with setConsent_acceptAll()')
      console.error(error)
    }
  }

  setConsent_saveCustomized() {
    const configs = this.getConfigs()

    const { modalId } = configs || {}

    try {
      // get the modal from the DOM
      const modal = document.querySelector(`#${modalId}`)

      // make sure it's not empty
      if (!modal) {
        console.warn(`modal in setConsent_saveCustomized is empty.`)
        return
      }

      // get all the check boxes
      const checkboxes = modal.querySelectorAll('input.form-check-input')

      // make sure it's not empty
      if (!checkboxes || checkboxes.length === 0) {
        console.warn(`checkboxes in setConsent_saveCustomized is empty.`)
        return
      }

      const enabledConsentTypes = this.getEnabledConsentTypes()

      checkboxes.forEach(checkbox => {
        // 1. handle the local storage

        const prefix = this.getConsentTypePrefix()

        const id = checkbox?.id
        const checkboxIsChecked = checkbox?.checked
        const name = prefix + id
        const value = checkboxIsChecked ? this.getPositiveValue() : this.getNegativeValue()

        localStorage.setItem(name, value)

        // 2. handle the onAccept and onReject callbacks

        const type = enabledConsentTypes.find(type => type.id === id)

        if (!type) {
          // jump to next iteration
          return
        }

        // Accepting
        if (checkboxIsChecked) {
          const onAcceptCallback = type.onAccept

          if (onAcceptCallback && typeof onAcceptCallback === 'function') {
            onAcceptCallback()
          }
        } else {
          // Rejecting
          const onRejectCallback = type.onReject

          if (onRejectCallback && typeof onRejectCallback === 'function') {
            onRejectCallback()
          }
        }
      })

      // Set consent isSet and version
      this.setConsentSet()
      this.setVersion()
    } catch (error) {
      console.error('There was an error with setConsent_saveCustomized()')
      console.error(error)
    }
  }

  setConsentSet() {
    // Set an item to show that conset is set
    const setName = this.getConsentSetName()
    const setPositiveValue = this.getPositiveValue()
    localStorage.setItem(setName, setPositiveValue)
  }

  // +-------------------------------------+
  // | CONFIGS                             |
  // +-------------------------------------+

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

  // +-------------------------------------+
  // | BANNER                              |
  // +-------------------------------------+

  createBannerHTML() {
    const configs = this.getConfigs()

    // prettier-ignore
    const {
      bannerTitle,
      bannerText,
      acceptAllButtonText,
      acceptAllButtonAccessibleText,
      rejectAllButtonText,
      rejectAllButtonAccessibleText,
      customizeButtonText,
      customizeButtonAccessibleText,
      showRejectAllButtonOnBanner 
    } = configs || {}

    const useAccessibleText_acceptAll = acceptAllButtonText !== acceptAllButtonAccessibleText
    const useAccessibleText_rejectAll = rejectAllButtonText !== rejectAllButtonAccessibleText
    const useAccessibleText_customize = customizeButtonText !== customizeButtonAccessibleText

    const cookieBannerOuterDiv = document.createElement('div')
    cookieBannerOuterDiv.setAttribute('id', 'cookie-consent-manager')

    const backdrop = document.createElement('div')
    backdrop.classList.add('position-fixed', 'top-0', 'bottom-0', 'start-0', 'end-0', 'bg-dark', 'opacity-50', 'z-1')
    backdrop.setAttribute('id', 'cookie-consent-manager-backdrop')

    const banner = document.createElement('div')
    banner.classList.add('position-fixed', 'bottom-0', 'start-0', 'p-3', 'w-100', 'border-top', 'bg-body-tertiary', 'z-2')
    banner.setAttribute('id', 'cookie-consent-manager-banner')

    banner.innerHTML = `
      <div class="container">
        <div class="row g-3 g-md-4 g-xl-5">
          <div class="col-12 col-md-8 col-xl-9">
            <p class="fw-bold mb-1">${bannerTitle}</p>
            <p class="mb-0">${bannerText}</p>
          </div>
          <div class="col">
            <div class="row xxl-block flex-column g-1">
              <button 
                type="button" 
                class="btn btn-primary" 
                data-cookie-button-function="accept-all-cookies" 
                ${useAccessibleText_acceptAll ? `aria-label="${acceptAllButtonAccessibleText}"` : ''}
                >
                ${acceptAllButtonText}
              </button>
              ${
                showRejectAllButtonOnBanner
                  ? `
                <button 
                  type="button" 
                  class="btn btn-outline-primary" 
                  data-cookie-button-function="reject-all-cookies" 
                  ${useAccessibleText_rejectAll ? `aria-label="${rejectAllButtonAccessibleText}"` : ''}
                  >
                  ${rejectAllButtonText}
                </button>
                `
                  : ''
              }
              <button 
                type="button" 
                class="btn btn-outline-primary" 
                data-cookie-button-function="customize-cookies" 
                ${useAccessibleText_customize ? `aria-label="${customizeButtonAccessibleText}"` : ''}
                >
                ${customizeButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    `

    cookieBannerOuterDiv.append(backdrop)
    cookieBannerOuterDiv.appendChild(banner)

    return cookieBannerOuterDiv
  }

  showBanner() {
    // if modal has been modified before, we remove it from DOM and re-set it back to null
    if (this.banner !== null) {
      this.banner.remove()
      this.banner = null
    }

    this.banner = this.createBannerHTML()

    document.body.append(this.banner)

    const acceptAllButton = this.banner.querySelector('[data-cookie-button-function="accept-all-cookies"]')
    const rejectAllButton = this.banner.querySelector('[data-cookie-button-function="reject-all-cookies"]')
    const customizeButton = this.banner.querySelector('[data-cookie-button-function="customize-cookies"]')

    acceptAllButton?.addEventListener('click', () => this.handleAcceptAllButtonClick())
    rejectAllButton?.addEventListener('click', () => this.handleRejectAllButtonClick())
    customizeButton?.addEventListener('click', () => this.handleCustomizeButtonClick())

    // Checks if disabling should happen or not inside the function
    this.disableScrollingonBody()
  }

  // +-------------------------------------+
  // | MODAL                               |
  // +-------------------------------------+

  createModalHTML() {
    // if modal has been modified before, we remove it from DOM and re-set it back to null
    if (this.modal !== null) {
      this.modal.remove()
      this.modal = null
    }

    const enabledConsentTypes = this.getEnabledConsentTypes()

    const configs = this.getConfigs()

    // prettier-ignore
    const { 
      modalId,
      modalTitle,
      centered,
      scrollable,
      animation,
      staticBackground,
      acceptAllButtonText,
      acceptAllButtonAccessibleText,
      rejectAllButtonText,
      rejectAllButtonAccessibleText,
      saveButtonText,
      saveButtonAccessibleText
    } = configs || {}

    const useAccessibleText_acceptAll = acceptAllButtonText !== acceptAllButtonAccessibleText
    const useAccessibleText_rejectAll = rejectAllButtonText !== rejectAllButtonAccessibleText
    const useAccessibleText_save = saveButtonText !== saveButtonAccessibleText

    // Below, we add class names to this array based on conditions
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
      <div class="modal ${animation ? 'fade' : ''}" tabindex="-1" ${staticBackground ? 'data-bs-backdrop="static"' : ''} id="${modalId}">
        <div class="modal-dialog ${modalDialogClasses.join(' ')}">
          <div class="modal-content">
            <div class="modal-header bg-body-tertiary">
              <p class="modal-title fw-bolder">${modalTitle}</p>
              ${
                // display the X close button conditionally. it's set to false by default
                this.showCloseButtonOnModal ? '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' : ''
              }
            </div>
            <div class="modal-body">
              ${
                enabledConsentTypes
                .map(consentType => {
                  const {id, title, description, required, onByDefault} = consentType || {}
                  return `
                  <div class="cookie-consent-type">
                    <div class="d-flex gap-3">
                      <div class="flex-grow-1">
                        <p class="fw-bold m-0">${title}</p>
                      </div>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="${id}"
                          id="${id}"
                          role="switch"
                          ${onByDefault ? 'checked' : ''} 
                          ${required ? 'disabled' : ''}
                        >
                        <label
                        class="form-check-label visually-hidden"
                        for="${id}">ON</label>
                      </div>
                    </div>
                    <p class="m-0 small">${description}</p>
                  </div>
                  `
                })
                .join(`<hr class="p-0 my-3">`)
                // prettier-ignore
              }
            </div> <!-- .modal-body -->

            <div class="modal-footer">
              <div class="d-grid gap-2 col-12 mx-auto d-sm-block text-sm-end">
                <button
                  type="button" 
                  class="btn btn-outline-primary me-sm-2" 
                  data-bs-dismiss="modal" 
                  data-cookie-button-function="accept-all-cookies"
                  ${useAccessibleText_acceptAll ? `aria-label="${acceptAllButtonAccessibleText}"` : ''}
                >
                  ${acceptAllButtonText}
                </button>

                <button
                  type="button" 
                  class="btn btn-outline-primary me-sm-2" 
                  data-bs-dismiss="modal" 
                  data-cookie-button-function="reject-all-cookies"
                  ${useAccessibleText_rejectAll ? `aria-label="${rejectAllButtonAccessibleText}"` : ''}
                >
                  ${rejectAllButtonText}
                </button>
                
                <button
                  type="button" 
                  class="btn btn-primary" 
                  data-bs-dismiss="modal" 
                  data-cookie-button-function="save-cookies"
                  ${useAccessibleText_save ? `aria-label="${saveButtonAccessibleText}"` : ''}
                >
                  ${saveButtonText}
                </button>
              </div>
            </div> <!-- .modal-footer -->
          </div>
        </div>
      </div>
    `
    return this.modal
  }

  showModal() {
    const configs = this.getConfigs()

    const { modalId } = configs || {}

    // This creates and returns the modal's HTML
    this.modal = this.createModalHTML()

    const acceptAllButton = this.modal.querySelector('[data-cookie-button-function="accept-all-cookies"]')
    const rejectAllButton = this.modal.querySelector('[data-cookie-button-function="reject-all-cookies"]')
    const saveButton = this.modal.querySelector('[data-cookie-button-function="save-cookies"]')

    acceptAllButton?.addEventListener('click', () => this.handleAcceptAllButtonClick())
    rejectAllButton?.addEventListener('click', () => this.handleRejectAllButtonClick())
    saveButton?.addEventListener('click', () => this.handleSaveButtonClick())

    const modalAsBSModalObject = new bootstrap.Modal(this.modal.querySelector(`#${modalId}`))

    modalAsBSModalObject.show()
  }

  // +-------------------------------------+
  // | TOAST                               |
  // +-------------------------------------+

  showToast() {
    const configs = this.getConfigs()

    // prettier-ignore
    const {
      showToast,
      toastText,
      toastPosition,
      toastContainerId,
      toastId,
      toastBackgroundClass,
      toastShowCloseButton,
      toastEscapeHTML,
      toastAnimation,
      toastAutohide,
      toastDelay
    } = configs || {}

    // do nothing if showToast isn't set to true
    if (!showToast) {
      return
    }

    // Translate the English readable position to Bootstrap position classes
    let positionClasses = ''

    switch (toastPosition) {
      case 'top-left':
        positionClasses = 'top-0 start-0'
        break

      case 'top-center':
        positionClasses = 'top-0 start-50 translate-middle-x'
        break

      case 'top-right':
        positionClasses = 'top-0 end-0'
        break

      case 'middle-left':
        positionClasses = 'top-50 start-0 translate-middle-y'
        break

      case 'middle-center':
        positionClasses = 'top-50 start-50 translate-middle'
        break

      case 'middle-right':
        positionClasses = 'top-50 end-0 translate-middle-y'
        break

      case 'bottom-left':
        positionClasses = 'bottom-0 start-0'
        break

      case 'bottom-center':
        positionClasses = 'bottom-0 start-50 translate-middle-x'
        break

      case 'bottom-right':
        positionClasses = 'bottom-0 end-0'
        break
    }

    // Ensure single toast container
    let toastContainer = document.getElementById(toastContainerId)
    if (!toastContainer) {
      toastContainer = document.createElement('div')
      toastContainer.id = toastContainerId
      toastContainer.className = `toast-container position-fixed z-3 p-3 ${positionClasses}`
      document.body.appendChild(toastContainer)
    }

    // Create toast element
    const toastWrapper = document.createElement('div')
    toastWrapper.id = toastId
    toastWrapper.className = 'toast shadow-none'
    toastWrapper.setAttribute('role', 'alert')
    toastWrapper.setAttribute('aria-live', 'assertive')
    toastWrapper.setAttribute('aria-atomic', 'true')

    toastWrapper.innerHTML = `
    <div class="d-flex gap-1 rounded ${toastBackgroundClass}">
      <div class="toast-body">${toastEscapeHTML ? this.escapeHTML(toastText) : toastText}</div>
      ${toastShowCloseButton ? `<button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>` : ''}
    </div>
  `

    toastContainer.appendChild(toastWrapper)

    // Initialize and show toast
    const toast = new bootstrap.Toast(toastWrapper, {
      animation: toastAnimation,
      autohide: toastAutohide,
      delay: toastDelay,
    })
    toast.show()

    // Clean up after hidden
    toastWrapper.addEventListener('hidden.bs.toast', () => {
      toastWrapper.remove()

      // remove the container from DOM if there is no toast inside it
      if (toastContainer.innerHTML === '') {
        toastContainer.remove()
      }
    })
  }

  // +-------------------------------------+
  // | OTHER FUNCTIONS                     |
  // +-------------------------------------+

  bootstrapExists() {
    return typeof bootstrap !== 'undefined'
  }

  pushToDataLayer(obj) {
    window.dataLayer = window.dataLayer || []

    window.dataLayer.push(obj)
  }

  gtag() {
    window.dataLayer = window.dataLayer || []

    dataLayer.push(arguments)
  }

  escapeHTML(text) {
    return text.replace(
      /[&<>'"]/g,
      tag =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          "'": '&#39;',
          '"': '&quot;',
        }[tag])
    )
  }

  enableScrollingOnBody() {
    if (document.body.classList.contains('overflow-hidden')) {
      document.body.classList.remove('overflow-hidden')
    }
  }

  disableScrollingonBody() {
    const configs = this.getConfigs()

    const { freezeScrollingOnBanner } = configs || {}

    // Disable scrolling only if freezeScrollingOnBanner is set to true
    if (freezeScrollingOnBanner) {
      document.body.classList.add('overflow-hidden')
    }
  }

  // +-------------------------------------+
  // | VERSION                             |
  // +-------------------------------------+

  getVersionFromLocalStorage() {
    const currentVersionName = this.getVersionName()

    return localStorage.getItem(currentVersionName)
  }

  verifyVersionFromLocalStorage() {
    const currentVersion = this.getVersion()
    const versionName = this.getVersionFromLocalStorage()

    // we convert to Number just in case
    return Number(versionName) === Number(currentVersion)
  }

  setVersion() {
    // Set the version number
    const versionName = this.getVersionName()
    const versionNumber = this.getVersion()
    localStorage.setItem(versionName, versionNumber)
  }

  // +-------------------------------------+
  // | COOKIE CONSENT EVENT NAMES          |
  // +-------------------------------------+

  getCookieConsentAcceptEventName() {
    const configs = this.getConfigs()

    const { cookieConsentAcceptEventName } = configs || {}

    if (!cookieConsentAcceptEventName) {
      console.warn('cookieConsentAcceptEventName in getCookieConsentAcceptEventName is empty')
    }

    return cookieConsentAcceptEventName
  }

  getCookieConsentRejectEventName() {
    const configs = this.getConfigs()

    const { cookieConsentRejectEventName } = configs || {}

    if (!cookieConsentRejectEventName) {
      console.warn('cookieConsentRejectEventName in getCookieConsentRejectEventName is empty')
    }

    return cookieConsentRejectEventName
  }

  fireCookieConsentUpdateEvent() {
    const configs = this.getConfigs()

    const { cookieConsentUpdateEventName } = configs || {}

    if (!cookieConsentUpdateEventName) {
      console.warn('cookieConsentUpdateEventName in fireCookieConsentUpdateEvent is empty. No event pushed to dataLayer')
      return
    }

    this.pushToDataLayer({ event: cookieConsentUpdateEventName })
  }

  fireCookieConsentIndividualEvents() {
    // we need the prefix so that we concatenate it with the id so we look for it in the localStorage
    const prefix = this.getConsentTypePrefix()

    const consentTypes = this.getEnabledConsentTypes()

    // look inside the localStorage items to see if the item matches the permission types or not
    // if they match AND it's set to positive_value, then we set it as 'granted'. if not, 'denied'
    consentTypes.forEach(type => {
      const localStorageName = prefix + type.id

      const cookieConsentAcceptEventName = this.getCookieConsentAcceptEventName()
      const cookieConsentRejectEventName = this.getCookieConsentRejectEventName()
      const positiveValue = this.getPositiveValue()
      const eventName = localStorage.getItem(localStorageName) === positiveValue ? cookieConsentAcceptEventName : cookieConsentRejectEventName

      this.pushToDataLayer({
        event: eventName + '_' + type?.id,
      })
    })
  }

  // +-------------------------------------+
  // | Update GTAG Consent                 |
  // +-------------------------------------+

  setConsent_default() {
    this.gtag('consent', 'default', {
      functionality_storage: 'granted',
      security_storage: 'granted',
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      personalization_storage: 'denied',
    })
  }

  updateConsent_allGranted() {
    // Update consent to all granted
    this.gtag('consent', 'update', {
      ad_personalization: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      analytics_storage: 'granted',
      functionality_storage: 'granted',
      personalization_storage: 'granted',
      security_storage: 'granted',
    })
  }

  updateConsent_allDenied() {
    // Update consent to all granted
    this.gtag('consent', 'update', {
      ad_personalization: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'granted', // they do not need permission, they can always stay on
      personalization_storage: 'denied',
      security_storage: 'granted', // they do not need permission, they can always stay on
    })
  }

  updateConsent_fromLocalStorage() {
    // we need the prefix so that we concatenate it with the id so we look for it in the localStorage
    const prefix = this.getConsentTypePrefix()

    const consentTypes = this.getEnabledConsentTypes()

    // we are going to use this for all the permissions passed into the gtag function
    const object = {}

    // look inside the localStorage items to see if the item matches the permission types or not
    // if they match AND it's set to positive_value, then we set it as 'granted'. if not, 'denied'

    const positiveValue = this.getPositiveValue()
    consentTypes.forEach(type => {
      const localStorageName = prefix + type.id

      switch (type.permissionType) {
        case 'ad':
          object.ad_personalization = localStorage.getItem(localStorageName) === positiveValue ? 'granted' : 'denied'
          object.ad_storage = localStorage.getItem(localStorageName) === positiveValue ? 'granted' : 'denied'
          object.ad_user_data = localStorage.getItem(localStorageName) === positiveValue ? 'granted' : 'denied'
          break
        case 'analytics':
          object.analytics_storage = localStorage.getItem(localStorageName) === positiveValue ? 'granted' : 'denied'
          break
        case 'functionality':
          object.functionality_storage = localStorage.getItem(localStorageName) === positiveValue ? 'granted' : 'denied'
          break
        case 'personalization':
          object.personalization_storage = localStorage.getItem(localStorageName) === positiveValue ? 'granted' : 'denied'
          break
        case 'security':
          object.security_storage = localStorage.getItem(localStorageName) === positiveValue ? 'granted' : 'denied'
          break
      }
    })

    // Update consent based on the consents in localStorage
    this.gtag('consent', 'update', object)
  }

  // +-------------------------------------+
  // | BUTTON CLICK HANDLERS               |
  // +-------------------------------------+

  handleAcceptAllButtonClick() {
    try {
      this.setConsent_acceptAll()

      if (this.banner) {
        this.banner.remove()
        this.banner = null
      }

      // This function fires gtag with all consent types set to 'granted'
      this.updateConsent_allGranted()

      // fires a single event
      // this should be the Custom Event trigger on GTM
      // this is the event that tags should rely on (at this point the consent is updated)
      this.fireCookieConsentUpdateEvent()

      // This is an optional and extra step to fire an event per consent type
      // this can be used as the GTM trigger as well
      this.fireCookieConsentIndividualEvents()

      // Display the toast
      // The function handles whether to show or not depending on user's customization
      this.showToast()

      this.enableScrollingOnBody()
    } catch (error) {
      console.error('There was an error with handleAcceptAllButtonClick()')
      console.error(error)
    }
  }

  handleRejectAllButtonClick() {
    try {
      this.setConsent_rejectAll()

      if (this.banner) {
        this.banner.remove()
        this.banner = null
      }

      // fires gtag with all (except functionality and security) set to 'denied'
      this.updateConsent_allDenied()

      // fires a single event
      // this should be the Custom Event trigger on GTM
      // this is the event that tags should rely on (at this point the consent is updated)
      this.fireCookieConsentUpdateEvent()

      // This is an optional and extra step to fire an event per consent type
      // this can be used as the GTM trigger as well
      this.fireCookieConsentIndividualEvents()

      // Display the toast
      // The function handles whether to show or not depending on user's customization
      this.showToast()

      this.enableScrollingOnBody()
    } catch (error) {
      console.error('There was an error with handleRejectAllButtonClick()')
      console.error(error)
    }
  }

  handleSaveButtonClick() {
    try {
      this.setConsent_saveCustomized()

      // look into localStorage to see what to fire and what not to fire
      // Remember: this does not cause any tag to fire
      // it simply changes the consent permissions
      this.updateConsent_fromLocalStorage()

      // fires a single event
      // this should be the Custom Event trigger on GTM
      // this is the event that tags should rely on (at this point the consent is updated)
      this.fireCookieConsentUpdateEvent()

      // This is an optional and extra step to fire an event per consent type
      // this can be used as the GTM trigger as well
      this.fireCookieConsentIndividualEvents()

      // Display the toast
      // The function handles whether to show or not depending on user's customization
      this.showToast()

      this.enableScrollingOnBody()
    } catch (error) {
      console.error('There was an error with handleSaveButtonClick()')
      console.error(error)
    }
  }

  handleCustomizeButtonClick() {
    try {
      // remove cookieBanner from DOM and reset it to null
      if (this.banner) {
        this.banner.remove()
        this.banner = null
      }

      // launch the modal
      this.showModal()
    } catch (error) {
      console.error('There was an issue with callback function of handleCustomizeButtonClick()')
      console.error(error)
    }
  }
}

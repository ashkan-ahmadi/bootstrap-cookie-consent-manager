// Verify that cookieConsentManager exists and it's a class/function
if (typeof cookieConsentManager !== 'undefined' && typeof cookieConsentManager === 'function') {
  // Define dataLayer if it doesn't exist
  window.dataLayer = window?.dataLayer || []

  // configs (all customization takes place in this object)
  const configs = {
    // prefix: 'cookieConsent', // string (an underscore will be added after the value)
    // consentTypePrefix: 'consentType', // string (an underscore will be added after the value)
    // setName: 'isSet', // string
    // positiveValue: 'true', // string
    // negativeValue: 'false', // string
    // versionName: 'version', // the label of the version
    // version: 2.2, // the version number

    // MODAL
    // modalId: 'cookie-consent-manager-modal', // string, default: 'cookie-consent-manager-modal'
    // modalTitle: 'Cookie Consent', // string
    // centered: true, // true(default)|false
    // scrollable: true, // true(default)|false
    // animation: false, // true(default)|false
    // showCloseButtonOnModal: false, true|false(default)

    // cookieConsentUpdateEventName: 'cookie_consent_update', // string - event to fire, have to use in GTM > Tags > Custom Event

    // BUTTONS
    acceptAllButtonText: 'Accept all', // string
    acceptAllButtonAccessibleText: 'Accept all cookies', // string
    rejectAllButtonText: 'Reject non-essentials', // string
    rejectAllButtonAccessibleText: 'Reject non-essentials cookies', // string
    customizeButtonText: 'Customize', // string
    customizeButtonAccessibleText: 'Customize cookies', // string
    saveButtonText: 'Save', // string
    saveButtonAccessibleText: 'Save cookies', // string

    // useLocalStorage: true, // true(default)|false

    // BANNER
    // bannerTitle: 'We respect your privacy',
    // bannerText: `We use cookies on our site to enhance your user experience, provide personalized content, and analyze our traffic. You can find more information on our <a href="#" target="_blank" rel="noreferrer noopener">Cookie Policy</a>.`,
    // showRejectAllButtonOnBanner: true,
    // freezeScrollingOnBanner: false,

    // CONFIRMATION TOAST
    // showToast: true,
    // toastText: 'Cookie consent saved successfully',
    // toastPosition: 'bottom-left', // top-left|top-center|top-right|middle-left|middle-center|middle-right|bottom-left|bottom-center|bottom-right
    // toastContainerId: 'toast-container',
    // toastId: 'toast-' + Date.now(),
    // toastBackgroundClass: 'bg-primary-subtle text-dark',
    // toastShowCloseButton: true,
    // toastEscapeHTML: true,
    // toastAnimation: true,
    // toastAutohide: true,
    // toastDelay: 3500,
  }

  // the consent types
  const consents = [
    {
      id: 'essential',
      title: 'Essential',
      description: 'These cookies are essential for the website to function properly and <b>cannot be switched off</b>. They help with things like logging in and setting your privacy preferences.</p>',
      enabled: true,
      required: true,
      onByDefault: true,
      permissionType: 'functionality', // ad|analytics|functionality|personalization|security
      onAccept: function () {
        // console.log('Functionality onAccept')
      },
      onReject: function () {
        // console.log('Functionality onReject - SHOULD NOT HAPPEN')
      },
    },
    {
      id: 'security',
      title: 'Security',
      description: 'These cookies are essential for the website to function properly and <b>cannot be switched off</b>. They help with things like fraud protection and security.</p>',
      enabled: false,
      required: true,
      onByDefault: true,
      permissionType: 'security', // ad|analytics|functionality|personalization|security
      onAccept: function () {
        // console.log('Security onAccept')
      },
      onReject: function () {
        // console.log('Security onReject -  - SHOULD NOT HAPPEN')
      },
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'These cookies help us improve the site by tracking which pages are most popular and how visitors move around the site.',
      enabled: true,
      required: false,
      onByDefault: true,
      permissionType: 'analytics', // ad|analytics|functionality|personalization|security
      onAccept: function () {
        // console.log('Analytics onAccept')
      },
      onReject: function () {
        // console.log('Analytics onReject')
      },
    },
    {
      id: 'advertising',
      title: 'Advertising',
      description: 'These cookies provide extra features and personalization to improve your experience. They may be set by us or by partners whose services we use.',
      enabled: false,
      required: false,
      onByDefault: true,
      permissionType: 'ad', // ad|analytics|functionality|personalization|security
      onAccept: function () {
        // console.log('Advertising onAccept')
      },
      onReject: function () {
        // console.log('Advertising onReject')
      },
    },
    {
      id: 'personalization',
      title: 'Personalization',
      description: 'These cookies allow our platform to show related and personalized content to improve your experience such as personalized recommendations or customized content based on your browsing history.',
      enabled: true,
      required: false,
      onByDefault: true,
      permissionType: 'personalization', // ad|analytics|functionality|personalization|security
      onAccept: function () {
        // console.log('Personalization onAccept')
      },
      onReject: function () {
        // console.log('Personalization onReject')
      },
    },
  ]

  // Passing consent types and the configurations into the library
  const cookieConsent = new cookieConsentManager(consents, configs)

  // Initialize the library
  cookieConsent.init()
}

import cookieConsentManager from './assets/js/class.js'

if (typeof cookieConsentManager !== 'undefined' && typeof cookieConsentManager === 'function') {
  const myconfig = {
    // TODO: at the end, you have to make sure all defaultConfigs are here too

    // MODAL
    // title: 'Cookie Consent', // string
    // centered: true, // true(default)|false
    // scrollable: true, // true(default)|false
    // animation: false, // true(default)|false
    // showCloseButtonOnModal: false, true|false(default)
    // showRejectAllButtonOnBanner: true, // TODO: how to change behavior of this but maintain click handler?

    // BUTTONS
    acceptAllButtonText: 'Accept all', // string
    rejectAllButtonText: 'Reject non-essentials', // string
    customizeButtonText: 'Customize', // string
    saveButtonText: 'Save', // string

    // useLocalStorage: true, // true(default)|false

    // BANNER
    bannerTitle: 'We respect your privacy',
    bannerText: `We use cookies on our site to enhance your user experience, provide personalized content, and analyze our traffic. You can find more information on our <a href="#">Cookie Policy</a>.`,
  }

  const consents = [
    {
      id: 'necessary',
      title: 'Necessary',
      enabled: true,
      required: true,
      onByDefault: true,
      description: 'These cookies are necessary for the website to function properly and <b>cannot be switched off</b>. They help with things like logging in and setting your privacy preferences.</p>',
      onAccept: function () {},
      onReject: function () {},
    },
    {
      id: 'analytics',
      title: 'Analytics',
      enabled: true,
      required: false,
      onByDefault: true,
      description: 'These cookies help us improve the site by tracking which pages are most popular and how visitors move around the site.',
      onAccept: function () {},
      onReject: function () {},
    },
    {
      id: 'advertising',
      title: 'Advertising',
      enabled: true,
      required: false,
      onByDefault: true,
      description: 'These cookies provide extra features and personalization to improve your experience. They may be set by us or by partners whose services we use.',
      onAccept: function () {},
      onReject: function () {},
    },
    {
      id: 'personalization',
      title: 'Personalization',
      enabled: true,
      required: false,
      onByDefault: true,
      description: 'These cookies allow our platform to show related and personalized content to improve your experience such as personalized recommendations or customized content based on your browsing history.',
      onAccept: function () {},
      onReject: function () {},
    },
  ]

  const cookieConsent = new cookieConsentManager(consents, myconfig)

  cookieConsent.init()
}

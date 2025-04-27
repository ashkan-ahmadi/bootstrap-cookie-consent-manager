import cookieConsentManager from './assets/js/class.js'

if (typeof cookieConsentManager !== 'undefined') {
  const myconfig = {
    // title: 'Cookie Consent',
    // centered: true,
    // scrollable: true,
    // animation: true,
    // showCloseButtonOnModal: false, true|false (default)
    // showRejectAllButtonOnBanner: true, // TODO: how to change behavior of this but maintain click handler?
    // rejectAllButtonText: 'Reject all',
    // acceptAllButtonText: 'Accept all',
    // saveButtonText: 'Save',
    // useCookieInsteadOfLocalStorage: true,
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
      required: true,
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

import cookieConsentManager from './assets/js/cookieConsentManager.js'

if (typeof cookieConsentManager !== 'undefined' && typeof cookieConsentManager === 'function') {
  window.dataLayer = window?.dataLayer || []

  function gtag() {
    dataLayer.push(arguments)
  }

  gtag('consent', 'default', {
    functionality_storage: 'granted',
    security_storage: 'granted',
    analytics_storage: localStorage.getItem('cookieConsent_consentType_analytics') === 'true' ? 'granted' : 'denied',
    ad_storage: localStorage.getItem('cookieConsent_consentType_advertising') === 'true' ? 'granted' : 'denied',
    ad_user_data: localStorage.getItem('cookieConsent_consentType_advertising') === 'true' ? 'granted' : 'denied',
    ad_personalization: localStorage.getItem('cookieConsent_consentType_advertising') === 'true' ? 'granted' : 'denied',
    personalization_storage: localStorage.getItem('cookieConsent_consentType_personalization') === 'true' ? 'granted' : 'denied',
  })

  const myconfig = {
    // TODO: at the end, you have to make sure all defaultConfigs are here too
    // MODAL
    // modalId: 'cookie-consent-manager-modal', // string, default: 'cookie-consent-manager-modal'
    // modalTitle: 'Cookie Consent', // string
    // centered: true, // true(default)|false
    // scrollable: true, // true(default)|false
    // animation: false, // true(default)|false
    // showCloseButtonOnModal: false, true|false(default)
    // showRejectAllButtonOnBanner: true, // TODO: how to change behavior of this but maintain click handler?
    // BUTTONS
    // acceptAllButtonText: 'Accept all', // string
    // rejectAllButtonText: 'Reject non-essentials', // string
    // customizeButtonText: 'Customize', // string
    // saveButtonText: 'Save', // string
    // useLocalStorage: true, // true(default)|false
    // BANNER
    // bannerTitle: 'We respect your privacy',
    // bannerText: `We use cookies on our site to enhance your user experience, provide personalized content, and analyze our traffic. You can find more information on our <a href="#">Cookie Policy</a>.`,
  }

  const consents = [
    {
      id: 'necessary',
      title: 'Necessary',
      description: 'These cookies are necessary for the website to function properly and <b>cannot be switched off</b>. They help with things like logging in and setting your privacy preferences.</p>',
      enabled: true,
      required: true,
      onByDefault: true,
      onAccept: function () {},
      onReject: function () {},
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'These cookies help us improve the site by tracking which pages are most popular and how visitors move around the site.',
      enabled: true,
      required: false,
      onByDefault: true,
      forAds: false, // related to advertising such as Facebook Pixel, Google Ads, etc
      forAnalytics: false,
      forFunctionality: false, // no need to ask, 'granted' by default
      forPersonalization: false,
      forSecurity: false, // no need to ask, 'granted' by default
      categories: {
        // advertising (Google Ads, Facebook)
        ad_storage: false,
        ad_user_data: false,
        ad_personalization: false,

        // analytics (Google Analytics)
        analytics_storage: false,

        // functionality (core functionality of the website)
        functionality_storage: false,

        // personal recommendation (based on preferences set or browsing history e.g. video recommendations)
        personalization_storage: false,

        // security and anti-fraud
        security_storage: false,
      },
      onAccept: function () {},
      onReject: function () {},
    },
    {
      id: 'advertising',
      title: 'Advertising',
      description: 'These cookies provide extra features and personalization to improve your experience. They may be set by us or by partners whose services we use.',
      enabled: true,
      required: false,
      onByDefault: true,
      onAccept: function () {},
      onReject: function () {},
    },
    {
      id: 'personalization',
      title: 'Personalization',
      description: 'These cookies allow our platform to show related and personalized content to improve your experience such as personalized recommendations or customized content based on your browsing history.',
      enabled: true,
      required: false,
      onByDefault: true,
      onAccept: function () {},
      onReject: function () {},
    },
  ]

  const cookieConsent = new cookieConsentManager(consents, myconfig)

  cookieConsent.init()
}

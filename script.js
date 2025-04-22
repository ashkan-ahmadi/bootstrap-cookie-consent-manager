import bootstrapCookieConsentManager from './assets/js/bootstrapCookieConsentManager.js'

const myconfig = {
  // title: 'Cookie Consent',
  // centered: true,
  // scrollable: true,
  // animation: true,
  // showRejectAllButtonOnBanner: true, // TODO: how to change behavior of this but maintain click handler?
  // rejectAllButtonText: 'Reject all',
  // acceptAllButtonText: 'Accept all',
  // saveButtonText: 'Save',
}

const consents = [
  {
    id: 'necessary',
    title: 'Necessary',
    required: true,
    onByDefault: true,
    description: 'These cookies are necessary for the website to function properly and <b>cannot be switched off</b>. They help with things like logging in and setting your privacy preferences.</p>',
  },
  {
    id: 'analytics',
    title: 'Analytics',
    required: true,
    onByDefault: true,
    description: 'These cookies help us improve the site by tracking which pages are most popular and how visitors move around the site.',
  },
  {
    id: 'advertising',
    title: 'Advertising',
    required: false,
    onByDefault: true,
    description: 'These cookies provide extra features and personalization to improve your experience. They may be set by us or by partners whose services we use.',
  },
  {
    id: 'personalization',
    title: 'Personalization',
    required: false,
    onByDefault: true,
    description: 'These cookies allow our platform to show related and personalized content to improve your experience such as personalized recommendations or customized content based on your browsing history.',
  },
]
bootstrapCookieConsentManager(consents, myconfig)

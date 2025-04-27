# 🍪 Bootstrap Cookie Consent Manager

A lightweight, fully customizable, and user-friendly **Cookie Consent Manager** built using **Bootstrap CSS**. This tool helps you easily manage cookie preferences on your website—**completely free and privacy-first**.

---

## 🚀 Features

- Easy to integrate with any website using Bootstrap
- Fully responsive and mobile-friendly
- Customizable design and text to match your brand
- Zero dependency usable with vanilla JS, React, or any other framework
- Enables user consent management for essential, analytics, and marketing cookies
- Saves preferences in localStorage (no server needed)
- Compliant with GDPR/CCPA principles

---

## How to use

IMPORTANT: Since this library takes advantage of Bootstrap's built-in classes and functions, you need to make sure you load Bootstrap's JS file first.

### 1. Load the script

You first need to load the script

```html
<link rel="stylesheet" href="path/to/cookie-consent.js" />
```

### 2. Configure

Then, you need to pass your consent types and configuration into the script (see sections below). Example:

```html
<script>
  if (typeof cookieConsentManager !== 'undefined' && typeof cookieConsentManager === 'function') {
    const myconfig = {
      // TODO: at the end, you have to make sure all defaultConfigs are here too
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
</script>
```

## Developers

If you are interested in improving this library, feel free to clone, modify and request a pull request. Make sure pull requests are small, and manageable.

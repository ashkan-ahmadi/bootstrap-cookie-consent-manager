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
  // check if cookieConsent class has loaded exists
  if (typeof cookieConsent !== 'undefined') {
    // an array of objects
    const myCookieConsentTypes = [
      {
        id: 'essential',
        title: 'Essential',
      },
    ]

    // an object
    const myCookieConsentConfigs = {
      title: 'Cookie Consent',
      centered: true,
      enabled: true,
      scrollable: true,
      saveButtonText: 'Save',
    }

    // Prepare all the consent types and configurations
    const myCookieClass = new cookieConsentManager(myCookieConsentTypes, myCookieConsentConfigs)

    // Initialize the cookie consent manager
    myCookieClass.initialize()
  }
</script>
```

## Developers

If you are interested in improving this library, feel free to clone, modify and request a pull request. Make sure pull requests are small, and manageable.

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

You first need to load the script in the `<head>` element **before loading Google Tag Manager (GTM)**.

```html
<link rel="stylesheet" href="path/to/cookie-consent.js" />
```

### 2. Configure

Then, you need to pass your consent types and configuration into the script (see sections below). This needs load AFTER the script above Example:

```html
<script>
  // Ensure cookieConsentManager is defined and it's a class
  if (typeof cookieConsentManager !== 'undefined' && typeof cookieConsentManager === 'function') {
    const cookieConfigs = {
      // all customization goes here - see Customization Parameters
    }

    const cookieConsents = [
      // all consent types go here - see Consent Types
    ]

    const cookieConsent = new cookieConsentManager(cookieConsents, cookieConfigs)

    cookieConsent.init()
  }
</script>
```

### 3. Load GTM

```html
<!-- Google Tag Manager -->
<script>
  ;(function (w, d, s, l, i) {
    w[l] = w[l] || []
    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != 'dataLayer' ? '&l=' + l : ''
    j.async = true
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
    f.parentNode.insertBefore(j, f)
  })(window, document, 'script', 'dataLayer', 'YOUR_GTM_IDENTIFIER_GOES_HERE')
</script>
<!-- End Google Tag Manager -->
```

### Example

```html
<head>
  <link rel="stylesheet" href="path/to/cookie-consent-manager.js" />
  <script>
    // Ensure cookieConsentManager is defined and it's a class
    if (typeof cookieConsentManager !== 'undefined' && typeof cookieConsentManager === 'function') {
      const cookieConfigs = {
        // all customization goes here - see Customization Parameters
      }

      const cookieConsents = [
        // all consent types go here - see Consent Types
      ]

      const cookieConsent = new cookieConsentManager(cookieConsents, cookieConfigs)

      cookieConsent.init()
    }
  </script>

  <!-- Google Tag Manager -->
  <script>
    ;(function (w, d, s, l, i) {
      w[l] = w[l] || []
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : ''
      j.async = true
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
      f.parentNode.insertBefore(j, f)
    })(window, document, 'script', 'dataLayer', 'YOUR_GTM_IDENTIFIER_GOES_HERE')
  </script>
  <!-- End Google Tag Manager -->
</head>
```

### 4. Set up GTM

---

## Customization Parameters

Use any of these as a `key:value` pair to customize the behavior of the cookie consent manager.

| Category    | Key                             | Type    | Default value                    | Required | Description                                                        |
| ----------- | ------------------------------- | ------- | -------------------------------- | -------- | ------------------------------------------------------------------ |
| Modal       | `modalId`                       | string  | `cookie-consent-manager-modal`   | no       | The ID of the modal. You do not have to change                     |
| Modal       | `ModalTitle`                    | string  | `Customize the cookies`          | no       | The text on top of the modal (HTML allowed)                        |
| Modal       | `centered`                      | boolean | `true`                           | no       | Vertically center the modal                                        |
| Modal       | `scrollable`                    | boolean | `true`                           | no       | Makes the body of the modal scrollable if there isn't enough space |
| Modal       | `animation`                     | boolean | `true`                           | no       | Show and hide the modal with an animation                          |
| Modal       | `staticBackground`              | boolean | `true`                           | no       | The modal will not close when clicking outside of it               |
| Modal       | `showCloseButtonOnModal`        | boolean | `false`                          | no       | Show the close X icon on modal                                     |
| Modal       | `useLocalStorage`               | boolean | `true`                           | no       | Store consents in Local Storage instead of Cookies                 |
| Banner      | `bannerTitle`                   | string  | `We respect your privacy`        | no       | The title of the banner (HTML allowed)                             |
| Banner      | `bannerText`                    | string  | `We use cookies on our site ...` | no       | The text of the banner (HTML allowed)                              |
| Banner      | `showRejectAllButtonOnBanner`   | boolean | `true`                           | no       | Show or hide Reject All button on banner (not recommended)         |
| Content     | `acceptAllButtonText`           | string  | `Accept all`                     | no       | The Accept All button's text                                       |
| Content     | `acceptAllButtonAccessibleText` | string  | `Accept all cookies`             | no       | The Accept All button's text visible to screen readers             |
| Content     | `rejectAllButtonText`           | string  | `Reject all`                     | no       | The Reject All button's text                                       |
| Content     | `rejectAllButtonAccessibleText` | string  | `Reject all cookies`             | no       | The Reject All button's text visible to screen readers             |
| Content     | `customizeButtonText`           | string  | `Customize`                      | no       | The Customize button's text                                        |
| Content     | `customizeButtonAccessibleText` | string  | `Customize cookies`              | no       | The Customize button's text visible to screen readers              |
| Content     | `saveButtonText`                | string  | `Save`                           | no       | The Save button's text                                             |
| Content     | `saveButtonAccessibleText`      | string  | `Save preferences`               | no       | The Save button's text visible to screen readers                   |
| Event names | `cookieConsentAcceptEventName`  | string  | `cookie_consent_accept`          | no       | The event that fires when accepting a consent permission           |
| Event names | `cookieConsentRejectEventName`  | string  | `cookie_consent_reject`          | no       | The event that fires when rejecting a consent permission           |
| Event names | `cookieConsentUpdateEventName`  | string  | `cookie_consent_update`          | no       | The event that fires when any consent permission changes           |

## Developers

If you are interested in improving this library, feel free to clone, modify and request a pull request. Make sure pull requests are small, and manageable.

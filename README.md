# 🍪 Bootstrap Cookie Consent Manager

A lightweight, fully customizable, and user-friendly **Cookie Consent Manager** built using **Bootstrap CSS**. This tool helps you easily manage cookie preferences on your website—**completely free and privacy-first**.

## In action

[See demo on GitHub Pages](https://ashkan-ahmadi.github.io/bootstrap-cookie-consent-manager/)

[See demo on CodePen](https://codepen.io/AshkanAhmadi/full/YPPBxjE)

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
<script src="path-to/cookieConsentManager.min.js"></script>
```

### 2. Configure

Then, you need to pass your consent types and configuration into the script (see sections below). This needs load AFTER the script above Example:

```html
<script type="module">
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

1. Make sure your GTM script is added AFTER the Consent Manager script
1. Go to [Google Tag Manager](https://tagmanager.google.com/)
1. Go to Admin > Container Settings > Additional Settings > make sure Enable consent overview is checked/enabled
1. Save and go back to Workspace
1. Go to Triggers > New > Custom Event > Event name > Enter the value of `cookieConsentUpdateEventName` in your customization parameter (by default, it's `cookie_consent_update`. You can use the same value `cookie_consent_update` as recommended.)

Important: you have to use this custom event as the trigger for you need a tag to run once permission is given

Let's do a test

1. Go to Tags > New > Custom HTML > Write the following code in the box:

```html
<script>
  alert('✅ Analytics GTM tag is running - requires permission analytics_storage')
</script>
```

2. Under Advanced Settings > Consent Settings > Additional Consent Checks > Select `Require additional consent for tag to fire` and add `analytics_storage`
3. Under Triggering, select the custom event trigger you created in the previous step. Save everything and come out
4. Click the Preview button and enter your website link that has the Cookie Consent Manager running
5. On the cookie banner, click the Accept All button to accept all the permissions. If everything is set up right, you should see an alert popping up saying that the Analytics GTM tag is running.
6. Everything is set up and running now.
7. Go back to GTM, delete the Custom HTML tag you created. Now you can create and use any tag you want.

---

## Customization Parameters

Use any of these as a `key:value` pair in the `cookieConfigs` object to customize the behavior of the cookie consent manager.

| Category    | Key                             | Type    | Default value                       | Description                                                                                                                                                   |
| ----------- | ------------------------------- | ------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Modal       | `modalId`                       | string  | `cookie-consent-manager-modal`      | The ID of the modal. You do not have to change                                                                                                                |
| Modal       | `ModalTitle`                    | string  | `Customize the cookies`             | The text on top of the modal (HTML allowed)                                                                                                                   |
| Modal       | `centered`                      | boolean | `true`                              | Vertically center the modal                                                                                                                                   |
| Modal       | `scrollable`                    | boolean | `true`                              | Makes the body of the modal scrollable if there isn't enough space                                                                                            |
| Modal       | `animation`                     | boolean | `true`                              | Show and hide the modal with an animation                                                                                                                     |
| Modal       | `staticBackground`              | boolean | `true`                              | The modal will not close when clicking outside of it                                                                                                          |
| Modal       | `showCloseButtonOnModal`        | boolean | `false`                             | Show the close X icon on modal                                                                                                                                |
| Modal       | `useLocalStorage`               | boolean | `true`                              | Store consents in Local Storage instead of Cookies                                                                                                            |
| Toast       | `showToast`                     | boolean | `true`                              | Show the confirmation toast or not                                                                                                                            |
| Toast       | `toastText`                     | string  | `Cookie consent saved successfully` | The visible text on the toast                                                                                                                                 |
| Toast       | `toastPosition`                 | string  | `bottom-left`                       | Placement of the toast: `top-left`, `top-center`, `top-right`, `middle-left`, `middle-center`, `middle-right`, `bottom-left`, `bottom-center`, `bottom-right` |
| Toast       | `toastContainerId`              | string  | `toast-container`                   | The ID of the container of the toasts                                                                                                                         |
| Toast       | `toastId`                       | string  | `toast-${Date.now()}`               | The toast ID                                                                                                                                                  |
| Toast       | `toastBackgroundClass`          | string  | `text-bg-success`                   | The background classes of the toast                                                                                                                           |
| Toast       | `toastShowCloseButton`          | boolean | `true`                              | Show the close button on the toast or not                                                                                                                     |
| Toast       | `toastEscapeHTML`               | boolean | `true`                              | Whether to escape HTML tags or not                                                                                                                            |
| Toast       | `toastAnimation`                | boolean | `true`                              | Display the toast with a subtle animation or not                                                                                                              |
| Toast       | `toastAutohide`                 | boolean | `true`                              | Automatically hide the toast after a certain amount of time (do NOT set to `false` if `toastShowCloseButton` is also `false`)                                 |
| Toast       | `toastDelay`                    | number  | `3500`                              | Automatically hide the toast after this amount of time in miliseconds (e.g. 1000 for 1 second)                                                                |
| Banner      | `bannerTitle`                   | string  | `We respect your privacy`           | The title of the banner (HTML allowed)                                                                                                                        |
| Banner      | `bannerText`                    | string  | `We use cookies on our site ...`    | The text of the banner (HTML allowed)                                                                                                                         |
| Banner      | `showRejectAllButtonOnBanner`   | boolean | `true`                              | Show or hide Reject All button on banner (not recommended)                                                                                                    |
| Banner      | `freezeScrollingOnBanner`       | boolean | `true`                              | Disable page scrolling when banner is visible                                                                                                                 |
| Content     | `acceptAllButtonText`           | string  | `Accept all`                        | The Accept All button's text                                                                                                                                  |
| Content     | `acceptAllButtonAccessibleText` | string  | `Accept all cookies`                | The Accept All button's text visible to screen readers                                                                                                        |
| Content     | `rejectAllButtonText`           | string  | `Reject all`                        | The Reject All button's text                                                                                                                                  |
| Content     | `rejectAllButtonAccessibleText` | string  | `Reject all cookies`                | The Reject All button's text visible to screen readers                                                                                                        |
| Content     | `customizeButtonText`           | string  | `Customize`                         | The Customize button's text                                                                                                                                   |
| Content     | `customizeButtonAccessibleText` | string  | `Customize cookies`                 | The Customize button's text visible to screen readers                                                                                                         |
| Content     | `saveButtonText`                | string  | `Save`                              | The Save button's text                                                                                                                                        |
| Content     | `saveButtonAccessibleText`      | string  | `Save preferences`                  | The Save button's text visible to screen readers                                                                                                              |
| Event names | `cookieConsentAcceptEventName`  | string  | `cookie_consent_accept`             | The event that fires when accepting a consent permission                                                                                                      |
| Event names | `cookieConsentRejectEventName`  | string  | `cookie_consent_reject`             | The event that fires when rejecting a consent permission                                                                                                      |
| Event names | `cookieConsentUpdateEventName`  | string  | `cookie_consent_update`             | The event that fires when any consent permission changes                                                                                                      |

## Consent Types

Consent types are different types of consents you have that the user can accept or reject. Each type is an object with the following `key:value` pairs that should be passed into the `cookieConsents` array.

| Key              | Type     | Required | Description                                                                    |
| ---------------- | -------- | -------- | ------------------------------------------------------------------------------ |
| `id`             | string   | yes      | The unique `id` of this permission (all lower case)                            |
| `title`          | string   | yes      | The title of the cookie type                                                   |
| `description`    | string   | yes      | The description of the cookie type                                             |
| `enabled`        | boolean  | no       | Set to `false` if you want to keep but hide from the user                      |
| `required`       | boolean  | yes      | Cannot be turned off and cannot be rejected                                    |
| `onByDefault`    | boolean  | no       | Turn on by default unless turned off by user                                   |
| `permissionType` | string   | yes      | The nature of this consent type. See below this table for detailed explanation |
| `onAccept`       | function | no       | Callback function to run when accepted                                         |
| `onReject`       | function | no       | Callback function to run when rejected                                         |

**permissionType**:

Has to match one of these:

| permissionType    | Explanation                                                                             | Requires explicit consent | Enables permissions                                    | Example of tags                                          |
| ----------------- | --------------------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------ | -------------------------------------------------------- |
| `ad`              | any form of advertising and conversion-tracking script                                  | yes                       | `ad_storage`<br>`ad_user_data`<br>`ad_personalization` | Facebook Pixel<br>Google AdWords<br>LinkedIn Insight Tag |
| `analytics`       | any analytics and metrics script                                                        | yes                       | `analytics_storage`                                    | Google Analytics Events<br>HotJar<br>Crazy Egg           |
| `functionality`   | any essential tag which is crucial to the performance and functionality of the platform | no                        | `functionality_storage`                                | language selector or privacy settings                    |
| `personalization` | any script that relies on the user's browsing history or previous behavior              | yes                       | `personalization_storage`                              | Recommended Products based on Previous Visit             |
| `security`        | any anti-fraud security-related script                                                  | no                        | `security_storage`                                     | CloudFlare                                               |

## Developers

If you are interested in improving this library, feel free to clone, modify and request a pull request. Make sure pull requests are small, and manageable.

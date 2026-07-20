# Bootstrap Cookie Consent Manager

A lightweight, fully customizable, and user-friendly **Cookie Consent Manager** built with **Bootstrap 5** and **TypeScript**. This tool helps you easily manage cookie preferences on your website—**completely free and privacy-first**.

👉 This is 100% hand-coded by me (rewritten in TypeScript with an AI pair). There is **no AI slop involved**. 👈

## In action

[See demo on GitHub Pages](https://ashkan-ahmadi.github.io/bootstrap-cookie-consent-manager/)

[See demo on CodePen](https://codepen.io/AshkanAhmadi/full/YPPBxjE)

## Features

- Written in **TypeScript** with full type definitions (`.d.ts`) included — great autocomplete and compile-time safety for your configuration and consent types
- Ships as ESM, CommonJS, and a browser-ready global (IIFE) bundle, so it works with npm/bundlers **or** a plain `<script>` tag
- Easy to integrate with any website using Bootstrap
- Fully responsive and mobile-friendly
- Customizable design and text to match your brand
- Fully whitelabel (no logo or credit anywhere)
- Open source. Clone, fork, modify as you please
- Zero runtime dependencies (Bootstrap JS is a peer dependency) — usable with vanilla JS, React, or any other framework
- Enables user consent management for essential, analytics, and marketing cookies
- Saves preferences in localStorage (no server needed)
- Compliant with GDPR/CCPA principles
- Integrates with Google Consent Mode v2 / Google Tag Manager out of the box

---

## How to use

IMPORTANT: Since this library takes advantage of Bootstrap's built-in classes and functions, you need to make sure you load Bootstrap's JS file first.

### 1. Install (or download)

If your project uses npm/a bundler (recommended, gives you full TypeScript types):

```bash
npm install bootstrap-cookie-consent-manager bootstrap
```

If you don't use a bundler, you can instead drop in the pre-built browser bundle from this repo's `dist/index.global.js` (or a CDN like unpkg/jsDelivr once published) via a plain `<script>` tag — see the "Plain `<script>` tag (no bundler)" example below.

### 2. Configure and initialize

**With a bundler (ESM/TypeScript):**

```ts
import { CookieConsentManager } from 'bootstrap-cookie-consent-manager'
import type { ConsentType, CookieConsentManagerConfigs } from 'bootstrap-cookie-consent-manager'

const cookieConfigs: CookieConsentManagerConfigs = {
  // all customization goes here - see Customization Parameters
}

const cookieConsents: ConsentType[] = [
  // all consent types go here - see Consent Types
]

const cookieConsent = new CookieConsentManager(cookieConsents, cookieConfigs)

cookieConsent.init()
```

**Plain `<script>` tag (no bundler):**

The browser bundle exposes everything under the `BootstrapCookieConsentManager` global.

```html
<!-- 1. Load Bootstrap JS first -->
<script src="path/to/bootstrap.bundle.min.js"></script>

<!-- 2. Load the Cookie Consent Manager global bundle -->
<script src="path/to/dist/index.global.js"></script>

<!-- 3. Configure and initialize (load before GTM) -->
<script>
  const { CookieConsentManager } = BootstrapCookieConsentManager

  const cookieConfigs = {
    // all customization goes here - see Customization Parameters
  }

  const cookieConsents = [
    // all consent types go here - see Consent Types
  ]

  const cookieConsent = new CookieConsentManager(cookieConsents, cookieConfigs)

  cookieConsent.init()
</script>
```

### 3. Load GTM

Load GTM (don't forget to replace `YOUR_GTM_IDENTIFIER_HERE` with your GTM identifier e.g. `GTM-ABCD1234`)

```html
<!-- Google Tag Manager -->
<!-- prettier-ignore -->
<script>
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','YOUR_GTM_IDENTIFIER_HERE');
</script>
<!-- End Google Tag Manager -->
```

### Example

```html
<head>
  <!-- 1. Load Bootstrap first -->
  <script src="path/to/bootstrap-bundle.min.js"></script>

  <!-- 2. Then load the Bootstrap Cookie Consent Manager library -->
  <script src="path/to/dist/index.global.js"></script>

  <!-- 3. Run the script to customize and initialize the library -->
  <script>
    const { CookieConsentManager } = BootstrapCookieConsentManager

    const cookieConfigs = {
      rejectAllButtonText: 'Reject non-essentials',
      rejectAllButtonAccessibleText: 'Reject non-essentials cookies',
      // all customization goes here - see Customization Parameters
    }

    const cookieConsents = [
      // all consent types go here - see Consent Types
    ]

    const cookieConsent = new CookieConsentManager(cookieConsents, cookieConfigs)

    cookieConsent.init()
  </script>

  <!-- 4. Load Google Tag Manager -->
  <!-- prettier-ignore -->
  <script>
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-ABCD1234');
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

1. Go to **Tags** > **New** > **Custom HTML** > Write the following code in the box:

```html
<script>
  alert('✅ Analytics GTM tag is running - requires permission analytics_storage')
</script>
```

2. Under **Advanced Settings** > **Consent Settings** > **Additional Consent Checks** > Select `Require additional consent for tag to fire` and add `analytics_storage`
3. Under **Triggering**, select the custom event trigger you created in the previous step. Save everything and come out
4. Click the **Preview** button and enter your website link that has the Cookie Consent Manager running
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
| Modal       | `modalAcceptAllButtonClass`     | string  | `btn btn-outline-primary me-sm-2`   | The CSS class(es) applied to the modal's Accept All button                                                                                                    |
| Modal       | `modalRejectAllButtonClass`     | string  | `btn btn-outline-primary me-sm-2`   | The CSS class(es) applied to the modal's Reject All button                                                                                                    |
| Modal       | `modalSaveButtonClass`          | string  | `btn btn-primary`                   | The CSS class(es) applied to the modal's Save button                                                                                                          |
| Modal       | `useLocalStorage`               | boolean | `true`                              | Store consents in Local Storage instead of Cookies **to be developed soon**                                                                                   |
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
| Content     | `acceptAllButtonClass`          | string  | `btn btn-primary`                   | The CSS class(es) applied to the banner's Accept All button                                                                                                   |
| Content     | `rejectAllButtonText`           | string  | `Reject all`                        | The Reject All button's text                                                                                                                                  |
| Content     | `rejectAllButtonAccessibleText` | string  | `Reject all cookies`                | The Reject All button's text visible to screen readers                                                                                                        |
| Content     | `rejectAllButtonClass`          | string  | `btn btn-outline-primary`           | The CSS class(es) applied to the banner's Reject All button                                                                                                   |
| Content     | `customizeButtonText`           | string  | `Customize`                         | The Customize button's text                                                                                                                                   |
| Content     | `customizeButtonAccessibleText` | string  | `Customize cookies`                 | The Customize button's text visible to screen readers                                                                                                         |
| Content     | `customizeButtonClass`          | string  | `btn btn-outline-primary`           | The CSS class(es) applied to the banner's Customize button                                                                                                    |
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

## Changelog

### 2.3

2026-07-20

- Add `acceptAllButtonClass`, `rejectAllButtonClass`, and `customizeButtonClass` config options to override the CSS classes of the banner's "Accept all", "Reject all", and "Customize" buttons (defaults unchanged: `btn btn-primary` / `btn btn-outline-primary` / `btn btn-outline-primary`)
- Add `modalAcceptAllButtonClass`, `modalRejectAllButtonClass`, and `modalSaveButtonClass` config options to override the CSS classes of the modal's "Accept all", "Reject all", and "Save" buttons (defaults unchanged: `btn btn-outline-primary me-sm-2` / `btn btn-outline-primary me-sm-2` / `btn btn-primary`)

### 2.2

2026-07-19

- Rewrote the library from vanilla JavaScript to TypeScript, with full type definitions for `ConsentType`, `CookieConsentManagerConfigs`, and related types
- Now built and shipped as ESM (`dist/index.js`), CommonJS (`dist/index.cjs`), and a browser-ready global bundle (`dist/index.global.js`), plus `.d.ts` declarations, so the library can be `npm install`ed or dropped in via a plain `<script>` tag
- Renamed the exported class from `cookieConsentManager` to `CookieConsentManager` (PascalCase); all method names and config keys are unchanged
- Fixed a bug where the customization modal's HTML was built but never attached to the DOM, so clicking "Customize" would silently fail to show the modal

## 2.1

2025-06-07

- Modify `toastAutohide` to have default value of `true`

## Development

The library is written in TypeScript under `src/` and built with [tsup](https://tsup.egoist.dev/).

```bash
npm install       # install dependencies
npm run build     # type-check + build ESM (dist/index.js), CJS (dist/index.cjs),
                   # a browser global (dist/index.global.js), and .d.ts declarations
npm run dev        # rebuild on file changes
npm run typecheck # run `tsc --noEmit` only
```

To try the demo locally, run `npm run build` and then open `index.html` with any static file server (e.g. `npx http-server .`) — it imports the library straight from `./dist`.

## Support

If you find this library useful, please support me by making a small donation:

<a href="https://www.buymeacoffee.com/ashkanahmadi" target="_blank"><img style="border:none;max-width:150px;height:auto;" src="https://cdn.buymeacoffee.com/uploads/project_updates/2023/12/08f1cf468ace518fc8cc9e352a2e613f.png" alt="Support me by buying me a coffee through a donation" /></a>

## Developers & contributions

If you are interested in improving this library, feel free to clone, modify and request a pull request. Make sure pull requests are small, and manageable.

👉 No AI slop please.

/**
 * The "nature" of a consent type. This maps directly to the Google Consent
 * Mode v2 storage keys that get granted/denied for that consent type.
 *
 * - `ad`              -> `ad_storage`, `ad_user_data`, `ad_personalization`
 * - `analytics`       -> `analytics_storage`
 * - `functionality`   -> `functionality_storage`
 * - `personalization` -> `personalization_storage`
 * - `security`        -> `security_storage`
 */
export type PermissionType = 'ad' | 'analytics' | 'functionality' | 'personalization' | 'security'

/** Where the confirmation toast should be anchored on screen. */
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'middle-left' | 'middle-center' | 'middle-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

/** Google Consent Mode v2 storage keys. */
export type GtagConsentStorageKey = 'ad_personalization' | 'ad_storage' | 'ad_user_data' | 'analytics_storage' | 'functionality_storage' | 'personalization_storage' | 'security_storage'

/** Google Consent Mode v2 consent state, per storage key. */
export type GtagConsentState = 'granted' | 'denied'

/** The object passed as the third argument to `gtag('consent', 'default' | 'update', ...)`. */
export type GtagConsentPayload = Partial<Record<GtagConsentStorageKey, GtagConsentState>>

/**
 * A single consent/cookie category that is shown to the user, e.g.
 * "Analytics", "Advertising", "Essential", etc.
 */
export interface ConsentType {
  /** The unique, lowercase identifier of this consent type. Used as the localStorage key suffix. */
  id: string

  /** The title shown to the user in the customization modal. */
  title: string

  /** The description shown to the user in the customization modal. HTML is allowed. */
  description: string

  /**
   * Set to `false` to keep the consent type registered (and still enforced/stored)
   * but hidden from the customization modal.
   *
   * @defaultValue `true`
   */
  enabled?: boolean

  /**
   * Marks this consent type as required/essential. Required consent types cannot be
   * rejected by the user and their checkbox is rendered disabled in the modal.
   */
  required?: boolean

  /** Whether the consent type's checkbox is checked by default in the customization modal. */
  onByDefault?: boolean

  /** The Google Consent Mode v2 category this consent type controls. */
  permissionType: PermissionType

  /** Callback invoked whenever this consent type is accepted/granted. */
  onAccept?: () => void

  /** Callback invoked whenever this consent type is rejected/denied. Never called when `required` is `true`. */
  onReject?: () => void
}

/**
 * All configuration options accepted by {@link CookieConsentManager}.
 * Every option is optional; anything omitted falls back to a sensible default.
 */
export interface CookieConsentManagerConfigs {
  // Core information
  /** The namespace/prefix used for every localStorage key this library writes. */
  prefix?: string
  /** The prefix used for every per-consent-type localStorage key (appended after `prefix`). */
  consentTypePrefix?: string
  /** The localStorage key suffix used to record that the user has responded to the banner/modal at least once. */
  setName?: string
  /** The stored value that represents an accepted/granted consent. */
  positiveValue?: string
  /** The stored value that represents a rejected/denied consent. */
  negativeValue?: string
  /** The localStorage key suffix used to store the library version the user last consented under. */
  versionName?: string
  /** The current version number of the consent configuration. Bump this to invalidate old stored consents. */
  version?: number

  // Event names
  /** Name of the event pushed to `dataLayer` when an individual consent type is accepted. */
  cookieConsentAcceptEventName?: string
  /** Name of the event pushed to `dataLayer` when an individual consent type is rejected. */
  cookieConsentRejectEventName?: string
  /** Name of the event pushed to `dataLayer` whenever consent changes. Use this as the GTM Custom Event trigger. */
  cookieConsentUpdateEventName?: string

  // Modal
  /** The `id` attribute of the customization modal. */
  modalId?: string
  /** The title of the customization modal. HTML is allowed. */
  modalTitle?: string
  /** Vertically center the modal. @see https://getbootstrap.com/docs/5.3/components/modal/#vertically-centered */
  centered?: boolean
  /** Make the modal body scroll independently from the page. @see https://getbootstrap.com/docs/5.3/components/modal/#scrolling-long-content */
  scrollable?: boolean
  /** Show/hide the modal with a fade animation. @see https://getbootstrap.com/docs/5.3/components/modal/#remove-animation */
  animation?: boolean
  /** Prevent the modal from closing when the user clicks outside of it. @see https://getbootstrap.com/docs/5.3/components/modal/#static-backdrop */
  staticBackground?: boolean
  /** Show the "X" close button on the modal header. */
  showCloseButtonOnModal?: boolean

  /** @remarks Not implemented yet. Consents are always stored in `localStorage` regardless of this value. */
  useLocalStorage?: boolean

  // Content
  acceptAllButtonText?: string
  acceptAllButtonAccessibleText?: string
  rejectAllButtonText?: string
  rejectAllButtonAccessibleText?: string
  customizeButtonText?: string
  customizeButtonAccessibleText?: string
  saveButtonText?: string
  saveButtonAccessibleText?: string

  // Banner
  /** The title of the banner. HTML is allowed. */
  bannerTitle?: string
  /** The body text of the banner. HTML is allowed. */
  bannerText?: string
  /** Whether to show the "Reject all" button on the banner (only "Accept all" and "Customize" otherwise). */
  showRejectAllButtonOnBanner?: boolean
  /** Disable page scrolling while the banner is visible. */
  freezeScrollingOnBanner?: boolean

  // Confirmation toast
  /** Whether to show a confirmation toast after the user responds. */
  showToast?: boolean
  toastText?: string
  toastPosition?: ToastPosition
  toastContainerId?: string
  toastId?: string
  /** Bootstrap background utility class(es) applied to the toast, e.g. `text-bg-success`. */
  toastBackgroundClass?: string
  toastShowCloseButton?: boolean
  /** Whether to HTML-escape `toastText` before rendering it. */
  toastEscapeHTML?: boolean
  toastAnimation?: boolean
  toastAutohide?: boolean
  /** Delay (in milliseconds) before the toast auto-hides, when `toastAutohide` is `true`. */
  toastDelay?: number
}

/** {@link CookieConsentManagerConfigs}, with every property required. Used internally after merging user configs with the defaults. */
export type ResolvedCookieConsentManagerConfigs = Required<CookieConsentManagerConfigs>

/**
 * Minimal shape of the global Bootstrap JS namespace that this library depends on.
 * Only the pieces actually used (`Modal` and `Toast`) are declared.
 */
export interface BootstrapNamespace {
  Modal: new (element: Element, options?: Record<string, unknown>) => {
    show: () => void
    hide: () => void
    dispose: () => void
  }
  Toast: new (
    element: Element,
    options?: {
      animation?: boolean
      autohide?: boolean
      delay?: number
    }
  ) => {
    show: () => void
    hide: () => void
    dispose: () => void
  }
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    bootstrap?: BootstrapNamespace
  }

  // eslint-disable-next-line no-var
  var bootstrap: BootstrapNamespace | undefined
}

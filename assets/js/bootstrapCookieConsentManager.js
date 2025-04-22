export default function bootstrapCookieConsentManager(userConsents = [], userConfig = {}) {
  // CONSTS
  const LOCAL_STORANGE_PREFIX = 'cookieConsent_' // the global prefix
  const LOCAL_STORANGE_CONSENT_TYPE_PREFIX = LOCAL_STORANGE_PREFIX + 'consentType_' // the name of the consent type
  const LOCAL_STORANGE_SET_NAME = LOCAL_STORANGE_PREFIX + 'isSet' // the name when consent is set
  const LOCAL_STORANGE_SET_VALUE = 'true' // the value when consent is set

  // CONSENTS
  const defaultConsents = []

  const consents = [...defaultConsents, ...userConsents]

  // console.log(consents)

  // CONFIGURATIONS
  const defaultConfig = {
    // BEHAVIOR

    // Center the modal vertically
    // https://getbootstrap.com/docs/5.3/components/modal/#vertically-centered
    centered: true,

    // When modals become too long for the user’s viewport or device, they scroll independent of the page itself.
    // https://getbootstrap.com/docs/5.3/components/modal/#scrolling-long-content
    scrollable: true,

    // For modals that simply appear rather than fade in to view, remove the .fade class from your modal markup.
    // https://getbootstrap.com/docs/5.3/components/modal/#remove-animation
    animation: true,

    // When backdrop is set to static, the modal will not close when clicking outside of it.
    // https://getbootstrap.com/docs/5.3/components/modal/#static-backdrop
    staticBackground: true,

    showRejectAllButtonOnBanner: true,

    // CONTENT
    title: 'Cookie Consent',
    rejectAllButtonText: 'Reject all',
    acceptAllButtonText: 'Accept all',
    saveButtonText: 'Save',
  }

  const config = { ...defaultConfig, ...userConfig }

  const { title, centered, scrollable, animation, staticBackground, showRejectAllButtonOnBanner, rejectAllButtonText, acceptAllButtonText, saveButtonText } = config || {}

  // MODAL CLASSES

  const modalDialogClasses = []

  if (centered) {
    modalDialogClasses.push('modal-dialog-centered')
  }

  if (scrollable) {
    modalDialogClasses.push('modal-dialog-scrollable')
  }

  let modalWrap = null

  if (modalWrap !== null) {
    modalWrap.remove()
  }

  // Create modal's content

  modalWrap = document.createElement('div')

  modalWrap.innerHTML = `
    <div class="modal ${animation ? 'fade' : ''}" tabindex="-1" ${staticBackground ? 'data-bs-backdrop="static"' : ''}>
      <div class="modal-dialog ${modalDialogClasses.join(' ')}">
        <div class="modal-content">
          <div class="modal-header bg-light">
            <p class="modal-title h6">${title}</p>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ${
              consents
              .map(consent => {
                const {id, title, description, required, onByDefault} = consent || {}
                return `
                <div class="">
                  <div class="d-flex gap-3">
                    <div class="flex-grow-1">
                      <p class="fw-bold m-0">${title}</p>
                    </div>
                    <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" role="switch" id="${id}" ${onByDefault ? 'checked' : ''} ${required ? 'disabled' : ''}>
                      <label class="form-check-label visually-hidden" for="${LOCAL_STORANGE_PREFIX + id}">ON</label>
                    </div>
                  </div>
                  <p class="m-0">${description}</p>

                </div>
                `
              })
              .join(`<hr class="p-0 my-3">`)
              // prettier-ignore
            }
          </div>
          <div class="modal-footer">
            <div class="d-grid gap-2 col-12 mx-auto d-sm-block text-sm-end">
              <button type="button" class="btn btn-outline-primary me-sm-2" data-bs-dismiss="modal" data-btn-function="rejectAll">${rejectAllButtonText}</button>
              <button type="button" class="btn btn-outline-primary me-sm-2" data-bs-dismiss="modal" data-btn-function="acceptAll">${acceptAllButtonText}</button>

              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" data-btn-function="save">${saveButtonText}</button>
            </div>


          </div>
        </div>
      </div>
    </div>
  `

  document.body.append(modalWrap)

  const modal = new bootstrap.Modal(modalWrap.querySelector('.modal'))
  const modalHTMLNode = modalWrap.querySelector('.modal')

  if (!modal) {
    return
  }

  const rejectAllButton = modalWrap.querySelector('.modal [data-btn-function=rejectAll]')
  const acceptAllButton = modalWrap.querySelector('.modal [data-btn-function=acceptAll]')
  const saveButton = modalWrap.querySelector('.modal [data-btn-function=save]')

  rejectAllButton.addEventListener('click', async e => {
    try {
      e.preventDefault()

      const checkboxes = modalHTMLNode.querySelectorAll('input.form-check-input')

      if (!checkboxes) {
        return
      }

      if (!checkboxes.length) {
        return
      }

      checkboxes.forEach(checkbox => {
        const name = LOCAL_STORANGE_CONSENT_TYPE_PREFIX + checkbox?.id
        const value = checkbox?.disabled ? 'true' : 'false' // set to false for all other than the required ones

        localStorage.setItem(name, value)
      })
    } catch (error) {
      console.error(error)
    } finally {
      localStorage.setItem(LOCAL_STORANGE_SET_NAME, LOCAL_STORANGE_SET_VALUE)
    }
  })

  acceptAllButton.addEventListener('click', async e => {
    try {
      e.preventDefault()

      const checkboxes = modalHTMLNode.querySelectorAll('input.form-check-input')

      if (!checkboxes) {
        return
      }

      if (!checkboxes.length) {
        return
      }

      checkboxes.forEach(checkbox => {
        const name = LOCAL_STORANGE_CONSENT_TYPE_PREFIX + checkbox?.id
        const value = 'true' // set to false for all other than the required ones

        localStorage.setItem(name, value)
      })
    } catch (error) {
      console.error(error)
    } finally {
      localStorage.setItem(LOCAL_STORANGE_SET_NAME, LOCAL_STORANGE_SET_VALUE)
    }
  })

  saveButton.addEventListener('click', async e => {
    try {
      e.preventDefault()

      const checkboxes = modalHTMLNode.querySelectorAll('input.form-check-input')

      if (!checkboxes) {
        return
      }

      if (!checkboxes.length) {
        return
      }

      checkboxes.forEach(checkbox => {
        const name = LOCAL_STORANGE_CONSENT_TYPE_PREFIX + checkbox?.id
        const value = checkbox?.checked ? 'true' : 'false'

        localStorage.setItem(name, value)
      })
    } catch (error) {
      console.error(error)
    } finally {
      localStorage.setItem(LOCAL_STORANGE_SET_NAME, LOCAL_STORANGE_SET_VALUE)
    }
  })

  try {
    const isConsentSet = localStorage.getItem(LOCAL_STORANGE_SET_NAME)

    if (isConsentSet !== LOCAL_STORANGE_SET_VALUE) {
      modal.show()
    }
  } catch (error) {}
}

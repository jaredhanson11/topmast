/**
 * Utility methods for components that handle release specific data.
 */
export default {
  methods: {
    /**
     * Returns bootstrap variant for release (or null).
     * @param {String} status, release status (deployed, pending, failed, ...)
     * @returns {String} bootstrap variant name. (success, warning, danger, ...), or null if none
     */
    getVariantForStatus(status) {
      status = status ? status.toLowerCase() : undefined
      if (status == 'deployed') return 'success'
      else if (status == 'pending') return 'warning'
      else if (status == 'failed') return 'danger'
      return
    },
    /**
     * Returns unique id for helm release.
     * @param {String} name, release name
     * @param {String} namespace, release namespace
     */
    getReleaseId(name, namespace) {
      return `${name}/${namespace}`
    }
  }
}

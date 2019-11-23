export default $axios => ({
  index (payload = {}) {
    const params = payload.params || {}

    return $axios({
      url: `laboral-references`,
      method: 'get',
      params
    })
  },

  show (payload = {}) {
    const referenceId = payload.referenceId
    const params = payload.params || {}

    return $axios({
      url: `laboral-references/${referenceId}`,
      method: 'get',
      params
    })
  },

  post (payload = {}) {
    const data = payload.data || {}

    return $axios({
      url: `laboral-references`,
      method: 'post',
      data
    })
  },

  put (payload = {}) {
    const referenceId = payload.referenceId
    const data = payload.data || {}

    return $axios({
      url: `laboral-references/${referenceId}`,
      method: 'put',
      data
    })
  },

  delete (payload = {}) {
    const referenceId = payload.referenceId

    return $axios({
      url: `laboral-references/${referenceId}`,
      method: 'delete'
    })
  }
})

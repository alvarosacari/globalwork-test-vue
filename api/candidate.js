export default $axios => ({
  index (payload = {}) {
    const params = payload.params || {}

    return $axios({
      url: `candidates`,
      method: 'get',
      params
    })
  },

  show (payload = {}) {
    const candidateId = payload.candidateId
    const params = payload.params || {}

    return $axios({
      url: `candidates/${candidateId}`,
      method: 'get',
      params
    })
  },

  showLaboralReferences (payload = {}) {
    const candidateId = payload.candidateId

    return $axios({
      url: `candidates/${candidateId}/laboral-references`,
      method: 'get'
    })
  },

  post (payload = {}) {
    const data = payload.data || {}

    return $axios({
      url: `candidates`,
      method: 'post',
      data
    })
  },

  put (payload = {}) {
    const candidateId = payload.candidateId
    const data = payload.data || {}

    return $axios({
      url: `candidates/${candidateId}`,
      method: 'put',
      data
    })
  },

  delete (payload = {}) {
    const candidateId = payload.candidateId

    return $axios({
      url: `candidates/${candidateId}`,
      method: 'delete'
    })
  }
})

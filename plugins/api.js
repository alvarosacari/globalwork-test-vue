import candidateAPI from '~/api/candidate'
import laboralReferenceAPI from '~/api/laboralReference'

export default (ctx, inject) => {
  inject('candidateAPI', candidateAPI(ctx.$axios))
  inject('laboralReferenceAPI', laboralReferenceAPI(ctx.$axios))
}

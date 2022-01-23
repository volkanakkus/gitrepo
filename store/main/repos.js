export const state = () => ({
  hashedLink: null,
  repoData: {
    github: null,
    iconId: null,
    color: null,
    topContributors: null,
  },
  error: null,
})

export const getters = {
  getHashedLink: (state) => state.hashedLink,
  getRepoData: (state) => state.repoData,
  getError: (state) => state.error,
}

export const mutations = {
  setHashedLink(state, payload) {
    state.hashedLink = payload
  },
  setRepoData(state, payload) {
    state.repoData = payload
  },
  setError(state, payload) {
    state.error = payload
  },
}

export const actions = {
  async generateLink(context, { username, reponame, icon, color }) {
    try {
      const response = await this.$axios.$get(
        '/github/repos/' + username + '/' + reponame
      )
      const hashedLink = this.$hashids.encode(
        response.id,
        icon.id,
        color.r,
        color.g,
        color.b
      )
      console.log(response.id, icon, color.r, color.g, color.b)

      context.commit('setHashedLink', hashedLink)
      context.commit('setError', false)
    } catch (err) {
      context.commit('setError', true)
      context.commit('setHashedLink', null)
      console.log('Error: ', err)
    }
  },
  async getRepo(context, hash) {
    try {
      const h = this.$hashids.decode(hash) // Hash Decode
      const response = await this.$axios.$get('/github/repositories/' + h[0])
      const contrubitors = await this.$axios.$get(
        '/github/repos/' + response.full_name + '/contributors'
      )

      return {
        github: response,
        icon: h[1], // Icon ID From Decoded Hash
        color: `rgb(${h[2]},${h[3]},${h[4]})`, // RGB Color From Decoded Hashes
        topContributors: contrubitors.slice(0, 2),
      }

      // context.commit('setRepoData', repoData)
    } catch (err) {
      context.commit('setRepoData', null)
      console.log('Error: ', err)
    }
  },
}

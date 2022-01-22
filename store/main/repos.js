export const state = () => ({
  hashedLink: null,
  repoData: null,
})

export const getters = {
  getHashedLink: (state) => state.hashedLink,
  getRepoData: (state) => state.repoData,
}

export const mutations = {
  setHashedLink(state, payload) {
    state.hashedLink = payload
  },
  setRepoData(state, payload) {
    state.repoData = payload
  },
}

export const actions = {
  async generateLink(context, { username, reponame }) {
    try {
      const response = await this.$axios.$get(
        '/github/repos/' + username + '/' + reponame
      )
      const hashedLink = this.$hashids.encode(response.id)
      console.log(response.id)

      context.commit('setHashedLink', hashedLink)
    } catch (err) {
      context.commit('setHashedLink', null)
      console.log('Error: ', err)
    }
  },
  async getRepo(context, repoID) {
    try {
      console.log()
      const routeHash = this.app.router.currentRoute.params.hash
      const repoID = String(this.$hashids.decode(routeHash)[0])

      const response = await this.$axios.$get('/github/repositories/' + repoID)

      context.commit('setRepoData', response)
    } catch (err) {
      context.commit('setRepoData', null)
      console.log('Error: ', err)
    }
  },
}

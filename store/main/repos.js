export const state = () => ({
  hashedLink: null,
  repoData: {
    github: null,
    iconId: null,
    color: null,
    topContributors: null,
  },
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
    } catch (err) {
      context.commit('setHashedLink', null)
      console.log('Error: ', err)
    }
  },
  async getRepo(context, repoID) {
    try {
      console.log()
      const routeHash = this.app.router.currentRoute.params.hash
      const h = this.$hashids.decode(routeHash) // Hash Decode
      const response = await this.$axios.$get('/github/repositories/' + h[0])

      const contrubitors = await this.$axios.$get(
        '/github/repos/' + response.full_name + '/contributors'
      )

      const repoData = {
        github: response,
        icon: h[1], // Icon ID From Decoded Hash
        color: `rgb(${h[2]},${h[3]},${h[4]})`, // RGB Color From Decoded Hashes
        topContributors: contrubitors.slice(0, 10),
      }

      context.commit('setRepoData', repoData)
    } catch (err) {
      context.commit('setRepoData', null)
      console.log('Error: ', err)
    }
  },
}

<template>
  <div id="app">
    <div>
      <h3>create your link:</h3>
    </div>
    <div>
      <input
        v-model="username"
        name="github-username"
        placeholder="github username"
        type="text"
      />
      <input
        v-model="reponame"
        name="github-repo"
        placeholder="repo url"
        type="text"
      />
    </div>
    <div>
      <button @click="generateLink">Generate Link</button>
    </div>
    <div v-if="generatedLink">
      <nuxt-link :to="hashedLink">{{ generatedLink }}</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      username: null,
      reponame: null,
      hashedLink: null,
      generatedLink: null,
    }
  },
  methods: {
    async generateLink() {
      if (this.username && this.reponame) {
        const response = await this.$axios.get(
          '/github/repos/' + this.username + '/' + this.reponame
        )
        this.hashedLink = this.$hashids.encode(response.data.id)

        if (process.client) {
          this.generatedLink = window.location.href + this.hashedLink
        }
      }

      // const repoID = this.$hashids.encode(this.getRepoID(this.reponame))
      // this.generatedLink = '/github/' + repoID
    },
  },
}
</script>

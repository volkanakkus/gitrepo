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
      <button @click="generate">Generate Link</button>
    </div>
    <SelectIcons @selectedIcon="setIcon" />
    <div v-if="hashedLink">
      <nuxt-link :to="hashedLink">{{ generatedLink }}</nuxt-link>
    </div>
    <span v-if="selectedIcon" class="material-icons">
      {{ selectedIcon.name }}
    </span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'IndexPage',
  data() {
    return {
      username: null,
      reponame: null,
      selectedIcon: null,
      generatedLink: null,
    }
  },
  computed: {
    ...mapGetters({
      hashedLink: 'main/repos/getHashedLink',
    }),
  },
  methods: {
    ...mapActions({
      generateLink: 'main/repos/generateLink',
    }),
    async generate() {
      if (this.username && this.reponame) {
        const data = {
          username: this.username,
          reponame: this.reponame,
        }
        await this.generateLink(data)

        if (process.client) {
          this.generatedLink = window.location.href + this.hashedLink
        }
      }
    },
    setIcon(icon) {
      this.selectedIcon = icon
    },
  },
}
</script>

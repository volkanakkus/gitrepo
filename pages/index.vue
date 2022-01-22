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
    <SelectColors @getColor="selectedColor = $event" />
    <span> {{ selectedColor }} </span>
    <SelectIcons @getIcon="selectedIcon = $event" />
    <div v-if="hashedLink">
      <nuxt-link :to="hashedLink">{{ generatedLink }}</nuxt-link>
      <span>
        <a
          :href="`http://twitter.com/share?text=${tweetText}&url=${generatedLink}`"
          >Tweet</a
        >
      </span>
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
      selectedColor: null,
      generatedLink: null,
      tweetText: 'Look at this awesome repo I found!',
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
      if (
        this.username &&
        this.reponame &&
        this.selectedColor &&
        this.selectedIcon
      ) {
        const data = {
          username: this.username,
          reponame: this.reponame,
          color: this.selectedColor,
          icon: this.selectedIcon,
        }
        await this.generateLink(data)

        if (process.client) {
          this.generatedLink = window.location.href + this.hashedLink
        }
      }
    },
  },
}
</script>

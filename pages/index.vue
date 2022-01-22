<template>
  <div id="app">
    <div class="head">
      <h2>Github Cards</h2>
      <h4>Make shareable github repo cards</h4>
    </div>

    <div class="card">
      <div class="inputs">
        <input
          v-model="username"
          name="github-username"
          placeholder="github username"
          type="text"
        />
        <span class="input-divider"> / </span>
        <input
          v-model="reponame"
          name="github-repo"
          placeholder="repo url"
          type="text"
        />
      </div>
      <div class="select-color">
        <span class="label">Select Template Color</span>
        <SelectColors @getColor="selectedColor = $event" />
      </div>
      <div class="select-icon">
        <span class="label">Select Icon</span>
        <SelectIcons @getIcon="selectedIcon = $event" />
      </div>
    </div>

    <div class="bottom">
      <div class="buttons">
        <a
          v-if="hashedLink"
          class="btn blue"
          :href="`http://twitter.com/share?text=${tweetText}&url=${generatedLink}`"
        >
          <span class="svg-icons">
            <img src="@/assets/icons/twitter.svg" /> </span
          >Tweet Your Link</a
        >
        <button
          v-if="!hashedLink"
          :disabled="!username || !reponame || !selectedColor || !selectedIcon"
          class="btn pink"
          @click="generate"
        >
          <span class="material-icons"> link_variant </span>
          Generate Link
        </button>
        <a v-else class="btn pink" :href="hashedLink" target="_blank">
          <span class="material-icons"> open_in_new </span>
          Open Link
        </a>
      </div>
      <div v-if="hashedLink" class="link-area">
        <a :href="hashedLink" target="_blank">{{ generatedLink }}</a>
      </div>
    </div>
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

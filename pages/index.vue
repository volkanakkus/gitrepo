<template>
  <div class="main home">
    <div class="head">
      <h2>Gitrepo Cards</h2>
      <h4>Make shareable github repo cards</h4>
    </div>

    <div class="card">
      <div class="inputs">
        <input
          v-model="username"
          name="github-username"
          placeholder="Github Username"
          type="text"
        />
        <span class="input-divider"> / </span>
        <input
          v-model="reponame"
          name="github-repo"
          placeholder="Repo"
          type="text"
        />
      </div>
      <div class="select-color">
        <span class="label">Select Template Color:</span>
        <SelectColors @getColor="selectedColor = $event" />
      </div>
      <div class="select-icon">
        <span class="label">Select Icon:</span>
        <SelectIcons @getIcon="selectedIcon = $event" />
      </div>
    </div>

    <div class="bottom">
      <div class="buttons">
        <button
          v-if="!hashedLink"
          :disabled="!username || !reponame || !selectedColor || !selectedIcon"
          class="btn pink"
          @click="generate"
        >
          <span class="material-icons"> link </span>
          Generate Link
        </button>
        <template v-else>
          <a class="btn pink" :href="hashedLink" target="_blank">
            <span class="material-icons"> open_in_new </span>
            Open
          </a>
          <button class="btn" @click="regenerate">
            <span class="material-icons"> link </span>
            Regenerate
          </button>
        </template>
        <a
          v-if="hashedLink"
          class="btn blue"
          target="_blank"
          :href="`http://twitter.com/share?text=${tweetText}&url=${generatedLink}`"
        >
          <span class="svg-icons">
            <img src="@/assets/icons/twitter.svg" /> </span
          >Tweet Your Link</a
        >
      </div>
      <div v-if="hashedLink" class="link-area">
        <a :href="hashedLink" target="_blank">{{ generatedLink }}</a>
      </div>
      <div v-if="error" class="link-area error">This repo does not exist.</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'IndexPage',
  data() {
    return {
      username: null,
      reponame: null,
      selectedIcon: { id: 1 },
      selectedColor: { r: 40, g: 203, b: 164 },
      generatedLink: null,
      tweetText: 'Look at this awesome repo I found!',
    }
  },
  computed: {
    ...mapGetters({
      hashedLink: 'main/repos/getHashedLink',
      error: 'main/repos/getError',
    }),
  },
  methods: {
    ...mapActions({
      generateLink: 'main/repos/generateLink',
    }),
    ...mapMutations({
      setHashedLink: 'main/repos/setHashedLink',
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
    regenerate() {
      this.username = null
      this.reponame = null
      this.setHashedLink(null)
    },
  },
}
</script>

<style lang="scss">
.home {
  .head {
    margin-bottom: 20px;

    h2,
    h4 {
      margin: 0;
    }

    h2 {
      margin-bottom: 3px;
      font-size: 30px;
      font-weight: 600;
    }

    h4 {
      font-size: 16px;
      font-weight: 600;
      color: $fontGray;
    }
  }

  .card {
    padding: 32px 25px;
    width: auto;

    .inputs {
      display: flex;
      align-items: center;
      grid-gap: 10px;

      .input-divider {
        @include global;
        display: flex;
        align-items: center;
        padding: 14px 18px;
        font-weight: 500;
        color: $fontGray;
      }
    }

    .select-color {
      display: flex;
      margin: 20px 0px;
      align-items: center;
      justify-content: space-between;
    }

    .select-color .label,
    .select-icon .label {
      font-size: 18px;
      font-weight: 500;
      color: $fontDark;
    }
  }

  .link-area {
    padding: 15px 16px;
    margin-top: 20px;
    background: #f1f1f1;
    color: $fontDark;
    border-radius: $borderRadius;
    font-weight: 600;
    text-align: center;

    &.error {
      background: #f59696;
      color: $white;
    }
  }
}
</style>

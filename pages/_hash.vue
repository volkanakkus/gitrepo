<template>
  <div v-if="repoData">
    <div class="card">
      <div class="profile" :style="{ backgroundColor: repoData.color }">
        <div class="info">
          <div class="avatar">
            <img :src="repoData.github.owner.avatar_url" />
          </div>
          <div class="name">
            <h2>{{ repoData.github.owner.login }}</h2>
          </div>
          <div v-if="selectedIcon" class="icon">
            <span class="material-icons">
              {{ selectedIcon.name }}
            </span>
          </div>
        </div>
      </div>

      <div class="repo-info">
        <a :href="repoData.github.html_url" target="_blank">
          <span class="name">{{ repoData.github.name }}</span>
          <span class="sep">•</span>
          <span class="description">
            {{ repoData.github.description }}
          </span>
        </a>
      </div>

      <div class="contributors">
        <div class="top">
          <h4>Top Contributors:</h4>

          <div class="star">
            <a
              :href="repoData.github.html_url"
              target="_blank"
              class="btn yellow"
            >
              <span class="material-icons"> star </span>
              Star
            </a>
            <span class="number">
              {{ repoData.github.stargazers_count }}
            </span>
          </div>
        </div>
        <div class="content">
          <div
            v-for="(contributor, index) in repoData.topContributors"
            :key="index"
            class="contributors"
          >
            <div class="avatar">
              <img :src="contributor.avatar_url" />
            </div>
            <div class="info">
              <a class="name" :href="contributor.html_url" target="_blank">
                {{ contributor.login }}
              </a>
              <a
                class="commits"
                :href="`${repoData.html_url}/graphs/contributors`"
                target="_blank"
              >
                {{ contributor.contributions }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="buttons">
        <a
          class="btn blue"
          :href="`http://twitter.com/share?text=${tweetText}&url=${repoData.github.html_url}`"
        >
          <span class="svg-icons">
            <img src="@/assets/icons/twitter.svg" /> </span
          >Tweet</a
        >
        <nuxt-link to="/" class="btn pink">
          <span class="material-icons"> link </span>
          Generate Your Own Link
        </nuxt-link>
      </div>
    </div>
    <!-- <client-only>
      <a
        v-if="repoData"
        class="github-button"
        href="https://github.com/ntkme"
        data-size="large"
        data-show-count="true"
        aria-label="Follow @ntkme on GitHub"
        >Follow @ntkme</a
      >
    </client-only>

    <span v-if="selectedIcon" class="material-icons">
      {{ selectedIcon.name }}
    </span>

    <span v-if="repoData" :style="{ color: repoData.color }">
      Color: {{ repoData.color }}</span
    >

    <pre>
     {{ repoData }}
    </pre> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      selectedIcon: null,
      tweetText: 'Look at this awesome repo I found!',
    }
  },
  async fetch() {
    await this.getRepo()
    this.selectedIcon = await this.icons.find(
      (icon) => icon.id === this.repoData.icon
    )
  },
  head() {
    return {
      title: this.repoData ? this.repoData.full_name : 'View Repo',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.repoData ? this.repoData.description : 'description',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      repoData: 'main/repos/getRepoData',
      icons: 'main/icons/getIcons',
    }),
  },
  methods: {
    ...mapActions({
      getRepo: 'main/repos/getRepo',
    }),
  },
}
</script>

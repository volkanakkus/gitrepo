<template>
  <div v-if="repoData" class="main">
    <div class="card">
      <div class="profile" :style="{ backgroundColor: repoData.color }">
        <div class="info">
          <div
            class="avatar"
            :style="{ border: `3px solid ${repoData.color}` }"
          >
            <img :src="repoData.github.owner.avatar_url" />
          </div>
          <div class="name">
            <h2>@{{ repoData.github.owner.login }}</h2>
          </div>
          <div v-if="selectedIcon" class="icon">
            <span class="material-icons">
              {{ selectedIcon.name }}
            </span>
          </div>
        </div>
      </div>

      <div class="card-body">
        <div class="repo-info">
          <a :href="repoData.github.html_url" target="_blank">
            <span class="name">{{ repoData.github.name }}</span>
            <span class="sep">•</span>
            <span class="description">
              {{ repoData.github.description || 'A Github Repo' }}
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
                class="btn yellow small"
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
              class="contributor"
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
                  :href="`${repoData.github.html_url}/graphs/contributors`"
                  target="_blank"
                >
                  {{ contributor.contributions }} Commits
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="buttons">
        <nuxt-link to="/" class="btn pink">
          <span class="material-icons"> link </span>
          Generate Your Own Link
        </nuxt-link>
        <a
          class="btn blue"
          :href="`http://twitter.com/share?text=${tweetText}&url=${generatedLink}`"
        >
          <span class="svg-icons">
            <img src="@/assets/icons/twitter.svg" /> </span
          >Tweet</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      selectedIcon: null,
      generatedLink: null,
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
      title: this.repoData
        ? `${this.repoData.github.full_name} - ${
            this.repoData.github.description || 'A Github Repo'
          }`
        : 'View Repo - Gitrepo Cards',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.repoData
            ? this.repoData.github.description
            : 'description',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: this.generatedLink },
        {
          property: 'og:title',
          content: this.repoData
            ? `${this.repoData.github.full_name} - ${
                this.repoData.github.description || 'A Github Repo'
              }`
            : 'View Repo - Gitrepo Cards',
        },
        {
          property: 'og:description',
          content: this.repoData
            ? `${this.repoData.github.description || 'A Github Repo'}`
            : 'View Repo - Gitrepo Cards',
        },
        {
          property: 'og:image',
          content: this.repoData
            ? `${this.repoData.github.owner.avatar_url}`
            : '',
        },
        { property: 'twitter:card', content: 'summary' },
        { property: 'twitter:url', content: this.generatedLink },
        {
          property: 'twitter:title',
          content: this.repoData
            ? `${this.repoData.github.full_name} - ${
                this.repoData.github.description || 'A Github Repo'
              }`
            : 'View Repo - Gitrepo Cards',
        },
        {
          property: 'twitter:description',
          content: this.repoData
            ? `${this.repoData.github.description || 'A Github Repo'}`
            : 'View Repo - Gitrepo Cards',
        },
        {
          property: 'twitter:image',
          content: this.repoData
            ? `${this.repoData.github.owner.avatar_url}`
            : '',
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
  mounted() {
    this.generatedLink = window.location.href + this.hashedLink
  },
  methods: {
    ...mapActions({
      getRepo: 'main/repos/getRepo',
    }),
  },
}
</script>

<style lang="scss">
.profile {
  height: 80px;
  border-radius: 9px 9px 0 0;
  margin-bottom: 21px;

  .info {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    max-height: 100px;
    grid-gap: 14px;
    padding: 18px 18px 0;

    .avatar {
      img {
        height: 100%;
        width: 100%;
        border-radius: 6px;
      }

      height: 77px;
      width: 77px;
      background: $white;
      border-radius: $borderRadius;
    }

    .name {
      @include global;
      padding: 0 16px;
      height: 41px;
      display: flex;
      justify-content: center;
      align-items: center;

      h2 {
        font-size: 16px;
        color: $fontBlack;
      }
    }

    .icon {
      background: $white;
      border-radius: $borderRounded;
      box-shadow: $shadow;
      height: 41px;
      width: 41px;
      display: flex;
      justify-content: center;
      align-items: center;

      .material-icons {
        font-size: 21px;
        color: $fontBlack;
        margin: 0;
      }
    }
  }
}

.card-body {
  padding: 20px;

  .repo-info {
    @include global;

    padding: 13px 18px;

    span {
      &.name {
        font-weight: 600;
        color: $fontBlack;
      }

      &.sep {
        margin: 0 7px;
        font-size: 20px;
        line-height: 0;
        opacity: 0.2;
      }

      &.description {
        font-size: 15px;
        color: $fontDark;
        font-weight: 500;
        line-height: 24px;
      }
    }
  }

  .contributors {
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20px 4px 15px;

      h4 {
        font-size: 16px;
        color: $fontDark;
        margin: 0 0 -15px 0;
      }

      .star {
        @include global;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 5px;

        .number {
          font-size: 14px;
          padding: 0 10px;
          font-weight: 600;
          color: $fontDark;
        }
      }
    }

    .content {
      @include global;
      padding: 15px 0;

      display: flex;
      justify-content: space-between;
      align-items: center;

      .avatar,
      img {
        width: 46px;
        height: 46px;
        border-radius: $borderRounded;
      }

      .avatar {
        border: 1px solid $gray;
      }

      .contributor {
        display: flex;
        align-items: center;
        grid-gap: 10px;
        padding: 0 18px;

        .info {
          display: flex;
          flex-direction: column;
          grid-gap: 3px;
          justify-content: center;

          a {
            &.name {
              font-weight: 600;
              font-size: 15px;
            }

            &.commits {
              font-size: 13px;
              margin-top: 1px;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
}
</style>

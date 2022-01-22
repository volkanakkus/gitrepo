<template>
  <div>
    <span v-if="selectedIcon" class="material-icons">
      {{ selectedIcon.name }}
    </span>

    <span :style="{ color: repoData.color }"> Color: {{ repoData.color }}</span>

    <pre>
     {{ repoData }}
    </pre>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      selectedIcon: null,
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

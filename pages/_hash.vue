<template>
  <div>
    <pre>
     {{ repoData }}
    </pre>
    <span class="material-icons"> settings </span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      repo: null,
    }
  },
  async fetch() {
    await this.getRepo()
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
    }),
  },
  methods: {
    ...mapActions({
      getRepo: 'main/repos/getRepo',
    }),
  },
}
</script>

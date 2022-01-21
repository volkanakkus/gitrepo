<template>
  <div>
    <pre>
     {{ repoData }}
    </pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      repoData: null,
    }
  },
  async fetch() {
    const repoID = String(this.$hashids.decode(this.$route.params.hash)[0])

    const response = await this.$axios.get('/github/repositories/' + repoID)
    this.repoData = response.data
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
}
</script>

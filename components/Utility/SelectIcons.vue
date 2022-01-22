<template>
  <div>
    <span v-for="icon in icons" :key="icon.id">
      <span class="material-icons" @click="selectIcons(icon)">
        {{ icon.name }}
      </span>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      icons: 'main/icons/getIcons',
    }),
  },
  methods: {
    selectIcons(icon) {
      this.$emit('getIcon', icon)
    },
  },
}
</script>

<style lang="scss" scoped></style>

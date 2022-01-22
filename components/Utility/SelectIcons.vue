<template>
  <div class="select-icons">
    <span
      v-for="icon in icons"
      :key="icon.id"
      class="icon"
      :class="selectedIcon.id === icon.id ? 'active' : ''"
    >
      <span class="material-icons" @click="selectIcons(icon)">
        {{ icon.name }}
      </span>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      selectedIcon: null,
    }
  },
  computed: {
    ...mapGetters({
      icons: 'main/icons/getIcons',
    }),
  },
  created() {
    this.selectedIcon = this.icons[0]
  },
  methods: {
    selectIcons(icon) {
      this.selectedIcon = icon
      this.$emit('getIcon', icon)
    },
  },
}
</script>

<style lang="scss" scoped></style>

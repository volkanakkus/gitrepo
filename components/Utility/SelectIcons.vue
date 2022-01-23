<template>
  <div class="select-icons">
    <span
      v-for="icon in icons"
      :key="icon.id"
      class="icon"
      :class="selectedIcon.id === icon.id ? 'active' : ''"
      @click="selectIcons(icon)"
    >
      <span class="material-icons">
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

<style lang="scss">
.select-icons {
  @include global;

  display: flex;
  padding: 15px;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 20px;

  .icon {
    padding: 14px;
    background: #f8f8f8;
    border: 1px solid #e6e6e6;
    box-sizing: border-box;
    border-radius: 12px;
    height: 40px;
    width: 40px;
    margin: 5px 4px;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    span {
      font-size: 27px;
      margin-left: -9px;
      margin-top: -9px;
      opacity: 0.3;
    }

    &.active span {
      opacity: 1;
    }
  }
}
</style>

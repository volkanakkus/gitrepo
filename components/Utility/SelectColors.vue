<template>
  <div class="color-picker">
    <input v-model="color" type="color" @input="setColor" />
    <span> {{ rgbColor }} </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: '#28CBA4',
      rgbColor: 'rgb(40,203,164)',
    }
  },
  methods: {
    setColor() {
      const [r, g, b] = this.color.match(/\w\w/g).map((x) => parseInt(x, 16))
      this.rgbColor = `rgb(${r},${g},${b})`

      this.$emit('getColor', { r, g, b })
    },
  },
}
</script>

<style lang="scss" scoped>
.color-picker {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 250px;
  @include global;

  span {
    font-size: 16px;
    padding: 0px 14px;
    font-weight: 500;
    opacity: 0.6;
  }
}
/* Rectangle 5 */

input[type='color'] {
  box-shadow: 0 0 0 2px var(--formShadowFocus);
  -webkit-appearance: none;
  border: none;
  border-radius: 9px 0px 0px 9px;
  height: 43px !important;
  width: 96px;
  padding: 0 !important;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
    border-radius: 9px 0px 0px 9px;
  }
  &::-webkit-color-swatch {
    border: none;
    border-radius: 9px 0px 0px 9px;
  }
}
</style>

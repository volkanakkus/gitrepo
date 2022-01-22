<template>
  <div class="select-color">
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
input[type='color'] {
  box-shadow: 0 0 0 2px var(--formShadowFocus);
  -webkit-appearance: none;
  border: none;
  border-radius: 10px;
  height: 25px !important;

  padding: 0 !important;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
    border-radius: 20px;
  }
  &::-webkit-color-swatch {
    border: none;
    border-radius: 20px;
  }
}
</style>

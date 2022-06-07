<template>
  <font-awesome-icon
    v-if="icons[type]?.resource_type === 'icon'"
    :icon="[ icons[type]?.prefix, icons[type]?.icon ]"
  />
  <img
    v-else
    :src="require(`../../${icons[type]?.src}`)" 
    :alt="icons[type].alt"
    :class="icons[type].class"
  >
</template>

<script>
import icons from '../../icons'

export default {
  props: {
    type: {
      type: String,
      required: true,
      default: '',
    },
  },

  data() {
    return {
      icons
    }
  },
}
</script>
<template>
  <font-awesome-icon
    v-if="!isImage"
    :icon="iconData"
    data-testid="icon"
  />
  <img
    v-else
    :src="require(`@/${icons[type]?.src}`)" 
    :alt="icons[type].alt"
    :class="icons[type].class"
  >
</template>

<script>
import icons from '@/icons'

export default {
  props: {
    type: {
      type: String,
      required: true,
      default: 'missedIcon',
    },
  },

  data() {
    return {
      icons
    }
  },

  computed: {
    isImage() { 
      return icons[this.type]?.resource_type === 'image' ? true : false
    },

    iconData() {
      return icons[this.type] ? [ icons[this.type]?.prefix, icons[this.type]?.icon ] : [ icons.missedIcon.prefix, icons.missedIcon.icon]
    }
  }
}
</script>
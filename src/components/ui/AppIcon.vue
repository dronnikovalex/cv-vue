<template>
  <font-awesome-icon :icon="[ icons[type]?.prefix, icons[type]?.icon ]" />
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
  }
}
</script>
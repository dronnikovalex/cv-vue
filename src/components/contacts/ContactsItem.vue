<template>
  <span class="item__placeholder">
    {{ contact.name }}
  </span>

  <span class="item__value">
    <font-awesome-icon :icon="[ icons[contact.type]?.prefix, icons[contact.type]?.icon ]" />
    <a 
      :href="contact.link"
      target="_blank" 
    >
      {{ contact.value }}
    </a>  
  </span>
</template>

<script>
import icons from '../../icons'

export default {
  props: {
    contact: {
      type: Object,
      required: true,
      default: function() {
        return {}
      },
    },
  },

    data() {
    return {
      icons
    }
  },
}
</script>
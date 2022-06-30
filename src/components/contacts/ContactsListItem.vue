<template>
  <template v-if="!isMobileView">
    <span class="item__placeholder">
      {{ contact.name }}
    </span>

    <span class="item__value">
      <app-icon :type="contact.type" />
      <a 
        :href="contact.link"
        target="_blank" 
      >
        {{ contact.value }}
      </a>  
    </span>
  </template>

  <template v-else>
    <a 
      :href="contact.link"
      target="_blank" 
    >
      <app-icon :type="contact.type" />
    </a>  
  </template>
</template>

<script>
import AppIcon from '@/components/ui/AppIcon'

export default {
  components: { AppIcon },

  props: {
    contact: {
      type: Object,
      required: true,
      default: function() {
        return {}
      },
    },
    isMobileView: {
      type: Boolean,
      required: false,
    }
  },
}
</script>
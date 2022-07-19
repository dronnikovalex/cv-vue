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
        data-cy="md-link"
      >
        {{ contact.value }}
      </a>  
    </span>
  </template>

  <template v-else>
    <a 
      :href="contact.link"
      target="_blank"
      data-cy="sm-link"
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
      required: true,
      default: false
    }
  },
}
</script>
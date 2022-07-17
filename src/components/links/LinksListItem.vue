<template>
  <div 
    v-if="Object.keys(link).length"
    class="link__item"
    data-cy="link-item"
  >
    <span class="link__placeholder">{{ link.name }}</span>
    <span class="link__value">
      <app-icon :type="link.type" />
      <a 
        :href="link.link" 
        target="_blank"
      >
        {{ link.value }}
      </a>
    </span>
  </div>
</template>

<script>
import AppIcon from '@/components/ui/AppIcon'

export default {
  components: { AppIcon },

  props: {
    link: {
      type: Object,
      required: true,
      default: function() {
        return {}
      }
    },
  },

}
</script>
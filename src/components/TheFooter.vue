<template>
  <footer id="footer"> 
    <links-list
      v-if="links.length"
      :links="links" 
      source="footer"
      class="footer__links"
    />

    <app-button
      class="contacts__request"
      @action="$emit('open-modal')"
    />
  </footer>
</template>

<script>
import LinksList from '@/components/links/LinksList'
import AppButton from './ui/AppButton.vue'

export default {
  components: { LinksList, AppButton },

  props: {
    links: {
      type: Array,
      required: true,
      default: function() {
        return []
      }
    }
  },

  emits: {
    'open-modal': null
  },
}
</script>

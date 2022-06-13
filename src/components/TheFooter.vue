<template>
  <footer class="footer"> 
    <links-list 
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
      type: Object,
      required: true,
      default: function() {
        return {}
      }
    }
  },

  emits: {
    'open-modal': null
  },
}
</script>

<template>
  <footer class="footer"> 
    <links-list 
      :links="links" 
      source="footer"
      class="footer__links"
    />

    <contacts-request-button 
      @open-modal="$emit('open-modal')"
    />
  </footer>
</template>

<script>
import LinksList from '@/components/links/LinksList'
import ContactsRequestButton from './contacts/ContactsRequestButton.vue'

export default {
  components: { LinksList, ContactsRequestButton },

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

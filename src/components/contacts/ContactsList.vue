<template>
  <div class="contacts">
    <app-list-title v-if="isNotHeaderSource">Контакты</app-list-title>

    <div
      v-for="(contact, idx) in contacts"
      :key="idx"
      class="contacts__item item"
    >
      <contacts-list-item :contact="contact" />
    </div>
    
    <contacts-request-button 
      v-if="isNotHeaderSource" 
      @open-modal="$emit('open-modal')"
    />
  </div>
</template>

<script>
import ContactsListItem from './ContactsListItem.vue'
import ContactsRequestButton from './ContactsRequestButton.vue'
import AppListTitle from '../ui/AppListTitle.vue'

export default {
  components: { ContactsListItem, AppListTitle, ContactsRequestButton },

  props: {
    contacts: {
      type: Object,
      required: true,
      default: function() {
        return {}
      },
    },
    source: {
      type: String,
      required: false,
      default: 'header',
    },
  },

  emits: {
    'open-modal': null
  },

  computed: {
    isNotHeaderSource() {
      return this.source !== 'header'
    }
  }

}
</script>
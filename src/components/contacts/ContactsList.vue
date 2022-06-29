<template>
  <div 
    class="contacts"
    data-cy="contacts"
  >
    <app-list-title v-if="isNotHeaderSource">Контакты</app-list-title>

    <div
      v-for="(contact, idx) in contacts"
      :key="idx"
      class="contacts__item item"
    >
      <contacts-list-item :contact="contact" />
    </div>
  
    <app-button
      v-if="isNotHeaderSource" 
      class="contacts__request"
      @action="$emit('open-modal')"
    />
  </div>
</template>

<script>
import ContactsListItem from './ContactsListItem.vue'
import AppButton from '../ui/AppButton.vue'
import AppListTitle from '../ui/AppListTitle.vue'

export default {
  components: { ContactsListItem, AppListTitle, AppButton },

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
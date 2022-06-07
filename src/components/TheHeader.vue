<template>
  <header class="header">
    <div class="header__container">
      <div class="header__avatar avatar" />

      <app-about source="header" />

      <contacts-list
        class="header__contacts"
        :contacts="contacts"
        source="header" 
      />
    </div>
  </header>
</template>

<script>
import ContactsList from '@/components/contacts/ContactsList.vue'
import AppAbout from '@/components/ui/AppAbout'

export default {
  components: { ContactsList, AppAbout },

  props: {
    contacts: {
      type: Object,
      required: true,
      default: function() {
        return {}
      }
    },
  }
}
</script>

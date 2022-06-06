<template>
  <header class="header">
    <div class="header__container">
      <div class="header__avatar avatar" />

      <div class="header__info">
        <div class="header__personal personal">
          <span class="header__surname surname">Дронников&nbsp;</span>
          <span class="header__name name">Алексей</span>
        </div>
        <span class="header__position">QA ENGINEER</span>
      </div>

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

export default {
  components: { ContactsList },

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

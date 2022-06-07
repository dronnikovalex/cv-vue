<template>
  <aside class="sidebar about">
    <div class="about__avatar avatar" />
    <div class="about__info">
      <div class="about__personal personal">
        <span class="about__surname surname">Дронников</span>
        <span class="about__name name">Алексей</span>
      </div>
      <span class="about__position">QA engineer</span>
    </div>
    <div class="about__summary">
      <h2 class="sidebar__title">Обо мне</h2>
      
      <p>{{ about }}</p>
    </div>

    <hr class="sidebar__divider">

    <contacts-list 
      :contacts="contacts"
      source="sidebar"
      @open-modal="$emit('open-modal')"
    />

    <hr class="sidebar__divider">
    
    <links-list 
      :links="links" 
      source="sidebar"
    />
  </aside>
</template>

<script>
import ContactsList from '@/components/contacts/ContactsList'
import LinksList from '@/components/links/LinksList'

export default {
  components: { ContactsList, LinksList },

  props: {
    about: {
      type: String,
      required: true,
      default: ''
    },
    contacts: {
      type: Object,
      required: true,
      default: function() {
        return {}
      }
    },
    links: {
      type: Object,
      required: true,
      default: function() {
        return {}
      }
    },
  },

  emits: {
    'open-modal': null
  },
}
</script>

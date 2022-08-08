<template>
  <aside 
    class="sidebar about"
    data-cy="sidebar"
  >
    <div 
      class="sidebar__avatar avatar"
      data-cy="avatar" 
    />

    <app-about
      v-if="about" 
      source="sidebar"
      :about="about"
    />

    <hr class="sidebar__divider">

    <contacts-list 
      v-if="contacts.length" 
      :contacts="contacts"
      source="sidebar"
      @open-modal="$emit('open-modal')"
    />

    <hr class="sidebar__divider">
    
    <links-list 
      v-if="links.length" 
      :links="links" 
      source="sidebar"
    />
  </aside>
</template>

<script>
import AppAbout from '@/components/ui/AppAbout'
import ContactsList from '@/components/contacts/ContactsList'
import LinksList from '@/components/links/LinksList'

export default {
  components: { ContactsList, LinksList, AppAbout },

  props: {
    about: {
      type: String,
      required: true,
      default: ''
    },
    contacts: {
      type: Array,
      required: true,
      default: function() {
        return []
      }
    },
    links: {
      type: Array,
      required: true,
      default: function() {
        return []
      }
    },
  },

  emits: {
    'open-modal': null
  },
}
</script>

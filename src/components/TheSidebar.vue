<template>
  <aside class="sidebar about">
    <div class="about__avatar avatar" />
    <app-about>
      {{ about }}
    </app-about>

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

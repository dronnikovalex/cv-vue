<template>

  <header class="header sticky">
    <div
      :class="headerContainerClass"
    >   
    <div class="info-wrapper">
      <div class="header__avatar avatar" />

      <app-about source="header" />
    </div>

      <contacts-list
        :class="contactsListClass"
        :contacts="contacts"
        :is-mobile-view="isMobileView"
        source="header" 
      />
      </div>

      <div class="progress-container">
        <div class="progress-bar" id="progress"></div>
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
    isMobileView: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  mounted() {
  window.addEventListener('scroll', scrollProgress) 
    
  function scrollProgress() {
      var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var scrolled = (winScroll / height) * 100;
      document.getElementById("progress").style.width = scrolled + "%";
    }    
  },

  computed: {
    contactsListClass() {
      return `header__contacts-${this.isMobileView ? 'sm' : 'md'}`
    },

    headerContainerClass() {
      return`header__container-${this.isMobileView ? 'sm' : 'md'}`
    }
  }
}
</script>

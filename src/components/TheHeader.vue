<template>

  <header class="header sticky">
    <div 
      class="header__container"
    >   
    <div class="info-wrapper">
      <div class="header__avatar avatar" />

      <app-about source="header" />
    </div>

      <contacts-list
        class="header__contacts"
        :contacts="contacts"
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
}
</script>

<template>
  <div class="app-container-fluid">
    <div class="app-container">
      <the-sidebar />
  
      <the-header v-if="checkWindowsWidth" />

      <main class="card-container">
        <main-skills />
  
        <main-experience />
  
        <main-education />
      </main>

      <the-footer v-if="checkWindowsWidth" />
    </div>
  </div>
</template>

<script>
import TheSidebar from '@/components/TheSidebar'
import MainSkills from '@/components/card/MainSkills'
import MainExperience from '@/components/card/MainExperience'
import MainEducation from '@/components/card/MainEducation'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'

export default {
  components: { TheSidebar, MainSkills, MainExperience, MainEducation, TheHeader, TheFooter },

  data() {
    return {
      wWidth: window.innerWidth
    }
  },

  computed: {
    checkWindowsWidth() {
      if (this.wWidth <= 992) {
        return true
      } else {
        return false
      }
    }
  },
  
  mounted() {
    window.onresize = () => {
      this.wWidth = window.innerWidth
    }
  },
}
</script>

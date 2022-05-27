<template>
  <div class="app-container-fluid">
    <div class="app-container">
      <the-sidebar />
  
      <main class="card-container">
        <main-skills />
  
        <main-experience />
  
        <main-education />
      </main>
    </div>
  </div>
</template>

<script>
import TheSidebar from '@/components/TheSidebar'
import MainSkills from '@/components/card/MainSkills'
import MainExperience from '@/components/card/MainExperience'
import MainEducation from '@/components/card/MainEducation'

export default {
  components: { TheSidebar, MainSkills, MainExperience, MainEducation }
}
</script>

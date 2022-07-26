<template>
  <section 
    v-if="experience.length"
    id="experience"
  >
    <app-heading>Опыт работы</app-heading>

    <div 
      class="experience__container"
      data-cy="experience-container"
    >
      <main-experience-item 
        v-for="(experienceItem, idx) in experience"
        :key="idx"
        :experience-item="experienceItem"
      />
    </div>
  </section>
</template>

<script>
import AppHeading from '@/components/ui/AppHeading'
import MainExperienceItem from './MainExperienceItem'

export default {
  components: { AppHeading, MainExperienceItem },

  props: {
    experience: {
      type: Array,
      required: true,
      default: function() {
        return []
      }
    }
  }
}
</script>
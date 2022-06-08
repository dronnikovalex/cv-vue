<template>
  <section class="experience">
    <app-heading>
      Опыт работы
    </app-heading>

    <div class="experience__container">
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
      type: Object,
      required: true,
      default: function() {
        return {}
      }
    }
  }
}
</script>
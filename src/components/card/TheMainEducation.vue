<template>
  <section class="study">
    <app-heading>Обучение</app-heading>

    <div class="study__container">
      <main-education-item
        :instance="university"
      />

      <details>
        <summary 
          class="study__details"
          data-cy="study-details"
          @click="toggleDetails"
        >
          {{ summaryStatus === false ? 'Развернуть▼' : 'Свернуть▲' }}
        </summary>
        
        <main-education-item 
          :instance="school"
        />
      </details>
    </div>
  </section>
</template>

<script>
import AppHeading from '@/components/ui/AppHeading'
import MainEducationItem from './MainEducationItem'

export default {
  components: { AppHeading, MainEducationItem },

  props: {
    study: {
      type: Object,
      required: true,
      default: function() {
        return {}
      }
    }
  },

  data() {
    return {
      summaryStatus: false,
      school: {},
      university: {},
    }
  },

  mounted() {
    this.school = this.study[Object.keys(this.study)
      .find(id => this.study[id].type === 'school')]

    this.university = this.study[Object.keys(this.study)
      .find(id => this.study[id].type === 'university')]
  },

  methods: {
    toggleDetails() {
      this.summaryStatus = !this.summaryStatus
    }
  }
}
</script>
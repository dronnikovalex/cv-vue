<template>
  <section 
    v-if="study.length"
    id="study"
  >
    <app-heading>Обучение</app-heading>

    <div class="study__container">
      <main-education-item
        :instance="university"
      />

      <details v-if="study.length > 1">
        <summary 
          class="study__details"
          data-cy="study-details"
          @click="toggleDetails"
        >
          {{ summaryName }}
        </summary>
        
        <Transition name="slide">
          <main-education-item 
            v-if="isOpen" 
            :instance="school" 
          />
        </Transition>
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
      type: Array,
      required: true,
      default: function() {
        return []
      }
    }
  },

  data() {
    return {
      isOpen: false,
      school: {},
      university: {},
    }
  },

  computed: {
    summaryName() {
      return this.isOpen === false ? 'Развернуть▼' : 'Свернуть▲'
    }
  },

  mounted() {
    if (this.study.length) {
      this.school = this.study[Object.keys(this.study)
        .findIndex(id => this.study[id].type === 'school')]

      this.university = this.study[Object.keys(this.study)
        .findIndex(id => this.study[id].type === 'university')]
    }
  },

  methods: {
    toggleDetails() {
      this.isOpen = !this.isOpen

      setTimeout(() => {
        window.scrollTo(0,document.body.scrollHeight);
      }, 0)
    }
  }

}
</script>
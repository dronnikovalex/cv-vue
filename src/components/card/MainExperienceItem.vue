<template>
  <div 
    class="experience__item"
    data-cy="experience-item"
  >
    <h3 :class="{ experience__last: isLastJob }">{{ experienceItem.name }} | {{ experienceItem.dateFrom }} - {{ experienceItem.dateTo }}</h3>
    <p class="experience__position">Должность - {{ experienceItem.position }}</p>
    <p class="experience__description">{{ experienceItem.description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    experienceItem: {
      type: Object,
      required: true,
      default: function() {
        return {
          dateFrom: '01/2020',
          dateTo: '01/2021',
          name: 'Placeholder name',
          position: 'Placeholder position',
          description: 'Placeholder description',
          last: true
        }
      }
    }
  },

  computed: {
    isLastJob() {
      return this.experienceItem.last === true ? true : false
    }
  }
}
</script>
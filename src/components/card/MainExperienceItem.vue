<template>
  <div class="experience__item">
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
        return {}
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
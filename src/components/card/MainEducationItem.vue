<template>
  <div class="study__item">
    <h3 class="study__title">{{ instance.title }}</h3>
    <p class="study__years">{{ instance.dateFrom }} - {{ instance.dateTo }}</p>
    <p class="study__description">{{ instance.description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    instance: {
      type: Object,
      required: false,
      default: function() {
        return {}
      }
    }
  }
}
</script>
<template>
  <div 
    v-if="isVisible"
    id="toast"
    data-cy="toast"
  >
    <slot>[Ошибка] Что-то пошло не так.</slot>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      require: false,
      default: false
    }
  }
}
</script>
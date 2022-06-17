<template>
  <div class="error">
    <div class="error__title">
      <p>При загрузке страницы произошла ошибка:</p>
      <small class="">{{ errorMessage }}</small>
    </div>
    <div class="error__image" />
    <p class="error__subtitle">Пожалуйста, попробуйте снова</p>
    <app-button 
      class="btn error__button"
      @action="$emit('repeat-loading')"
    >
      <app-loader
        v-if="waitingForResponse" 
        type="sm"
        color="black"
      />
      <span v-else>Повторить</span>
    </app-button>
  </div>
</template>

<script>
import AppLoader from '@/components/ui/AppLoader'
import AppButton from '@/components/ui/AppButton'

export default {
  components: { AppLoader, AppButton },

  props: {
    waitingForResponse: {
      type: Boolean,
      required: false,
      default: false,
    },
    errorMessage: {
      type: String,
      required: true,
      default: '[Ошибка] Что-то пошло не так.',
    },
  }
  
}
</script>
export default {
  data() {
    return {
      toastVisibility: false,
      toastMessage: '',
    }
  },

  methods: {
    showToast(message) {
      this.toastVisibility = true
      this.toastMessage = message || '[Ошибка] Что-то пошло не так.'

      setTimeout(() => this.toastVisibility= false, 5000)
    }
  }
}
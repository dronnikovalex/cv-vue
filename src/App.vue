<template>
  <div class="app-container-fluid">
    <div class="app-container">
      <the-sidebar 
        @open-modal="openModal"
      />
  
      <the-header v-if="checkWindowsWidth" />

      <main class="card-container">
        <main-skills />
  
        <main-experience />
  
        <main-education />
      </main>

      <the-footer v-if="checkWindowsWidth" />
    </div>

    <teleport to="body">
      <app-modal 
        :modalVisibility="modalVisibility"
        @close-form="closeForm"
        @send-form="sendRequest"
      >
        <template #body>
          <div class="request-body">
            <div class="input-field">
              <label for="name" class="inp">
                <input
                  id="name" 
                  type="text"
                  placeholder="&nbsp;"
                >
                <span class="label">Имя</span>
                <span class="focus-bg" />
              </label>
            </div>

            <div class="input-field">
              <label for="position" class="inp">
                <input
                  id="position" 
                  type="text"
                  placeholder="&nbsp;"
                >
                <span class="label">Должность</span>
                <span class="focus-bg" />
              </label>
            </div>

            <div class="input-field">
              <label for="contacts" class="inp">
                <input
                  id="contacts" 
                  type="text"
                  placeholder="&nbsp;"
                >
                <span class="label">Контакты</span>
                <span class="focus-bg" />
              </label>
            </div>

            <div class="desription-field">
              <label for="description">Описание</label>
              <textarea 
                id="description" 
                type="text" 
                name="description" 
              />
            </div>
          </div>
        </template>
        <template #footer="{ send }">
          <div class="reuqest-footer">
            <button 
              class="btn"
              @click="send"
            >
              Отправить
            </button>
          </div>
        </template>
      </app-modal>
    </teleport>
  </div>
</template>

<script>
import TheSidebar from '@/components/TheSidebar'
import MainSkills from '@/components/card/MainSkills'
import MainExperience from '@/components/card/MainExperience'
import MainEducation from '@/components/card/MainEducation'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import AppModal from '@/components/ui/AppModal'

export default {
  components: { TheSidebar, MainSkills, MainExperience, MainEducation, TheHeader, TheFooter, AppModal },

  data() {
    return {
      wWidth: window.innerWidth,
      modalVisibility: false
    }
  },

  computed: {
    checkWindowsWidth() {
      if (this.wWidth <= 992) {
        return true
      } else {
        return false
      }
    }
  },
  
  mounted() {
    window.onresize = () => {
      this.wWidth = window.innerWidth
    }
  },

  methods: {
    openModal() {
      this.modalVisibility = true
    },

    closeForm() {
      this.modalVisibility = false
    },

    sendRequest() {
      console.log('called')
    }
  },
  
}
</script>

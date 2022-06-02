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

      <the-footer 
        v-if="checkWindowsWidth" 
        @open-modal="openModal"
      />
    </div>

    <teleport to="body">
      <app-modal 
        :modal-visibility="modalVisibility"
        @close-form="closeForm"
      >
        <template #default>
          <Form
            class="request-body"
            :validation-schema="schema"
            @submit="sendForm"
          > 
            <div class="input-field">
              <label for="name" class="inp">
                <Field
                  id="name" 
                  v-model="name"
                  type="text"
                  placeholder="&nbsp;"
                  name="name"
                />
                <span class="label">Имя</span>
                <span class="focus-bg" />
                <small>
                  <ErrorMessage name="name" />
                </small>
              </label>
            </div>

            <div class="input-field">
              <label for="position" class="inp">
                <Field
                  id="position" 
                  v-model="position"
                  type="text"
                  placeholder="&nbsp;"
                  name="position"
                />
                <span class="label">Должность</span>
                <span class="focus-bg" />
                <small>
                  <ErrorMessage name="position" />
                </small>
              </label>
            </div>

            <div class="input-field">
              <label for="contacts" class="inp">
                <Field
                  id="contacts" 
                  v-model="contacts"
                  type="text"
                  placeholder="&nbsp;"
                  name="contacts"
                />
                <span class="label">Контакт для обратной связи</span>
                <span class="focus-bg" />
                <small>
                  <ErrorMessage name="contacts" />
                </small>
              </label>
            </div>

            <div class="desription-field">
              <label for="description">Описание</label>
              <textarea 
                id="description" 
                v-model="description"
                type="text" 
                name="description"
                @input="checkDescription"
              />    
              <small v-if="isEmptyDescription">
                {{ $options.requiredFieldText }}
              </small>              
            </div>

            <div class="reuqest-footer">
              <button 
                class="btn request-send"
                @click="checkDescription"
                :disabled="loading"
              >
                <app-loader v-if="loading" />
                <span v-else>Отправить</span>
              </button>
            </div>
          </Form>
        </template>
      </app-modal>
    </teleport>

    <teleport to="body">
      <app-toast v-if="toastVisibility">
        {{ toastMessage }}
      </app-toast>
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
import AppLoader from '@/components/ui/AppLoader'
import AppToast from '@/components/ui/AppToast'
import { sendFormRequest } from './api/cvApi'
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import codes from './codes'

export default {
  components: { TheSidebar, MainSkills, MainExperience, MainEducation, TheHeader, TheFooter, AppModal, Form, Field, ErrorMessage, AppLoader, AppToast },

  requiredFieldText: 'Обязательно для заполнения',

  data() {
    const schema = yup.object({
      name: yup
        .string()
        .trim()
        .required('Обязательно для заполнения'),
      position: yup
        .string()
        .matches(/^[A-Za-zА-Яа-я]+$/, "Поле должно содержать только буквы")
        .trim()
        .required('Обязательно для заполнения'),
      contacts: yup
        .string()
        .trim()
        .required('Обязательно для заполнения'),
    })

    return {
      wWidth: window.innerWidth,
      modalVisibility: false,
      isEmptyDescription: false,
      name: 'a',
      position: 'a',
      description: 'a',
      contacts: 'a',
      schema,
      loading: false,
      toastVisibility: false,
      toastMessage: '',
    }
  },

  computed: {
    checkWindowsWidth() {
      if (this.wWidth <= 992) {
        return true
      } else {
        return false
      }
    },
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
      this.name = ''
      this.position = ''
      this.contacts = ''
      this.description = '',
      this.isEmptyDescription = false
    },

    checkDescription() {
      this.isEmptyDescription = this.description.length === 0
    },

    async sendForm(values) {
      if (this.description.length === 0) {
        return
      }

      const payload = {
        id: Date.now(),
        date: (new Date()).toString(),
        ...values, 
        description: this.description,
      }

      try {
        this.loading = true

        await sendFormRequest(payload)

        this.closeForm()   
      } catch (e) {
        this.toastVisibility = true
        this.toastMessage = codes[e.message] || '[Ошибка] Что-то пошло не так.'

        setTimeout(() => this.toastVisibility= false, 5000)
      }

      this.loading = false
      
    },
  },
  
}
</script>
